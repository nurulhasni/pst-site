"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Compass, Package, Users, Workflow, type LucideIcon } from "lucide-react";
import { piecePath, sidePath, type EdgeKind, type Edges, type Pt } from "./puzzle";
import { bezier, easeInCubic, easeOutCubic, interpolate, spring } from "./timing";

// Logo philosophy animation, drawn as SVG and animated in the browser.
//
// Story: the PST core appears first. People, Process and Product arrive as
// outlined fragments, curve into their slots and lock in; each time, a line of
// light runs along the seam from the core, which is the glue that holds them.
// Strategy comes last as the keystone. Once it locks, the whole puzzle turns
// to face it and a compass ring appears: strategy is the point of orientation.
//
// It plays once when it scrolls into view, then stays assembled with a soft
// glow on Strategy. It replays the next time it comes back into view. With
// "reduce motion" turned on, the finished picture is shown straight away.

export type Lang = "en" | "id";

const labels: Record<Lang, Record<PieceKey, string>> = {
  en: { strategy: "Strategy", people: "People", process: "Process", product: "Product" },
  id: { strategy: "Strategi", people: "SDM", process: "Proses", product: "Produk" },
};

const FPS = 30;
const SIZE = 1080;
const S = 230; // body size of one puzzle piece
const C = SIZE / 2;
const DONE = 260; // by this frame everything is in place

const navy = "#000354";
const logoBlue = "#A6CBD3";
const logoNavy = "#0A0F5C";
const sans = "var(--font-public-sans), 'Public Sans', system-ui, sans-serif";
// Times-style lettering, like the PST logo
const serif = "'Times New Roman', Tinos, Times, 'Liberation Serif', serif";

type PieceKey = "strategy" | "people" | "process" | "product";

type Piece = {
  key: PieceKey;
  Icon: LucideIcon;
  slot: Pt; // position relative to the core
  edges: Edges;
  fill: string;
  ink: string;
  start: number; // frame the fragment starts moving
  lock: number; // frame it locks in
  spin: number; // starting rotation in degrees
  seam: { side: keyof Edges; kind: EdgeKind }; // the core's side it bonds to
};

// The core reaches out on all four sides: every neighbour locks onto it, and
// its face stays clear for the PST lettering.
const coreEdges: Edges = { top: 1, right: 1, bottom: 1, left: 1 };

const pieces: Piece[] = [
  {
    key: "people",
    Icon: Users,
    slot: { x: -S, y: 0 },
    edges: { top: -1, right: -1, bottom: -1, left: 1 },
    fill: "#2F6E80",
    ink: "#FFFFFF",
    start: 24,
    lock: 66,
    spin: -140,
    seam: { side: "left", kind: 1 },
  },
  {
    key: "process",
    Icon: Workflow,
    slot: { x: S, y: 0 },
    edges: { top: -1, right: 1, bottom: -1, left: -1 },
    fill: "#2B4C9B",
    ink: "#FFFFFF",
    start: 48,
    lock: 90,
    spin: 125,
    seam: { side: "right", kind: 1 },
  },
  {
    key: "product",
    Icon: Package,
    slot: { x: 0, y: S },
    edges: { top: -1, right: -1, bottom: 1, left: -1 },
    fill: "#3B3FA0",
    ink: "#FFFFFF",
    start: 72,
    lock: 114,
    spin: -105,
    seam: { side: "bottom", kind: 1 },
  },
  {
    key: "strategy",
    Icon: Compass,
    slot: { x: 0, y: -S },
    edges: { top: 1, right: 1, bottom: -1, left: 1 },
    fill: "#FFFFFF",
    ink: navy,
    start: 112,
    lock: 162,
    spin: 200,
    seam: { side: "top", kind: 1 },
  },
];

const strategy = pieces[3];
const ease = bezier(0.22, 0.8, 0.24, 1);
const coreD = piecePath(S, coreEdges);
const pieceD = Object.fromEntries(pieces.map((p) => [p.key, piecePath(S, p.edges)])) as Record<PieceKey, string>;
const seamD = Object.fromEntries(pieces.map((p) => [p.key, sidePath(S, p.seam.side, p.seam.kind)])) as Record<PieceKey, string>;

type Ids = { glow: string; softGlow: string; shadow: string; halo: string };

