"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { canRunWebGL } from "./OperationsCanvasHost";
import { ART_URL } from "./AboutParticleCanvas";

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
 * poster:   the artwork image (first paint, no WebGL / low power / reduced motion, and the final state)
 * playing:  the three.js particles scatter and fly into place; the poster is hidden underneath
 * settling: the particles have landed; the crisp artwork fades in and the canvas fades out
 * done:     canvas unmounted (frees the GPU); the artwork stays
 */
type Stage = "poster" | "playing" | "settling" | "done";

/**
 * The About card art: the Dodail HQ artwork. The artwork itself is the resting state so the logo and the
 * building are exactly as designed at any pixel density; three.js does the arrival, when ~50k particles
 * (each coloured from the artwork) assemble into the picture as the card scrolls into view.
 * Re-sampling the artwork into a coarser particle grid at rest looked noisy (it is already made of
 * tiny beads), so the particles are only used for the motion.
 */
export function AboutParticleArt() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState<Stage>("poster");
  const reduced = useReducedMotion();
  const capable = useSyncExternalStore(subscribeNone, canRunWebGL, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "700px 0px" });
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "0px" });
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  // Start the arrival once (the first time the card is near); a no-WebGL device just keeps the poster.
  useEffect(() => {
    if (near && capable && !reduced && stage === "poster") setStage("playing");
  }, [near, capable, reduced, stage]);

  const onDone = () => {
    setStage("settling");
    window.setTimeout(() => setStage("done"), 1000);
  };

  const showPoster = !(stage === "playing" && ready);
  const canvasMounted = stage === "playing" || stage === "settling";

  return (
    <div ref={ref} className="absolute inset-0">
      <Image
        src={ART_URL}
        alt=""
        fill
        sizes="(max-width: 1024px) 92vw, 42vw"
        className={`object-contain transition-opacity duration-700 ${showPoster ? "opacity-100" : "opacity-0"}`}
      />
      {canvasMounted && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${stage === "settling" ? "opacity-0" : "opacity-100"}`}>
          <AboutParticleCanvas active={visible} onReady={() => setReady(true)} onDone={onDone} />
        </div>
      )}
    </div>
  );
}
