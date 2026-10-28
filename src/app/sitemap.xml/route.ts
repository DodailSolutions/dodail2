import { SITE_URL } from "@/content/site";
import { SITEMAP_GROUPS, indexXml, urlsFor, xmlResponse } from "@/lib/seo/sitemaps";

export const revalidate = 3600;

/** Sitemap index: one child sitemap per section, skipping sections that have no built pages yet. */
export async function GET() {
  const entries: Array<{ loc: string; lastmod?: string }> = [];
  for (const group of SITEMAP_GROUPS) {
    const urls = await urlsFor(group);
    if (urls.length === 0) continue;
    const lastmod = urls.map((u) => u.lastmod).filter(Boolean).sort().at(-1);
    entries.push({ loc: `${SITE_URL}/sitemap-${group}.xml`, lastmod });
  }
  return xmlResponse(indexXml(entries));
}
