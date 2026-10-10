"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock,
  Copy,
  ExternalLink,
  Gauge,
  Home,
  Mail,
  Megaphone,
  Menu,
  MessageSquare,
  PanelBottom,
  PenSquare,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Zap,
  Database,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/lib/crm/types";
import type { Booking } from "@/lib/booking/types";
import type { ContentSummary } from "@/lib/cms/content/types";
import type { ReadinessCheck, SeoIssue } from "@/lib/admin/health";

interface DashboardClientProps {
  sessionEmail: string;
  leads: Lead[];
  bookings: Booking[];
  publishedPosts: number;
  draftPosts: number;
  customizedCount: number;
  totalContentCount: number;
  seoScore: number;
  seoAudit: { checked: number; issues: SeoIssue[] };
  checks: ReadinessCheck[];
  recentEdits: ContentSummary[];
  announcement: { enabled?: boolean; text?: string; linkText?: string; linkHref?: string };
  isDbConfigured: boolean;
}

const QUICK_ACTIONS = [
  { key: "home", label: "Homepage Copy", hint: "Hero, value props, FAQs", icon: Home, href: "/admin/cms/content/home" },
  { key: "nav", label: "Navigation & CTA", hint: "Header, phone bar & menus", icon: Menu, href: "/admin/cms/content/site/navigation" },
  { key: "seo", label: "SEO & App Meta", hint: "Global meta & indexing", icon: Search, href: "/admin/seo" },
  { key: "company", label: "Company & Socials", hint: "WhatsApp, address & links", icon: Building2, href: "/admin/cms/content/site/company" },
  { key: "consultation", label: "Booking Setup", hint: "Topics & calendar rules", icon: Calendar, href: "/admin/cms/content/consultation" },
  { key: "footer", label: "Footer & Legal", hint: "Columns & copyright line", icon: PanelBottom, href: "/admin/cms/content/site/footer" },
];

