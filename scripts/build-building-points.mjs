#!/usr/bin/env node
/**
 * Samples scripts/assets/dodail-hq-particles.webp (the Dodail HQ artwork) into a coloured point cloud
 * for the About section's three.js scene, and writes src/components/3d/buildingPoints.ts.
 *
 *   node scripts/build-building-points.mjs            # regenerate the data module
 *   node scripts/build-building-points.mjs --debug    # also write score/preview PNGs to $DEBUG_DIR
 *
 * Needs `sharp` (installed with Next.js). Points are weighted by how much they stand out from the
 * pale, smooth sky (colour, darkness, local detail), so the building, trees and drifting dots are
 * kept and empty sky is not. The order is shuffled, so any prefix is a fair sample (mobile uses a
 * smaller prefix). Per point: x, y (uint16 across the image), r, g, b, z (uint8 depth hint).
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pnpmDir = path.join("node_modules", ".pnpm");
const sharpDir = fs.readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
const sharp = require(path.resolve(pnpmDir, sharpDir, "node_modules", "sharp"));

const SRC = "scripts/assets/dodail-hq-particles.webp";
const OUT = "src/components/3d/buildingPoints.ts";
const N = 14000;
const SCALE = 0.5; // working resolution
const debug = process.argv.includes("--debug");
const debugDir = process.env.DEBUG_DIR || ".";

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(2026);

const meta = await sharp(SRC).metadata();
const W = Math.round(meta.width * SCALE);
const H = Math.round(meta.height * SCALE);
const { data } = await sharp(SRC).resize(W, H).removeAlpha().raw().toBuffer({ resolveWithObject: true });

const lum = new Float32Array(W * H);
const chroma = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) {
  const r = data[i * 3] / 255;
  const g = data[i * 3 + 1] / 255;
  const b = data[i * 3 + 2] / 255;
  lum[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  chroma[i] = Math.max(r, g, b) - Math.min(r, g, b);
}

/** Box-filtered local mean via an integral image. */
function boxMean(src, rad) {
  const iw = W + 1;
  const sat = new Float64Array(iw * (H + 1));
  for (let y = 0; y < H; y++) {
    let row = 0;
    for (let x = 0; x < W; x++) {
      row += src[y * W + x];
      sat[(y + 1) * iw + x + 1] = sat[y * iw + x + 1] + row;
    }
  }
  const out = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const x0 = Math.max(0, x - rad), x1 = Math.min(W, x + rad + 1);
      const y0 = Math.max(0, y - rad), y1 = Math.min(H, y + rad + 1);
      const s = sat[y1 * iw + x1] - sat[y0 * iw + x1] - sat[y1 * iw + x0] + sat[y0 * iw + x0];
      out[y * W + x] = s / ((x1 - x0) * (y1 - y0));
    }
  }
  return out;
}

const lum2 = lum.map((v) => v * v);
const mean = boxMean(lum, 3);
const mean2 = boxMean(lum2, 3);
const std = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) std[i] = Math.sqrt(Math.max(0, mean2[i] - mean[i] * mean[i]));

// The art is a screenshot of the finished card: ignore the UI drawn on top of it (badge top-left,
// caption card at the bottom).
const inUi = (px, py) => {
  const x = px / W;
  const y = py / H;
  return (x < 0.5 && y < 0.135) || y > 0.835;
};

// Building silhouette, read off the 1122x1402 art (signboard front + side faces, upper floors, ground
// floor glass). Inside it, pale pixels are building surface, never sky.
const SILHOUETTE = [[232, 905], [243, 528], [305, 495], [305, 368], [808, 183], [830, 172], [975, 500], [985, 515], [985, 1075], [300, 1075], [300, 935]];
/** The signboard front face (logo + wordmark): sampled separately, densely, and drawn with small dots. */
const SIGN = [[305, 368], [808, 183], [810, 350], [307, 495]];
const inPoly = (poly, px, py) => {
  const x = (px / W) * meta.width;
  const y = (py / H) * meta.height;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};
