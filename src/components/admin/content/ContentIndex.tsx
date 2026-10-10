"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Globe, PenSquare, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentGroup, ContentSummary } from "@/lib/cms/content/types";

const GROUP_ORDER: ContentGroup[] = ["Site settings", "Home", "Solutions", "Services", "Industries", "Company", "Legal"];

const GROUP_HELP: Partial<Record<ContentGroup, string>> = {
  "Site settings": "Shown on every page: header menus, announcement bar, footer and company details.",
};

function relative(iso?: string) {
  if (!iso) return null;
  const mins = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (Number.isNaN(mins)) return null;
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} h ago`;
  return new Date(iso).toLocaleDateString();
}

export function ContentIndex({ items }: { items: ContentSummary[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const groups = useMemo(() => {
    const filtered = items.filter(
      (i) => !q || i.label.toLowerCase().includes(q) || i.key.includes(q) || (i.path ?? "").includes(q) || i.group.toLowerCase().includes(q)
    );
    return GROUP_ORDER.map((g) => ({ group: g, items: filtered.filter((i) => i.group === g) })).filter((g) => g.items.length);
  }, [items, q]);

  const customizedCount = items.filter((i) => i.customized).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <PenSquare className="w-6 h-6 text-[#FA5B0F]" />
            Site Content
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Edit the text, links and lists on every public page. Changes go live as soon as you save, and any page can be
            reset to its original copy.
          </p>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            {items.length} documents · {customizedCount} customized
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages…"
            aria-label="Search site content"
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FA5B0F]/70"
          />
        </div>
      </div>

      {groups.length === 0 && <p className="text-sm text-slate-400">No pages match “{query}”.</p>}

      {groups.map(({ group, items: groupItems }) => (
        <section key={group}>
          <div className="mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">{group}</h2>
            {GROUP_HELP[group] && <p className="text-xs text-slate-500 mt-0.5">{GROUP_HELP[group]}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {groupItems.map((item) => {
              const when = relative(item.updated_at);
              return (
                <div
                  key={item.key}
                  className="group relative flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-slate-600 hover:bg-slate-900 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/admin/cms/content/${item.key}`} className="font-semibold text-sm text-white after:absolute after:inset-0 after:rounded-xl">
                      {item.label}
                    </Link>
                    <span
                      className={cn(
                        "shrink-0 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border",
                        item.customized
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      )}
                    >
                      {item.customized ? "Customized" : "Original"}
                    </span>
                  </div>
                  {item.description && <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-2">{item.description}</p>}
                  <div className="mt-auto pt-4 flex items-center justify-between gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5 font-mono truncate">
                      {item.path === "*" ? <><Globe className="w-3 h-3" /> All pages</> : item.path}
                      {when && <span className="font-sans text-slate-500">· {when}</span>}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      {item.path && item.path !== "*" && (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 p-1 rounded text-slate-500 hover:text-white"
                          aria-label={`View ${item.label} live`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#FA5B0F] transition" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
