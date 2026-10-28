#!/usr/bin/env node

/**
 * Post-build content gate (brief §2 #6, §12 Phase 8). Scans every prerendered page in
 * .next/server/app and exits 1 when it finds template filler or unconfirmed placeholders.
 *
 *   FAIL: "[[CONFIRM", "lorem ipsum", "Far far away", "TODO", other known filler; a page without
 *         exactly one <h1> (indexable pages only).
 *   WARN: title over 60 characters, meta description outside 140–155, duplicate titles or
 *         descriptions, thin service pages. Set STRICT_SEO=1 to turn these into failures.
 *
 * Usage: node scripts/check-content.js   (runs automatically after `npm run build`)
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(".next", "server", "app");
const STRICT = process.env.STRICT_SEO === "1";

const FORBIDDEN = [
  { re: /\[\[CONFIRM/, label: "[[CONFIRM placeholder" },
  { re: /lorem ipsum/i, label: "lorem ipsum" },
  { re: /far far away/i, label: "'Far far away' template text" },
  { re: /\bTODO\b/, label: "TODO" },
  { re: /change my PayPal subscription/i, label: "template FAQ (PayPal)" },
  { re: /Dr\. Smile Dental|Curry Co Bistro|Omkar Infra|Ayura Beauty|Finlytix|Maple Leaf High School|Sunrise Multispeciality/i, label: "fictional use case from the old site" },
  { re: /\b(?:10x revenue|300% more leads|68% lack senior)/i, label: "unsourced marketing claim from the old site" },
  { re: /\+91\s?966400235\b/, label: "old phone typo (+91 966400235)" },
];

const SKIP = [/^\/admin/, /^\/api\//, /^\/_/, /^\/dev\//];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const toRoute = (file) => {
  const rel = path.relative(ROOT, file).replace(/\.html$/, "").split(path.sep).join("/");
  if (rel === "index") return "/";
  return "/" + rel.replace(/\/index$/, "") + "/";
};

const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const files = walk(ROOT);
if (files.length === 0) {
  console.error(`check-content: no prerendered pages found in ${ROOT}. Run the build first.`);
  process.exit(1);
}

const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const note = (strictOnly, route, msg) => (strictOnly && !STRICT ? warnings : errors).push(`${route}  ${msg}`);

let pages = 0;
for (const file of files) {
  const route = toRoute(file);
  if (SKIP.some((re) => re.test(route)) || route === "/_not-found/") continue;
  const html = fs.readFileSync(file, "utf8");
  pages++;

  for (const { re, label } of FORBIDDEN) {
    if (re.test(html)) errors.push(`${route}  contains ${label}`);
  }

  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (!noindex && h1s !== 1) errors.push(`${route}  has ${h1s} <h1> elements (needs exactly 1)`);

  const title = (html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").trim();
  const desc = (html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").trim();
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];

  if (!noindex) {
    if (!title) errors.push(`${route}  missing <title>`);
    else if (title.length > 60) note(true, route, `title is ${title.length} characters (max 60): "${title}"`);
    if (!desc) note(true, route, "missing meta description");
    else if (desc.length < 140 || desc.length > 155) note(true, route, `meta description is ${desc.length} characters (want 140–155)`);
    if (!canonical) note(true, route, "missing canonical link");
    else if (!canonical.endsWith("/") && !/\.[a-z]+$/.test(canonical)) note(true, route, `canonical lacks trailing slash: ${canonical}`);
    if (title) titles.set(title, [...(titles.get(title) ?? []), route]);
    if (desc) descriptions.set(desc, [...(descriptions.get(desc) ?? []), route]);

    if (/^\/services\//.test(route) && route !== "/services/") {
      const words = text(html).split(" ").length;
      const sub = route.split("/").filter(Boolean).length > 2;
      const min = sub ? 900 : 1200;
      if (words < min) warnings.push(`${route}  only ${words} words (target ${min}+)`);
    }
  }
}

for (const [map, kind] of [[titles, "title"], [descriptions, "meta description"]]) {
  for (const [value, routes] of map) {
    if (routes.length > 1) note(true, routes.join(", "), `share the same ${kind}: "${value.slice(0, 70)}"`);
  }
}

console.log(`check-content: scanned ${pages} pages`);
if (warnings.length) {
  console.warn(`\n${warnings.length} warning(s)${STRICT ? "" : " (set STRICT_SEO=1 to fail on these)"}:`);
  for (const w of warnings) console.warn("  ⚠", w);
}
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error("  ✗", e);
  console.error("\ncheck-content FAILED");
  process.exit(1);
}
console.log("check-content passed");
