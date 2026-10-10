"use client";

import React, { useRef } from "react";
import { Eyebrow, StageFade, Zone, sectionPad, stagePanel } from "../homeUi";
import { problems, stack } from "../homeData";
import { useActiveOnScroll } from "../useActiveOnScroll";

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

  return (
    <section id="problem" aria-labelledby="problem-title" className={`relative ${sectionPad}`}>
      {/* Tools strip: plain text, no logos or claims */}
      <div className="mx-auto max-w-7xl mb-16 sm:mb-32">
        <p className="text-sm text-[#A3AAB5] mb-4">Built to work with the tools you already use</p>
        <ul className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <li key={s} className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-sm text-[#C9CED6]">
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 items-start">
        <div className="lg:col-span-7 lg:col-start-6">
          <Eyebrow>The problem</Eyebrow>
          <h2 id="problem-title" className="section-title-clamp mt-4 text-[#F5F8FC]">
            Where growing companies quietly lose time and revenue
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A3AAB5]">
            When software runs in silos, customer context disappears, leads go cold and good people spend their day
            moving information from one place to another.
          </p>
        </div>

        {/* Visual + list share a wrapper so the visual can pin on phones/tablets (lg: grid items) */}
        <div className="lg:contents">
        {/* Pinned visual: it changes with the problem being read */}
        <div className={`${stagePanel} top-16 sm:top-20 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:top-28`}>
          <Zone phase="problem" className="h-[220px] sm:h-[300px] lg:h-[460px]" />
          <p className="mt-2 lg:mt-4 flex items-baseline gap-3 text-sm text-[#A3AAB5]" aria-hidden="true">
            <span className="tabular-nums text-[#FF6B2C]">{problems[active].num}</span>
            <span key={active} className="fade-up">{visuals[active]}</span>
          </p>
          <StageFade />
        </div>

        <ol ref={listRef} className="lg:col-span-7 lg:col-start-6 divide-y divide-[#1C222B] border-y border-[#1C222B]">
          {problems.map((p, i) => {
            const on = i === active;
            return (
              <li
                key={p.num}
                data-index={i}
                onMouseEnter={() => onActive(i)}
                className={`grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 py-10 sm:py-14 transition-opacity duration-500 ${
                  on ? "opacity-100" : "lg:opacity-55"
                }`}
              >
                <span
                  className={`text-4xl sm:text-5xl font-light leading-none tabular-nums transition-colors duration-500 ${
                    on ? "text-[#FF6B2C]" : "text-[#2C333E]"
                  }`}
                  aria-hidden="true"
                >
                  {p.num}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#F5F8FC]">{p.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#A3AAB5]">{p.desc}</p>
                  <p className="mt-4 text-base leading-relaxed text-[#F5F8FC]">
                    <span className="font-medium text-[#FF6B2C]">What Dodail does: </span>
                    {p.fix}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
}
