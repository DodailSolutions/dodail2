"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { canRunWebGL } from "./OperationsCanvasHost";
import { ART_ASPECT, ART_URL } from "./AboutParticleCanvas";

// The three.js scene is a separate chunk: fetched only when the card is about to scroll into view.
const AboutParticleCanvas = dynamic(() => import("./AboutParticleCanvas"), { ssr: false, loading: () => null });

const subscribeNone = () => () => {};
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

/**
 * The About card art. The artwork image is the first-paint poster and the permanent fallback (no
 * WebGL, low-power, data-saver, reduced motion). When the card nears the viewport, a three.js canvas
 * mounts over it and draws the same artwork as a grid of particles that assemble and ripple.
 */
export function AboutParticleArt() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const capable = useSyncExternalStore(subscribeNone, canRunWebGL, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "700px 0px" });
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "80px 0px" });
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  const canvasOn = capable && !reduced && near;

  return (
    <div ref={ref} className="absolute inset-0" style={{ aspectRatio: ART_ASPECT }}>
      <Image
        src={ART_URL}
        alt=""
        fill
        sizes="(max-width: 1024px) 92vw, 42vw"
        className={`object-contain transition-opacity duration-700 ${canvasOn && ready ? "opacity-0" : "opacity-100"}`}
      />
      {canvasOn && <AboutParticleCanvas active={visible} onReady={() => setReady(true)} />}
    </div>
  );
}
