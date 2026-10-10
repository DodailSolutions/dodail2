"use client";

import React from "react";
import Link from "next/link";
import { Check, ImageIcon, Link2, Loader2, Search, X } from "lucide-react";
import type { MediaAsset } from "@/lib/cms/types";
import { cn, isSafeUrl } from "@/lib/utils";
import { adminInput, adminPrimary } from "./ui";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (asset: { url: string; alt: string }) => void;
  title?: string;
}

/** Bottom sheet on phones, dialog on desktop: pick from the Media Library or paste an image URL. */
export function MediaPicker({ open, onClose, onSelect, title = "Choose an image" }: Props) {
  const [assets, setAssets] = React.useState<MediaAsset[] | null>(null);
  const [query, setQuery] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!open || assets) return;
    let cancelled = false;
    fetch("/api/cms/media")
      .then((r) => r.json())
      .then((json) => !cancelled && setAssets(Array.isArray(json.data) ? json.data : []))
      .catch(() => !cancelled && setAssets([]));
    return () => {
      cancelled = true;
    };
  }, [open, assets]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const images = (assets ?? []).filter(
    (a) => (!a.mime_type || a.mime_type.startsWith("image/")) && (!q || a.file_name.toLowerCase().includes(q) || a.alt_text?.toLowerCase().includes(q))
  );

  const applyUrl = () => {
    const value = url.trim();
    if (!value || !isSafeUrl(value) || value.startsWith("#")) {
      setError("Enter an https:// URL or a site path such as /brand/photo.jpg");
      return;
    }
    onSelect({ url: value, alt: "" });
    setUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade" onClick={onClose} />
      <div className="relative flex max-h-[88dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-slate-800 bg-[#0A1B2A] shadow-2xl animate-sheet-up sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <ImageIcon className="h-4 w-4 text-sky-400" /> {title}
          </h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-slate-400 hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 border-b border-slate-800 p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyUrl())}
                placeholder="Paste an image URL"
                className={cn(adminInput, "pl-9")}
              />
            </div>
            <button type="button" onClick={applyUrl} className={adminPrimary}>Use URL</button>
          </div>
          {error && <p className="text-xs text-rose-300">{error}</p>}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the media library" className={cn(adminInput, "pl-9")} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {assets === null ? (
            <div className="grid place-items-center py-12 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">
              No images found. Upload images in <Link href="/admin/cms/media" className="text-[#FA5B0F] hover:underline">Media Library</Link> or paste a URL above.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect({ url: a.file_url, alt: a.alt_text ?? "" });
                      onClose();
                    }}
                    className="group relative block w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-left transition hover:border-[#FA5B0F] active:scale-[0.98]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- library assets can live on any host */}
                    <img src={a.file_url} alt={a.alt_text || a.file_name} loading="lazy" className="aspect-square w-full object-cover" />
                    <span className="block truncate px-2 py-1.5 text-[11px] text-slate-400">{a.file_name}</span>
                    <span className="absolute right-2 top-2 hidden rounded-full bg-[#FA5B0F] p-1 text-white group-hover:block">
                      <Check className="h-3 w-3" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
