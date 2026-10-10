/**
 * Point-cloud shapes for the particle field. Pure math (no three.js import) so the
 * SSR'd static poster can use the same generators without pulling in the 3D bundle.
 * Every shape returns `count` points; particle i morphs from slot i of one shape to
 * slot i of the next. `tag` marks the sub-part a point belongs to (-1 = none), used
 * to highlight the active pipeline/process stage.
 */
import type { IndustryKey, ScenePhase } from "./3DTypes";

export const BRAND = {
  bg: "#05070B",
  orange: "#FF6B2C",
  cyan: "#27D3C2",
  text: "#F5F8FC",
} as const;

/** Particle colours with relative weights: brand orange leads, the rest add depth. */
export const PALETTE: [string, number][] = [
  ["#FF6B2C", 0.32],
  ["#FFB547", 0.18],
  ["#F5F8FC", 0.22],
  ["#27D3C2", 0.14],
  ["#8B7CFF", 0.07],
  ["#6E8BFF", 0.07],
];

export const INDUSTRY_TINT: Record<IndustryKey, string> = {
  dental: "#27D3C2",
  "real-estate": "#FF6B2C",
  manufacturing: "#FBBF24",
  ecommerce: "#34D399",
};

export interface PointShape {
  pos: Float32Array;
  tag: Float32Array;
  /** Per-particle flow (dx, dy, dz, speed): the particle loops from pos to pos + d. Speed 0 = still. */
  motion: Float32Array;
}

type Rand = () => number;
/** x, y, z, tag, then optional flow dx, dy, dz, speed. */
type Gen = (r: Rand) => number[];

const TAU = Math.PI * 2;

