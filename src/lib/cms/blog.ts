/**
 * Blog articles: persistence, validation and publishing rules.
 *
 * Writes go to Supabase `blog_posts` (source of truth in production) and to the
 * local JSON store (development / fallback). Reads merge both, newest edit wins,
 * so a post never disappears while the database is being set up.
 */
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";
import { readLocalStore, writeLocalStore } from "./api";
import { normalizeSlug } from "./publish";
import type { BlogPost, PageStatus, SEOMetadata } from "./types";

const TABLE = "blog_posts";
const TIMEOUT_MS = 3000;
const STATUSES: PageStatus[] = ["draft", "review", "approved", "scheduled", "published", "archived"];

export class BlogValidationError extends Error {}

/** Older rows used `content`/`author`; the database uses `content_markdown`/`author_name`. Expose both. */
function normalize(row: Partial<BlogPost> & Record<string, unknown>): BlogPost {
  const content = (row.content_markdown ?? row.content ?? "") as string;
  const author = (row.author_name ?? row.author ?? "") as string;
  return {
    id: String(row.id),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? "Untitled"),
    excerpt: (row.excerpt as string) ?? "",
    content,
    content_markdown: content,
    featured_image: (row.featured_image as string) ?? "",
    featured_image_alt: (row.featured_image_alt as string) ?? "",
    is_featured: Boolean(row.is_featured),
    category: (row.category as string) || "General",
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    status: STATUSES.includes(row.status as PageStatus) ? (row.status as PageStatus) : "draft",
    author,
    author_name: author,
    publish_date: (row.publish_date as string) ?? null,
    seo_metadata: (row.seo_metadata as SEOMetadata) ?? {},
    created_at: String(row.created_at ?? new Date().toISOString()),
    updated_at: String(row.updated_at ?? row.created_at ?? new Date().toISOString()),
  };
}

/** Column set of the `blog_posts` table. */
function toRow(p: BlogPost) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    content_markdown: p.content_markdown ?? "",
    featured_image: p.featured_image ?? "",
    featured_image_alt: p.featured_image_alt ?? "",
    is_featured: Boolean(p.is_featured),
    category: p.category,
    tags: p.tags,
    status: p.status,
    author_name: p.author_name ?? "",
    publish_date: p.publish_date ?? null,
    seo_metadata: p.seo_metadata ?? {},
    created_at: p.created_at,
    updated_at: p.updated_at,
  };
}

async function readRemote(): Promise<BlogPost[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabaseAdmin.from(TABLE).select("*").abortSignal(AbortSignal.timeout(TIMEOUT_MS));
    if (error || !data) return null;
    return (data as Record<string, unknown>[]).map((r) => normalize(r));
  } catch {
    return null;
  }
}

const newer = (a: BlogPost, b: BlogPost) => (Date.parse(a.updated_at) >= Date.parse(b.updated_at) ? a : b);

/** Every article (any status), most recently edited first. */
export async function listPosts(): Promise<BlogPost[]> {
  const merged = new Map<string, BlogPost>();
  for (const p of readLocalStore().blogPosts) merged.set(p.id, normalize(p as BlogPost & Record<string, unknown>));
  for (const p of (await readRemote()) ?? []) {
    const local = merged.get(p.id);
    merged.set(p.id, local ? newer(p, local) : p);
  }
  return [...merged.values()].sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
}

export async function getPost(id: string): Promise<BlogPost | null> {
  return (await listPosts()).find((p) => p.id === id) ?? null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return (await listPosts()).find((p) => p.slug === slug) ?? null;
}

/** Live on the public site: published (or scheduled) and the publish time has passed. */
export function isPostLive(p: Pick<BlogPost, "status" | "publish_date">, now = Date.now()): boolean {
  if (p.status !== "published" && p.status !== "scheduled") return false;
  if (!p.publish_date) return p.status === "published";
  return Date.parse(p.publish_date) <= now;
}

/** Published articles for the public blog: featured first, then newest. */
export async function listLivePosts(): Promise<BlogPost[]> {
  const now = Date.now();
  const time = (p: BlogPost) => Date.parse(p.publish_date || p.created_at) || 0;
  return (await listPosts())
    .filter((p) => isPostLive(p, now))
    .sort((a, b) => Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured)) || time(b) - time(a));
}

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export interface SaveOutcome {
  post: BlogPost;
  previousSlug?: string;
  persisted: { local: boolean; remote: boolean };
}

