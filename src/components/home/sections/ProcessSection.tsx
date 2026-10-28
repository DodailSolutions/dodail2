"use client";

import React, { useEffect, useRef, useState } from "react";
import { Eyebrow, StageFade, Zone, sectionPad, stagePanel } from "../homeUi";
import { useActiveOnScroll } from "../useActiveOnScroll";
import { useHomeContent } from "../HomeContentContext";
import { SpotlightCard } from "../SpotlightCard";

interface Props {
  active: number;
  onActive: React.Dispatch<React.SetStateAction<number>>;
}

export function ProcessSection({ active, onActive }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  useActiveOnScroll(listRef, onActive, "(max-width: 767px)"); // stacked steps only
  // Not named `process`: that would shadow Node's global, which the bundler rewrites (process.env.*).
  const processContent = useHomeContent().content.process;
  const processStages = processContent.items;

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
  }, [inView, userTookOver, onActive, processStages.length]);

  const select = (i: number) => {
    setUserTookOver(true);
    onActive(i);
  };

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-title" className={`relative ${sectionPad}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-10">
          <Eyebrow>{processContent.eyebrow}</Eyebrow>
          <h2 id="process-title" className="section-title-clamp mt-4 text-fg">{processContent.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">{processContent.description}</p>
        </div>

        <div>
          {/* Icon strip: pinned like a progress bar on phones/tablets; above the columns on desktop */}
          <div className={`${stagePanel} top-16 sm:top-20 lg:static`}>
            <Zone phase="process" className="h-[100px] sm:h-[140px] lg:h-[220px]" />
            <StageFade />
          </div>

          <ol ref={listRef} className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4 border-t border-border-strong pt-4">
            {processStages.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.num}
                  data-index={i}
                  onMouseEnter={() => select(i)}
                  className="relative h-full"
                >
                  <SpotlightCard
                    spotlightColor={on ? "rgba(255, 107, 44, 0.12)" : "rgba(255, 255, 255, 0.04)"}
                    className={`h-full rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
                      on
                        ? "border-t-2 border-t-[#FF6B2C] border-border-token bg-surface shadow-[0_4px_20px_rgba(255,107,44,0.1)]"
                        : "border-t-2 border-t-transparent border-border-strong bg-surface hover:border-border-token"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`block text-3xl font-mono font-light tabular-nums transition-colors duration-300 ${
                          on ? "text-[#FF6B2C] font-semibold" : "text-fg-subtle"
                        }`}
                        aria-hidden="true"
                      >
                        {s.num}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg sm:text-xl font-normal tracking-tight text-fg">
                      <button
                        type="button"
                        aria-pressed={on}
                        onFocus={() => select(i)}
                        onClick={() => select(i)}
                        className="text-left focus:outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                      >
                        {s.title}
                      </button>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
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
