"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Pipeline3D } from "./Pipeline3D";
import { SceneState } from "./3DTypes";

interface PipelineCanvas3DProps {
  activePipelineStage: number;
  onSelectStage: (stage: number) => void;
}

export function PipelineCanvas3D({ activePipelineStage, onSelectStage }: PipelineCanvas3DProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const sceneState: SceneState = {
    phase: "pipeline",
    scrollProgress: 0.6,
    phaseProgress: 0.5,
    serviceIndex: 0,
    pipelineStage: activePipelineStage,
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
      className="relative w-full h-[320px] sm:h-[380px] bg-[#071A28]/80 border border-[#1B3652] overflow-hidden mb-8"
    >
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-[#AABAC8] uppercase tracking-wider bg-[#0C2233]/80 px-2.5 py-1 border border-[#1B3652]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>INTERACTIVE 3D CONDUIT // CLICK STAGES TO INSPECT</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight color="#0C2233" intensity={1.4} />
        <directionalLight position={[4, 5, 4]} color="#FF6B2C" intensity={1.1} />
        <directionalLight position={[-4, -3, 2]} color="#27D3C2" intensity={0.9} />
        <pointLight position={[0, 0, 3]} color="#F5F8FC" intensity={0.5} />

        <Pipeline3D sceneState={sceneState} onSelectStage={onSelectStage} />
      </Canvas>
    </div>
  );
}
