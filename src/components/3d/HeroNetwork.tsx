"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { SceneState } from "./3DTypes";

interface HeroNetworkProps {
  sceneState: SceneState;
}

interface NodeSpec {
  id: string;
  label: string;
  sub: string;
  basePos: [number, number, number];
  color: string;
  emissive: string;
  size: number;
}

const NODES: NodeSpec[] = [
  { id: "leads", label: "Inbound Leads", sub: "Ad & Webhooks", basePos: [2.2, 1.4, 0.2], color: "#FF6B2C", emissive: "#FF6B2C", size: 0.32 },
  { id: "whatsapp", label: "WhatsApp Cloud", sub: "Instant Messaging", basePos: [3.8, 0.6, 0.6], color: "#27D3C2", emissive: "#27D3C2", size: 0.28 },
  { id: "engine", label: "Workflow Engine", sub: "Deterministic Rules", basePos: [1.8, -0.4, -0.2], color: "#FF6B2C", emissive: "#FF6B2C", size: 0.36 },
  { id: "postgres", label: "PostgreSQL Core", sub: "ACID Database", basePos: [3.2, -1.2, 0.4], color: "#27D3C2", emissive: "#27D3C2", size: 0.34 },
  { id: "crm", label: "CRM Pipeline", sub: "Deals & Contacts", basePos: [4.6, -0.6, -0.4], color: "#FF6B2C", emissive: "#FF6B2C", size: 0.26 },
  { id: "payments", label: "Payment Gateway", sub: "Stripe & Razorpay", basePos: [1.2, 0.6, 0.8], color: "#27D3C2", emissive: "#27D3C2", size: 0.25 },
  { id: "analytics", label: "BI Intelligence", sub: "Real-time Telemetry", basePos: [3.4, 2.0, -0.2], color: "#FF6B2C", emissive: "#FF6B2C", size: 0.27 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], // leads -> whatsapp
  [0, 2], // leads -> engine
  [1, 2], // whatsapp -> engine
  [2, 3], // engine -> postgres
  [2, 4], // engine -> crm
  [5, 2], // payments -> engine
  [5, 3], // payments -> postgres
  [0, 6], // leads -> analytics
  [3, 6], // postgres -> analytics
  [4, 3], // crm -> postgres
];