function FlyingPiece({ piece, label, frame, ids }: { piece: Piece; label: string; frame: number; ids: Ids }) {
  if (frame < piece.start) return null;
  const p = interpolate(frame, [piece.start, piece.lock], [0, 1], ease);

  // Start far out along the slot's direction and curve in, so each fragment
  // reads as seeking its place rather than spinning at random
  const dist = Math.hypot(piece.slot.x, piece.slot.y) || 1;
  const dir = { x: piece.slot.x / dist, y: piece.slot.y / dist };
  const perp = { x: -dir.y, y: dir.x };
  const from = { x: piece.slot.x + dir.x * 2.4 * S + perp.x * 1.4 * S, y: piece.slot.y + dir.y * 2.4 * S + perp.y * 1.4 * S };
  const arc = Math.sin(Math.PI * p) * 0.5 * S;
  const x = from.x + (piece.slot.x - from.x) * p + perp.x * arc;
  const y = from.y + (piece.slot.y - from.y) * p + perp.y * arc;
  const rotate = piece.spin * (1 - p);

  // A small settle bump the moment it locks
  const locked = frame >= piece.lock;
  const settle = spring(frame - piece.lock, FPS, { damping: 9, stiffness: 180, mass: 0.6 });
  const scale = locked ? 1 + 0.06 * Math.sin(Math.PI * Math.min(settle, 1)) * (1 - settle) * 3 : 0.82 + 0.18 * p;

  const fillOpacity = interpolate(p, [0, 0.55, 1], [0.08, 0.25, 1]);
  const outline = interpolate(frame, [piece.lock, piece.lock + 10], [0.9, 0]);
  const labelOpacity = interpolate(frame, [piece.lock - 6, piece.lock + 8], [0, 1]);
  const d = pieceD[piece.key];
  const Icon = piece.Icon;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} opacity={interpolate(frame, [piece.start, piece.start + 8], [0, 1])}>
      <path d={d} fill={piece.fill} fillOpacity={fillOpacity} filter={locked ? `url(#${ids.shadow})` : undefined} />
      <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity={outline} strokeWidth={2.5} strokeLinejoin="round" />
      <g opacity={labelOpacity} transform={`translate(${dir.x * 30} ${dir.y * 30})`}>
        <Icon x={-24} y={-62} width={48} height={48} color={piece.ink} strokeWidth={1.8} aria-hidden />
        <text y={28} textAnchor="middle" fontFamily={sans} fontWeight={600} fontSize={piece === strategy ? 32 : 30} fill={piece.ink} letterSpacing={0.5}>
          {label}
        </text>
      </g>
    </g>
  );
}

// The line of light that runs along the seam from the core when a piece bonds.
// pathLength={1} lets the dash pattern work in 0–1 units for any path.
function Seam({ piece, frame, ids }: { piece: Piece; frame: number; ids: Ids }) {
  const t = frame - piece.lock;
  if (t < 0 || t > 40) return null;
  const d = seamD[piece.key];
  const progress = interpolate(t, [0, 16], [0, 1], easeOutCubic);
  const opacity = interpolate(t, [0, 4, 22, 40], [0, 1, 1, 0]);
  const dash = { pathLength: 1, strokeDasharray: "1 1", strokeDashoffset: 1 - progress };
  return (
    <g opacity={opacity}>
      <path d={d} fill="none" stroke={logoBlue} strokeWidth={14} strokeLinecap="round" filter={`url(#${ids.glow})`} {...dash} />
      <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" {...dash} />
    </g>
  );
}

const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
const R = 470;
const circle = `M ${C} ${C - R} A ${R} ${R} 0 1 1 ${C - 0.01} ${C - R}`;

function CompassRing({ frame, start, ids }: { frame: number; start: number; ids: Ids }) {
  const ring = interpolate(frame, [start, start + 40], [0, 1], easeOutCubic);
  if (ring <= 0) return null;
  const marker = interpolate(frame, [start + 24, start + 44], [0, 1], ease);

  return (
    <g>
      <path d={circle} fill="none" stroke={logoBlue} strokeOpacity={0.4} strokeWidth={2} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ring} />
      {ticks.map((deg, i) => {
        const shown = interpolate(ring, [i / ticks.length - 0.02, i / ticks.length + 0.02], [0, 1]);
        const major = deg % 90 === 0;
        const len = major ? 22 : 9;
        return (
          <line
            key={deg}
            x1={C}
            y1={C - R + 8}
            x2={C}
            y2={C - R + 8 + len}
            stroke={logoBlue}
            strokeOpacity={(major ? 0.7 : 0.3) * shown}
            strokeWidth={major ? 3 : 2}
            transform={`rotate(${deg} ${C} ${C})`}
          />
        );
      })}
      {/* North marker pointing at Strategy */}
      <g transform={`translate(${C} ${C - R - 18 - (1 - marker) * 20})`} opacity={marker}>
        <path d="M -16 -14 L 16 -14 L 0 14 Z" fill="#FFFFFF" filter={`url(#${ids.glow})`} />
        <path d="M -16 -14 L 16 -14 L 0 14 Z" fill="#FFFFFF" />
      </g>
    </g>
  );
}