export function mulberry32(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const gauss = (r: Rand) => (r() + r() + r() - 1.5) / 1.5;

function onSphere(r: Rand): [number, number, number] {
  const u = r() * 2 - 1;
  const t = r() * TAU;
  const s = Math.sqrt(1 - u * u);
  return [s * Math.cos(t), u, s * Math.sin(t)];
}

function onBox(r: Rand, w: number, h: number, d: number): [number, number, number] {
  const p = [(r() - 0.5) * w, (r() - 0.5) * h, (r() - 0.5) * d];
  const axis = Math.floor(r() * 3);
  const half = [w / 2, h / 2, d / 2][axis];
  p[axis] = r() < 0.5 ? -half : half;
  return [p[0], p[1], p[2]];
}

/** Allocate points to weighted generators, in order. */
function compose(count: number, seed: number, parts: [number, Gen][]): PointShape {
  const r = mulberry32(seed);
  const pos = new Float32Array(count * 3);
  const tag = new Float32Array(count);
  const motion = new Float32Array(count * 4);
  const total = parts.reduce((s, [w]) => s + w, 0);
  let i = 0;
  parts.forEach(([w, gen], k) => {
    const n = k === parts.length - 1 ? count - i : Math.round((w / total) * count);
    for (let j = 0; j < n && i < count; j++, i++) {
      const [x, y, z, t, mx = 0, my = 0, mz = 0, sp = 0] = gen(r);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      tag[i] = t;
      motion.set([mx, my, mz, sp], i * 4);
    }
  });
  return { pos, tag, motion };
}

// ---------------------------------------------------------------- brain (hero / cta)

const cerebrum: Gen = (r) => {
  const [dx, dy, dz] = onSphere(r);
  const shell = 0.86 + 0.14 * Math.pow(r(), 0.5);
  const fold = 1 + 0.06 * Math.sin(dx * 11 + dy * 7) * Math.sin(dz * 9 - dy * 6) + 0.03 * Math.sin(dx * 23 + dz * 19);
  const x = dx * 2.45 * shell * fold;
  let y = dy * 1.65 * shell * fold;
  let z = dz * 1.75 * shell * fold;
  if (y < 0) y *= 0.72;
  y += 0.3;
  if (dy > -0.2) z += (z >= 0 ? 1 : -1) * 0.09; // longitudinal fissure
  return [x, y, z, -1];
};
const cerebellum: Gen = (r) => {
  const [dx, dy, dz] = onSphere(r);
  const s = 0.8 + 0.2 * r();
  return [1.35 + dx * 0.85 * s, -0.85 + dy * 0.5 * s, dz * 1.1 * s, -1];
};
const stem: Gen = (r) => {
  const t = r();
  return [0.55 + t * 0.35 + gauss(r) * 0.1, -0.7 - t * 1.1, gauss(r) * 0.15, -1];
};
const brain = (count: number, scale = 1) => {
  const s = compose(count, 11, [[0.84, cerebrum], [0.12, cerebellum], [0.04, stem]]);
  if (scale !== 1) for (let i = 0; i < s.pos.length; i++) s.pos[i] *= scale;
  return s;
};

// ---------------------------------------------------------------- about: seated Buddha

type V3 = [number, number, number];

/** Point on (or near) the surface of an ellipsoid. */
function ellipsoid(r: Rand, c: V3, rx: number, ry: number, rz: number): V3 {
  const [dx, dy, dz] = onSphere(r);
  const s = 0.92 + 0.08 * r();
  return [c[0] + dx * rx * s, c[1] + dy * ry * s, c[2] + dz * rz * s];
}

/** Point on the surface of a capsule between a and b (a limb). */
function limb(r: Rand, a: V3, b: V3, rad: number): V3 {
  const t = r();
  const [dx, dy, dz] = onSphere(r);
  return [a[0] + (b[0] - a[0]) * t + dx * rad, a[1] + (b[1] - a[1]) * t + dy * rad, a[2] + (b[2] - a[2]) * t + dz * rad];
}

/** Colour tags understood by the particle shader (see ParticleField). */
export const TAG_GOLD = -3;
export const TAG_BLUE = -2;
export const TAG_BOKEH = -4;

/**
 * Seated, meditating Buddha in glowing gold particles: beaded curls and a tall topknot
 * with a bright tip, long earlobes, closed eyes, a robe draped over one shoulder with
 * fold lines, hands resting together in the lap, broad crossed legs on a reflective
 * floor glow, blue particle wisps swirling around, and soft gold bokeh in the air.
 */
function buddha(count: number): PointShape {
  const Y = -0.85; // centre the figure vertically
  const at = (p: V3, tag = TAG_GOLD): number[] => [p[0], p[1] + Y, p[2], tag];
  const head: V3 = [0, 1.56, 0];
  const torso: V3 = [0, 0.66, 0];
  const legs: V3 = [0, 0.03, 0.12];
  /** z of the front surface of an ellipsoid at (x, y): lines drawn on it sit on the body. */
  const frontZ = (c: V3, rx: number, ry: number, rz: number, x: number, y: number) =>
    c[2] + rz * Math.sqrt(Math.max(0, 1 - ((x - c[0]) / rx) ** 2 - ((y - c[1]) / ry) ** 2)) + 0.012;
  const curve = (pts: (t: number) => [number, number], c: V3, rx: number, ry: number, rz: number, jitter = 0.012): Gen => (r) => {
    const [x, y] = pts(r());
    return at([x + gauss(r) * jitter, y + gauss(r) * jitter, frontZ(c, rx, ry, rz, x, y)]);
  };
  const curls: Gen = (r) => {
    // beaded curls on a lattice over the crown
    const row = Math.floor(r() * 7);
    const phi = 0.14 + row * 0.13;
    const n = 9 + row * 4;
    const th = (Math.floor(r() * n) / n) * TAU + row * 0.3;
    const [dx, dy, dz] = onSphere(r);
    return at([head[0] + Math.sin(phi) * Math.cos(th) * 0.32 + dx * 0.035, head[1] + Math.cos(phi) * 0.38 + dy * 0.035, head[2] + Math.sin(phi) * Math.sin(th) * 0.32 + dz * 0.035]);
  };
  const face: Gen = (r) => {
    for (;;) {
      const [dx, dy, dz] = onSphere(r);
      if (dy < 0.35) return at([head[0] + dx * 0.3, head[1] + dy * 0.37, head[2] + dz * 0.3]);
    }
  };
  // a ribbon of blue wisp, its particles drifting along it
  const wisp = (f: (t: number) => V3): Gen => (r) => {
    const t = r();
    const a = f(t);
    const b = f(Math.min(1, t + 0.04));
    return [a[0] + gauss(r) * 0.05, a[1] + Y + gauss(r) * 0.05, a[2] + gauss(r) * 0.05, TAG_BLUE, (b[0] - a[0]) * 3, (b[1] - a[1]) * 3, (b[2] - a[2]) * 3, 0.25];
  };
  return compose(count, 81, [
    // head
    [0.09, curls],
    [0.05, face],
    [0.006, curve((t) => [-0.17 + t * 0.12, 1.555 - 0.016 * Math.sin(t * Math.PI)], head, 0.3, 0.37, 0.3)], // closed eyes
    [0.006, curve((t) => [0.05 + t * 0.12, 1.555 - 0.016 * Math.sin(t * Math.PI)], head, 0.3, 0.37, 0.3)],
    [0.005, curve((t) => [-0.18 + t * 0.13, 1.6 + 0.02 * Math.sin(t * Math.PI)], head, 0.3, 0.37, 0.3)], // brows
    [0.005, curve((t) => [0.05 + t * 0.13, 1.6 + 0.02 * Math.sin(t * Math.PI)], head, 0.3, 0.37, 0.3)],
    [0.005, curve((t) => [0, 1.55 - t * 0.12], head, 0.3, 0.37, 0.3, 0.008)], // nose
    [0.005, curve((t) => [-0.06 + t * 0.12, 1.37 - 0.012 * Math.sin(t * Math.PI)], head, 0.3, 0.37, 0.3, 0.008)], // smile
    [0.002, curve(() => [0, 1.645], head, 0.3, 0.37, 0.3, 0.01)], // urna
    [0.025, (r) => { const [dx, dy, dz] = onSphere(r); return at([dx * 0.17, 1.98 + dy * 0.19, dz * 0.17]); }], // topknot
    [0.008, (r) => { const t = r(); const rad = 0.05 * (1 - t); return at([gauss(r) * rad, 2.15 + t * 0.2, gauss(r) * rad]); }], // glowing tip
    [0.02, (r) => at(ellipsoid(r, [r() < 0.5 ? -0.31 : 0.31, 1.43, 0], 0.06, 0.27, 0.06))], // long earlobes
    [0.015, (r) => at(limb(r, [0, 1.12, 0], [0, 1.24, 0], 0.13))], // neck
    // body and robe
    [0.14, (r) => at(ellipsoid(r, torso, 0.56, 0.62, 0.3))],
    [0.05, (r) => { // diagonal robe folds from the draped shoulder down across the chest
      const k = Math.floor(r() * 8);
      const t = r();
      const x = 0.44 - 0.86 * t;
      const y = 1.02 - 0.045 * k - (0.5 - 0.02 * k) * t + 0.05 * Math.sin(t * Math.PI);
      return at([x + gauss(r) * 0.01, y + gauss(r) * 0.01, frontZ(torso, 0.56, 0.62, 0.3, x, y)]);
    }],
    [0.012, (r) => { const t = r(); return at([0.2 + t * 0.34, 1.12 - t * 0.12 + gauss(r) * 0.012, 0.12 + gauss(r) * 0.03]); }], // robe over the shoulder
    // arms, hands together in the lap (meditation mudra)
    [0.024, (r) => at(limb(r, [-0.52, 1.0, 0], [-0.8, 0.38, 0.12], 0.12))],
    [0.024, (r) => at(limb(r, [0.52, 1.0, 0], [0.8, 0.38, 0.12], 0.12))],
    [0.02, (r) => at(limb(r, [-0.8, 0.38, 0.12], [-0.22, 0.15, 0.36], 0.1))],
    [0.02, (r) => at(limb(r, [0.8, 0.38, 0.12], [0.22, 0.15, 0.36], 0.1))],
    [0.025, (r) => at(ellipsoid(r, [0, 0.13, 0.38], 0.3, 0.07, 0.13))],
    // crossed legs with folds
    [0.15, (r) => at(ellipsoid(r, legs, 1.3, 0.3, 0.62))],
    [0.03, (r) => {
      const k = Math.floor(r() * 5);
      const t = r();
      const x = -1.05 + k * 0.08 + t * (2.1 - k * 0.16);
      const y = 0.06 - k * 0.05 - 0.05 * Math.sin(t * Math.PI);
      return at([x + gauss(r) * 0.01, y, frontZ(legs, 1.3, 0.3, 0.62, x, y)]);
    }],
    // reflective floor glow under the figure
    [0.05, (r) => { const a = r() * TAU, d = Math.pow(r(), 0.6); return at([Math.cos(a) * d * 1.75, -0.29, 0.12 + Math.sin(a) * d * 0.75]); }],
    // blue wisps swirling around the figure
    [0.045, wisp((t) => [-1.2 - 0.35 * Math.sin(t * 3.2), -0.2 + 2.3 * t, -0.35 + 0.45 * Math.cos(t * 4)])],
    [0.045, wisp((t) => [1.2 + 0.35 * Math.sin(t * 3.2 + 0.8), -0.1 + 2.1 * t, -0.35 + 0.45 * Math.cos(t * 4 + 1)])],
    [0.03, wisp((t) => [-1.65 + 3.3 * t, 0.5 + 0.28 * Math.sin(t * Math.PI * 2), -0.7])],
    // soft gold bokeh in the air
    [0.02, (r) => [(r() - 0.5) * 3.4, (r() * 2.7 - 0.3) + Y, -0.8 + r() * 1.1, TAG_BOKEH]],
  ]);
}

// ---------------------------------------------------------------- scattered (opening state)

function scattered(count: number): PointShape {
  const c = mulberry32(7);
  const centers = Array.from({ length: 7 }, () => [(c() - 0.5) * 6, (c() - 0.5) * 3.8, (c() - 0.5) * 2]);
  return compose(count, 23, [
    [0.75, (r) => {
      const k = centers[Math.floor(r() * centers.length)];
      return [k[0] + gauss(r) * 0.45, k[1] + gauss(r) * 0.45, k[2] + gauss(r) * 0.45, -1];
    }],
    [0.25, (r) => [(r() - 0.5) * 6.6, (r() - 0.5) * 4.4, (r() - 0.5) * 3, -1]],
  ]);
}

// ---------------------------------------------------------------- problems (one shape per item)

function rectOutline(r: Rand, w: number, h: number): [number, number] {
  const t = r() * 2 * (w + h);
  if (t < w) return [t - w / 2, h / 2];
  if (t < w + h) return [w / 2, h / 2 - (t - w)];
  if (t < 2 * w + h) return [w / 2 - (t - w - h), -h / 2];
  return [-w / 2, -h / 2 + (t - 2 * w - h)];
}

/** 01 "Follow-up is slow": an hourglass, sand trickling while enquiries wait. */
function hourglass(count: number): PointShape {
  const H = 1.7;
  const rad = (y: number) => 0.12 + (1.05 * Math.abs(y)) / H;
  const ring = (r: Rand, y: number, R: number) => { const a = r() * TAU; return [Math.cos(a) * R, y, Math.sin(a) * R]; };
  return compose(count, 71, [
    [0.4, (r) => { const y = (r() * 2 - 1) * H; return [...ring(r, y, rad(y)), -1]; }],
    [0.08, (r) => [...ring(r, r() < 0.5 ? H : -H, 1.25 * Math.sqrt(r())), -1]],
    [0.22, (r) => { const y = 0.35 + r() * 0.95; return [...ring(r, y, rad(y) * 0.85 * Math.sqrt(r())), -1]; }],
    [0.16, (r) => { const y = -H + Math.pow(r(), 1.6) * 0.75; return [...ring(r, y, (1 - (y + H) / 0.75) * rad(y) * 0.9 * Math.sqrt(r())), -1]; }],
    // the falling stream: loops from the neck down to the pile
    [0.14, (r) => [gauss(r) * 0.03, 0.1, gauss(r) * 0.03, -1, 0, -1.1, 0, 0.55]],
  ]);
}

/** 02 "Copy-paste work": two documents, lines carried one by one from left to right. */
function copyPaste(count: number): PointShape {
  const doc = (cx: number): Gen => (r) => { const [x, y] = rectOutline(r, 1.3, 1.8); return [cx + x, y, 0, -1]; };
  const lines = (cx: number, rows: number): Gen => (r) => {
    const row = Math.floor(r() * rows);
    return [cx - 0.48 + r() * (row % 2 ? 0.7 : 0.95), 0.62 - row * 0.25, gauss(r) * 0.02, -1];
  };
  return compose(count, 72, [
    [0.18, doc(-1.5)],
    [0.18, doc(1.5)],
    [0.22, lines(-1.5, 6)],
    [0.12, lines(1.5, 3)], // the copy is only half done
    [0.3, (r) => { const row = Math.floor(r() * 6); return [-0.78, 0.62 - row * 0.25 + gauss(r) * 0.02, 0, -1, 1.56, 0, 0, 0.4]; }],
  ]);
}

/** 03 "Tools do not talk": four tool islands whose connections fade out halfway. */
function brokenTools(count: number): PointShape {
  const T: [number, number][] = [[-1.9, 1.1], [1.9, 1.1], [-1.9, -1.1], [1.9, -1.1]];
  return compose(count, 73, [
    // chat bubble
    [0.16, (r) => { const [x, y] = rectOutline(r, 1.1, 0.72); return [T[0][0] + x, T[0][1] + y, 0, -1]; }],
    [0.03, (r) => { const t = r(); return [T[0][0] - 0.3 + t * 0.15, T[0][1] - 0.36 - t * 0.2, 0, -1]; }],
    // spreadsheet grid
    [0.18, (r) => {
      const v = r() < 0.5, k = Math.floor(r() * 4), t = r();
      return v ? [T[1][0] - 0.55 + k * 0.366, T[1][1] - 0.4 + t * 0.8, 0, -1] : [T[1][0] - 0.55 + t * 1.1, T[1][1] - 0.4 + k * 0.266, 0, -1];
    }],
    // database cylinder
    [0.18, (r) => { const a = r() * TAU, y = r() < 0.4 ? (r() < 0.5 ? 0.4 : -0.4) : (r() - 0.5) * 0.8; return [T[2][0] + Math.cos(a) * 0.48, T[2][1] + y, Math.sin(a) * 0.48, -1]; }],
    // payment card
    [0.15, (r) => { const [x, y] = rectOutline(r, 1.15, 0.72); return [T[3][0] + x, T[3][1] + y, 0, -1]; }],
    [0.05, (r) => [T[3][0] + (r() - 0.5) * 1.1, T[3][1] + 0.16 + gauss(r) * 0.03, 0, -1]],
    // streams that set off toward the centre and die out
    [0.25, (r) => {
      const [tx, ty] = T[Math.floor(r() * 4)];
      const sx = tx * 0.7, sy = ty * 0.62;
      return [sx + gauss(r) * 0.04, sy + gauss(r) * 0.04, 0, -1, -sx * 0.45, -sy * 0.45, 0, 0.35];
    }],
  ]);
}

// ---------------------------------------------------------------- services

const SERVICES: ((count: number) => PointShape)[] = [
  // 0 AI automation & workflows: WhatsApp + web form -> automation -> CRM + Sheets,
  //   with a human hand-off branch for cases the rules should not decide alone
  (n) => automationWorkflow(n),
  // 1 custom software: stacked code blocks
  (n) => compose(n, 32, [
    ...[0.78, 0, -0.78].map((y, k) => [1, (r: Rand) => {
      const [x, yy, z] = onBox(r, 2.3 - k * 0.3, 0.26, 1.6 - k * 0.2);
      return [x, yy + y, z, -1];
    }] as [number, Gen]),
    // code rising through the layers as the product is built
    [0.35, (r) => [(r() - 0.5) * 1.6, -0.62, (r() - 0.5) * 1.1, -1, 0, 1.4, 0, 0.3]],
  ]),
  // 2 web & e-commerce: a storefront, with the post-purchase steps automated beneath it
  (n) => storefront(n),
  // 3 marketing & SEO: ascending growth bars with a trend line
  (n) => compose(n, 34, [
    [0.82, (r) => {
      const k = Math.floor(r() * 5);
      const h = 0.6 + k * 0.42;
      const [x, y, z] = onBox(r, 0.34, h, 0.34);
      return [-1.3 + k * 0.65 + x, -1.3 + h / 2 + y, z, -1];
    }],
    // the trend line, travelling upward
    [0.18, (r) => [-1.5 + gauss(r) * 0.03, -0.5 + gauss(r) * 0.03, 0.3, -1, 3.1, 2.0, 0, 0.2]],
  ]),
  // 4 branding & UI/UX: type, colour and a pen tool applied to a product interface
  (n) => brandStudio(n),
];

// ---------------------------------------------------------------- industries

/** 2D stroke primitives for particle icons (icon space roughly -0.5..0.5). */
type P2 = [number, number];
type Prim = { line: [P2, P2] } | { arc: [P2, number, number, number] }; // arc: centre, radius, from, to (radians)

const poly = (pts: P2[], close = false): Prim[] => {
  const out: Prim[] = [];
  for (let i = 1; i < pts.length; i++) out.push({ line: [pts[i - 1], pts[i]] });
  if (close) out.push({ line: [pts[pts.length - 1], pts[0]] });
  return out;
};
const rect = (cx: number, cy: number, w: number, h: number): Prim[] =>
  poly([[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]], true);
const circle = (cx: number, cy: number, r: number, a0 = 0, a1 = TAU): Prim => ({ arc: [[cx, cy], r, a0, a1] });
const hLines = (x0: number, x1: number, ys: number[]): Prim[] => ys.map((y) => ({ line: [[x0, y], [x1, y]] as [P2, P2] }));
const tick = (x: number, y: number, s: number): Prim[] => poly([[x - 0.18 * s, y], [x - 0.05 * s, y - 0.14 * s], [x + 0.2 * s, y + 0.14 * s]]);

const primLength = (p: Prim) =>
  "line" in p ? Math.hypot(p.line[1][0] - p.line[0][0], p.line[1][1] - p.line[0][1]) : p.arc[1] * Math.abs(p.arc[3] - p.arc[2]);

/** SVG path for a set of primitives (used by the static, no-WebGL fallback). */
export function primsToPath(prims: Prim[], scale: number): string {
  const f = (n: number) => +(n * scale).toFixed(1);
  return prims
    .map((p) => {
      if ("line" in p) {
        const [[ax, ay], [bx, by]] = p.line;
        return `M${f(ax)} ${f(-ay)}L${f(bx)} ${f(-by)}`;
      }
      const [[cx, cy], rad, a0, a1] = p.arc;
      const steps = Math.max(8, Math.ceil(Math.abs(a1 - a0) * 6));
      let d = "";
      for (let i = 0; i <= steps; i++) {
        const a = a0 + ((a1 - a0) * i) / steps;
        d += `${i ? "L" : "M"}${f(cx + Math.cos(a) * rad)} ${f(-(cy + Math.sin(a) * rad))}`;
      }
      return d;
    })
    .join("");
}

function samplePrims(prims: Prim[], r: Rand): P2 {
  const lens = prims.map(primLength);
  let x = r() * lens.reduce((a, b) => a + b, 0);
  let k = 0;
  while (k < prims.length - 1 && x > lens[k]) x -= lens[k++];
  const p = prims[k];
  const t = r();
  if ("line" in p) {
    const [[ax, ay], [bx, by]] = p.line;
    return [ax + (bx - ax) * t, ay + (by - ay) * t];
  }
  const [[cx, cy], rad, a0, a1] = p.arc;
  const a = a0 + (a1 - a0) * t;
  return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad];
}

