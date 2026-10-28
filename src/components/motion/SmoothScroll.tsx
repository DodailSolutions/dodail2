"use client";

import React, { useEffect, useRef } from "react";

/**
 * High-performance smooth scrolling engine inspired by Lenis.
 * Provides fluid inertia, damping, and momentum across modern browsers
 * while respecting user accessibility settings (prefers-reduced-motion).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const isEnabledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Don't override mobile touch gestures
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    isEnabledRef.current = true;
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isRunning = false;
    let rafId = 0;

    const ease = 0.09; // Buttery damping factor

    const onWheel = (e: WheelEvent) => {
      // Allow native behavior on textareas or scrollable inner containers
      const target = e.target as HTMLElement | null;
      if (target?.closest("textarea, input, [data-native-scroll]")) return;

      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(targetY + e.deltaY * 1.05, maxScroll));

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      currentY += (targetY - currentY) * ease;
      window.scrollTo(0, currentY);

      if (Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isRunning = false;
      }
    };

    const onScroll = () => {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <>{children}</>;
}
