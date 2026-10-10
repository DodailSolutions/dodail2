"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, Image as ImageIcon, BookOpen, Compass, Users, Kanban, Bot, Calendar, Share2,
  GitBranch, Layers, PenSquare, ChevronRight, LogOut, Grid2x2, X, ArrowUpRight, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  short: string;
  icon: LucideIcon;
  color: string;
  exact?: boolean;
}

const NAV: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Website",
    items: [
      { href: "/admin", label: "Dashboard", short: "Home", icon: LayoutDashboard, color: "text-slate-400", exact: true },
      { href: "/admin/cms", label: "All Pages", short: "Pages", icon: Layers, color: "text-sky-300", exact: true },
      { href: "/admin/cms/content", label: "Site Content", short: "Content", icon: PenSquare, color: "text-[#FA5B0F]" },
      { href: "/admin/cms/blog", label: "Blog Articles", short: "Blog", icon: BookOpen, color: "text-emerald-400" },
      { href: "/admin/cms/pages", label: "Custom Pages", short: "Pages", icon: FileText, color: "text-amber-400" },
      { href: "/admin/cms/media", label: "Media Library", short: "Media", icon: ImageIcon, color: "text-sky-400" },
      { href: "/admin/seo", label: "SEO Control Center", short: "SEO", icon: Compass, color: "text-blue-400" },
      { href: "/admin/social", label: "Social Studio", short: "Social", icon: Share2, color: "text-pink-400" },
    ],
  },
  {
    title: "Sales & operations",
    items: [
      { href: "/admin/crm/leads", label: "Leads", short: "Leads", icon: Users, color: "text-[#FA5B0F]" },
      { href: "/admin/crm/pipeline", label: "Sales Pipeline", short: "Pipeline", icon: Kanban, color: "text-emerald-400" },
      { href: "/admin/bookings", label: "Bookings", short: "Bookings", icon: Calendar, color: "text-violet-400" },
      { href: "/admin/automation", label: "Automations", short: "Automate", icon: GitBranch, color: "text-teal-400" },
      { href: "/admin/ai", label: "AI Knowledge", short: "AI", icon: Bot, color: "text-amber-400" },
    ],
  },
];

const ALL = NAV.flatMap((g) => g.items);
const byHref = (href: string) => ALL.find((i) => i.href === href)!;

/** Breadcrumbs only link to real pages (intermediate content-key segments have no index page). */
const LINKABLE = new Set(ALL.map((i) => i.href));

/** Phone / tablet tab bar: four primary destinations plus a "More" sheet with everything. */
const TABS: NavItem[] = ["/admin", "/admin/cms/content", "/admin/crm/leads", "/admin/bookings"].map(byHref);

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function useSignOut() {
  const router = useRouter();
  return React.useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/admin/login");
    router.refresh();
  }, [router]);
}