/** One icon per workflow step, in the same order as the steps listed on the page. */
const INDUSTRY_ICONS: Record<IndustryKey, Prim[][]> = {
  // Emergency triage, Patient intake, Doctor schedule, Confirmation message
  dental: [
    poly([[-0.14, 0.45], [0.14, 0.45], [0.14, 0.14], [0.45, 0.14], [0.45, -0.14], [0.14, -0.14], [0.14, -0.45], [-0.14, -0.45], [-0.14, -0.14], [-0.45, -0.14], [-0.45, 0.14], [-0.14, 0.14]], true),
    [...rect(0, -0.03, 0.7, 0.86), ...rect(0, 0.42, 0.3, 0.12), ...hLines(-0.22, 0.22, [0.18, 0.0, -0.18, -0.34])],
    [...rect(0, -0.05, 0.9, 0.8), ...hLines(-0.45, 0.45, [0.2]), ...poly([[-0.2, 0.3], [-0.2, 0.45]]), ...poly([[0.2, 0.3], [0.2, 0.45]]),
      ...[-0.25, 0, 0.25].flatMap((x) => [0.0, -0.25].map((y) => circle(x, y, 0.05)))],
    [...poly([[-0.45, 0.3], [0.45, 0.3], [0.45, -0.22], [-0.1, -0.22], [-0.28, -0.42], [-0.26, -0.22], [-0.45, -0.22]], true), ...tick(0, 0.04, 1.2)],
  ],
  // Portal lead, Budget qualifier, Brochure dispatch, Site visit booked
  "real-estate": [
    [...poly([[-0.48, 0.02], [0, 0.45], [0.48, 0.02]]), ...poly([[-0.36, 0.08], [-0.36, -0.45], [0.36, -0.45], [0.36, 0.08]]), ...rect(0, -0.3, 0.2, 0.3)],
    // a rupee coin
    [circle(0, 0, 0.44), circle(0, 0, 0.34), ...hLines(-0.13, 0.13, [0.19, 0.08]), circle(-0.02, 0.135, 0.11, -Math.PI / 2, Math.PI / 2),
      ...poly([[-0.1, 0.03], [0.12, -0.24]])],
    [...poly([[-0.45, 0.42], [-0.15, 0.32], [0.15, 0.42], [0.45, 0.32]]), ...poly([[-0.45, -0.38], [-0.15, -0.48], [0.15, -0.38], [0.45, -0.48]]),
      ...[[-0.45, 0.42, -0.38], [-0.15, 0.32, -0.48], [0.15, 0.42, -0.38], [0.45, 0.32, -0.48]].map(([x, a, b]) => ({ line: [[x, a], [x, b]] as [P2, P2] }))],
    [circle(0, 0.12, 0.3, -0.6, Math.PI + 0.6), ...poly([[-0.25, -0.05], [0, -0.48], [0.25, -0.05]]), circle(0, 0.12, 0.1)],
  ],
  // Purchase order in, Inventory match, Dispatch note, Carrier sync
  manufacturing: [
    [...poly([[-0.33, 0.45], [0.18, 0.45], [0.33, 0.3], [0.33, -0.45], [-0.33, -0.45]], true), ...poly([[0.18, 0.45], [0.18, 0.3], [0.33, 0.3]]), ...hLines(-0.2, 0.2, [0.15, -0.02, -0.19, -0.32])],
    [...rect(-0.22, -0.22, 0.42, 0.42), ...rect(0.22, -0.22, 0.42, 0.42), ...rect(0, 0.22, 0.42, 0.42)],
    [...rect(0, 0, 0.92, 0.58), ...[-0.33, -0.27, -0.2, -0.15, -0.08].map((x) => ({ line: [[x, -0.18], [x, 0.18]] as [P2, P2] })), ...hLines(0.05, 0.33, [0.12, 0, -0.12])],
    [...rect(-0.15, 0.02, 0.6, 0.44), ...poly([[0.15, -0.2], [0.15, 0.1], [0.33, 0.1], [0.46, -0.06], [0.46, -0.2], [-0.45, -0.2]]), circle(-0.25, -0.3, 0.09), circle(0.3, -0.3, 0.09)],
  ],
  // Order or return event, Policy check, Pickup created, Inventory updated
  ecommerce: [
    [...poly([[-0.38, 0.12], [0.38, 0.12], [0.33, -0.45], [-0.33, -0.45]], true), circle(0, 0.12, 0.18, 0, Math.PI)],
    [...poly([[0, 0.47], [0.38, 0.32], [0.33, -0.1], [0, -0.47], [-0.33, -0.1], [-0.38, 0.32]], true), ...tick(0, 0.0, 1.2)],
    [...rect(-0.06, -0.12, 0.62, 0.56), ...poly([[-0.37, 0.16], [-0.18, 0.36], [0.44, 0.36], [0.25, 0.16]]), ...poly([[0.44, 0.36], [0.44, -0.2], [0.25, -0.4]]), ...poly([[-0.06, 0.16], [-0.06, -0.4]])],
    [circle(0, 0, 0.38, 0.35, Math.PI - 0.2), circle(0, 0, 0.38, Math.PI + 0.35, TAU - 0.2), ...poly([[0.32, 0.36], [0.36, 0.18], [0.18, 0.16]]), ...poly([[-0.32, -0.36], [-0.36, -0.18], [-0.18, -0.16]])],
  ],
};

