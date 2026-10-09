import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/about-dodail-leading-digital-agency-in-india",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/our-works",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/digital-marketing-for-dental-clinics-website-seo",
        destination: "/industries/dental",
        permanent: true,
      },
      {
        source: "/hospital-website-seo-solutions-dodail",
        destination: "/industries/dental",
        permanent: true,
      },
      {
        source: "/real-estate-digital-marketing-website-solutions",
        destination: "/industries/real-estate",
        permanent: true,
      },
      {
        source: "/real-estate-website-development-company",
        destination: "/industries/real-estate",
        permanent: true,
      },
      {
        source: "/custom-web-application-development-services",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/custom-website-development-services-wordpress-web-apps",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/wordpress-website-design-development-company",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/seo-services-for-google-ranking-wordpress-shopify-local",
        destination: "/services/digital-growth-seo",
        permanent: true,
      },
      {
        source: "/local-seo-services-for-small-local-businesses",
        destination: "/services/digital-growth-seo",
        permanent: true,
      },
      {
        source: "/geographic-expansion-officer-geo",
        destination: "/services/digital-growth-seo",
        permanent: true,
      },
      {
        source: "/e-commerce-website-development-company-shopify-more",
        destination: "/industries/ecommerce",
        permanent: true,
      },
      {
        source: "/custom-e-commerce-website-solutions",
        destination: "/industries/ecommerce",
        permanent: true,
      },
    ];
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
        ],
      },
    ];
  },
};

export default nextConfig;
