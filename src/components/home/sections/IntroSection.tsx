import React from "react";
import Link from "next/link";
import Image from "next/image";
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
import { BuddhaParticlesSVG } from "@/components/3d/CanvasFallback";
import { Eyebrow, Zone, sectionPad } from "../homeUi";
import { aboutFigures, company, specialisms } from "../homeData";

const pillars = [
  {
    Icon: PenTool,
    color: "#FF6B2C",
    title: "Creative design",
    desc: "Brands, design systems, and product interfaces crafted for clarity and conversion across every viewport.",
    tag: "UI/UX & Brand Systems",
  },
  {
    Icon: Code2,
    color: "#27D3C2",
    title: "Robust development",
    desc: "Sub-second Next.js applications, PostgreSQL data layers, and clean serverless architectures built to scale.",
    tag: "Full-Stack Engineering",
  },
  {
    Icon: Workflow,
    color: "#FFB547",
    title: "Smart automation",
    desc: "Reliable AI pipelines connecting WhatsApp, CRMs, and payment gateways to remove repetitive manual friction.",
    tag: "Autonomous Workflows",
  },
];

const specialismIcons = {
  automation: { Icon: Workflow, color: "#FF6B2C" },
  web: { Icon: Globe, color: "#27D3C2" },
  commerce: { Icon: ShoppingBag, color: "#34D399" },
  marketing: { Icon: TrendingUp, color: "#FFB547" },
  apps: { Icon: Smartphone, color: "#8B7CFF" },
} as const;

const linkCls = "text-[#F5F8FC] underline decoration-[#FF6B2C]/60 underline-offset-4 hover:decoration-[#FF6B2C] hover:text-[#FF6B2C] transition-colors";

