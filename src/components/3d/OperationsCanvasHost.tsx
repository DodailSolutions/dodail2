"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { SceneState, ScenePhase, IndustryKey } from "./3DTypes";
import { CanvasFallback } from "./CanvasFallback";

// Lazy-load the R3F Canvas bundle without SSR
const ConnectedOperationsScene = dynamic(
  () =>
    import("./ConnectedOperationsScene").then((mod) => mod.ConnectedOperationsScene),
  {
    ssr: false,
    loading: () => <CanvasFallback />,
  }
);

interface OperationsCanvasHostProps {
  activeServiceIndex?: number;
  activePipelineStage?: number;
  activeIndustry?: IndustryKey;
  activeProcessStep?: number;
  onSelectPipelineStage?: (stage: number) => void;
}

export function OperationsCanvasHost({
  activeServiceIndex = 0,
  activePipelineStage = 0,
  activeIndustry = "dental",
  activeProcessStep = 0,
  onSelectPipelineStage,
}: OperationsCanvasHostProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [sceneState, setSceneState] = useState<SceneState>({
    phase: "hero",
    scrollProgress: 0,
    phaseProgress: 0,
    serviceIndex: 0,
    pipelineStage: 0,
    activeIndustry: "dental",
    processStep: 0,
    mouse: { x: 0, y: 0 },
    isMobile: false,
    reducedMotion: false,
    isPaused: false,
  });

  // 1. Detect WebGL support and user preferences
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkReducedMotion = () => {
      setSceneState((prev) => ({
        ...prev,
        reducedMotion: motionQuery.matches,
      }));
    };
    checkReducedMotion();
    motionQuery.addEventListener("change", checkReducedMotion);

    const checkMobile = () => {
      setSceneState((prev) => ({
        ...prev,
        isMobile: window.innerWidth < 768,
      }));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      motionQuery.removeEventListener("change", checkReducedMotion);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // 2. Tab visibility handling for performance budget
  useEffect(() => {
    const handleVisibilityChange = () => {
      setSceneState((prev) => ({
        ...prev,
        isPaused: document.hidden,
      }));
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 3. Mouse parallax listener
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    setSceneState((prev) => ({
      ...prev,
      mouse: { x: normX, y: normY },
    }));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // 4. Scroll tracking to determine active 3D phase based on section elements in the DOM
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalDocHeight > 0 ? Math.min(Math.max(scrollY / totalDocHeight, 0), 1) : 0;

      // Map progress to distinct scene phases
      let currentPhase: ScenePhase = "hero";
      let localProgress = 0;

      if (progress < 0.14) {
        currentPhase = "hero";
        localProgress = progress / 0.14;
      } else if (progress < 0.32) {
        currentPhase = "problem";
        localProgress = (progress - 0.14) / 0.18;
      } else if (progress < 0.52) {
        currentPhase = "services";
        localProgress = (progress - 0.32) / 0.20;
      } else if (progress < 0.70) {
        currentPhase = "pipeline";
        localProgress = (progress - 0.52) / 0.18;
      } else if (progress < 0.82) {
        currentPhase = "industries";
        localProgress = (progress - 0.70) / 0.12;
      } else if (progress < 0.92) {
        currentPhase = "process";
        localProgress = (progress - 0.82) / 0.10;
      } else {
        currentPhase = "cta";
        localProgress = (progress - 0.92) / 0.08;
      }

      setSceneState((prev) => ({
        ...prev,
        phase: currentPhase,
        scrollProgress: progress,
        phaseProgress: Math.min(Math.max(localProgress, 0), 1),
      }));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5. Synchronize external state (active service, stage, industry, step)
  useEffect(() => {
    setSceneState((prev) => ({
      ...prev,
      serviceIndex: activeServiceIndex,
      pipelineStage: activePipelineStage,
      activeIndustry: activeIndustry,
      processStep: activeProcessStep,
    }));
  }, [activeServiceIndex, activePipelineStage, activeIndustry, activeProcessStep]);

  // Fallback if WebGL unavailable or reduced motion
  if (hasWebGL === false) {
    return <CanvasFallback reducedMotion={sceneState.reducedMotion} />;
  }

  return (
    <ConnectedOperationsScene
      sceneState={sceneState}
      onSelectPipelineStage={onSelectPipelineStage}
    />
  );
}
