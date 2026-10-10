import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/cms/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.dodail.com";
  const currentDate = new Date();

  // 1. Static Core Public Routes
  const staticRoutes = [
    "",
    "/about",
    "/solutions/ai-automation",
    "/solutions/ai-lead-management",
    "/solutions/ai-customer-support",
    "/solutions/workflow-automation",
    "/services/web-development",
    "/services/digital-growth-seo",
    "/industries",
    "/industries/dental",
    "/industries/real-estate",
    "/industries/manufacturing",
    "/industries/ecommerce",
    "/work",
    "/blog",
    "/consultation",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/solutions") ? 0.9 : 0.8,
  }));

  // 2. Dynamic Published CMS Pages
  try {
    const cmsPages = await getAllPages();
    cmsPages.forEach((page) => {
      if (page.status === "published" && page.slug !== "home") {
        const fullUrl = `${baseUrl}/${page.slug}`;
        if (!sitemapEntries.some((e) => e.url === fullUrl)) {
          sitemapEntries.push({
            url: fullUrl,
            lastModified: new Date(page.updated_at || page.publish_date || currentDate),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }
    });
  } catch (e) {
    // If database unavailable, static routes remain valid
  }

  return sitemapEntries;
}
