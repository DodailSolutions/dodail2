"use client";

import React, { useState } from "react";
import { Check, Copy, Cpu, Globe, Lock, ShieldCheck, Terminal, Zap } from "lucide-react";

export function ArchitectureStudio() {
  const [activeTab, setActiveTab] = useState<"edge" | "ai" | "crm">("edge");
  const [copied, setCopied] = useState(false);

  const snippets = {
    edge: `// Next.js 16 Edge Runtime + Distributed ISR Layer
export const runtime = 'edge';
export const dynamic = 'force-static';
export const revalidate = 3600; // 1-hour stale-while-revalidate

export async function GET(request: Request) {
  const { geo, ip } = request;
  const targetMarket = resolveMarket(geo?.country ?? 'IN'); // [IN, UAE, US]

  // Sub-18ms Edge Cache with personalized currency & localization
  return Response.json({
    latency: '14.2ms',
    origin: 'bom1-edge',
    market: targetMarket,
    status: 'ACTIVE_ZERO_LATENCY',
    compliance: 'DPDP_SOC2_READY'
  });
}`,
    ai: `// Dodail AI Lead Qualification & Hallucination Guardrail
import { createGuardrailPipeline } from '@dodail/ai-engine';

export const qualificationEngine = createGuardrailPipeline({
  model: 'gemini-1.5-pro',
  groundingThreshold: 0.94,
  piiMasking: true, // Enterprise GDPR / DPDP compliance
  routingRules: {
    enterpriseTier: (lead) => lead.annualRevenue > 5_000_000,
    action: 'AUTO_SCHEDULE_CMO_CALENDAR',
    enrichmentProvider: 'CLEARBIT_LINKEDIN_SYNC'
  }
});`,
    crm: `// Real-Time Bi-Directional Attribution Pipeline
export async function dispatchAttributionEvent(event: ConversionEvent) {
  const payload = {
    visitorId: event.cid,
    adGroup: event.utm_campaign,
    predictedLTV: event.modelScore * 4.6,
    hubspotDealStage: 'APPOINTMENT_SCHEDULED'
  };

  // Asynchronous queue worker guarantees zero dropped leads
  await queue.enqueue('crm-sync-worker', payload, {
    retries: 5,
    backoff: 'exponential'
  });
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[28px] border border-[#E3E6EB] bg-white p-6 sm:p-10 shadow-xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#E3E6EB] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E04E08]/10 text-[#E04E08]">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#E04E08]">
              Enterprise Architecture Studio
            </span>
          </div>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#1A2535]">
            Engineering That Enterprises Audit With Ease
          </h3>
          <p className="mt-1 text-sm text-[#1A2535]/60">
            High-performance web architecture, zero-latency caching, and hardened AI safety pipelines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            SOC2 Type II / DPDP Aligned
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-[#1A2535]">
            <Zap className="h-3.5 w-3.5 text-[#E04E08]" />
            99.98% SLA
          </span>
        </div>
      </div>

      {/* Studio Workbench */}
      <div className="mt-6">
        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E6EB] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("edge")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "edge"
                  ? "bg-[#1A2535] text-white shadow-sm"
                  : "bg-[#F6F7F9] text-[#1A2535]/70 hover:bg-[#E3E6EB]"
              }`}
            >
              01. Next.js 16 Edge Gateway
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "ai"
                  ? "bg-[#1A2535] text-white shadow-sm"
                  : "bg-[#F6F7F9] text-[#1A2535]/70 hover:bg-[#E3E6EB]"
              }`}
            >
              02. AI Intent &amp; Safety Guardrail
            </button>
            <button
              onClick={() => setActiveTab("crm")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "crm"
                  ? "bg-[#1A2535] text-white shadow-sm"
                  : "bg-[#F6F7F9] text-[#1A2535]/70 hover:bg-[#E3E6EB]"
              }`}
            >
              03. CRM Bi-Directional Attribution
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3E6EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#1A2535] hover:bg-[#F6F7F9]"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#1A2535]/60" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Viewport */}
        <div className="relative mt-4 overflow-hidden rounded-[20px] bg-[#1A2535] p-5 text-white shadow-inner">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-white/50">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-white/60">dodail-core-engine.ts</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400">● 14.2ms edge response</span>
              <span>UTF-8</span>
            </div>
          </div>

          <pre className="mt-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-[#F2D5C4]/90">
            <code>{snippets[activeTab]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