/** Step positions: a 2x2 grid in the same reading order as the numbered list (1 2 / 3 4). */
const STEP_POS: [number, number, number][] = [[-1.1, 0.78, 0], [1.1, 0.78, 0.1], [-1.1, -0.78, 0], [1.1, -0.78, 0.1]];

function industry(count: number, key: IndustryKey): PointShape {
  const icons = INDUSTRY_ICONS[key];
  const icon: Gen = (r) => {
    const j = Math.floor(r() * 4);
    const [x, y] = samplePrims(icons[j], r);
    const [cx, cy, cz] = STEP_POS[j];
    return [cx + x * 1.15 + gauss(r) * 0.016, cy + y * 1.15 + gauss(r) * 0.016, cz + gauss(r) * 0.05, j];
  };
  // hand-over streams from each step to the next
  const link: Gen = (r) => {
    const j = Math.floor(r() * 3);
    const a = STEP_POS[j], b = STEP_POS[j + 1];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const off = 0.6 / len; // start and stop just outside each icon
    const sx = a[0] + dx * off, sy = a[1] + dy * off;
    return [sx + gauss(r) * 0.02, sy + gauss(r) * 0.02, a[2], -1, dx * (1 - 2 * off), dy * (1 - 2 * off), b[2] - a[2], 0.35];
  };
  return compose(count, 51 + Object.keys(INDUSTRY_ICONS).indexOf(key), [[0.84, icon], [0.16, link]]);
}

