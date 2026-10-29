import React from "react";
import { ScenePhase } from "@/components/3d/3DTypes";

/** Orange pill with white text (brand choice; white on #FA5B0F is ~2.8:1, below WCAG AA). */
export const primaryBtn =
  "rounded-full text-[15px] px-6 py-3.5 h-auto font-semibold normal-case tracking-normal text-white hover:text-white shadow-[0_0_40px_-8px_rgba(250,91,15,0.6)] focus-visible:ring-offset-[#05070B]";

export const ghostBtn =
  "rounded-full text-[15px] px-6 py-3.5 h-auto font-medium normal-case tracking-normal border-white/15 bg-white/[0.03] text-[#F5F8FC] hover:text-[#F5F8FC] hover:bg-white/10 hover:border-white/30 shadow-none focus-visible:ring-offset-[#05070B] light:border-slate-300 light:bg-white light:text-slate-900 light:hover:bg-slate-50 light:hover:text-slate-900 light:hover:border-slate-400 light:shadow-sm light:focus-visible:ring-offset-white";

export const sectionPad = "px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20";

/**
 * Phones and tablets: pins a section's visual under the header (solid background) while
 * its content scrolls up underneath, so the motion stays in view item by item.
 * Combine with a `top-*` offset. On desktop the panel goes transparent again.
 */
export const stagePanel =
  "sticky z-10 -mx-5 bg-[#05070B] px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0 light:max-lg:bg-[var(--bg)]";

/** Soft edge under a pinned stage panel, so text fades in rather than being cut. */
export function StageFade() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-[#05070B] to-transparent light:from-[var(--bg)] lg:hidden"
    />
  );
}

const eyebrowTone = { orange: "text-[#FA5B0F]", cyan: "text-[#27D3C2]", muted: "text-[#8A929E] light:text-slate-500" };

export function Eyebrow({
  children,
  tone = "orange",
}: {
  children: React.ReactNode;
  tone?: keyof typeof eyebrowTone;
}) {
  return (
    <p className={`text-xs font-medium uppercase tracking-[0.2em] ${eyebrowTone[tone]}`}>
      {children}
    </p>
  );
}

/**
 * An empty, reserved box. The persistent 3D canvas finds it by `data-scene-zone`
 * and draws the scene inside its bounds, so the 3D can never overlap text.
 */
export function Zone({
  phase,
  className = "",
  children,
}: {
  phase: ScenePhase;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div data-scene={phase} data-scene-zone aria-hidden="true" className={`relative ${className}`}>
      {children}
    </div>
  );
}
