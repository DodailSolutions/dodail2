import { SITE_URL, site } from "@/content/site";
import { getAllPosts } from "@/lib/blog/posts";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS feed. The old WordPress /feed/ redirects here (brief §9.1). */
export function GET() {
  const posts = getAllPosts().slice(0, 50);
  const items = posts
    .map(
      (p) => `<item>
<title>${esc(p.title)}</title>
<link>${SITE_URL}/blog/${p.slug}/</link>
<guid isPermaLink="true">${SITE_URL}/blog/${p.slug}/</guid>
<pubDate>${new Date(p.datePublished).toUTCString()}</pubDate>
<category>${esc(p.categoryName)}</category>
<description>${esc(p.metaDescription || p.excerpt)}</description>
</item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.brand)} Blog</title>
<link>${SITE_URL}/blog/</link>
<atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
<description>Practical guides on SEO, Generative Engine Optimization and AI marketing from Dodail.</description>
<language>en-IN</language>
${items}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
