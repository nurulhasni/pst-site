"use client";

import { useEffect } from "react";

// Fades content in as it scrolls into view, on every public page, without
// marking up each section by hand.
//
// It looks at the blocks inside <main>: each direct child of main is a page
// section. Wrappers with a single child are unwrapped, and the children found
// there are revealed one after another (a short stagger). The first block is
// the page hero, which has its own entrance animation, so it is skipped.
// Anything inside data-no-reveal, and fixed or sticky elements like the
// floating contact button, are left alone.
//
// Hiding and revealing use the Web Animations API (element.animate) rather than
// classes or attributes. That never touches the HTML React rendered, so it
// can't clash with hydration of content that streams in later, and React
// re-renders can't undo it.
//
// Content already on screen when it is found is never hidden, so nothing
// flickers. With "reduce motion" turned on, nothing is animated.

const STAGGER_MS = 90;
const MAX_STAGGER = 4;
const MAX_CHILDREN = 8; // more than this (a logo strip, a long list): reveal the block as a whole
const OFFSET = "translateY(24px)";
const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";

// Shared across effect runs: React runs effects twice in development and again
// after hot reload, and a block hidden by one run must be finished by the next
const hidden = new Map<Element, { hold: Animation; delay: number }>();
const seen = new WeakSet<Element>();

function blocksOf(section: Element): Element[] {
  let el = section;
  while (el.children.length === 1) el = el.children[0];
  const children = [...el.children];
  if (children.length === 0 || children.length > MAX_CHILDREN) return [section];
  return children;
}

function skip(el: Element): boolean {
  if (el.closest("[data-no-reveal]")) return true;
  const position = getComputedStyle(el).position;
  return position === "fixed" || position === "sticky";
}

function hide(el: Element, delay: number) {
  // Two identical keyframes held with fill: forwards keep it invisible
  const hold = el.animate(
    [
      { opacity: 0, transform: OFFSET },
      { opacity: 0, transform: OFFSET },
    ],
    { duration: 1, fill: "forwards" },
  );
  hidden.set(el, { hold, delay });
}

function reveal(el: Element) {
  const entry = hidden.get(el);
  if (!entry) return;
  hidden.delete(el);
  el.animate(
    [
      { opacity: 0, transform: OFFSET },
      { opacity: 1, transform: "none" },
    ],
    { duration: 700, delay: entry.delay, easing: EASE, fill: "backwards" },
  );
  entry.hold.cancel();
}

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const watched = new WeakSet<Element>();
    const watch = (el: Element) => {
      if (watched.has(el)) return;
      watched.add(el);
      observer.observe(el);
    };

    const scan = () => {
      for (const el of hidden.keys()) watch(el);
      for (const main of document.querySelectorAll("main")) {
        const sections = [...main.children].slice(1); // the first one is the hero
        for (const section of sections) {
          if (skip(section)) continue;
          blocksOf(section).forEach((block, i) => {
            if (seen.has(block) || skip(block)) return;
            seen.add(block);
            const rect = block.getBoundingClientRect();
            // Already on screen, or on a page kept in the background (no size): leave it visible
            if (rect.height === 0 || (rect.top < window.innerHeight && rect.bottom > 0)) return;
            hide(block, Math.min(i, MAX_STAGGER) * STAGGER_MS);
            watch(block);
          });
        }
      }
    };

    scan();

    // A fast jump (End key, anchor link, quick fling) can carry a block past the
    // screen between two observer checks, so it never counts as "intersecting".
    // On scroll, anything already above the bottom of the screen is shown too.
    let scrollQueued = 0;
    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = requestAnimationFrame(() => {
        scrollQueued = 0;
        for (const el of [...hidden.keys()]) {
          if (!el.isConnected) {
            hidden.delete(el);
            continue;
          }
          const rect = el.getBoundingClientRect();
          if (rect.height > 0 && rect.top < window.innerHeight) {
            reveal(el);
            observer.unobserve(el);
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Pages swap on client navigation and some content streams in later, so
    // look again whenever new elements arrive
    let queued = 0;
    const mutations = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        scan();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(queued);
      cancelAnimationFrame(scrollQueued);
    };
  }, []);

  return null;
}
