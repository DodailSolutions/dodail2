import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/StructuredData";
import { extractHeadings, Markdown, readingTime } from "@/components/cms/Markdown";
import { getPostBySlug, isPostLive, listLivePosts } from "@/lib/cms/blog";
import { getContent } from "@/lib/cms/content/store";
import { pageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/seo/schema";
import type { BlogPost } from "@/lib/cms/types";

/** Safety net so scheduled articles appear even without a cron run. */
export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listLivePosts()).map((p) => ({ slug: p.slug }));
}

/** Live article, or any article while an editor is previewing (Draft Mode). */
async function loadPost(slug: string): Promise<{ post: BlogPost; preview: boolean } | null> {
  const post = await getPostBySlug(slug);
  if (!post) return null;
  if (isPostLive(post)) return { post, preview: false };
  return (await draftMode()).isEnabled ? { post, preview: true } : null;
}

export async function generateMetadata({ params }: Props) {
  const found = await loadPost((await params).slug);
  if (!found) return { title: "Article not found", robots: { index: false } };
  const { post, preview } = found;
  return pageMetadata(
    post.seo_metadata?.canonical_url || `/blog/${post.slug}`,
    {
      title: post.seo_metadata?.meta_title || post.title,
      description: post.seo_metadata?.meta_description || post.excerpt || "",
    },
    {
      type: "article",
      image: post.featured_image,
      publishedTime: post.publish_date || post.created_at,
      modifiedTime: post.updated_at,
      noIndex: preview || post.seo_metadata?.no_index,
    }
  );
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Up to three other live articles, same category first (internal linking). */
async function relatedPosts(post: BlogPost): Promise<BlogPost[]> {
  const others = (await listLivePosts()).filter((p) => p.id !== post.id);
  const score = (p: BlogPost) => (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  return others.sort((a, b) => score(b) - score(a)).slice(0, 3);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [found, content, seo] = await Promise.all([loadPost(slug), getContent("blog"), getContent("site/seo")]);
  if (!found) notFound();

  const { post, preview } = found;
  const body = post.content_markdown ?? post.content ?? "";
  const published = post.publish_date || post.created_at;
  const author = post.author_name || post.author;
  const headings = extractHeadings(body);
  const related = await relatedPosts(post);
  const { article } = content;

  return (
    <article className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {preview && (
        <div role="status" className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <span className="flex items-center gap-2 font-medium">
            <Eye className="h-4 w-4" aria-hidden="true" /> Preview — this article is <strong className="capitalize">{post.status}</strong> and not visible to visitors.
          </span>
          <a href={`/api/cms/preview?exit=1&path=/blog`} className="font-semibold underline underline-offset-4">
            Exit preview
          </a>
        </div>
      )}
      {!preview && (
        <JsonLd
          data={graph(
            articleSchema(seo, `/blog/${post.slug}`, {
              title: post.title,
              description: post.excerpt ?? "",
              image: post.featured_image,
              author,
              published,
              modified: post.updated_at,
            }),
            breadcrumbSchema(seo, [
              { name: content.hero.badge || "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ])
          )}
        />
      )}
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {article.backLabel}
        </Link>

        <header className="mt-6 sm:mt-8">
          {post.category && <Badge variant="orange">{post.category}</Badge>}
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">{post.title}</h1>
          {post.excerpt && <p className="mt-5 text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 border-b border-slate-200 pb-6">
            {author && <span className="font-medium text-slate-700">{author}</span>}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={published}>{dateFormat.format(new Date(published))}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> {readingTime(body)} min read
            </span>
          </div>
        </header>

        {post.featured_image && (
          // eslint-disable-next-line @next/next/no-img-element -- featured images may come from any media host
          <img
            src={post.featured_image}
            alt={post.featured_image_alt || ""}
            fetchPriority="high"
            className="mt-8 w-full rounded-2xl border border-slate-200 object-cover aspect-[16/9]"
          />
        )}

        {headings.length >= 3 && (
          <nav aria-label="On this page" className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">On this page</p>
            <ol className="mt-3 space-y-2 text-sm">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-slate-700 hover:text-[#C2410C]">{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-8 sm:mt-10">
          <Markdown source={body} />
        </div>

        {post.tags?.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">#{tag}</li>
            ))}
          </ul>
        )}

        <aside className="mt-12 rounded-3xl bg-slate-950 p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-bold">{article.ctaTitle}</h2>
          <p className="mt-2 text-sm text-slate-300">{article.ctaBody}</p>
          <Button href={article.ctaButton.href} variant="primary" size="lg" className="mt-5 w-full sm:w-auto">
            {article.ctaButton.label}
          </Button>
        </aside>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-14">
            <h2 id="related-heading" className="text-xl font-bold text-slate-950">Keep reading</h2>
            <ul className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/blog/${r.slug}`} className="group flex items-center justify-between gap-4 p-4 sm:p-5 active:bg-slate-50">
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-[#C2410C]">{r.category}</span>
                      <span className="mt-0.5 block font-semibold text-slate-900 group-hover:text-[#C2410C]">{r.title}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-[#C2410C]" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
