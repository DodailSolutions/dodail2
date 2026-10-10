"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, BookOpen, CheckCircle2, ExternalLink, EyeOff, FileText, Globe, Layers, PenSquare, Plus, Search } from "lucide-react";
import { adminInput, adminPrimary } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { PageKind, PageState, SitePageRow } from "@/lib/admin/pages";

type Filter = "all" | PageKind | "issues" | "hidden";

const KIND_META: Record<PageKind, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  site: { label: "Site page", icon: Globe, color: "text-[#FA5B0F]" },
  custom: { label: "Custom page", icon: FileText, color: "text-amber-400" },
  article: { label: "Article", icon: BookOpen, color: "text-emerald-400" },
};

const STATE_META: Record<PageState, { label: string; tone: string }> = {
  live: { label: "Live", tone: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
  scheduled: { label: "Scheduled", tone: "border-sky-500/30 bg-sky-500/10 text-sky-300" },
  draft: { label: "Draft", tone: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
  hidden: { label: "Hidden", tone: "border-slate-700 bg-slate-800 text-slate-400" },
  archived: { label: "Archived", tone: "border-slate-700 bg-slate-800 text-slate-400" },
};

const shortDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });

/** Every URL on the site in one searchable list, with status, indexing and SEO health. */
export function PagesHub({ rows, missingTables }: { rows: SitePageRow[]; missingTables: string[] }) {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [query, setQuery] = React.useState("");

  const live = rows.filter((r) => r.state === "live");
  const counts: Record<Filter, number> = {
    all: rows.length,
    site: rows.filter((r) => r.kind === "site").length,
    custom: rows.filter((r) => r.kind === "custom").length,
    article: rows.filter((r) => r.kind === "article").length,
    issues: rows.filter((r) => r.issues.length > 0 && r.state === "live").length,
    hidden: rows.filter((r) => !r.indexed).length,
  };
  const healthy = live.filter((r) => r.indexed && r.issues.length === 0).length;

  const q = query.trim().toLowerCase();
  const visible = rows
    .filter((r) => {
      if (filter === "issues") return r.issues.length > 0 && r.state === "live";
      if (filter === "hidden") return !r.indexed;
      return filter === "all" || r.kind === filter;
    })
    .filter((r) => !q || r.title.toLowerCase().includes(q) || r.path.toLowerCase().includes(q) || r.group.toLowerCase().includes(q));

  const FILTERS: Array<{ id: Filter; label: string }> = [
    { id: "all", label: "All" },
    { id: "site", label: "Site pages" },
    { id: "article", label: "Articles" },
    { id: "custom", label: "Custom pages" },
    { id: "issues", label: "Needs SEO work" },
    { id: "hidden", label: "Hidden from Google" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
            <Layers className="h-6 w-6 text-sky-300" /> All pages
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">Every URL on your website in one place — edit copy, check SEO and control what Google sees.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <Link href="/admin/cms/blog/new" className={cn(adminPrimary, "py-2.5 text-sm")}>
            <Plus className="h-4 w-4" /> Article
          </Link>
          <Link href="/admin/cms/pages" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-500">
            <Plus className="h-4 w-4" /> Custom page
          </Link>
        </div>
      </div>

      {missingTables.length > 0 && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <p className="font-semibold">Edits are only saved on this computer</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-200/80">
              The database is missing {missingTables.length} CMS table{missingTables.length === 1 ? "" : "s"} ({missingTables.join(", ")}). Run the SQL files in{" "}
              <code className="font-mono">supabase/migrations</code> in your Supabase SQL editor before going live, or published changes will be lost on deploy.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Live URLs", value: live.length, sub: `${rows.length} total` },
          { label: "SEO-healthy", value: `${live.length ? Math.round((healthy / live.length) * 100) : 100}%`, sub: `${healthy} of ${live.length} live pages` },
          { label: "Need SEO work", value: counts.issues, sub: "Live pages with issues" },
          { label: "Hidden from Google", value: counts.hidden, sub: "noindex pages" },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{m.label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{m.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter pages">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                filter === f.id ? "border-[#FA5B0F] bg-[#FA5B0F]/15 text-white" : "border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              {f.label} <span className="ml-1 text-slate-500">{counts[f.id]}</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or URL" className={cn(adminInput, "pl-9")} />
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-sm text-slate-400">No pages match.</p>
      ) : (
        <ul className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/60">
          {visible.map((r) => {
            const kind = KIND_META[r.kind];
            const state = STATE_META[r.state];
            return (
              <li key={r.id} className="flex items-center gap-3 p-3 sm:p-4">
                <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-800 sm:grid">
                  <kind.icon className={cn("h-4 w-4", kind.color)} />
                </span>
                <Link href={r.editHref} className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white hover:text-[#FA5B0F]">{r.title}</span>
                  <span className="mt-0.5 block truncate font-mono text-[11px] text-slate-500">{r.path}</span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className={cn("rounded-full border px-2 py-0.5", state.tone)}>{state.label}</span>
                    {!r.indexed && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-2 py-0.5 text-slate-400">
                        <EyeOff className="h-3 w-3" /> noindex
                      </span>
                    )}
                    {r.issues.length > 0 ? (
                      <span className="inline-flex items-center gap-1 text-amber-300" title={r.issues.join("\n")}>
                        <AlertTriangle className="h-3 w-3" /> {r.issues[0]}
                        {r.issues.length > 1 && ` +${r.issues.length - 1}`}
                      </span>
                    ) : (
                      r.state === "live" && r.indexed && (
                        <span className="inline-flex items-center gap-1 text-emerald-300/80">
                          <CheckCircle2 className="h-3 w-3" /> SEO ok
                        </span>
                      )
                    )}
                    <span className="hidden text-slate-500 md:inline">
                      · {kind.label}
                      {r.updatedAt && ` · Edited ${shortDate.format(new Date(r.updatedAt))}`}
                    </span>
                  </span>
                </Link>
                <div className="flex shrink-0 items-center gap-1">
                  <Link href={r.editHref} aria-label={`Edit ${r.title}`} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white">
                    <PenSquare className="h-4 w-4" />
                  </Link>
                  <a
                    href={r.state === "live" ? r.path : `/api/cms/preview?path=${encodeURIComponent(r.path)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.state === "live" ? `View ${r.title}` : `Preview ${r.title}`}
                    className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
