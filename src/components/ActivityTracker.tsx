"use client";

import { useEffect } from "react";
import type { ActivityType } from "@/lib/activityModel";

// Records clicks on WhatsApp, email, phone and Apply links for the admin
// Activity Log. Only the link, its label and the page are sent: no IP address
// or other personal data. A link can name its own activity with
// data-activity="apply" and add context with data-activity-label.

function classify(link: HTMLAnchorElement): { type: ActivityType; target: string } | null {
  const own = link.dataset.activity;
  const href = link.getAttribute("href") ?? "";
  const target = href.replace(/^(mailto:|tel:)/, "").split("?")[0];
  if (own === "apply") return { type: "apply_click", target };
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return { type: "whatsapp_click", target: "" };
  // Sending a CV to the recruitment address is applying for a job
  if (href.startsWith("mailto:recruitment@")) return { type: "apply_click", target };
  if (href.startsWith("mailto:")) return { type: "email_click", target };
  if (href.startsWith("tel:")) return { type: "phone_click", target };
  return null;
}

export function ActivityTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (location.pathname.startsWith("/admin")) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const found = classify(link);
      if (!found) return;

      const label = (link.dataset.activityLabel || link.innerText || link.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 120);
      const body = JSON.stringify({ ...found, label, page: location.pathname, lang: document.documentElement.dataset.lang ?? "" });
      // sendBeacon still delivers when the click leaves the page (WhatsApp, mail app)
      const sent = navigator.sendBeacon?.("/api/activity", new Blob([body], { type: "application/json" }));
      if (!sent) fetch("/api/activity", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
