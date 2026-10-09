"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  tag: string;
  accentColor: string;
  title: string;
  businessProblem: string;
  solution: string;
  expectedValue: string;
  capabilities: string[];
  href: string;
  ctaText: string;
}

const services: ServiceItem[] = [
  {
    id: "ai-automation",
    number: "01",
    tag: "AUTONOMOUS OPERATIONS",
    accentColor: "#FF6B2C",
    title: "AI Automation & Business Workflows",
    businessProblem:
      "Repetitive inquiry handling, manual copy-pasting across disparate spreadsheets, and slow handoffs between apps drain 15+ staff hours per week and delay customer responses by hours.",
    solution:
      "Event-driven automation engines connecting WhatsApp Business, CRM, Google Sheets, and PostgreSQL databases with deterministic schema validation, retry queues, and human fallback triggers.",
    expectedValue:
      "Sub-60s customer qualification, 80% reduction in manual data coordination, and continuous error-free processing around the clock.",
    capabilities: [
      "PostgreSQL-backed job queue",
      "WhatsApp Cloud API native",
      "Deterministic retry logic",
      "Strict schema validation guardrails",
    ],
    href: "/solutions/ai-automation",
    ctaText: "Explore Automation Architecture",
  },
  {
    id: "custom-software",
    number: "02",
    tag: "ENTERPRISE PLATFORMS",
    accentColor: "#27D3C2",
    title: "Custom Software & SaaS Development",
    businessProblem:
      "Generic SaaS platforms fail to fit proprietary business processes, impose painful per-user license fees, and trap critical business data in closed commercial silos.",
    solution:
      "Bespoke Next.js 16 web applications, administrative control panels, and multi-tenant SaaS architectures engineered with strict TypeScript, Supabase PostgreSQL, and clean REST APIs.",
    expectedValue:
      "100% client source code ownership, zero license seat taxes, sub-100ms API response latency, and software designed specifically around your operational model.",
    capabilities: [
      "Next.js 16 Server Components",
      "PostgreSQL Row-Level Security",
      "Custom REST & Webhook APIs",
      "Zero vendor lock-in guarantee",
    ],
    href: "/services/web-development",
    ctaText: "View Software Engineering Specs",
  },
  {
    id: "website-ecommerce",
    number: "03",
    tag: "HIGH-CONVERTING COMMERCE",
    accentColor: "#FF6B2C",
    title: "Website & E-Commerce Development",
    businessProblem:
      "Bloated templates and slow e-commerce storefronts suffer from high bounce rates, clunky mobile checkout flows, and poor conversion rates that bleed ad spend.",
    solution:
      "Ultra-fast headless commerce platforms, interactive brand websites, and bespoke product experiences engineered for sub-second page loads and seamless transactional journeys.",
    expectedValue:
      "100/100 Core Web Vitals, 35%+ increase in mobile checkout conversion, and direct synchronization with inventory and logistics backends.",
    capabilities: [
      "Sub-second page load speeds",
      "Headless checkout architectures",
      "Dynamic inventory & order sync",
      "Mobile-first responsive UX",
    ],
    href: "/services/web-development",
    ctaText: "Explore Web & Commerce Platforms",
  },
  {
    id: "digital-marketing",
    number: "04",
    tag: "ORGANIC & ACQUISITION SCALE",
    accentColor: "#27D3C2",
    title: "Digital Marketing & Growth",
    businessProblem:
      "Ad spend is exhausted on unqualified traffic, customer acquisition costs spiral upward, and websites lack organic search momentum to sustain growth without paid ads.",
    solution:
      "Generative Engine Optimization (GEO), technical structured data SEO, programmatic content engines, and high-intent acquisition campaigns calibrated for real business ROI.",
    expectedValue:
      "Compounding organic search visibility across Google and AI answer engines, qualified buyer pipelines, and lower customer acquisition costs over time.",
    capabilities: [
      "Generative Engine Optimization (GEO)",
      "Technical schema & JSON-LD markup",
      "Programmatic SEO pipelines",
      "Full-funnel attribution tracking",
    ],
    href: "/services/digital-growth-seo",
    ctaText: "View Growth & Visibility Framework",
  },
  {
    id: "branding-ui-ux",
    number: "05",
    tag: "PREMIUM BRAND IDENTITY",
    accentColor: "#FF6B2C",
    title: "Branding & UI/UX Design",
    businessProblem:
      "Generic template aesthetics, inconsistent typography, and amateur visual presentation diminish brand trust and make enterprise clients hesitate to commit to high-ticket contracts.",
    solution:
      "World-class digital design systems, bespoke brand visual language, art-directed layouts, fluid micro-interactions, and conversion-engineered interfaces.",
    expectedValue:
      "Instant enterprise credibility, sharp visual distinction from competitors, and intuitive digital interactions that turn first-time visitors into retained clients.",
    capabilities: [
      "Comprehensive design systems & tokens",
      "High-fidelity interactive prototypes",
      "Motion graphics & fluid interactions",
      "Conversion rate optimization (CRO)",
    ],
    href: "/work",
    ctaText: "Explore Design & Identity Capabilities",
  },
];

