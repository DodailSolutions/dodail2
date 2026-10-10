"use client";

import React from "react";
import { CalendarClock, CheckCircle2, CircleAlert, Globe2, ImageIcon, Rocket, Star, Tags, Trash2, X } from "lucide-react";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { SerpPreview } from "@/components/admin/SerpPreview";
import { adminCard, adminInput, adminLabel, fromLocalInput, toLocalInput } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { BlogPost, PageStatus } from "@/lib/cms/types";

export type BlogDraft = Pick<
  BlogPost,
  "title" | "slug" | "excerpt" | "content_markdown" | "featured_image" | "featured_image_alt" | "is_featured" | "category" | "tags" | "status" | "author_name" | "publish_date"
> & { seo_metadata: NonNullable<BlogPost["seo_metadata"]> };

type Patch = (patch: Partial<BlogDraft>) => void;

const STATUS_OPTIONS: Array<{ value: PageStatus; label: string; help: string }> = [
  { value: "draft", label: "Draft", help: "Only visible in the studio." },
  { value: "review", label: "In review", help: "Ready for someone to check. Not public." },
  { value: "scheduled", label: "Scheduled", help: "Goes live automatically at the chosen time." },
  { value: "published", label: "Published", help: "Live on the blog and in the sitemap." },
  { value: "archived", label: "Archived", help: "Removed from the site, kept for reference." },
];

function Panel({ title, icon: Icon, children, className }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn(adminCard, className)}>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
        <Icon className="h-4 w-4 text-slate-400" /> {title}
      </h3>
      {children}
    </section>
  );
}

export function PublishPanel({ draft, set }: { draft: BlogDraft; set: Patch }) {
  const status = STATUS_OPTIONS.find((s) => s.value === draft.status) ?? STATUS_OPTIONS[0];
  const showDate = draft.status === "scheduled" || draft.status === "published";
  return (
    <Panel title="Publishing" icon={Rocket}>
      <label className={adminLabel} htmlFor="post-status">Status</label>
      <select id="post-status" value={draft.status} onChange={(e) => set({ status: e.target.value as PageStatus })} className={adminInput}>
        {STATUS_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <p className="mt-1.5 text-[11px] text-slate-500">{status.help}</p>

      {showDate && (
        <div className="mt-4">
          <label className={adminLabel} htmlFor="post-date">
            <CalendarClock className="mr-1 inline h-3.5 w-3.5" />
            {draft.status === "scheduled" ? "Go live at" : "Publish date"}
          </label>
          <input
            id="post-date"
            type="datetime-local"
            value={toLocalInput(draft.publish_date)}
            onChange={(e) => set({ publish_date: fromLocalInput(e.target.value) })}
            className={adminInput}
          />
          <p className="mt-1.5 text-[11px] text-slate-500">
            {draft.status === "scheduled" ? "Your local time. The article appears on the blog within minutes of this time." : "Leave empty to use the moment you publish."}
          </p>
        </div>
      )}

      <label className="mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2.5">
        <span className="flex items-center gap-2 text-xs text-slate-200">
          <Star className={cn("h-4 w-4", draft.is_featured ? "fill-amber-400 text-amber-400" : "text-slate-500")} />
          Feature at the top of the blog
        </span>
        <input type="checkbox" checked={Boolean(draft.is_featured)} onChange={(e) => set({ is_featured: e.target.checked })} className="h-4 w-4 accent-[#FA5B0F]" />
      </label>
    </Panel>
  );
}

export function FeaturedImagePanel({ draft, set }: { draft: BlogDraft; set: Patch }) {
  const [picker, setPicker] = React.useState(false);
  return (
    <Panel title="Featured image" icon={ImageIcon}>
      {draft.featured_image ? (
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-xl border border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element -- editor preview of any host */}
            <img src={draft.featured_image} alt="" className="aspect-[16/9] w-full object-cover" />
            <button
              type="button"
              onClick={() => set({ featured_image: "", featured_image_alt: "" })}
              aria-label="Remove image"
              className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-black"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <label className={adminLabel} htmlFor="post-alt">Alt text</label>
            <input id="post-alt" value={draft.featured_image_alt ?? ""} onChange={(e) => set({ featured_image_alt: e.target.value })} placeholder="Describe the image for screen readers and Google" className={adminInput} />
          </div>
          <button type="button" onClick={() => setPicker(true)} className="text-xs font-medium text-[#FA5B0F] hover:underline">Replace image</button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPicker(true)}
          className="grid aspect-[16/9] w-full place-items-center rounded-xl border border-dashed border-slate-700 text-xs text-slate-400 transition hover:border-[#FA5B0F] hover:text-white"
        >
          <span className="flex flex-col items-center gap-2">
            <ImageIcon className="h-6 w-6" /> Choose an image (1200×630 works best)
          </span>
        </button>
      )}
      <MediaPicker open={picker} onClose={() => setPicker(false)} onSelect={({ url, alt }) => set({ featured_image: url, featured_image_alt: draft.featured_image_alt || alt })} />
    </Panel>
  );
}

