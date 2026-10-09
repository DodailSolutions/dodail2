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
    <div className="flex flex-col gap-28 sm:gap-36 py-8 sm:py-16 overflow-hidden bg-[#071A28] text-[#F5F8FC]">
      {/* =========================================================================
          SECTION 1 & 2: EDITORIAL HERO SECTION WITH INTERACTIVE MOTION & 3D VIEWPORT
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 min-h-[85vh] flex flex-col justify-center">
        {/* Interactive Geometric Network Canvas (Pinterest Inspo 2) */}
        <NetworkCanvas />

        <div className="relative z-10 mx-auto max-w-6xl w-full">
          {/* Top Editorial Monospace Tag */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#AABAC8] mb-8 border-b border-[#1B3652] pb-4">
            <span className="text-[#FF6B2C] font-semibold tracking-wider uppercase">
              Dodail Solutions Private Limited
            </span>
            <span className="text-[#1B3652]">/</span>
            <span>Hyderabad, India · Est. June 2019</span>
            <span className="text-[#1B3652]">/</span>
            <span>Autonomous Systems & Bespoke Software</span>
          </div>

          {/* Exact Required Master Headline */}
          <h1 className="hero-title-clamp font-extrabold tracking-tight text-[#F5F8FC] leading-[1.02]">
            Turn Repetitive Operations Into{" "}
            <span className="text-[#FF6B2C]">Autonomous Growth</span>
          </h1>

          {/* Exact Required Master Subcopy */}
          <p className="mt-8 max-w-3xl body-text-clamp text-[#AABAC8] font-light leading-relaxed">
            Dodail helps growing businesses automate repetitive work, connect business systems, and build digital solutions that drive measurable progress.
          </p>

          {/* Direct Conversion Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              href="/consultation"
              variant="primary"
              size="lg"
              className="text-base px-8 py-4 font-semibold shadow-xl shadow-[#FF6B2C]/20 bg-[#FF6B2C] text-[#071A28] hover:bg-[#FF6B2C]/90"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book a Consultation
            </Button>
            <Button
              href="/solutions/ai-automation"
              variant="secondary"
              size="lg"
              className="text-base px-8 py-4 font-semibold border-[#1B3652] bg-[#10293B] hover:bg-[#1B3652] text-[#F5F8FC]"
            >
              Explore Solutions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Key Deliverable Anchors */}
          <div className="mt-16 pt-8 border-t border-[#1B3652] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <span className="text-[11px] font-mono text-[#AABAC8] uppercase tracking-wider block">
                01 / Track Record
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FC] mt-1">5+ Years</p>
              <p className="text-xs text-[#AABAC8] mt-1">Software & Growth Delivery</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#AABAC8] uppercase tracking-wider block">
                02 / Response Speed
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FC] mt-1">&lt; 60s</p>
              <p className="text-xs text-[#AABAC8] mt-1">Lead Qualification & Triage</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#AABAC8] uppercase tracking-wider block">
                03 / Code Ownership
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FC] mt-1">100%</p>
              <p className="text-xs text-[#AABAC8] mt-1">Full Client IP & DB Control</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#AABAC8] uppercase tracking-wider block">
                04 / Commercial Base
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FC] mt-1">Hyderabad</p>
              <p className="text-xs text-[#AABAC8] mt-1">India & Global Deployments</p>
            </div>
          </div>

          {/* 3D Perspective Scroll Showcase (Pinterest Inspo 1 & 6) */}
          <HeroScrollShowcase />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ARCHITECTURAL FOUNDATION STRIP
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 border-y border-[#1B3652] bg-[#0C2233] py-8">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-sm font-semibold text-[#F5F8FC]">
              Enterprise Open Architecture · Zero Proprietary Lock-In
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#AABAC8]">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#FF6B2C]" /> Next.js 16 Native
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#FF6B2C]" /> Supabase PostgreSQL
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#FF6B2C]" /> WhatsApp Cloud API
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#FF6B2C]" /> Deterministic Schemas
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
            <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider block mb-2">
              The Operational Cost of Manual Friction
            </span>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] tracking-tight max-w-3xl">
              Where Growing Companies Silently Bleed Revenue Every Day
            </h2>
          </div>

          <div className="divide-y divide-[#1B3652] border-y border-[#1B3652]">
            {/* Leak 01 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 font-mono text-xs text-[#AABAC8]">
                01 / INGESTION LATENCY
              </div>
              <div className="md:col-span-5">
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  Inquiries wait hours for manual staff review
                </h3>
                <p className="text-sm text-[#AABAC8] leading-relaxed">
                  Web forms, WhatsApp messages, and paid ad leads sit idle during off-hours. In competitive categories, 80% of buyers select the first vendor who provides an intelligent response within 15 minutes.
                </p>
              </div>
              <div className="md:col-span-4 rounded-2xl bg-[#0C2233] border border-[#1B3652] p-5 text-xs font-mono text-[#F5F8FC]">
                <span className="text-[#27D3C2] font-bold block mb-1">Dodail Solution:</span>
                Sub-60s automated qualification, schedule coordination, and instant CRM sync.
              </div>
            </div>

            {/* Leak 02 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 font-mono text-xs text-[#AABAC8]">
                02 / REP BANDWIDTH
              </div>
              <div className="md:col-span-5">
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  High-cost sales specialists burn time on unqualified leads
                </h3>
                <p className="text-sm text-[#AABAC8] leading-relaxed">
                  Your best closers waste 60% of their workday answering repetitive basic pricing queries or fielding leads with mismatched budgets, leaving scarce bandwidth for serious buyers.
                </p>
              </div>
              <div className="md:col-span-4 rounded-2xl bg-[#0C2233] border border-[#1B3652] p-5 text-xs font-mono text-[#F5F8FC]">
                <span className="text-[#27D3C2] font-bold block mb-1">Dodail Solution:</span>
                Pre-qualification workflows that filter budget, timeline, and requirements before calendar booking.
              </div>
            </div>

            {/* Leak 03 */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 font-mono text-xs text-[#AABAC8]">
                03 / FRAGMENTATION
              </div>
              <div className="md:col-span-5">
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  Business data is trapped across isolated chats and loose spreadsheets
                </h3>
                <p className="text-sm text-[#AABAC8] leading-relaxed">
                  Customer agreements, order updates, and payment states are scattered with no single source of truth. When an employee leaves, institutional context vanishes with them.
                </p>
              </div>
              <div className="md:col-span-4 rounded-2xl bg-[#0C2233] border border-[#1B3652] p-5 text-xs font-mono text-[#F5F8FC]">
                <span className="text-[#27D3C2] font-bold block mb-1">Dodail Solution:</span>
                Unified PostgreSQL database layer connecting WhatsApp, payment gateways, and CRM in real time.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 5 CORE OFFERINGS (PINNED SERVICES SCROLL STACK)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ServicesScrollStack />
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INTERACTIVE WORKBENCH SHOWCASE
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider block mb-2">
              System Architecture in Action
            </span>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] tracking-tight">
              Test the Dodail Operational Workflow
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#AABAC8] max-w-2xl">
              Inspect how inbound triggers are received, evaluated via deterministic rules, and dispatched to destination databases in under 400 milliseconds.
            </p>
          </div>
          <WorkflowSimulator />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: INDUSTRY VERTICALS (HEALTHCARE, REAL ESTATE, MANUFACTURING, E-COMMERCE)
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider block mb-2">
              Industry Blueprints
            </span>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] tracking-tight">
              Calibrated For High-Growth Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Healthcare */}
            <div className="rounded-3xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between hover:border-[#27D3C2]/40 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider block mb-3">
                  01 / Healthcare
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  Dental Clinics & Medical Centers
                </h3>
                <p className="text-xs font-mono text-[#FF6B2C] mb-3">
                  Emergency Triage & No-Show Eradication
                </p>
                <p className="text-xs text-[#AABAC8] leading-relaxed">
                  Automate patient triage based on pain severity, schedule doctor appointments via WhatsApp, and deliver pre-consultation intake forms automatically.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652] text-xs font-mono text-[#AABAC8] space-y-1">
                  <p>• 84% lower patient drop-off</p>
                  <p>• Zero reception bottleneck</p>
                </div>
              </div>
              <div className="mt-6 pt-3">
                <Link
                  href="/industries/dental"
                  className="text-xs font-semibold text-[#F5F8FC] hover:text-[#FF6B2C] inline-flex items-center gap-1"
                >
                  <span>Clinic Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. Real Estate */}
            <div className="rounded-3xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between hover:border-[#27D3C2]/40 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider block mb-3">
                  02 / Real Estate
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  Real Estate Developers & Brokerages
                </h3>
                <p className="text-xs font-mono text-[#27D3C2] mb-3">
                  Instant High-Ticket Buyer Routing
                </p>
                <p className="text-xs text-[#AABAC8] leading-relaxed">
                  Filter incoming portal and ad leads by verified budget and timeline. Dispatch brochures instantly via WhatsApp and book site visits directly into advisor calendars.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652] text-xs font-mono text-[#AABAC8] space-y-1">
                  <p>• Sub-60s VIP buyer engagement</p>
                  <p>• Automated brochure dispatch</p>
                </div>
              </div>
              <div className="mt-6 pt-3">
                <Link
                  href="/industries/real-estate"
                  className="text-xs font-semibold text-[#F5F8FC] hover:text-[#27D3C2] inline-flex items-center gap-1"
                >
                  <span>Real Estate Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. Manufacturing */}
            <div className="rounded-3xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between hover:border-[#27D3C2]/40 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider block mb-3">
                  03 / Manufacturing
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  Industrial Plants & Fabrication Hubs
                </h3>
                <p className="text-xs font-mono text-amber-400 mb-3">
                  Vendor Quotation & Dispatch Automation
                </p>
                <p className="text-xs text-[#AABAC8] leading-relaxed">
                  Parse raw vendor purchase order PDFs, match warehouse inventory availability, and trigger automated consignment dispatch notes and tracking to buyers.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652] text-xs font-mono text-[#AABAC8] space-y-1">
                  <p>• Zero PO data-entry delay</p>
                  <p>• Automated dispatch slips</p>
                </div>
              </div>
              <div className="mt-6 pt-3">
                <Link
                  href="/industries/manufacturing"
                  className="text-xs font-semibold text-[#F5F8FC] hover:text-amber-400 inline-flex items-center gap-1"
                >
                  <span>Manufacturing Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 4. E-Commerce */}
            <div className="rounded-3xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between hover:border-[#27D3C2]/40 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider block mb-3">
                  04 / E-Commerce
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  DTC Brands & High-Volume Commerce
                </h3>
                <p className="text-xs font-mono text-emerald-400 mb-3">
                  Order Inquiries & Return Logistics
                </p>
                <p className="text-xs text-[#AABAC8] leading-relaxed">
                  Resolve tracking requests, validate return eligibility against store policies, and generate courier reverse pickup slips automatically without staff intervention.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1B3652] text-xs font-mono text-[#AABAC8] space-y-1">
                  <p>• 65% support ticket deflection</p>
                  <p>• Instant reverse shipping slips</p>
                </div>
              </div>
              <div className="mt-6 pt-3">
                <Link
                  href="/industries/ecommerce"
                  className="text-xs font-semibold text-[#F5F8FC] hover:text-emerald-400 inline-flex items-center gap-1"
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
          SECTION 8: 5-STAGE DELIVERY METHODOLOGY TIMELINE
          Discovery → Solution Design → Implementation → Testing → Launch and Improvement
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider block mb-2">
              Engineering Lifecycle
            </span>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] tracking-tight">
              Our 5-Stage Delivery Process
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#AABAC8] max-w-2xl">
              Discovery → Solution Design → Implementation → Testing → Launch and Improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Stage 1 */}
            <div className="rounded-2xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF6B2C]">STAGE 01</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2">Discovery</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed">
                  In-depth audit of customer touchpoints, manual bottlenecks, current tech stack, and points of revenue leakage.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#AABAC8]/60 mt-4 block">Days 1–3</span>
            </div>

            {/* Stage 2 */}
            <div className="rounded-2xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#27D3C2]">STAGE 02</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2">Solution Design</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed">
                  Architectural schema definition, data validation rules, database models, and clear human exception boundaries.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#AABAC8]/60 mt-4 block">Days 4–6</span>
            </div>

            {/* Stage 3 */}
            <div className="rounded-2xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">STAGE 03</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2">Implementation</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed">
                  Bespoke software build with Next.js 16, Supabase PostgreSQL, WhatsApp Cloud API, and secure webhooks.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#AABAC8]/60 mt-4 block">Days 7–12</span>
            </div>

            {/* Stage 4 */}
            <div className="rounded-2xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400">STAGE 04</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2">Testing</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed">
                  Rigorous sandbox drills, failure state simulations, retry queue stress tests, and automated error containment.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#AABAC8]/60 mt-4 block">Days 13–15</span>
            </div>

            {/* Stage 5 */}
            <div className="rounded-2xl border border-[#1B3652] bg-[#0C2233] p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF6B2C]">STAGE 05</span>
                <h3 className="text-base font-bold text-[#F5F8FC] mt-2">Launch &amp; Improvement</h3>
                <p className="mt-2 text-xs text-[#AABAC8] leading-relaxed">
                  Production deployment, live telemetry alerts, audit trail logging, and continuous performance refinement.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#AABAC8]/60 mt-4 block">Continuous</span>
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
            <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider block mb-2">
              Engineering Principles
            </span>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] tracking-tight">
              Real Deliverables. Zero Fabricated Claims.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-[#1B3652] bg-[#0C2233] p-8">
              <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider block mb-3">
                01 / Established 2019
              </span>
              <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">Hyderabad Digital Roots</h3>
              <p className="text-sm text-[#AABAC8] leading-relaxed">
                Incorporated in June 2019, Dodail Solutions Private Limited has engineered custom software, search visibility, and workflow automations for growing businesses across India and overseas.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1B3652] bg-[#0C2233] p-8">
              <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider block mb-3">
                02 / Complete Freedom
              </span>
              <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">Full Client Code Ownership</h3>
              <p className="text-sm text-[#AABAC8] leading-relaxed">
                You retain complete ownership of your application source code, database schemas, and workflows. No proprietary lock-ins or arbitrary per-record subscription taxes.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1B3652] bg-[#0C2233] p-8">
              <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider block mb-3">
                03 / Data Ethics
              </span>
              <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">Strict Governance &amp; Security</h3>
              <p className="text-sm text-[#AABAC8] leading-relaxed">
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
            <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider block mb-2">
              Clarity &amp; Specifications
            </span>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] tracking-tight">
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
        <div className="mx-auto max-w-6xl rounded-3xl border border-[#1B3652] bg-[#0C2233] p-8 sm:p-14 lg:p-16">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider font-semibold block mb-3">
              Confidential Feasibility Audit
            </span>
            <h2 className="section-title-clamp font-extrabold text-[#F5F8FC] tracking-tight leading-tight">
              Ready to eliminate repetitive manual friction from your business?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#AABAC8] font-light leading-relaxed">
              Schedule a 30-minute feasibility session with a Dodail solutions engineer. We will review your current manual touchpoints, assess technical feasibility, and present an actionable architectural blueprint.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="/consultation"
                variant="primary"
                size="lg"
                className="text-base px-8 py-4 font-semibold shadow-xl shadow-[#FF6B2C]/20 bg-[#FF6B2C] text-[#071A28] hover:bg-[#FF6B2C]/90"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book a Consultation
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="text-base px-8 py-4 font-semibold border-[#1B3652] bg-[#10293B] hover:bg-[#1B3652] text-[#F5F8FC]"
              >
                Send Direct Message
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-[#1B3652] flex flex-wrap items-center gap-6 text-xs text-[#AABAC8] font-mono">
              <span className="text-[#F5F8FC] font-semibold">Dodail Solutions Private Limited</span>
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
