"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { SceneState } from "./3DTypes";
import { HeroNetwork } from "./HeroNetwork";
import { ServicesFormations } from "./ServicesFormations";
import { Pipeline3D } from "./Pipeline3D";
import { IndustryCluster } from "./IndustryCluster";
import { ProcessTimeline3D } from "./ProcessTimeline3D";

interface SceneHostProps {
  sceneState: SceneState;
  onSelectPipelineStage?: (stage: number) => void;
}

function CameraRig({ sceneState }: { sceneState: SceneState }) {
  const { phase, mouse, reducedMotion, isMobile } = sceneState;

  useFrame((state) => {
    // Determine target camera position per phase
    const target = new THREE.Vector3(0, 0, isMobile ? 8.5 : 7.2);
    const lookAt = new THREE.Vector3(isMobile ? 0 : 0.8, 0, 0);

    switch (phase) {
      case "hero":
        target.set(isMobile ? 0 : -0.2, 0, isMobile ? 8.6 : 7.2);
        lookAt.set(isMobile ? 0 : 1.2, 0, 0);
        break;
      case "problem":
        target.set(0, 0, isMobile ? 9.2 : 8.4);
        lookAt.set(isMobile ? 0 : 0.6, 0, 0);
        break;
      case "services":
        target.set(isMobile ? 0 : 0.8, 0, isMobile ? 8.0 : 6.4);
        lookAt.set(isMobile ? 0 : 2.2, 0, 0);
        break;
      case "pipeline":
        target.set(0, -0.1, isMobile ? 8.8 : 7.2);
        lookAt.set(0, -0.2, 0);
        break;
      case "industries":
        target.set(isMobile ? 0 : 0.8, 0, isMobile ? 8.2 : 6.5);
        lookAt.set(isMobile ? 0 : 2.0, 0, 0);
        break;
      case "process":
        target.set(0, 0, isMobile ? 8.5 : 7.0);
        lookAt.set(0, 0, 0);
        break;
      case "cta":
        target.set(isMobile ? 0 : 0.4, 0.2, isMobile ? 7.6 : 6.0);
        lookAt.set(isMobile ? 0 : 1.6, 0.2, 0);
        break;
    }

    // Apply gentle mouse parallax
    if (!reducedMotion) {
      target.x += mouse.x * 0.4;
      target.y += mouse.y * 0.3;
    }

    // Smooth lerp
    state.camera.position.lerp(target, 0.04);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    state.camera.getWorldDirection(currentLookAt);
    state.camera.lookAt(lookAt);
  });

  return null;
}

export function ConnectedOperationsScene({ sceneState, onSelectPipelineStage }: SceneHostProps) {
  const { phase, isMobile, isPaused } = sceneState;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true,
        }}
        frameloop={isPaused ? "never" : "always"}
      >
        {/* Atmospheric Navy Fog */}
        <color attach="background" args={["#071A28"]} />
        <fog attach="fog" args={["#071A28", 5.0, 16.0]} />

        {/* Ambient & Accent Lighting */}
        <ambientLight color="#0C2233" intensity={1.2} />
        <directionalLight position={[4, 6, 5]} color="#FF6B2C" intensity={phase === "problem" ? 0.3 : 0.8} />
        <directionalLight position={[-4, -3, 3]} color="#27D3C2" intensity={0.5} />
        <pointLight position={[0, 2, 4]} color="#F5F8FC" intensity={0.3} />

        {/* Camera Lerp Rig */}
        <CameraRig sceneState={sceneState} />

        {/* Dynamic Phase Renderers */}
        {(phase === "hero" || phase === "problem" || phase === "cta") && (
          <HeroNetwork sceneState={sceneState} />
        )}

        {phase === "services" && (
          <ServicesFormations sceneState={sceneState} />
        )}

        {phase === "pipeline" && (
          <Pipeline3D
            sceneState={sceneState}
            onSelectStage={onSelectPipelineStage}
          />
        )}

        {phase === "industries" && (
          <IndustryCluster sceneState={sceneState} />
        )}

        {phase === "process" && (
          <ProcessTimeline3D sceneState={sceneState} />
        )}
      </Canvas>
    </div>
  );
}
