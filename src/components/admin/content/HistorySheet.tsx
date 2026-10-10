"use client";

import React from "react";
import { History, Loader2, RotateCcw, X } from "lucide-react";
import { humanize } from "@/lib/cms/content/schema";
import type { ContentRevision } from "@/lib/cms/content/history";
import { cn } from "@/lib/utils";

interface Props {
  contentKey: string;
  open: boolean;
  onClose: () => void;
  current: unknown;
  defaults: Record<string, unknown>;
  onLoad: (data: unknown, label: string) => void;
}

const when = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

/** Top-level sections whose content differs between two versions. */
function changedSections(a: unknown, b: unknown): string[] {
  const x = (a ?? {}) as Record<string, unknown>;
  const y = (b ?? {}) as Record<string, unknown>;
  return [...new Set([...Object.keys(x), ...Object.keys(y)])].filter((k) => JSON.stringify(x[k]) !== JSON.stringify(y[k]));
}

/** Side sheet listing saved versions; loading one puts it in the editor for review before publishing. */
export function HistorySheet({ contentKey, open, onClose, current, defaults, onLoad }: Props) {
  const [revisions, setRevisions] = React.useState<ContentRevision[] | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    fetch(`/api/cms/content/${contentKey}?history=1`)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success) setRevisions(json.data);
        else setError(json.error || "Could not load history.");
      })
      .catch(() => !cancelled && setError("Could not load history."));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, contentKey, onClose]);

  if (!open) return null;

  const describe = (data: unknown) => {
    const changed = changedSections(data, current);
    if (changed.length === 0) return "Same as the current version";
    const names = changed.map(humanize);
    return `Differs in ${names.slice(0, 3).join(", ")}${names.length > 3 ? ` +${names.length - 3}` : ""}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Version history">
      <button aria-label="Close" className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-[#0A1B2A] shadow-2xl pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <History className="h-4 w-4 text-blue-400" /> Version history
          </h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-slate-400 hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="border-b border-slate-800 px-5 py-3 text-xs text-slate-400">
          Loading a version puts it in the editor. Nothing changes on the site until you press <strong className="text-slate-200">Save &amp; publish</strong>.
        </p>

        <div className="flex-1 overflow-y-auto p-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {error ? (
            <p className="p-4 text-sm text-rose-300">{error}</p>
          ) : revisions === null ? (
            <div className="grid place-items-center py-12"><Loader2 className="h-5 w-5 animate-spin text-slate-400" /></div>
          ) : (
            <ol className="space-y-2">
              {revisions.length === 0 && <li className="p-4 text-sm text-slate-400">No saved versions yet. Each time you publish, a version is kept here.</li>}
              {revisions.map((r, i) => {
                const same = changedSections(r.data, current).length === 0;
                return (
                  <li key={r.id} className={cn("rounded-xl border p-3", i === 0 ? "border-[#FA5B0F]/40 bg-[#FA5B0F]/5" : "border-slate-800 bg-slate-950/40")}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-100">
                          {when.format(new Date(r.created_at))}
                          {i === 0 && <span className="ml-2 rounded-full bg-[#FA5B0F]/15 px-2 py-0.5 text-[10px] font-semibold text-[#FA5B0F]">Latest</span>}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-400">{r.note} · {r.created_by}</p>
                        <p className="mt-1 text-[11px] text-slate-500">{describe(r.data)}</p>
                      </div>
                      <button
                        type="button"
                        disabled={same}
                        onClick={() => {
                          onLoad(r.data, when.format(new Date(r.created_at)));
                          onClose();
                        }}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 hover:border-slate-500 disabled:opacity-30"
                      >
                        <RotateCcw className="h-3.5 w-3.5" /> Load
                      </button>
                    </div>
                  </li>
                );
              })}
              <li className="rounded-xl border border-dashed border-slate-700 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Original copy</p>
                    <p className="text-[11px] text-slate-500">The text this page shipped with</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onLoad(defaults, "the original copy");
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 hover:border-slate-500"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Load
                  </button>
                </div>
              </li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
