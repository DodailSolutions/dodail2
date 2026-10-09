import type { Metadata } from "next";
import Link from "next/link";
import { Users, CheckCircle2, Clock, Zap, ArrowRight, Calendar, Filter, Database } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "AI Lead Management & Qualification | Dodail Solutions",
  description:
    "Capture, qualify, and triage inbound business leads in under 60 seconds with conversational AI, instant CRM sync, and automated calendar scheduling.",
  alternates: {
    canonical: "/solutions/ai-lead-management",
  },
};

export default function AILeadManagementPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Revenue Acceleration</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Never Lose a High-Value Lead to Slow Follow-Up Again
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Convert website visitors, WhatsApp inquiries, and ad traffic into booked calendar meetings in under 60 seconds with autonomous qualification.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book Lead Automation Demo
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="How It Works"
          title="The 3-Step Autonomous Lead Pipeline"
          description="From first click to calendar booking without human bottlenecks."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Zap className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>1. Instant Ingestion</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Catches inbound queries across your website forms, WhatsApp messages, LinkedIn ads, or Google Ads the exact millisecond they submit.
            </p>
          </Card>

          <Card>
            <Filter className="h-8 w-8 text-amber-400 mb-4" />
            <CardTitle>2. Intelligent Qualification</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Engages in natural language conversation to verify budget, timeline, company size, and specific requirement before routing to sales.
            </p>
          </Card>

          <Card>
            <Database className="h-8 w-8 text-emerald-400 mb-4" />
            <CardTitle>3. Instant CRM & Meeting Sync</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Pushes full enriched contact records into your CRM, dispatches a personalized calendar booking link, and sends a WhatsApp confirmation.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Stop letting qualified revenue sit in an unread inbox</h2>
        <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
          Let our solutions architects audit your current lead flow and deploy an automated qualification pilot.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Audit Your Lead Pipeline
          </Button>
        </div>
      </section>
    </div>
  );
}