const inBuilding = (px, py) => {
  const x = (px / W) * meta.width;
  const y = (py / H) * meta.height;
  let inside = false;
  for (let i = 0, j = SILHOUETTE.length - 1; i < SILHOUETTE.length; j = i++) {
    const [xi, yi] = SILHOUETTE[i];
    const [xj, yj] = SILHOUETTE[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

// Sky = pale, smooth pixels connected to the image border (flood fill). Pale pixels that are NOT
// connected to it (the white signboard face, glass glare) are building and must keep points.
const isSkyLike = (i) => chroma[i] < 0.2 && lum[i] > 0.82 && std[i] < 0.022;
const sky = new Uint8Array(W * H);
const queue = [];
const seed = (px, py) => {
  const i = py * W + px;
  if (!sky[i] && isSkyLike(i)) { sky[i] = 1; queue.push(i); }
};
for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
for (let y = 0; y < H; y++) { seed(0, y); seed(W - 1, y); }
while (queue.length) {
  const i = queue.pop();
  const px = i % W;
  const py = (i / W) | 0;
  if (px > 0) seed(px - 1, py);
  if (px < W - 1) seed(px + 1, py);
  if (py > 0) seed(px, py - 1);
  if (py < H - 1) seed(px, py + 1);
}

// How much a pixel stands out from the sky.
const score = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) {
  const px = i % W;
  const py = (i / W) | 0;
  const bld = inBuilding(px, py);
  if (inUi(px, py) || (sky[i] && !bld) || inPoly(SIGN, px, py)) { score[i] = 0; continue; }
  const dark = Math.max(0, 0.86 - lum[i]) / 0.86;
  let s = 1.5 * chroma[i] + 1.3 * dark + 5.5 * std[i];
  if (bld) s = Math.max(s, 0.16); // building surface (signboard face, glass glare) always keeps points
  score[i] = Math.min(1, s);
}
const density = boxMean(score, 10); // used to tell building/trees from isolated drifting dots

// Weighted sampling without replacement (A-Res): key = u^(1/w); keep the N largest keys.
const keys = [];
for (let i = 0; i < W * H; i++) {
  const w = Math.pow(score[i], 1.35);
  if (w <= 0.0008) continue;
  keys.push([Math.pow(rand(), 1 / w), i]);
}
keys.sort((a, b) => b[0] - a[0]);
const FINE = 3600;
const pickedMain = keys.slice(0, N - FINE).map((k) => k[1]);

// Signboard: weight by contrast so lettering and the ring dominate, with a thin share of white face.
const fineKeys = [];
for (let i = 0; i < W * H; i++) {
  if (!inPoly(SIGN, i % W, (i / W) | 0)) continue;
  const dark = Math.max(0, 0.86 - lum[i]) / 0.86;
  const w = Math.pow(Math.min(1, 1.6 * chroma[i] + 1.5 * dark + 4 * std[i]), 2) + 0.012;
  fineKeys.push([Math.pow(rand(), 1 / w), i]);
}
fineKeys.sort((a, b) => b[0] - a[0]);
const fineSet = new Set(fineKeys.slice(0, FINE).map((k) => k[1]));
const picked = [...pickedMain, ...fineSet];
// Shuffle so every prefix is a fair sample.
for (let i = picked.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1));
  [picked[i], picked[j]] = [picked[j], picked[i]];
}

const bytes = new Uint8Array(picked.length * 8);
let trees = 0;
let dust = 0;
picked.forEach((idx, n) => {
  const px = idx % W;
  const py = Math.floor(idx / W);
  const x = Math.min(65535, Math.round(((px + rand()) / W) * 65535));
  const y = Math.min(65535, Math.round(((py + rand()) / H) * 65535));
  let r = data[idx * 3], g = data[idx * 3 + 1], b = data[idx * 3 + 2];
  // Light saturation lift so the cloud reads vividly.
  const m = (r + g + b) / 3;
  r = Math.max(0, Math.min(255, m + (r - m) * 1.18));
  g = Math.max(0, Math.min(255, m + (g - m) * 1.18));
  b = Math.max(0, Math.min(255, m + (b - m) * 1.18));
  const isTree = data[idx * 3 + 1] > data[idx * 3] + 6 && data[idx * 3 + 1] > data[idx * 3 + 2] + 6;
  const isFine = fineSet.has(idx);
  const isDust = !isFine && density[idx] < 0.07;
  let z = 0.5;
  if (isTree) { z = 0.5 + 0.22; trees++; }
  else if (isDust) { z = 0.5 + (rand() - 0.5) * 0.9; dust++; }
  else z = isFine ? 0.54 : 0.5 + (rand() - 0.5) * 0.04; // the signboard sits a touch in front
  const fine = fineSet.has(idx) ? 1 : 0;
  const z7 = Math.round(Math.max(0, Math.min(1, z)) * 127);
  bytes.set([x & 255, x >> 8, y & 255, y >> 8, r, g, b, (z7 << 1) | fine], n * 8);
});

