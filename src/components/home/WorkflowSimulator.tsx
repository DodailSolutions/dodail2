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
  Play,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface Scenario {
  id: string;
  tabLabel: string;
  industry: string;
  businessName: string;
  trigger: {
    channel: string;
    timestamp: string;
    rawText: string;
  };
  processing: {
    rule: string;
    validation: string;
    latency: string;
  };
  action: {
    actionText: string;
    destinations: { name: string; status: string }[];
  };
  outcome: {
    impact: string;
    metric: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: "healthcare",
    tabLabel: "Dental Clinic",
    industry: "Healthcare & Clinics",
    businessName: "Multi-Specialty Dental Center",
    trigger: {
      channel: "WhatsApp Business API Inbound",
      timestamp: "18:42 IST · Inbound Patient Message",
      rawText: "Severe toothache and gum swelling since morning. Need an appointment today before 8 PM.",
    },
    processing: {
      rule: "Acute triage rule #H-104: Emergency oral pain intent detected & prioritized",
      validation: "Doctor Dr. Rao buffer slot verified (19:15 available). Patient EHR matched.",
      latency: "280ms",
    },
    action: {
      actionText: "Emergency consultation locked. WhatsApp clinic pass with Google Maps route dispatched to patient.",
      destinations: [
        { name: "Clinic PostgreSQL Database", status: "Appointment Created (#9281)" },
        { name: "Doctor Google Calendar", status: "Slot Held (19:15 - 19:45)" },
        { name: "WhatsApp Cloud API", status: "Booking Pass Delivered" },
      ],
    },
    outcome: {
      impact: "Zero staff call time required. Patient arrived at clinic within 35 minutes.",
      metric: "100% automated triage during peak reception hours",
    },
  },
  {
    id: "realestate",
    tabLabel: "Real Estate",
    industry: "Property Development",
    businessName: "Luxury Villa Developer",
    trigger: {
      channel: "Meta Lead Ads Webhook",
      timestamp: "14:15 IST · Inbound Buyer Inquiry",
      rawText: "Looking for 4BHK Gated Villa in Kokapet / Financial District. Budget: ₹3.8 Cr. Planned purchase within 45 days.",
    },
    processing: {
      rule: "Lead scoring rule #RE-02: Budget threshold verified (>₹3.5 Cr, High Intent)",
      validation: "Phone number authenticated via WhatsApp API. CRM duplicate check clean.",
      latency: "340ms",
    },
    action: {
      actionText: "Tier-1 VIP route executed. Digital brochure and floorplans sent to buyer. Senior Sales Director notified.",
      destinations: [
        { name: "Salesforce CRM", status: "Lead Created (VIP Tier A)" },
        { name: "Sales Team Slack", status: "Instant Alert with Direct Dial" },
        { name: "WhatsApp Cloud API", status: "Interactive Brochure Delivered" },
      ],
    },
    outcome: {
      impact: "Response delivered in under 45 seconds while buyer is still actively browsing property details.",
      metric: "Sub-60s engagement vs industry 4-hour average",
    },
  },
  {
    id: "manufacturing",
    tabLabel: "Manufacturing",
    industry: "Precision Engineering",
    businessName: "Industrial Components Hub",
    trigger: {
      channel: "Vendor Portal Webhook",
      timestamp: "09:30 IST · Purchase Order PDF Received",
      rawText: "PO #IND-4421 attached: 5,000 units CNC machined shafts. Delivery required by 28th.",
    },
    processing: {
      rule: "PO parser & inventory match: Raw material stock verified at warehouse",
      validation: "Rate contract validated against vendor master sheet. Lead-time feasible.",
      latency: "310ms",
    },
    action: {
      actionText: "Production batch queued in ERP. Warehouse dispatch reservation locked. Vendor acknowledgement issued.",
      destinations: [
        { name: "ERP Database", status: "Batch Work Order #WO-8041 Created" },
        { name: "Warehouse WMS", status: "Material Reserved" },
        { name: "Vendor WhatsApp & Email", status: "PO Accepted & Delivery Confirmed" },
      ],
    },
    outcome: {
      impact: "Zero order-entry transcription errors. Production starts 24 hours earlier.",
      metric: "99.8% PO ingestion accuracy without paper forms",
    },
  },
  {
    id: "ecommerce",
    tabLabel: "E-Commerce",
    industry: "DTC & Retail Brands",
    businessName: "Apparel & Lifestyle Brand",
    trigger: {
      channel: "Storefront Webchat",
      timestamp: "21:04 IST · Customer Inquiry",
      rawText: "Order #DOD-8192 arrived yesterday but size M is too snug. Can I exchange for size L?",
    },
    processing: {
      rule: "Exchange policy check: Delivered within 7 days, eligible for instant size swap",
      validation: "Warehouse inventory queried: Size L in stock (14 units available at Hyderabad Hub).",
      latency: "195ms",
    },
    action: {
      actionText: "Size L held in warehouse. Pre-paid courier reverse pickup arranged for tomorrow afternoon.",
      destinations: [
        { name: "Shopify Orders API", status: "Exchange Order #DOD-8192-EX Drafted" },
        { name: "Logistics Courier API", status: "Reverse Pickup Slip Generated" },
        { name: "Customer WhatsApp", status: "Tracking & Return Label Delivered" },
      ],
    },
    outcome: {
      impact: "Customer receives instant resolution at 9 PM with zero support ticket overhead.",
      metric: "65% support ticket deflection rate",
    },
  },
];