export function ServicesScrollStack() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Sticky Left Navigation (Inspired by Details.so / Brandappart) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          <div>
            <span className="text-xs font-mono text-[#FF6B2C] uppercase tracking-wider block mb-2">
              Services & Capabilities // 01 — 05
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F8FC] tracking-tight leading-tight">
              Engineered For Measurable Business Outcomes
            </h2>
            <p className="mt-4 text-base text-[#AABAC8] leading-relaxed font-light">
              Deterministic architectures built for long-term operational resilience. Complete transparency on deliverables, business problems solved, and verified value.
            </p>
          </div>

          {/* Quick Step Indicators */}
          <div className="hidden lg:flex flex-col space-y-2 border-l border-[#1B3652] pl-4">
            {services.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  const el = document.getElementById(`service-${item.id}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`text-left py-1 text-xs font-mono transition-colors flex items-center gap-3 ${
                  activeStep === idx
                    ? "text-[#FF6B2C] font-bold"
                    : "text-[#AABAC8]/60 hover:text-[#F5F8FC]"
                }`}
              >
                <span>{item.number}</span>
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6B2C] hover:text-[#F5F8FC] transition-colors"
            >
              <span>Discuss customized architecture for your business</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Stack of Scrollable Panels */}
        <div className="lg:col-span-7 space-y-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              onMouseEnter={() => setActiveStep(index)}
              className="rounded-3xl border border-[#1B3652] bg-[#0C2233] p-8 sm:p-10 hover:border-[#27D3C2]/40 transition-all duration-300 relative overflow-hidden group shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-mono font-bold tracking-wider"
                  style={{ color: service.accentColor }}
                >
                  {service.number} // {service.tag}
                </span>
                <span className="text-xs font-mono text-[#AABAC8]/60">DODAIL ARCHITECTURE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FC] tracking-tight leading-snug">
                {service.title}
              </h3>

              {/* 3 Structured Pillars: Business Problem, Solution, Expected Value */}
              <div className="mt-6 space-y-4">
                {/* Business Problem */}
                <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-400 mb-1">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Business Problem</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5F8FC]/80 leading-relaxed font-light">
                    {service.businessProblem}
                  </p>
                </div>

                {/* Engineered Solution */}
                <div className="rounded-xl border border-[#1B3652] bg-[#10293B] p-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#27D3C2] mb-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Engineered Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5F8FC]/90 leading-relaxed font-light">
                    {service.solution}
                  </p>
                </div>

                {/* Expected Value */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 mb-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Expected Business Value</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5F8FC]/90 leading-relaxed font-light">
                    {service.expectedValue}
                  </p>
                </div>
              </div>

              {/* Capability Chips */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-[#AABAC8]">
                {service.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-[#10293B] border border-[#1B3652]"
                  >
                    {cap}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-[#1B3652]/60">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5F8FC] bg-[#10293B] hover:bg-[#FF6B2C] hover:text-[#071A28] px-5 py-3 rounded-xl border border-[#1B3652] transition-colors"
                >
                  <span>{service.ctaText}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
