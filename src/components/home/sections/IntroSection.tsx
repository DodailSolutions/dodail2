import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Globe, MapPin, PenTool, ShoppingBag, Smartphone, TrendingUp, Workflow } from "lucide-react";
import { BuddhaParticlesSVG } from "@/components/3d/CanvasFallback";
import { Eyebrow, Zone, sectionPad } from "../homeUi";
import { aboutFigures, company, specialisms } from "../homeData";

const pillars = [
  {
    Icon: PenTool,
    color: "#FF6B2C",
    title: "Creative design",
    desc: "Brands and interfaces that look considered and are easy to use on every screen.",
  },
  {
    Icon: Code2,
    color: "#27D3C2",
    title: "Robust development",
    desc: "Fast, secure websites, stores and applications built to scale with you.",
  },
  {
    Icon: Workflow,
    color: "#FFB547",
    title: "Smart automation",
    desc: "AI workflows that connect your tools and take repetitive work off your team.",
  },
];

const specialismIcons = {
  automation: { Icon: Workflow, color: "#FF6B2C" },
  web: { Icon: Globe, color: "#27D3C2" },
  commerce: { Icon: ShoppingBag, color: "#34D399" },
  marketing: { Icon: TrendingUp, color: "#FFB547" },
  apps: { Icon: Smartphone, color: "#8B7CFF" },
} as const;

const linkCls = "text-[#F5F8FC] underline decoration-[#FF6B2C]/60 underline-offset-4 hover:decoration-[#FF6B2C]";

/** "Who we are": Dodail's own positioning, the company facts, and what it specialises in. */
export function IntroSection({ webgl }: { webgl: boolean }) {
  return (
    <section aria-labelledby="about-dodail" className={`relative ${sectionPad}`}>
      <div className="mx-auto max-w-7xl">
        <Eyebrow>About Dodail</Eyebrow>
        <h2 id="about-dodail" className="section-title-clamp mt-4 max-w-4xl text-[#F5F8FC]">
          Design-oriented development.{" "}
          <span className="block text-[#FF6B2C]">AI-led growth.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Story + pillars */}
          <div className="lg:col-span-7">
            <p className="text-xl sm:text-2xl font-light leading-snug text-[#F5F8FC]">
              At Dodail, we blend creative design, robust development and smart automation to build digital systems that
              are fast, beautiful and built for growth.
            </p>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#A3AAB5]">
              <p>
                {company.name} is a digital agency in {company.city}, {company.country}, helping startups and
                enterprises grow with strategy, speed and measurable impact. We connect the tools you already use, such
                as WhatsApp, CRMs, spreadsheets, payment gateways and online stores, and automate the repetitive work
                between them.
              </p>
              <p>
                Every project is purpose-driven: technology, creativity and business logic working together to deliver
                real results. Learn more <Link href="/about" className={linkCls}>about our team</Link>, see examples in{" "}
                <Link href="/work" className={linkCls}>Work &amp; Results</Link>, or read our{" "}
                <Link href="/blog" className={linkCls}>articles and guides</Link>.
              </p>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-white/[0.08] pt-8">
              {pillars.map(({ Icon, color, title, desc }) => (
                <li key={title}>
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{ background: `${color}1A`, color, boxShadow: `inset 0 0 0 1px ${color}33` }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-normal text-[#F5F8FC]">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#A3AAB5]">{desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Particle Buddha (from our office reception) + figures */}
          <div className="lg:col-span-5">
            <figure>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[radial-gradient(ellipse_at_50%_60%,rgba(255,181,71,0.08),transparent_70%)]">
                {/* The persistent particle field draws the Buddha inside this box */}
                <Zone phase="about" className="aspect-square w-full sm:aspect-[4/3] lg:aspect-square">
                  <BuddhaParticlesSVG
                    className={`absolute inset-0 h-full w-full p-4 transition-opacity duration-700 ${webgl ? "opacity-0" : "opacity-100"}`}
                  />
                </Zone>
              </div>
              <figcaption className="mt-3 flex items-center gap-2 text-sm text-[#8A929E]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FF6B2C]" aria-hidden="true" />
                Inspired by the reception of our office in {company.city}, {company.region}
              </figcaption>
            </figure>

            <dl className="mt-3 grid grid-cols-2 gap-3">
              {aboutFigures.map((f) => (
                <div key={f.label} className="rounded-2xl border border-white/[0.07] bg-[#0B0E13] p-5">
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block text-3xl font-light tracking-tight text-[#F5F8FC]">{f.value}</span>
                    <span className="mt-1.5 block text-sm text-[#8A929E]">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Specialisms: link cards into the detailed service pages */}
        <div className="mt-16">
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-[#8A929E]">We specialise in</h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {specialisms.map((sp, idx) => {
              const { Icon, color } = specialismIcons[sp.icon];
              return (
                <li key={sp.label} className={idx === specialisms.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <Link
                    href={sp.href}
                    className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#0B0E13] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#12161D]"
                  >
                    <span className="flex items-center justify-between">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-xl"
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
                    <span className="mt-5 text-base font-medium text-[#F5F8FC]">{sp.label}</span>
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
