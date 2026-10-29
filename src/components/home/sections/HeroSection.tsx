"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  Cpu,
  Users,
  BarChart3,
  Code2,
  TrendingUp,
  Play,
  Building2,
  Target,
  Globe2,
  Stethoscope,
  Factory,
  ShoppingBag,
  GraduationCap,
  Plane,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroParticlesSVG } from "@/components/3d/CanvasFallback";
import { HighlightedText } from "@/components/cms/RichText";
import { Zone, ghostBtn, primaryBtn } from "../homeUi";
import { useHomeContent } from "../HomeContentContext";

export function HeroSection({ webgl }: { webgl: boolean }) {
  const { hero } = useHomeContent().content;
  const [mouseSpot, setMouseSpot] = React.useState({ x: 60, y: 40 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMouseSpot({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const telemetryBadges = [
    {
      label: "Leads & Enquiries",
      sub: "Auto-Ingest",
      icon: MessageSquare,
      pos: "top-8 sm:top-10 left-3 sm:left-8",
      delay: "0s",
      dot: "bg-[#FA5B0F]",
    },
    {
      label: "Automations",
      sub: "Active",
      icon: Cpu,
      pos: "top-6 sm:top-8 right-3 sm:right-8",
      delay: "0.8s",
      dot: "bg-[#27D3C2]",
    },
    {
      label: "CRM & Follow-Up",
      sub: "Synced",
      icon: Users,
      pos: "top-1/2 -translate-y-10 left-1 sm:left-4",
      delay: "1.6s",
      dot: "bg-indigo-400",
    },
    {
      label: "Payment & Reports",
      sub: "Live",
      icon: BarChart3,
      pos: "top-1/2 -translate-y-6 right-1 sm:right-4",
      delay: "1.2s",
      dot: "bg-[#FA5B0F]",
    },
    {
      label: "Websites & Apps",
      sub: "Fast",
      icon: Code2,
      pos: "bottom-12 sm:bottom-16 left-4 sm:left-10",
      delay: "2.0s",
      dot: "bg-[#27D3C2]",
    },
    {
      label: "Business Growth",
      sub: "+42%",
      icon: TrendingUp,
      pos: "bottom-8 sm:bottom-12 right-4 sm:right-10",
      delay: "0.4s",
      dot: "bg-[#FA5B0F]",
    },
  ];

  const industriesStrip = [
    { label: "Healthcare", icon: Stethoscope },
    { label: "Real Estate", icon: Building2 },
    { label: "Manufacturing", icon: Factory },
    { label: "E-Commerce", icon: ShoppingBag },
    { label: "Education", icon: GraduationCap },
    { label: "Travel & Hospitality", icon: Plane },
    { label: "Professional Services", icon: Briefcase },
  ];

  return (
    <section
      aria-label="Introduction"
      onPointerMove={onPointerMove}
      className="relative overflow-hidden px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-12 lg:min-h-[calc(100svh-4.5rem)] flex flex-col justify-center"
    >
      {/* Dynamic Ambient Mouse Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(720px circle at ${mouseSpot.x}% ${mouseSpot.y}%, rgba(250, 91, 15,0.12), rgba(39,211,194,0.035) 40%, transparent 75%)`,
        }}
      />
      {/* Atmosphere Base Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 65% at 75% 45%, rgba(250, 91, 15,0.1), transparent 70%), radial-gradient(circle at 10% 25%, rgba(39,211,194,0.05), transparent 45%)",
        }}
      />

      {/* Main Grid */}
      <div className="relative mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Column: Hero Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 relative z-10 max-w-2xl"
        >
          {/* Eyebrow Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-translucent)] border border-border-token backdrop-blur-md shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#FA5B0F] shadow-[0_0_8px_#FA5B0F] animate-pulse" />
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-fg-muted">
                {hero.eyebrow}
              </span>
            </div>
          </motion.div>

          {/* Staggered H1 with Highlight */}
          <motion.h1 variants={itemVariants} className="text-fg">
            <span className="hero-title-clamp mt-1 block font-bold tracking-tight">
              <HighlightedText
                text={hero.title}
                highlight={hero.highlight}
                render={(part) => (
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FA5B0F] via-[#FF8547] to-[#FFA366] light:to-[#F2640F] light:via-[#F9701A] drop-shadow-[0_0_24px_rgba(250,91,15,0.3)]">
                    {part}
                  </span>
                )}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-fg-muted"
          >
            {hero.description}
          </motion.p>

          {/* Dual CTAs */}
          <motion.div variants={itemVariants} className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {hero.primaryCta.label && (
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FA5B0F] to-[#FF9E58] opacity-70 blur-xs group-hover:opacity-100 transition duration-300 group-hover:scale-105" />
                <Button
                  href={hero.primaryCta.href || "/consultation"}
                  variant="primary"
                  className={`relative ${primaryBtn} shadow-lg px-6 py-2.5 text-sm font-semibold flex w-full items-center justify-center gap-2 overflow-hidden sm:w-auto`}
                >
                  <span className="relative z-10">{hero.primaryCta.label}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent skew-x-12" />
                </Button>
              </div>
            )}
            <Button
              href="/about"
              variant="outline"
              className={`${ghostBtn} group transition-all duration-300 hover:border-border-token hover:bg-[var(--surface-translucent-2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] flex w-full items-center justify-center gap-2.5 px-5 py-2.5 text-sm font-medium sm:w-auto`}
            >
              <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#FA5B0F]/15 border border-[#FA5B0F]/30 group-hover:scale-110 group-hover:bg-[#FA5B0F]/25 transition-all">
                <Play className="h-2.5 w-2.5 text-[#FA5B0F] fill-[#FA5B0F] translate-x-0.5" />
              </span>
              <span className="group-hover:text-fg transition-colors">Watch Video</span>
            </Button>
          </motion.div>

          {/* 3 Metric Reassurance Pills */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-border-token grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div className="group flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-border-token hover:bg-[var(--surface-translucent)] transition-all duration-300 cursor-default">
              <div className="w-8 h-8 rounded-lg bg-[#FA5B0F]/10 border border-[#FA5B0F]/20 flex items-center justify-center text-[#FA5B0F] shrink-0 group-hover:scale-110 group-hover:border-[#FA5B0F]/40 group-hover:shadow-[0_0_12px_rgba(250,91,15,0.3)] transition-all">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-fg group-hover:text-[#FA5B0F] transition-colors">100+ Businesses</p>
                <p className="text-[11px] text-fg-muted">Trust our systems</p>
              </div>
            </div>

            <div className="group flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-border-token hover:bg-[var(--surface-translucent)] transition-all duration-300 cursor-default">
              <div className="w-8 h-8 rounded-lg bg-[#27D3C2]/10 border border-[#27D3C2]/20 flex items-center justify-center text-[#27D3C2] shrink-0 group-hover:scale-110 group-hover:border-[#27D3C2]/40 group-hover:shadow-[0_0_12px_rgba(39,211,194,0.3)] transition-all">
                <Target className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-fg group-hover:text-[#27D3C2] transition-colors">End-to-End</p>
                <p className="text-[11px] text-fg-muted">Strategy to execution</p>
              </div>
            </div>

            <div className="group flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-border-token hover:bg-[var(--surface-translucent)] transition-all duration-300 cursor-default">
              <div className="w-8 h-8 rounded-lg bg-[#FA5B0F]/10 border border-[#FA5B0F]/20 flex items-center justify-center text-[#FA5B0F] shrink-0 group-hover:scale-110 group-hover:border-[#FA5B0F]/40 group-hover:shadow-[0_0_12px_rgba(250,91,15,0.3)] transition-all">
                <Globe2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-fg group-hover:text-[#FA5B0F] transition-colors">Global Reach</p>
                <p className="text-[11px] text-fg-muted">India, UAE &amp; USA</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Scene Zone with Floating Telemetry Nodes */}
        <div className="lg:col-span-6 relative h-[340px] sm:h-[440px] lg:h-[520px] flex items-center justify-center">
          <Zone phase="hero" className="w-full h-full">
            <HeroParticlesSVG
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                webgl ? "opacity-0" : "opacity-100"
              }`}
            />
          </Zone>

          {/* 6 Interactive Floating Telemetry Badges */}
          {telemetryBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className={`group absolute ${badge.pos} z-20 max-sm:pointer-events-none sm:pointer-events-auto transition-all duration-300 hover:scale-110 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border-token shadow-[0_4px_24px_rgba(0,0,0,0.55)] backdrop-blur-md bg-surface text-[11px] font-medium text-fg hover:border-[#FA5B0F]/70 hover:shadow-[0_0_24px_rgba(250,91,15,0.35)] hover:bg-surface cursor-default`}
                style={{
                  animation: `float 5s ease-in-out infinite`,
                  animationDelay: badge.delay,
                }}
              >
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${badge.dot} opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${badge.dot}`} />
                </span>
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fg-muted group-hover:text-[#FA5B0F] transition-colors" />
                <span className="group-hover:text-fg transition-colors">{badge.label}</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#FA5B0F] opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-24 overflow-hidden transition-all duration-300 whitespace-nowrap">
                  {badge.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* "TRUSTED BY BUSINESSES IN" Strip */}
      <div className="relative mx-auto w-full max-w-7xl mt-12 pt-8 border-t border-border-token z-10">
        <p className="text-center sm:text-left text-[11px] font-mono uppercase tracking-[0.2em] text-fg-muted mb-4">
          Trusted by Businesses Across Key Verticals
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2.5 sm:gap-2">
          {industriesStrip.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--surface-translucent)] border border-border-token hover:border-[#FA5B0F]/40 text-xs text-fg-muted transition duration-200"
              >
                <Icon className="w-3.5 h-3.5 text-[#FA5B0F]" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