export function AdminSidebarNav() {
  const pathname = usePathname() ?? "";
  return (
    <nav className="p-3 space-y-1 text-sm flex-1" aria-label="Admin">
      {NAV.map((group, gi) => (
        <div key={group.title} className={gi > 0 ? "pt-4" : undefined}>
          <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase">{group.title}</div>
          {group.items.map((item) => {
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-xs font-medium",
                  active
                    ? "bg-gradient-to-r from-[#FA5B0F]/15 via-[#FA5B0F]/5 to-transparent text-white border-l-2 border-[#FA5B0F] shadow-sm font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", active ? "text-[#FA5B0F]" : item.color)} />
                  <span className="truncate">{item.label}</span>
                </div>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FA5B0F] shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function AdminUserMenu({ email }: { email: string }) {
  const signOut = useSignOut();
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 shadow-sm">
      <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 text-[#FA5B0F] text-xs font-bold uppercase shrink-0">
        {email.slice(0, 2)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-slate-200 truncate">{email}</span>
        <span className="block text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Administrator
        </span>
      </span>
      <button onClick={signOut} aria-label="Sign out" title="Sign out" className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer">
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}

export function AdminMobileNav({ email }: { email: string }) {
  const pathname = usePathname() ?? "";
  // The sheet is tied to the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = React.useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);
  const signOut = useSignOut();
  const moreActive = !TABS.some((t) => isActive(pathname, t));

  // Lock page scroll and listen for Escape while the sheet is open.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="All admin sections">
          <button aria-label="Close menu" className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-slate-800 bg-[#0A1B2A] px-4 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl animate-sheet-up">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-700" aria-hidden="true" />
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-white">All sections</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 -mr-2 rounded-full text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            {NAV.map((group) => (
              <div key={group.title} className="mt-3">
                <div className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{group.title}</div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {group.items.map((item) => {
                    const active = isActive(pathname, item);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-2xl border p-3 min-h-[84px] text-center text-xs transition active:scale-[0.97]",
                          active ? "border-[#FA5B0F]/50 bg-[#FA5B0F]/10 text-white" : "border-slate-800 bg-slate-950/40 text-slate-300"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", item.color)} />
                        <span className="leading-tight">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 py-3 text-sm text-slate-200">
                View site <ArrowUpRight className="w-4 h-4" />
              </a>
              <button onClick={signOut} className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 py-3 text-sm text-rose-300">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-slate-500 truncate">Signed in as {email}</p>
          </div>
        </div>
      )}

      <nav
        aria-label="Admin sections"
        className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-[#0A1B2A]/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
      >
        <div className="mx-auto grid max-w-xl grid-cols-5">
          {TABS.map((item) => {
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 pt-2.5 pb-2 text-[10px] font-medium transition active:scale-95",
                  active ? "text-white" : "text-slate-500"
                )}
              >
                <span className={cn("grid place-items-center h-7 w-12 rounded-full transition", active && "bg-[#FA5B0F]/15")}>
                  <item.icon className={cn("w-5 h-5", active ? "text-[#FA5B0F]" : "text-slate-400")} />
                </span>
                {item.short}
              </Link>
            );
          })}
          <button
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className={cn("flex flex-col items-center gap-1 pt-2.5 pb-2 text-[10px] font-medium active:scale-95", moreActive ? "text-white" : "text-slate-500")}
          >
            <span className={cn("grid place-items-center h-7 w-12 rounded-full", moreActive && "bg-[#FA5B0F]/15")}>
              <Grid2x2 className={cn("w-5 h-5", moreActive ? "text-[#FA5B0F]" : "text-slate-400")} />
            </span>
            More
          </button>
        </div>
      </nav>
    </>
  );
}

const CRUMB_LABELS: Record<string, string> = {
  admin: "Studio",
  cms: "All Pages",
  content: "Site Content",
  pages: "Custom Pages",
  blog: "Blog",
  media: "Media",
  seo: "SEO",
  social: "Social",
  crm: "CRM",
  leads: "Leads",
  pipeline: "Pipeline",
  bookings: "Bookings",
  automation: "Automations",
  ai: "AI",
};

const titleCase = (s: string) =>
  decodeURIComponent(s)
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export function AdminBreadcrumbs() {
  const pathname = usePathname() ?? "/admin";
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    href: "/" + segments.slice(0, i + 1).join("/"),
    label: CRUMB_LABELS[seg] ?? titleCase(seg),
  }));
  // On phones only the current page and its parent fit; earlier crumbs are hidden.
  const firstVisible = Math.max(0, crumbs.length - 2);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 min-w-0">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        const hideOnPhone = i < firstVisible ? "hidden sm:flex" : "flex";
        return (
          <span key={c.href} className={cn("items-center gap-1.5 min-w-0", hideOnPhone)}>
            {i > 0 && <ChevronRight className={cn("w-3 h-3 shrink-0 text-slate-600", i === firstVisible && "hidden sm:block")} />}
            {last ? (
              <span className="text-white font-medium truncate" aria-current="page">{c.label}</span>
            ) : !LINKABLE.has(c.href) ? (
              <span className="truncate">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-white truncate">{c.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
