"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Palette, ShoppingBag, TrendingUp, Workflow } from "lucide-react";
import { Eyebrow, StageFade, Zone, sectionPad, stagePanel } from "../homeUi";
import { fill } from "@/lib/utils";
import { useActiveOnScroll } from "../useActiveOnScroll";
import { useHomeContent } from "../HomeContentContext";
import { SpotlightCard } from "../SpotlightCard";

const icons = [Workflow, Code2, ShoppingBag, TrendingUp, Palette];

interface Props {
  active: number;
  onActive: (i: number) => void;
  webgl: boolean;
}

/** All five services are fully written out; the sticky 3D form follows the one being read. */
export function ServicesSection({ active, onActive, webgl }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  useActiveOnScroll(listRef, onActive);
  const ActiveIcon = icons[active];
  const section = useHomeContent().content.services;
  const services = section.items;

  return (
    <section id="services" aria-labelledby="services-title" className={`relative ${sectionPad}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <Eyebrow tone="cyan">{section.eyebrow}</Eyebrow>
          <h2 id="services-title" className="section-title-clamp mt-4 text-fg">
            {section.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">{section.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:contents">
            <div className={`${stagePanel} top-16 sm:top-20 lg:order-2 lg:col-span-5 lg:top-28`}>
              <Zone phase="services" className="h-[220px] sm:h-[300px] lg:h-[460px]">
                {!webgl && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-border-strong bg-surface shadow-inner">
                    <ActiveIcon className="h-24 w-24 text-[#FA5B0F]" strokeWidth={1.25} aria-hidden="true" />
                  </div>
                )}
              </Zone>
              <p className="mt-2 lg:mt-4 text-sm text-fg-muted" aria-hidden="true">
                <span className="text-fg font-medium">{services[active].title}</span> · {services[active].shape}
              </p>
              <StageFade />
            </div>

            <div ref={listRef} className="lg:order-1 lg:col-span-7 divide-y divide-[var(--border)] border-y border-border-strong">
              {services.map((s, i) => {
                const isActive = i === active;
                return (
                  <article
                    key={s.id}
                    id={s.id}
                    data-index={i}
                    data-cursor="view"
                    onMouseEnter={() => onActive(i)}
                    onFocus={() => onActive(i)}
                    className="scroll-mt-28 py-2"
                  >
                    <SpotlightCard
                      spotlightColor="rgba(250, 91, 15, 0.08)"
                      className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                        isActive ? "bg-[var(--surface-translucent)] border-l-2 border-l-[#FA5B0F]" : "border-l-2 border-l-transparent hover:bg-[var(--surface-translucent)]"
                      }`}
                    >
                      <p className={`text-sm font-mono tabular-nums ${isActive ? "text-[#FA5B0F]" : "text-fg-muted"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3
                        className={`mt-2 text-2xl sm:text-4xl font-light tracking-tight transition-colors ${
                          isActive ? "text-fg" : "text-fg-muted"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-fg/90">{s.desc}</p>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">{s.audience}</p>
                      <ul className="mt-5 space-y-2 text-sm text-fg-muted">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex gap-3 items-center">
                            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.accent }} />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={s.href}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FA5B0F] hover:text-[#ff8a57] group"
                      >
                        <span>{fill(section.learnMoreLabel, { service: s.title })}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                      </Link>
                    </SpotlightCard>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
