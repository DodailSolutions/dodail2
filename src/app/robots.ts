import type { MetadataRoute } from "next";
import { getContent } from "@/lib/cms/content/store";
import { absoluteUrl, siteUrl } from "@/lib/seo/metadata";

/** AI answer-engine crawlers. Dodail sells GEO, so its own site should be citeable (brief §10.4). */
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "CCBot"];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getContent("site/seo");
  // Admin, APIs, draft previews and internal search/filter URLs stay out of crawls.
  const privatePaths = ["/admin/", "/api/", "/preview", "/*?s=", "/*?q=", "/*?filter=", "/*?sort="];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/admin/", "/api/", "/preview"] },
    ],
    sitemap: absoluteUrl(seo, "/sitemap.xml"),
    host: siteUrl(seo),
  };
}
