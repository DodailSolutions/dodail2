"use client";

import React, { useEffect, useState } from "react";
import { IndustryKey } from "@/components/3d/3DTypes";
import { OperationsCanvasHost, SceneMode } from "@/components/3d/OperationsCanvasHost";
import { HeroSection } from "./sections/HeroSection";
import { IntroSection } from "./sections/IntroSection";
import { ProblemSection } from "./sections/ProblemSection";
import { ServicesSection } from "./sections/ServicesSection";
import { PipelineSection } from "./sections/PipelineSection";
import { IndustriesSection } from "./sections/IndustriesSection";
import { ProcessSection } from "./sections/ProcessSection";
import { CtaSection, FaqSection, TrustSection } from "./sections/TrustFaqCtaSection";
import { HomeContentProvider } from "./HomeContentContext";
import type { HomeContent } from "@/lib/cms/content/defaults/home";
import type { CompanyContent } from "@/lib/cms/content/defaults/site";

/**
 * Homepage. One persistent, lazily loaded canvas sits behind the page and draws
 * into the empty "zones" each section reserves; everything else is plain HTML.
 * All copy comes from the CMS ("Homepage" in the admin Site Content editor).
 */
export function HomePageClient({ content, company }: { content: HomeContent; company: CompanyContent }) {
  const [mode, setMode] = useState<SceneMode>("pending");
  const [problem, setProblem] = useState(0);
  const [service, setService] = useState(0);
  const [stage, setStage] = useState(0);
  const [industry, setIndustry] = useState<IndustryKey>("dental");
  const [step, setStep] = useState(0);
  const webgl = mode === "webgl";

  // Gentle reveal for text below the fold. Content is always in the HTML; only
  // elements not yet on screen are faded, and never for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("main section h2, main section h2 ~ p, main article, main ol > li, main dl")
    ).filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    els.forEach((el) => el.classList.add("reveal-ready", "reveal-pending"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.remove("reveal-pending");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <HomeContentProvider value={{ content, company }}>
    <div className="relative bg-[#05070B] text-[#F5F8FC]">
      <OperationsCanvasHost
        activeProblem={problem}
        activeServiceIndex={service}
        activePipelineStage={stage}
        activeIndustry={industry}
        activeProcessStep={step}
        onModeChange={setMode}
      />
      <div className="relative z-10">
        <HeroSection webgl={webgl} />
        <IntroSection webgl={webgl} />
        <ProblemSection active={problem} onActive={setProblem} />
        <ServicesSection active={service} onActive={setService} webgl={webgl} />
        <PipelineSection active={stage} onActive={setStage} webgl={webgl} />
        <IndustriesSection active={industry} onActive={setIndustry} webgl={webgl} />
        <ProcessSection active={step} onActive={setStep} />
        <TrustSection />
        <FaqSection />
        <CtaSection webgl={webgl} />
      </div>
    </div>
    </HomeContentProvider>
  );
}
