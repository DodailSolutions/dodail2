import type { MetadataRoute } from "next";
import { getPublishedPages } from "@/lib/cms/api";
import { listLivePosts } from "@/lib/cms/blog";
import { getAllContent, getContent } from "@/lib/cms/content/store";
import { absoluteUrl } from "@/lib/seo/metadata";

/** Revalidate hourly so new articles and pages appear without a redeploy. */
export const revalidate = 3600;

function priorityFor(path: string): number {
  if (path === "/") return 1;
  if (path.startsWith("/solutions") || path.startsWith("/services")) return 0.9;
  if (path.startsWith("/industries") || path === "/consultation") return 0.8;
  if (path === "/privacy" || path === "/terms") return 0.3;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [seo, content, posts, pages] = await Promise.all([
    getContent("site/seo"),
    getAllContent(),
    listLivePosts().catch(() => []),
    getPublishedPages().catch(() => []),
  ]);

  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const add = (path: string, lastModified: string | undefined, changeFrequency: "daily" | "weekly" | "monthly" | "yearly") => {
    const url = absoluteUrl(seo, path);
    if (entries.has(url)) return;
    entries.set(url, {
      url,
      ...(lastModified && { lastModified: new Date(lastModified) }),
      changeFrequency,
      priority: priorityFor(path),
    });
  };

  // Every CMS-managed page (site-wide documents such as the footer have path "*").
  for (const { def, data, updated_at } of content) {
    const doc = { path: def.path, updated_at };
    if (!doc.path || doc.path === "*") continue;
    // Pages switched to "Hide this page from search engines" stay out of the sitemap.
    if ((data as { seo?: { noIndex?: boolean } }).seo?.noIndex) continue;
    const freq = doc.path === "/" || doc.path === "/blog" ? "daily" : doc.path.startsWith("/privacy") || doc.path.startsWith("/terms") ? "yearly" : "weekly";
    add(doc.path, doc.updated_at, freq);
  }

  for (const post of posts) add(`/blog/${post.slug}`, post.updated_at || post.publish_date || post.created_at, "monthly");

  for (const page of pages) {
    if (page.slug === "home" || page.seo_metadata?.no_index) continue;
    add(`/${page.slug}`, page.updated_at, "weekly");
  }

  return [...entries.values()];
}
