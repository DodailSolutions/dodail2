"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PipelineSVG } from "@/components/3d/CanvasFallback";
import { Eyebrow, StageFade, Zone, ghostBtn, primaryBtn, sectionPad, stagePanel } from "../homeUi";
import { useActiveOnScroll } from "../useActiveOnScroll";
import { useHomeContent } from "../HomeContentContext";

interface Props {
  active: number;
  onActive: React.Dispatch<React.SetStateAction<number>>;
  webgl: boolean;
}

/** All four stages are written out; selecting one highlights it in the 3D pipeline. */
export function PipelineSection({ active, onActive, webgl }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  useActiveOnScroll(listRef, onActive, "(max-width: 767px)"); // stacked cards only
  const pipeline = useHomeContent().content.pipeline;
  const pipelineStages = pipeline.items;

  // Play the steps 01 -> 04 while the section is visible on wider screens.
  // Stops for good once the visitor hovers, focuses or clicks a step.
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
    const id = window.setInterval(() => onActive((s) => (s + 1) % pipelineStages.length), 2200);
    return () => window.clearInterval(id);
  }, [inView, userTookOver, onActive, pipelineStages.length]);

  const select = (i: number) => {
    setUserTookOver(true);
    onActive(i);
  };

  return (
    <section ref={sectionRef} id="how-automation-works" aria-labelledby="pipeline-title" className={`relative ${sectionPad}`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div className="max-w-3xl">
            <Eyebrow>{pipeline.eyebrow}</Eyebrow>
            <h2 id="pipeline-title" className="section-title-clamp mt-4 text-[#F5F8FC]">
              {pipeline.title}
            </h2>
          </div>
        </div>

        <div>
        {/* Icon strip: pinned like a progress bar on phones/tablets; above the cards on desktop */}
        <div className={`${stagePanel} top-16 sm:top-20 lg:static`}>
          <Zone phase="pipeline" className="h-[110px] sm:h-[150px] lg:h-[220px]">
            {!webgl && <PipelineSVG active={active} className="absolute inset-0 h-full w-full" />}
          </Zone>
          <StageFade />
        </div>

        <ol ref={listRef} className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((s, i) => {
            const on = i === active;
            return (
              <li
                key={s.code}
                data-index={i}
                onMouseEnter={() => select(i)}
                className={`relative h-full rounded-2xl border p-6 transition-colors focus-within:ring-2 focus-within:ring-[#FF6B2C] ${
                  on ? "border-[#FF6B2C] bg-[#12161D]" : "border-[#1C222B] bg-[#0B0E13]/70 hover:border-[#2C333E]"
                }`}
              >
                <p className={`text-sm font-medium ${on ? "text-[#FF6B2C]" : "text-[#8A929E]"}`}>
                  Step {s.code} · {s.name}
                </p>
                <h3 className="mt-3 text-xl font-normal tracking-tight text-[#F5F8FC]">
                  {/* The button's hit area covers the whole card (after:inset-0). */}
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
                <p className="mt-3 text-[15px] leading-relaxed text-[#A3AAB5]">{s.desc}</p>
                <p className="mt-4 border-t border-[#1C222B] pt-4 text-[15px] leading-relaxed text-[#C9CED6]">{s.details}</p>
              </li>
            );
          })}
        </ol>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          {pipeline.primaryCta.label && (
            <Button href={pipeline.primaryCta.href || "/consultation"} variant="primary" size="lg" className={primaryBtn}>
              <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
              {pipeline.primaryCta.label}
            </Button>
          )}
          {pipeline.secondaryCta.label && (
            <Button href={pipeline.secondaryCta.href || "/solutions/workflow-automation"} variant="outline" size="lg" className={ghostBtn}>
              {pipeline.secondaryCta.label}
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
