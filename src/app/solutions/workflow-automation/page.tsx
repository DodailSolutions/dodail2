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
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Infrastructure & APIs</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Durable Workflow Automation That Never Drops a Transaction
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We replace brittle Zapier integrations with hardened, error-recovering serverless DAG pipelines backed by durable database queues.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book Workflow Audit
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Why Code Over No-Code"
          title="Engineered for Fault-Tolerant Reliability"
          description="The difference between a hobbyist Zapier script and an enterprise-grade pipeline."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Database className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>PostgreSQL-Backed Durability</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              If an external service like Google Sheets or Meta rate-limits your request, our job queue automatically backs off with exponential retry without losing a single record.
            </p>
          </Card>

          <Card>
            <Workflow className="h-8 w-8 text-cyan-400 mb-4" />
            <CardTitle>Bi-Directional State Synchronization</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Keep your operational spreadsheets, internal accounting tools, and external CRMs synchronized in real-time with conflict resolution and cryptographic HMAC verification.
            </p>
          </Card>

          <Card>
            <Zap className="h-8 w-8 text-amber-400 mb-4" />
            <CardTitle>Zero Per-Task Tax</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              No punitive per-task pricing tiers that penalize you as your business scales. Run millions of background transactions on modern, predictable cloud infrastructure.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Upgrade your backend plumbing today</h2>
        <div className="mt-6 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Discuss Your Integration Architecture
          </Button>
        </div>
      </section>
    </div>
  );
}
