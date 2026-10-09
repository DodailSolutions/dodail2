"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Shield,
  Eye,
  Zap,
  Stethoscope,
  Building2,
  Factory,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IndustryKey } from "@/components/3d/3DTypes";
import { FAQAccordion } from "@/components/home/FAQAccordion";

// Lazy-load dedicated 3D components without SSR for optimal LCP & WebGL performance
const AutonomousBrainCore = dynamic(
  () =>
    import("@/components/3d/AutonomousBrainCore").then(
      (mod) => mod.AutonomousBrainCore
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[540px] lg:h-[620px] flex items-center justify-center border border-slate-200 bg-slate-50/60">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="h-2 w-2 rounded-full bg-[#FF6B2C] animate-pulse" />
          <span>INITIALIZING 3D AUTONOMOUS CORE...</span>
        </div>
      </div>
    ),
  }
);

const ServicesCanvas3D = dynamic(
  () =>
    import("@/components/3d/ServicesCanvas3D").then(
      (mod) => mod.ServicesCanvas3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[440px] flex items-center justify-center bg-slate-50/60 border border-slate-200">
        <span className="text-xs font-mono text-slate-500">LOADING 3D FORMATION...</span>
      </div>
    ),
  }
);

const PipelineCanvas3D = dynamic(
  () =>
    import("@/components/3d/PipelineCanvas3D").then(
      (mod) => mod.PipelineCanvas3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[320px] sm:h-[380px] flex items-center justify-center bg-slate-50 border border-slate-200 mb-8 rounded-lg">
        <span className="text-xs font-mono text-slate-500">LOADING 3D PIPELINE...</span>
      </div>
    ),
  }
);

const IndustryCanvas3D = dynamic(
  () =>
    import("@/components/3d/IndustryCanvas3D").then(
      (mod) => mod.IndustryCanvas3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-slate-50/40">
        <span className="text-xs font-mono text-slate-500">LOADING 3D SECTOR CLUSTER...</span>
      </div>
    ),
  }
);

