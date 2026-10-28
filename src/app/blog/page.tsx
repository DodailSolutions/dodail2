import Link from "next/link";
import { JsonLd } from "@/components/seo/StructuredData";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { PostGrid, categoryCounts } from "@/components/templates/BlogListing";
import { requireRoute } from "@/content/routes";
import { getAllPosts } from "@/lib/blog/posts";
import { listLivePosts } from "@/lib/cms/blog";
import { getContent } from "@/lib/cms/content/store";
import { routeMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/metadata";
import { graph, typedPageSchema } from "@/lib/seo/schema";

/** Safety net so scheduled CMS articles appear even without a cron run. */
export const revalidate = 600;

export function generateMetadata() {
  return routeMetadata("/blog/");
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default async function BlogIndexPage() {
  const route = requireRoute("/blog/");
  const posts = getAllPosts();
  const [seo, cmsPosts] = await Promise.all([getContent("site/seo"), listLivePosts().catch(() => [])]);
  // Files win: a CMS post is listed only if no migrated post shares its slug.
  const extra = cmsPosts.filter((p) => !posts.some((f) => f.slug === p.slug));

  return (
    <>
      <JsonLd
        data={graph(
          typedPageSchema(seo, "CollectionPage", route.path, { title: route.h1, description: route.description }),
          posts.length > 0
            ? {
                "@type": "ItemList",
                itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(seo, `/blog/${p.slug}/`), name: p.title })),
              }
            : null
        )}
      />
      <PageHero
        path={route.path}
        h1={route.h1}
        subheading="Practical guides on SEO, Generative Engine Optimization and AI marketing, written by the team that does the work."
        noCtas
      />
      <PostGrid posts={posts} counts={categoryCounts(posts)} title="Latest guides" />
      {extra.length > 0 && (
        <Section id="more-articles" title="More articles">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {extra.map((p) => {
              const date = p.publish_date || p.created_at;
              return (
                <li key={p.id} className="relative rounded-2xl border border-border-token bg-surface p-6 shadow-sm hover:border-[#FF6B2C]">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-orange-700">{p.category}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-fg">
                    <Link href={`/blog/${p.slug}/`} className="after:absolute after:inset-0">
                      {p.title}
                    </Link>
                  </h3>
                  {p.excerpt && <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.excerpt}</p>}
                  <time dateTime={date} className="mt-4 block text-xs text-fg-muted">
                    {dateFormat.format(new Date(date))}
                  </time>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
