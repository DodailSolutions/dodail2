"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { SceneState } from "./3DTypes";

interface Pipeline3DProps {
  sceneState: SceneState;
  onSelectStage?: (stage: number) => void;
}

const STAGES = [
  { index: 0, title: "01 // TRIGGER", label: "Inbound Signal", desc: "WhatsApp / Web Form", x: -3.0, color: "#FF6B2C" },
  { index: 1, title: "02 // PROCESSING", label: "Deterministic Rules", desc: "Schema & Validation", x: -1.0, color: "#27D3C2" },
  { index: 2, title: "03 // ACTION", label: "Automated Mutation", desc: "PostgreSQL & Webhook", x: 1.0, color: "#FF6B2C" },
  { index: 3, title: "04 // OUTCOME", label: "Verified Delivery", desc: "Zero-Latency Booking", x: 3.0, color: "#27D3C2" },
];

export function Pipeline3D({ sceneState, onSelectStage }: Pipeline3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const packetRef = useRef<THREE.InstancedMesh>(null);
  const { pipelineStage, isMobile, reducedMotion, mouse } = sceneState;

  const dummy = React.useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
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

    // Animate data packets moving through the 3 conduit segments
    if (packetRef.current && !reducedMotion) {
      for (let i = 0; i < 6; i++) {
        // total path from x = -3 to x = 3
        const speed = 0.55;
        const progress = (time * speed + i * 0.18) % 1;
        const x = THREE.MathUtils.lerp(-3.0, 3.0, progress);
        const y = Math.sin(progress * Math.PI * 3) * 0.08;

        dummy.position.set(x, y, 0);
        dummy.scale.set(0.08, 0.08, 0.08);
        dummy.updateMatrix();
        packetRef.current.setMatrixAt(i, dummy.matrix);
      }
      packetRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={isMobile ? 0.6 : 0.95}>
      {/* Connecting Conduit Tubes */}
      {[-2.0, 0.0, 2.0].map((midX, i) => (
        <group key={i} position={[midX, 0, 0]}>
          {/* Outer conduit tube */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 2.0, 16]} />
            <meshStandardMaterial
              color="#0C2233"
              emissive="#1B3652"
              emissiveIntensity={0.6}
              roughness={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
          {/* Inner laser conduit core */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 2.0, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#FF6B2C" : "#27D3C2"} />
          </mesh>
        </group>
      ))}

      {/* Traveling Data Packets */}
      {!reducedMotion && (
        <instancedMesh ref={packetRef} args={[undefined, undefined, 6]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#FF6B2C" />
        </instancedMesh>
      )}

      {/* 4 Pipeline Stages */}
      {STAGES.map((stage) => {
        const isActive = pipelineStage === stage.index;

        return (
          <group
            key={stage.index}
            position={[stage.x, 0, 0]}
            onClick={() => onSelectStage?.(stage.index)}
          >
            {/* Stage Capsule / Cylinder Core */}
            <mesh scale={isActive ? 1.18 : 1.0}>
              <cylinderGeometry args={[0.42, 0.42, 0.9, 32]} />
              <meshStandardMaterial
                color="#0C2233"
                emissive={isActive ? stage.color : "#1B3652"}
                emissiveIntensity={isActive ? 0.95 : 0.3}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing active beacon ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <torusGeometry args={[0.55, 0.02, 16, 32]} />
              <meshBasicMaterial
                color={stage.color}
                transparent
                opacity={isActive ? 0.9 : 0.3}
              />
            </mesh>

            {isActive && (
              <pointLight color={stage.color} intensity={0.9} distance={2.5} />
            )}

            {/* Technical Typography Labels */}
            <group position={[0, -0.85, 0]}>
              <Text
                color={isActive ? "#FF6B2C" : "#F5F8FC"}
                fontSize={0.16}
                maxWidth={2}
                font="monospace"
                anchorX="center"
                anchorY="middle"
              >
                {stage.title}
              </Text>
              <Text
                position={[0, -0.22, 0]}
                color="#AABAC8"
                fontSize={0.12}
                maxWidth={2}
                font="monospace"
                anchorX="center"
                anchorY="middle"
              >
                {stage.label}
              </Text>
              <Text
                position={[0, -0.4, 0]}
                color={isActive ? stage.color : "#1B3652"}
                fontSize={0.09}
                maxWidth={2}
                font="monospace"
                anchorX="center"
                anchorY="middle"
              >
                {`[ ${stage.desc} ]`}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
}
