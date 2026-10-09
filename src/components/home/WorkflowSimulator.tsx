"use client";

import * as React from "react";
import {
  CheckCircle2,
  Cpu,
  Bot,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  RefreshCw,
  Activity,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Scenario {
  id: string;
  name: string;
  badge: string;
  industry: string;
  trigger: string;
  sourceChannel: string;
  aiAction: string;
  outcome: string;
  latency: string;
  confidence: number;
  payload: {
    lead: string;
    intent: string;
    actionTaken: string;
    syncedDestinations: string[];
  };
}

const scenarios: Scenario[] = [
  {
    id: "healthcare",
    name: "Dental Clinic Emergency Ingestion",
    badge: "Healthcare",
    industry: "Clinical Operations",
    trigger: "WhatsApp Audio: 'Severe wisdom tooth pain, swelling rapidly, need immediate appointment today'",
    sourceChannel: "WhatsApp Cloud API · Voice Note",
    aiAction: "Transcribed audio via Whisper, parsed acute emergency medical intent, queried clinic doctor calendar for nearest buffer slot, validated insurance eligibility.",
    outcome: "Patient auto-slotted for 3:45 PM emergency consultation. Instant WhatsApp appointment pass with Google Maps route dispatched. Clinic desk alert triggered.",
    latency: "320ms",
    confidence: 99.2,
    payload: {
      lead: "Verified Patient (Hyderabad)",
      intent: "Acute Oral Emergency & Extraction",
      actionTaken: "Real-time Slot Hold & Priority Desk Escalate",
      syncedDestinations: ["Google Calendar", "Dental Practice CRM", "WhatsApp Cloud API", "SMS Gateway"],
    },
  },
  {
    id: "realestate",
    name: "Luxury Property Buyer Triage",
    badge: "Real Estate",
    industry: "High-Ticket Sales",
    trigger: "Portal Form: 'Interested in 4BHK Sky Villa at Financial District, Budget ₹4.2 Cr, site visit this Saturday'",
    sourceChannel: "Direct Web Form · Meta Lead Ads",
    aiAction: "Enriched phone contact, verified HNI budget alignment (>₹4 Cr), cross-checked Saturday site-visit slot availability with Senior Portfolio Director.",
    outcome: "High-priority VIP tag assigned in CRM. Personalized digital brochure + virtual video tour sent in under 45 seconds. Private site visit confirmed.",
    latency: "410ms",
    confidence: 98.6,
    payload: {
      lead: "Corporate Executive (Hitec City)",
      intent: "Immediate High-Value Acquisition",
      actionTaken: "Instant VIP Routing & Digital Brochure Dispatch",
      syncedDestinations: ["Salesforce CRM", "Portfolio Director Slack", "WhatsApp Concierge"],
    },
  },
  {
    id: "ecommerce",
    name: "DTC Order & Return Automation",
    badge: "E-Commerce",
    industry: "Retail & Commerce",
    trigger: "Live Chat: 'Order #DOD-9821 arrived with incorrect size, need replacement before Friday'",
    sourceChannel: "Shopify Storefront Webchat",
    aiAction: "Queried warehouse inventory for replacement size availability, verified order delivery timestamp within 7-day policy window, generated pre-paid return reverse shipping label.",
    outcome: "Replacement reserved instantly. Return label PDF delivered with pickup scheduled for tomorrow. 0 human support minutes consumed.",
    latency: "280ms",
    confidence: 99.8,
    payload: {
      lead: "Verified Purchaser (Order #9821)",
      intent: "Exchange / Sizing Replacement",
      actionTaken: "Auto-label Generation & Courier Reverse Pickup",
      syncedDestinations: ["Shopify Admin", "Shiprocket API", "Customer Email", "PostgreSQL Order Log"],
    },
  },
  {
    id: "technology",
    name: "SaaS Diagnostic Incident Routing",
    badge: "Technology",
    industry: "DevOps & Support",
    trigger: "API Webhook: '504 Gateway Timeout on /v1/checkout during flash sale peak'",
    sourceChannel: "Stripe Webhook · Production Sentry",
    aiAction: "Extracted stack trace, checked current database connection pool telemetry, matched with known high-concurrency connection leak runbook.",
    outcome: "Automated traffic shed enabled, read-replica routed, critical P1 Jira ticket created with diagnostic logs attached. On-call engineer alerted.",
    latency: "190ms",
    confidence: 99.5,
    payload: {
      lead: "Enterprise SaaS Client",
      intent: "Critical Infrastructure Incident",
      actionTaken: "Automatic Replica Reroute & On-Call Pager",
      syncedDestinations: ["Jira Software", "PagerDuty", "Internal Ops Slack", "Supabase Telemetry"],
    },
  },
];

export function WorkflowSimulator() {
  const [selectedId, setSelectedId] = React.useState("healthcare");
  const [activeStep, setActiveStep] = React.useState(3); // 1 = Ingest, 2 = AI Reasoning, 3 = Execution Complete
  const [isSimulating, setIsSimulating] = React.useState(false);

  const scenario = scenarios.find((s) => s.id === selectedId) || scenarios[0];

  const runSimulation = (id: string) => {
    setSelectedId(id);
    setIsSimulating(true);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
    }, 450);

    setTimeout(() => {
      setActiveStep(3);
      setIsSimulating(false);
    }, 950);
  };

  return (
    <div className="relative rounded-3xl border border-[#1B3652] bg-[#0A1B2A]/90 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#FA5B0F]/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#27D3C2]/10 blur-[100px] pointer-events-none" />

      {/* Control Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#1B3652]/80 pb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Engine Live Telemetry
            </span>
            <span className="text-xs font-mono text-slate-400">Deterministic Engine v2.4</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
            Interactive Operational Flow Simulator
          </h3>
          <p className="mt-1 text-sm text-slate-300 max-w-xl">
            Inspect in real time how Dodail evaluates raw inbound triggers, applies deterministic AI guardrails, and synchronizes business destinations without human delay.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap gap-2">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => runSimulation(sc.id)}
              disabled={isSimulating}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border flex items-center gap-2 ${
                selectedId === sc.id
                  ? "bg-[#FA5B0F] border-[#FA5B0F] text-white shadow-lg shadow-[#FA5B0F]/30 scale-[1.02]"
                  : "bg-[#0E2235] border-[#1B3652] text-slate-300 hover:text-white hover:border-slate-600 hover:bg-[#142C44]"
              }`}
            >
              <span>{sc.badge}</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">({sc.industry})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Workspace: 3-Stage Pipeline */}
      <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1: Ingestion */}
        <div
          className={`rounded-2xl border p-6 transition-all duration-300 relative ${
            activeStep >= 1
              ? "border-[#1B3652] bg-[#0E2235]/90 text-white shadow-md shadow-black/40"
              : "border-slate-800 bg-[#07131E]/40 opacity-40 text-slate-500"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              STAGE 01 · SIGNAL INGESTION
            </span>
            <span className="text-[11px] font-mono text-slate-400">0.00s</span>
          </div>

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Raw Event Payload
          </div>
          <div className="rounded-xl bg-[#06111C] p-4 text-xs font-mono text-slate-200 border border-[#1B3652]/70 leading-relaxed min-h-[90px] flex items-center">
            &ldquo;{scenario.trigger}&rdquo;
          </div>

          <div className="mt-4 pt-3 border-t border-[#1B3652]/50 flex items-center justify-between text-xs text-slate-400">
            <span>Source Channel</span>
            <span className="font-medium text-slate-200">{scenario.sourceChannel}</span>
          </div>
        </div>

        {/* Step 2: AI Reasoning & Schema Validation */}
        <div
          className={`rounded-2xl border p-6 transition-all duration-300 relative ${
            activeStep >= 2
              ? "border-[#FA5B0F]/60 bg-[#122B43]/90 text-white shadow-xl shadow-[#FA5B0F]/15"
              : "border-slate-800 bg-[#07131E]/40 opacity-40 text-slate-500"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-wider text-[#FA5B0F] flex items-center gap-1.5">
              <Bot className="h-3.5 w-3.5" />
              STAGE 02 · REASONING & GUARDRAIL
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              {isSimulating && activeStep === 2 ? "Analyzing..." : scenario.latency}
            </span>
          </div>

          <div className="text-xs font-semibold text-[#FA5B0F] uppercase tracking-wider mb-1">
            Deterministic Decision Tree
          </div>
          <div className="rounded-xl bg-[#06111C] p-4 text-xs text-slate-200 border border-[#1B3652]/70 leading-relaxed min-h-[90px]">
            {scenario.aiAction}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1B3652]/50 flex items-center justify-between text-xs">
            <span className="text-slate-400">Confidence Metric</span>
            <span className="font-bold text-emerald-400">{scenario.confidence}% Verified</span>
          </div>
        </div>

        {/* Step 3: Execution & Synchronized Outbound */}
        <div
          className={`rounded-2xl border p-6 transition-all duration-300 relative ${
            activeStep === 3
              ? "border-emerald-500/50 bg-[#0E283A]/90 text-white shadow-xl shadow-emerald-500/10"
              : "border-slate-800 bg-[#07131E]/40 opacity-40 text-slate-500"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              STAGE 03 · EXECUTION & SYNC
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Completed</span>
          </div>

          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            Automated Business Outcome
          </div>
          <div className="rounded-xl bg-[#06111C] p-4 text-xs text-slate-200 border border-[#1B3652]/70 leading-relaxed min-h-[90px]">
            {scenario.outcome}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1B3652]/50">
            <div className="text-[11px] text-slate-400 mb-2">Connected Systems Updated:</div>
            <div className="flex flex-wrap gap-1.5">
              {scenario.payload.syncedDestinations.map((dest) => (
                <span
                  key={dest}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#071A28] text-slate-300 border border-emerald-500/30 font-mono"
                >
                  ✓ {dest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Footer Status */}
      <div className="relative z-10 mt-8 pt-6 border-t border-[#1B3652]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            Hardened schema execution: Zero unconstrained model generation touches your production databases.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => runSimulation(selectedId)}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg border border-[#1B3652] hover:bg-[#142C44]"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSimulating ? "animate-spin" : ""}`} />
            Re-run Pipeline
          </button>
          <Button href="/consultation" variant="primary" size="sm">
            Architect Your Workflow
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
