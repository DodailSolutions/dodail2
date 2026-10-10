/**
 * One row per public URL — built-in CMS pages, custom block pages and blog
 * articles — with publishing state, indexing and SEO problems, for the
 * "All pages" hub.
 */
import { getAllPages } from "@/lib/cms/api";
import { isPostLive, listPosts } from "@/lib/cms/blog";
import { getAllContent } from "@/lib/cms/content/store";
import { seoAudit } from "./health";

export type PageKind = "site" | "custom" | "article";
export type PageState = "live" | "scheduled" | "draft" | "hidden" | "archived";

export interface SitePageRow {
  id: string;
  kind: PageKind;
  title: string;
  path: string;
  group: string;
  state: PageState;
  indexed: boolean;
  issues: string[];
  updatedAt?: string;
  editHref: string;
}

function lengthIssues(title: string, description: string): string[] {
  const issues: string[] = [];
  if (!title.trim()) issues.push("Missing SEO title");
  else if (title.length > 65) issues.push(`Title is ${title.length} characters`);
  if (!description.trim()) issues.push("Missing meta description");
  else if (description.length < 70) issues.push("Description is short");
  else if (description.length > 165) issues.push(`Description is ${description.length} characters`);
  return issues;
}

export async function listSitePages(now = Date.now()): Promise<SitePageRow[]> {
  const [content, audit, custom, posts] = await Promise.all([getAllContent(), seoAudit(), getAllPages().catch(() => []), listPosts()]);
  const issuesByKey = new Map<string, string[]>();
  for (const i of audit.issues) issuesByKey.set(i.key, [...(issuesByKey.get(i.key) ?? []), i.problem]);

  const rows: SitePageRow[] = [];

  for (const { def, data, updated_at } of content) {
    if (!def.path || def.path === "*") continue;
    const noIndex = Boolean((data as { seo?: { noIndex?: boolean } }).seo?.noIndex);
    rows.push({
      id: `site:${def.key}`,
      kind: "site",
      title: def.label,
      path: def.path,
      group: def.group,
      state: "live",
      indexed: !noIndex,
      issues: issuesByKey.get(def.key) ?? [],
      updatedAt: updated_at,
      editHref: `/admin/cms/content/${def.key}`,
    });
  }

  for (const page of custom) {
    if (page.slug === "home") continue; // The seeded homepage layout is not a standalone URL.
    // Same publishing rule as articles: published/scheduled pages are live once their date passes.
    const state: PageState =
      page.status === "archived" ? "archived" : isPostLive(page, now) ? "live" : page.status === "scheduled" || page.status === "published" ? "scheduled" : "draft";
    const meta = page.seo_metadata ?? {};
    rows.push({
      id: `custom:${page.id}`,
      kind: "custom",
      title: page.title,
      path: `/${page.slug}`,
      group: "Custom pages",
      state,
      indexed: !meta.no_index,
      issues: lengthIssues(meta.meta_title || page.title, meta.meta_description || ""),
      updatedAt: page.updated_at,
      editHref: `/admin/cms/pages/${page.id}`,
    });
  }

  for (const post of posts) {
    const live = isPostLive(post, now);
    const state: PageState = post.status === "archived" ? "archived" : live ? "live" : post.status === "scheduled" || post.status === "published" ? "scheduled" : "draft";
    const meta = post.seo_metadata ?? {};
    rows.push({
      id: `article:${post.id}`,
      kind: "article",
      title: post.title,
      path: `/blog/${post.slug}`,
      group: "Blog",
      state,
      indexed: !meta.no_index,
      issues: lengthIssues(meta.meta_title || post.title, meta.meta_description || post.excerpt || ""),
      updatedAt: post.updated_at,
      editHref: `/admin/cms/blog/${post.id}`,
    });
  }

  return rows;
}
