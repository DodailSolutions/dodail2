import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/StructuredData";
import { readingTime } from "@/components/cms/Markdown";
import { listLivePosts } from "@/lib/cms/blog";
import { getContent } from "@/lib/cms/content/store";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo/schema";

/** Safety net so scheduled articles appear even without a cron run. */
export const revalidate = 600;

export async function generateMetadata() {
  return pageMetadata("/blog", (await getContent("blog")).seo);
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default async function BlogIndexPage() {
  const [content, seo, posts] = await Promise.all([getContent("blog"), getContent("site/seo"), listLivePosts()]);
  const { hero, resources } = content;

  return (
    <div className="flex flex-col gap-14 sm:gap-20 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <JsonLd
        data={graph(
          { ...webPageSchema(seo, "/blog", content.seo), "@type": "CollectionPage" },
          breadcrumbSchema(seo, [{ name: hero.badge || "Blog", path: "/blog" }]),
          posts.length > 0
            ? {
                "@type": "ItemList",
                itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(seo, `/blog/${p.slug}`), name: p.title })),
              }
            : null
        )}
      />
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">{hero.badge}</Badge>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">{hero.title}</h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{hero.subtitle}</p>
      </section>

      <section className="w-full" aria-labelledby="latest-heading">
        <h2 id="latest-heading" className="text-xl sm:text-2xl font-bold text-slate-950 mb-6">{content.latestTitle}</h2>
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">{content.emptyText}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const date = post.publish_date || post.created_at;
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md active:scale-[0.99]"
                >
                  {post.featured_image && (
                    // eslint-disable-next-line @next/next/no-img-element -- featured images may come from any media host
                    <img src={post.featured_image} alt="" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-mono">
                      <span className="text-[#C2410C] font-semibold">{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {readingTime(post.content ?? post.content_markdown ?? "")} min read
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-slate-950 group-hover:text-[#C2410C] transition-colors">{post.title}</h3>
                    {post.excerpt && <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">{post.excerpt}</p>}
                    <div className="mt-auto pt-5 flex items-center justify-between text-xs">
                      <time dateTime={date} className="text-slate-400 font-mono">{dateFormat.format(new Date(date))}</time>
                      <span className="font-semibold text-[#C2410C] inline-flex items-center">
                        {content.readMoreLabel} <ArrowRight className="h-3 w-3 ml-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {resources.items.length > 0 && (
        <section className="w-full" aria-labelledby="resources-heading">
          <div className="mb-6">
            <h2 id="resources-heading" className="text-xl sm:text-2xl font-bold text-slate-950">{resources.title}</h2>
            {resources.note && <p className="mt-1 text-sm text-slate-500">{resources.note}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.items.map((item, i) => (
              <Card key={`${item.title}-${i}`} className="flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-mono">
                    <span className="text-[#C2410C] font-semibold">{item.category}</span>
                    {item.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {item.readTime}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg text-slate-950 leading-snug">{item.title}</CardTitle>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.excerpt}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                  <Link
                    href={`/contact?topic=${encodeURIComponent(item.title)}`}
                    className="text-xs font-semibold text-[#C2410C] hover:underline inline-flex items-center"
                  >
                    {resources.ctaLabel} <ArrowRight className="h-3 w-3 ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
