import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/preview",
          "/_next/",
          "/slot-gacor-maxwin",
          "/judi-online-terpercaya",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/solutions/", "/services/", "/industries/", "/about", "/work", "/blog"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/solutions/", "/services/", "/industries/", "/about", "/work", "/blog"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.dodail.com/sitemap.xml",
  };
}
