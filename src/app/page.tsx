import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  ShieldCheck,
  Building2,
  Stethoscope,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Code2,
  Headphones,
  Check,
  AlertCircle,
  Database,
  Lock,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkflowSimulator } from "@/components/home/WorkflowSimulator";
import { FAQAccordion } from "@/components/home/FAQAccordion";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-28 sm:gap-36 py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* =========================================================================
          SECTION 2: HERO SECTION
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* Ambient radial glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-radial-hero pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#27D3C2]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="mx-auto max-w-6xl text-center">
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#FA5B0F]/30 bg-[#FA5B0F]/10 px-4 py-1.5 text-xs font-semibold text-[#FA5B0F] backdrop-blur-md mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA5B0F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA5B0F]"></span>
            </span>
            <span>Autonomous Workflows & Custom Software Engineering</span>
          </div>

          {/* Exact Required Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-5xl mx-auto">
            Turn Repetitive Operations Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FA5B0F] via-[#FF7D3B] to-[#FFA270]">
              Autonomous Growth
            </span>
          </h1>

          {/* Exact Required Subcopy */}
          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            Dodail helps growing businesses streamline operations with intelligent automation, custom software, and performance-focused digital solutions.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/consultation"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-xl shadow-[#FA5B0F]/25 text-base px-8 py-4 font-semibold"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book a Consultation
            </Button>
            <Button
              href="/solutions/ai-automation"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-4 font-semibold border-slate-700 bg-[#0E2235]/90 hover:bg-[#142C44]"
            >
              Explore Solutions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Live Telemetry Metric Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-3xl border border-[#1B3652]/70 bg-[#0A1B2A]/70 backdrop-blur-xl text-left">
            <div className="p-4 rounded-2xl bg-[#0E2235]/60 border border-[#1B3652]/40">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FA5B0F] block">
                Track Record
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">5+ Years</p>
              <p className="text-xs text-slate-400 mt-0.5">Software & Growth Delivery</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E2235]/60 border border-[#1B3652]/40">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block">
                Inference Speed
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">&lt; 500ms</p>
              <p className="text-xs text-slate-400 mt-0.5">Average AI Decision Latency</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E2235]/60 border border-[#1B3652]/40">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 block">
                Validation Rate
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">100%</p>
              <p className="text-xs text-slate-400 mt-0.5">Strict Schema Verification</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E2235]/60 border border-[#1B3652]/40">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-400 block">
                Operations
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">India & Global</p>
              <p className="text-xs text-slate-400 mt-0.5">Hyderabad HQ · Cross-border</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TRUST & CREDIBILITY STRIP
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 border-y border-[#1B3652]/60 bg-[#071522]/60 py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#FA5B0F]/15 border border-[#FA5B0F]/30 flex items-center justify-center text-[#FA5B0F] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Dodail Solutions Private Limited</p>
              <p className="text-xs text-slate-400">Incorporated June 2019 · Hyderabad, Telangana, India</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Next.js 16 Native
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Supabase PostgreSQL
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Gemini Enterprise AI
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Meta & WhatsApp Cloud API
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Zero Fake Awards
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE OPERATIONAL BOTTLENECK (EDITORIAL PROBLEM SECTION)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-400">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>The Operational Bottleneck</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Why Traditional Businesses Leak Revenue Every Single Day
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                When customer inquiries arrive across ad forms, WhatsApp, and emails, manual triage creates friction. Fast-moving buyers move on to competitors, while expensive sales specialists spend half their workweek answering basic questions instead of closing deals.
              </p>

              <div className="p-5 rounded-2xl border border-[#1B3652] bg-[#0E2235]/70 text-xs text-slate-300 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>The 15-Minute Conversion Cliff</span>
                </div>
                <p className="leading-relaxed">
                  Industry research proves that responding to an inbound inquiry after 15 minutes causes an 80% drop in lead qualification. Manual teams simply cannot respond at midnight or peak campaign rushes.
                </p>
              </div>

              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FA5B0F] hover:text-[#FF7D3B] transition-colors"
              >
                <span>Audit your operational bottlenecks with our engineers</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right Asymmetrical Leak Breakdown */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 hover:border-rose-500/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/20 group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">Delayed Lead Ingestion</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Inquiries sit for hours in messy inboxes or unassigned spreadsheets. By the time a representative calls, the prospect has already purchased elsewhere.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652]/60 text-[11px] text-rose-400/90 font-mono">
                  Impact: 40-70% lead abandonment
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 hover:border-amber-500/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">Unqualified Inquiry Waste</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Sales advisors waste 60% of their day answering low-intent tire kickers instead of focusing exclusively on ready-to-transact buyers.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652]/60 text-[11px] text-amber-400/90 font-mono">
                  Impact: 60% rep bandwidth squandered
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">Disconnected Data Silos</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Customer context is scattered across WhatsApp chats, unshared Google Sheets, and ad portals with zero unified CRM attribution.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652]/60 text-[11px] text-cyan-400/90 font-mono">
                  Impact: Lost customer history & double entry
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <Workflow className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">Manual Copy-Paste Burnout</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Employees spend hours manually moving data between payment gateways, email tools, and internal tools instead of doing strategic work.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652]/60 text-[11px] text-purple-400/90 font-mono">
                  Impact: High staff turnover & human error
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 5 CORE SOLUTIONS (STRATEGIC PILLARS)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Engineered Capabilities"
            title="Architected For Measurable Business Outcomes"
            description="We build deterministic, hardened systems that integrate seamlessly into your existing operations. Completely transparent about what works and where human review remains essential."
          />

          {/* Asymmetrical Grid: 1 Featured Spotlight + 4 Supporting Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Spotlight Card: AI Automation Platform */}
            <div className="lg:col-span-7 rounded-3xl border border-[#FA5B0F]/40 bg-gradient-to-b from-[#122B43] to-[#0A1B2A] p-8 lg:p-10 shadow-2xl shadow-black/80 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#FA5B0F]/10 rounded-full blur-[90px] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-[#FA5B0F]/20 text-[#FA5B0F] border border-[#FA5B0F]/40 flex items-center justify-center">
                    <Bot className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FA5B0F] bg-[#FA5B0F]/10 border border-[#FA5B0F]/20 px-3 py-1 rounded-full">
                    Core Pillar 01
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Autonomous AI Business Workflows
                </h3>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  End-to-end operational pipelines that autonomously receive inquiries, query business data via deterministic APIs, make rule-governed decisions, and update production systems without manual touchpoints.
                </p>

                {/* Technical highlights */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#06111C]/60 border border-[#1B3652]/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>PostgreSQL-backed job queue</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#06111C]/60 border border-[#1B3652]/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp Cloud API native</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#06111C]/60 border border-[#1B3652]/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Deterministic JSON schema validation</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#06111C]/60 border border-[#1B3652]/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Automatic failover & retry logic</span>
                  </div>
                </div>

                {/* Honest Outcome vs Limitation */}
                <div className="mt-6 pt-5 border-t border-[#1B3652] space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span><strong>Verified Outcome:</strong> Replaces 10+ hours/week of repetitive manual routing per team member.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400">
                    <span className="text-amber-400 font-bold shrink-0">⚠ Limitation:</span>
                    <span>High-stakes legal or financial exceptions must route to designated human supervisors.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button href="/solutions/ai-automation" variant="primary" size="md">
                  Explore Automation Architecture
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Pillar 2: Custom Software & Web Engineering */}
            <div className="lg:col-span-5 rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-8 flex flex-col justify-between hover:border-[#1B3652]/90 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Pillar 02
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  High-Performance Web Platforms & APIs
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Next.js enterprise portals, customer dashboards, and high-concurrency API integrations. Fast, accessible, and structured with strict TypeScript and PostgreSQL schemas.
                </p>

                <div className="mt-6 pt-4 border-t border-[#1B3652] space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Outcome: Sub-100ms response times & 99.9% uptime</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-amber-400">⚠ Limitation:</span>
                    <span>Custom software takes 2-4 weeks longer than generic drag-and-drop templates.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/services/web-development"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center"
                >
                  View Web Engineering Specs <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: AI Lead Management */}
            <div className="lg:col-span-4 rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-8 flex flex-col justify-between hover:border-[#1B3652]/90 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/30 flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FA5B0F]">
                    Pillar 03
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  Intelligent Lead Qualification & CRM Sync
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ingests inquiries from Meta ads, Google forms, and WhatsApp, validates intent & budget tier, and updates your CRM with enriched context in under 60 seconds.
                </p>

                <div className="mt-6 pt-4 border-t border-[#1B3652] space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Outcome: Sub-1-minute response speed</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-amber-400">⚠ Limitation:</span>
                    <span>Final high-ticket contracts require human sales closing.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/solutions/ai-lead-management"
                  className="text-xs font-semibold text-[#FA5B0F] hover:underline inline-flex items-center"
                >
                  Learn About Lead Triage <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Pillar 4: 24/7 AI Customer Support */}
            <div className="lg:col-span-4 rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-8 flex flex-col justify-between hover:border-[#1B3652]/90 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                    Pillar 04
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  24/7 Guardrailed Customer Support Agent
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Trained exclusively on your private policies, packages, and technical manuals to answer customer inquiries accurately and hand off complex tickets with full history.
                </p>

                <div className="mt-6 pt-4 border-t border-[#1B3652] space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Outcome: 65% first-response ticket reduction</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-amber-400">⚠ Limitation:</span>
                    <span>Legal disputes route to your human management.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/solutions/ai-customer-support"
                  className="text-xs font-semibold text-purple-400 hover:underline inline-flex items-center"
                >
                  Explore Support Agents <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Pillar 5: Digital Growth & GEO / SEO */}
            <div className="lg:col-span-4 rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-8 flex flex-col justify-between hover:border-[#1B3652]/90 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Pillar 05
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  Organic Growth & Search Optimization
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Generative Engine Optimization (GEO), technical schema markup, and high-intent programmatic content pipelines calibrated for Google and modern AI search answers.
                </p>

                <div className="mt-6 pt-4 border-t border-[#1B3652] space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Outcome: Sustainable inbound pipeline</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-amber-400">⚠ Limitation:</span>
                    <span>Requires 60-90 days of consistent domain authority build.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/services/digital-growth-seo"
                  className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center"
                >
                  View SEO & Growth Services <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INTERACTIVE AUTOMATION SHOWCASE (SIMULATOR)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Live Demonstration"
            title="Experience the Dodail Autonomous Engine"
            description="Test our operational prototype to inspect how events are received, evaluated by schema guardrails, and synchronized across connected business services in milliseconds."
          />
          <WorkflowSimulator />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: INDUSTRY VERTICALS (PROVEN BLUEPRINTS)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Target Verticals"
            title="Tailored Workflows for High-Growth Industries"
            description="Proven automation blueprints calibrated specifically for the operational dynamics of healthcare clinics, real estate firms, and modern digital commerce."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Healthcare */}
            <div className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-8 flex flex-col justify-between hover:border-[#FA5B0F]/40 transition-all duration-300 group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-6">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#FA5B0F] transition-colors">
                  Healthcare & Dental Clinics
                </h3>
                <p className="mt-2 text-xs font-mono font-semibold text-[#FA5B0F]">
                  Immediate Patient Ingestion & Scheduling
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Triage incoming patient inquiries by pain/urgency level, automatically send intake forms, match open doctor calendar slots, and deliver reminder sequences via WhatsApp to eradicate clinic no-shows.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652]/70 text-xs text-slate-400 space-y-1">
                  <p>✓ 84% reduction in patient drop-off</p>
                  <p>✓ Automated medical intake collection</p>
                </div>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/industries/dental"
                  className="text-xs font-semibold text-white group-hover:text-[#FA5B0F] inline-flex items-center"
                >
                  View Healthcare Blueprint <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Real Estate */}
            <div className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-8 flex flex-col justify-between hover:border-[#FA5B0F]/40 transition-all duration-300 group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-6">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Real Estate & Property Developers
                </h3>
                <p className="mt-2 text-xs font-mono font-semibold text-cyan-400">
                  Instant High-Intent Buyer Routing
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ingest ad leads, verify buyer budget tiers and timeline, send customized property brochures instantly on WhatsApp, and book on-site visits directly into sales calendar without manual lag.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652]/70 text-xs text-slate-400 space-y-1">
                  <p>✓ Sub-60-second VIP buyer routing</p>
                  <p>✓ Automated brochure & floorplan dispatch</p>
                </div>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/industries/real-estate"
                  className="text-xs font-semibold text-white group-hover:text-cyan-400 inline-flex items-center"
                >
                  View Real Estate Blueprint <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* E-Commerce */}
            <div className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-8 flex flex-col justify-between hover:border-[#FA5B0F]/40 transition-all duration-300 group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  E-Commerce & DTC Brands
                </h3>
                <p className="mt-2 text-xs font-mono font-semibold text-emerald-400">
                  Order Inquiries & Return Automation
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Resolve order tracking queries, automate return validations according to store policies, generate reverse shipping slips, and trigger intelligent recovery workflows for abandoned shopping journeys.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652]/70 text-xs text-slate-400 space-y-1">
                  <p>✓ 65% support ticket deflection</p>
                  <p>✓ Instant courier return label dispatch</p>
                </div>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/industries/ecommerce"
                  className="text-xs font-semibold text-white group-hover:text-emerald-400 inline-flex items-center"
                >
                  View E-Commerce Blueprint <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: 5-STAGE DELIVERY METHODOLOGY
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Engineering Methodology"
            title="From Architecture to Autonomous Execution"
            description="A structured, risk-mitigated engineering lifecycle designed for stability, security, and measurable business adoption."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 01</span>
                <h3 className="text-base font-bold text-white mt-2">Operational Audit</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  We analyze your lead channels, manual touchpoints, software subscriptions, and operational data leaks.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-4 block">Days 1–3</span>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">STAGE 02</span>
                <h3 className="text-base font-bold text-white mt-2">System Blueprint</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Design custom workflow DAGs, schema definitions, and AI prompt guardrails before touching production code.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-4 block">Days 4–6</span>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">STAGE 03</span>
                <h3 className="text-base font-bold text-white mt-2">Engineering Build</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Implement production integrations with Next.js, Supabase PostgreSQL, Gemini APIs, and verified webhooks.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-4 block">Days 7–12</span>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400">STAGE 04</span>
                <h3 className="text-base font-bold text-white mt-2">Sandbox Validation</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Execute stress-tests, prompt injection defense drills, and fallback failure simulations under real traffic.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-4 block">Days 13–15</span>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/80 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 05</span>
                <h3 className="text-base font-bold text-white mt-2">Live Cutover & Scale</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Seamless cutover with SLA-backed monitoring, audit logs, and continuous workflow performance tuning.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-4 block">Continuous</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: PROVEN EXECUTION & CLIENT OUTCOMES (NO FAKE CLAIMS)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Engineering Integrity"
            title="Transparent Track Record, Zero Fabricated Claims"
            description="We do not purchase fake awards or make unsubstantiated revenue promises. Our reputation is built on real software deliverables and enduring partnerships."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/80 p-8">
              <div className="h-10 w-10 rounded-xl bg-[#FA5B0F]/10 text-[#FA5B0F] flex items-center justify-center mb-5 border border-[#FA5B0F]/20">
                <Globe2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Hyderabad Technology Roots</h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Incorporated in June 2019, Dodail Solutions Private Limited has engineered mission-critical web applications, search growth, and automation architectures for diverse commercial sectors.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/80 p-8">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/20">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Full Client Code Ownership</h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Built on enterprise open-source technologies (Next.js & Supabase PostgreSQL). You maintain full ownership of your data, database schema, and custom intellectual property without vendor lock-in.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/80 p-8">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Strict Enterprise Guardrails</h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our AI tool integrations enforce deterministic schema definitions, cryptographic webhook verification, and audit-logged execution trees. Customer business data is never shared to train third-party models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FREQUENTLY ASKED QUESTIONS (ACCESSIBLE ACCORDION)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            badge="Clarity & Governance"
            title="Frequently Asked Questions"
            description="Clear, honest engineering answers regarding accuracy, security, timelines, and deployment."
          />
          <FAQAccordion />
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: HIGH-CONVERSION FINAL CTA CARD
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-[#FA5B0F]/40 bg-gradient-to-b from-[#102B42] via-[#0E2235] to-[#071522] p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-black/80 overflow-hidden">
          {/* Ambient ember glow inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FA5B0F]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <Badge variant="orange">Ready to Modernize Your Operations?</Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-6 leading-tight">
              Schedule a Confidential Feasibility Consultation
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Speak directly with a Dodail solutions engineer. We will audit your current manual touchpoints, identify highest-ROI automation quick wins, and deliver an actionable architectural roadmap.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/consultation"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-4 font-semibold shadow-xl shadow-[#FA5B0F]/30"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book a Consultation
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-4 font-semibold border-slate-700 bg-[#0A1B2A]/90 hover:bg-[#142C44]"
              >
                Send Direct Message
              </Button>
            </div>

            {/* Direct contact and office verification */}
            <div className="mt-10 pt-8 border-t border-[#1B3652]/70 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>Hyderabad, Telangana, India</span>
              </span>
              <span>•</span>
              <a href="tel:+919966400235" className="hover:text-white transition-colors">
                +91 99664 00235
              </a>
              <span>•</span>
              <a href="mailto:info@dodail.com" className="hover:text-white transition-colors">
                info@dodail.com
              </a>
              <span>•</span>
              <span className="font-mono text-slate-400">CIN Registered Pvt Ltd</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
