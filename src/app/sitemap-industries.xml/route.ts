import { childSitemap } from "@/lib/seo/sitemaps";

export const revalidate = 3600;
export const GET = () => childSitemap("industries");
