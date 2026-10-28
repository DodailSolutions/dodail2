import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { JsonLd } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { RelatedPosts } from "@/components/sections/RelatedPosts";
import { Section } from "@/components/sections/Section";
import { requireRoute } from "@/content/routes";
import { formatDate, relatedPosts, type BlogPost } from "@/lib/blog/posts";
import { getContent } from "@/lib/cms/content/store";
import { articleSchema, graph } from "@/lib/seo/schema";

/** The service hub each category points readers to (brief §8: 2–3 internal links per post). */
const CATEGORY_SERVICE: Record<string, { path: string; blurb: string }> = {
  "generative-engine-optimization": { path: "/services/seo/generative-engine-optimization/", blurb: "See how we make brands citeable in ChatGPT, Gemini and Google AI." },
  seo: { path: "/services/seo/", blurb: "See how we run SEO for local businesses, WordPress sites and online stores." },
  "ai-marketing": { path: "/services/ai-automation/", blurb: "See how AI automation handles enquiries, bookings and follow-ups." },
  "industry-guides": { path: "/industries/", blurb: "See how we build growth systems for your industry." },
};

/**
 * Blog post (template F): breadcrumbs → H1 → author, dates and reading time → table of contents →
 * article → inline CTA to the free audit → author box → related service → related posts.
 */
export async function BlogPostPage({ post }: { post: BlogPost }) {
  const seo = await getContent("site/seo");
  const path = `/blog/${post.slug}/`;
  const category = requireRoute("/blog/");
  const service = CATEGORY_SERVICE[post.category];
  const updated = post.dateModified && post.dateModified.slice(0, 10) !== post.datePublished.slice(0, 10);

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema(seo, path, {
            title: post.title,
            description: post.metaDescription,
            image: post.featuredImage ?? undefined,
            author: post.author,
            published: post.datePublished,
            modified: post.dateModified,
          })
        )}
      />
      <article className="mx-auto w-full max-w-3xl px-4 pt-8 pb-6 sm:px-6 sm:pt-10">
        <Breadcrumbs
          path={category.path}
          extra={[
            { name: post.categoryName, path: `/blog/category/${post.category}/` },
            { name: post.title, path },
          ]}
          tone="light"
          className="mb-8"
        />
        <header>
          <Link href={`/blog/category/${post.category}/`} className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-700 hover:underline">
            {post.categoryName}
          </Link>
          <h1 className="mt-3 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-fg sm:text-4xl">{post.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-muted">
            <span>By {post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
            {updated && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden="true" className="h-3.5 w-3.5" />
              {post.readingMinutes} min read
            </span>
          </p>
        </header>

        {post.toc.length > 2 && (
          <nav aria-label="Table of contents" className="my-8 rounded-2xl border border-border-token bg-surface-2 p-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-fg-muted">In this article</p>
            <ol className="mt-3 space-y-1.5 text-sm">
              {post.toc
                .filter((t) => t.level === 2)
                .map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-fg underline-offset-2 hover:text-orange-700 hover:underline">
                      {t.text}
                    </a>
                  </li>
                ))}
            </ol>
          </nav>
        )}

        <div className="prose-dodail mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside aria-label="Free audit" className="mt-12 rounded-2xl border border-border-token bg-gradient-to-b from-[var(--bg)] to-orange-50/50 p-7">
          <h2 className="text-xl font-extrabold text-fg">Want to know where your site stands?</h2>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Get a free audit covering speed, SEO, Google Business Profile and conversion gaps, with a clear list of fixes.
          </p>
          <Button href="/free-audit/" variant="primary" size="md" className="mt-5">
            Get a free audit <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Button>
        </aside>

        <aside aria-label="About the author" className="mt-8 flex items-start gap-4 rounded-2xl border border-border-token bg-surface p-6">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface text-lg font-bold text-fg" aria-hidden="true">
            {post.author.slice(0, 1)}
          </span>
          <p className="text-sm leading-relaxed text-fg-muted">
            <span className="block font-bold text-fg">{post.author}</span>
            Writes for the Dodail blog. We build websites, run SEO and set up AI automation for businesses in India, the UAE and the USA.
          </p>
        </aside>

        {service && (
          <p className="mt-8 text-sm text-fg-muted">
            <Link href={service.path} className="font-semibold text-orange-700 hover:underline">
              Related service
            </Link>
            : {service.blurb}
          </p>
        )}
      </article>
      <RelatedPosts posts={relatedPosts(post.slug)} />
    </>
  );
}

/** Listing section used by the blog index and category pages. */
export function PostListSection({ children }: { children: React.ReactNode }) {
  return <Section id="posts">{children}</Section>;
}
