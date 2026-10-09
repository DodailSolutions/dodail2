import Link from "next/link";
import {
  ArrowRight,
  Check,
  Calendar,
  Stethoscope,
  Building2,
  ShoppingBag,
  Factory,
  Sparkles,
  Zap,
  Shield,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WorkflowSimulator } from "@/components/home/WorkflowSimulator";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { NetworkCanvas } from "@/components/motion/NetworkCanvas";
import { HeroScrollShowcase } from "@/components/motion/HeroScrollShowcase";
import { ServicesScrollStack } from "@/components/motion/ServicesScrollStack";

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden bg-[#071A28] text-[#F5F8FC]">
      {/* =====================================================================
          HERO — Immersive split layout with particle canvas + bold typography
          ===================================================================== */}
      <section className="relative min-h-[90vh] flex items-center px-6 sm:px-8 lg:px-12 pt-24 pb-24 lg:pb-32">
        <NetworkCanvas />

        <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#1B3652] bg-[#0C2233]/60 mb-8">
              <span className="h-2 w-2 bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider">
                AI Automation Studio · Hyderabad
              </span>
            </div>

            <h1 className="hero-title-clamp font-extrabold text-[#F5F8FC] leading-[0.95] tracking-[-0.03em]">
              Turn Repetitive Operations Into{" "}
              <span className="text-[#FF6B2C]">Autonomous Growth</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg sm:text-xl text-[#AABAC8] font-light leading-relaxed">
              Dodail helps growing businesses automate repetitive work, connect
              business systems, and build digital solutions that drive measurable
              progress.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                href="/consultation"
                variant="primary"
                size="lg"
                className="text-sm px-8 py-4 font-semibold uppercase tracking-wider shadow-none"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book a Consultation
              </Button>
              <Button
                href="/solutions/ai-automation"
                variant="outline"
                size="lg"
                className="text-sm px-8 py-4 uppercase tracking-wider border-[#1B3652]"
              >
                Explore Solutions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right — Stats grid */}
          <div className="hidden lg:grid grid-cols-2 gap-px bg-[#1B3652]">
            {[
              { label: "Years Delivering", value: "5+", detail: "Software & Workflow Systems" },
              { label: "Lead Response", value: "< 60s", detail: "Qualification & Routing" },
              { label: "Code Ownership", value: "100%", detail: "Client IP & Database Control" },
              { label: "Headquarters", value: "HYD", detail: "India · Global Deployments" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0C2233] p-8 flex flex-col">
                <span className="text-xs font-mono text-[#AABAC8] uppercase tracking-wider mb-3">
                  {stat.label}
                </span>
                <span className="text-4xl font-extrabold text-[#F5F8FC] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-[#AABAC8] mt-2 font-light">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile stats — visible only on smaller screens */}
      <section className="lg:hidden px-6 sm:px-8 pb-16">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-px bg-[#1B3652]">
          {[
            { label: "Years Delivering", value: "5+" },
            { label: "Lead Response", value: "< 60s" },
            { label: "Code Ownership", value: "100%" },
            { label: "Headquarters", value: "HYD" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0C2233] p-6 flex flex-col">
              <span className="text-[10px] font-mono text-[#AABAC8] uppercase tracking-wider mb-2">
                {stat.label}
              </span>
              <span className="text-2xl font-extrabold text-[#F5F8FC] tracking-tight">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SCROLL SHOWCASE — 3D perspective terminal
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 pb-32">
        <div className="mx-auto max-w-6xl">
          <HeroScrollShowcase />
        </div>
      </section>

      {/* =====================================================================
          PROBLEMS — Editorial asymmetric layout, NOT a grid of boxes
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 bg-[#0A1E2E]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-20">
            <span className="text-sm font-semibold text-[#FF6B2C] uppercase tracking-wider">
              The Problem
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F8FC] tracking-[-0.03em] leading-[1.05]">
              Where Growing Companies Silently Bleed Revenue
            </h2>
            <p className="mt-6 text-lg text-[#AABAC8] font-light leading-relaxed max-w-2xl">
              Manual processes don&apos;t just slow you down — they compound
              into missed deals, lost data, and burned-out teams.
            </p>
          </div>

          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "Inquiries wait hours for manual review",
                desc: "Web forms, WhatsApp messages, and paid ad leads sit idle during off-hours. 80% of buyers select the first vendor who responds within 15 minutes.",
                solution: "Sub-60s automated qualification, schedule coordination, and instant CRM sync.",
                accent: "#FF6B2C",
              },
              {
                num: "02",
                title: "Sales specialists burn time on unqualified leads",
                desc: "Your best closers waste 60% of their workday answering repetitive pricing queries, leaving scarce bandwidth for serious buyers.",
                solution: "Pre-qualification workflows that filter budget, timeline, and requirements before calendar booking.",
                accent: "#27D3C2",
              },
              {
                num: "03",
                title: "Data is trapped across isolated chats and spreadsheets",
                desc: "Customer agreements, order updates, and payment states are scattered with no single source of truth. When an employee leaves, context vanishes.",
                solution: "Unified database layer connecting WhatsApp, payment gateways, and CRM in real time.",
                accent: "#FF6B2C",
              },
            ].map((item, i) => (
              <div
                key={item.num}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 ${
                  i < 2 ? "border-b border-[#1B3652]/50" : ""
                }`}
              >
                <div className="lg:col-span-1">
                  <span
                    className="text-6xl font-black tracking-tighter"
                    style={{ color: `${item.accent}15` }}
                  >
                    {item.num}
                  </span>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="text-2xl font-bold text-[#F5F8FC] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base text-[#AABAC8] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="h-full flex items-start">
                    <div className="border-l-2 pl-6" style={{ borderColor: item.accent }}>
                      <span
                        className="text-xs font-semibold uppercase tracking-wider block mb-2"
                        style={{ color: item.accent }}
                      >
                        Dodail Solution
                      </span>
                      <p className="text-sm text-[#F5F8FC]/80 leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SERVICES — Scroll stack with sticky sidebar
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <ServicesScrollStack />
        </div>
      </section>

      {/* =====================================================================
          WORKFLOW DEMO — Interactive showcase
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 bg-[#0A1E2E]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-12">
            <div className="lg:col-span-3">
              <span className="text-sm font-semibold text-[#FF6B2C] uppercase tracking-wider">
                Live Demo
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#F5F8FC] tracking-[-0.03em] leading-[1.05]">
                Watch Our Workflow Engine Process a Real Trigger
              </h2>
            </div>
            <div className="lg:col-span-2 flex items-end">
              <p className="text-base text-[#AABAC8] font-light leading-relaxed">
                See how inbound triggers are received, evaluated via
                deterministic rules, and dispatched to destination databases in
                under 400 milliseconds.
              </p>
            </div>
          </div>
          <WorkflowSimulator />
        </div>
      </section>

      {/* =====================================================================
          INDUSTRIES — Large visual cards, NOT a 4-column matrix
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sm font-semibold text-[#27D3C2] uppercase tracking-wider">
              Industry Solutions
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#F5F8FC] tracking-[-0.03em] leading-[1.05]">
              Calibrated For High-Growth Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Stethoscope,
                sector: "Healthcare",
                title: "Dental Clinics & Medical Centers",
                engine: "Emergency Triage Engine",
                desc: "Automate patient triage based on pain severity, schedule appointments via WhatsApp, and deliver pre-consultation intake forms automatically.",
                href: "/industries/dental",
                accent: "#FF6B2C",
              },
              {
                icon: Building2,
                sector: "Real Estate",
                title: "Developers & Brokerages",
                engine: "VIP Buyer Routing",
                desc: "Filter incoming leads by verified budget and timeline. Dispatch brochures instantly via WhatsApp and book site visits into advisor calendars.",
                href: "/industries/real-estate",
                accent: "#27D3C2",
              },
              {
                icon: Factory,
                sector: "Manufacturing",
                title: "Industrial Plants & Fabrication",
                engine: "PO & Logistics Automation",
                desc: "Parse vendor purchase order PDFs, match warehouse inventory, and trigger automated dispatch notes and tracking to buyers.",
                href: "/industries/manufacturing",
                accent: "#FBBF24",
              },
              {
                icon: ShoppingBag,
                sector: "E-Commerce",
                title: "DTC Brands & Retail Systems",
                engine: "Post-Purchase Logistics",
                desc: "Resolve tracking requests, validate return eligibility, and generate courier reverse pickup slips automatically.",
                href: "/industries/ecommerce",
                accent: "#34D399",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.sector}
                  href={item.href}
                  className="group block bg-[#0C2233] border border-[#1B3652] p-8 sm:p-10 hover:border-[#FF6B2C] transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-12 h-12 flex items-center justify-center border"
                      style={{ borderColor: item.accent }}
                    >
                      <Icon className="h-6 w-6" style={{ color: item.accent }} />
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#AABAC8] group-hover:text-[#FF6B2C] transition-colors" />
                  </div>

                  <span
                    className="text-xs font-semibold uppercase tracking-wider block mb-2"
                    style={{ color: item.accent }}
                  >
                    {item.sector}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F5F8FC] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p
                    className="text-sm font-medium mb-4"
                    style={{ color: item.accent }}
                  >
                    {item.engine}
                  </p>
                  <p className="text-sm text-[#AABAC8] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          PROCESS — Horizontal timeline with visual connectors
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 bg-[#0A1E2E]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-semibold text-[#FF6B2C] uppercase tracking-wider">
              How We Deliver
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#F5F8FC] tracking-[-0.03em] leading-[1.05]">
              From Discovery to Launch in 15 Days
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {[
              {
                stage: "01",
                title: "Discovery",
                desc: "Audit customer touchpoints, manual bottlenecks, current tech stack, and revenue leakage points.",
                days: "Days 1–3",
                color: "#FF6B2C",
              },
              {
                stage: "02",
                title: "Solution Design",
                desc: "Schema definition, data validation rules, database models, and human exception boundaries.",
                days: "Days 4–6",
                color: "#27D3C2",
              },
              {
                stage: "03",
                title: "Implementation",
                desc: "Bespoke build with Next.js, PostgreSQL, WhatsApp Cloud API, and secure webhooks.",
                days: "Days 7–12",
                color: "#34D399",
              },
              {
                stage: "04",
                title: "Testing",
                desc: "Sandbox drills, failure simulations, retry queue stress tests, and error containment.",
                days: "Days 13–15",
                color: "#A78BFA",
              },
              {
                stage: "05",
                title: "Launch & Improve",
                desc: "Production deployment, live telemetry, audit logging, and continuous refinement.",
                days: "Continuous",
                color: "#FF6B2C",
              },
            ].map((step, i) => (
              <li
                key={step.stage}
                className={`relative bg-[#0C2233] p-8 ${
                  i < 4 ? "border-b md:border-b-0 md:border-r border-[#1B3652]/50" : ""
                }`}
              >
                <span
                  className="text-5xl font-black block mb-6"
                  style={{ color: `${step.color}20` }}
                >
                  {step.stage}
                </span>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[#AABAC8] leading-relaxed font-light mb-6">
                  {step.desc}
                </p>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: step.color }}
                >
                  {step.days}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =====================================================================
          TRUST — Three pillars with icons, clean and spacious
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sm font-semibold text-[#FF6B2C] uppercase tracking-wider">
              Why Dodail
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#F5F8FC] tracking-[-0.03em] leading-[1.05]">
              Real Deliverables. Zero Fabricated Claims.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                icon: Eye,
                title: "Hyderabad Digital Roots",
                tag: "Est. June 2019",
                desc: "Dodail Solutions Private Limited has engineered custom software, search visibility, and workflow automations for growing businesses across India and overseas.",
              },
              {
                icon: Shield,
                title: "Full Client IP Ownership",
                tag: "Complete Code Control",
                desc: "You retain complete ownership of your application source code, database schemas, and workflows. No proprietary lock-ins or subscription taxes.",
              },
              {
                icon: Sparkles,
                title: "Strict Data Governance",
                tag: "Data Ethics & Security",
                desc: "Data encrypted in transit and at rest with PostgreSQL Row-Level Security. Your private business data is never used to train public LLM models.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}>
                  <div className="w-14 h-14 flex items-center justify-center border border-[#FF6B2C]/30 bg-[#FF6B2C]/5 mb-6">
                    <Icon className="h-7 w-7 text-[#FF6B2C]" />
                  </div>
                  <span className="text-xs font-semibold text-[#27D3C2] uppercase tracking-wider block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#F5F8FC] mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-base text-[#AABAC8] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ — Clean accordion
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 bg-[#0A1E2E]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#27D3C2] uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#F5F8FC] tracking-[-0.03em] leading-[1.05]">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* =====================================================================
          FINAL CTA — Bold, clean, high-conversion
          ===================================================================== */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#FF6B2C]/30 bg-[#FF6B2C]/5 mb-8">
            <Zap className="h-4 w-4 text-[#FF6B2C]" />
            <span className="text-xs font-semibold text-[#FF6B2C] uppercase tracking-wider">
              Free Feasibility Audit
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F8FC] tracking-[-0.03em] leading-[1.05]">
            Ready to eliminate manual friction from your business?
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-[#AABAC8] font-light leading-relaxed max-w-2xl mx-auto">
            Schedule a 30-minute feasibility session with a Dodail solutions
            engineer. We&apos;ll review your manual touchpoints and present an
            actionable architectural blueprint.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/consultation"
              variant="primary"
              size="lg"
              className="text-sm px-10 py-4 font-semibold uppercase tracking-wider shadow-none"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book a Consultation
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="text-sm px-10 py-4 uppercase tracking-wider border-[#1B3652]"
            >
              Send Direct Message
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-[#1B3652]/50 flex flex-wrap items-center justify-center gap-6 text-sm text-[#AABAC8]">
            <span className="text-[#F5F8FC] font-semibold">
              Dodail Solutions Private Limited
            </span>
            <span className="text-[#1B3652]">·</span>
            <span>Hyderabad, Telangana, India</span>
            <span className="text-[#1B3652]">·</span>
            <a
              href="tel:+919966400235"
              className="text-[#AABAC8] hover:text-[#FF6B2C] transition-colors underline underline-offset-2"
            >
              +91 99664 00235
            </a>
            <span className="text-[#1B3652]">·</span>
            <a
              href="mailto:info@dodail.com"
              className="text-[#AABAC8] hover:text-[#FF6B2C] transition-colors underline underline-offset-2"
            >
              info@dodail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
