"use client";

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScenePhase, SceneState } from "./3DTypes";
import { SceneAnchor } from "./SceneAnchor";
import { ParticleField } from "./ParticleField";
import { PHASE_NOMINAL } from "./particleShapes";

interface SceneProps {
  sceneState: SceneState;
  onReady?: () => void;
}

/** Small per-phase camera offsets: the "travel" between moments, kept subtle. */
const CAMERA_OFFSET: Record<ScenePhase, [number, number]> = {
  hero: [0, 0],
  about: [0, 0.05],
  problem: [0.35, 0.1],
  services: [-0.3, 0.15],
  pipeline: [0, 0.2],
  industries: [0.3, -0.1],
  process: [0, 0.1],
  cta: [0, 0],
};

function CameraRig({ sceneState }: { sceneState: SceneState }) {
  const { phase, live } = sceneState;
  useFrame((state) => {
    const [ox, oy] = CAMERA_OFFSET[phase];
    state.camera.position.x += (ox + live.mouse.x * 0.28 - state.camera.position.x) * 0.04;
    state.camera.position.y += (oy + live.mouse.y * 0.18 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function ConnectedOperationsScene({ sceneState, onReady }: SceneProps) {
  const { isMobile, isPaused, phase, live } = sceneState;
  return (
    <Canvas
      className="!absolute inset-0"
      flat
      dpr={isMobile ? 1 : [1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={isPaused ? "never" : "always"}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady?.();
      }}
    >
      <CameraRig sceneState={sceneState} />
      {/* One anchor, never remounted: the cloud glides from zone to zone while it morphs. */}
      <SceneAnchor live={live} nominal={PHASE_NOMINAL[phase]} snapKey={phase}>
        <ParticleField sceneState={sceneState} />
      </SceneAnchor>
    </Canvas>
  );
}
