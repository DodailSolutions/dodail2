import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/content/legacy/redirects";

const nextConfig: NextConfig = {
  // Marks this app as upgraded by the Next.js security upgrade agent (16.4.0 → 16.4.3).
  experimental: {
    agentUpgrade: "security",
    // Import only the icons / helpers actually used instead of whole barrels (smaller client JS).
    optimizePackageImports: ["lucide-react", "framer-motion", "three"],
  },
  poweredByHeader: false,
  images: {
    // AVIF/WebP first: much smaller than PNG/JPEG for the logo, avatar and photos.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // The old WordPress site used trailing slashes; keeping them means every legacy URL resolves in one hop.
  trailingSlash: true,
  // 301s from every old dodail.com URL (brief §9.1). Spam URLs get a 410 in src/proxy.ts instead.
  async redirects() {
    // statusCode 301 rather than `permanent: true`, which Next.js sends as 308.
    return LEGACY_REDIRECTS.map(({ from, to }) => ({ source: from, destination: to, statusCode: 301 as const }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Brand images are revalidated weekly (not immutable: files are replaced in place).
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
