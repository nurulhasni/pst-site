// Jigsaw geometry. Every edge is drawn with the same symmetric knob profile, so
// a tab (+1) on one piece and a socket (-1) on its neighbour trace exactly the
// same curve and fit with no gap.

export type Pt = { x: number; y: number };
export type EdgeKind = -1 | 0 | 1; // socket · flat · tab (pointing outward)

// Knob profile in edge-local units: t runs along the edge (0 → 1),
// h is the outward offset as a fraction of the edge length.
const knob: [number, number][][] = [
  [[0.34, 0], [0.4, 0.02], [0.38, 0.1]],
  [[0.35, 0.2], [0.29, 0.33], [0.5, 0.33]],
  [[0.71, 0.33], [0.65, 0.2], [0.62, 0.1]],
  [[0.6, 0.02], [0.66, 0], [1, 0]],
];

const f = (n: number) => Math.round(n * 100) / 100;

// Path commands (no initial M) from a to b. Walking each piece clockwise in
// SVG coordinates, the outward normal of direction (dx, dy) is (dy, -dx).
export function edge(a: Pt, b: Pt, kind: EdgeKind): string {
  if (kind === 0) return `L ${f(b.x)} ${f(b.y)}`;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const at = (t: number, h: number) => ({
    x: a.x + dx * t + dy * h * kind,
    y: a.y + dy * t - dx * h * kind,
  });
  return knob
    .map((seg) => {
      const [c1, c2, p] = seg.map(([t, h]) => at(t, h));
      return `C ${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(p.x)} ${f(p.y)}`;
    })
    .join(" ");
}

export type Edges = { top: EdgeKind; right: EdgeKind; bottom: EdgeKind; left: EdgeKind };

// A square piece of side `size` centred on (0, 0)
export function piecePath(size: number, e: Edges): string {
  const h = size / 2;
  const tl = { x: -h, y: -h };
  const tr = { x: h, y: -h };
  const br = { x: h, y: h };
  const bl = { x: -h, y: h };
  return [
    `M ${tl.x} ${tl.y}`,
    edge(tl, tr, e.top),
    edge(tr, br, e.right),
    edge(br, bl, e.bottom),
    edge(bl, tl, e.left),
    "Z",
  ].join(" ");
}

// Just one side of a piece, for the glowing seam where two pieces bond
export function sidePath(size: number, side: keyof Edges, kind: EdgeKind, offset: Pt = { x: 0, y: 0 }): string {
  const h = size / 2;
  const c = {
    tl: { x: offset.x - h, y: offset.y - h },
    tr: { x: offset.x + h, y: offset.y - h },
    br: { x: offset.x + h, y: offset.y + h },
    bl: { x: offset.x - h, y: offset.y + h },
  };
  const [a, b] = {
    top: [c.tl, c.tr],
    right: [c.tr, c.br],
    bottom: [c.br, c.bl],
    left: [c.bl, c.tl],
  }[side];
  return `M ${f(a.x)} ${f(a.y)} ${edge(a, b, kind)}`;
}
