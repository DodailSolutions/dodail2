import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "./Section";
import { formatDate, type BlogPost } from "@/lib/blog/posts";

/** Post card used by "Keep reading" and the blog listings. */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border-token bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#FA5B0F] hover:shadow-md">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-orange-700">{post.categoryName}</p>
      <h3 className="mt-2 text-lg font-bold leading-snug text-fg">
        <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 hover:text-orange-700 focus-visible:outline-none">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
      <p className="mt-4 text-xs text-fg-muted">
        {formatDate(post.datePublished)} · {post.readingMinutes} min read
      </p>
    </article>
  );
}

/** "Keep reading": up to 3 related posts. Renders nothing when there are none. */
export function RelatedPosts({ posts, title = "Keep reading", allHref = "/blog/" }: { posts: BlogPost[]; title?: string; allHref?: string }) {
  if (posts.length === 0) return null;
  return (
    <Section id="related-posts" title={title} tone="tint">
      <ul className="grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href={allHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:underline">
          More from the blog <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </p>
    </Section>
  );
}
