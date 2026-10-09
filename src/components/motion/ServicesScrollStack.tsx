"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  tag: string;
  accentColor: string;
  title: string;
  description: string;
  capabilities: string[];
  outcome: string;
  boundary: string;
  href: string;
  ctaText: string;
}

const services: ServiceItem[] = [
  {
    id: "automation",
    number: "01",
    tag: "AUTONOMOUS ENGINES",
    accentColor: "#FA5B0F",
    title: "Autonomous Business Workflow Pipelines",
    description:
      "End-to-end operational systems that receive inquiries, validate data schemas, make rule-based evaluations, and execute cross-platform tasks across WhatsApp, Google Sheets, and CRM tools without human intervention.",
    capabilities: [
      "PostgreSQL-backed job queue",
      "WhatsApp Cloud API native",
      "Deterministic retry logic",
      "Strict schema validation",
    ],
    outcome: "Replaces 10+ hours per week of manual cross-app copy-pasting per employee.",
    boundary: "High-stakes commercial or legal exceptions route directly to human management.",
    href: "/solutions/ai-automation",
    ctaText: "Explore Automation Architecture",
  },
  {
    id: "web-software",
    number: "02",
    tag: "ENGINEERING & PLATFORMS",
    accentColor: "#27D3C2",
    title: "High-Performance Web Platforms & APIs",
    description:
      "Bespoke Next.js web applications, client portals, and administrative workspaces. Engineered with strict TypeScript, clean PostgreSQL schemas, and zero bloated template overhead.",
    capabilities: [
      "Next.js 16 Server Components",
      "PostgreSQL Row-Level Security",
      "Custom REST & Webhook APIs",
      "100/100 Core Web Vitals",
    ],
    outcome: "Sub-100ms response times, 99.9% uptime, and complete client code ownership.",
    boundary: "Custom software requires 2-4 weeks of architecture & build vs generic drag-and-drop templates.",
    href: "/services/web-development",
    ctaText: "View Web Engineering Specs",
  },
  {
    id: "lead-ops",
    number: "03",
    tag: "SALES & REVENUE OPERATIONS",
    accentColor: "#FA5B0F",
    title: "Intelligent Lead Qualification & CRM Sync",
    description:
      "Ingests prospects from web forms, paid ad campaigns, and messaging channels. Validates budget, timeline, and intent within 60 seconds, syncing qualified leads directly into your sales CRM.",
    capabilities: [
      "Meta & Google lead ingestion",
      "CRM sync (Zoho, Salesforce, HubSpot)",
      "Instant buyer scoring",
      "Automated calendar booking",
    ],
    outcome: "Response time drops from 4 hours to under 60 seconds with enriched context.",
    boundary: "System qualifies and schedules; human sales reps lead high-ticket deal negotiation.",
    href: "/solutions/ai-lead-management",
    ctaText: "Explore Lead Operations",
  },
  {
    id: "support-agent",
    number: "04",
    tag: "KNOWLEDGE & SUPPORT OPS",
    accentColor: "#A855F7",
    title: "24/7 Policy-Constrained Customer Support",
    description:
      "Constrained AI assistants trained exclusively on your approved documentation and business rules. Resolves repetitive inquiries, looks up order/appointment states, and escalates edge cases cleanly.",
    capabilities: [
      "Zero hallucination guarantee",
      "Private business knowledge base",
      "Contextual human handoff",
      "Full conversation audit trail",
    ],
    outcome: "65% reduction in first-response tickets without increasing support staff.",
    boundary: "Complex refunds and disputes route with complete chat history to your management.",
    href: "/solutions/ai-customer-support",
    ctaText: "Explore Support Agents",
  },
  {
    id: "growth-geo",
    number: "05",
    tag: "ORGANIC VISIBILITY & SEO",
    accentColor: "#10B981",
    title: "Digital Visibility & Generative Engine Optimization",
    description:
      "Technical SEO, structured JSON-LD schemas, and Generative Engine Optimization (GEO) designed to earn visibility both on Google search rankings and emerging AI search engines.",
    capabilities: [
      "GEO AI answer optimization",
      "Technical schema markup",
      "Programmatic content engine",
      "Long-term domain authority",
    ],
    outcome: "Predictable organic inbound pipeline that compounds without ad spend spikes.",
    boundary: "Search authority takes 60–90 days of consistent publishing and technical signals.",
    href: "/services/digital-growth-seo",
    ctaText: "View Growth & SEO Services",
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
            <span className="text-xs font-mono text-[#FA5B0F] uppercase tracking-wider block mb-2">
              Services & Capabilities // 01 — 05
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Engineered For Measurable Business Outcomes
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed font-light">
              Deterministic architectures built for long-term operational resilience. Complete transparency on deliverables, verified outcomes, and engineering scope.
            </p>
          </div>

          {/* Quick Step Indicators */}
          <div className="hidden lg:flex flex-col space-y-2 border-l border-white/[0.08] pl-4">
            {services.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  const el = document.getElementById(`service-${item.id}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`text-left py-1 text-xs font-mono transition-colors flex items-center gap-3 ${
                  activeStep === idx
                    ? "text-[#FA5B0F] font-bold"
                    : "text-slate-500 hover:text-slate-300"
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
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#FA5B0F] hover:text-white transition-colors"
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
              className="rounded-3xl border border-white/[0.08] bg-[#0A0D14] p-8 sm:p-10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-mono font-bold tracking-wider"
                  style={{ color: service.accentColor }}
                >
                  {service.number} // {service.tag}
                </span>
                <span className="text-xs font-mono text-slate-600">DODAIL ARCHITECTURE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {service.title}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {service.description}
              </p>

              {/* Capability Chips */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                {service.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]"
                  >
                    {cap}
                  </span>
                ))}
              </div>

              {/* Transparent Outcome vs Boundary */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-emerald-400 font-bold block mb-1">Verified Outcome</span>
                  <p className="text-slate-400 leading-relaxed">{service.outcome}</p>
                </div>
                <div>
                  <span className="text-amber-400 font-bold block mb-1">Engineering Boundary</span>
                  <p className="text-slate-400 leading-relaxed">{service.boundary}</p>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-white/[0.05] hover:bg-[#FA5B0F] hover:text-white px-5 py-3 rounded-xl border border-white/10 transition-colors"
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
