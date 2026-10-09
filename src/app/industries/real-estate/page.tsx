import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CheckCircle2, Filter, Calendar, ArrowRight, FileText, Zap, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Real Estate Lead Qualification & Automation | Dodail Solutions",
  description:
    "Accelerate property sales. Instant buyer qualification, WhatsApp brochure delivery, and automated site visit scheduling for real estate developers and agencies.",
  alternates: {
    canonical: "/industries/real-estate",
  },
};

export default function RealEstateIndustryPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Real Estate Automation</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Qualify High-Intent Buyers in 60 Seconds, Not 6 Hours
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Filter out window shoppers and connect your sales advisors exclusively with qualified buyers whose budgets and timelines match your inventory.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book Real Estate Blueprint Call
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Real Estate Workflows"
          title="Engineered for Fast Property Conversions"
          description="Every lead from Facebook ads, 99acres, or Google Search handled immediately with precision."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Filter className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>Autonomous Budget & BHK Triage</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Instantly prompts buyers for their budget range, BHK preference, and possession timeline. Flags qualified enterprise/luxury buyers for immediate senior agent callback.
            </p>
          </Card>

          <Card>
            <FileText className="h-8 w-8 text-cyan-400 mb-4" />
            <CardTitle>Instant WhatsApp Brochure Delivery</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Sends verified project floor plans, walk-through videos, and cost breakdowns directly via WhatsApp while buyer interest is peak.
            </p>
          </Card>

          <Card>
            <Calendar className="h-8 w-8 text-emerald-400 mb-4" />
            <CardTitle>Automated Site Visit Booking</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Enables buyers to choose weekend site-visit slots, provides automated Google Maps directions, and notifies the project sales coordinator.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Protect your sales team from burnout</h2>
        <div className="mt-6 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Schedule a Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
