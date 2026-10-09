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
  Factory,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WorkflowSimulator } from "@/components/home/WorkflowSimulator";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { NetworkCanvas } from "@/components/motion/NetworkCanvas";
import { HeroScrollShowcase } from "@/components/motion/HeroScrollShowcase";
import { ServicesScrollStack } from "@/components/motion/ServicesScrollStack";

export default function HomePage() {
  return (
    <div className="flex flex-col py-8 sm:py-16 overflow-hidden bg-[#071A28] text-[#F5F8FC]">
      {/* =========================================================================
          SECTION 1: SWISS HERO SECTION WITH MATHEMATICAL GRID & TYPOGRAPHIC SCALE
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10 pb-20 border-b border-[#1B3652] swiss-grid-bg">
        {/* Interactive Geometric Network Canvas */}
        <NetworkCanvas />

        <div className="relative z-10 mx-auto max-w-6xl w-full">
          {/* Top Architectural Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#AABAC8] mb-10 border-b border-[#1B3652] pb-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#FF6B2C]" />
              <span className="text-[#FF6B2C] font-bold tracking-[0.16em] uppercase">
                DODAIL SOLUTIONS PRIVATE LIMITED
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider">
              <span>HYDERABAD [17.3850° N, 78.4867° E]</span>
              <span className="text-[#1B3652]">•</span>
              <span>EST. JUNE 2019</span>
              <span className="text-[#1B3652]">•</span>
              <span className="text-emerald-400">OPERATIONAL // LIVE</span>
            </div>
          </div>

          {/* Swiss Grotesque Headline */}
          <div className="max-w-5xl">
            <h1 className="hero-title-clamp font-extrabold text-[#F5F8FC]">
              Turn Repetitive Operations Into{" "}
              <span className="text-[#FF6B2C]">Autonomous Growth</span>
            </h1>

            {/* Exact Required Master Subcopy */}
            <p className="mt-8 max-w-3xl body-text-clamp text-[#AABAC8] font-light leading-relaxed">
              Dodail helps growing businesses automate repetitive work, connect business systems, and build digital solutions that drive measurable progress.
            </p>

            {/* Direct Conversion Actions (Swiss Sharp Rectangles) */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="/consultation"
                variant="primary"
                size="lg"
                className="text-xs px-8 py-4 font-mono font-bold uppercase tracking-wider shadow-none"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book a Consultation
              </Button>
              <Button
                href="/solutions/ai-automation"
                variant="secondary"
                size="lg"
                className="text-xs px-8 py-4 font-mono uppercase tracking-wider border-[#1B3652]"
              >
                Explore Solutions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* 4-Column Modular Swiss Telemetry Ledger */}
          <div className="mt-16 border-t border-[#1B3652] grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1B3652]">
            <div className="pt-6 sm:pt-6 sm:pr-6">
              <span className="text-[10px] font-mono text-[#AABAC8] uppercase tracking-[0.18em] block">
                INDEX 01 // DELIVERY HISTORY
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FC] mt-2 tracking-tight">5+ Years</p>
              <p className="text-xs text-[#AABAC8] mt-1 font-light">Software &amp; Workflow Delivery</p>
            </div>
            <div className="pt-6 sm:pt-6 sm:px-6">
              <span className="text-[10px] font-mono text-[#AABAC8] uppercase tracking-[0.18em] block">
                INDEX 02 // TRIAGE VELOCITY
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FC] mt-2 tracking-tight">&lt; 60s</p>
              <p className="text-xs text-[#AABAC8] mt-1 font-light">Lead Qualification &amp; Routing</p>
            </div>
            <div className="pt-6 sm:pt-6 sm:px-6">
              <span className="text-[10px] font-mono text-[#AABAC8] uppercase tracking-[0.18em] block">
                INDEX 03 // IP SOVEREIGNTY
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FC] mt-2 tracking-tight">100%</p>
              <p className="text-xs text-[#AABAC8] mt-1 font-light">Client Code &amp; Database Control</p>
            </div>
            <div className="pt-6 sm:pt-6 sm:pl-6">
              <span className="text-[10px] font-mono text-[#AABAC8] uppercase tracking-[0.18em] block">
                INDEX 04 // JURISDICTION
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FC] mt-2 tracking-tight">Hyderabad</p>
              <p className="text-xs text-[#AABAC8] mt-1 font-light">HQ India · Global Deployments</p>
            </div>
          </div>

          {/* 3D Perspective Scroll Showcase */}
          <HeroScrollShowcase />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ARCHITECTURAL SPECIFICATION STRIP
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#1B3652] bg-[#0C2233] py-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-emerald-400" />
            <p className="text-xs font-mono uppercase tracking-wider text-[#F5F8FC] font-semibold">
              SPECIFICATION: ZERO-LOCK-IN OPEN ENTERPRISE ARCHITECTURE
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-[#AABAC8] uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3 text-[#FF6B2C]" /> Next.js 16 Native
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3 text-[#FF6B2C]" /> PostgreSQL ACID
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3 text-[#FF6B2C]" /> WhatsApp Cloud API
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3 text-[#FF6B2C]" /> Strict Schema Bounds
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE OPERATIONAL BOTTLENECK (SWISS ASYMMETRIC LEDGER)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#1B3652]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF6B2C]">DIAGNOSTIC // 01</span>
              <span className="h-px w-8 bg-[#1B3652]" />
              <span className="font-mono text-[11px] text-[#AABAC8] uppercase tracking-wider">COST OF FRICTION</span>
            </div>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] max-w-3xl">
              Where Growing Companies Silently Bleed Revenue Every Day
            </h2>
          </div>

          <div className="divide-y divide-[#1B3652] border-y border-[#1B3652]">
            {/* Leak 01 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-3 font-mono text-xs text-[#FF6B2C] font-bold tracking-[0.16em]">
                01 // INGESTION LATENCY
              </div>
              <div className="md:col-span-5">
                <h3 className="text-xl font-bold text-[#F5F8FC] mb-2 tracking-tight">
                  Inquiries wait hours for manual staff review
                </h3>
                <p className="text-sm text-[#AABAC8] leading-relaxed font-light">
                  Web forms, WhatsApp messages, and paid ad leads sit idle during off-hours. In competitive categories, 80% of buyers select the first vendor who provides an intelligent response within 15 minutes.
                </p>
              </div>
              <div className="md:col-span-4 rounded-none bg-[#0C2233] border border-[#1B3652] p-6 text-xs font-mono text-[#F5F8FC]">
                <span className="text-[#27D3C2] font-bold block mb-2 uppercase tracking-wider">[DODAIL SOLUTION]</span>
                Sub-60s automated qualification, schedule coordination, and instant CRM sync.
              </div>
            </div>

            {/* Leak 02 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-3 font-mono text-xs text-[#FF6B2C] font-bold tracking-[0.16em]">
                02 // REP BANDWIDTH
              </div>
              <div className="md:col-span-5">
                <h3 className="text-xl font-bold text-[#F5F8FC] mb-2 tracking-tight">
                  High-cost sales specialists burn time on unqualified leads
                </h3>
                <p className="text-sm text-[#AABAC8] leading-relaxed font-light">
                  Your best closers waste 60% of their workday answering repetitive basic pricing queries or fielding leads with mismatched budgets, leaving scarce bandwidth for serious buyers.
                </p>
              </div>
              <div className="md:col-span-4 rounded-none bg-[#0C2233] border border-[#1B3652] p-6 text-xs font-mono text-[#F5F8FC]">
                <span className="text-[#27D3C2] font-bold block mb-2 uppercase tracking-wider">[DODAIL SOLUTION]</span>
                Pre-qualification workflows that filter budget, timeline, and requirements before calendar booking.
              </div>
            </div>

            {/* Leak 03 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-3 font-mono text-xs text-[#FF6B2C] font-bold tracking-[0.16em]">
                03 // FRAGMENTATION
              </div>
              <div className="md:col-span-5">
                <h3 className="text-xl font-bold text-[#F5F8FC] mb-2 tracking-tight">
                  Business data is trapped across isolated chats and loose spreadsheets
                </h3>
                <p className="text-sm text-[#AABAC8] leading-relaxed font-light">
                  Customer agreements, order updates, and payment states are scattered with no single source of truth. When an employee leaves, institutional context vanishes with them.
                </p>
              </div>
              <div className="md:col-span-4 rounded-none bg-[#0C2233] border border-[#1B3652] p-6 text-xs font-mono text-[#F5F8FC]">
                <span className="text-[#27D3C2] font-bold block mb-2 uppercase tracking-wider">[DODAIL SOLUTION]</span>
                Unified PostgreSQL database layer connecting WhatsApp, payment gateways, and CRM in real time.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 5 CORE OFFERINGS (SWISS SCROLL STACK)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#1B3652]">
        <div className="mx-auto max-w-6xl">
          <ServicesScrollStack />
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: INTERACTIVE WORKBENCH SHOWCASE
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#1B3652]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF6B2C]">TELEMETRY // LIVE</span>
              <span className="h-px w-8 bg-[#1B3652]" />
              <span className="font-mono text-[11px] text-[#AABAC8] uppercase tracking-wider">RUNTIME BENCHMARK</span>
            </div>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC]">
              Test the Dodail Operational Workflow
            </h2>
            <p className="mt-4 text-base text-[#AABAC8] max-w-2xl font-light">
              Inspect how inbound triggers are received, evaluated via deterministic rules, and dispatched to destination databases in under 400 milliseconds.
            </p>
          </div>
          <WorkflowSimulator />
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: 4 INDUSTRY VERTICALS (SWISS 4-COLUMN MODULAR MATRIX)
          Healthcare, Real Estate, Manufacturing, E-Commerce
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#1B3652]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF6B2C]">SECTORS // 01—04</span>
              <span className="h-px w-8 bg-[#1B3652]" />
              <span className="font-mono text-[11px] text-[#AABAC8] uppercase tracking-wider">VERTICAL ARCHITECTURES</span>
            </div>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC]">
              Calibrated For High-Growth Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1B3652] divide-y lg:divide-y-0 lg:divide-x divide-[#1B3652]">
            {/* 1. Healthcare */}
            <div className="bg-[#0C2233] p-7 flex flex-col justify-between hover:bg-[#10293B] transition-colors relative group">
              <div className="absolute top-2 right-2 font-mono text-[10px] text-[#FF6B2C] opacity-40 select-none">+</div>
              <div>
                <span className="text-[10px] font-mono text-[#FF6B2C] uppercase tracking-[0.18em] block mb-3 font-bold">
                  01 // HEALTHCARE
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2 tracking-tight">
                  Dental Clinics &amp; Medical Centers
                </h3>
                <p className="text-xs font-mono text-[#27D3C2] mb-3">
                  EMERGENCY TRIAGE ENGINE
                </p>
                <p className="text-xs text-[#AABAC8] leading-relaxed font-light">
                  Automate patient triage based on pain severity, schedule doctor appointments via WhatsApp, and deliver pre-consultation intake forms automatically.
                </p>
                <div className="mt-5 pt-4 border-t border-[#1B3652] text-xs font-mono text-[#AABAC8] space-y-1">
                  <p>• 84% lower drop-off rate</p>
                  <p>• Zero front-desk bottleneck</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#1B3652]">
                <Link
                  href="/industries/dental"
                  className="text-xs font-mono uppercase tracking-wider text-[#FF6B2C] hover:text-[#F5F8FC] inline-flex items-center gap-1 font-bold"
                >
                  <span>[+] View Blueprint</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 2. Real Estate */}
            <div className="bg-[#0C2233] p-7 flex flex-col justify-between hover:bg-[#10293B] transition-colors relative group">
              <div className="absolute top-2 right-2 font-mono text-[10px] text-[#27D3C2] opacity-40 select-none">+</div>
              <div>
                <span className="text-[10px] font-mono text-[#27D3C2] uppercase tracking-[0.18em] block mb-3 font-bold">
                  02 // REAL ESTATE
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2 tracking-tight">
                  Developers &amp; Brokerages
                </h3>
                <p className="text-xs font-mono text-[#27D3C2] mb-3">
                  VIP BUYER ROUTING
                </p>
                <p className="text-xs text-[#AABAC8] leading-relaxed font-light">
                  Filter incoming portal and ad leads by verified budget and timeline. Dispatch brochures instantly via WhatsApp and book site visits directly into advisor calendars.
                </p>
                <div className="mt-5 pt-4 border-t border-[#1B3652] text-xs font-mono text-[#AABAC8] space-y-1">
                  <p>• Sub-60s buyer triage</p>
                  <p>• Automated brochure delivery</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#1B3652]">
                <Link
                  href="/industries/real-estate"
                  className="text-xs font-mono uppercase tracking-wider text-[#27D3C2] hover:text-[#F5F8FC] inline-flex items-center gap-1 font-bold"
                >
                  <span>[+] View Blueprint</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 3. Manufacturing */}
            <div className="bg-[#0C2233] p-7 flex flex-col justify-between hover:bg-[#10293B] transition-colors relative group">
              <div className="absolute top-2 right-2 font-mono text-[10px] text-amber-400 opacity-40 select-none">+</div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.18em] block mb-3 font-bold">
                  03 // MANUFACTURING
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2 tracking-tight">
                  Industrial Plants &amp; Fabrication
                </h3>
                <p className="text-xs font-mono text-amber-400 mb-3">
                  PO &amp; LOGISTICS AUTOMATION
                </p>
                <p className="text-xs text-[#AABAC8] leading-relaxed font-light">
                  Parse raw vendor purchase order PDFs, match warehouse inventory availability, and trigger automated consignment dispatch notes and tracking to buyers.
                </p>
                <div className="mt-5 pt-4 border-t border-[#1B3652] text-xs font-mono text-[#AABAC8] space-y-1">
                  <p>• Zero PO data-entry delay</p>
                  <p>• Automated dispatch slips</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#1B3652]">
                <Link
                  href="/industries/manufacturing"
                  className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-[#F5F8FC] inline-flex items-center gap-1 font-bold"
                >
                  <span>[+] View Blueprint</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 4. E-Commerce */}
            <div className="bg-[#0C2233] p-7 flex flex-col justify-between hover:bg-[#10293B] transition-colors relative group">
              <div className="absolute top-2 right-2 font-mono text-[10px] text-emerald-400 opacity-40 select-none">+</div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.18em] block mb-3 font-bold">
                  04 // E-COMMERCE
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2 tracking-tight">
                  DTC Brands &amp; Retail Systems
                </h3>
                <p className="text-xs font-mono text-emerald-400 mb-3">
                  POST-PURCHASE LOGISTICS
                </p>
                <p className="text-xs text-[#AABAC8] leading-relaxed font-light">
                  Resolve tracking requests, validate return eligibility against store policies, and generate courier reverse pickup slips automatically without staff intervention.
                </p>
                <div className="mt-5 pt-4 border-t border-[#1B3652] text-xs font-mono text-[#AABAC8] space-y-1">
                  <p>• 65% support deflection</p>
                  <p>• Instant return labels</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#1B3652]">
                <Link
                  href="/industries/ecommerce"
                  className="text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-[#F5F8FC] inline-flex items-center gap-1 font-bold"
                >
                  <span>[+] View Blueprint</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: 5-STAGE DELIVERY METHODOLOGY TIMELINE
          Discovery → Solution Design → Implementation → Testing → Launch and Improvement
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#1B3652]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF6B2C]">PROCESS // 01—05</span>
              <span className="h-px w-8 bg-[#1B3652]" />
              <span className="font-mono text-[11px] text-[#AABAC8] uppercase tracking-wider">DELIVERY LIFECYCLE</span>
            </div>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC]">
              Our 5-Stage Delivery Process
            </h2>
            <p className="mt-4 text-base text-[#AABAC8] max-w-2xl font-light">
              Discovery → Solution Design → Implementation → Testing → Launch and Improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-[#1B3652] divide-y md:divide-y-0 md:divide-x divide-[#1B3652]">
            {/* Stage 1 */}
            <div className="bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF6B2C] block">STAGE // 01</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2 tracking-tight">Discovery</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed font-light">
                  In-depth audit of customer touchpoints, manual bottlenecks, current tech stack, and points of revenue leakage.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#AABAC8]/60 mt-6 block uppercase tracking-wider">Days 1–3</span>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#27D3C2] block">STAGE // 02</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2 tracking-tight">Solution Design</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed font-light">
                  Architectural schema definition, data validation rules, database models, and clear human exception boundaries.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#AABAC8]/60 mt-6 block uppercase tracking-wider">Days 4–6</span>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 block">STAGE // 03</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2 tracking-tight">Implementation</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed font-light">
                  Bespoke software build with Next.js 16, Supabase PostgreSQL, WhatsApp Cloud API, and secure webhooks.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#AABAC8]/60 mt-6 block uppercase tracking-wider">Days 7–12</span>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 block">STAGE // 04</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2 tracking-tight">Testing</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed font-light">
                  Rigorous sandbox drills, failure state simulations, retry queue stress tests, and automated error containment.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#AABAC8]/60 mt-6 block uppercase tracking-wider">Days 13–15</span>
            </div>

            {/* Stage 5 */}
            <div className="bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF6B2C] block">STAGE // 05</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2 tracking-tight">Launch &amp; Improvement</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed font-light">
                  Production deployment, live telemetry alerts, audit trail logging, and continuous performance refinement.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#AABAC8]/60 mt-6 block uppercase tracking-wider">Continuous</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: VERIFIED PROOF & CODE OWNERSHIP
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#1B3652]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF6B2C]">ETHICS // TRUTH</span>
              <span className="h-px w-8 bg-[#1B3652]" />
              <span className="font-mono text-[11px] text-[#AABAC8] uppercase tracking-wider">DELIVERY PRINCIPLES</span>
            </div>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC]">
              Real Deliverables. Zero Fabricated Claims.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1B3652] divide-y md:divide-y-0 md:divide-x divide-[#1B3652]">
            <div className="bg-[#0C2233] p-8">
              <span className="text-[10px] font-mono text-[#AABAC8] uppercase tracking-[0.18em] block mb-3 font-semibold">
                01 // ESTABLISHED JUNE 2019
              </span>
              <h3 className="text-xl font-bold text-[#F5F8FC] mb-2 tracking-tight">Hyderabad Digital Roots</h3>
              <p className="text-sm text-[#AABAC8] leading-relaxed font-light">
                Incorporated in June 2019, Dodail Solutions Private Limited has engineered custom software, search visibility, and workflow automations for growing businesses across India and overseas.
              </p>
            </div>

            <div className="bg-[#0C2233] p-8">
              <span className="text-[10px] font-mono text-[#AABAC8] uppercase tracking-[0.18em] block mb-3 font-semibold">
                02 // COMPLETE CODE CONTROL
              </span>
              <h3 className="text-xl font-bold text-[#F5F8FC] mb-2 tracking-tight">Full Client IP Ownership</h3>
              <p className="text-sm text-[#AABAC8] leading-relaxed font-light">
                You retain complete ownership of your application source code, database schemas, and workflows. No proprietary lock-ins or arbitrary per-record subscription taxes.
              </p>
            </div>

            <div className="bg-[#0C2233] p-8">
              <span className="text-[10px] font-mono text-[#AABAC8] uppercase tracking-[0.18em] block mb-3 font-semibold">
                03 // DATA ETHICS &amp; GOVERNANCE
              </span>
              <h3 className="text-xl font-bold text-[#F5F8FC] mb-2 tracking-tight">Strict Governance &amp; Security</h3>
              <p className="text-sm text-[#AABAC8] leading-relaxed font-light">
                Data is encrypted in transit and at rest with strict PostgreSQL Row-Level Security. Your private business communications are never used to train public LLM models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FAQ (SWISS TYPOGRAPHIC INDEX LEDGER)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#1B3652]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF6B2C]">INDEX // FAQS</span>
              <span className="h-px w-8 bg-[#1B3652]" />
              <span className="font-mono text-[11px] text-[#AABAC8] uppercase tracking-wider">SPECIFICATIONS</span>
            </div>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC]">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FINAL HIGH-CONVERSION CTA (SWISS RECTANGULAR BLOCK)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl border border-[#1B3652] bg-[#0C2233] p-8 sm:p-14 lg:p-16 relative">
          {/* Registration Crosshairs */}
          <div className="absolute top-2 left-2 font-mono text-[10px] text-[#FF6B2C] select-none pointer-events-none">+</div>
          <div className="absolute top-2 right-2 font-mono text-[10px] text-[#27D3C2] select-none pointer-events-none">+</div>
          <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#27D3C2] select-none pointer-events-none">+</div>
          <div className="absolute bottom-2 right-2 font-mono text-[10px] text-[#FF6B2C] select-none pointer-events-none">+</div>

          <div className="max-w-3xl">
            <span className="text-[11px] font-mono text-[#FF6B2C] uppercase tracking-[0.2em] font-bold block mb-4">
              [+] CONFIDENTIAL FEASIBILITY AUDIT
            </span>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] leading-tight">
              Ready to eliminate repetitive manual friction from your business?
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#AABAC8] font-light leading-relaxed">
              Schedule a 30-minute feasibility session with a Dodail solutions engineer. We will review your current manual touchpoints, assess technical feasibility, and present an actionable architectural blueprint.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="/consultation"
                variant="primary"
                size="lg"
                className="text-xs px-8 py-4 font-mono font-bold uppercase tracking-wider shadow-none"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book a Consultation
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="text-xs px-8 py-4 font-mono uppercase tracking-wider border-[#1B3652]"
              >
                Send Direct Message
              </Button>
            </div>

            <div className="mt-14 pt-8 border-t border-[#1B3652] flex flex-wrap items-center gap-6 text-xs text-[#AABAC8] font-mono">
              <span className="text-[#F5F8FC] font-bold">Dodail Solutions Private Limited</span>
              <span>•</span>
              <span>Hyderabad, Telangana, India</span>
              <span>•</span>
              <a href="tel:+919966400235" className="text-[#AABAC8] hover:text-[#F5F8FC] transition-colors">
                +91 99664 00235
              </a>
              <span>•</span>
              <a href="mailto:info@dodail.com" className="text-[#AABAC8] hover:text-[#F5F8FC] transition-colors">
                info@dodail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