export function HomePageClient() {
  const [activeService, setActiveService] = useState(0);
  const [activePipelineStage, setActivePipelineStage] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState<IndustryKey>("dental");
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const services = [
    {
      id: "ai-automation",
      tag: "FORMATION 01 // AUTONOMOUS WORKFLOWS",
      title: "AI Automation & Autonomous Workflows",
      desc: "Connect business systems, eliminate manual data entry, and orchestrate deterministic multi-step workflows across WhatsApp, CRM, and cloud databases.",
      metric: "Sub-60s Response Time",
      deliverables: ["WhatsApp Cloud API integration", "Deterministic triage engines", "Bi-directional CRM & Sheet sync"],
      href: "/solutions/ai-automation",
      accent: "#FF6B2C",
    },
    {
      id: "custom-software",
      tag: "FORMATION 02 // BESPOKE PLATFORMS",
      title: "Custom Software & SaaS Development",
      desc: "Engineered web applications, internal operational dashboards, and client portals built with Next.js 16, PostgreSQL, and strict Row-Level Security.",
      metric: "100% Client IP Ownership",
      deliverables: ["Full-stack Next.js applications", "Enterprise database schema design", "Zero vendor lock-in architecture"],
      href: "/services/web-development",
      accent: "#27D3C2",
    },
    {
      id: "web-ecommerce",
      tag: "FORMATION 03 // DIGITAL COMMERCE",
      title: "Website & E-Commerce Systems",
      desc: "High-performance storefronts and custom e-commerce experiences engineered for speed, conversions, and automated inventory sync.",
      metric: "Sub-second LCP & Cart Speed",
      deliverables: ["Shopify & custom headless stores", "Post-purchase logistics automation", "Conversion-rate optimized UI"],
      href: "/industries/ecommerce",
      accent: "#FF6B2C",
    },
    {
      id: "digital-marketing",
      tag: "FORMATION 04 // MEASURABLE GROWTH",
      title: "Digital Marketing & Organic Growth",
      desc: "Data-driven organic search visibility, localized geographic expansion, and programmatic content engines that capture high-intent buyers.",
      metric: "High-Intent Qualified Traffic",
      deliverables: ["Technical SEO & structured data", "Local map pack domination", "Performance tracking & attribution"],
      href: "/services/digital-growth-seo",
      accent: "#27D3C2",
    },
    {
      id: "branding-uiux",
      tag: "FORMATION 05 // DESIGN SYSTEMS",
      title: "Branding & Enterprise UI/UX Design",
      desc: "Art-directed digital identities, design systems, and product interfaces that reflect engineering authority and convert visitors into partners.",
      metric: "Studio-Grade Precision",
      deliverables: ["Complete visual identity systems", "Component-driven design libraries", "WCAG 2.1 AA accessible interfaces"],
      href: "/work",
      accent: "#FF6B2C",
    },
  ];

  const pipelineStages = [
    {
      stage: 0,
      code: "01 // TRIGGER",
      title: "Inbound Customer Signal",
      desc: "A prospect sends a WhatsApp message, fills a contact form, or initiates a booking request.",
      details: "Raw payload is captured via encrypted webhook with HMAC signature verification in < 12ms.",
      color: "#FF6B2C",
    },
    {
      stage: 1,
      code: "02 // PROCESSING",
      title: "Intelligent Triage & Validation",
      desc: "System evaluates lead intent, verifies required fields against deterministic JSON schema bounds.",
      details: "No hallucinations: strict rules qualify budget and timeline. If ambiguity exists, triggers human handoff.",
      color: "#27D3C2",
    },
    {
      stage: 2,
      code: "03 // ACTION",
      title: "Automated Dispatch & Mutation",
      desc: "System reserves calendar slot, commits client record to PostgreSQL, and dispatches SMS/WhatsApp receipt.",
      details: "Atomic database transaction: CRM deals updated, team notified in Slack, client receives PDF intake link.",
      color: "#FF6B2C",
    },
    {
      stage: 3,
      code: "04 // OUTCOME",
      title: "Zero-Latency Business Growth",
      desc: "Prospect is engaged in under 60 seconds while interest is at its absolute peak.",
      details: "Lead-to-consultation conversion increases by up to 3x compared to manual 24-hour response queues.",
      color: "#27D3C2",
    },
  ];

  const industries = [
    {
      key: "dental" as IndustryKey,
      label: "Healthcare & Dental",
      icon: Stethoscope,
      headline: "Clinical Emergency Triage & Appointment Automation",
      desc: "Automate patient intake based on pain severity, schedule dentist slots via WhatsApp Cloud API, and send automated pre-procedure medical forms.",
      features: ["Sub-60s triage during off-hours", "Zero receptionist phone bottleneck", "Automated patient history intake"],
      href: "/industries/dental",
      accent: "#27D3C2",
    },
    {
      key: "real-estate" as IndustryKey,
      label: "Real Estate & Developers",
      icon: Building2,
      headline: "High-Value Buyer Routing & WhatsApp Brochures",
      desc: "Filter portal inquiries by verified down-payment budget and purchase timeline. Dispatch project PDF brochures instantly and sync site visits into advisor calendars.",
      features: ["Pre-qualify buyer budgets automatically", "Instant WhatsApp brochure dispatch", "Automated site visit scheduling"],
      href: "/industries/real-estate",
      accent: "#FF6B2C",
    },
    {
      key: "manufacturing" as IndustryKey,
      label: "Manufacturing & Industrial",
      icon: Factory,
      headline: "PO Parsing, Warehouse Stock & Logistics Dispatch",
      desc: "Parse raw vendor purchase order PDFs, match warehouse inventory availability, and trigger automated consignment dispatch notes and carrier tracking to buyers.",
      features: ["Zero manual PO entry delay", "Real-time ERP inventory verification", "Automated carrier tracking links"],
      href: "/industries/manufacturing",
      accent: "#FBBF24",
    },
    {
      key: "ecommerce" as IndustryKey,
      label: "E-Commerce & DTC",
      icon: ShoppingBag,
      headline: "Post-Purchase Operations & Return Logistics",
      desc: "Resolve courier tracking requests, validate return eligibility against store policy, and generate reverse courier pickup slips automatically without staff intervention.",
      features: ["Deflect repetitive WISMO queries", "Automated policy-checked return slips", "Instant inventory restock alerts"],
      href: "/industries/ecommerce",
      accent: "#34D399",
    },
  ];

  const processStages = [
    {
      num: "01",
      title: "Discovery",
      time: "Days 1–3",
      desc: "Comprehensive audit of your current operational touchpoints, manual bottlenecks, software stack, and points of revenue leakage.",
    },
    {
      num: "02",
      title: "Solution Design",
      time: "Days 4–6",
      desc: "Architectural schema definition, data validation rules, database modeling, and human-in-the-loop exception boundaries.",
    },
    {
      num: "03",
      title: "Implementation",
      time: "Days 7–12",
      desc: "Bespoke engineering with Next.js 16, Supabase PostgreSQL, WhatsApp Cloud API, and secure webhooks with audit logging.",
    },
    {
      num: "04",
      title: "Testing & Hardening",
      time: "Days 13–15",
      desc: "Sandbox stress drills, failure state simulations, retry queue tests, and automated error containment.",
    },
    {
      num: "05",
      title: "Launch & Improvement",
      time: "Continuous",
      desc: "Production cutover, live telemetry alerts, audit logging, and continuous performance refinement.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FAFBFD] text-[#0F172A]">
      {/* =========================================================================
          SECTION 1: HERO
          Editorial Split: Left = Bold Typography & Action, Right = 3D Brain Core
          ========================================================================= */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-12 pt-28 pb-20 border-b border-slate-200/80 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-6 z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-slate-200 bg-white/90 shadow-sm backdrop-blur-md mb-8 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-600 uppercase tracking-wider font-medium">
                Dodail Solutions Private Limited · Hyderabad [17.3850° N]
              </span>
            </div>

            <h1 className="hero-title-clamp font-extrabold text-slate-950 leading-[0.96] tracking-[-0.035em]">
              Turn Repetitive Operations Into{" "}
              <span className="text-[#FF6B2C]">Autonomous Growth</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
              Dodail helps growing businesses automate repetitive work, connect
              business systems, and build digital solutions that drive measurable
              progress.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="/consultation"
                variant="primary"
                size="lg"
                className="text-sm px-8 py-4 font-semibold uppercase tracking-wider shadow-lg shadow-orange-500/20"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book a Consultation
              </Button>
              <Button
                href="/solutions/ai-automation"
                variant="outline"
                size="lg"
                className="text-sm px-8 py-4 uppercase tracking-wider border-slate-300 text-slate-800 bg-white/90 hover:bg-slate-100 shadow-sm"
              >
                Explore Solutions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Telemetry metadata tags */}
            <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-600">
              <div>
                <span className="block text-[#FF6B2C] font-bold text-sm">EST. 2019</span>
                <span className="text-[11px] text-slate-500">5+ Years Active</span>
              </div>
              <div>
                <span className="block text-[#0D9488] font-bold text-sm">&lt; 60s TRIAGE</span>
                <span className="text-[11px] text-slate-500">Automated Speed</span>
              </div>
              <div>
                <span className="block text-slate-900 font-bold text-sm">100% IP</span>
                <span className="text-[11px] text-slate-500">Client Code Control</span>
              </div>
              <div>
                <span className="block text-emerald-600 font-bold text-sm">POSTGRES</span>
                <span className="text-[11px] text-slate-500">ACID Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Column: VIVID 3D AUTONOMOUS BRAIN CORE CENTERPIECE */}
          <div className="lg:col-span-6 z-10 flex items-center justify-center">
            <div className="w-full border border-slate-200 bg-white/80 backdrop-blur-md relative shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
              <AutonomousBrainCore />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTEGRATION & ECOSYSTEM PARTNERS BAR
          ========================================================================= */}
      <section className="border-b border-slate-200/80 bg-white py-10 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
            Engineered To Integrate Seamlessly With Your Core Stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-600 font-medium text-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <span className="font-bold text-slate-950 font-sans tracking-tight">WhatsApp Cloud API</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Official</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="font-bold text-slate-950 font-sans tracking-tight">Google Gemini 1.5</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Multimodal</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="font-bold text-slate-950 font-sans tracking-tight">Meta Graph API</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Ads & CRM</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="font-bold text-slate-950 font-sans tracking-tight">Supabase PostgreSQL</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">ACID</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="font-bold text-slate-950 font-sans tracking-tight">Next.js 16</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B2C] border border-orange-200">Edge SSR</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="font-bold text-slate-950 font-sans tracking-tight">Razorpay & Stripe</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PROBLEM (Disconnected Systems & Manual Bottlenecks)
          ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-28 sm:py-36 border-b border-slate-200/80 bg-slate-50/70">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-20">
            <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-[0.18em]">
              DIAGNOSTIC // COST OF FRICTION
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.05]">
              Where Growing Companies Silently Bleed Revenue
            </h2>
            <p className="mt-6 text-lg text-slate-600 font-normal leading-relaxed">
              When business software operates in isolated silos, customer context disappears,
              leads go cold, and high-cost team members waste half their day on manual copy-pasting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                label: "INGESTION LATENCY",
                title: "Inquiries wait hours for manual staff review",
                desc: "Web forms, WhatsApp messages, and paid ad leads sit idle during off-hours. 80% of buyers choose the first vendor who provides a qualified response within 15 minutes.",
                solution: "Sub-60s automated qualification, schedule coordination, and instant CRM sync.",
                accent: "#FF6B2C",
              },
              {
                num: "02",
                label: "REP BANDWIDTH",
                title: "Sales specialists burn time on unqualified inquiries",
                desc: "Your closers waste 60% of their workday answering basic repetitive pricing queries or fielding leads with mismatched budgets, leaving scarce bandwidth for serious buyers.",
                solution: "Pre-qualification workflows that filter budget, timeline, and requirements before calendar booking.",
                accent: "#0D9488",
              },
              {
                num: "03",
                label: "FRAGMENTATION",
                title: "Business records trapped across loose chats and sheets",
                desc: "Agreements, order statuses, and payment histories are scattered without a single source of truth. When staff leave, institutional context vanishes with them.",
                solution: "Unified PostgreSQL database layer connecting WhatsApp, payment gateways, and CRM in real time.",
                accent: "#FF6B2C",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white border border-slate-200 p-8 flex flex-col justify-between hover:border-[#FF6B2C] transition-all duration-300 shadow-sm hover:shadow-lg rounded-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-4xl font-black font-mono text-slate-200 group-hover:text-orange-200 transition-colors"
                    >
                      {item.num}
                    </span>
                    <span
                      className="text-xs font-mono uppercase tracking-wider font-bold"
                      style={{ color: item.accent }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {item.desc}
                  </p>
                </div>

                <div
                  className="border-t border-slate-100 pt-4 text-xs font-mono"
                  style={{ color: item.accent }}
                >
                  <span className="font-bold block mb-1">[DODAIL SOLUTION]</span>
                  <span className="text-slate-700 font-sans">{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SERVICES (5 3D Formations Driven By Visitor Focus)
          ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-28 sm:py-36 border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-[0.18em]">
              CAPABILITIES // 5 CORE OFFERINGS
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.05]">
              Engineered Solutions For Measurable Growth
            </h2>
            <p className="mt-6 text-lg text-slate-600 font-normal leading-relaxed">
              Hover or select an offering below to explore how the 3D procedural formation adapts in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive 5 Service Cards */}
            <div className="lg:col-span-7 space-y-4">
              {services.map((srv, index) => {
                const isActive = activeService === index;

                return (
                  <div
                    key={srv.id}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                    className={`p-6 sm:p-8 border transition-all duration-300 cursor-pointer rounded-xl ${
                      isActive
                        ? "bg-orange-50/40 border-[#FF6B2C] shadow-md shadow-orange-500/10 ring-1 ring-[#FF6B2C]"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span
                        className="text-xs font-mono font-bold uppercase tracking-wider"
                        style={{ color: isActive ? "#FF6B2C" : "#64748B" }}
                      >
                        {srv.tag}
                      </span>
                      <span className="text-xs font-mono text-[#0D9488] px-2.5 py-0.5 border border-slate-200 bg-white font-semibold rounded">
                        {srv.metric}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                      {srv.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {srv.deliverables.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2.5 py-1 border border-slate-200 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={srv.href}
                      className="text-xs font-mono uppercase tracking-wider text-[#FF6B2C] hover:text-[#d4531b] inline-flex items-center gap-1 font-bold pt-2"
                    >
                      <span>Explore Offering</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right Column: DEDICATED 3D FORMATION CANVAS */}
            <div className="lg:col-span-5 sticky top-28 border border-slate-200 bg-slate-50/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white/90">
                <span className="text-xs font-mono text-[#FF6B2C] font-bold">
                  {services[activeService].tag}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  [ PROCEDURAL 3D MOTIF ]
                </span>
              </div>
              <ServicesCanvas3D activeServiceIndex={activeService} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: AUTOMATION SHOWCASE (Interactive 3D Pipeline)
          ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-28 sm:py-36 border-b border-slate-200/80 bg-slate-50/70">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-[0.18em]">
              INTERACTIVE DEMO // 4-STAGE PIPELINE
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.05]">
              Experience How Dodail Automates Operations
            </h2>
            <p className="mt-6 text-lg text-slate-600 font-normal leading-relaxed">
              Click any stage below to inspect how inbound signals travel across deterministic validation and commit to core databases in under 400 milliseconds.
            </p>
          </div>

          {/* DEDICATED 3D PIPELINE CANVAS VIEWPORT */}
          <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 mb-8 p-1">
            <PipelineCanvas3D
              activePipelineStage={activePipelineStage}
              onSelectStage={setActivePipelineStage}
            />
          </div>

          {/* Interactive Pipeline Stage Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {pipelineStages.map((st) => {
              const isSelected = activePipelineStage === st.stage;

              return (
                <button
                  key={st.stage}
                  type="button"
                  onClick={() => setActivePipelineStage(st.stage)}
                  className={`p-5 text-left border transition-all duration-200 rounded-xl ${
                    isSelected
                      ? "bg-white border-[#FF6B2C] shadow-md ring-1 ring-[#FF6B2C]"
                      : "bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider block mb-1"
                    style={{ color: isSelected ? "#FF6B2C" : "#64748B" }}
                  >
                    {st.code}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 tracking-tight">
                    {st.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Stage Technical Specification Card */}
          <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider font-bold">
                  STAGE ACTIVE: {pipelineStages[activePipelineStage].code}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {pipelineStages[activePipelineStage].title}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 border border-emerald-300 bg-emerald-50 px-3 py-1 font-semibold rounded">
                ILLUSTRATIVE DEMO // NO FAKE TELEMETRY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-2 font-medium">
                  Operating Behavior
                </span>
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  {pipelineStages[activePipelineStage].desc}
                </p>
              </div>
              <div>
                <span className="text-xs font-mono text-[#0D9488] uppercase tracking-wider block mb-2 font-medium">
                  Engineered Execution Details
                </span>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                  <p className="text-sm font-mono text-slate-700 leading-relaxed">
                    {pipelineStages[activePipelineStage].details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: INDUSTRIES (4 Verticals Re-skinning 3D Node Cluster)
          ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-28 sm:py-36 border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-[0.18em]">
              VERTICALS // INDUSTRY ADAPTATIONS
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.05]">
              Calibrated For High-Growth Sectors
            </h2>
            <p className="mt-6 text-lg text-slate-600 font-normal leading-relaxed">
              Select an industry vertical below to observe how the 3D network nodes adapt with sector-specific workflows.
            </p>
          </div>

          {/* Industry Vertical Tab Bar */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-4">
            {industries.map((ind) => {
              const isSelected = activeIndustry === ind.key;
              const Icon = ind.icon;

              return (
                <button
                  key={ind.key}
                  type="button"
                  onClick={() => setActiveIndustry(ind.key)}
                  className={`flex items-center gap-2 px-5 py-3 border text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 rounded-lg ${
                    isSelected
                      ? "bg-[#FF6B2C] text-white border-[#FF6B2C] shadow-sm"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{ind.label}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Industry Card with EMBEDDED 3D SECTOR CLUSTER */}
          {(() => {
            const current = industries.find((i) => i.key === activeIndustry) || industries[0];
            return (
              <div className="bg-slate-50/80 border border-slate-200 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl shadow-sm">
                <div className="lg:col-span-7">
                  <span
                    className="text-xs font-mono uppercase tracking-wider font-bold block mb-2"
                    style={{ color: current.accent }}
                  >
                    {current.label.toUpperCase()} ARCHITECTURE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                    {current.headline}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
                    {current.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {current.features.map((feat) => (
                      <div
                        key={feat}
                        className="bg-white border border-slate-200 p-4 text-xs font-mono text-slate-800 shadow-sm rounded-lg"
                      >
                        <Check className="h-3.5 w-3.5 text-[#0D9488] mb-2" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={current.href}
                    className="text-xs font-mono uppercase tracking-wider text-[#FF6B2C] hover:text-[#d4531b] inline-flex items-center gap-1 font-bold"
                  >
                    <span>[+] View Detailed Blueprint</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                {/* 3D Dynamic Sector Cluster Viewport */}
                <div className="lg:col-span-5 h-[340px] border border-slate-200 bg-white flex flex-col justify-between overflow-hidden relative rounded-xl shadow-inner">
                  <div className="p-3 border-b border-slate-200 flex items-center justify-between z-10 bg-slate-100/80 backdrop-blur-md">
                    <span className="text-[11px] font-mono text-slate-500 uppercase font-medium">
                      3D Telemetry Preview
                    </span>
                    <span
                      className="text-xs font-bold font-mono"
                      style={{ color: current.accent }}
                    >
                      {current.label}
                    </span>
                  </div>
                  <IndustryCanvas3D activeIndustry={activeIndustry} />
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DELIVERY PROCESS (5-Stage Path)
          ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-28 sm:py-36 border-b border-slate-200/80 bg-slate-50/70">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-[0.18em]">
              METHODOLOGY // 15-DAY CUTOVER
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.05]">
              Our 5-Stage Delivery Process
            </h2>
            <p className="mt-6 text-lg text-slate-600 font-normal leading-relaxed">
              Every automation is built with clear exception bounds, deterministic rules, and full client IP ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
            {processStages.map((st, i) => {
              const isSelected = activeProcessStep === i;

              return (
                <div
                  key={st.num}
                  onMouseEnter={() => setActiveProcessStep(i)}
                  onClick={() => setActiveProcessStep(i)}
                  className={`p-6 sm:p-8 cursor-pointer transition-colors duration-200 flex flex-col justify-between group ${
                    isSelected
                      ? "bg-orange-50/30 border-b-2 md:border-b-0 md:border-t-2 border-[#FF6B2C]"
                      : "bg-white hover:bg-slate-50/80"
                  }`}
                >
                  <div>
                    <span
                      className="text-4xl font-black font-mono block mb-4 transition-colors"
                      style={{ color: isSelected ? "#FF6B2C" : "#E2E8F0" }}
                    >
                      {st.num}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-6">
                      {st.desc}
                    </p>
                  </div>
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider block"
                    style={{ color: isSelected ? "#0D9488" : "#64748B" }}
                  >
                    {st.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: VERIFIED PROOF & CODE CONTROL
          ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-28 sm:py-36 border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-[0.18em]">
              INTEGRITY // VERIFIED HISTORY
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.05]">
              Real Deliverables. Zero Fabricated Claims.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50/70 border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Eye className="h-8 w-8 text-[#FF6B2C] mb-6" />
              <span className="text-xs font-mono text-[#0D9488] uppercase tracking-wider block mb-2 font-bold">
                ESTABLISHED JUNE 2019
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Hyderabad Digital Roots
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Incorporated in June 2019 in Hyderabad, Telangana, Dodail Solutions Private Limited has engineered software and automations across India and overseas.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-8 w-8 text-[#0D9488] mb-6" />
              <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider block mb-2 font-bold">
                COMPLETE CODE CONTROL
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                100% Client IP Ownership
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                You retain complete ownership of your application source code, schemas, and workflows. Zero proprietary lock-ins or arbitrary per-record subscription taxes.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Sparkles className="h-8 w-8 text-[#FF6B2C] mb-6" />
              <span className="text-xs font-mono text-[#0D9488] uppercase tracking-wider block mb-2 font-bold">
                DATA ETHICS & SECURITY
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Strict Governance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Data is encrypted in transit and at rest with strict PostgreSQL Row-Level Security. Private business communications are NEVER used to train public LLMs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FAQ (Accessible Accordion)
          ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-28 sm:py-36 border-b border-slate-200/80 bg-slate-50/70">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-[0.18em]">
              SPECIFICATIONS // FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.05]">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FINAL HIGH-CONVERSION CTA
          ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-28 sm:py-36 bg-gradient-to-b from-white via-slate-50 to-orange-50/20 border-t border-slate-200">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-orange-200 bg-orange-50 mb-8 rounded-full shadow-sm">
            <Zap className="h-4 w-4 text-[#FF6B2C]" />
            <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-wider">
              CONFIDENTIAL FEASIBILITY AUDIT
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.05]">
            Ready to eliminate repetitive manual friction from your business?
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Schedule a 30-minute feasibility session with a Dodail solutions engineer. We will review your current manual touchpoints, assess technical feasibility, and present an actionable architectural blueprint.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/consultation"
              variant="primary"
              size="lg"
              className="text-sm px-10 py-4 font-semibold uppercase tracking-wider shadow-lg shadow-orange-500/25"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book a Consultation
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="text-sm px-10 py-4 uppercase tracking-wider border-slate-300 text-slate-800 bg-white hover:bg-slate-100 shadow-sm"
            >
              Send Direct Message
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <span className="text-slate-900 font-semibold">
              Dodail Solutions Private Limited
            </span>
            <span className="text-slate-300">·</span>
            <span>Hyderabad, Telangana, India</span>
            <span className="text-slate-300">·</span>
            <a
              href="tel:+919966400235"
              className="text-slate-700 hover:text-[#FF6B2C] transition-colors underline underline-offset-2"
            >
              +91 99664 00235
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="mailto:info@dodail.com"
              className="text-slate-700 hover:text-[#FF6B2C] transition-colors underline underline-offset-2"
            >
              info@dodail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