const b64 = Buffer.from(bytes).toString("base64");
const out = `/**
 * GENERATED by scripts/build-building-points.mjs from scripts/assets/dodail-hq-particles.webp. Do not edit.
 * ${picked.length} points, 8 bytes each: x (u16 LE), y (u16 LE), r, g, b, z+flag (u8: z in the high 7 bits, bit 0 = fine signboard point). Shuffled, so any prefix is a fair sample.
 * Image: ${meta.width}x${meta.height}. Loaded only inside the lazy three.js chunk.
 */
export const BUILDING_POINTS = ${picked.length};
export const BUILDING_ASPECT = ${(meta.width / meta.height).toFixed(5)}; // width / height of the source art
export const BUILDING_DATA = "${b64}";
`;
fs.writeFileSync(OUT, out);
console.log(`wrote ${OUT}: ${picked.length} points, ${(out.length / 1024).toFixed(0)} KB source (${trees} tree, ${dust} drifting)`);

// Static poster (first paint and no-WebGL fallback): the same points as dots on a transparent canvas,
// cropped to the scene's nominal box (full width, vertical band centred on the building) so it lines
// up with the WebGL cloud. Works on both themes because the background is transparent.
{
  const CENTER_V = 0.45;
  const bandH = 2.35 / 3.2; // nominal height / art height (see PHASE_NOMINAL.about)
  const v0 = CENTER_V - bandH / 2;
  const PW = 640;
  const PH = Math.round(PW * (bandH * meta.height) / meta.width);
  const dots = [];
  picked.forEach((idx, n) => {
    const u = (bytes[n * 8] | (bytes[n * 8 + 1] << 8)) / 65535;
    const v = (bytes[n * 8 + 2] | (bytes[n * 8 + 3] << 8)) / 65535;
    const vy = (v - v0) / bandH;
    if (vy < 0 || vy > 1) return;
    const fineDot = bytes[n * 8 + 7] & 1;
    dots.push(`<circle cx="${(u * PW).toFixed(1)}" cy="${(vy * PH).toFixed(1)}" r="${fineDot ? 1.1 : 2.4}" fill="rgb(${bytes[n * 8 + 4]},${bytes[n * 8 + 5]},${bytes[n * 8 + 6]})"/>`);
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}">${dots.join("")}</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 72, alphaQuality: 80 }).toFile("public/brand/about-hq-poster.webp");
  console.log(`wrote public/brand/about-hq-poster.webp (${PW}x${PH}, ${(fs.statSync("public/brand/about-hq-poster.webp").size / 1024).toFixed(0)} KB)`);
}

if (debug) {
  const gray = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) gray[i] = Math.round(score[i] * 255);
  await sharp(gray, { raw: { width: W, height: H, channels: 1 } }).png().toFile(path.join(debugDir, "score.png"));
  // Preview: the sampled points drawn as dots on mid-gray.
  const prev = Buffer.alloc(W * H * 3, 120); // mid-gray so white/pale points are visible
  picked.forEach((idx, n) => {
    const x = (bytes[n * 8] | (bytes[n * 8 + 1] << 8)) / 65535 * (W - 1);
    const y = (bytes[n * 8 + 2] | (bytes[n * 8 + 3] << 8)) / 65535 * (H - 1);
    const px = Math.round(x), py = Math.round(y);
    for (let dy = 0; dy <= 1; dy++) for (let dx = 0; dx <= 1; dx++) {
      const q = Math.min(H - 1, py + dy) * W + Math.min(W - 1, px + dx);
      prev.set([bytes[n * 8 + 4], bytes[n * 8 + 5], bytes[n * 8 + 6]], q * 3);
    }
  });
  await sharp(prev, { raw: { width: W, height: H, channels: 3 } }).png().toFile(path.join(debugDir, "preview.png"));
  console.log("debug images written to", debugDir);
}
