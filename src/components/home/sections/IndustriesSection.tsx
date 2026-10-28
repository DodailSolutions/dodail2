"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, Factory, ShoppingBag, Stethoscope } from "lucide-react";
import { IndustryKey } from "@/components/3d/3DTypes";
import { publishSceneStep } from "@/components/3d/OperationsCanvasHost";
import { Eyebrow, StageFade, Zone, sectionPad, stagePanel } from "../homeUi";
import { fill } from "@/lib/utils";
import { useActiveOnScroll } from "../useActiveOnScroll";
import { useHomeContent } from "../HomeContentContext";
import { SpotlightCard } from "../SpotlightCard";

const icons: Record<IndustryKey, React.ComponentType<{ className?: string }>> = {
  dental: Stethoscope,
  "real-estate": Building2,
  manufacturing: Factory,
  ecommerce: ShoppingBag,
};

interface Props {
  active: IndustryKey;
  onActive: (k: IndustryKey) => void;
  webgl: boolean;
}

/** Every industry is written out in full; the sticky 3D cluster re-skins for the one in view. */
export function IndustriesSection({ active, onActive, webgl }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const section = useHomeContent().content.industries;
  const industries = section.items;
  const onIndex = useCallback((i: number) => onActive(industries[i].key), [onActive, industries]);
  useActiveOnScroll(listRef, onIndex);
  const Icon = icons[active];
  const current = industries.find((i) => i.key === active) ?? industries[0];

  // Play the workflow: step 1 -> 4, highlighted in the 3D icons, the caption and the
  // numbered list. Runs only while the section is on screen; never for reduced motion.
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [play, setPlay] = useState<{ key: IndustryKey; step: number }>({ key: active, step: 0 });
  const step = play.key === active ? play.step : 0;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setPlay((prev) => (prev.key === active ? { key: active, step: (prev.step + 1) % 4 } : { key: active, step: 1 })),
      1800
    );
    return () => window.clearInterval(id);
  }, [inView, active]);

  useEffect(() => {
    publishSceneStep(step);
  }, [step]);

  const navRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="industries" aria-labelledby="industries-title" className={`relative ${sectionPad}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <Eyebrow tone="orange">{section.eyebrow}</Eyebrow>
          <h2 id="industries-title" className="section-title-clamp mt-4 text-fg">
            {section.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">{section.description}</p>
        </div>

        {/* Pinned under the site header while the industries are on screen; one scrollable row on phones */}
        <nav
          ref={navRef}
          aria-label="Industries on this page"
          className="sticky top-16 sm:top-20 z-20 -mx-5 mb-12 flex flex-nowrap gap-2 overflow-x-auto border-b border-border-token bg-bg px-5 py-3 backdrop-blur-md [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {industries.map((ind) => {
            const on = ind.key === active;
            const I = icons[ind.key];
            return (
              <a
                key={ind.key}
                href={`#industry-${ind.key}`}
                onClick={() => onActive(ind.key)}
                aria-current={on ? "true" : undefined}
                className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  on
                    ? "border-[#FF6B2C] bg-[#FF6B2C] text-[#05070B] shadow-[0_0_16px_rgba(255,107,44,0.4)]"
                    : "border-border-strong text-fg hover:border-[#FF6B2C]/60 hover:bg-[var(--surface-translucent)]"
                }`}
              >
                <I className="h-4 w-4" />
                {ind.label}
              </a>
            );
          })}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:contents">
            {/* Pinned below the header (64/80px) and the industry tabs (~71px) */}
            <div className={`${stagePanel} top-[135px] sm:top-[151px] lg:col-span-5 lg:top-44`}>
              <Zone phase="industries" className="h-[200px] sm:h-[280px] lg:h-[440px]">
                {!webgl && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-border-strong bg-surface shadow-inner">
                    <Icon className="h-24 w-24 text-[#27D3C2]" />
                  </div>
                )}
              </Zone>
              <p className="mt-2 lg:mt-4 flex items-baseline gap-3 text-sm text-fg-muted" aria-hidden="true">
                <span className="font-semibold" style={{ color: current.accent }}>{current.label}</span>
                <span key={`${active}-${step}`} className="fade-up">
                  Step {step + 1}: <span className="text-fg">{current.steps[step]}</span>
                </span>
              </p>
              <StageFade />
            </div>

            <div ref={listRef} className="lg:col-span-7 divide-y divide-[var(--border)] border-y border-border-strong">
              {industries.map((ind, i) => (
                <article
                  key={ind.key}
                  id={`industry-${ind.key}`}
                  data-index={i}
                  className="scroll-mt-[420px] sm:scroll-mt-[520px] lg:scroll-mt-44 py-4"
                >
                  <SpotlightCard
                    spotlightColor="rgba(39, 211, 194, 0.08)"
                    className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-translucent)] hover:bg-[var(--surface-translucent)] border border-transparent hover:border-border-token"
                  >
                    <p className="text-sm font-mono font-medium" style={{ color: ind.accent }}>
                      {ind.label}
                    </p>
                    <h3 className="mt-2 text-3xl sm:text-4xl font-light tracking-tight text-fg">{ind.headline}</h3>
                    <p className="mt-5 text-lg leading-relaxed text-fg-muted">{ind.desc}</p>

                    <h4 className="mt-8 text-xs font-mono font-medium uppercase tracking-[0.16em] text-fg-muted">{section.workflowLabel}</h4>
                    <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {ind.steps.map((s, n) => {
                        const playing = ind.key === active && n === step;
                        return (
                          <li
                            key={s}
                            className={`flex items-baseline gap-3 text-sm sm:text-base transition-colors duration-300 ${
                              playing ? "text-fg font-medium" : "text-fg-muted"
                            }`}
                          >
                            <span
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-mono tabular-nums transition-all duration-300 ${
                                playing ? "text-[#05070B] shadow-sm scale-110" : ""
                              }`}
                              style={playing ? { background: ind.accent } : { color: ind.accent, boxShadow: `inset 0 0 0 1px ${ind.accent}55` }}
                            >
                              {n + 1}
                            </span>
                            <span>{s}</span>
                          </li>
                        );
                      })}
                    </ol>

                    <h4 className="mt-8 text-xs font-mono font-medium uppercase tracking-[0.16em] text-fg-muted">{section.changesLabel}</h4>
                    <ul className="mt-3 space-y-2 text-sm sm:text-base text-fg">
                      {ind.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-[#27D3C2]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-border-strong">
                      <Link
                        href={ind.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B2C] hover:text-[#ff8a57] group"
                      >
                        <span>{fill(section.linkLabel, { industry: ind.label.toLowerCase() })}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </SpotlightCard>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
