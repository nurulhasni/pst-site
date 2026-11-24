// Small timing helpers so the animation needs no animation library.
// Everything is a pure function of the current frame, so any frame can be
// drawn on its own (used for the still frame when motion is reduced).

export type EaseFn = (t: number) => number;

export const linear: EaseFn = (t) => t;

// CSS-style cubic-bezier(x1, y1, x2, y2)
export function bezier(x1: number, y1: number, x2: number, y2: number): EaseFn {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      const d = slopeX(t);
      if (Math.abs(err) < 1e-6 || Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    // Newton can wander on flat curves; fall back to bisection
    if (t < 0 || t > 1 || Math.abs(sampleX(t) - x) > 1e-4) {
      let lo = 0;
      let hi = 1;
      t = x;
      for (let i = 0; i < 30; i++) {
        if (sampleX(t) < x) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
      }
    }
    return sampleY(t);
  };
}

export const easeOutCubic: EaseFn = (t) => 1 - Math.pow(1 - t, 3);
export const easeInCubic: EaseFn = (t) => t * t * t;

// Maps `value` from the input range to the output range, clamped at both ends.
// Ranges may have more than two stops, like [0, 0.5, 1] → [0, 0.3, 1].
export function interpolate(value: number, input: number[], output: number[], ease: EaseFn = linear): number {
  if (value <= input[0]) return output[0];
  const last = input.length - 1;
  if (value >= input[last]) return output[last];
  let i = 0;
  while (value > input[i + 1]) i++;
  const t = ease((value - input[i]) / (input[i + 1] - input[i]));
  return output[i] + (output[i + 1] - output[i]) * t;
}

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Damped spring from 0 towards 1, `frame` frames after it starts. Simulated in
// small steps, which is cheap at this length and matches how springs feel.
export function spring(frame: number, fps: number, { damping = 10, stiffness = 100, mass = 1 } = {}): number {
  if (frame <= 0) return 0;
  // Every spring used here has settled well within 5 s
  frame = Math.min(frame, fps * 5);
  const steps = Math.ceil(frame * 4);
  const dt = frame / fps / steps;
  let x = 0;
  let v = 0;
  for (let i = 0; i < steps; i++) {
    const force = -stiffness * (x - 1) - damping * v;
    v += (force / mass) * dt;
    x += v * dt;
  }
  return x;
}
