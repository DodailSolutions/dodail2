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
    <div className="flex flex-col gap-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Core Platform // v2.0</Badge>
        <h1 className="mt-5 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
          Autonomous AI Operations for <span className="text-[#FF6B2C]">Modern Business</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          We architect and deploy specialized AI agents connected directly to your existing databases, communication channels, and back-office tools.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Book AI Architecture Call
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Engineering Team
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Capabilities */}
      <section className="w-full">
        <SectionHeader
          badge="Platform Capabilities"
          title="What the Dodail AI Platform Powers"
          description="Built on Google Gemini API with structured tool-calling, PostgreSQL state management, and real-time event webhooks."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
              <Bot className="h-6 w-6 text-[#FF6B2C]" />
            </div>
            <CardTitle>Autonomous Multi-Agent Systems</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Orchestrate specialized agents for research, data extraction, invoice processing, and customer triage working collaboratively with shared state.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
              <Zap className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle>Sub-Second Decision Latency</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Edge-optimized execution pipelines that evaluate customer intent, validate schemas, and trigger external API actions in under 500 milliseconds.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle>Enterprise Security & Isolation</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Every tool call runs in an isolated sandbox with OAuth token encryption, cryptographic audit logging, and zero training on your proprietary data.
            </p>
          </Card>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="rounded-3xl border border-slate-200/90 bg-white p-8 lg:p-14 shadow-sm">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-wider block mb-2">
            CONNECTIVITY
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950">Seamless Ecosystem Integration</h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Connects out of the box with your vital business infrastructure without ripping and replacing your current software investments.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <p className="font-bold text-slate-900 text-sm">Google Workspace</p>
            <p className="text-xs text-slate-500 mt-1">Sheets, Calendar, Gmail</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <p className="font-bold text-slate-900 text-sm">Meta Graph API</p>
            <p className="text-xs text-slate-500 mt-1">WhatsApp Cloud & IG</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <p className="font-bold text-slate-900 text-sm">Payment Rails</p>
            <p className="text-xs text-slate-500 mt-1">Razorpay & Stripe</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <p className="font-bold text-slate-900 text-sm">Enterprise CRMs</p>
            <p className="text-xs text-slate-500 mt-1">Salesforce, HubSpot, Zoho</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-b from-white to-orange-50/30 border border-slate-200 p-10 sm:p-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Ready to automate your operations?</h2>
        <p className="mt-4 text-slate-600 max-w-xl mx-auto font-normal">
          Talk to a solutions architect to audit your current manual bottlenecks and receive a technical blueprint.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            Schedule a Feasibility Call
          </Button>
        </div>
      </section>
    </div>
  );
}
