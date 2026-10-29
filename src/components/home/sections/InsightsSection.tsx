"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { SpotlightCard } from "../SpotlightCard";
import { Eyebrow, sectionPad } from "../homeUi";

const ARTICLES = [
  {
    tag: "AUTOMATION",
    tagColor: "bg-[#FF6B2C]/10 text-[#FF6B2C] border-[#FF6B2C]/20",
    title: "How AI Automation Can Save 10+ Hours Every Week",
    date: "Oct 12, 2026 · 5 min read",
    slug: "enterprise-whatsapp-automation-for-indian-e-commerce-returns",
  },
  {
    tag: "E-COMMERCE",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 light:bg-emerald-50 light:text-emerald-800 light:border-emerald-300",
    title: "Shopify vs WooCommerce: Which is Right for Your Business?",
    date: "Oct 8, 2026 · 6 min read",
    slug: "ai-agent-routing-vs-traditional-rule-engines-in-real-estate-inquiries",
  },
  {
    tag: "SEO",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20 light:bg-blue-50 light:text-blue-800 light:border-blue-300",
    title: "Local SEO Guide for Healthcare and Dental Clinics",
    date: "Oct 5, 2026 · 7 min read",
    slug: "dental-clinic-patient-retention-zero-no-show-whatsapp-reminders",
  },
];

export function InsightsSection() {
  return (
    <section aria-labelledby="insights-title" className={`relative ${sectionPad} bg-bg border-t border-border-token`}>
      <div className="mx-auto max-w-7xl">
        {/* Header with View All Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <Eyebrow>OUR LATEST INSIGHTS</Eyebrow>
            <h2 id="insights-title" className="section-title-clamp mt-4 text-fg">
              Guides, case studies and updates
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-token bg-[var(--surface-translucent)] hover:bg-[var(--surface-translucent-2)] hover:border-[#FF6B2C]/40 text-xs font-semibold text-fg transition group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF6B2C] group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((art, idx) => (
            <Link key={idx} href={`/blog/${art.slug}`} className="group block">
              <SpotlightCard
                spotlightColor="rgba(255, 107, 44, 0.1)"
                className="p-7 rounded-2xl bg-[var(--surface-translucent)] border border-border-token hover:border-[#FF6B2C]/40 flex flex-col justify-between h-full transition duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full border ${art.tagColor}`}>
                      {art.tag}
                    </span>
                    <span className="text-[11px] text-fg-muted font-mono">{art.date}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-fg group-hover:text-[#FF6B2C] transition leading-snug">
                    {art.title}
                  </h3>
                </div>

                <div className="pt-6 mt-6 border-t border-border-token flex items-center justify-between text-xs font-semibold text-fg-muted group-hover:text-fg transition">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 text-[#FF6B2C] group-hover:translate-x-1 transition" />
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
