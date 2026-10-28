"use client";

import React, { useRef } from "react";
import { Eyebrow, StageFade, Zone, sectionPad, stagePanel } from "../homeUi";
import { useActiveOnScroll } from "../useActiveOnScroll";
import { useHomeContent } from "../HomeContentContext";
import { SpotlightCard } from "../SpotlightCard";

/** What the particle visual shows for each problem (decorative caption). */
const visuals = [
  "An hourglass: enquiries waiting while the reply runs late",
  "Two documents: the same lines re-typed from one to the other",
  "Four tools whose connections fade out before they meet",
];

interface Props {
  active: number;
  onActive: (i: number) => void;
}

export function ProblemSection({ active, onActive }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  useActiveOnScroll(listRef, onActive);
  const { problem } = useHomeContent().content;
  const problems = problem.items;

  return (
    <section id="problem" aria-labelledby="problem-title" className={`relative ${sectionPad}`}>
      {/* Tools strip: plain text, no logos or claims */}
      <div className="mx-auto max-w-7xl mb-10 sm:mb-16">
        <p className="text-sm font-mono uppercase tracking-wider text-fg-muted mb-4">{problem.stackLabel}</p>
        <ul className="flex flex-wrap gap-2">
          {problem.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border-token bg-[var(--surface-translucent)] px-3.5 py-1.5 text-xs sm:text-sm text-fg-muted hover:border-[#FF6B2C]/40 hover:bg-[var(--surface-translucent)] transition-colors"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 items-start">
        <div className="lg:col-span-7 lg:col-start-6">
          <Eyebrow>{problem.eyebrow}</Eyebrow>
          <h2 id="problem-title" className="section-title-clamp mt-4 text-fg">
            {problem.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{problem.description}</p>
        </div>

        {/* Visual + list share a wrapper so the visual can pin on phones/tablets (lg: grid items) */}
        <div className="lg:contents">
          {/* Pinned visual: it changes with the problem being read */}
          <div className={`${stagePanel} top-16 sm:top-20 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:top-28`}>
            <Zone phase="problem" className="h-[220px] sm:h-[300px] lg:h-[360px]" />
            <p className="mt-2 lg:mt-1 flex items-baseline gap-3 text-sm text-fg-muted" aria-hidden="true">
              <span className="tabular-nums font-mono font-bold text-[#FF6B2C]">{problems[active].num}</span>
              <span key={active} className="fade-up">{visuals[active]}</span>
            </p>
            <StageFade />
          </div>

          <ol ref={listRef} className="lg:col-span-7 lg:col-start-6 divide-y divide-[var(--border)] border-y border-border-strong">
            {problems.map((p, i) => {
              const on = i === active;
              return (
                <li
                  key={p.num}
                  data-index={i}
                  onMouseEnter={() => onActive(i)}
                  className={`relative transition-all duration-500 ${
                    on ? "opacity-100" : "lg:opacity-40"
                  }`}
                >
                  <SpotlightCard
                    spotlightColor="rgba(255, 107, 44, 0.08)"
                    className={`grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 p-6 sm:p-8 rounded-2xl lg:min-h-[36vh] lg:content-center transition-all ${
                      on ? "bg-[var(--surface-translucent)] border-l-2 border-l-[#FF6B2C]" : "border-l-2 border-l-transparent"
                    }`}
                  >
                    <span
                      className={`text-4xl sm:text-5xl font-light font-mono leading-none tabular-nums transition-colors duration-500 ${
                        on ? "text-[#FF6B2C] drop-shadow-[0_0_12px_rgba(255,107,44,0.4)]" : "text-fg-subtle"
                      }`}
                      aria-hidden="true"
                    >
                      {p.num}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-fg">{p.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-fg-muted">{p.desc}</p>
                      <p className="mt-4 text-base leading-relaxed text-fg">
                        <span className="font-semibold text-[#FF6B2C]">{problem.fixLabel} </span>
                        {p.fix}
                      </p>
                    </div>
                  </SpotlightCard>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
