import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Code, CheckCircle2, TrendingUp, Layers, Bot } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Case Studies & Work Portfolio | Dodail Solutions",
  description:
    "Explore verified implementation blueprints, real automation architectures, and digital systems engineered by Dodail Solutions.",
  alternates: {
    canonical: "/work",
  },
};

const caseStudies = [
  {
    title: "Autonomous Dental Clinic Patient Triage & Appointment Engine",
    clientSector: "Healthcare & Dental (Hyderabad, India)",
    problem: "Clinic front-desk was overwhelmed with after-hours WhatsApp inquiries and suffered high appointment no-show rates (~28%).",
    architecture: "Integrated WhatsApp Cloud API with Google Calendar via Supabase PostgreSQL state engine, delivering 24/7 symptom triage and automated attendance confirmations.",
    outcomeVerified: "Emergency inquiries addressed in <2 minutes; appointment no-shows dropped by ~70% over 90 days.",
    techStack: ["Next.js 16", "Supabase PostgreSQL", "WhatsApp Cloud API", "Google Calendar API"],
  },
  {
    title: "High-Intent Real Estate Lead Qualification & Broker Dispatch",
    clientSector: "Commercial & Residential Developers",
    problem: "Sales team spent 4+ hours daily filtering unqualified portal leads with mismatched budgets and distant timelines.",
    architecture: "Deployed multi-step conversational lead qualification form with instant SMS/WhatsApp brochure delivery and priority routing for verified HNI buyers.",
    outcomeVerified: "Immediate qualification under 60 seconds; sales team conversion efficiency increased by 3.2x.",
    techStack: ["Next.js", "Gemini Evaluator", "PostgreSQL", "Twilio SMS", "Salesforce API"],
  },
  {
    title: "Generative Engine Optimization (GEO) & Technical Search Migration",
    clientSector: "B2B Professional Services",
    problem: "Traditional organic traffic stalled due to changing Google AI overviews and slow legacy CMS mobile rendering.",
    architecture: "Engineered headless Next.js App Router architecture, implemented structured JSON-LD entity graphs, and created high-authority topical clusters.",
    outcomeVerified: "Achieved 98/100 Lighthouse performance and multiple direct citations in Perplexity and Google AI Overviews.",
    techStack: ["Next.js 16", "Schema.org Graphs", "Cloudflare Edge", "Tailwind CSS"],
  },
];

export default function WorkPage() {
  return (
    <div className="flex flex-col gap-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Verified Work</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">
          Real Engineering. Measurable Outcomes.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We pride ourselves on transparent, verifiable case studies. No exaggerated marketing claims—just clean software architecture and business metrics that move the needle.
        </p>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 w-full">
        {caseStudies.map((cs, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 hover:border-[#FF6B2C] transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase">
                {cs.clientSector}
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Verified Implementation
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-950 mb-4">
              {cs.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  The Friction
                </p>
                <p>{cs.problem}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  The Architecture
                </p>
                <p>{cs.architecture}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50/70 p-5 border border-emerald-200/70 mb-6">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1 font-mono">
                Measured Outcome
              </p>
              <p className="text-sm font-semibold text-emerald-950">{cs.outcomeVerified}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap gap-1.5">
                {cs.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Button href="/consultation" variant="ghost" size="sm">
                Discuss Similar Architecture <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 p-8 sm:p-12 text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Have a Specific Technical Problem to Solve?</h2>
        <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
          Book an engineering scoping call with our core technical architects to map your current bottlenecks.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Book Architecture Scoping
          </Button>
        </div>
      </section>
    </div>
  );
}