/** "Who we are": Dodail's own positioning, the company facts, and what it specialises in. */
export function IntroSection({ webgl }: { webgl: boolean }) {
  return (
    <section aria-labelledby="about-dodail" className={`relative ${sectionPad} border-t border-white/[0.06] bg-[#05070B]`}>
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-[#FF6B2C] animate-pulse" />
          <span className="text-xs font-mono font-medium uppercase tracking-[0.16em] text-[#FF6B2C]">
            About Dodail · Brand Philosophy
          </span>
        </div>

        <h2 id="about-dodail" className="section-title-clamp max-w-4xl font-extrabold text-[#F5F8FC] tracking-tight leading-[1.04]">
          Design-oriented development.{" "}
          <span className="bg-gradient-to-r from-[#FF6B2C] via-[#FFB547] to-[#FF6B2C] bg-clip-text text-transparent">
            AI-led growth.
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Story + 3 Pillars */}
          <div className="lg:col-span-7">
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-[#F5F8FC]">
              At Dodail, we blend creative design, robust development and smart automation to build digital systems that
              are fast, beautiful and engineered for sustainable business growth.
            </p>
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#A3AAB5]">
              <p>
                {company.name} is an engineering-first digital studio headquartered in {company.city}, {company.country}.
                We partner with ambitious startups and enterprises to connect disjointed systems—orchestrating WhatsApp,
                CRMs, spreadsheets, payment gateways, and e-commerce stores into seamless autonomous engines.
              </p>
              <p>
                Every line of code and every interface is purpose-driven: clean architecture, deterministic guardrails, and
                measurable commercial outcomes working in harmony. Learn more{" "}
                <Link href="/about" className={linkCls}>about our team</Link>, explore verified case studies in{" "}
                <Link href="/work" className={linkCls}>Work &amp; Results</Link>, or read our architectural research in{" "}
                <Link href="/blog" className={linkCls}>articles and guides</Link>.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/[0.08] pt-8">
              {pillars.map(({ Icon, color, title, desc, tag }) => (
                <div
                  key={title}
                  className="group relative rounded-2xl border border-white/[0.08] bg-[#0A0D13]/70 p-5 transition-all duration-300 hover:border-white/20 hover:bg-[#0F141E] hover:shadow-lg"
                >
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl transition-transform group-hover:scale-105"
                    style={{ background: `${color}1A`, color, boxShadow: `inset 0 0 0 1px ${color}33` }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#F5F8FC] group-hover:text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#A3AAB5]">{desc}</p>
                  <span className="mt-3 inline-block font-mono text-[11px] font-medium tracking-wide" style={{ color }}>
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Radiant Buddha Art (from Office Reception) + Figures */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <figure className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07090E] shadow-2xl shadow-orange-950/20 group">
                {/* Ambient background glow matching the gold/cyan aura */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 bg-[radial-gradient(circle_at_50%_40%,rgba(255,181,71,0.2),rgba(39,211,194,0.1)_50%,transparent_75%)] opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                />

                {/* High-definition Buddha radiant artwork */}
                <div className="relative aspect-square w-full sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl">
                  <Image
                    src="/brand/dodail-buddha-radiance.jpg"
                    alt="Meditative Buddha sculpture in luminous golden and celestial cyan particles at Dodail Solutions Hyderabad reception"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority={false}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Dynamic Vignette & Cosmic Glow Overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent opacity-65" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />

                  {/* Zone for persistent WebGL particle stream */}
                  <Zone phase="about" className="absolute inset-0 pointer-events-none">
                    <BuddhaParticlesSVG
                      className={`absolute inset-0 h-full w-full p-4 transition-opacity duration-700 ${webgl ? "opacity-0" : "opacity-30"}`}
                    />
                  </Zone>

                  {/* Top Glass Badge: Office Reception Emblem */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-[#FFB547] animate-pulse" />
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-white">
                      HYDERABAD HQ · EMBLEM
                    </span>
                  </div>

                  {/* Bottom philosophical callout overlay */}
                  <div className="absolute bottom-4 inset-x-4 z-10 rounded-2xl border border-white/10 bg-black/75 p-3.5 backdrop-blur-md">
                    <p className="text-xs text-white/90 font-medium leading-snug">
                      &ldquo;Calm and mindful clarity on the surface; deep autonomous discipline and speed underneath.&rdquo;
                    </p>
                    <span className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-[#A3AAB5]">
                      <MapPin className="h-3 w-3 text-[#FF6B2C]" />
                      Reception Sculpture · Hyderabad, Telangana
                    </span>
                  </div>
                </div>
              </div>
            </figure>

            {/* Stats Grid */}
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {aboutFigures.map((f) => (
                <div
                  key={f.label}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0D13]/70 p-4 transition-all duration-300 hover:border-white/20 hover:bg-[#0F141E]"
                >
                  <dt className="text-xs text-[#8A929E] font-medium">{f.label}</dt>
                  <dd className="mt-1.5 text-2xl sm:text-3xl font-light tracking-tight text-[#F5F8FC]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Specialisms: Link cards into the detailed service pages */}
        <div className="mt-16 pt-12 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-[0.16em] text-[#FF6B2C]">
                Core Competencies
              </h3>
              <p className="mt-1 text-2xl font-bold text-[#F5F8FC]">We specialise in</p>
            </div>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A3AAB5] hover:text-[#FF6B2C] transition-colors"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {specialisms.map((sp, idx) => {
              const { Icon, color } = specialismIcons[sp.icon];
              return (
                <li key={sp.label} className={idx === specialisms.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <Link
                    href={sp.href}
                    className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#0B0E13] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#12161D] hover:shadow-lg"
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
                        className="h-4 w-4 -translate-x-1 text-[#6B7380] transition-all group-hover:translate-x-0 group-hover:text-[#FF6B2C]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-5 text-base font-medium text-[#F5F8FC] group-hover:text-white">{sp.label}</span>
                    <span className="mt-1 text-sm leading-relaxed text-[#8A929E]">{sp.detail}</span>
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