export function WorkflowSimulator() {
  const [activeId, setActiveId] = React.useState("healthcare");
  const [isRunning, setIsRunning] = React.useState(false);
  const [stage, setStage] = React.useState<1 | 2 | 3 | 4>(4);

  const scenario = scenarios.find((s) => s.id === activeId) || scenarios[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    setIsRunning(true);
    setStage(1);

    setTimeout(() => {
      setStage(2);
    }, 280);

    setTimeout(() => {
      setStage(3);
    }, 560);

    setTimeout(() => {
      setStage(4);
      setIsRunning(false);
    }, 900);
  };

  return (
    <div className="rounded-none border border-[#1B3652] bg-[#0C2233] overflow-hidden shadow-2xl relative">
      {/* Registration Crosshairs */}
      <div className="absolute top-2 left-2 font-mono text-[10px] text-[#FF6B2C] pointer-events-none select-none">+</div>
      <div className="absolute top-2 right-2 font-mono text-[10px] text-[#27D3C2] pointer-events-none select-none">+</div>

      {/* Console Top Toolbar (Swiss Architectural Header) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-[#1B3652] bg-[#071A28] px-6 py-3.5 gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-[#FF6B2C]">
            SIM // 04-STAGE PIPELINE
          </span>
          <span className="font-mono text-xs text-[#AABAC8] border-l border-[#1B3652] pl-3 uppercase tracking-wider hidden sm:inline">
            Workflow Simulator
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] font-bold bg-[#FF6B2C] text-[#071A28] uppercase tracking-wider select-none">
            INTERACTIVE DEMO
          </span>
        </div>

        {/* Scenario Selectors (Swiss Tab Matrix) */}
        <div className="flex items-center border border-[#1B3652] bg-[#071A28] overflow-x-auto">
          {scenarios.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => handleSelect(sc.id)}
              disabled={isRunning}
              className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 transition-colors whitespace-nowrap select-none ${
                i > 0 ? "border-l border-[#1B3652]" : ""
              } ${
                activeId === sc.id
                  ? "bg-[#FF6B2C] text-[#071A28] font-bold"
                  : "bg-transparent text-[#AABAC8] hover:text-[#F5F8FC] hover:bg-[#10293B]"
              }`}
            >
              {sc.tabLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Console Viewport: 4-Stage Architectural Progression */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Step 1: TRIGGER */}
        <div className="rounded-none border border-[#1B3652] bg-[#071A28] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider mb-2 border-b border-[#1B3652] pb-2">
              <span className="text-[#FF6B2C] font-bold">01 / TRIGGER</span>
              <span className="h-1.5 w-1.5 bg-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-[#F5F8FC] mb-1">{scenario.businessName}</h4>
            <p className="text-[11px] text-[#27D3C2] font-mono mb-3">{scenario.trigger.channel}</p>

            <div className="rounded-none border border-[#1B3652] bg-[#0C2233] p-3 text-xs">
              <span className="text-[10px] font-mono text-[#AABAC8]/60 block mb-1">
                {scenario.trigger.timestamp}
              </span>
              <p className="text-xs text-[#F5F8FC]/90 italic font-sans leading-relaxed">
                &ldquo;{scenario.trigger.rawText}&rdquo;
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1B3652] text-[10px] font-mono text-[#AABAC8] uppercase tracking-wider">
            [+] Ingestion Webhook Validated
          </div>
        </div>

        {/* Step 2: INTELLIGENT PROCESSING */}
        <div
          className={`rounded-none border p-5 flex flex-col justify-between transition-all duration-200 ${
            stage >= 2
              ? "border-[#1B3652] bg-[#071A28]"
              : "border-[#1B3652]/40 bg-[#071A28]/40 opacity-40"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider mb-2 border-b border-[#1B3652] pb-2">
              <span className="text-[#27D3C2] font-bold">02 / PROCESSING</span>
              <span className="text-[10px] text-[#AABAC8] font-mono">{scenario.processing.latency}</span>
            </div>
            <h4 className="text-sm font-bold text-[#F5F8FC] mb-2">Deterministic Evaluation</h4>
            <p className="text-xs text-[#F5F8FC]/80 leading-relaxed font-sans mb-3">
              {scenario.processing.rule}
            </p>
            <div className="rounded-none border border-[#1B3652] bg-[#0C2233] p-3 text-xs font-mono text-[#27D3C2]">
              → {scenario.processing.validation}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1B3652] text-[10px] font-mono text-[#AABAC8] uppercase tracking-wider">
            [+] Zero-Hallucination Guardrail
          </div>
        </div>

        {/* Step 3: AUTOMATED ACTION */}
        <div
          className={`rounded-none border p-5 flex flex-col justify-between transition-all duration-200 ${
            stage >= 3
              ? "border-[#1B3652] bg-[#071A28]"
              : "border-[#1B3652]/40 bg-[#071A28]/40 opacity-40"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider mb-2 border-b border-[#1B3652] pb-2">
              <span className="text-[#FF6B2C] font-bold">03 / ACTION</span>
              <span className="text-emerald-400 font-mono text-[10px] uppercase">
                DISPATCHED
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#F5F8FC] mb-2">Cross-Platform Sync</h4>
            <p className="text-xs text-[#F5F8FC]/80 leading-relaxed font-sans mb-3">
              {scenario.action.actionText}
            </p>
            <div className="space-y-1.5">
              {scenario.action.destinations.map((dest, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-[10px] font-mono p-1.5 rounded-none bg-[#0C2233] border border-[#1B3652]"
                >
                  <span className="text-[#F5F8FC] truncate">{dest.name}</span>
                  <span className="text-emerald-400 font-medium ml-1 shrink-0">{dest.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1B3652] text-[10px] font-mono text-[#AABAC8] uppercase tracking-wider">
            [+] ACID Transaction Committed
          </div>
        </div>

        {/* Step 4: BUSINESS OUTCOME */}
        <div
          className={`rounded-none border p-5 flex flex-col justify-between transition-all duration-200 ${
            stage === 4
              ? "border-emerald-500/40 bg-[#071A28]"
              : "border-[#1B3652]/40 bg-[#071A28]/40 opacity-40"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider mb-2 border-b border-[#1B3652] pb-2">
              <span className="text-emerald-400 font-bold">04 / OUTCOME</span>
              <span className="text-[10px] text-emerald-400 font-mono">VERIFIED</span>
            </div>
            <h4 className="text-sm font-bold text-[#F5F8FC] mb-2">Measurable Impact</h4>
            <div className="rounded-none border border-emerald-500/30 bg-emerald-950/20 p-3 mb-3">
              <span className="text-xs font-bold text-emerald-400 block mb-1">
                {scenario.outcome.metric}
              </span>
              <p className="text-xs text-[#F5F8FC]/90 leading-relaxed font-light">
                {scenario.outcome.impact}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1B3652] text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <Check className="h-3 w-3" /> Live Production Telemetry
          </div>
        </div>
      </div>

      {/* Console Bottom Action Bar */}
      <div className="border-t border-[#1B3652] bg-[#071A28] px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#AABAC8] font-mono">
          ARCHITECTURE // POSTGRESQL STATE + DETERMINISTIC RUNTIME
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSelect(activeId)}
            disabled={isRunning}
            className="text-xs text-[#AABAC8] hover:text-[#F5F8FC] px-3.5 py-1.5 rounded-none border border-[#1B3652] bg-[#0C2233] hover:bg-[#1B3652] transition-colors flex items-center gap-1.5 font-mono uppercase tracking-wider"
          >
            <RefreshCw className={`h-3 w-3 ${isRunning ? "animate-spin" : ""}`} />
            Re-run Simulation
          </button>
          <Link
            href="/consultation"
            className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B2C] hover:text-[#F5F8FC] transition-colors flex items-center gap-1"
          >
            <span>[+] Design Custom Blueprint</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
