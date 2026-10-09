import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Resources & Articles | AI Automation & Search Strategy",
  description:
    "Engineering insights, Generative Engine Optimization (GEO) guides, and automation architecture playbooks published by Dodail Solutions.",
  alternates: {
    canonical: "/blog",
  },
};

const verifiedArticles = [
  {
    title: "10 Must-Have Tools for Generative Engine Optimization (GEO)",
    category: "AI & Search",
    date: "August 2025",
    readTime: "6 min read",
    excerpt: "How forward-thinking brands analyze AI crawler citations, monitor Perplexity/ChatGPT visibility, and optimize entity coverage.",
    slug: "generative-engine-optimization-tools",
  },
  {
    title: "The Complete GEO Workflow for AI-Powered Content Strategies",
    category: "Search Strategy",
    date: "August 2025",
    readTime: "8 min read",
    excerpt: "A step-by-step technical framework for structuring semantic content clusters that search bots and LLMs reliably extract.",
    slug: "geo-workflow-ai-powered-content",
  },
  {
    title: "Schema Markup for GEO: Real Examples & Implementation Guide",
    category: "Technical SEO",
    date: "August 2025",
    readTime: "7 min read",
    excerpt: "Why standard JSON-LD is no longer enough and how nested Organization, Service, and FAQ schemas drive AI visibility.",
    slug: "schema-markup-for-geo-examples-how-to-use",
  },
  {
    title: "AI Digital Transformation Strategy: 7 Ways to Accelerate ROI",
    category: "Business Growth",
    date: "August 2025",
    readTime: "10 min read",
    excerpt: "Pragmatic guide for enterprise leaders seeking measurable cost reductions and lead velocity through custom AI workflows.",
    slug: "ai-digital-transformation-strategy-300-roi",
  },
  {
    title: "How to Build High-Yield Content Clusters for Generative Search",
    category: "Search Strategy",
    date: "August 2025",
    readTime: "5 min read",
    excerpt: "Structuring topic clusters and internal link architecture to cement domain authority across modern search engines.",
    slug: "how-to-build-powerful-content-clusters-using-geo",
  },
  {
    title: "Local SEO & WhatsApp Integration for High-Volume Clinics",
    category: "Healthcare",
    date: "July 2025",
    readTime: "6 min read",
    excerpt: "Case-backed playbooks for dental and medical clinics looking to eliminate empty appointment slots.",
    slug: "digital-marketing-for-dental-clinics-website-seo",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Knowledge Hub</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Architectural Insights & Growth Strategies
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Deep-dive guides on Generative Engine Optimization, autonomous workflows, and modern web software engineering.
        </p>
      </section>

      {/* CMS Notice Badge */}
      <div className="mx-auto max-w-3xl rounded-xl border border-[#1B3652] bg-[#0E2235]/60 p-4 text-center text-xs text-slate-400">
        <span>💡 <strong>CMS Notice:</strong> The full markdown blog studio and dynamic database publishing pipeline will be integrated in <strong>Phase 04</strong>. Below is the curated index of verified Dodail knowledge articles.</span>
      </div>

      <section className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {verifiedArticles.map((article) => (
            <Card key={article.slug} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="text-[#FA5B0F] font-semibold">{article.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <CardTitle className="text-xl hover:text-[#FA5B0F] transition-colors">
                  {article.title}
                </CardTitle>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1B3652] flex items-center justify-between">
                <span className="text-xs text-slate-400">{article.date}</span>
                <Link
                  href={`/contact?topic=${encodeURIComponent(article.title)}`}
                  className="text-xs font-semibold text-[#FA5B0F] hover:underline inline-flex items-center"
                >
                  Request Full Whitepaper <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
