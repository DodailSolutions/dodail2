/**
 * File-based blog (brief §8). Each post is one JSON file. Phase 6 moves the migrated posts to
 * src/content/blog/posts; until then the snapshot in legacy/blog is read as a fallback.
 * Admin-created CMS posts keep working through src/lib/cms/blog.ts (see the post route).
 */
import fs from "node:fs";
import path from "node:path";
import { BLOG_CATEGORIES, LEGACY_BLOG_POSTS, type BlogCategory } from "@/content/legacy/blog-posts";
import type { BlogPostData } from "@/content/types";

const DIRS = [path.join(process.cwd(), "src/content/blog/posts"), path.join(process.cwd(), "legacy/blog")];

const CATEGORY_BY_SLUG = new Map(LEGACY_BLOG_POSTS.map((p) => [p.slug, p.category]));

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost extends BlogPostData {
  categoryName: string;
  /** Sanitised HTML with heading ids. */
  html: string;
  toc: TocItem[];
  excerpt: string;
  readingMinutes: number;
}

const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/\s+/g, " ").trim();

const slugify = (s: string) =>
  strip(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "section";

/**
 * Conservative HTML cleanup for migrated posts: drops active content and WordPress classes,
 * keeps basic formatting, and adds ids to h2/h3 for the table of contents.
 */
export function prepareHtml(raw: string): { html: string; toc: TocItem[] } {
  let html = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed|form|link|meta)\b[\s\S]*?(<\/\1>|\/?>)/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:class|style|id|data-[a-z-]+)\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/href\s*=\s*"\s*javascript:[^"]*"/gi, 'href="#"')
    // The page template owns the single <h1>; any h1 inside a migrated post becomes an h2.
    .replace(/<(\/?)h1\b/gi, "<$1h2")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const toc: TocItem[] = [];
  const used = new Set<string>();
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_m, level: string, inner: string) => {
    const text = strip(inner);
    let id = slugify(text);
    for (let n = 2; used.has(id); n++) id = `${slugify(text)}-${n}`;
    used.add(id);
    toc.push({ id, text, level: Number(level) as 2 | 3 });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html, toc };
}

function toPost(slug: string, raw: Record<string, unknown>): BlogPost | null {
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category || typeof raw.contentHtml !== "string") return null;
  const { html, toc } = prepareHtml(raw.contentHtml);
  const text = strip(html);
  const published = String(raw.datePublished ?? "");
  return {
    slug,
    title: String(raw.title ?? slug),
    seoTitle: String(raw.seoTitle ?? raw.title ?? slug),
    metaDescription: String(raw.metaDescription ?? ""),
    author: String(raw.author ?? "Dodail Editorial Team"),
    datePublished: published,
    dateModified: String(raw.dateModified ?? published),
    featuredImage: (raw.featuredImage as string) ?? null,
    category,
    categoryName: BLOG_CATEGORIES[category as BlogCategory].name,
    contentHtml: raw.contentHtml,
    wordCount: text.split(" ").length,
    html,
    toc,
    excerpt: text.slice(0, 180).replace(/\s\S*$/, "") + "…",
    readingMinutes: Math.max(1, Math.round(text.split(" ").length / 220)),
  };
}

let cache: BlogPost[] | null = null;

/** All migrated posts, newest first. */
export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  const dir = DIRS.find((d) => fs.existsSync(d));
  const posts: BlogPost[] = [];
  if (dir) {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".json")) continue;
      try {
        const post = toPost(file.replace(/\.json$/, ""), JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")));
        if (post) posts.push(post);
      } catch (e) {
        console.error(`[blog] Could not read ${file}:`, e);
      }
    }
  }
  cache = posts.sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  return cache;
}

export const getPostBySlug = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export const postsInCategory = (category: string) => getAllPosts().filter((p) => p.category === category);

/** Same category first, then the most recent; never the post itself. */
export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const self = getPostBySlug(slug);
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.category === self?.category) - Number(a.category === self?.category) || b.datePublished.localeCompare(a.datePublished))
    .slice(0, limit);
}

export const postsBySlugs = (slugs: string[]) => slugs.map((s) => getPostBySlug(s)).filter((p): p is BlogPost => Boolean(p));

export const formatDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }) : "";
