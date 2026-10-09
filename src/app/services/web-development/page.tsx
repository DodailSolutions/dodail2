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
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Full-Stack Engineering</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Next.js Web Applications Built For Speed, Security & Search
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We build custom web software that delivers sub-second page loads, passes Core Web Vitals with flying colors, and converts visitors into committed clients.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Discuss Your Web Project
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Engineering Capabilities"
          title="Modern Architecture Stack"
          description="Crafted using Next.js 15, TypeScript, Tailwind CSS, Supabase PostgreSQL, and edge serverless infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Code2 className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>Custom Web Applications</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Customer portals, internal business dashboards, quotation engines, and high-conversion SaaS interfaces tailored to your exact business rules.
            </p>
          </Card>

          <Card>
            <Globe className="h-8 w-8 text-cyan-400 mb-4" />
            <CardTitle>Headless & E-Commerce Systems</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Ultra-fast headless Shopify, WooCommerce, and custom checkout flows engineered for instantaneous mobile checkout and zero cart latency.
            </p>
          </Card>

          <Card>
            <Server className="h-8 w-8 text-emerald-400 mb-4" />
            <CardTitle>Cloud APIs & Database Design</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Resilient PostgreSQL schemas, secure Supabase Auth, Row-Level Security, automated backups, and REST/GraphQL API development.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Have a software build or legacy redesign in mind?</h2>
        <div className="mt-6 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Book Engineering Scoping Session
          </Button>
        </div>
      </section>
    </div>
  );
}
