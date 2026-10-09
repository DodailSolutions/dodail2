"use client";

import * as React from "react";
import {
  Check,
  ChevronRight,
  Clock,
  Database,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Terminal,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Scenario {
  id: string;
  tabLabel: string;
  industry: string;
  businessName: string;
  eventInput: {
    channel: string;
    timestamp: string;
    rawText: string;
  };
  processing: {
    rule: string;
    validation: string;
    latency: string;
  };
  outcome: {
    action: string;
    destinations: { name: string; status: string }[];
    impact: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: "healthcare",
    tabLabel: "Dental Clinic",
    industry: "Healthcare & Clinics",
    businessName: "Multi-Specialty Dental Center",
    eventInput: {
      channel: "WhatsApp Business API",
      timestamp: "18:42 IST · Inbound Voice/Text",
      rawText: "Severe toothache and gum swelling since morning. Need an appointment today before 8 PM.",
    },
    processing: {
      rule: "Acute triage rule #H-104: Emergency oral pain intent flagged",
      validation: "Doctor Dr. Rao buffer slot verified (19:15 available). Patient record matched.",
      latency: "280ms",
    },
    outcome: {
      action: "Emergency consultation locked. WhatsApp pass with clinic navigation dispatched to patient.",
      destinations: [
        { name: "Clinic PostgreSQL Database", status: "Row Inserted (ID #9281)" },
        { name: "Doctor Google Calendar", status: "Slot Held (19:15 - 19:45)" },
        { name: "WhatsApp Cloud API", status: "Confirmation Delivered" },
      ],
      impact: "Zero staff call time required. Patient arrives at clinic in 30 minutes.",
    },
  },
  {
    id: "realestate",
    tabLabel: "Real Estate",
    industry: "Property Development",
    businessName: "Luxury Villa Developer",
    eventInput: {
      channel: "Meta Lead Ads Webhook",
      timestamp: "14:15 IST · Inbound Form",
      rawText: "Looking for 4BHK Gated Villa in Kokapet / Financial District. Budget: ₹3.8 Cr. Planned purchase within 45 days.",
    },
    processing: {
      rule: "Lead scoring rule #RE-02: Budget threshold verified (>₹3.5 Cr, High Intent)",
      validation: "Phone number authenticated via WhatsApp API. CRM duplicate check clean.",
      latency: "340ms",
    },
    outcome: {
      action: "Tier-1 VIP route executed. Digital brochure and floorplans sent to buyer. Senior Sales Director notified.",
      destinations: [
        { name: "Salesforce CRM", status: "Lead Created (VIP Tier A)" },
        { name: "Sales Team Slack", status: "Instant Alert with Direct Dial" },
        { name: "WhatsApp Cloud API", status: "Interactive Brochure Delivered" },
      ],
      impact: "Response delivered in under 45 seconds while buyer is still actively browsing.",
    },
  },
  {
    id: "ecommerce",
    tabLabel: "E-Commerce",
    industry: "DTC & Retail Brands",
    businessName: "Apparel & Lifestyle Brand",
    eventInput: {
      channel: "Storefront Webchat",
      timestamp: "21:04 IST · Customer Inquiry",
      rawText: "Order #DOD-8192 arrived yesterday but size M is too snug. Can I exchange for size L?",
    },
    processing: {
      rule: "Exchange policy check: Delivered within 7 days, eligible for instant size swap",
      validation: "Warehouse inventory queried: Size L in stock (14 units available at Hyderabad Hub).",
      latency: "195ms",
    },
    outcome: {
      action: "Size L held in warehouse. Pre-paid courier reverse pickup arranged for tomorrow afternoon.",
      destinations: [
        { name: "Shopify Orders API", status: "Exchange Order #DOD-8192-EX Drafted" },
        { name: "Logistics Courier API", status: "Reverse Pickup Slip Generated" },
        { name: "Customer Email & WhatsApp", status: "Tracking & Label Sent" },
      ],
      impact: "Customer receives instant resolution at 9 PM with zero support ticket overhead.",
    },
  },
  {
    id: "custom",
    tabLabel: "Custom Software",
    industry: "B2B Professional Services",
    businessName: "Consulting & Operations Firm",
    eventInput: {
      channel: "Client Portal Webhook",
      timestamp: "11:20 IST · Contract Signed",
      rawText: "Project Master Services Agreement electronically signed by Client CFO (Invoice #INV-2026-44).",
    },
    processing: {
      rule: "Contract execution flow: Cryptographic signature verified against audit trail",
      validation: "Payment milestone invoice generated. Client workspace provisioning triggered.",
      latency: "410ms",
    },
    outcome: {
      action: "Client workspace initialized, project Slack channel created, onboarding sequence dispatched.",
      destinations: [
        { name: "Stripe / Razorpay Engine", status: "Milestone Invoice Sent" },
        { name: "Supabase Database", status: "Account Upgraded to Active" },
        { name: "Google Workspace / Drive", status: "Secure Project Folder Shared" },
      ],
      impact: "Onboarding initiated immediately upon signature without manual coordination.",
    },
  },
];

export function WorkflowSimulator() {
  const [activeId, setActiveId] = React.useState("healthcare");
  const [isRunning, setIsRunning] = React.useState(false);
  const [stage, setStage] = React.useState<1 | 2 | 3>(3);

  const scenario = scenarios.find((s) => s.id === activeId) || scenarios[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    setIsRunning(true);
    setStage(1);

    setTimeout(() => {
      setStage(2);
    }, 380);

    setTimeout(() => {
      setStage(3);
      setIsRunning(false);
    }, 850);
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D14] overflow-hidden shadow-2xl">
      {/* Console Top Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-white/[0.08] bg-[#0E121B] px-5 py-3.5 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 border-l border-white/10 pl-3">
            Dodail Workflow Engine · Architecture Preview
          </span>
        </div>

        {/* Scenario Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelect(sc.id)}
              disabled={isRunning}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeId === sc.id
                  ? "bg-[#FA5B0F] text-white font-semibold"
                  : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {sc.tabLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Console Viewport */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Event Context & Trigger */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              <span>01 / Event Source</span>
              <span className="text-[#FA5B0F]">{scenario.industry}</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">{scenario.businessName}</h4>
            <p className="text-xs text-slate-400 font-mono mb-4">{scenario.eventInput.channel}</p>

            <div className="rounded-xl border border-white/[0.06] bg-[#07090E] p-4">
              <span className="text-[10px] font-mono text-slate-500 block mb-1">
                {scenario.eventInput.timestamp}
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
                &ldquo;{scenario.eventInput.rawText}&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-400 space-y-1">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Omni-channel webhook verified</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>TLS 1.3 encrypted payload</span>
            </p>
          </div>
        </div>

        {/* Center & Right Column: Pipeline Execution */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          {/* Step 2: Policy & Schema Validation */}
          <div
            className={`rounded-xl border p-5 transition-all duration-300 ${
              stage >= 2
                ? "border-white/[0.12] bg-[#0E131F]"
                : "border-white/[0.04] bg-[#0A0D14] opacity-40"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono text-[#FA5B0F] font-bold">
                02 / DETERMINISTIC RULE EVALUATION
              </span>
              <span className="font-mono text-slate-400 text-[11px]">
                Latency: <strong className="text-white">{scenario.processing.latency}</strong>
              </span>
            </div>
            <p className="text-xs font-semibold text-white mb-1.5">
              {scenario.processing.rule}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              → {scenario.processing.validation}
            </p>
          </div>

          {/* Step 3: Outbound Synchronization */}
          <div
            className={`rounded-xl border p-5 transition-all duration-300 ${
              stage === 3
                ? "border-emerald-500/30 bg-[#0B171A]"
                : "border-white/[0.04] bg-[#0A0D14] opacity-40"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono text-emerald-400 font-bold">
                03 / SYSTEM SYNCHRONIZATION
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Check className="h-3 w-3" /> Execution Complete
              </span>
            </div>
            <p className="text-xs text-slate-200 mb-3 font-sans">
              {scenario.outcome.action}
            </p>

            {/* Destination Ledger */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
              {scenario.outcome.destinations.map((dest, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-[11px] font-mono p-2 rounded-lg bg-black/30 border border-white/[0.04]"
                >
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {dest.name}
                  </span>
                  <span className="text-slate-500">{dest.status}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-emerald-300/90 font-medium flex items-center justify-between">
              <span>{scenario.outcome.impact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Console Bottom Action Bar */}
      <div className="border-t border-white/[0.08] bg-[#0E121B] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          Every Dodail system runs on PostgreSQL state stores with deterministic validation layers.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSelect(activeId)}
            disabled={isRunning}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/[0.05] transition-colors flex items-center gap-1.5 font-mono"
          >
            <RefreshCw className={`h-3 w-3 ${isRunning ? "animate-spin" : ""}`} />
            Re-run Scenario
          </button>
          <Link
            href="/consultation"
            className="text-xs font-semibold text-[#FA5B0F] hover:text-white transition-colors flex items-center gap-1"
          >
            Design Your Operations Blueprint <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
