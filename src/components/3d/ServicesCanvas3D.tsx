"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { ServicesFormations } from "./ServicesFormations";
import { SceneState } from "./3DTypes";

interface ServicesCanvas3DProps {
  activeServiceIndex: number;
}

export function ServicesCanvas3D({ activeServiceIndex }: ServicesCanvas3DProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const sceneState: SceneState = {
    phase: "services",
    scrollProgress: 0.4,
    phaseProgress: 0.5,
    serviceIndex: activeServiceIndex,
    pipelineStage: 0,
    activeIndustry: "dental",
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
      className="relative w-full h-full min-h-[440px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-[#FF6B2C]/10 via-[#27D3C2]/5 to-transparent pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight color="#0C2233" intensity={1.5} />
        <directionalLight position={[4, 5, 4]} color="#FF6B2C" intensity={1.2} />
        <directionalLight position={[-4, -3, 2]} color="#27D3C2" intensity={1.0} />
        <pointLight position={[0, 0, 3]} color="#F5F8FC" intensity={0.6} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <group position={[-2.6, 0, 0]}>
            <ServicesFormations sceneState={sceneState} />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
