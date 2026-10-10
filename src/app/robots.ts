import type { MetadataRoute } from "next";
import { getContent } from "@/lib/cms/content/store";
import { absoluteUrl, siteUrl } from "@/lib/seo/metadata";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getContent("site/seo");
  const privatePaths = ["/admin", "/admin/", "/api/", "/preview"];

  return {
    rules: [
      // Search engines and AI answer engines (GPTBot, Google-Extended, PerplexityBot, ClaudeBot…)
      // may crawl every public page; only the admin panel and APIs are off-limits.
      { userAgent: "*", allow: "/", disallow: privatePaths },
    ],
    sitemap: absoluteUrl(seo, "/sitemap.xml"),
    host: siteUrl(seo),
  };
}
