import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, FileText, Sliders, Image as ImageIcon, BookOpen, Clock, ShieldCheck, ArrowUpRight, Compass, Users, Kanban, Bot, Calendar, Share2, GitBranch } from "lucide-react";

export const metadata = {
  title: "Dodail Admin | CMS & Site Manager",
  description: "Secure CMS and Site Manager for Dodail Solutions",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07131F] text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0A1B2A] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 shadow-sm">
              <Image
                src="/brand/dodail-logo.png"
                alt="Dodail Solutions"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-bold text-white tracking-tight block text-sm">DODAIL CMS</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Studio v2.0</span>
            </div>
          </Link>
          <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono">
            LIVE
          </span>
        </div>

        <nav className="p-4 space-y-1 text-sm flex-1">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
            CMS & Page Builder
          </div>

          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/cms/pages"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <FileText className="w-4 h-4 text-[#FA5B0F]" />
            <span>Pages & Sections</span>
          </Link>

          <Link
            href="/admin/cms/global"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Global Navigation</span>
          </Link>

          <Link
            href="/admin/cms/blog"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Blog Articles</span>
          </Link>

          <Link
            href="/admin/social"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Share2 className="w-4 h-4 text-[#FA5B0F]" />
            <span>Social & Content Studio</span>
          </Link>

          <Link
            href="/admin/cms/media"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>Media Library</span>
          </Link>

          <Link
            href="/admin/seo"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>SEO Control Center</span>
          </Link>

          <div className="pt-4 px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
            CRM & Pipeline
          </div>

          <Link
            href="/admin/crm/leads"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Users className="w-4 h-4 text-[#FA5B0F]" />
            <span className="font-medium text-white">Leads & Prospects</span>
          </Link>

          <Link
            href="/admin/crm/pipeline"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Kanban className="w-4 h-4 text-emerald-400" />
            <span>Sales Pipeline</span>
          </Link>

          <Link
            href="/admin/ai"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>AI Knowledge & Tools</span>
          </Link>

          <Link
            href="/admin/bookings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Calendar className="w-4 h-4 text-[#FA5B0F]" />
            <span className="font-medium text-white">Consultations & Bookings</span>
          </Link>

          <Link
            href="/admin/automation"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span className="font-medium text-white">Automations & Sheets</span>
          </Link>

          <div className="pt-4 px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
            System & Operations
          </div>

          <div className="px-3 py-2 text-xs text-slate-400 flex items-center justify-between bg-slate-900/50 rounded border border-slate-800/80">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              Scheduler
            </span>
            <span className="font-mono text-[10px] text-emerald-400">DURABLE</span>
          </div>

          <div className="px-3 py-2 text-xs text-slate-400 flex items-center justify-between bg-slate-900/50 rounded border border-slate-800/80">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Security
            </span>
            <span className="font-mono text-[10px] text-blue-400">RLS+ISOLATION</span>
          </div>
        </nav>

        {/* Public Website Quick Link */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition"
          >
            <span>View Public Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <div className="mt-3 text-[11px] text-slate-400 text-center">
            Dodail Solutions Private Limited
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 bg-[#0A1B2A]/70 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-white font-medium">Content Management Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Admin Session Active
            </span>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
          {children}
        </div>
      </main>

      {/* Mobile & Tablet Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Admin Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1B2A]/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-around text-[10px] text-slate-400 safe-bottom shadow-2xl"
      >
        <Link
          href="/admin"
          className="flex flex-col items-center gap-1 px-2 py-1 rounded hover:text-white transition"
        >
          <LayoutDashboard className="w-4 h-4 text-slate-400" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/cms/pages"
          className="flex flex-col items-center gap-1 px-2 py-1 rounded hover:text-white transition"
        >
          <FileText className="w-4 h-4 text-[#FA5B0F]" />
          <span>Pages</span>
        </Link>
        <Link
          href="/admin/crm/leads"
          className="flex flex-col items-center gap-1 px-2 py-1 rounded hover:text-white transition"
        >
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Leads</span>
        </Link>
        <Link
          href="/admin/bookings"
          className="flex flex-col items-center gap-1 px-2 py-1 rounded hover:text-white transition"
        >
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Bookings</span>
        </Link>
        <Link
          href="/admin/automation"
          className="flex flex-col items-center gap-1 px-2 py-1 rounded hover:text-white transition"
        >
          <GitBranch className="w-4 h-4 text-blue-400" />
          <span>Automations</span>
        </Link>
      </nav>
    </div>
  );
}
