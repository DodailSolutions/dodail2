"use client";

import React, { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { IndustryKey, LiveState, ScenePhase, SceneState } from "./3DTypes";

/**
 * pending: first paint / canvas still loading (the static SVG poster is shown)
 * webgl:   the persistent canvas is rendering
 * static:  WebGL unavailable, low-power device, or reduced motion (SVG stays)
 */
export type SceneMode = "pending" | "webgl" | "static";

// The three.js chunk is only requested after first paint, once the browser is idle.
const ConnectedOperationsScene = dynamic(
  () => import("./ConnectedOperationsScene").then((m) => m.ConnectedOperationsScene),
  { ssr: false, loading: () => null }
);

class SceneBoundary extends React.Component<
  { onError: () => void; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Continuously changing scene inputs. A module-level object (one host per page) so
 * scroll and pointer handlers can mutate it without ever re-rendering React.
 */
const live: LiveState = {
  mouse: { x: 0, y: 0 },
  phaseProgress: 0,
  zone: { x: 0.5, y: 0, w: 0.5, h: 0.5 },
  step: -1,
};

/** Lets page sections highlight a workflow step in the scene without re-rendering React. */
export function publishSceneStep(step: number) {
  live.step = step;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

let capabilityCache: boolean | null = null;
/** WebGL available and the device does not look low-power / data-saving. */
function canRunWebGL(): boolean {
  if (capabilityCache !== null) return capabilityCache;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const lowPower =
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    nav.connection?.saveData === true;
  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (gl) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      webgl = true;
    }
  } catch {
    webgl = false;
  }
  capabilityCache = webgl && !lowPower;
  return capabilityCache;
}
const subscribeNone = () => () => {};

interface HostProps {
  activeProblem: number;
  activeServiceIndex: number;
  activePipelineStage: number;
  activeIndustry: IndustryKey;
  activeProcessStep: number;
  onModeChange?: (mode: SceneMode) => void;
}

export function OperationsCanvasHost({
  activeProblem,
  activeServiceIndex,
  activePipelineStage,
  activeIndustry,
  activeProcessStep,
  onModeChange,
}: HostProps) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const capable = useSyncExternalStore(subscribeNone, canRunWebGL, () => false);

  const [idle, setIdle] = useState(false); // browser idle after load: safe to fetch the 3D chunk
  const [ready, setReady] = useState(false); // first frame drawn
  const [failed, setFailed] = useState(false);
  const [phase, setPhase] = useState<ScenePhase>("hero");
  const [hidden, setHidden] = useState(false);
  const [inView, setInView] = useState(true);

  const staticOnly = reducedMotion || !capable || failed;
  const mountCanvas = idle && !staticOnly;
  const mode: SceneMode = staticOnly ? "static" : ready ? "webgl" : "pending";

  useEffect(() => onModeChange?.(mode), [mode, onModeChange]);

  // 1. Fetch the 3D bundle after first paint, when the browser is idle.
  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId = 0;
    let timeoutId = 0;
    const start = () => setIdle(true);
    const schedule = () => {
      if (win.requestIdleCallback) idleId = win.requestIdleCallback(start, { timeout: 2500 });
      else timeoutId = window.setTimeout(start, 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId && win.cancelIdleCallback) win.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  // 2. Stop rendering while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // 3. Pointer parallax, fine pointers only. Mutates `live`; never triggers a render.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      live.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      live.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // 4. Follow the page: pick the zone most visible in the viewport, publish its box.
  useEffect(() => {
    if (!mountCanvas) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let best: HTMLElement | null = null;
      let bestRect: DOMRect | null = null;
      let bestArea = 0;
      document.querySelectorAll<HTMLElement>("[data-scene-zone]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const ow = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
        const oh = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
        if (ow * oh > bestArea) {
          best = el;
          bestRect = r;
          bestArea = ow * oh;
        }
      });
      const visible = bestArea > 4000;
      setInView((prev) => (prev === visible ? prev : visible));
      if (!best || !bestRect) return;
      const el = best as HTMLElement;
      const r = bestRect as DOMRect;
      const next = el.dataset.scene as ScenePhase;
      setPhase((prev) => (prev === next ? prev : next));
      // Follow the visible part of the zone (tall zones are only partly on screen).
      const top = Math.max(r.top, 0);
      const bottom = Math.min(r.bottom, vh);
      const left = Math.max(r.left, 0);
      const right = Math.min(r.right, vw);
      live.zone.x = ((left + right) / 2 / vw) * 2 - 1;
      live.zone.y = -(((top + bottom) / 2 / vh) * 2 - 1);
      live.zone.w = (right - left) / vw;
      live.zone.h = Math.min(r.height, bottom - top) / vh;
      const sec = el.closest("section");
      if (sec) {
        const sr = sec.getBoundingClientRect();
        live.phaseProgress = clamp((vh * 0.5 - sr.top) / Math.max(sr.height, 1), 0, 1);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // Layout keeps settling for a moment after a resize or rotation (breakpoints,
    // the canvas resizing): measure again shortly after so the scene re-anchors.
    const timers: number[] = [];
    const onResize = () => {
      schedule();
      timers.push(window.setTimeout(schedule, 200), window.setTimeout(schedule, 600));
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      timers.forEach((t) => window.clearTimeout(t));
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mountCanvas]);

  const sceneState = useMemo<SceneState>(
    () => ({
      phase,
      problemIndex: activeProblem,
      serviceIndex: activeServiceIndex,
      pipelineStage: activePipelineStage,
      activeIndustry,
      processStep: activeProcessStep,
      isMobile,
      reducedMotion,
      isPaused: hidden || !inView,
      live,
    }),
    [phase, activeProblem, activeServiceIndex, activePipelineStage, activeIndustry, activeProcessStep, isMobile, reducedMotion, hidden, inView]
  );

  return (
    <div
      aria-hidden="true"
      // Hidden whenever no zone is on screen: a paused canvas keeps its last frame, which
      // would otherwise linger over text once its zone has scrolled away.
      // Above page content (below header, menus and the mobile bar) so pinned panels can
      // hide the text scrolling beneath them; behind the copy in the final CTA.
      className={`pointer-events-none fixed inset-0 ${phase === "cta" ? "z-0" : "z-[15]"} transition-opacity duration-300 ${
        mode === "webgl" && inView ? "opacity-100" : "opacity-0"
      }`}
    >
      {mountCanvas && (
        <SceneBoundary onError={() => setFailed(true)}>
          <ConnectedOperationsScene sceneState={sceneState} onReady={() => setReady(true)} />
        </SceneBoundary>
      )}
    </div>
  );
}
