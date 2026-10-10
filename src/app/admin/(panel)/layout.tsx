import React from "react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { AdminBreadcrumbs, AdminMobileNav, AdminSidebarNav, AdminUserMenu } from "@/components/admin/AdminNav";
import { getAdminSession } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: { absolute: "Dodail Studio" },
  description: "CMS, CRM and site manager for Dodail Solutions",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "Dodail Studio", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0A1B2A",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // The proxy already redirects anonymous visitors; this re-check protects against matcher drift.
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-[#07131F] text-slate-100 lg:flex antialiased">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex lg:w-64 bg-[#0A1B2A] border-r border-slate-800 flex-col shrink-0 sticky top-0 h-dvh overflow-y-auto">
        <div className="p-5 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0 bg-white/5 ring-1 ring-white/10">
              <Image src="/brand/dodail-logo.png" alt="Dodail Solutions" fill sizes="36px" className="object-contain p-0.5" priority />
            </div>
            <div>
              <span className="font-semibold text-white tracking-tight block text-sm">Dodail Studio</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">CMS · CRM · SEO</span>
            </div>
          </Link>
        </div>

        <AdminSidebarNav />

        <div className="p-3 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.04] transition"
          >
            <span>View public website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <AdminUserMenu email={session.email} />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#0A1B2A]/85 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
          <div className="h-14 px-4 md:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/admin" className="lg:hidden relative w-8 h-8 shrink-0 rounded-lg overflow-hidden bg-white/5" aria-label="Dashboard">
                <Image src="/brand/dodail-logo.png" alt="" fill sizes="32px" className="object-contain p-0.5" />
              </Link>
              <AdminBreadcrumbs />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Studio Live</span>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] text-slate-300 border border-slate-700 hover:text-white shrink-0 hover:bg-white/[0.08] transition-colors"
              >
                <span className="hidden sm:inline">View site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-8">{children}</div>
      </div>

      <AdminMobileNav email={session.email} />
    </div>
  );
}
