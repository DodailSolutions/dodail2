"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, CheckCircle2, Copy, ExternalLink, Eye, Loader2, MoreHorizontal, Save, Send, Trash2, Undo2 } from "lucide-react";
import { adminButton, adminInput, adminPrimary } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/cms/types";
import { MarkdownEditor } from "./MarkdownEditor";
import { ChecklistPanel, FeaturedImagePanel, OrganizePanel, PublishPanel, SeoPanel, type BlogDraft } from "./BlogPanels";

interface Props {
  post: BlogPost | null;
  categories: string[];
  tags: string[];
  siteUrl: string;
  defaultAuthor: string;
}

type Notice = { kind: "success" | "error"; text: string } | null;

const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

function toDraft(post: BlogPost | null, author: string): BlogDraft {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content_markdown: post?.content_markdown ?? post?.content ?? "",
    featured_image: post?.featured_image ?? "",
    featured_image_alt: post?.featured_image_alt ?? "",
    is_featured: post?.is_featured ?? false,
    category: post?.category ?? "General",
    tags: post?.tags ?? [],
    status: post?.status ?? "draft",
    author_name: post?.author_name ?? post?.author ?? author,
    publish_date: post?.publish_date ?? null,
    seo_metadata: { meta_title: "", meta_description: "", canonical_url: "", no_index: false, ...post?.seo_metadata },
  };
}

const isLive = (d: Pick<BlogDraft, "status" | "publish_date">) =>
  (d.status === "published" || d.status === "scheduled") && (!d.publish_date || Date.parse(d.publish_date) <= Date.now());

