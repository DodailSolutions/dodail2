/**
 * XML sitemap builders (brief §10.4). `/sitemap.xml` is an index pointing at five child
 * sitemaps. Only built, canonical, indexable pages are listed — never redirects or 410s.
 */
import { routesInSitemap, type SitemapGroup } from "@/content/routes";
import { SITE_URL } from "@/content/site";
import { getAllPosts } from "@/lib/blog/posts";
import { listLivePosts } from "@/lib/cms/blog";
import { getAllContent } from "@/lib/cms/content/store";
import { LANDING_PATHS } from "@/lib/cms/content/registry";

export const SITEMAP_GROUPS: SitemapGroup[] = ["pages", "services", "industries", "work", "blog"];

export interface SitemapUrl {
  path: string;
  lastmod?: string;
  /** Absolute image URLs for <image:image> entries. */
  images?: string[];
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);
const day = (iso?: string) => (iso ? new Date(iso).toISOString().slice(0, 10) : undefined);

/** Paths that are in the registry as built pages but not yet modified by the CMS use the build date. */
export async function urlsFor(group: SitemapGroup): Promise<SitemapUrl[]> {
  const today = new Date().toISOString();
  const urls = new Map<string, SitemapUrl>();
  for (const r of routesInSitemap(group)) urls.set(r.path, { path: r.path, lastmod: today });

  if (group === "blog") {
    for (const p of getAllPosts()) {
      const path = `/blog/${p.slug}/`;
      urls.set(path, { path, lastmod: p.dateModified || p.datePublished });
    }
    // Admin-created CMS posts, unless a migrated post already owns the slug.
    for (const p of await listLivePosts().catch(() => [])) {
      const path = `/blog/${p.slug}/`;
      if (!urls.has(path)) urls.set(path, { path, lastmod: p.updated_at || p.publish_date || p.created_at });
    }
  }

  // Refine lastmod from CMS edits, and skip pages an editor hid from search engines.
  const docs = await getAllContent().catch(() => []);
  const hidden = new Set<string>();
  for (const { def, data, updated_at } of docs) {
    const path = LANDING_PATHS[def.key as keyof typeof LANDING_PATHS] ?? def.path;
    if (!path || path === "*") continue;
    const normalized = path.endsWith("/") || path === "/" ? path : `${path}/`;
    if ((data as { seo?: { noIndex?: boolean } }).seo?.noIndex) hidden.add(normalized);
    const entry = urls.get(normalized);
    if (entry && updated_at) entry.lastmod = updated_at;
  }
  return [...urls.values()].filter((u) => !hidden.has(u.path));
}

export function urlsetXml(urls: SitemapUrl[]): string {
  const hasImages = urls.some((u) => u.images?.length);
  const body = urls
    .map((u) => {
      const lastmod = day(u.lastmod);
      const images = (u.images ?? []).map((i) => `<image:image><image:loc>${esc(abs(i))}</image:loc></image:image>`).join("");
      return `<url><loc>${esc(abs(u.path))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}${images}</url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${
    hasImages ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : ""
  }>\n${body}\n</urlset>\n`;
}

export function indexXml(entries: Array<{ loc: string; lastmod?: string }>): string {
  const body = entries
    .map((e) => `<sitemap><loc>${esc(e.loc)}</loc>${e.lastmod ? `<lastmod>${day(e.lastmod)}</lastmod>` : ""}</sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export async function childSitemap(group: SitemapGroup): Promise<Response> {
  return xmlResponse(urlsetXml(await urlsFor(group)));
}

export const xmlResponse = (xml: string) =>
  new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
