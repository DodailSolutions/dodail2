"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, CalendarClock, Copy, ExternalLink, Eye, FileText, Loader2, MoreHorizontal, Plus, Search, Star, Trash2 } from "lucide-react";
import { adminInput, adminPrimary } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { BlogPost, PageStatus } from "@/lib/cms/types";

type Tab = "all" | "live" | "scheduled" | "drafts" | "archived";

const shortDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });
const dateTime = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

function stateOf(p: BlogPost, now: number): { tab: Exclude<Tab, "all">; label: string; tone: string } {
  // Same rule as the public site (blog.ts isPostLive): published/scheduled and the publish time has passed.
  if (p.status === "published" || p.status === "scheduled") {
    const due = p.publish_date ? Date.parse(p.publish_date) <= now : p.status === "published";
    if (due) return { tab: "live", label: "Live", tone: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" };
    return { tab: "scheduled", label: p.publish_date ? `Scheduled · ${dateTime.format(new Date(p.publish_date))}` : "Scheduled", tone: "border-sky-500/30 bg-sky-500/10 text-sky-300" };
  }
  if (p.status === "archived") return { tab: "archived", label: "Archived", tone: "border-slate-700 bg-slate-800 text-slate-400" };
  const label: Partial<Record<PageStatus, string>> = { review: "In review", approved: "Approved" };
  return { tab: "drafts", label: label[p.status] ?? "Draft", tone: "border-amber-500/30 bg-amber-500/10 text-amber-300" };
}

export function BlogList({ posts, now }: { posts: BlogPost[]; now: number }) {
  const router = useRouter();
  const [tab, setTab] = React.useState<Tab>("all");
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [menuId, setMenuId] = React.useState<string | null>(null);

  const withState = posts.map((p) => ({ post: p, state: stateOf(p, now) }));
  const counts = withState.reduce<Record<Tab, number>>((acc, { state }) => ({ ...acc, [state.tab]: acc[state.tab] + 1 }), { all: posts.length, live: 0, scheduled: 0, drafts: 0, archived: 0 });
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();

  const q = query.trim().toLowerCase();
  const visible = withState.filter(
    ({ post, state }) =>
      (tab === "all" || state.tab === tab) &&
      (!category || post.category === category) &&
      (!q || post.title.toLowerCase().includes(q) || post.slug.includes(q) || post.tags.some((t) => t.toLowerCase().includes(q)))
  );

  const act = async (post: BlogPost, action: "duplicate" | "delete") => {
    setMenuId(null);
    if (action === "delete" && !confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setBusyId(post.id);
    const res = await fetch(action === "delete" ? `/api/cms/blog/${post.id}` : `/api/cms/blog/${post.id}?action=duplicate`, {
      method: action === "delete" ? "DELETE" : "POST",
    });
    const json = await res.json().catch(() => ({}));
    setBusyId(null);
    if (action === "duplicate" && json.data?.id) router.push(`/admin/cms/blog/${json.data.id}`);
    else router.refresh();
  };

  const TABS: Array<{ id: Tab; label: string }> = [
    { id: "all", label: "All" },
    { id: "live", label: "Live" },
    { id: "scheduled", label: "Scheduled" },
    { id: "drafts", label: "Drafts" },
    { id: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
            <BookOpen className="h-6 w-6 text-emerald-400" /> Blog
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {counts.live} live · {counts.scheduled} scheduled · {counts.drafts} drafts
          </p>
        </div>
        <Link href="/admin/cms/blog/new" className={cn(adminPrimary, "py-2.5 text-sm")}>
          <Plus className="h-4 w-4" /> New article
        </Link>
      </div>

      <div className="space-y-3">
        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter by status">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                tab === t.id ? "border-[#FA5B0F] bg-[#FA5B0F]/15 text-white" : "border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              {t.label} <span className="ml-1 text-slate-500">{counts[t.id]}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search titles, URLs and tags" className={cn(adminInput, "pl-9")} />
          </div>
          {categories.length > 1 && (
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category" className={cn(adminInput, "sm:w-52")}>
              <option value="">All categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
          <FileText className="mx-auto h-8 w-8 text-slate-600" />
          <p className="mt-3 text-sm text-slate-300">{posts.length === 0 ? "No articles yet." : "No articles match these filters."}</p>
          {posts.length === 0 && (
            <Link href="/admin/cms/blog/new" className={cn(adminPrimary, "mt-4")}>
              <Plus className="h-4 w-4" /> Write your first article
            </Link>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-slate-800 overflow-visible rounded-2xl border border-slate-800 bg-slate-900/60">
          {visible.map(({ post, state }) => (
            <li key={post.id} className="relative flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
              <Link href={`/admin/cms/blog/${post.id}`} className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <span className="hidden h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 sm:block">
                  {post.featured_image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- thumbnails from any media host
                    <img src={post.featured_image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <span className="grid h-full place-items-center text-slate-700"><FileText className="h-5 w-5" /></span>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    {post.is_featured && <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-label="Featured" />}
                    <span className="truncate text-sm font-medium text-white">{post.title}</span>
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
                    <span className={cn("rounded-full border px-2 py-0.5", state.tone)}>
                      {state.tab === "scheduled" && <CalendarClock className="mr-1 inline h-3 w-3" />}
                      {state.label}
                    </span>
                    <span>{post.category}</span>
                    <span className="hidden sm:inline">· Edited {shortDate.format(new Date(post.updated_at))}</span>
                  </span>
                </span>
              </Link>

              <div className="relative shrink-0">
                {busyId === post.id ? (
                  <Loader2 className="m-2 h-4 w-4 animate-spin text-slate-400" />
                ) : (
                  <button onClick={() => setMenuId(menuId === post.id ? null : post.id)} aria-label={`Actions for ${post.title}`} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                )}
                {menuId === post.id && (
                  <>
                    <button aria-label="Close menu" className="fixed inset-0 z-10 cursor-default" onClick={() => setMenuId(null)} />
                    <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-slate-700 bg-[#0A1B2A] py-1 text-sm shadow-2xl">
                      {state.tab === "live" ? (
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-white/5">
                          <ExternalLink className="h-4 w-4" /> View live
                        </a>
                      ) : (
                        <a href={`/api/cms/preview?path=${encodeURIComponent(`/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-white/5">
                          <Eye className="h-4 w-4" /> Preview
                        </a>
                      )}
                      <button onClick={() => act(post, "duplicate")} className="flex w-full items-center gap-2 px-3 py-2 text-left text-slate-200 hover:bg-white/5">
                        <Copy className="h-4 w-4" /> Duplicate
                      </button>
                      <button onClick={() => act(post, "delete")} className="flex w-full items-center gap-2 px-3 py-2 text-left text-rose-300 hover:bg-rose-500/10">
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
