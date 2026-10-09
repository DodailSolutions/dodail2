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
    <div className="flex flex-col gap-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Real Estate Automation</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">
          Qualify High-Intent Buyers in 60 Seconds, Not 6 Hours
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Filter out window shoppers and connect your sales advisors exclusively with qualified buyers whose budgets and timelines match your inventory.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book Real Estate Blueprint Call
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl w-full">
        <SectionHeader
          badge="Real Estate Workflows"
          title="Engineered for Fast Property Conversions"
          description="Every lead from Facebook ads, portals, or Google Search handled immediately with precision."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="h-12 w-12 rounded-2xl bg-orange-50 text-[#FF6B2C] flex items-center justify-center mb-6 border border-orange-200/60 shadow-sm">
              <Filter className="h-6 w-6" />
            </div>
            <CardTitle>Autonomous Budget & BHK Triage</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Instantly prompts buyers for their budget range, BHK preference, and possession timeline. Flags qualified enterprise and luxury buyers for immediate senior agent callback.
            </p>
          </Card>

          <Card>
            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center mb-6 border border-teal-200/60 shadow-sm">
              <FileText className="h-6 w-6" />
            </div>
            <CardTitle>Instant WhatsApp Brochure Delivery</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Sends verified project floor plans, walk-through videos, and cost breakdowns directly via WhatsApp while buyer interest is peak.
            </p>
          </Card>

          <Card>
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200/60 shadow-sm">
              <Calendar className="h-6 w-6" />
            </div>
            <CardTitle>Automated Site Visit Booking</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Enables buyers to choose weekend site-visit slots, provides automated Google Maps directions, and notifies the project sales coordinator.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-5xl w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 p-8 sm:p-12 text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Protect Your Sales Team From Burnout
        </h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto">
          Equip your property development team with automated buyer triage. Never lose a high-net-worth prospect to slow follow-up again.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Schedule a Real Estate Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