/** Full-page article editor: write, preview, schedule and optimize a blog post. */
export function BlogEditor({ post, categories, tags, siteUrl, defaultAuthor }: Props) {
  const router = useRouter();
  const [id, setId] = React.useState(post?.id ?? null);
  const [saved, setSaved] = React.useState(() => toDraft(post, defaultAuthor));
  const [draft, setDraft] = React.useState(saved);
  const [slugTouched, setSlugTouched] = React.useState(Boolean(post?.slug));
  const [busy, setBusy] = React.useState<null | "save" | "delete" | "duplicate">(null);
  const [notice, setNotice] = React.useState<Notice>(null);
  const [menu, setMenu] = React.useState(false);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const set = React.useCallback((patch: Partial<BlogDraft>) => setDraft((d) => ({ ...d, ...patch })), []);
  const live = Boolean(id) && isLive(saved);

  const flash = (n: Notice) => {
    setNotice(n);
    if (n?.kind === "success") window.setTimeout(() => setNotice((cur) => (cur === n ? null : cur)), 4000);
  };

  const save = React.useCallback(
    async (override?: Partial<BlogDraft>): Promise<BlogPost | null> => {
      const body = { ...draft, ...override };
      if (!body.title.trim()) {
        flash({ kind: "error", text: "Give the article a title first." });
        return null;
      }
      setBusy("save");
      setNotice(null);
      try {
        const res = await fetch(id ? `/api/cms/blog/${id}` : "/api/cms/blog", {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, slug: body.slug || slugify(body.title) }),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || `Save failed (${res.status})`);
        const savedPost = json.data as BlogPost;
        const next = toDraft(savedPost, defaultAuthor);
        setSaved(next);
        setDraft(next);
        setSlugTouched(true);
        const where = json.persisted && !json.persisted.remote ? " Saved locally only — connect the database for production." : "";
        const verb = isLive(next) ? "Published — it's live on the blog." : next.status === "scheduled" ? "Scheduled." : "Saved.";
        flash({ kind: "success", text: verb + where });
        if (!id) {
          setId(savedPost.id);
          router.replace(`/admin/cms/blog/${savedPost.id}`);
        }
        return savedPost;
      } catch (e) {
        flash({ kind: "error", text: (e as Error).message });
        return null;
      } finally {
        setBusy(null);
      }
    },
    [draft, id, defaultAuthor, router]
  );

  const preview = async () => {
    const target = dirty || !id ? await save() : null;
    const slug = target?.slug ?? saved.slug;
    if ((target || id) && slug) window.open(`/api/cms/preview?path=${encodeURIComponent(`/blog/${slug}`)}`, "_blank", "noopener");
  };

  const remove = async () => {
    if (!id || !confirm(`Delete "${saved.title}"? This removes it from the site and cannot be undone.`)) return;
    setBusy("delete");
    const res = await fetch(`/api/cms/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/cms/blog");
      router.refresh();
    } else {
      setBusy(null);
      flash({ kind: "error", text: "Could not delete the article." });
    }
  };

  const duplicate = async () => {
    if (!id) return;
    setBusy("duplicate");
    const res = await fetch(`/api/cms/blog/${id}?action=duplicate`, { method: "POST" });
    const json = await res.json().catch(() => ({}));
    setBusy(null);
    if (res.ok && json.data?.id) router.push(`/admin/cms/blog/${json.data.id}`);
    else flash({ kind: "error", text: json.error || "Could not duplicate the article." });
  };

  // ⌘S saves; leaving with unsaved edits asks first.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (dirty && !busy) void save();
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
  }, [dirty, busy, save]);

  const primary =
    draft.status === "scheduled"
      ? { label: "Schedule", run: () => save() }
      : live
        ? { label: "Update", run: () => save() }
        : { label: "Publish", run: () => save({ status: "published" }) };

  return (
    <div className="space-y-5">
      {/* Action bar */}
      <div className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-20 -mx-4 border-b border-slate-800 bg-[#07131F]/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/admin/cms/blog" aria-label="All articles" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-700 text-slate-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{draft.title || "Untitled article"}</p>
              <p className="text-[11px] text-slate-500">
                {dirty ? <span className="text-amber-300">Unsaved changes</span> : live ? <span className="text-emerald-300">Live</span> : <span className="capitalize">{saved.status}</span>}
                {id && saved.slug && <span className="hidden sm:inline"> · /blog/{saved.slug}</span>}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={preview} disabled={busy !== null || !draft.title} className={cn(adminButton, "hidden sm:inline-flex")}>
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
            <button type="button" onClick={() => save()} disabled={busy !== null || (!dirty && Boolean(id))} title="Save (⌘S)" className={adminButton}>
              {busy === "save" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">Save</span>
            </button>
            <button type="button" onClick={primary.run} disabled={busy !== null || (live && !dirty)} className={adminPrimary}>
              <Send className="h-3.5 w-3.5" /> {primary.label}
            </button>
            <div className="relative">
              <button type="button" onClick={() => setMenu((m) => !m)} aria-label="More actions" aria-expanded={menu} className={cn(adminButton, "px-2")}>
                <MoreHorizontal className="h-4 w-4" />
              </button>
              {menu && (
                <>
                  <button aria-label="Close menu" className="fixed inset-0 z-10 cursor-default" onClick={() => setMenu(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-slate-700 bg-[#0A1B2A] py-1 text-sm shadow-2xl" onClick={() => setMenu(false)}>
                    <button type="button" onClick={preview} className="flex w-full items-center gap-2 px-3 py-2 text-left text-slate-200 hover:bg-white/5 sm:hidden">
                      <Eye className="h-4 w-4" /> Preview
                    </button>
                    {live && (
                      <a href={`/blog/${saved.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-white/5">
                        <ExternalLink className="h-4 w-4" /> View live
                      </a>
                    )}
                    {dirty && (
                      <button type="button" onClick={() => setDraft(saved)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-slate-200 hover:bg-white/5">
                        <Undo2 className="h-4 w-4" /> Discard changes
                      </button>
                    )}
                    {id && (
                      <button type="button" onClick={duplicate} className="flex w-full items-center gap-2 px-3 py-2 text-left text-slate-200 hover:bg-white/5">
                        <Copy className="h-4 w-4" /> Duplicate
                      </button>
                    )}
                    {live && (
                      <button type="button" onClick={() => save({ status: "draft" })} className="flex w-full items-center gap-2 px-3 py-2 text-left text-slate-200 hover:bg-white/5">
                        <Undo2 className="h-4 w-4" /> Unpublish
                      </button>
                    )}
                    {id && (
                      <button type="button" onClick={remove} className="flex w-full items-center gap-2 px-3 py-2 text-left text-rose-300 hover:bg-rose-500/10">
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {notice && (
          <div
            role={notice.kind === "error" ? "alert" : "status"}
            className={cn(
              "mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs",
              notice.kind === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-rose-500/30 bg-rose-500/10 text-rose-300"
            )}
          >
            {notice.kind === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            <span>{notice.text}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-4">
          <textarea
            value={draft.title}
            onChange={(e) => {
              const title = e.target.value.replace(/\n/g, " ");
              set(slugTouched ? { title } : { title, slug: slugify(title) });
            }}
            rows={1}
            placeholder="Article title"
            aria-label="Article title"
            className="w-full resize-none bg-transparent text-2xl font-bold leading-tight tracking-tight text-white placeholder-slate-600 focus:outline-none sm:text-3xl [field-sizing:content]"
          />
          <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 font-mono text-xs text-slate-400 focus-within:border-[#FA5B0F]">
            <span className="shrink-0">/blog/</span>
            <input
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set({ slug: slugify(e.target.value) });
              }}
              aria-label="URL slug"
              placeholder="article-url"
              className="min-w-0 flex-1 bg-transparent text-slate-200 focus:outline-none"
            />
          </div>
          {live && saved.slug && draft.slug !== saved.slug && (
            <p className="text-xs text-amber-300">Changing the URL of a live article breaks existing links. Add a redirect in SEO Control Center if it has been shared.</p>
          )}
          <div>
            <textarea
              value={draft.excerpt}
              onChange={(e) => set({ excerpt: e.target.value })}
              rows={2}
              maxLength={400}
              placeholder="Excerpt — one or two sentences shown on the blog and in search results"
              aria-label="Excerpt"
              className={cn(adminInput, "resize-y")}
            />
            <p className="mt-1 text-right text-[11px] text-slate-500">{(draft.excerpt ?? "").length}/400</p>
          </div>
          <MarkdownEditor value={draft.content_markdown ?? ""} onChange={(content_markdown) => set({ content_markdown })} />
        </div>

        <aside className="space-y-4 xl:sticky xl:top-36">
          <PublishPanel draft={draft} set={set} />
          <FeaturedImagePanel draft={draft} set={set} />
          <SeoPanel draft={draft} set={set} siteUrl={siteUrl} />
          <OrganizePanel draft={draft} set={set} categories={categories} tags={tags} />
          <ChecklistPanel draft={draft} />
        </aside>
      </div>
    </div>
  );
}