// ---------------------------------------------------------------- service 01: automation workflow

function automationWorkflow(count: number): PointShape {
  const at = (prims: Prim[], cx: number, cy: number, s: number): Gen => (r) => {
    const [x, y] = samplePrims(prims, r);
    return [cx + x * s + gauss(r) * 0.014, cy + y * s + gauss(r) * 0.014, gauss(r) * 0.04, -1];
  };
  const gearPts: P2[] = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * TAU;
    const rad = i % 4 < 2 ? 0.5 : 0.38;
    return [Math.cos(a) * rad, Math.sin(a) * rad];
  });
  const chat = [...poly([[-0.45, 0.3], [0.45, 0.3], [0.45, -0.2], [-0.1, -0.2], [-0.28, -0.4], [-0.26, -0.2], [-0.45, -0.2]], true),
    circle(-0.2, 0.05, 0.05), circle(0, 0.05, 0.05), circle(0.2, 0.05, 0.05)];
  const form = [...rect(0, 0, 0.72, 0.9), ...hLines(-0.24, 0.24, [0.26, 0.1, -0.06]), ...rect(0.08, -0.27, 0.36, 0.13)];
  const gear = [...poly(gearPts, true), circle(0, 0, 0.17)];
  const crm = [...rect(0, 0, 0.92, 0.64), circle(-0.24, 0.06, 0.12), circle(-0.24, -0.2, 0.17, 0.25, Math.PI - 0.25), ...hLines(0.0, 0.32, [0.12, -0.02, -0.16])];
  const sheet = [...rect(0, 0, 0.92, 0.64), ...hLines(-0.46, 0.46, [0.11, -0.11]), ...[-0.15, 0.15].map((x) => ({ line: [[x, 0.32], [x, -0.32]] as [P2, P2] }))];
  const person = [circle(0, 0.14, 0.12), circle(0, -0.2, 0.22, 0.15, Math.PI - 0.15)];
  // streams: inputs -> gear -> outputs, plus the hand-off down to a person
  const stream = (ax: number, ay: number, bx: number, by: number): Gen => (r) =>
    [ax + gauss(r) * 0.02, ay + gauss(r) * 0.02, 0, -1, bx - ax, by - ay, 0, 0.4];
  return compose(count, 31, [
    [0.13, at(chat, -1.5, 0.78, 0.95)],
    [0.12, at(form, -1.5, -0.78, 0.95)],
    [0.2, at(gear, 0, 0.12, 1.15)],
    [0.13, at(crm, 1.5, 0.78, 0.95)],
    [0.12, at(sheet, 1.5, -0.78, 0.95)],
    [0.07, at(person, 0, -1.45, 1.1)],
    [0.06, stream(-1.0, 0.62, -0.55, 0.28)],
    [0.06, stream(-1.0, -0.62, -0.55, -0.05)],
    [0.05, stream(0.55, 0.28, 1.0, 0.62)],
    [0.05, stream(0.55, -0.05, 1.0, -0.62)],
    [0.03, stream(0, -0.48, 0, -1.08)],
  ]);
}

