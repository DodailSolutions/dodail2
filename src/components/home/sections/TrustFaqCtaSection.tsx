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
    <section id="why-dodail" aria-labelledby="why-title" className={`relative bg-[#0B0E13] ${sectionPad} pb-28 sm:pb-36`}>
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-[#FF6B2C]/[0.025] blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[400px] w-[500px] rounded-full bg-[#27D3C2]/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 id="why-title" className="section-title-clamp mt-4 text-[#F5F8FC]">
              {section.title}
            </h2>
          </div>
          <p className="lg:col-span-5 text-base sm:text-lg leading-relaxed text-[#A3AAB5]">
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
                <article
                  key={t.title}
                  className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#131722]/95 via-[#0F131C]/90 to-[#0A0D13]/95 p-7 sm:p-9 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(255,107,44,0.15)] sm:col-span-2 lg:col-span-2 lg:row-span-2"
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
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono tracking-wide"
                        style={{
                          background: `${color}14`,
                          color,
                          border: `1px solid ${color}33`,
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B2C] animate-pulse" />
                        {meta.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl sm:text-3xl font-normal tracking-tight text-[#F5F8FC]">
                      {t.title}
                    </h3>
                    <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#A3AAB5] max-w-2xl">
                      {t.desc}
                    </p>

                    {/* Unified Architecture Visual Showcase */}
                    <div className="my-7 rounded-2xl border border-white/10 bg-[#0A0D14]/80 p-5 sm:p-6 backdrop-blur-md relative overflow-hidden group/arch">
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20 blur-3xl transition-opacity group-hover/arch:opacity-35"
                        style={{ background: "#FF6B2C" }}
                      />
                      <div
                        className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full opacity-15 blur-3xl"
                        style={{ background: "#27D3C2" }}
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3 text-xs">
                        <div className="flex items-center gap-2 font-mono text-[#FF6B2C]">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B2C] opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B2C]" />
                          </span>
                          <span>DODAIL UNIFIED ARCHITECTURE</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#8C94A4]">
                          Shared Data Core · Zero Silos
                        </span>
                      </div>

                      {/* 4 Connected Pods */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-[#FF6B2C]/40 hover:bg-white/[0.04]">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#FF6B2C]/10 text-[#FF6B2C]">
                            <Workflow className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="text-xs font-medium text-[#F5F8FC]">AI Workflow Automation</div>
                            <div className="text-[11px] text-[#8C94A4]">Webhooks, LLM agents, error recovery</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-[#27D3C2]/40 hover:bg-white/[0.04]">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#27D3C2]/10 text-[#27D3C2]">
                            <Cpu className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="text-xs font-medium text-[#F5F8FC]">Custom Web & Software</div>
                            <div className="text-[11px] text-[#8C94A4]">Next.js, high-speed APIs, bespoke portals</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-[#8B7CFF]/40 hover:bg-white/[0.04]">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#8B7CFF]/10 text-[#8B7CFF]">
                            <Database className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="text-xs font-medium text-[#F5F8FC]">Unified Data & CRM</div>
                            <div className="text-[11px] text-[#8C94A4]">PostgreSQL, single source of truth</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-[#FFB547]/40 hover:bg-white/[0.04]">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#FFB547]/10 text-[#FFB547]">
                            <Zap className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="text-xs font-medium text-[#F5F8FC]">Growth & SEO Engine</div>
                            <div className="text-[11px] text-[#8C94A4]">Conversion funnels, dynamic schemas</div>
                          </div>
                        </div>
                      </div>

                      {/* Architecture banner */}
                      <div className="mt-3.5 flex items-center justify-between rounded-lg bg-emerald-500/[0.06] border border-emerald-500/20 px-3 py-1.5 text-[11px] text-emerald-400 font-mono">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Single engineering source:
                        </span>
                        <span>Zero vendor ping-pong · 100% shared context</span>
                      </div>
                    </div>
                  </div>

                  {/* Capabilities Pill Bar */}
                  <div className="mt-auto pt-5 border-t border-white/[0.08]">
                    <div className="mb-3 text-[11px] font-mono uppercase tracking-wider text-[#8C94A4]">
                      Specialized Capabilities Under One Roof
                    </div>
                    <ul className="flex flex-wrap gap-2" aria-label="Services delivered by one team">
                      {services.items.map((sv) => (
                        <li key={sv.id}>
                          <Link
                            href={sv.href}
                            className="group/pill inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-[#C9CED6] transition-all hover:border-[#FF6B2C] hover:bg-[#FF6B2C]/10 hover:text-white active:scale-95"
                          >
                            <span>{sv.title}</span>
                            <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 group-hover/pill:opacity-100 text-[#FF6B2C]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={t.title}
                className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#131722]/90 via-[#0F131C]/80 to-[#0A0D13]/90 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8)] ${
                  idx === trust.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Top glow line */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                />

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `${color}1A`,
                        color,
                        boxShadow: `inset 0 0 0 1px ${color}33`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-mono tracking-wide"
                      style={{
                        background: `${color}14`,
                        color,
                        border: `1px solid ${color}2E`,
                      }}
                    >
                      {meta.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg sm:text-xl font-normal tracking-tight text-[#F5F8FC]">
                    {t.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#A3AAB5]">
                    {t.desc}
                  </p>
                </div>

                {/* Highlights List */}
                {meta.highlights && meta.highlights.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-white/[0.06]">
                    <ul className="space-y-1.5 text-xs text-[#C9CED6]">
                      {meta.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ background: color }}
                          />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Polished Bottom Action Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#121620]/90 via-[#0E121A]/85 to-[#121620]/90 p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6B2C]">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Engineering Deliverables
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-normal text-[#F5F8FC]">
              Ready to see these commitments in live production?
            </h3>
            <p className="mt-1 text-sm text-[#A3AAB5] max-w-xl">
              Every project begins with a frank architecture discovery session to map your data and workflows before writing a single line of code.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-[#F5F8FC] hover:bg-white/[0.08] hover:border-white/20 transition-all"
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
    <section id="faq" aria-labelledby="faq-title" className={`relative bg-[#05070B] ${sectionPad}`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <Eyebrow tone="cyan">{faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="section-title-clamp mt-4 text-[#F5F8FC]">{faq.title}</h2>
        </div>
        <FAQAccordion items={faq.items} />
      </div>
    </section>
  );
}

export function CtaSection({ webgl }: { webgl: boolean }) {
  const { content, company } = useHomeContent();
  const { cta } = content;

  return (
    <section id="contact" aria-labelledby="cta-title" className="relative overflow-hidden px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
      {/* The whole section is the scene zone: nodes converge behind the call to action */}
      <Zone phase="cta" className="!absolute inset-0">
        <HeroParticlesSVG
          className={`absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 ${
            webgl ? "" : "!opacity-40"
          }`}
        />
      </Zone>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(5,7,11,0.72), rgba(5,7,11,0.25) 65%, transparent)" }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Eyebrow>{cta.eyebrow}</Eyebrow>
        <h2 id="cta-title" className="section-title-clamp mt-4 text-[#F5F8FC]">{cta.title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#C9CED6]">{cta.description}</p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {cta.primaryCta.label && (
            <Button href={cta.primaryCta.href || "/consultation"} variant="primary" size="lg" className={primaryBtn}>
              <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
              {cta.primaryCta.label}
            </Button>
          )}
          {cta.secondaryCta.label && (
            <Button href={cta.secondaryCta.href || "/contact"} variant="outline" size="lg" className={`${ghostBtn} bg-[#05070B]/60`}>
              {cta.secondaryCta.label}
            </Button>
          )}
        </div>

        <p className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#1C222B] pt-8 text-base text-[#A3AAB5]">
          <span className="font-semibold text-[#F5F8FC]">{company.name}</span>
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
