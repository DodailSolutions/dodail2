import type { Metadata } from "next";
import Link from "next/link";
import { Bot, CheckCircle2, Cpu, ArrowRight, Zap, Shield, Calendar, Database, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "AI Automation Platform | Autonomous Operations & Agents",
  description:
    "Deploy enterprise AI agents and autonomous workflows that orchestrate lead capture, CRM synchronization, and operational execution with strict guardrails.",
  alternates: {
    canonical: "/solutions/ai-automation",
  },
};

export default function AIAutomationPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Core Platform</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Autonomous AI Operations for Modern Business
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We architect and deploy specialized AI agents connected directly to your existing databases, communication channels, and back-office tools.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book AI Architecture Call
          </Button>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Platform Capabilities"
          title="What the Dodail AI Platform Powers"
          description="Built on Google Gemini 1.5/2.0 API with structured tool-calling, PostgreSQL state management, and real-time event webhooks."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Bot className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>Autonomous Multi-Agent Systems</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Orchestrate specialized agents for research, data extraction, invoice processing, and customer triage working collaboratively with shared state.
            </p>
          </Card>

          <Card>
            <Zap className="h-8 w-8 text-amber-400 mb-4" />
            <CardTitle>Sub-Second Decision Latency</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Edge-optimized execution pipelines that evaluate customer intent, validate schemas, and trigger external API actions in under 500 milliseconds.
            </p>
          </Card>

          <Card>
            <Shield className="h-8 w-8 text-emerald-400 mb-4" />
            <CardTitle>Enterprise Security & Isolation</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Every tool call runs in an isolated sandbox with OAuth token encryption, cryptographic audit logging, and zero training on your proprietary data.
            </p>
          </Card>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="mx-auto max-w-5xl rounded-3xl border border-[#1B3652] bg-[#0E2235]/80 p-8 lg:p-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Seamless Ecosystem Integration</h2>
          <p className="mt-3 text-sm text-slate-300">
            Connects out of the box with your vital business infrastructure without ripping and replacing your current software investments.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-[#142C44] border border-[#1B3652]">
            <p className="font-bold text-white text-sm">Google Workspace</p>
            <p className="text-[11px] text-slate-400 mt-1">Sheets, Calendar, Gmail</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#142C44] border border-[#1B3652]">
            <p className="font-bold text-white text-sm">Meta Graph API</p>
            <p className="text-[11px] text-slate-400 mt-1">WhatsApp Cloud & IG</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#142C44] border border-[#1B3652]">
            <p className="font-bold text-white text-sm">Payment Rails</p>
            <p className="text-[11px] text-slate-400 mt-1">Razorpay & Stripe</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#142C44] border border-[#1B3652]">
            <p className="font-bold text-white text-sm">Enterprise CRMs</p>
            <p className="text-[11px] text-slate-400 mt-1">Salesforce, HubSpot, Zoho</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-white">Ready to automate your operations?</h2>
        <div className="mt-6 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            Schedule a Feasibility Call
          </Button>
        </div>
      </section>
    </div>
  );
}
