/**
 * About-section point cloud: the Dodail HQ artwork sampled into coloured particles
 * (scripts/build-building-points.mjs -> buildingPoints.ts). Imported only by ParticleField, which
 * lives in the lazy three.js chunk, so the ~70 KB of data never reaches the main bundle.
 */
import { BUILDING_ASPECT, BUILDING_DATA, BUILDING_POINTS } from "./buildingPoints";
import { mulberry32, type PointShape } from "./particleShapes";

/** Tags for particles that carry their own colour (see the vertex shader); FINE = signboard, small dots. */
export const TAG_PHOTO = -7;
export const TAG_PHOTO_FINE = -8;

/** World height of the artwork; width follows its aspect ratio. */
const WORLD_H = 3.2;
const WORLD_W = WORLD_H * BUILDING_ASPECT;
/** The building sits a little above the middle of the art; shift so it centres in its zone. */
const CENTER_V = 0.45;

let decoded: { x: Float32Array; y: Float32Array; z: Float32Array; rgb: Float32Array; fine: Uint8Array } | null = null;

function decode() {
  if (decoded) return decoded;
  const bin = atob(BUILDING_DATA);
  const n = BUILDING_POINTS;
  const x = new Float32Array(n);
  const y = new Float32Array(n);
  const z = new Float32Array(n);
  const rgb = new Float32Array(n * 3);
  const fine = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const o = i * 8;
    const b = (k: number) => bin.charCodeAt(o + k);
    x[i] = (b(0) | (b(1) << 8)) / 65535;
    y[i] = (b(2) | (b(3) << 8)) / 65535;
    rgb[i * 3] = b(4) / 255;
    rgb[i * 3 + 1] = b(5) / 255;
    rgb[i * 3 + 2] = b(6) / 255;
    z[i] = ((b(7) >> 1) / 127 - 0.5) * 1.2; // trees forward, drifting dots spread front and back
    fine[i] = b(7) & 1;
  }
  decoded = { x, y, z, rgb, fine };
  return decoded;
}

const cache = new Map<number, PointShape>();

/** The shuffled cloud is a fair sample at any prefix length, so phones just take fewer points. */
export function buildingPhotoShape(count: number): PointShape {
  const hit = cache.get(count);
  if (hit) return hit;
  const d = decode();
  const r = mulberry32(5);
  const pos = new Float32Array(count * 3);
  const tag = new Float32Array(count).fill(TAG_PHOTO);
  const motion = new Float32Array(count * 4);
  const color = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const k = i % BUILDING_POINTS;
    // Past the stored points (large counts) reuse them with a small offset.
    const jit = i >= BUILDING_POINTS ? 0.004 : 0;
    pos[i * 3] = (d.x[k] - 0.5) * WORLD_W + (r() - 0.5) * jit;
    pos[i * 3 + 1] = (CENTER_V - d.y[k]) * WORLD_H + (r() - 0.5) * jit;
    pos[i * 3 + 2] = d.z[k];
    if (d.fine[k]) tag[i] = TAG_PHOTO_FINE;
    color[i * 3] = d.rgb[k * 3];
    color[i * 3 + 1] = d.rgb[k * 3 + 1];
    color[i * 3 + 2] = d.rgb[k * 3 + 2];
  }
  const shape: PointShape = { pos, tag, motion, color };
  cache.set(count, shape);
  return shape;
}
