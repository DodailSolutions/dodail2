import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ShoppingBag, Stethoscope, ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Industry Solutions & Vertical Blueprints | Dodail Solutions",
  description:
    "Tailored AI automation, custom software, and digital growth systems designed specifically for healthcare clinics, real estate firms, and e-commerce brands.",
  alternates: {
    canonical: "/industries",
  },
};

const verticals = [
  {
    title: "Healthcare & Dental Clinics",
    slug: "/industries/dental",
    icon: Stethoscope,
    description: "Urgent patient triage, WhatsApp appointment booking, automated pre-intake forms, and Google Maps local SEO.",
    outcomes: ["Sub-2-minute emergency booking", "70% reduction in appointment no-shows", "Top-3 local Google Maps ranking"],
  },
  {
    title: "Real Estate Developers & Brokers",
    slug: "/industries/real-estate",
    icon: Building2,
    description: "Instant buyer qualification, budget filtering, WhatsApp property brochure delivery, and automated site visit scheduling.",
    outcomes: ["Zero delayed ad leads", "Sales advisors speak only to verified budgets", "Automated multi-channel CRM sync"],
  },
  {
    title: "E-Commerce & DTC Retail Brands",
    slug: "/industries/ecommerce",
    icon: ShoppingBag,
    description: "Headless Next.js storefronts, automated shipping & order tracking inquiries, and automated WhatsApp abandoned cart recovery.",
    outcomes: ["Under-500ms mobile page speeds", "60% reduction in order-status tickets", "Recovered cart conversion lifts"],
  },
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Vertical Blueprints</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Specialized Architectures For High-Impact Industries
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We don&apos;t apply one-size-fits-all templates. Each industry architecture addresses the specific operational frictions and conversion dynamics of your sector.
        </p>
      </section>

      <section className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {verticals.map((vert) => (
            <Card key={vert.slug} className="flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#FA5B0F]/10 text-[#FA5B0F] flex items-center justify-center mb-6 border border-[#FA5B0F]/20">
                  <vert.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{vert.title}</CardTitle>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {vert.description}
                </p>

                <div className="mt-6 pt-4 border-t border-[#1B3652] space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Outcomes</p>
                  {vert.outcomes.map((out) => (
                    <div key={out} className="flex items-center gap-2 text-xs text-slate-200">
                      <span className="text-emerald-400">✓</span>
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
    </div>
  );
}