export function OrganizePanel({ draft, set, categories, tags }: { draft: BlogDraft; set: Patch; categories: string[]; tags: string[] }) {
  const [tagInput, setTagInput] = React.useState("");
  const addTag = (raw: string) => {
    const tag = raw.trim().replace(/^#/, "");
    if (tag && !draft.tags.includes(tag) && draft.tags.length < 12) set({ tags: [...draft.tags, tag] });
    setTagInput("");
  };
  return (
    <Panel title="Organize" icon={Tags}>
      <div className="space-y-4">
        <div>
          <label className={adminLabel} htmlFor="post-category">Category</label>
          <input id="post-category" list="blog-categories" value={draft.category} onChange={(e) => set({ category: e.target.value })} className={adminInput} />
          <datalist id="blog-categories">
            {categories.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
        <div>
          <label className={adminLabel} htmlFor="post-tags">Tags</label>
          <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-700 bg-slate-950/60 p-2 focus-within:border-[#FA5B0F]">
            {draft.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-slate-800 py-0.5 pl-2.5 pr-1 text-xs text-slate-200">
                {t}
                <button type="button" aria-label={`Remove ${t}`} onClick={() => set({ tags: draft.tags.filter((x) => x !== t) })} className="rounded-full p-0.5 hover:bg-slate-700">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              id="post-tags"
              list="blog-tags"
              value={tagInput}
              onChange={(e) => (e.target.value.endsWith(",") ? addTag(e.target.value.slice(0, -1)) : setTagInput(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(tagInput);
                } else if (e.key === "Backspace" && !tagInput && draft.tags.length) set({ tags: draft.tags.slice(0, -1) });
              }}
              onBlur={() => tagInput && addTag(tagInput)}
              placeholder={draft.tags.length ? "" : "Type a tag, press Enter"}
              className="min-w-[8rem] flex-1 bg-transparent px-1 py-0.5 text-base text-white placeholder-slate-500 focus:outline-none sm:text-sm"
            />
            <datalist id="blog-tags">
              {tags.filter((t) => !draft.tags.includes(t)).map((t) => <option key={t} value={t} />)}
            </datalist>
          </div>
        </div>
        <div>
          <label className={adminLabel} htmlFor="post-author">Author</label>
          <input id="post-author" value={draft.author_name ?? ""} onChange={(e) => set({ author_name: e.target.value })} className={adminInput} />
        </div>
      </div>
    </Panel>
  );
}

export function SeoPanel({ draft, set, siteUrl }: { draft: BlogDraft; set: Patch; siteUrl: string }) {
  const seo = draft.seo_metadata;
  const setSeo = (patch: Partial<BlogDraft["seo_metadata"]>) => set({ seo_metadata: { ...seo, ...patch } });
  const title = seo.meta_title || draft.title;
  const description = seo.meta_description || draft.excerpt || "";
  return (
    <Panel title="Search & sharing" icon={Globe2}>
      <div className="space-y-4">
        <SerpPreview url={`${siteUrl}/blog/${draft.slug || "your-article"}`} title={title} description={description} noIndex={seo.no_index} />
        <div>
          <label className={adminLabel} htmlFor="seo-title">SEO title</label>
          <input id="seo-title" value={seo.meta_title ?? ""} onChange={(e) => setSeo({ meta_title: e.target.value })} placeholder={draft.title || "Defaults to the article title"} className={adminInput} />
        </div>
        <div>
          <label className={adminLabel} htmlFor="seo-desc">Meta description</label>
          <textarea id="seo-desc" rows={3} value={seo.meta_description ?? ""} onChange={(e) => setSeo({ meta_description: e.target.value })} placeholder={draft.excerpt || "Defaults to the excerpt"} className={adminInput} />
        </div>
        <details className="group">
          <summary className="cursor-pointer text-xs font-medium text-slate-400 hover:text-white">Advanced</summary>
          <div className="mt-3 space-y-3">
            <div>
              <label className={adminLabel} htmlFor="seo-canonical">Canonical URL</label>
              <input id="seo-canonical" value={seo.canonical_url ?? ""} onChange={(e) => setSeo({ canonical_url: e.target.value })} placeholder="Only if this article was first published elsewhere" className={cn(adminInput, "font-mono text-xs")} />
            </div>
            <label className="flex items-center justify-between gap-3 text-xs text-slate-300">
              Hide from search engines (noindex)
              <input type="checkbox" checked={Boolean(seo.no_index)} onChange={(e) => setSeo({ no_index: e.target.checked })} className="h-4 w-4 accent-[#FA5B0F]" />
            </label>
          </div>
        </details>
      </div>
    </Panel>
  );
}

/** Pre-publish checks with plain-language fixes. */
export function ChecklistPanel({ draft }: { draft: BlogDraft }) {
  const body = draft.content_markdown ?? "";
  const words = body.split(/\s+/).filter(Boolean).length;
  const title = draft.seo_metadata.meta_title || draft.title;
  const description = draft.seo_metadata.meta_description || draft.excerpt || "";
  const checks = [
    { ok: title.length >= 30 && title.length <= 60, label: "Title is 30–60 characters" },
    { ok: description.length >= 70 && description.length <= 160, label: "Description is 70–160 characters" },
    { ok: words >= 300, label: `At least 300 words (${words} now)` },
    { ok: /^##\s/m.test(body), label: "Uses section headings (##)" },
    { ok: /\]\(\//.test(body), label: "Links to another page on your site" },
    { ok: Boolean(draft.featured_image), label: "Has a featured image" },
    { ok: !draft.featured_image || Boolean(draft.featured_image_alt), label: "Featured image has alt text" },
    { ok: draft.slug.length > 0 && draft.slug.length <= 60, label: "Short, readable URL" },
  ];
  const passed = checks.filter((c) => c.ok).length;
  return (
    <Panel title={`Quality checklist · ${passed}/${checks.length}`} icon={CheckCircle2}>
      <ul className="space-y-2">
        {checks.map((c) => (
          <li key={c.label} className="flex items-start gap-2 text-xs">
            {c.ok ? <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0 text-emerald-400" /> : <CircleAlert className="mt-px h-3.5 w-3.5 shrink-0 text-amber-400" />}
            <span className={c.ok ? "text-slate-400" : "text-slate-200"}>{c.label}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
