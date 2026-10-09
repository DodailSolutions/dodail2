import Link from "next/link";
import { getAllPages, getAllBlogPosts, getAllMediaAssets, getGlobalSettings } from "@/lib/cms/api";
import { FileText, BookOpen, Image as ImageIcon, Sliders, CheckCircle2, Clock, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [pages, blogPosts, mediaAssets, globalSettings] = await Promise.all([
    getAllPages(),
    getAllBlogPosts(),
    getAllMediaAssets(),
    getGlobalSettings(),
  ]);

  const publishedPages = pages.filter((p) => p.status === "published").length;
  const draftPages = pages.filter((p) => p.status === "draft").length;
  const scheduledPages = pages.filter((p) => p.status === "scheduled").length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0A1B2A] border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20 font-mono">
            PHASE 02 CMS ENGINE
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Content Management & Page Studio
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Control dynamic page sections, global navigation, blog articles, and brand tokens. All changes persist securely in PostgreSQL with local failover and durable publishing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/cms/pages"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-sm transition shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Manage Pages</span>
          </Link>
          <Link
            href="/admin/cms/global"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition"
          >
            <Sliders className="w-4 h-4" />
            <span>Global Navigation</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">CMS Pages</span>
            <FileText className="w-4 h-4 text-[#FA5B0F]" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{pages.length}</div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="text-emerald-400 font-medium">{publishedPages} published</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">{draftPages} draft</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Blog Articles</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{blogPosts.length}</div>
          <div className="text-xs text-slate-400">
            {blogPosts.filter((b) => b.status === "published").length} live articles published
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Media Assets</span>
            <ImageIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{mediaAssets.length}</div>
          <div className="text-xs text-slate-400">
            Stored with alt text & focal points
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Scheduled Queue</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{scheduledPages}</div>
          <div className="text-xs text-slate-400">
            Durable cron publishing worker active
          </div>
        </div>
      </div>

      {/* Pages and Global Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Quick Pages List */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Managed Pages</h2>
              <p className="text-xs text-slate-400">Pages with editable typed sections & revision history</p>
            </div>
            <Link
              href="/admin/cms/pages"
              className="text-xs text-[#FA5B0F] hover:underline flex items-center gap-1 font-medium"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800">
            {pages.map((page) => (
              <div key={page.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-200 truncate">{page.title}</span>
                    <span className="text-xs font-mono text-slate-400">/{page.slug}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{page.sections.length} sections</span>
                    <span>•</span>
                    <span>Updated {new Date(page.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize border ${
                      page.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : page.status === "scheduled"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {page.status}
                  </span>
                  <Link
                    href={`/admin/cms/pages/${page.id}`}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Global Brand & Navigation Status */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>Global Brand Tokens</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enforced palette measured from Dodail brand assets.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded border border-white/20"
                    style={{ backgroundColor: globalSettings.theme.primaryColor }}
                  />
                  <span className="font-medium text-slate-200">Primary Accent</span>
                </div>
                <code className="font-mono text-slate-400">{globalSettings.theme.primaryColor}</code>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded border border-white/20"
                    style={{ backgroundColor: globalSettings.theme.navyColor }}
                  />
                  <span className="font-medium text-slate-200">Deep Navy</span>
                </div>
                <code className="font-mono text-slate-400">{globalSettings.theme.navyColor}</code>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-200">Header Nav Items</span>
                <span className="text-slate-400 font-mono">{globalSettings.navigation.items.length} items</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-200">Announcement Bar</span>
                <span className={`font-mono ${globalSettings.navigation.announcement.enabled ? "text-emerald-400" : "text-slate-400"}`}>
                  {globalSettings.navigation.announcement.enabled ? "ACTIVE" : "DISABLED"}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href="/admin/cms/global"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              >
                <span>Edit Navigation & Tokens</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security & Schema Hardening</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Section schemas are strictly typed. HTML inputs are sanitized against XSS vectors, and video embeds are locked to YouTube & Vimeo allowlists.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800">
              RLS: Enabled on all tables<br/>
              Persistence: Dual-Mode (Supabase + Local fallback)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
