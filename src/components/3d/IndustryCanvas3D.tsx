"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { IndustryCluster } from "./IndustryCluster";
import { SceneState, IndustryKey } from "./3DTypes";

interface IndustryCanvas3DProps {
  activeIndustry: IndustryKey;
}

export function IndustryCanvas3D({ activeIndustry }: IndustryCanvas3DProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const sceneState: SceneState = {
    phase: "industries",
    scrollProgress: 0.75,
    phaseProgress: 0.5,
    serviceIndex: 0,
    pipelineStage: 0,
    activeIndustry,
    processStep: 0,
    mouse,
    isMobile: false,
    reducedMotion: false,
    isPaused: false,
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouse({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-full min-h-[300px] overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight color="#0C2233" intensity={1.5} />
        <directionalLight position={[4, 5, 4]} color="#FF6B2C" intensity={1.2} />
        <directionalLight position={[-4, -3, 2]} color="#27D3C2" intensity={1.0} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.25}>
          <group position={[-2.4, 0, 0]}>
            <IndustryCluster sceneState={sceneState} />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
