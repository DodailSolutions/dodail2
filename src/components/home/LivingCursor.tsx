"use client";

import React, { useEffect, useRef, useState } from "react";

export function LivingCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices and if user does not prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .dd-interactive");
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "view") {
          setCursorText("View");
          setIsHovered(true);
        } else if (type === "play") {
          setCursorText("Play");
          setIsHovered(true);
        }
      } else if (interactive) {
        setIsHovered(true);
        setCursorText(null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const render = () => {
      // Lerp ring towards mouse with smooth inertia
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } hidden lg:block`}
      aria-hidden="true"
    >
      {/* Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 h-2.5 w-2.5 rounded-full bg-[#FF6B2C] shadow-[0_0_12px_rgba(255,107,44,0.8)] will-change-transform transition-[width,height,opacity] duration-200 ${
          cursorText ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      />

      {/* Orbiting Halo / Morphing Pill */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center will-change-transform transition-[width,height,background-color,border-color,border-radius,transform] duration-200 ease-out ${
          cursorText
            ? "h-10 w-16 rounded-full bg-[#FF6B2C] border-0 text-white shadow-[0_0_20px_rgba(255,107,44,0.6)] text-[11px] font-bold uppercase tracking-wider"
            : isHovered
            ? "h-12 w-12 rounded-full border-2 border-[#FF6B2C] bg-[#FF6B2C]/15 scale-110"
            : "h-9 w-9 rounded-full border border-white/20 bg-white/[0.02] scale-100"
        }`}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </div>
  );
}
