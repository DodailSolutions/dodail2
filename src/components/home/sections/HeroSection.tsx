import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroParticlesSVG } from "@/components/3d/CanvasFallback";
import { Zone, ghostBtn, primaryBtn } from "../homeUi";

export function HeroSection({ webgl }: { webgl: boolean }) {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-6 pb-16 lg:pb-12 lg:min-h-[calc(100svh-5rem)] flex items-center">
      {/* Static atmosphere: renders instantly, before any WebGL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 55% at 72% 50%, rgba(255,107,44,0.10), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
        <div className="lg:col-span-5 relative z-10">
          {/* One H1 that states what Dodail is (for search) and the promise (for people). */}
          <h1 className="text-[#F5F8FC]">
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-[#8A929E]">
              AI automation &amp; software development company in Hyderabad
            </span>{" "}
            <span className="hero-title-clamp mt-6 block">
              Turn repetitive operations into <span className="text-[#FF6B2C]">autonomous growth.</span>
            </span>
          </h1>

          <p className="mt-8 hidden text-xs font-medium uppercase tracking-[0.18em] text-[#8A929E] sm:block">
            AI automation · Software · Web &amp; e-commerce · Marketing · Brand
          </p>

          <p className="mt-6 sm:mt-4 max-w-md text-base sm:text-lg leading-relaxed text-[#A3AAB5]">
            Leads, messages, CRM, payments and reports usually live in separate tools. Dodail connects them, automates
            the work in between, and builds the software, websites and brand around it.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button href="/consultation" variant="primary" size="lg" className={primaryBtn}>
              Book a Consultation
            </Button>
            <Button href="/solutions/ai-automation" variant="outline" size="lg" className={ghostBtn}>
              Explore Solutions
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Scene zone: a large field on the right on desktop, below the copy on mobile */}
        <Zone phase="hero" className="lg:col-span-7 h-[300px] sm:h-[460px] lg:h-[640px] lg:-mr-12">
          <HeroParticlesSVG
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
              webgl ? "opacity-0" : "opacity-100"
            }`}
          />
        </Zone>
      </div>
    </section>
  );
}