function storefront(count: number): PointShape {
  const at = (prims: Prim[], cx: number, cy: number, sc = 1): Gen => (r) => {
    const [x, y] = samplePrims(prims, r);
    return [cx + x * sc + gauss(r) * 0.013, cy + y * sc + gauss(r) * 0.013, gauss(r) * 0.035, -1];
  };
  const W = 3.0, H = 1.95, wy = 0.32; // browser window
  const window = [...rect(0, 0, W, H), ...hLines(-W / 2, W / 2, [H / 2 - 0.22]),
    circle(-1.33, H / 2 - 0.11, 0.035), circle(-1.21, H / 2 - 0.11, 0.035), circle(-1.09, H / 2 - 0.11, 0.035),
    ...hLines(-1.35, -0.55, [H / 2 - 0.42]), ...hLines(0.55, 0.95, [H / 2 - 0.42])];
  const cart = (s: number): Prim[] => [
    ...poly([[-0.3 * s, 0.2 * s], [-0.18 * s, 0.2 * s], [-0.1 * s, -0.12 * s], [0.24 * s, -0.12 * s], [0.3 * s, 0.12 * s], [-0.14 * s, 0.12 * s]]),
    circle(-0.06 * s, -0.22 * s, 0.05 * s), circle(0.2 * s, -0.22 * s, 0.05 * s)];
  const card = (cx: number): Prim[] => [...rect(cx, -0.17, 0.78, 1.0), ...rect(cx, 0.05, 0.62, 0.42),
    ...hLines(cx - 0.3, cx + 0.3, [-0.3]), ...hLines(cx - 0.3, cx + 0.05, [-0.4]), ...rect(cx + 0.18, -0.52, 0.26, 0.12)];
  const parcel = [...rect(0, -0.05, 0.52, 0.42), ...poly([[-0.26, 0.16], [-0.12, 0.3], [0.4, 0.3], [0.26, 0.16]]), ...poly([[0.4, 0.3], [0.4, -0.12], [0.26, -0.26]]), ...poly([[0, 0.16], [0, -0.26]])];
  const truck = [...rect(-0.12, 0.04, 0.5, 0.36), ...poly([[0.13, -0.14], [0.13, 0.1], [0.3, 0.1], [0.4, -0.02], [0.4, -0.14], [-0.37, -0.14]]), circle(-0.2, -0.22, 0.07), circle(0.26, -0.22, 0.07)];
  const stream = (ax: number, bx: number, y: number): Gen => (r) => [ax, y + gauss(r) * 0.02, 0, -1, bx - ax, 0, 0, 0.4];
  const py = -1.42; // post-purchase row
  return compose(count, 33, [
    [0.24, at(window, 0, wy)],
    [0.3, at([...card(-0.95), ...card(0), ...card(0.95)], 0, wy)],
    [0.05, at(cart(0.8), 1.25, wy + H / 2 - 0.42)],
    [0.11, at(cart(1.5), -1.25, py)],
    [0.11, at(parcel, 0, py, 1.15)],
    [0.11, at(truck, 1.25, py, 1.25)],
    [0.04, stream(-0.75, -0.42, py)],
    [0.04, stream(0.42, 0.72, py)],
  ]);
}

