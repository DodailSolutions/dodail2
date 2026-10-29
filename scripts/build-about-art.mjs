#!/usr/bin/env node
/**
 * Builds public/brand/about-hq-art.webp: the Dodail HQ artwork with the pale sky removed (transparent),
 * cropped to the About card's frame. AboutParticleArt draws it as a dense grid of three.js particles
 * (each takes its colour from this texture) and uses the same file as the first-paint / no-WebGL poster.
 *
 *   node scripts/build-about-art.mjs            # regenerate
 *   DEBUG_DIR=/tmp node scripts/build-about-art.mjs --debug   # also write a preview on mid-gray
 *
 * Source: scripts/assets/dodail-hq-particles.webp (a screenshot of the finished card, so the badge and caption
 * baked into it are masked out). Needs `sharp` (installed with Next.js).
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pnpmDir = path.join("node_modules", ".pnpm");
const sharpDir = fs.readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
const sharp = require(path.resolve(pnpmDir, sharpDir, "node_modules", "sharp"));

const SRC = "scripts/assets/dodail-hq-particles.webp";
const OUT = "public/brand/about-hq-art.webp";
const SCALE = 0.9; // working / output resolution relative to the 1122x1402 source
const debug = process.argv.includes("--debug");

const meta = await sharp(SRC).metadata();
const W = Math.round(meta.width * SCALE);
const H = Math.round(meta.height * SCALE);
const { data } = await sharp(SRC).resize(W, H).removeAlpha().raw().toBuffer({ resolveWithObject: true });

const lum = new Float32Array(W * H);
const chroma = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) {
  const r = data[i * 3] / 255, g = data[i * 3 + 1] / 255, b = data[i * 3 + 2] / 255;
  lum[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  chroma[i] = Math.max(r, g, b) - Math.min(r, g, b);
}

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
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const x0 = Math.max(0, x - rad), x1 = Math.min(W, x + rad + 1);
    const y0 = Math.max(0, y - rad), y1 = Math.min(H, y + rad + 1);
    out[y * W + x] = (sat[y1 * iw + x1] - sat[y0 * iw + x1] - sat[y1 * iw + x0] + sat[y0 * iw + x0]) / ((x1 - x0) * (y1 - y0));
  }
  return out;
}

const mean = boxMean(lum, 2);
const mean2 = boxMean(lum.map((v) => v * v), 2);
const std = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) std[i] = Math.sqrt(Math.max(0, mean2[i] - mean[i] * mean[i]));

// Building silhouette and UI regions, read off the 1122x1402 art.
const SILHOUETTE = [[232, 905], [243, 528], [305, 495], [305, 368], [808, 183], [830, 172], [975, 500], [985, 515], [985, 1075], [300, 1075], [300, 935]];
const inPoly = (poly, px, py) => {
  const x = (px / W) * meta.width, y = (py / H) * meta.height;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};
const inUi = (px, py) => {
  const x = px / W, y = py / H;
  return (x < 0.5 && y < 0.135) || y > 0.835;
};

// Alpha: inside the building, opaque. Outside, keep only what stands out from the smooth pale sky
// (trees, the orange/navy balls, bushes): detail and darkness, not the soft colour glows.
const alpha = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) {
  const px = i % W, py = (i / W) | 0;
  if (inUi(px, py)) { alpha[i] = 0; continue; }
  if (inPoly(SILHOUETTE, px, py)) { alpha[i] = 1; continue; }
  // The screenshot's card border: a thin pale vertical line at both sides.
  const fx = px / W;
  if (((fx > 0.04 && fx < 0.06) || (fx > 0.94 && fx < 0.96)) && lum[i] > 0.7 && chroma[i] < 0.2) { alpha[i] = 0; continue; }
  const dark = Math.max(0, 0.86 - lum[i]) / 0.86;
  alpha[i] = Math.min(1, 7 * std[i] + 1.7 * dark);
}
// Feather the mask and drop faint specks.
const soft = boxMean(boxMean(alpha, 1), 1);
for (let i = 0; i < W * H; i++) alpha[i] = soft[i] < 0.12 ? 0 : Math.min(1, soft[i] * 1.25);

// Crop to the card's frame: full width, a vertical band centred on the building.
const CENTER_V = 0.45;
const BAND = 0.734;
const y0 = Math.max(0, Math.round((CENTER_V - BAND / 2) * H));
const y1 = Math.min(H, Math.round((CENTER_V + BAND / 2) * H));
const CH = y1 - y0;
const rgba = Buffer.alloc(W * CH * 4);
for (let y = 0; y < CH; y++) for (let x = 0; x < W; x++) {
  const s = (y + y0) * W + x, d = (y * W + x) * 4;
  rgba[d] = data[s * 3]; rgba[d + 1] = data[s * 3 + 1]; rgba[d + 2] = data[s * 3 + 2];
  rgba[d + 3] = Math.round(alpha[s] * 255);
}
await sharp(rgba, { raw: { width: W, height: CH, channels: 4 } }).webp({ quality: 86, alphaQuality: 88 }).toFile(OUT);
console.log(`wrote ${OUT}: ${W}x${CH}, aspect ${(W / CH).toFixed(4)}, ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);

if (debug) {
  const dir = process.env.DEBUG_DIR || ".";
  await sharp({ create: { width: W, height: CH, channels: 3, background: { r: 120, g: 125, b: 135 } } })
    .composite([{ input: OUT }])
    .png()
    .toFile(path.join(dir, "art-preview.png"));
  console.log("debug preview written to", dir);
}
