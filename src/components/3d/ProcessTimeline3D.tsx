"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { SceneState } from "./3DTypes";

interface ProcessTimeline3DProps {
  sceneState: SceneState;
}

interface ProcessStage {
  step: number;
  title: string;
  subtitle: string;
  pos: [number, number, number];
  color: string;
}

const PROCESS_STAGES: ProcessStage[] = [
  { step: 0, title: "01 // DISCOVERY", subtitle: "Days 1–3", pos: [-3.2, 0.8, 0], color: "#FF6B2C" },
  { step: 1, title: "02 // SOLUTION DESIGN", subtitle: "Days 4–6", pos: [-1.6, -0.6, 0.4], color: "#27D3C2" },
  { step: 2, title: "03 // IMPLEMENTATION", subtitle: "Days 7–12", pos: [0.0, 0.8, -0.2], color: "#34D399" },
  { step: 3, title: "04 // TESTING", subtitle: "Days 13–15", pos: [1.6, -0.6, 0.3], color: "#A78BFA" },
  { step: 4, title: "05 // LAUNCH & EXPANSION", subtitle: "Continuous", pos: [3.2, 0.8, 0], color: "#FF6B2C" },
];

export function ProcessTimeline3D({ sceneState }: ProcessTimeline3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const { processStep, isMobile, reducedMotion, mouse } = sceneState;

  // Build curved spline through all stages
  const curve = useMemo(() => {
    const points = PROCESS_STAGES.map((s) => new THREE.Vector3(...s.pos));
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.035, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    if (!reducedMotion) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.2,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.15,
        0.05
      );
    }

    // Beacon moves to active stage
    if (beaconRef.current) {
      const activeStage = PROCESS_STAGES[processStep] || PROCESS_STAGES[0];
      const targetPos = new THREE.Vector3(...activeStage.pos);
      beaconRef.current.position.lerp(targetPos, 0.1);
      if (!reducedMotion) {
        const s = 1 + Math.sin(time * 6) * 0.2;
        beaconRef.current.scale.set(s, s, s);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={isMobile ? 0.6 : 0.95}>
      {/* 3D Spline Conduit */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color="#0C2233"
          emissive="#1B3652"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Traveling Active Beacon */}
      <mesh ref={beaconRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#FF6B2C" />
      </mesh>

      {/* Stage Waypoint Pylons */}
      {PROCESS_STAGES.map((st) => {
        const isActive = processStep === st.step;

        return (
          <group key={st.step} position={st.pos}>
            {/* Core marker */}
            <mesh>
              <cylinderGeometry args={[0.18, 0.18, 0.35, 16]} />
              <meshStandardMaterial
                color="#0C2233"
                emissive={isActive ? st.color : "#1B3652"}
                emissiveIntensity={isActive ? 1.0 : 0.3}
              />
            </mesh>

            {/* Orbit ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.3, 0.015, 8, 24]} />
              <meshBasicMaterial color={st.color} transparent opacity={isActive ? 0.8 : 0.3} />
            </mesh>

            {/* Label text */}
            <group position={[0, -0.45, 0]}>
              <Text
                color={isActive ? "#FF6B2C" : "#F5F8FC"}
                fontSize={0.14}
                maxWidth={2}
                font="monospace"
                anchorX="center"
                anchorY="middle"
              >
                {st.title}
              </Text>
              <Text
                position={[0, -0.18, 0]}
                color="#AABAC8"
                fontSize={0.1}
                maxWidth={2}
                font="monospace"
                anchorX="center"
                anchorY="middle"
              >
                {st.subtitle}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
}