function Scene({ frame, lang, ids }: { frame: number; lang: Lang; ids: Ids }) {
  // The PST core
  const coreIn = spring(frame, FPS, { damping: 14, stiffness: 120 });
  const pulse = pieces.reduce((sum, p) => {
    const t = frame - p.lock;
    return sum + (t >= 0 && t < 18 ? Math.sin((Math.PI * t) / 18) * 0.045 : 0);
  }, 0);
  const coreScale = (0.6 + 0.4 * coreIn) * (1 + pulse);

  // The whole puzzle starts tilted and turns to face Strategy once it locks
  const align = spring(frame - strategy.lock, FPS, { damping: 18, stiffness: 60 });
  const tilt = -22 * (1 - align);

  // Strategy keeps a gentle glow once everything is in place. After DONE the
  // frame loop stops and SVG's own <animate> keeps the glow breathing.
  const glowIn = interpolate(frame, [strategy.lock, strategy.lock + 20], [0, 1]);
  const done = frame >= DONE;
  const strategyGlow = frame > strategy.lock ? (0.55 + 0.45 * Math.sin((frame - strategy.lock) / 14)) * glowIn : 0;
  const backdrop = interpolate(frame, [0, 30], [0, 1], easeInCubic) * 0.6 + 0.4 * glowIn;

  return (
    <>
      <circle cx={C} cy={C} r={520} fill={`url(#${ids.halo})`} opacity={backdrop} />
      <CompassRing frame={frame} start={strategy.lock + 10} ids={ids} />

      <g transform={`translate(${C} ${C}) rotate(${tilt})`}>
        {/* Halo behind Strategy, the point of orientation */}
        <path
          d={pieceD.strategy}
          transform={`translate(${strategy.slot.x} ${strategy.slot.y})`}
          fill="#FFFFFF"
          opacity={0.35 * strategyGlow}
          filter={`url(#${ids.softGlow})`}
        >
          {done && (
            <animate attributeName="opacity" values={`${(0.35 * strategyGlow).toFixed(3)};0.35;0.035;${(0.35 * strategyGlow).toFixed(3)}`} keyTimes="0;0.2;0.7;1" dur="2.9s" repeatCount="indefinite" />
          )}
        </path>

        {/* PST core */}
        <g transform={`scale(${coreScale})`} opacity={interpolate(frame, [0, 10], [0, 1])}>
          <path d={coreD} fill={logoBlue} opacity={0.5} filter={`url(#${ids.softGlow})`} />
          <path d={coreD} fill={logoBlue} filter={`url(#${ids.shadow})`} />
          <text y={30} textAnchor="middle" fontFamily={serif} fontWeight={700} fontSize={104} fill={logoNavy} letterSpacing={-2}>
            PST
          </text>
        </g>

        {pieces.map((piece) => (
          <FlyingPiece key={piece.key} piece={piece} label={labels[lang][piece.key]} frame={frame} ids={ids} />
        ))}
        {pieces.map((piece) => (
          <Seam key={piece.key} piece={piece} frame={frame} ids={ids} />
        ))}
      </g>
    </>
  );
}

export function LogoPuzzle({ lang = "en", label, className = "" }: { lang?: Lang; label: string; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [frame, setFrame] = useState(0);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ids: Ids = { glow: `${uid}-glow`, softGlow: `${uid}-soft`, shadow: `${uid}-shadow`, halo: `${uid}-halo` };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let startedAt = 0;
    let visible = false;

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      const next = ((now - startedAt) / 1000) * FPS;
      if (next >= DONE) {
        // Finished: draw the final frame and stop the loop
        setFrame(DONE);
        raf = 0;
        return;
      }
      setFrame(next);
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion.matches) {
          setFrame(DONE);
          return;
        }
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35 && !visible) {
          // Start (or replay) from the beginning when it comes into view
          visible = true;
          startedAt = 0;
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && visible) {
          // Pause while off screen and reset, so it replays next time
          visible = false;
          stop();
          setFrame(0);
        }
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(svg);

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={label} className={className} style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <radialGradient id={ids.halo} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A2A8F" stopOpacity={0.9} />
          <stop offset="100%" stopColor={navy} stopOpacity={0} />
        </radialGradient>
        <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id={ids.softGlow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={ids.shadow} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000018" floodOpacity="0.45" />
        </filter>
      </defs>
      <Scene frame={frame} lang={lang} ids={ids} />
    </svg>
  );
}
