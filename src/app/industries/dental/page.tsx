import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, CheckCircle2, Clock, Calendar, ArrowRight, MessageSquare, ShieldCheck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Dental & Healthcare Clinic Automation | Dodail Solutions",
  description:
    "Automate dental clinic appointment booking, emergency patient triage via WhatsApp, automated reminders to eliminate no-shows, and local Google Maps SEO.",
  alternates: {
    canonical: "/industries/dental",
  },
};

export default function DentalIndustryPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Healthcare Automation</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Eliminate Empty Chairs & Automate Patient Appointments
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We help dental and medical clinics capture emergency patients 24/7, triage treatment urgency, and automate WhatsApp scheduling directly into doctor calendars.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book Clinic Automation Audit
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Clinic Workflows"
          title="The Complete Clinic Growth Engine"
          description="Designed to ease front-desk overload and guarantee patients receive immediate answers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Clock className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>24/7 Emergency Triage</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              When a patient messages at 10 PM with acute tooth pain, our conversational AI classifies symptoms, checks doctor emergency slots, and books an instant morning appointment.
            </p>
          </Card>

          <Card>
            <MessageSquare className="h-8 w-8 text-emerald-400 mb-4" />
            <CardTitle>WhatsApp Attendance Reminders</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Automated 24h and 2h WhatsApp reminders with interactive &quot;Confirm&quot; and &quot;Reschedule&quot; buttons reduce expensive no-shows by up to 70%.
            </p>
          </Card>

          <Card>
            <MapPin className="h-8 w-8 text-cyan-400 mb-4" />
            <CardTitle>Local Google Maps Dominance</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Rank in the top 3 on Google Maps for &quot;dentist near me&quot; and specific high-value treatments (implants, invisalign, root canals) with structured local schema.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to fill your clinic calendar?</h2>
        <div className="mt-6 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Schedule a Clinic Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}
