import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.dodail.com";
  const currentDate = new Date();

  const routes = [
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
    "/industries/ecommerce",
    "/work",
    "/blog",
    "/consultation",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/solutions") ? 0.9 : 0.8,
  }));
}
