import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Cpu,
  Database,
  KeyRound,
  Layers,
  ListChecks,
  Plug,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroParticlesSVG } from "@/components/3d/CanvasFallback";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { Eyebrow, Zone, ghostBtn, primaryBtn, sectionPad } from "../homeUi";
import { telHref, useHomeContent } from "../HomeContentContext";
import { SpotlightCard } from "../SpotlightCard";

const trustMeta: Record<
  string,
  {
    Icon: React.ComponentType<{ className?: string }>;
    color: string;
    badge: string;
    tagline: string;
    highlights: string[];
  }
> = {
  team: {
    Icon: Layers,
    color: "#FF6B2C",
    badge: "Unified Delivery",
    tagline: "Zero Hand-Off Silos",
    highlights: ["Single Engineering Core", "Unified Database & Schemas", "Direct Founder & Lead Accountability"],
  },
  ownership: {
    Icon: KeyRound,
    color: "#27D3C2",
    badge: "100% Client IP",
    tagline: "Zero Vendor Lock-In",
    highlights: ["Full Git Repository Rights", "Direct Keys & Cloud Credentials", "Portable PostgreSQL Schemas"],
  },
  tools: {
    Icon: Plug,
    color: "#FF6B2C",
    badge: "50+ Ecosystem Connectors",
    tagline: "Zero Rip-and-Replace",
    highlights: ["WhatsApp Cloud API", "Google Sheets & Enterprise Drive", "Custom CRMs, Shopify & Stripe"],
  },
  data: {
    Icon: ShieldCheck,
    color: "#27D3C2",
    badge: "Zero-Trust Security",
    tagline: "Enterprise Grade",
    highlights: ["TLS 1.3 & At-Rest AES-256", "Granular Row-Level Security (RLS)", "Zero LLM Training on Your Data"],
  },
  process: {
    Icon: ListChecks,
    color: "#8B7CFF",
    badge: "Milestone-Gated",
    tagline: "5-Stage Delivery Gate",
    highlights: ["Documented Architecture Before Code", "Sandbox Testing Before Live Traffic", "Production Audit Logging"],
  },
  people: {
    Icon: UserCheck,
    color: "#FFB547",
    badge: "Human-in-the-Loop",
    tagline: "Rule-Guided Automation",
    highlights: ["Strict Deterministic Guardrails", "Instant Escalation on Ambiguity", "Full Activity & Override Logs"],
  },
};

