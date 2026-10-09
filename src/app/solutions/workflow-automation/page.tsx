import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, CheckCircle2, Layers, Zap, ArrowRight, Calendar, Workflow, Database } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Workflow Automation & System Integration | Dodail Solutions",
  description:
    "Replace fragile no-code connectors with resilient, PostgreSQL-backed asynchronous workflow pipelines, bi-directional API sync, and automated background jobs.",
  alternates: {
    canonical: "/solutions/workflow-automation",
  },
};

export default function WorkflowAutomationPage() {
  return (
    <div className="flex flex-col gap-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Infrastructure & APIs</Badge>
        <h1 className="mt-5 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
          Durable Workflow Automation That <span className="text-[#FF6B2C]">Never Drops a Transaction</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          We replace brittle Zapier integrations with hardened, error-recovering serverless DAG pipelines backed by durable database queues.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Book Workflow Audit
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Talk to an Engineer
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          badge="Why Code Over No-Code"
          title="Engineered for Fault-Tolerant Reliability"
          description="The difference between a fragile script and an enterprise-grade pipeline."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
              <Database className="h-6 w-6 text-[#FF6B2C]" />
            </div>
            <CardTitle>PostgreSQL-Backed Durability</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              If an external service like Google Sheets or Meta rate-limits your request, our job queue automatically backs off with exponential retry without losing a single record.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-5">
              <Workflow className="h-6 w-6 text-teal-600" />
            </div>
            <CardTitle>Bi-Directional State Synchronization</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Keep your operational spreadsheets, internal accounting tools, and external CRMs synchronized in real-time with conflict resolution and cryptographic HMAC verification.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
              <Zap className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle>Zero Per-Task Tax</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              No punitive per-task pricing tiers that penalize you as your business scales. Run millions of background transactions on modern, predictable cloud infrastructure.
            </p>
          </Card>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-orange-50/20 p-10 sm:p-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Upgrade your backend plumbing today</h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-normal">
          Consult with our systems engineers to architect resilient automation for your core company operations.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Discuss Your Integration Architecture
          </Button>
        </div>
      </section>
    </div>
  );
}
