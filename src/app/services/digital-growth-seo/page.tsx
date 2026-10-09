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
    <div className="flex flex-col gap-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Generative Engine Optimization (GEO)</Badge>
        <h1 className="mt-5 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
          Rank On Google & Be Cited By <span className="text-[#FF6B2C]">Leading AI Engines</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          Modern buyers ask ChatGPT, Perplexity, and Google Gemini before purchasing. We engineer your brand to become the trusted, authoritative source AI cites.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Book Search & GEO Audit
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Request SEO Analysis
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          badge="Growth Pillars"
          title="Dual Optimization Strategy"
          description="Bridging technical on-page authority with modern AI citation architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
              <Sparkles className="h-6 w-6 text-[#FF6B2C]" />
            </div>
            <CardTitle>Generative Engine Optimization (GEO)</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              We structure your content schema, entity graphs, and topical authority clusters so AI models recognize and cite your business in generative search overviews.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-5">
              <Search className="h-6 w-6 text-teal-600" />
            </div>
            <CardTitle>Technical & Core Web Vitals SEO</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Eliminate crawl errors, optimize rendering budgets, fix indexing blocks, and achieve 95+ Lighthouse scores to maximize organic Google search ranking.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
              <MapPin className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle>Local SEO & Multi-Region Expansion</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Optimize Google Business Profiles, localized schema, and hyper-targeted landing pages for multi-branch clinics, real estate, and regional service leaders.
            </p>
          </Card>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-orange-50/20 p-10 sm:p-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Find out how your business currently ranks across AI search</h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-normal">
          Get a comprehensive audit identifying opportunities to increase search impressions and LLM citation frequency.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Request Comprehensive SEO / GEO Audit
          </Button>
        </div>
      </section>
    </div>
  );
}