export function TrustSection() {
  const { trust: section, services } = useHomeContent().content;
  const trust = section.items;

  return (
    <section id="why-dodail" aria-labelledby="why-title" className={`relative bg-surface ${sectionPad} pb-28 sm:pb-36`}>
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-[#FF6B2C]/[0.035] blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[400px] w-[500px] rounded-full bg-[#27D3C2]/[0.025] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 id="why-title" className="section-title-clamp mt-4 text-fg">
              {section.title}
            </h2>
          </div>
          <p className="lg:col-span-5 text-base sm:text-lg leading-relaxed text-fg-muted">
            {section.description}
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trust.map((t, idx) => {
            const meta = trustMeta[t.icon] || {
              Icon: Layers,
              color: "#FF6B2C",
              badge: "Core Commitment",
              tagline: "Engineering Principle",
              highlights: [],
            };
            const { Icon, color } = meta;
            const featured = t.featured;

            if (featured) {
              return (
                <SpotlightCard
                  key={t.title}
                  spotlightColor="rgba(255, 107, 44, 0.12)"
                  className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border-token bg-gradient-to-b from-[var(--surface)] via-[var(--surface)] to-[var(--surface)] p-7 sm:p-9 backdrop-blur-xl transition-all duration-300 hover:border-border-token hover:shadow-[0_20px_50px_-15px_rgba(255,107,44,0.15)] sm:col-span-2 lg:col-span-2 lg:row-span-2"
                >
                  {/* Subtle top accent gradient */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-8 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  />

                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span
                          className="grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                          style={{
                            background: `${color}1A`,
                            color,
                            boxShadow: `inset 0 0 0 1px ${color}33`,
                          }}
                          aria-hidden="true"
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B2C]">
                          {meta.tagline}
                        </span>
                      </div>

                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono tracking-wide text-[var(--pc)] light:text-[color-mix(in_srgb,var(--pc)_80%,#0F172A)]"
                        style={{
                          "--pc": color,
                          background: `${color}14`,
                          border: `1px solid ${color}33`,
                        } as React.CSSProperties}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B2C] animate-pulse" />
                        {meta.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl sm:text-3xl font-normal tracking-tight text-fg">
                      {t.title}
                    </h3>
                    <p className="mt-3 text-base sm:text-lg leading-relaxed text-fg-muted max-w-2xl">
                      {t.desc}
                    </p>

                    {/* Unified Architecture Visual Showcase */}
                    <div className="my-7 rounded-2xl border border-border-token bg-surface p-5 sm:p-6 backdrop-blur-md relative overflow-hidden group/arch">
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20 blur-3xl transition-opacity group-hover/arch:opacity-35"
                        style={{ background: "#FF6B2C" }}
                      />
                      <div
                        className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full opacity-15 blur-3xl"
                        style={{ background: "#27D3C2" }}
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-token pb-3 text-xs">
                        <div className="flex items-center gap-2 font-mono text-[#FF6B2C]">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B2C] opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B2C]" />
                          </span>
                          <span>DODAIL UNIFIED ARCHITECTURE</span>
                        </div>
                        <span className="text-[11px] font-mono text-fg-muted">
                          Shared Data Core · Zero Silos
                        </span>
                      </div>

                      {/* 4 Connected Pods */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {services.items.slice(0, 4).map((s, i) => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between rounded-xl border border-border-token bg-[var(--surface-translucent)] p-3 text-xs transition-colors hover:border-border-token"
                          >
                            <span className="font-medium text-fg">{s.title}</span>
                            <span className="font-mono text-fg-muted">Pod 0{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="mt-4 border-t border-border-token pt-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-fg-muted">
                      {meta.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF6B2C] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              );
            }

            return (
              <SpotlightCard
                key={t.title}
                spotlightColor="rgba(255, 107, 44, 0.08)"
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border-token bg-surface p-7 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-border-token hover:bg-surface"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{
                        background: `${color}1A`,
                        color,
                        boxShadow: `inset 0 0 0 1px ${color}33`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-fg-muted">
                      {meta.tagline}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-normal tracking-tight text-fg">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {t.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-border-token pt-4">
                  <ul className="space-y-2 text-xs text-fg-muted">
                    {meta.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-2xl border border-border-token bg-gradient-to-r from-[var(--surface)] to-[var(--surface)] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6B2C] mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Engineering Deliverables
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-normal text-fg">
              Ready to see these commitments in live production?
            </h3>
            <p className="mt-1 text-sm text-fg-muted max-w-xl">
              Every project begins with a frank architecture discovery session to map your data and workflows before writing a single line of code.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-xl border border-border-token bg-[var(--surface-translucent)] px-4 py-2.5 text-sm font-medium text-fg hover:bg-[var(--surface-translucent-2)] hover:border-border-token transition-all"
            >
              Explore our work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B2C] to-[#ff8548] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6B2C]/25 hover:brightness-110 transition-all active:scale-95"
            >
              <Calendar className="h-4 w-4" />
              Schedule discovery call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const { faq } = useHomeContent().content;
  if (faq.items.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-title" className={`relative bg-bg ${sectionPad}`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <Eyebrow tone="cyan">{faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="section-title-clamp mt-4 text-fg">{faq.title}</h2>
        </div>
        <FAQAccordion items={faq.items} />
      </div>
    </section>
  );
}

export function CtaSection({ webgl }: { webgl: boolean }) {
  const { content, company } = useHomeContent();
  const { cta } = content;

  const ctaMetrics = [
    { label: "More Leads", value: "3x" },
    { label: "Faster Lead Response", value: "9x" },
    { label: "Time Saved", value: "70%" },
    { label: "Revenue Growth", value: "2.5x" },
  ];

  return (
    <section id="contact" aria-labelledby="cta-title" className="relative overflow-hidden px-5 sm:px-8 lg:px-12 py-16 sm:py-24 bg-bg">
      <div className="relative mx-auto max-w-7xl">
        {/* Large Rounded CTA Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[#FF6B2C]/30 bg-surface p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Ambient Lighting Orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#FF6B2C]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#FF6B2C]/20 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 id="cta-title" className="text-3xl sm:text-5xl font-bold tracking-tight text-fg leading-tight">
                Ready to build a smarter, faster, more profitable business?
              </h2>
              <p className="text-base sm:text-lg text-fg-muted leading-relaxed max-w-xl">
                Book a free consultation with our team and get a clear plan on how we can help you with AI, automation and custom software.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  href="/consultation"
                  variant="primary"
                  size="lg"
                  className="rounded-full bg-[#FF6B2C] hover:bg-[#E8541A] text-white px-8 py-4 font-semibold shadow-xl shadow-[#FF6B2C]/20 transition-all hover:scale-105"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="rounded-full border border-border-token bg-[var(--surface-translucent)] hover:bg-[var(--surface-translucent-2)] text-fg px-7 py-4 font-semibold transition"
                >
                  Send a Message
                </Button>
              </div>
            </div>

            {/* Right Column: 4 Metric Badges */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              {ctaMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[var(--surface-translucent-2)] border border-[#FF6B2C]/20 backdrop-blur-md flex flex-col justify-center items-center text-center space-y-1 hover:border-[#FF6B2C]/40 transition"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#FF6B2C]">
                    {m.value}
                  </span>
                  <span className="text-xs text-fg-muted font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal & Location Bar */}
        <p className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border-token pt-8 text-xs text-fg-muted">
          <span className="font-semibold text-fg">{company.name}</span>
          <span>
            {company.city}, {company.region}, {company.country}
          </span>
          {company.phone && (
            <a href={telHref(company.phone)} className="underline underline-offset-4 hover:text-[#FF6B2C]">
              {company.phone}
            </a>
          )}
          {company.email && (
            <a href={`mailto:${company.email}`} className="underline underline-offset-4 hover:text-[#FF6B2C]">
              {company.email}
            </a>
          )}
        </p>
      </div>
    </section>
  );
}
