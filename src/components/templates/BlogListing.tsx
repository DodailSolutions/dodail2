import Link from "next/link";
import { PostCard } from "@/components/sections/RelatedPosts";
import { Section } from "@/components/sections/Section";
import { BLOG_CATEGORIES, type BlogCategory } from "@/content/legacy/blog-posts";
import type { BlogPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

/** Category links shown above blog listings (real links, so every category page is crawlable). */
export function CategoryNav({ active, counts }: { active?: string; counts: Record<string, number> }) {
  const cats = Object.entries(BLOG_CATEGORIES).filter(([slug]) => (counts[slug] ?? 0) > 0) as Array<[BlogCategory, (typeof BLOG_CATEGORIES)[BlogCategory]]>;
  const link = "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors";
  return (
    <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
      <Link href="/blog/" aria-current={!active ? "page" : undefined} className={cn(link, !active ? "border-border-strong bg-surface text-fg" : "border-border-strong bg-surface text-fg hover:border-[#FA5B0F]")}>
        All
      </Link>
      {cats.map(([slug, c]) => (
        <Link
          key={slug}
          href={`/blog/category/${slug}/`}
          aria-current={active === slug ? "page" : undefined}
          className={cn(link, active === slug ? "border-border-strong bg-surface text-fg" : "border-border-strong bg-surface text-fg hover:border-[#FA5B0F]")}
        >
          {c.name} <span className="ml-1.5 text-xs opacity-70">{counts[slug]}</span>
        </Link>
      ))}
    </nav>
  );
}

export function PostGrid({ posts, active, counts, title }: { posts: BlogPost[]; active?: string; counts: Record<string, number>; title?: string }) {
  return (
    <Section id="posts" title={title}>
      <div className="mb-8">
        <CategoryNav active={active} counts={counts} />
      </div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function categoryCounts(posts: BlogPost[]): Record<string, number> {
  return posts.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }), {});
}