function brandStudio(count: number): PointShape {
  const at = (prims: Prim[], cx: number, cy: number, sc = 1): Gen => (r) => {
    const [x, y] = samplePrims(prims, r);
    return [cx + x * sc + gauss(r) * 0.013, cy + y * sc + gauss(r) * 0.013, gauss(r) * 0.035, -1];
  };
  // type sample "Aa"
  const type = [...poly([[-0.34, -0.36], [-0.15, 0.36], [0.04, -0.36]]), ...poly([[-0.25, -0.1], [-0.05, -0.1]]),
    circle(0.27, -0.18, 0.17), ...poly([[0.44, 0.02], [0.44, -0.36]])];
  // colour swatches (outlined and filled-looking)
  const swatches = [-1.68, -1.3, -0.92, -0.54].flatMap((x) => [circle(x, 0, 0.15), circle(x, 0, 0.08), circle(x, 0, 0.03)]);
  // pen tool drawing a bezier with anchor points
  // nib tip points down to the curve it is drawing
  const pen = [...poly([[0, -0.3], [0.17, -0.02], [0.1, 0.28], [-0.1, 0.28], [-0.17, -0.02]], true), ...poly([[0, -0.3], [0, -0.04]]), circle(0, 0.0, 0.04)];
  const curve = [circle(-0.55, -0.55, 0.62, 0.35, 1.75), ...rect(-0.0, -0.33, 0.1, 0.1), ...rect(-0.66, 0.06, 0.1, 0.1), ...poly([[-0.66, 0.06], [-0.2, 0.18]])];
  // phone mockup: the product interface the system is applied to
  const phone = [...rect(0, 0, 1.0, 1.95), ...poly([[-0.12, 0.86], [0.12, 0.86]]), ...rect(0, 0.66, 0.8, 0.16),
    ...rect(0, 0.2, 0.8, 0.56), ...poly([[-0.4, -0.08], [-0.1, 0.22], [0.1, 0.04], [0.25, 0.18], [0.4, -0.08]]),
    ...rect(0, -0.32, 0.8, 0.16), ...hLines(-0.4, 0.4, [-0.54]), ...hLines(-0.4, 0.1, [-0.66]),
    circle(-0.25, -0.84, 0.04), circle(0, -0.84, 0.04), circle(0.25, -0.84, 0.04)];
  const stream = (ax: number, ay: number, bx: number, by: number): Gen => (r) =>
    [ax + gauss(r) * 0.02, ay + gauss(r) * 0.02, 0, -1, bx - ax, by - ay, 0, 0.35];
  return compose(count, 35, [
    [0.14, at(type, -1.15, 0.95, 1.05)],
    [0.16, at(swatches, 0, 0.05)],
    [0.08, at(pen, -0.62, -0.92, 1.1)],
    [0.08, at(curve, -0.95, -0.85)],
    [0.42, at(phone, 1.15, 0.05)],
    [0.04, stream(-0.55, 0.85, 0.48, 0.5)],
    [0.04, stream(-0.3, 0.05, 0.5, 0.05)],
    [0.04, stream(-0.35, -0.85, 0.48, -0.4)],
  ]);
}

// ---------------------------------------------------------------- pipeline

/** One icon per automation step, spaced to sit above the four step cards. */
export const PIPELINE_ICONS: Prim[][] = [
  // 01 Trigger: an incoming message
  [...poly([[-0.45, 0.32], [0.45, 0.32], [0.45, -0.22], [-0.1, -0.22], [-0.28, -0.42], [-0.26, -0.22], [-0.45, -0.22]], true),
    circle(-0.2, 0.05, 0.05), circle(0, 0.05, 0.05), circle(0.2, 0.05, 0.05)],
  // 02 Intelligent processing: rules filter the request
  [...poly([[-0.46, 0.4], [0.46, 0.4], [0.1, -0.02], [0.1, -0.4], [-0.1, -0.28], [-0.1, -0.02]], true), ...poly([[-0.3, 0.24], [0.3, 0.24]])],
  // 03 Automated action: the record is written and people are notified
  [circle(-0.05, 0.3, 0.32, 0, TAU), circle(-0.05, -0.02, 0.32, Math.PI, TAU), circle(-0.05, -0.32, 0.32, Math.PI, TAU),
    ...poly([[-0.37, 0.3], [-0.37, -0.32]]), ...poly([[0.27, 0.3], [0.27, -0.32]]), circle(0.36, 0.38, 0.09), circle(0.36, 0.38, 0.04)],
  // 04 Business outcome: answered, done
  [circle(0, 0, 0.4), ...poly([[-0.18, 0], [-0.05, -0.14], [0.2, 0.14]]),
    ...poly([[0, 0.5], [0, 0.58]]), ...poly([[0.42, 0.3], [0.48, 0.36]]), ...poly([[-0.42, 0.3], [-0.48, 0.36]])],
];
const PIPELINE_X = [-3, -1, 1, 3];

function pipeline(count: number): PointShape {
  return compose(count, 41, [
    [0.84, (r) => {
      const j = Math.floor(r() * 4);
      const [x, y] = samplePrims(PIPELINE_ICONS[j], r);
      return [PIPELINE_X[j] + x * 1.05 + gauss(r) * 0.016, y * 1.05 + gauss(r) * 0.016, gauss(r) * 0.05, j];
    }],
    // the enquiry moving from one step to the next
    [0.16, (r) => {
      const j = Math.floor(r() * 3);
      const sx = PIPELINE_X[j] + 0.6;
      return [sx, gauss(r) * 0.02, 0, -1, PIPELINE_X[j + 1] - 0.6 - sx, 0, 0, 0.3];
    }],
  ]);
}

