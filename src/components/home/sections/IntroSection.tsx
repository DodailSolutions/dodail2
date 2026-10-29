import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Globe,
  MapPin,
  PenTool,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  Workflow,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { RichText } from "@/components/cms/RichText";
import { AboutParticleArt } from "@/components/3d/AboutParticleArt";
import { sectionPad } from "../homeUi";
import { useHomeContent } from "../HomeContentContext";
import { SpotlightCard } from "../SpotlightCard";

/** Pillar icons/colours by position; the pillar text comes from the CMS. */
const pillarStyles = [
  { Icon: PenTool, color: "#FA5B0F" },
  { Icon: Code2, color: "#27D3C2" },
  { Icon: Workflow, color: "#FFB547" },
];

const specialismIcons = {
  automation: { Icon: Workflow, color: "#FA5B0F" },
  web: { Icon: Globe, color: "#27D3C2" },
  commerce: { Icon: ShoppingBag, color: "#34D399" },
  marketing: { Icon: TrendingUp, color: "#FFB547" },
  apps: { Icon: Smartphone, color: "#8B7CFF" },
} as const;

const linkCls = "text-fg underline decoration-[#FA5B0F]/60 underline-offset-4 hover:decoration-[#FA5B0F] hover:text-[#FA5B0F] transition-colors";

/** "Who we are": Dodail's own positioning, the company facts, and what it specialises in. */
export function IntroSection(_props: { webgl: boolean }) {
  const { intro } = useHomeContent().content;
  const { image, specialisms } = intro;

  return (
    <section aria-labelledby="about-dodail" className={`relative ${sectionPad} border-t border-border-token bg-bg`}>
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-token bg-[var(--surface-translucent)] backdrop-blur-md mb-4 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-[#FA5B0F] animate-pulse" />
          <span className="text-xs font-mono font-medium uppercase tracking-[0.16em] text-[#FA5B0F]">
            {intro.badge}
          </span>
        </div>

        <h2 id="about-dodail" className="section-title-clamp max-w-4xl font-extrabold text-fg tracking-tight leading-[1.04]">
          {intro.title}{" "}
          {intro.highlight && (
            <span className="bg-gradient-to-r from-[#FA5B0F] via-[#FFB547] to-[#FA5B0F] light:from-[#FA5B0F] light:via-[#F97316] light:to-[#FA5B0F] bg-clip-text text-transparent">
              {intro.highlight}
            </span>
          )}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Story + 3 Pillars */}
          <div className="lg:col-span-7">
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-fg">{intro.lead}</p>
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-fg-muted">
              {intro.paragraphs.map((p, i) => (
                <p key={i}>
                  <RichText text={p} linkClassName={linkCls} />
                </p>
              ))}
            </div>

            {/* 3 Value Pillars */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border-token pt-8">
              {intro.pillars.map(({ title, desc, tag }, i) => {
                const { Icon, color } = pillarStyles[i % pillarStyles.length];
                return (
                  <SpotlightCard
                    key={title}
                    spotlightColor="rgba(250, 91, 15, 0.08)"
                    className="group relative rounded-2xl border border-border-token bg-surface p-5 transition-all duration-300 hover:border-border-token hover:bg-surface hover:shadow-lg"
                  >
                    <div
                      className="grid h-11 w-11 place-items-center rounded-xl transition-transform group-hover:scale-105"
                      style={{ background: `${color}1A`, color, boxShadow: `inset 0 0 0 1px ${color}33` }}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-fg group-hover:text-fg">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{desc}</p>
                    {/* Brand tint on dark; mixed toward navy on light so the small label stays readable. */}
                    <span
                      className="mt-3 inline-block font-mono text-[11px] font-medium tracking-wide text-[var(--pc)] light:text-[color-mix(in_srgb,var(--pc)_80%,#0F172A)]"
                      style={{ "--pc": color } as React.CSSProperties}
                    >
                      {tag}
                    </span>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>

          {/* Right Column: the Dodail HQ as a three.js particle picture + Figures */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <figure className="relative" aria-label={image.alt}>
              <div className="relative overflow-hidden rounded-3xl border border-border-token bg-gradient-to-b from-surface to-surface-2 shadow-xl shadow-slate-900/10">
                {/* Soft brand glow behind the building */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(250,91,15,0.14),rgba(39,211,194,0.06)_48%,transparent_72%)]"
                />

                {/* The art keeps its own aspect ratio, so the whole card width is picture (and the logo gets every pixel). */}
                <div className="relative w-full" style={{ aspectRatio: "696 / 638" }}>
                  <AboutParticleArt />
                  {image.badge && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-border-token bg-surface/90 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-[#FA5B0F] animate-pulse" />
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-fg">{image.badge}</span>
                    </div>
                  )}
                </div>

                {(image.quote || image.caption) && (
                  <div className="relative z-10 mx-4 mb-4 rounded-2xl border border-border-token bg-surface/90 p-3.5 backdrop-blur-md shadow-sm">
                    {image.quote && <p className="text-xs text-fg font-medium leading-snug">&ldquo;{image.quote}&rdquo;</p>}
                    {image.caption && (
                      <span className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-fg-muted">
                        <MapPin className="h-3 w-3 text-[#FA5B0F]" />
                        {image.caption}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </figure>

            {/* Stats Grid */}
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {intro.figures.map((f, i) => (
                <div
                  key={`${f.label}-${i}`}
                  className="relative overflow-hidden rounded-2xl border border-border-token bg-surface p-4 transition-all duration-300 hover:border-border-token hover:bg-surface"
                >
                  <dt className="text-xs text-fg-muted font-medium font-mono">{f.label}</dt>
                  <dd className="mt-1.5 text-2xl sm:text-3xl font-light font-mono tracking-tight text-fg">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Specialisms: Link cards into the detailed service pages */}
        <div className="mt-12 pt-10 border-t border-border-token">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-[0.16em] text-[#FA5B0F]">
                {specialisms.eyebrow}
              </h3>
              <p className="mt-1 text-2xl font-bold text-fg">{specialisms.title}</p>
            </div>
            {specialisms.linkLabel && (
              <Link
                href={specialisms.linkHref || "/consultation"}
                className="inline-flex min-h-11 items-center gap-2 text-xs font-mono uppercase tracking-wider text-fg-muted hover:text-[#FA5B0F] transition-colors"
              >
                <span>{specialisms.linkLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {specialisms.items.map((sp, idx) => {
              const { Icon, color } = specialismIcons[sp.icon] ?? specialismIcons.automation;
              return (
                <li key={`${sp.label}-${idx}`} className={idx === specialisms.items.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <Link
                    href={sp.href}
                    className="group block h-full"
                  >
                    <SpotlightCard
                      spotlightColor="rgba(250, 91, 15, 0.08)"
                      className="flex h-full flex-col rounded-2xl border border-border-token bg-surface p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-border-token group-hover:bg-surface group-hover:shadow-lg"
                    >
                      <span className="flex items-center justify-between">
                        <span
                          className="grid h-10 w-10 place-items-center rounded-xl transition-transform group-hover:scale-105"
                          style={{ background: `${color}1A`, color, boxShadow: `inset 0 0 0 1px ${color}33` }}
                          aria-hidden="true"
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowRight
                          className="h-4 w-4 -translate-x-1 text-fg-muted transition-all group-hover:translate-x-0 group-hover:text-[#FA5B0F]"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-5 text-base font-medium text-fg group-hover:text-fg">{sp.label}</span>
                      <span className="mt-1 text-sm leading-relaxed text-fg-muted">{sp.detail}</span>
                    </SpotlightCard>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
