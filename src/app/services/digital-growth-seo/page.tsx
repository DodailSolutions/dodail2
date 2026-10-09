import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, CheckCircle2, Search, ArrowRight, Calendar, Sparkles, MapPin, Globe } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Digital Growth & GEO / SEO Services | Generative Engine Optimization",
  description:
    "Dominate search results across traditional Google Search and next-gen AI search engines (Perplexity, ChatGPT, Gemini) with technical SEO and GEO strategy.",
  alternates: {
    canonical: "/services/digital-growth-seo",
  },
};

export default function DigitalGrowthSEOPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Generative Engine Optimization (GEO)</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Rank On Google & Be Cited By Leading AI Engines
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Modern buyers ask ChatGPT, Perplexity, and Google Gemini before purchasing. We engineer your brand to become the trusted, authoritative source AI cites.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book Search & GEO Audit
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Growth Pillars"
          title="Dual Optimization Strategy"
          description="Bridging technical on-page authority with modern AI citation architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Sparkles className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>Generative Engine Optimization (GEO)</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              We structure your content schema, entity graphs, and topical authority clusters so AI models recognize and cite your business in generative search overviews.
            </p>
          </Card>

          <Card>
            <Search className="h-8 w-8 text-cyan-400 mb-4" />
            <CardTitle>Technical & Core Web Vitals SEO</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Eliminate crawl errors, optimize rendering budgets, fix indexing blocks, and achieve 95+ Lighthouse scores to maximize organic Google search ranking.
            </p>
          </Card>

          <Card>
            <MapPin className="h-8 w-8 text-emerald-400 mb-4" />
            <CardTitle>Local SEO & Multi-Region Expansion</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Optimize Google Business Profiles, localized schema, and hyper-targeted landing pages for multi-branch clinics, real estate, and regional service leaders.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Find out how your business currently ranks across AI search</h2>
        <div className="mt-6 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Request Comprehensive SEO / GEO Audit
          </Button>
        </div>
      </section>
    </div>
  );
}
