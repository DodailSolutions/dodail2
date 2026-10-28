import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/content/legacy/redirects";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
