"use client";

import * as React from "react";
import { CheckCircle2, Play, RefreshCw, Cpu, Bot, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Scenario {
  id: string;
  name: string;
  industry: string;
  trigger: string;
  aiAction: string;
  outcome: string;
  latency: string;
  payload: {
    lead: string;
    intent: string;
    score: number;
    actionTaken: string;
    syncedDestinations: string[];
  };
}

const scenarios: Scenario[] = [
  {
    id: "dental",
    name: "Dental Clinic Emergency Ingestion",
    industry: "Healthcare",
    trigger: "WhatsApp Voice Note: 'Severe molar ache, need today appointment'",
    aiAction: "Transcribed audio, categorized as acute emergency, verified doctor calendar slot",
    outcome: "Patient auto-booked for 3:30 PM slot, WhatsApp confirmation sent, clinic staff notified",
    latency: "340ms",
    payload: {
      lead: "Dr. Reddy's Clinic Patient",
      intent: "Emergency Treatment",
      score: 98,
      actionTaken: "Direct Slot Allocation & SMS Dispatch",
      syncedDestinations: ["Google Calendar", "Clinic CRM", "WhatsApp Cloud API"],
    },
  },
  {
    id: "realestate",
    name: "Real Estate Buyer Qualification",
    industry: "Real Estate",
    trigger: "Website Form: 3BHK inquiry in Hitec City, Budget ₹2.5 Cr, Ready to buy in 30 days",
    aiAction: "Verified phone, filtered budget compatibility, routed to Senior Property Advisor",
    outcome: "High-priority alert sent to sales team, brochure PDF delivered instantly via WhatsApp",
    latency: "410ms",
    payload: {
      lead: "Hyderabad Tech Executive",
      intent: "High-Value Property Purchase",
      score: 94,
      actionTaken: "Instant Broker Assignment & PDF Delivery",
      syncedDestinations: ["Salesforce CRM", "WhatsApp API", "Internal Slack Channel"],
    },
  },
  {
    id: "support",
    name: "SaaS Multi-Tier Support Resolution",
    industry: "Technology",
    trigger: "Email: 'API Webhook returning 504 timeout during checkout'",
    aiAction: "Parsed error payload, matched known incident KB, ran diagnostic health check",
    outcome: "Provided exact retry-header configuration, created prioritized Jira ticket for L2 ops",
    latency: "520ms",
    payload: {
      lead: "Fintech Client DevOps Team",
      intent: "Technical Production Incident",
      score: 91,
      actionTaken: "Automated Knowledge Resolution & Jira Escalate",
      syncedDestinations: ["Jira Software", "PostgreSQL Incident Log", "Zendesk"],
    },
  },
];

export function WorkflowSimulator() {
  const [selectedId, setSelectedId] = React.useState("dental");
  const [isRunning, setIsRunning] = React.useState(false);
  const [step, setStep] = React.useState(3); // 1 = Trigger, 2 = AI Processing, 3 = Complete

  const currentScenario = scenarios.find((s) => s.id === selectedId) || scenarios[0];

  const handleSimulate = (id: string) => {
    setSelectedId(id);
    setIsRunning(true);
    setStep(1);

    setTimeout(() => {
      setStep(2);
    }, 600);

    setTimeout(() => {
      setStep(3);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-6 lg:p-8 backdrop-blur-md shadow-2xl shadow-black/60">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1B3652] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="orange">Live Technology Prototype</Badge>
            <span className="text-xs text-slate-400 font-mono">Engine v2.4</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Autonomous Business Workflow Engine
          </h3>
          <p className="text-xs text-slate-400">
            Select an operational scenario below to simulate how Dodail 2.0 ingests, decides, and executes without human intervention.
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex flex-wrap gap-2">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSimulate(sc.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                selectedId === sc.id
                  ? "bg-[#FA5B0F] border-[#FA5B0F] text-white shadow-md shadow-[#FA5B0F]/30"
                  : "bg-[#142C44] border-[#1B3652] text-slate-300 hover:text-white hover:bg-[#1B3652]"
              }`}
            >
              {sc.name.split(" ")[0]} ({sc.industry})
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Workspace */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Step 1: Ingestion */}
        <div
          className={`rounded-2xl border p-5 transition-all duration-300 ${
            step >= 1 ? "border-[#1B3652] bg-[#142C44]/80 text-white" : "border-slate-800 bg-[#0A1B2A]/50 opacity-50"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              01 · Signal Ingestion
            </span>
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-xs font-semibold text-white mb-2">Raw Trigger Event</p>
          <div className="rounded-xl bg-[#0A1B2A] p-3 text-xs text-slate-300 font-mono border border-[#1B3652]">
            &quot;{currentScenario.trigger}&quot;
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Channel: Omni-Channel API</span>
          </div>
        </div>

        {/* Step 2: Reasoning Engine */}
        <div
          className={`rounded-2xl border p-5 transition-all duration-300 ${
            step >= 2 ? "border-[#FA5B0F]/50 bg-[#122B43] text-white shadow-lg shadow-[#FA5B0F]/10" : "border-slate-800 bg-[#0A1B2A]/50 opacity-50"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FA5B0F]">
              02 · AI Reasoning & Intent
            </span>
            <Bot className="h-4 w-4 text-[#FA5B0F]" />
          </div>
          <p className="text-xs font-semibold text-white mb-2">Evaluator Decision</p>
          <div className="rounded-xl bg-[#0A1B2A] p-3 text-xs text-slate-200 leading-relaxed border border-[#1B3652]">
            {currentScenario.aiAction}
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>Score: <strong className="text-emerald-400">{currentScenario.payload.score}/100</strong></span>
            <span>Latency: <strong className="text-cyan-400">{currentScenario.latency}</strong></span>
          </div>
        </div>

        {/* Step 3: Execution & Sync */}
        <div
          className={`rounded-2xl border p-5 transition-all duration-300 ${
            step === 3 ? "border-emerald-500/40 bg-[#0E283A] text-white" : "border-slate-800 bg-[#0A1B2A]/50 opacity-50"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              03 · Execution & Sync
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-xs font-semibold text-white mb-2">Automated Outcome</p>
          <div className="rounded-xl bg-[#0A1B2A] p-3 text-xs text-slate-200 leading-relaxed border border-[#1B3652]">
            {currentScenario.outcome}
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {currentScenario.payload.syncedDestinations.map((dest) => (
              <span key={dest} className="text-[10px] px-2 py-0.5 rounded bg-[#142C44] text-slate-300 border border-[#1B3652]">
                ✓ {dest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer explanation */}
      <div className="mt-6 pt-5 border-t border-[#1B3652] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400" />
          <span>Zero hallucinations: Every decision follows strict customer guardrails and schema validation.</span>
        </div>
        <Button href="/consultation" variant="primary" size="sm">
          Discuss Custom Workflow Architecture
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