/** Creates or updates an article. Validates input, keeps slugs unique and normalizes publishing dates. */
export async function savePost(input: Partial<BlogPost> & { id?: string }, editor: string): Promise<SaveOutcome> {
  const title = clip(input.title, 200).trim();
  if (!title) throw new BlogValidationError("A title is required.");
  const slug = normalizeSlug(input.slug || title);
  if (!slug) throw new BlogValidationError("The URL slug must contain letters or numbers.");

  const all = await listPosts();
  const existing = input.id ? all.find((p) => p.id === input.id) : undefined;
  if (all.some((p) => p.slug === slug && p.id !== existing?.id)) {
    throw new BlogValidationError(`Another article already uses /blog/${slug}. Choose a different slug.`);
  }

  const status: PageStatus = STATUSES.includes(input.status as PageStatus) ? (input.status as PageStatus) : "draft";
  let publishDate = typeof input.publish_date === "string" && !Number.isNaN(Date.parse(input.publish_date)) ? new Date(input.publish_date).toISOString() : null;
  if (status === "scheduled" && !publishDate) throw new BlogValidationError("Pick a date and time to schedule this article.");
  if (status === "published" && !publishDate) publishDate = existing?.publish_date || new Date().toISOString();

  const now = new Date().toISOString();
  const content = clip(input.content_markdown ?? input.content, 200_000);
  const seo = input.seo_metadata ?? {};
  const post = normalize({
    ...existing,
    id: existing?.id ?? crypto.randomUUID(),
    slug,
    title,
    excerpt: clip(input.excerpt, 400),
    content_markdown: content,
    featured_image: clip(input.featured_image, 1000),
    featured_image_alt: clip(input.featured_image_alt, 300),
    is_featured: Boolean(input.is_featured),
    category: clip(input.category, 60).trim() || "General",
    tags: (Array.isArray(input.tags) ? input.tags : []).map((t) => clip(t, 40).trim()).filter(Boolean).slice(0, 12),
    status,
    author_name: clip(input.author_name ?? input.author, 80).trim() || editor,
    publish_date: publishDate,
    seo_metadata: {
      meta_title: clip(seo.meta_title, 120),
      meta_description: clip(seo.meta_description, 320),
      canonical_url: clip(seo.canonical_url, 500),
      no_index: Boolean(seo.no_index),
    },
    created_at: existing?.created_at ?? now,
    updated_at: now,
  });

  const store = readLocalStore();
  store.blogPosts = [post, ...store.blogPosts.filter((p) => p.id !== post.id)];
  store.auditLogs = [{ action: existing ? "update_post" : "create_post", entity: slug, user: editor, timestamp: now }, ...store.auditLogs].slice(0, 500);
  const local = writeLocalStore(store);

  let remote = false;
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabaseAdmin.from(TABLE).upsert(toRow(post)).abortSignal(AbortSignal.timeout(TIMEOUT_MS));
      remote = !error;
      if (error) console.error("[blog] Supabase save failed:", error.message);
    } catch (e) {
      console.error("[blog] Supabase save failed:", (e as Error).message);
    }
  }
  if (!local && !remote) throw new Error("The article could not be saved: the database is unreachable and the local store is read-only.");

  return { post, previousSlug: existing && existing.slug !== slug ? existing.slug : undefined, persisted: { local, remote } };
}

export async function deletePost(id: string, editor: string): Promise<BlogPost | null> {
  const existing = await getPost(id);
  if (!existing) return null;

  const store = readLocalStore();
  store.blogPosts = store.blogPosts.filter((p) => p.id !== id);
  store.auditLogs = [{ action: "delete_post", entity: existing.slug, user: editor, timestamp: new Date().toISOString() }, ...store.auditLogs].slice(0, 500);
  writeLocalStore(store);

  if (isSupabaseConfigured) {
    try {
      await supabaseAdmin.from(TABLE).delete().eq("id", id).abortSignal(AbortSignal.timeout(TIMEOUT_MS));
    } catch {
      // The local copy is already gone; a stale remote row is removed on the next successful delete.
    }
  }
  return existing;
}

/** Copy of an article saved as a draft with a unique slug. */
export async function duplicatePost(id: string, editor: string): Promise<BlogPost | null> {
  const source = await getPost(id);
  if (!source) return null;
  const slugs = new Set((await listPosts()).map((p) => p.slug));
  let slug = `${source.slug}-copy`;
  for (let n = 2; slugs.has(slug); n++) slug = `${source.slug}-copy-${n}`;
  const { post } = await savePost(
    { ...source, id: undefined, slug, title: `${source.title} (copy)`, status: "draft", publish_date: null, is_featured: false },
    editor
  );
  return post;
}

/** Distinct categories and tags already in use (editor suggestions). */
export async function blogTaxonomy(): Promise<{ categories: string[]; tags: string[] }> {
  const posts = await listPosts();
  const sort = (s: Set<string>) => [...s].sort((a, b) => a.localeCompare(b));
  return {
    categories: sort(new Set(posts.map((p) => p.category).filter(Boolean))),
    tags: sort(new Set(posts.flatMap((p) => p.tags))),
  };
}
