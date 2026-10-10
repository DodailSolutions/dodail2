"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, History, Loader2, RotateCcw, Save, Undo2, AlertCircle, Globe2 } from "lucide-react";
import { SerpPreview } from "@/components/admin/SerpPreview";
import { HistorySheet } from "./HistorySheet";
import { cn } from "@/lib/utils";
import { humanize, resolveHint } from "@/lib/cms/content/schema";
import type { ContentSchema } from "@/lib/cms/content/types";
import { Field, ObjectFields } from "./ContentFields";

interface Props {
  schema: ContentSchema;
  initialData: unknown;
  defaults: Record<string, unknown>;
  customized: boolean;
  updatedAt?: string;
  updatedBy?: string;
  /** Live domain, for the search-result preview. */
  siteUrl: string;
}

type Notice = { kind: "success" | "error"; text: string } | null;

function formatWhen(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

/** Full-page editor for one Site Content document. */
export function ContentEditor({ schema, initialData, defaults, customized: initialCustomized, updatedAt, updatedBy, siteUrl }: Props) {
  const [saved, setSaved] = useState(initialData);
  const [draft, setDraft] = useState(initialData);
  const [customized, setCustomized] = useState(initialCustomized);
  const [meta, setMeta] = useState({ updatedAt, updatedBy });
  const [busy, setBusy] = useState<"save" | "reset" | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const closeHistory = useCallback(() => setHistoryOpen(false), []);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);
  const sections = Object.keys(defaults).filter((k) => !resolveHint(schema, [k], defaults[k]).hidden);
  const livePath = schema.path && schema.path !== "*" ? schema.path : schema.path === "*" ? "/" : null;

  const flash = (n: Notice) => {
    setNotice(n);
    if (n?.kind === "success") window.setTimeout(() => setNotice((cur) => (cur === n ? null : cur)), 4000);
  };

  const save = useCallback(async () => {
    if (!dirty || busy) return;
    setBusy("save");
    setNotice(null);
    try {
      const res = await fetch(`/api/cms/content/${schema.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: draft }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || `Save failed (${res.status})`);
      setSaved(json.data.data);
      setDraft(json.data.data);
      setCustomized(true);
      setMeta({ updatedAt: json.data.updated_at, updatedBy: "you" });
      const where = json.data.persisted.remote ? "" : " (saved locally — Supabase table not reachable)";
      flash({ kind: "success", text: `Published. The live page now shows your changes${where}.` });
    } catch (e) {
      flash({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(null);
    }
  }, [dirty, busy, draft, schema.key]);

  const reset = async () => {
    if (!confirm(`Reset "${schema.label}" to the original copy? Your saved edits for this page will be removed.`)) return;
    setBusy("reset");
    setNotice(null);
    try {
      const res = await fetch(`/api/cms/content/${schema.key}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || `Reset failed (${res.status})`);
      setSaved(json.data.data);
      setDraft(json.data.data);
      setCustomized(false);
      setMeta({ updatedAt: undefined, updatedBy: undefined });
      flash({ kind: "success", text: "Restored the original copy." });
    } catch (e) {
      flash({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(null);
    }
  };

  // Cmd/Ctrl+S saves; leaving with unsaved edits asks first.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save();
      }
    };
    const onLeave = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [save, dirty]);

  const draftObj = (draft ?? {}) as Record<string, unknown>;
  const lastSaved = formatWhen(meta.updatedAt);

  return (
    <div className="space-y-6">
      {/* Sticky action bar */}
      <div className="sticky top-14 z-20 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-3 bg-[#07131F]/90 backdrop-blur border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="min-w-0">
            <Link href="/admin/cms/content" className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white mb-1">
              <ArrowLeft className="w-3 h-3" /> All site content
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{schema.label}</h1>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border",
                  dirty
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                    : customized
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                )}
              >
                {dirty ? "Unsaved changes" : customized ? "Customized" : "Original copy"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {schema.path === "*" ? "Appears on every page" : schema.path ? `Page: ${schema.path}` : null}
              {lastSaved && ` · Last saved ${lastSaved}${meta.updatedBy ? ` by ${meta.updatedBy}` : ""}`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {livePath && (
              <a
                href={livePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-slate-500"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View live
              </a>
            )}
            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-slate-500"
            >
              <History className="w-3.5 h-3.5" /> History
            </button>
            {customized && (
              <button
                type="button"
                onClick={reset}
                disabled={busy !== null}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-red-300 hover:border-red-500/40 disabled:opacity-50"
              >
                {busy === "reset" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
                Reset to original
              </button>
            )}
            {dirty && (
              <button
                type="button"
                onClick={() => setDraft(saved)}
                disabled={busy !== null}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white disabled:opacity-50"
              >
                <Undo2 className="w-3.5 h-3.5" /> Discard
              </button>
            )}
            <button
              type="button"
              onClick={save}
              disabled={!dirty || busy !== null}
              title="Save and publish (⌘S)"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white text-xs font-semibold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy === "save" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {busy === "save" ? "Publishing…" : "Save & publish"}
            </button>
          </div>
        </div>

        {notice && (
          <div
            role={notice.kind === "error" ? "alert" : "status"}
            className={cn(
              "mt-3 px-3 py-2 rounded-lg text-xs flex items-center gap-2 border",
              notice.kind === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            )}
          >
            {notice.kind === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{notice.text}</span>
          </div>
        )}
      </div>

      {schema.description && <p className="text-sm text-slate-400 -mt-2">{schema.description}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-6 items-start">
        {/* Section index */}
        {sections.length > 1 && (
          <nav aria-label="Sections" className="hidden lg:block sticky top-40 space-y-0.5">
            <p className="px-2 mb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">Sections</p>
            {sections.map((key) => (
              <a key={key} href={`#section-${key}`} className="block px-2 py-1.5 rounded-md text-xs text-slate-400 hover:text-white hover:bg-slate-800/60">
                {resolveHint(schema, [key], defaults[key]).label ?? humanize(key)}
              </a>
            ))}
          </nav>
        )}

        <div className={cn("space-y-5 min-w-0", sections.length <= 1 && "lg:col-span-2")}>
          {sections.map((key) => {
            const def = defaults[key];
            const hint = resolveHint(schema, [key], def);
            const set = (v: unknown) => setDraft({ ...draftObj, [key]: v });
            return (
              <section key={key} id={`section-${key}`} className="scroll-mt-44 bg-slate-900/70 border border-slate-800 rounded-xl p-5 sm:p-6">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  {key === "seo" && <Globe2 className="w-4 h-4 text-blue-400" />}
                  {hint.label ?? humanize(key)}
                </h2>
                {hint.help && <p className="text-xs text-slate-500 mt-1">{hint.help}</p>}
                {key === "seo" && livePath && (() => {
                  const seo = (draftObj.seo ?? {}) as { title?: string; description?: string; noIndex?: boolean };
                  return (
                    <div className="mt-4 max-w-xl">
                      <SerpPreview url={`${siteUrl}${livePath === "/" ? "" : livePath}`} title={seo.title ?? ""} description={seo.description ?? ""} noIndex={seo.noIndex} />
                    </div>
                  );
                })()}
                <div className="mt-4">
                  {def !== null && typeof def === "object" && !Array.isArray(def) ? (
                    <ObjectFields schema={schema} path={[key]} value={draftObj[key]} defaultValue={def} onChange={set} />
                  ) : (
                    <Field schema={schema} path={[key]} value={draftObj[key]} defaultValue={def} onChange={set} label={humanize(key)} />
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <HistorySheet
        contentKey={schema.key}
        open={historyOpen}
        onClose={closeHistory}
        current={saved}
        defaults={defaults}
        onLoad={(data, label) => {
          setDraft(data);
          flash({ kind: "success", text: `Loaded ${label}. Review it, then Save & publish to make it live.` });
        }}
      />
    </div>
  );
}
