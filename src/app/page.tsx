import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Clock,
  Database,
  Globe2,
  Lock,
  Layers,
  Terminal,
  Calendar,
  Code2,
  Users,
  Bot,
  TrendingUp,
  Headphones,
  Stethoscope,
  Building2,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WorkflowSimulator } from "@/components/home/WorkflowSimulator";
import { FAQAccordion } from "@/components/home/FAQAccordion";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-28 sm:gap-36 py-8 sm:py-16 overflow-hidden bg-[#07090E] text-slate-100">
      {/* =========================================================================
          SECTION 2: EDITORIAL HERO SECTION
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="mx-auto max-w-6xl">
          {/* Top Editorial Monospace Tag */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-8 border-b border-white/[0.08] pb-4">
            <span className="text-[#FA5B0F] font-semibold tracking-wider uppercase">
              Dodail Solutions Private Limited
            </span>
            <span className="text-white/20">/</span>
            <span>Hyderabad, India · Est. 2019</span>
            <span className="text-white/20">/</span>
            <span>Bespoke Engineering & Autonomous Systems</span>
          </div>

          {/* Exact Required Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[1.02]">
            Turn Repetitive Operations Into{" "}
            <span className="text-[#FA5B0F]">Autonomous Growth</span>
          </h1>

          {/* Exact Required Master Subcopy */}
          <p className="mt-8 max-w-3xl text-lg sm:text-2xl text-slate-300 font-light leading-relaxed">
            Dodail helps growing businesses streamline operations with intelligent automation, custom software, and performance-focused digital solutions.
          </p>

          {/* Direct Conversion Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              href="/consultation"
              variant="primary"
              size="lg"
              className="text-base px-8 py-4 font-semibold shadow-xl shadow-[#FA5B0F]/20"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book a Consultation
            </Button>
            <Button
              href="/solutions/ai-automation"
              variant="secondary"
              size="lg"
              className="text-base px-8 py-4 font-semibold border-white/10 bg-white/[0.03] hover:bg-white/[0.08]"
            >
              Explore Solutions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Key Deliverable Anchors */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                01 / Track Record
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">5+ Years</p>
              <p className="text-xs text-slate-400 mt-1">Software & Growth Delivery</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                02 / Response Speed
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">&lt; 60s</p>
              <p className="text-xs text-slate-400 mt-1">Lead Qualification & Triage</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                03 / Code Ownership
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">100%</p>
              <p className="text-xs text-slate-400 mt-1">Full Client IP & DB Control</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                04 / Commercial Base
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Hyderabad</p>
              <p className="text-xs text-slate-400 mt-1">India & Global Deployments</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TRUST & ARCHITECTURAL FOUNDATION STRIP
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 border-y border-white/[0.08] bg-[#0A0D14] py-8">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <p className="text-sm font-semibold text-white">
              Enterprise Open-Source Architecture · Zero Black-Box Lock-in
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#FA5B0F]" /> Next.js 16 Native
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#FA5B0F]" /> Supabase PostgreSQL
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#FA5B0F]" /> WhatsApp Cloud API
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#FA5B0F]" /> Verified Schema Guardrails
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE OPERATIONAL BOTTLENECK (EDITORIAL COMPARISON)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider block mb-2">
              The Operational Cost of Manual Friction
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
              Where Growing Companies Silently Bleed Revenue Every Day
            </h2>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {/* Leak 01 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 font-mono text-xs text-slate-500">
                01 / INGESTION LATENCY
              </div>
              <div className="md:col-span-5">
                <h3 className="text-lg font-bold text-white mb-2">
                  Inquiries wait hours for manual staff review
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Forms, WhatsApp messages, and paid ad leads sit idle during off-hours. In high-intent categories, 80% of buyers select the first vendor who provides an intelligent response within 15 minutes.
                </p>
              </div>
              <div className="md:col-span-4 rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 text-xs font-mono text-slate-300">
                <span className="text-emerald-400 font-bold block mb-1">Dodail Solution:</span>
                Sub-60s automated qualification, schedule coordination, and instant CRM sync.
              </div>
            </div>

            {/* Leak 02 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 font-mono text-xs text-slate-500">
                02 / REP BANDWIDTH
              </div>
              <div className="md:col-span-5">
                <h3 className="text-lg font-bold text-white mb-2">
                  High-cost sales specialists burn time on unqualified leads
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Your best closers waste 60% of their workday answering basic pricing questions or fielding leads with mismatched budgets, leaving little bandwidth for serious buyers.
                </p>
              </div>
              <div className="md:col-span-4 rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 text-xs font-mono text-slate-300">
                <span className="text-emerald-400 font-bold block mb-1">Dodail Solution:</span>
                Pre-qualification workflows that filter budget, timeline, and requirements before human booking.
              </div>
            </div>

            {/* Leak 03 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 font-mono text-xs text-slate-500">
                03 / FRAGMENTATION
              </div>
              <div className="md:col-span-5">
                <h3 className="text-lg font-bold text-white mb-2">
                  Business data is trapped across isolated chats and loose spreadsheets
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Customer agreements, appointment dates, and payment states are scattered with no single source of truth. When an employee leaves, institutional context vanishes with them.
                </p>
              </div>
              <div className="md:col-span-4 rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 text-xs font-mono text-slate-300">
                <span className="text-emerald-400 font-bold block mb-1">Dodail Solution:</span>
                Unified PostgreSQL database layer connecting WhatsApp, payment gateways, and CRM in real time.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 5 CORE SOLUTIONS (ARCHITECTURAL INDEX)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider block mb-2">
              Capabilities & Systems
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Engineered For Measurable Business Impact
            </h2>
            <p className="mt-4 text-base text-slate-400 max-w-2xl">
              Deterministic architectures built for long-term operational resilience. Complete transparency on deliverables, verified outcomes, and engineering scope.
            </p>
          </div>

          <div className="space-y-6">
            {/* Pillar 01: AI Automation Platform */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8 sm:p-10 hover:border-[#FA5B0F]/40 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-mono text-[#FA5B0F] font-bold">01 / PILLAR</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    Autonomous Business Workflow Engines
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    End-to-end operational systems that receive inquiries, validate data schemas, make rule-based evaluations, and execute cross-platform tasks across WhatsApp, Google Sheets, and CRMs.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">PostgreSQL Queues</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">WhatsApp Cloud API</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Deterministic Retries</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Schema Validation</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-emerald-400 font-bold block mb-0.5">Verified Outcome</span>
                      <p className="text-slate-400">Replaces 10+ hours per week of manual cross-app copy-pasting per employee.</p>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold block mb-0.5">Engineering Boundary</span>
                      <p className="text-slate-400">High-stakes commercial or legal exceptions route directly to human management.</p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-2">
                  <Link
                    href="/solutions/ai-automation"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/[0.06] hover:bg-[#FA5B0F] hover:text-white px-5 py-3 rounded-xl border border-white/10 transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Pillar 02: Custom Web Engineering */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8 sm:p-10 hover:border-white/20 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-mono text-cyan-400 font-bold">02 / PILLAR</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    High-Performance Web Platforms & Portals
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    Custom Next.js web applications, client portals, and administrative workspaces. Engineered with strict TypeScript, clean PostgreSQL schemas, and zero builder bloat.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Next.js 16 SSR</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Row-Level Security (RLS)</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">REST & Webhook APIs</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-emerald-400 font-bold block mb-0.5">Verified Outcome</span>
                      <p className="text-slate-400">Sub-100ms response times, 100/100 Core Web Vitals, and total code ownership.</p>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold block mb-0.5">Engineering Boundary</span>
                      <p className="text-slate-400">Custom software requires 2-4 weeks of discovery & build vs generic templates.</p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-2">
                  <Link
                    href="/services/web-development"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/[0.06] hover:bg-white hover:text-black px-5 py-3 rounded-xl border border-white/10 transition-colors"
                  >
                    <span>Web Engineering</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Pillar 03: Lead Qualification & CRM */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8 sm:p-10 hover:border-white/20 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-mono text-[#FA5B0F] font-bold">03 / PILLAR</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    Intelligent Lead Qualification & CRM Sync
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    Ingests prospects from web forms, ad campaigns, and messaging apps. Validates budget, timeline, and intent within 60 seconds, syncing qualified leads directly into your sales CRM.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Meta & Google Ingestion</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">CRM Sync (Zoho / HubSpot)</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Real-time Scoring</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-emerald-400 font-bold block mb-0.5">Verified Outcome</span>
                      <p className="text-slate-400">Response time drops from 4 hours to under 60 seconds with enriched context.</p>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold block mb-0.5">Engineering Boundary</span>
                      <p className="text-slate-400">System qualifies and schedules; human sales reps lead high-ticket deal negotiation.</p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-2">
                  <Link
                    href="/solutions/ai-lead-management"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/[0.06] hover:bg-white hover:text-black px-5 py-3 rounded-xl border border-white/10 transition-colors"
                  >
                    <span>Lead Operations</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Pillar 04: Customer Support Systems */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8 sm:p-10 hover:border-white/20 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-mono text-purple-400 font-bold">04 / PILLAR</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    24/7 Policy-Constrained Customer Support
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    Constrained AI assistants trained exclusively on your approved documentation and business rules. Resolves repetitive inquiries, looks up order/appointment states, and escalates edge cases cleanly.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Zero Hallucination Bound</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Private Knowledge Base</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Contextual Human Handoff</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-emerald-400 font-bold block mb-0.5">Verified Outcome</span>
                      <p className="text-slate-400">65% reduction in first-response tickets without increasing support staff.</p>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold block mb-0.5">Engineering Boundary</span>
                      <p className="text-slate-400">Complex refunds and disputes route with complete chat history to your management.</p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-2">
                  <Link
                    href="/solutions/ai-customer-support"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/[0.06] hover:bg-white hover:text-black px-5 py-3 rounded-xl border border-white/10 transition-colors"
                  >
                    <span>Support Agents</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Pillar 05: Organic Growth & SEO */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8 sm:p-10 hover:border-white/20 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-mono text-emerald-400 font-bold">05 / PILLAR</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    Digital Visibility & Generative Engine Optimization
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    Technical SEO, structured JSON-LD schemas, and Generative Engine Optimization (GEO) designed to earn visibility both on Google search rankings and emerging AI search assistants.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">GEO AI Optimization</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Technical Schema Markup</span>
                    <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">Domain Authority Strategy</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-emerald-400 font-bold block mb-0.5">Verified Outcome</span>
                      <p className="text-slate-400">Predictable organic pipeline that compounds over time without ad spend spikes.</p>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold block mb-0.5">Engineering Boundary</span>
                      <p className="text-slate-400">Search authority takes 60–90 days of consistent publishing and technical signals.</p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-2">
                  <Link
                    href="/services/digital-growth-seo"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/[0.06] hover:bg-white hover:text-black px-5 py-3 rounded-xl border border-white/10 transition-colors"
                  >
                    <span>Growth & SEO</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INTERACTIVE WORKBENCH SHOWCASE
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider block mb-2">
              System Architecture in Action
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Test the Dodail Operational Workflow
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
              Inspect how inbound signals are received, validated via deterministic schemas, and dispatched to destination databases in under 400 milliseconds.
            </p>
          </div>
          <WorkflowSimulator />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: INDUSTRY VERTICALS (PROVEN BLUEPRINTS)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider block mb-2">
              Industry Blueprints
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Calibrated For High-Growth Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dental */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-4">
                  Vertical / Healthcare
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  Dental Clinics & Multi-Specialty Centers
                </h3>
                <p className="text-xs font-mono text-[#FA5B0F] mb-4">
                  Emergency Triage & No-Show Eradication
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Automate patient triage based on pain severity, schedule doctor appointments via WhatsApp, and deliver pre-consultation intake forms automatically.
                </p>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400 space-y-1">
                  <p>• 84% reduction in patient drop-off</p>
                  <p>• Zero reception bottleneck</p>
                </div>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/industries/dental"
                  className="text-xs font-semibold text-white hover:text-[#FA5B0F] inline-flex items-center gap-1"
                >
                  <span>Clinic Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Real Estate */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-4">
                  Vertical / Real Estate
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  Real Estate Developers & Brokerages
                </h3>
                <p className="text-xs font-mono text-cyan-400 mb-4">
                  Instant High-Ticket Buyer Routing
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Filter incoming portal and ad leads by verified budget and purchase timeline. Dispatch brochures instantly via WhatsApp and book site visits directly into advisor calendars.
                </p>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400 space-y-1">
                  <p>• Sub-60s VIP buyer engagement</p>
                  <p>• Automated brochure & floorplan delivery</p>
                </div>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/industries/real-estate"
                  className="text-xs font-semibold text-white hover:text-cyan-400 inline-flex items-center gap-1"
                >
                  <span>Real Estate Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* E-Commerce */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-4">
                  Vertical / E-Commerce
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  DTC Brands & High-Volume Commerce
                </h3>
                <p className="text-xs font-mono text-emerald-400 mb-4">
                  Order Inquiries & Return Logistics
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Resolve tracking requests, validate return eligibility against store policies, and generate courier reverse pickup slips automatically without staff intervention.
                </p>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400 space-y-1">
                  <p>• 65% support ticket deflection</p>
                  <p>• Instant reverse shipping slips</p>
                </div>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/industries/ecommerce"
                  className="text-xs font-semibold text-white hover:text-emerald-400 inline-flex items-center gap-1"
                >
                  <span>Commerce Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: 5-STAGE METHODOLOGY TIMELINE
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider block mb-2">
              Engineering Lifecycle
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              From System Audit to Live Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="rounded-xl border border-white/[0.08] bg-[#0A0D14] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 01</span>
                <h3 className="text-base font-bold text-white mt-2">Operational Audit</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  We audit your customer channels, manual bottlenecks, software stack, and data leakage points.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-4 block">Days 1–3</span>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0A0D14] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">STAGE 02</span>
                <h3 className="text-base font-bold text-white mt-2">Architecture Blueprint</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Define workflow schemas, database structures, and validation rules before touching code.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-4 block">Days 4–6</span>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0A0D14] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">STAGE 03</span>
                <h3 className="text-base font-bold text-white mt-2">Engineering Build</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Implement custom connectors with Next.js, Supabase PostgreSQL, and official webhooks.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-4 block">Days 7–12</span>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0A0D14] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400">STAGE 04</span>
                <h3 className="text-base font-bold text-white mt-2">Sandbox Drills</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Stress-test failure states, retry queues, and edge cases under simulated traffic spikes.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-4 block">Days 13–15</span>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0A0D14] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 05</span>
                <h3 className="text-base font-bold text-white mt-2">Live Cutover</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Production deployment with audit logging, monitoring alerts, and continuous optimization.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-4 block">Continuous</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: VERIFIED PROOF & CODE OWNERSHIP
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider block mb-2">
              Engineering Principles
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Real Deliverables. Zero Fabricated Claims.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">
                01 / Established 2019
              </span>
              <h3 className="text-lg font-bold text-white mb-2">Hyderabad Digital Roots</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Incorporated in June 2019, Dodail Solutions Private Limited has engineered software, search growth, and workflow automations for growing businesses across India and overseas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">
                02 / Complete Freedom
              </span>
              <h3 className="text-lg font-bold text-white mb-2">Full Client Code Ownership</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                You retain complete ownership of your application code, database schema, and workflows. No proprietary software lock-ins or arbitrary per-record subscription taxes.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] p-8">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">
                03 / Data Ethics
              </span>
              <h3 className="text-lg font-bold text-white mb-2">Strict Governance & Security</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Data is encrypted in transit and at rest with strict PostgreSQL Row-Level Security. Your private business communications are never used to train public LLM models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FAQ ACCORDION
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider block mb-2">
              Clarity & Specifications
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: FINAL HIGH-CONVERSION CTA
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/[0.12] bg-[#0D111A] p-8 sm:p-14 lg:p-16">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider font-semibold block mb-3">
              Confidential Feasibility Audit
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to eliminate repetitive manual friction from your business?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Schedule a 30-minute feasibility session with a Dodail solutions engineer. We will review your current manual touchpoints, assess technical feasibility, and present an actionable architectural blueprint.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="/consultation"
                variant="primary"
                size="lg"
                className="text-base px-8 py-4 font-semibold shadow-xl shadow-[#FA5B0F]/20"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book a Consultation
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="text-base px-8 py-4 font-semibold border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
              >
                Send Direct Message
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="text-slate-300">Dodail Solutions Private Limited</span>
              <span>•</span>
              <span>Hyderabad, Telangana, India</span>
              <span>•</span>
              <a href="tel:+919966400235" className="text-slate-300 hover:text-white transition-colors">
                +91 99664 00235
              </a>
              <span>•</span>
              <a href="mailto:info@dodail.com" className="text-slate-300 hover:text-white transition-colors">
                info@dodail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
