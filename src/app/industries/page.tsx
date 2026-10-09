import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ShoppingBag, Stethoscope, Factory, ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Industry Solutions & Vertical Blueprints | Dodail Solutions",
  description:
    "Tailored AI automation, custom software, and digital growth systems designed specifically for healthcare clinics, real estate developers, e-commerce brands, and manufacturing plants.",
  alternates: {
    canonical: "/industries",
  },
};

const verticals = [
  {
    title: "Healthcare & Dental Clinics",
    slug: "/industries/dental",
    icon: Stethoscope,
    description: "Urgent patient triage, WhatsApp appointment booking, automated pre-intake forms, and local Google Maps search ranking.",
    outcomes: ["Sub-2-minute emergency booking", "70% reduction in appointment no-shows", "Top-3 local Google Maps ranking"],
    accent: "#0D9488",
  },
  {
    title: "Real Estate Developers & Brokers",
    slug: "/industries/real-estate",
    icon: Building2,
    description: "Instant buyer qualification, budget filtering, WhatsApp property brochure delivery, and automated site visit scheduling.",
    outcomes: ["Zero delayed ad leads", "Sales advisors speak only to verified budgets", "Automated multi-channel CRM sync"],
    accent: "#FF6B2C",
  },
  {
    title: "E-Commerce & DTC Retail Brands",
    slug: "/industries/ecommerce",
    icon: ShoppingBag,
    description: "Headless Next.js storefronts, automated shipping & order tracking inquiries, and automated WhatsApp abandoned cart recovery.",
    outcomes: ["Under-500ms mobile page speeds", "60% reduction in order-status tickets", "Recovered cart conversion lifts"],
    accent: "#10B981",
  },
  {
    title: "Manufacturing & Industrial Operations",
    slug: "/industries/manufacturing",
    icon: Factory,
    description: "Vendor quotation parsing, automated purchase order verification, machine maintenance schedules, and dispatch logistics tracking.",
    outcomes: ["Zero manual PO entry delays", "Real-time ERP inventory synchronization", "Automated carrier tracking links"],
    accent: "#F59E0B",
  },
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col gap-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="text-center max-w-4xl mx-auto">
        <Badge variant="orange">Vertical Blueprints</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">
          Specialized Architectures For High-Impact Industries
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We don&apos;t apply one-size-fits-all templates. Each industry architecture addresses the specific operational frictions, compliance standards, and conversion dynamics of your sector.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verticals.map((vert) => (
            <Card key={vert.slug} className="flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-orange-50 text-[#FF6B2C] flex items-center justify-center mb-6 border border-orange-200/60 shadow-sm">
                  <vert.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl text-slate-950">{vert.title}</CardTitle>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {vert.description}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Target Outcomes</p>
                  {vert.outcomes.map((out) => (
                    <div key={out} className="flex items-center gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button href={vert.slug} variant="primary" size="md" className="w-full">
                  Explore Blueprint Details
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 p-8 sm:p-12 text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Don&apos;t See Your Specific Industry Listed?
        </h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto">
          Our core integration engine connects any relational database, REST/GraphQL API, and customer communication channel. Schedule an architecture review for custom vertical workflows.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Book Architecture Scoping Call
          </Button>
        </div>
      </section>
    </div>
  );
}