// ---------------------------------------------------------------- delivery process

/** One icon per delivery stage, evenly spaced so each sits above its column on the page. */
export const PROCESS_ICONS: Prim[][] = [
  // 01 Discovery: magnifying glass
  [circle(-0.08, 0.08, 0.28), circle(-0.08, 0.08, 0.2, 0.6, 1.6), ...poly([[0.12, -0.12], [0.42, -0.42]])],
  // 02 Solution design: a small flowchart
  [...rect(0, 0.3, 0.38, 0.22), ...rect(-0.3, -0.3, 0.38, 0.22), ...rect(0.3, -0.3, 0.38, 0.22),
    ...poly([[0, 0.19], [0, 0.02], [-0.3, 0.02], [-0.3, -0.19]]), ...poly([[0, 0.02], [0.3, 0.02], [0.3, -0.19]])],
  // 03 Implementation: code brackets
  [...poly([[-0.2, 0.26], [-0.46, 0], [-0.2, -0.26]]), ...poly([[0.2, 0.26], [0.46, 0], [0.2, -0.26]]), ...poly([[0.09, 0.34], [-0.09, -0.34]])],
  // 04 Testing: lab flask (tested in a sandbox)
  [...poly([[-0.1, 0.44], [-0.1, 0.12], [-0.38, -0.38], [0.38, -0.38], [0.1, 0.12], [0.1, 0.44]]), ...poly([[-0.17, 0.44], [0.17, 0.44]]),
    ...poly([[-0.25, -0.17], [0.25, -0.17]]), circle(-0.06, -0.27, 0.045), circle(0.11, -0.25, 0.035)],
  // 05 Launch & improvement: rocket
  [...poly([[0, 0.48], [0.16, 0.25], [0.16, -0.2], [-0.16, -0.2], [-0.16, 0.25]], true), circle(0, 0.12, 0.07),
    ...poly([[-0.16, -0.04], [-0.32, -0.26], [-0.16, -0.2]]), ...poly([[0.16, -0.04], [0.32, -0.26], [0.16, -0.2]]),
    ...poly([[-0.08, -0.22], [0, -0.46], [0.08, -0.22]])],
];
const PROCESS_X = [-3.2, -1.6, 0, 1.6, 3.2];

function processPath(count: number): PointShape {
  return compose(count, 61, [
    [0.86, (r) => {
      const j = Math.floor(r() * 5);
      const [x, y] = samplePrims(PROCESS_ICONS[j], r);
      return [PROCESS_X[j] + x * 1.05 + gauss(r) * 0.016, y * 1.05 + gauss(r) * 0.016, gauss(r) * 0.05, j];
    }],
    // the hand-over from one stage to the next, flowing left to right
    [0.14, (r) => {
      const j = Math.floor(r() * 4);
      const sx = PROCESS_X[j] + 0.58;
      return [sx, gauss(r) * 0.02, 0, -1, PROCESS_X[j + 1] - 0.58 - sx, 0, 0, 0.3];
    }],
  ]);
}

/**
 * Nominal content size (world units) for each phase. SceneAnchor fits it to the page zone,
 * and ParticleField rescales outgoing particles by it so morphs never spill out of a zone.
 */
export const PHASE_NOMINAL: Record<ScenePhase, [number, number]> = {
  hero: [6.0, 4.4],
  about: [3.2, 2.85],
  problem: [5.0, 4.0],
  cta: [9, 6.2], // larger nominal = smaller cloud: it sits behind the CTA copy
  services: [4.0, 4.0],
  pipeline: [8.0, 1.3], // width-bound, so icons sit above the four cards
  industries: [3.7, 3.0],
  process: [8.0, 1.3], // width-bound, so icon spacing matches the five columns
};

/** Natural size of the opening scatter the page starts from. */
export const SCATTER_NOMINAL: [number, number] = [7.0, 4.8];

// ---------------------------------------------------------------- lookup

export function shapeKey(phase: ScenePhase, serviceIndex: number, industryKey: IndustryKey, problemIndex: number): string {
  if (phase === "problem") return `problem-${problemIndex}`;
  if (phase === "services") return `services-${serviceIndex}`;
  if (phase === "industries") return `industry-${industryKey}`;
  return phase;
}

const cache = new Map<string, PointShape>();

export function buildShape(key: string, count: number): PointShape {
  const id = `${key}:${count}`;
  const hit = cache.get(id);
  if (hit) return hit;
  let shape: PointShape;
  if (key === "hero") shape = brain(count);
  else if (key === "about") shape = buddha(count);
  else if (key === "cta") shape = brain(count, 0.8);
  else if (key === "scatter") shape = scattered(count);
  else if (key === "problem-0") shape = hourglass(count);
  else if (key === "problem-1") shape = copyPaste(count);
  else if (key === "problem-2") shape = brokenTools(count);
  else if (key === "pipeline") shape = pipeline(count);
  else if (key === "process") shape = processPath(count);
  else if (key.startsWith("services-")) shape = SERVICES[Number(key.slice(9))]?.(count) ?? brain(count);
  else if (key.startsWith("industry-")) shape = industry(count, key.slice(9) as IndustryKey);
  else shape = brain(count);
  cache.set(id, shape);
  return shape;
}

/** Deterministic per-particle colours drawn from PALETTE (shared by poster and WebGL). */
export function paletteIndices(count: number, seed = 97): Uint8Array {
  const r = mulberry32(seed);
  const out = new Uint8Array(count);
  const total = PALETTE.reduce((s, [, w]) => s + w, 0);
  for (let i = 0; i < count; i++) {
    let x = r() * total;
    let k = 0;
    while (k < PALETTE.length - 1 && x > PALETTE[k][1]) {
      x -= PALETTE[k][1];
      k++;
    }
    out[i] = k;
  }
  return out;
}