const leadTone: Record<string, { pill: string; dot: string; label: string }> = {
  new: { pill: "bg-sky-500/10 text-sky-300 border-sky-500/30", dot: "bg-sky-400", label: "New Lead" },
  contacted: { pill: "bg-amber-500/10 text-amber-300 border-amber-500/30", dot: "bg-amber-400", label: "Contacted" },
  qualified: { pill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", dot: "bg-emerald-400", label: "Qualified" },
  proposal_sent: { pill: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30", dot: "bg-indigo-400", label: "Proposal Sent" },
  converted: { pill: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40", dot: "bg-emerald-300", label: "Won / Converted" },
  unqualified: { pill: "bg-slate-500/10 text-slate-400 border-slate-500/30", dot: "bg-slate-400", label: "Unqualified" },
  spam: { pill: "bg-rose-500/10 text-rose-400 border-rose-500/30", dot: "bg-rose-400", label: "Spam" },
};

const AVATAR_GRADIENTS = [
  "from-orange-500 to-amber-500",
  "from-teal-500 to-cyan-500",
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
];

function getAvatarGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

function formatRelativeTime(iso: string) {
  const diff = Date.now() - Date.parse(iso);
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date(iso));
}

export function DashboardClient({
  sessionEmail,
  leads,
  bookings,
  publishedPosts,
  draftPosts,
  customizedCount,
  totalContentCount,
  seoScore,
  seoAudit,
  checks,
  recentEdits,
  announcement,
  isDbConfigured,
}: DashboardClientProps) {
  const [timeString, setTimeString] = useState<string>("");
  const [leadTab, setLeadTab] = useState<"all" | "new" | "qualified" | "converted">("all");
  const [leadSearch, setLeadSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);

  // Live IST Clock
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }).format(now);
      setTimeString(formatted);
    }
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((l) => !l.merged_into_id)
      .filter((l) => {
        if (leadTab === "all") return true;
        if (leadTab === "new") return l.status === "new";
        if (leadTab === "qualified") return l.status === "qualified" || l.status === "proposal_sent";
        if (leadTab === "converted") return l.status === "converted";
        return true;
      })
      .filter((l) => {
        if (!leadSearch.trim()) return true;
        const q = leadSearch.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.company_name && l.company_name.toLowerCase().includes(q))
        );
      })
      .slice(0, 6);
  }, [leads, leadTab, leadSearch]);

  const passingChecks = checks.filter((c) => c.ok).length;
  const readinessPercent = Math.round((passingChecks / checks.length) * 100);

  const newThisWeek = useMemo(() => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return leads.filter((l) => !l.merged_into_id && Date.parse(l.created_at) > oneWeekAgo).length;
  }, [leads]);

  const upcomingBookings = useMemo(() => {
    const now = Date.now();
    return bookings
      .filter((b) => Date.parse(b.start_time) > now && !["cancelled", "no_show"].includes(b.booking_status))
      .sort((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time));
  }, [bookings]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner / Welcome & Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-medium text-slate-400">Dodail Studio Console</span>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>
            {isDbConfigured ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
                <Database className="w-3 h-3 text-emerald-400" /> Supabase Synced
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-400">
                <Database className="w-3 h-3 text-amber-400" /> Local Fallback
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            Welcome back, <span className="text-slate-200">{sessionEmail.split("@")[0]}</span>
          </h1>
        </div>

        {/* Action Controls & Clock */}
        <div className="flex flex-wrap items-center gap-2.5">
          {timeString && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#FA5B0F]" />
              <span>{timeString} IST</span>
            </div>
          )}
          <Link
            href="/admin/cms/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FA5B0F] to-[#FF7A3D] hover:from-[#e04f0b] hover:to-[#FA5B0F] text-white font-medium text-xs sm:text-sm shadow-md shadow-orange-950/30 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </Link>
          <Link
            href="/admin/cms/content"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-200 font-medium text-xs sm:text-sm transition-all"
          >
            <PenSquare className="w-4 h-4 text-[#FA5B0F]" />
            <span>Edit Content</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm transition-all"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Metric 1: Leads */}
        <Link
          href="/admin/crm/leads"
          className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 transition-all hover:border-[#FA5B0F]/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-orange-950/10"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Inbound Leads</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-orange-500/10 text-[#FA5B0F] group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{newThisWeek}</div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>+{newThisWeek} new this week</span>
            <span className="font-mono text-[11px] text-[#FA5B0F]">{leads.length} total</span>
          </div>
        </Link>

        {/* Metric 2: Bookings */}
        <Link
          href="/admin/bookings"
          className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 transition-all hover:border-violet-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-violet-950/10"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Consultations</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-violet-500/10 text-violet-400 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{upcomingBookings.length}</div>
          <div className="mt-1 text-xs text-slate-400 truncate">
            {upcomingBookings[0] ? (
              <span className="text-violet-300 font-medium">
                Next: {new Intl.DateTimeFormat("en-IN", { weekday: "short", hour: "numeric", minute: "2-digit" }).format(new Date(upcomingBookings[0].start_time))}
              </span>
            ) : (
              "No calls booked"
            )}
          </div>
        </Link>

        {/* Metric 3: Articles & Content */}
        <Link
          href="/admin/cms/blog"
          className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 transition-all hover:border-emerald-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-emerald-950/10"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Articles & CMS</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{publishedPosts}</div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>{draftPosts} in draft</span>
            <span className="font-mono text-[11px] text-emerald-400">{customizedCount} customized</span>
          </div>
        </Link>

        {/* Metric 4: SEO Health */}
        <Link
          href="/admin/seo"
          className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 transition-all hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-blue-950/10"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">SEO Health</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{seoScore}%</span>
            <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", seoScore >= 90 ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" : "bg-amber-500/10 text-amber-300 border-amber-500/20")}>
              {seoScore >= 90 ? "Optimized" : "Attention"}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-400 truncate">
            {seoAudit.issues.length === 0 ? "All meta clean" : `${seoAudit.issues.length} issue${seoAudit.issues.length === 1 ? "" : "s"} across ${seoAudit.checked} pages`}
          </div>
        </Link>
      </div>

      {/* Quick Launchpad Strip */}
      <div className="rounded-2xl border border-slate-800/90 bg-[#0A1B2A]/60 p-4 sm:p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FA5B0F]" /> Quick Launchpad
          </h2>
          <Link href="/admin/cms/content" className="text-xs font-medium text-[#FA5B0F] hover:underline flex items-center gap-1">
            All {totalContentCount} pages <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.key}
              href={action.href}
              className="group flex flex-col p-3 rounded-xl border border-slate-800/80 bg-slate-950/50 hover:bg-slate-900 hover:border-slate-700 transition-all active:scale-[0.98]"
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800/80 text-slate-300 group-hover:text-[#FA5B0F] group-hover:bg-[#FA5B0F]/10 transition-colors mb-2">
                <action.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">{action.label}</span>
              <span className="text-[10px] text-slate-500 truncate mt-0.5">{action.hint}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column (8 cols): Leads Hub + Upcoming Consultations + SEO Issues */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8">
          {/* Latest Leads Panel */}
          <section className="rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 p-5 sm:p-6 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-orange-500/10 text-[#FA5B0F]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Latest Inbound Leads</h2>
                  <p className="text-xs text-slate-400">Captured through consultation and contact forms</p>
                </div>
              </div>
              <Link href="/admin/crm/leads" className="text-xs font-medium text-[#FA5B0F] hover:underline flex items-center gap-1 self-start sm:self-center">
                Full CRM table <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Leads Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                {(["all", "new", "qualified", "converted"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setLeadTab(tab)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg capitalize font-medium transition-colors cursor-pointer",
                      leadTab === tab
                        ? "bg-[#FA5B0F] text-white shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter leads..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FA5B0F]"
                />
              </div>
            </div>

            {/* Leads List */}
            {filteredLeads.length === 0 ? (
              <div className="py-10 text-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30">
                <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-300">No leads found in this view</p>
                <p className="text-xs text-slate-500 mt-1">Form submissions will automatically appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80 -mx-1">
                {filteredLeads.map((lead) => {
                  const tone = leadTone[lead.status] ?? leadTone.new;
                  return (
                    <div
                      key={lead.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-2.5 rounded-xl hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Deterministic colorful avatar */}
                        <div
                          className={cn(
                            "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-sm",
                            getAvatarGradient(lead.name)
                          )}
                        >
                          {lead.name.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-slate-100 truncate">{lead.name}</span>
                            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium", tone.pill)}>
                              <span className={cn("w-1.5 h-1.5 rounded-full", tone.dot)} />
                              {tone.label}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-slate-400">
                            {lead.company_name && (
                              <span className="flex items-center gap-1 text-slate-300 font-medium">
                                <Building2 className="w-3 h-3 text-slate-500" />
                                {lead.company_name}
                              </span>
                            )}
                            <span className="truncate">{lead.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Quick Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-1 sm:pt-0 border-t border-slate-800/60 sm:border-t-0">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {formatRelativeTime(lead.created_at)}
                        </span>

                        <div className="flex items-center gap-1">
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <a
                            href={`mailto:${lead.email}`}
                            title="Send Email"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopy(lead.email, lead.id)}
                            title="Copy Email"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                          >
                            {copiedId === lead.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Upcoming Consultations */}
          <section className="rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 p-5 sm:p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500/10 text-violet-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Upcoming Consultations</h2>
                  <p className="text-xs text-slate-400">Scheduled client strategy sessions</p>
                </div>
              </div>
              <Link href="/admin/bookings" className="text-xs font-medium text-[#FA5B0F] hover:underline flex items-center gap-1">
                Calendar view <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {upcomingBookings.length === 0 ? (
              <div className="py-8 text-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30">
                <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-300">No upcoming meetings scheduled</p>
                <p className="text-xs text-slate-500 mt-1">
                  Bookings via <code className="font-mono text-slate-400">/consultation</code> will show up here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {upcomingBookings.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col justify-between p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/50 hover:border-violet-500/40 transition-colors space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="font-semibold text-sm text-slate-100 block truncate">{b.customer_name}</span>
                        <span className="text-xs text-slate-400 block truncate">{b.customer_company || b.customer_email}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-[10px] font-semibold shrink-0">
                        Confirmed
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                        <Clock className="w-3 h-3 text-violet-400" />
                        <span>
                          {new Intl.DateTimeFormat("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "2-digit",
                            timeZone: "Asia/Kolkata",
                          }).format(new Date(b.start_time))}{" "}
                          IST
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Video className="w-3 h-3" /> Meet
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SEO Health Center */}
          <section id="seo-health" className="rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 p-5 sm:p-6 backdrop-blur-md scroll-mt-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">SEO Health & Title Audits</h2>
                  <p className="text-xs text-slate-400">Automated scan of search metadata across all CMS documents</p>
                </div>
              </div>
              <Link href="/admin/seo" className="text-xs font-medium text-[#FA5B0F] hover:underline flex items-center gap-1">
                Full SEO Audit <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {seoAudit.issues.length === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>
                  All {seoAudit.checked} pages have well-sized, unique titles and descriptions. Zero SEO issues detected!
                </span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {seoAudit.issues.slice(0, 5).map((issue, idx) => (
                  <div
                    key={`${issue.key}-${idx}`}
                    className="flex items-start sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-800/80 bg-slate-950/50 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <CircleAlert className="w-4 h-4 mt-0.5 sm:mt-0 text-amber-400 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-slate-200 block truncate">{issue.label}</span>
                        <span className="text-[11px] text-slate-400 block truncate">{issue.problem}</span>
                      </div>
                    </div>
                    <Link
                      href={`/admin/cms/content/${issue.key}#section-seo`}
                      className="px-2.5 py-1 rounded-lg bg-[#FA5B0F]/10 hover:bg-[#FA5B0F]/20 text-[#FA5B0F] text-xs font-medium shrink-0 transition-colors"
                    >
                      Fix in CMS
                    </Link>
                  </div>
                ))}
                {seoAudit.issues.length > 5 && (
                  <p className="text-xs text-slate-500 pt-1 text-center">
                    +{seoAudit.issues.length - 5} more issues in{" "}
                    <Link href="/admin/seo" className="text-[#FA5B0F] hover:underline">
                      SEO Control Center
                    </Link>
                  </p>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Right Column (4 cols): Production Readiness + Announcement Bar + Recent Edits */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 sm:space-y-8">
          {/* Go-Live Readiness Checklist */}
          <section className="rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Production Readiness
              </h2>
              <span className="text-xs font-mono font-semibold text-slate-300">
                {passingChecks}/{checks.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FA5B0F] to-emerald-400 transition-all duration-500"
                style={{ width: `${readinessPercent}%` }}
              />
            </div>

            <div className="space-y-2">
              {checks.map((check) => {
                const isExpanded = expandedCheck === check.label;
                return (
                  <div
                    key={check.label}
                    className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-2.5 transition-colors"
                  >
                    <div
                      className="flex items-center justify-between gap-2 cursor-pointer select-none"
                      onClick={() => setExpandedCheck(isExpanded ? null : check.label)}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {check.ok ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <CircleAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        )}
                        <span className={cn("text-xs truncate", check.ok ? "text-slate-300" : "text-white font-medium")}>
                          {check.label}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label="Toggle details"
                        className="text-slate-500 hover:text-white p-0.5"
                      >
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                        {check.help}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Announcement Bar Widget & Live Simulator */}
          <section className="rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#FA5B0F]" /> Announcement Bar
              </h2>
              <span
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                  announcement.enabled
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                )}
              >
                {announcement.enabled ? "● Live on Site" : "○ Hidden"}
              </span>
            </div>

            {/* Live Visual Preview */}
            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/70 mb-3 space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Public Header Preview
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {announcement.text || "No announcement text configured."}
              </p>
              {announcement.linkText && (
                <span className="text-[11px] text-[#FA5B0F] font-semibold underline block">
                  {announcement.linkText} →
                </span>
              )}
            </div>

            <Link
              href="/admin/cms/content/site/navigation#section-announcement"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-slate-700/80 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
            >
              {announcement.enabled ? "Edit Announcement Copy" : "Turn On Announcement"}
            </Link>
          </section>

          {/* Recently Modified Pages */}
          <section className="rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> Recently Modified
              </h2>
              <span className="text-xs text-slate-500">{customizedCount} customized</span>
            </div>

            {recentEdits.length === 0 ? (
              <p className="text-xs text-slate-400 leading-relaxed">
                Every page is showing code defaults. Open{" "}
                <Link href="/admin/cms/content" className="text-[#FA5B0F] hover:underline">
                  Site Content
                </Link>{" "}
                to make your first edit.
              </p>
            ) : (
              <div className="space-y-2">
                {recentEdits.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-white/[0.03] transition-colors"
                  >
                    <Link
                      href={`/admin/cms/content/${item.key}`}
                      className="truncate text-xs font-medium text-slate-200 hover:text-white"
                    >
                      {item.label}
                    </Link>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.updated_at && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {formatRelativeTime(item.updated_at)}
                        </span>
                      )}
                      {item.path && item.path !== "*" && (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${item.label}`}
                          className="text-slate-500 hover:text-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Footer stats line */}
          <div className="text-center pt-2 text-[11px] text-slate-500">
            Dodail Studio v2.0 · {totalContentCount} Documents Indexed
          </div>
        </div>
      </div>
    </div>
  );
}
