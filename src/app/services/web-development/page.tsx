import type { Metadata } from "next";
import Link from "next/link";
import { Code2, CheckCircle2, Shield, Layers, ArrowRight, Calendar, Server, Smartphone, Globe } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Web & Software Engineering Services | Next.js & Full-Stack",
  description:
    "Custom full-stack web application development, Next.js architecture, headless e-commerce, and cloud APIs engineered for speed, SEO, and long-term scale.",
  alternates: {
    canonical: "/services/web-development",
  },
};

export default function WebDevelopmentPage() {
  return (
    <div className="flex flex-col gap-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Full-Stack Engineering</Badge>
        <h1 className="mt-5 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
          Next.js Web Applications Built For <span className="text-[#FF6B2C]">Speed, Security & Search</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          We build custom web software that delivers sub-second page loads, passes Core Web Vitals with flying colors, and converts visitors into committed clients.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Discuss Your Web Project
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Request Code Review
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          badge="Engineering Capabilities"
          title="Modern Architecture Stack"
          description="Crafted using Next.js 16, TypeScript, Tailwind CSS, Supabase PostgreSQL, and edge serverless infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
              <Code2 className="h-6 w-6 text-[#FF6B2C]" />
            </div>
            <CardTitle>Custom Web Applications</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Customer portals, internal business dashboards, quotation engines, and high-conversion SaaS interfaces tailored to your exact business rules.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-5">
              <Globe className="h-6 w-6 text-teal-600" />
            </div>
            <CardTitle>Headless & E-Commerce Systems</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Ultra-fast headless Shopify, WooCommerce, and custom checkout flows engineered for instantaneous mobile checkout and zero cart latency.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
              <Server className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle>Cloud APIs & Database Design</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Resilient PostgreSQL schemas, secure Supabase Auth, Row-Level Security, automated backups, and REST/GraphQL API development.
            </p>
          </Card>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-orange-50/20 p-10 sm:p-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Have a software build or legacy redesign in mind?</h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-normal">
          Talk to a senior technical architect about your tech stack, scope of work, and delivery roadmap.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Book Engineering Scoping Session
          </Button>
        </div>
      </section>
    </div>
  );
}
