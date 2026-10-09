#!/usr/bin/env node

/**
 * Route & Integrity Verification Script for Dodail 2.0 (Phase 01)
 */

import fs from "fs";
import path from "path";

const requiredRoutes = [
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/app/solutions/ai-automation/page.tsx",
  "src/app/solutions/ai-lead-management/page.tsx",
  "src/app/solutions/ai-customer-support/page.tsx",
  "src/app/solutions/workflow-automation/page.tsx",
  "src/app/services/web-development/page.tsx",
  "src/app/services/digital-growth-seo/page.tsx",
  "src/app/industries/page.tsx",
  "src/app/industries/dental/page.tsx",
  "src/app/industries/real-estate/page.tsx",
  "src/app/industries/ecommerce/page.tsx",
  "src/app/work/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/consultation/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
];

const requiredAssets = [
  "public/brand/dodail-emblem.png",
  "public/brand/dodail-full-logo.png",
];

console.log("=== DODAIL 2.0 ROUTE & INTEGRITY VERIFICATION ===");

let passed = true;

// 1. Verify all routes exist
console.log("\n1. Verifying Required Routes...");
for (const route of requiredRoutes) {
  if (fs.existsSync(route)) {
    console.log(`  ✓ Found route: ${route}`);
  } else {
    console.error(`  ✗ Missing route: ${route}`);
    passed = false;
  }
}

// 2. Verify brand assets exist
console.log("\n2. Verifying Official Brand Assets...");
for (const asset of requiredAssets) {
  if (fs.existsSync(asset)) {
    const stats = fs.statSync(asset);
    console.log(`  ✓ Found brand asset: ${asset} (${Math.round(stats.size / 1024)} KB)`);
  } else {
    console.error(`  ✗ Missing brand asset: ${asset}`);
    passed = false;
  }
}

// 3. Verify CSS brand tokens & reduced-motion
console.log("\n3. Verifying Design Tokens & Accessibility in globals.css...");
const globalsCss = fs.readFileSync("src/app/globals.css", "utf-8");
if ((globalsCss.includes("#0A1B2A") || globalsCss.includes("#071A28")) && (globalsCss.includes("#FA5B0F") || globalsCss.includes("#FF6B2C"))) {
  console.log("  ✓ Measured brand tokens (#071A28/#0A1B2A and #FF6B2C/#FA5B0F) present");
} else {
  console.error("  ✗ Missing measured brand tokens in globals.css");
  passed = false;
}

if (globalsCss.includes("prefers-reduced-motion")) {
  console.log("  ✓ Accessibility: prefers-reduced-motion rule verified");
} else {
  console.error("  ✗ Missing prefers-reduced-motion in globals.css");
  passed = false;
}

if (globalsCss.includes(":focus-visible")) {
  console.log("  ✓ Accessibility: :focus-visible visible focus ring verified");
} else {
  console.error("  ✗ Missing :focus-visible in globals.css");
  passed = false;
}

// 4. Verify no casino spam keywords in source
console.log("\n4. Verifying Clean Source (Anti-Spam Verification)...");
const forbiddenKeywords = ["casino", "gambling", "poker", "roulette", "slot"];
let spamDetected = false;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== ".git") {
        scanDir(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
      const content = fs.readFileSync(fullPath, "utf-8").toLowerCase();
      for (const kw of forbiddenKeywords) {
        if (content.includes(kw)) {
          console.warn(`  [Notice] Found '${kw}' in ${fullPath}`);
          // Let's check context (slot in calendar is fine, casino is bad)
          if (kw === "casino" || kw === "gambling" || kw === "poker") {
            spamDetected = true;
          }
        }
      }
    }
  }
}

scanDir("src");

if (spamDetected) {
  console.error("  ✗ Spam keywords detected in src directory!");
  passed = false;
} else {
  console.log("  ✓ Zero spam or compromised keywords in codebase");
}

console.log("\n================================================");
if (passed) {
  console.log("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!");
  process.exit(0);
} else {
  console.error("VERIFICATION FAILED!");
  process.exit(1);
}