export function HeroNetwork({ sceneState }: HeroNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const packetRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { phase, phaseProgress, mouse, isMobile, reducedMotion } = sceneState;

  // Build connection geometry lines
  const { linePositions, lineIndices } = useMemo(() => {
    const pos = new Float32Array(NODES.length * 3);
    NODES.forEach((n, idx) => {
      pos[idx * 3] = n.basePos[0];
      pos[idx * 3 + 1] = n.basePos[1];
      pos[idx * 3 + 2] = n.basePos[2];
    });

    const indices: number[] = [];
    CONNECTIONS.forEach(([a, b]) => {
      indices.push(a, b);
    });

    return { linePositions: pos, lineIndices: indices };
  }, []);

  // Pre-generate packet paths
  const packetData = useMemo(() => {
    return CONNECTIONS.map(([startIdx, endIdx], i) => ({
      start: new THREE.Vector3(...NODES[startIdx].basePos),
      end: new THREE.Vector3(...NODES[endIdx].basePos),
      speed: 0.4 + (i % 3) * 0.2,
      offset: (i * 0.3) % 1,
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Determine phase behavior
    // Hero: intact & breathing
    // Problem: disconnected & drifting apart (dispersion factor)
    // CTA: converged core
    let dispersion = 0;
    let convergence = 0;
    let opacityMult = 1;

    if (phase === "problem") {
      dispersion = THREE.MathUtils.lerp(0, 1.8, Math.min(phaseProgress * 1.5, 1));
      opacityMult = THREE.MathUtils.lerp(1, 0.35, phaseProgress);
    } else if (phase === "cta") {
      convergence = THREE.MathUtils.lerp(0, 0.75, Math.min(phaseProgress * 1.5, 1));
    }

    // Subtle group mouse parallax & gentle orbital float
    if (!reducedMotion) {
      const targetRotY = mouse.x * 0.25 + Math.sin(time * 0.2) * 0.08;
      const targetRotX = -mouse.y * 0.18 + Math.cos(time * 0.25) * 0.06;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    // Animate individual node meshes based on dispersion / convergence
    const children = groupRef.current.children;
    NODES.forEach((node, idx) => {
      const nodeObj = children[idx];
      if (!nodeObj) return;

      const base = new THREE.Vector3(...node.basePos);
      if (dispersion > 0) {
        // Disperse outwards randomly to illustrate fragmentation
        const dir = base.clone().normalize();
        const jitter = Math.sin(time * 3 + idx) * 0.1;
        base.addScaledVector(dir, dispersion + jitter);
      } else if (convergence > 0) {
        // Converge toward unified energetic center [2.8, 0.2, 0]
        const target = new THREE.Vector3(2.8, 0.2, 0);
        base.lerp(target, convergence);
      } else if (!reducedMotion) {
        // Subtle ambient hover
        base.y += Math.sin(time * 1.2 + idx * 0.8) * 0.06;
        base.x += Math.cos(time * 0.9 + idx * 0.5) * 0.04;
      }

      nodeObj.position.copy(base);
    });

    // Animate glowing data packets traveling along conduits
    if (packetRef.current && phase !== "problem") {
      packetData.forEach((pkt, i) => {
        const t = (time * pkt.speed + pkt.offset) % 1;
        const currentPos = new THREE.Vector3().lerpVectors(pkt.start, pkt.end, t);

        // Add subtle arc
        currentPos.y += Math.sin(t * Math.PI) * 0.15;

        dummy.position.copy(currentPos);
        const scale = (Math.sin(t * Math.PI) * 0.08 + 0.03) * (1 - convergence * 0.5);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        packetRef.current?.setMatrixAt(i, dummy.matrix);
      });
      packetRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[isMobile ? -0.5 : 0, 0, 0]}>
      {/* Primary Procedural Nodes */}
      {NODES.map((node) => (
        <group key={node.id} position={node.basePos}>
          {/* Inner core sphere */}
          <mesh>
            <sphereGeometry args={[node.size, 24, 24]} />
            <meshStandardMaterial
              color="#0C2233"
              emissive={node.emissive}
              emissiveIntensity={phase === "cta" ? 1.4 : 0.65}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Outer wireframe halo ring */}
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[node.size * 1.45, 0.012, 12, 32]} />
            <meshBasicMaterial color={node.color} opacity={0.65} transparent />
          </mesh>

          {/* Point light for local illumination glow */}
          <pointLight color={node.color} intensity={0.4} distance={2.5} />

          {/* Minimal 3D floating technical label (desktop only) */}
          {!isMobile && (
            <group position={[node.size * 1.35, node.size * 0.5, 0]}>
              <Text
                color="#F5F8FC"
                fontSize={0.11}
                maxWidth={2}
                lineHeight={1}
                letterSpacing={0.05}
                font="monospace"
                anchorX="left"
                anchorY="middle"
              >
                {node.label}
              </Text>
              <Text
                position={[0, -0.12, 0]}
                color="#AABAC8"
                fontSize={0.075}
                maxWidth={2}
                font="monospace"
                anchorX="left"
                anchorY="middle"
              >
                {`[ ${node.sub} ]`}
              </Text>
            </group>
          )}
        </group>
      ))}

      {/* Network conduits (LineSegments) */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[new Uint16Array(lineIndices), 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={phase === "problem" ? "#1B3652" : "#27D3C2"}
          transparent
          opacity={phase === "problem" ? 0.2 : 0.45}
        />
      </lineSegments>

      {/* Pulsing traveling data packets */}
      {phase !== "problem" && (
        <instancedMesh
          ref={packetRef}
          args={[undefined, undefined, packetData.length]}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#FF6B2C" transparent opacity={0.85} />
        </instancedMesh>
      )}
    </group>
  );
}
