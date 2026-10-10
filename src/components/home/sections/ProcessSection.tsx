"use client";

import React, { useEffect, useRef, useState } from "react";
import { Eyebrow, StageFade, Zone, sectionPad, stagePanel } from "../homeUi";
import { processStages } from "../homeData";
import { useActiveOnScroll } from "../useActiveOnScroll";

interface Props {
  active: number;
  onActive: React.Dispatch<React.SetStateAction<number>>;
}

export function ProcessSection({ active, onActive }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  useActiveOnScroll(listRef, onActive, "(max-width: 767px)"); // stacked steps only

  // Play the stages 01 -> 05 while the section is visible on wider screens.
  // Stops for good once the visitor hovers, focuses or clicks a stage.
  const [inView, setInView] = useState(false);
  const [userTookOver, setUserTookOver] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!inView || userTookOver) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches) return;
    const id = window.setInterval(() => onActive((s) => (s + 1) % processStages.length), 2000);
    return () => window.clearInterval(id);
  }, [inView, userTookOver, onActive]);

  const select = (i: number) => {
    setUserTookOver(true);
    onActive(i);
  };

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-title" className={`relative ${sectionPad}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-10">
          <Eyebrow>How we deliver</Eyebrow>
          <h2 id="process-title" className="section-title-clamp mt-4 text-[#F5F8FC]">A clear path from first call to launch</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#A3AAB5]">
            Five stages, each with a defined output, so you always know what is being built and what comes next.
          </p>
        </div>

        <div>
        {/* Icon strip: pinned like a progress bar on phones/tablets; above the columns on desktop */}
        <div className={`${stagePanel} top-16 sm:top-20 lg:static`}>
          <Zone phase="process" className="h-[100px] sm:h-[140px] lg:h-[220px]" />
          <StageFade />
        </div>

        <ol ref={listRef} className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-x-6 border-t border-[#1C222B]">
          {processStages.map((s, i) => {
            const on = i === active;
            return (
              <li
                key={s.num}
                data-index={i}
                onMouseEnter={() => select(i)}
                className={`relative border-b border-[#1C222B] md:border-b-0 border-t-2 md:-mt-px py-6 transition-colors duration-500 focus-within:ring-2 focus-within:ring-[#FF6B2C] ${
                  on ? "border-t-[#FF6B2C]" : "border-t-transparent hover:border-t-[#2C333E]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`block text-3xl font-light tabular-nums transition-colors duration-500 ${on ? "text-[#FF6B2C]" : "text-[#2C333E]"}`}
                    aria-hidden="true"
                  >
                    {s.num}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-normal tracking-tight text-[#F5F8FC]">
                  <button
                    type="button"
                    aria-current={on ? "step" : undefined}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                    className="text-left focus:outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    {s.title}
                  </button>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#A3AAB5]">{s.desc}</p>
              </li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
}
