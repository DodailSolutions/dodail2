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
    <div className="flex flex-col gap-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Revenue Acceleration</Badge>
        <h1 className="mt-5 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
          Never Lose a High-Value Lead to <span className="text-[#FF6B2C]">Slow Follow-Up</span> Again
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          Convert website visitors, WhatsApp inquiries, and ad traffic into booked calendar meetings in under 60 seconds with autonomous qualification.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Book Lead Automation Demo
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Talk to an Engineer
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          badge="How It Works"
          title="The 3-Step Autonomous Lead Pipeline"
          description="From first click to calendar booking without human bottlenecks."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
              <Zap className="h-6 w-6 text-[#FF6B2C]" />
            </div>
            <CardTitle>1. Instant Ingestion</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Catches inbound queries across your website forms, WhatsApp messages, LinkedIn ads, or Google Ads the exact millisecond they submit.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
              <Filter className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle>2. Intelligent Qualification</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Engages in natural language conversation to verify budget, timeline, company size, and specific requirement before routing to sales.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
              <Database className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle>3. Instant CRM & Meeting Sync</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Pushes full enriched contact records into your CRM, dispatches a personalized calendar booking link, and sends a WhatsApp confirmation.
            </p>
          </Card>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-orange-50/20 p-10 sm:p-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Stop letting qualified revenue sit in an unread inbox</h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-normal">
          Let our solutions architects audit your current lead flow and deploy an automated qualification pilot.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Audit Your Lead Pipeline
          </Button>
        </div>
      </section>
    </div>
  );
}
