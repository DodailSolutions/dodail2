"use client";

import React, { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";

interface AutonomousBrainCoreProps {
  reducedMotion?: boolean;
}

// Procedural multi-faceted neural cluster with geometric facets
function NeuralCore({ mouse, reducedMotion }: { mouse: { x: number; y: number }; reducedMotion: boolean }) {
  const brainGroup = useRef<THREE.Group>(null);
  const coreMesh = useRef<THREE.Mesh>(null);
  const wireMesh = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Generate neural nodes in a 3D dual-cluster constellation
  const nodes = useMemo(() => {
    const list: {
      id: string;
      label: string;
      pos: [number, number, number];
      color: string;
      size: number;
    }[] = [
      // Left hemisphere (Operations & Ingestion)
      { id: "leads", label: "Inbound Leads", pos: [-1.4, 0.9, 0.4], color: "#FF6B2C", size: 0.2 },
      { id: "whatsapp", label: "WhatsApp API", pos: [-1.7, 0.1, -0.3], color: "#27D3C2", size: 0.18 },
      { id: "triage", label: "Triage Engine", pos: [-1.2, -0.8, 0.5], color: "#FF6B2C", size: 0.22 },
      { id: "rules", label: "Schema Validation", pos: [-0.6, 1.4, -0.2], color: "#27D3C2", size: 0.16 },
      // Right hemisphere (Execution & Intelligence)
      { id: "postgres", label: "PostgreSQL ACID", pos: [1.3, 0.8, -0.4], color: "#27D3C2", size: 0.22 },
      { id: "crm", label: "CRM Sync", pos: [1.6, -0.2, 0.3], color: "#FF6B2C", size: 0.19 },
      { id: "payments", label: "Stripe Webhook", pos: [1.1, -0.9, -0.5], color: "#27D3C2", size: 0.17 },
      { id: "telemetry", label: "BI Intelligence", pos: [0.6, 1.3, 0.4], color: "#FF6B2C", size: 0.18 },
      // Central nucleus (Autonomous Core)
      { id: "core", label: "Dodail Autonomous Core", pos: [0, 0, 0], color: "#FF6B2C", size: 0.32 },
    ];
    return list;
  }, []);

  // Neural connecting paths
  const connections = useMemo(() => {
    return [
      [0, 1], [0, 2], [1, 2], [0, 8], [1, 8], [2, 8],
      [4, 5], [5, 6], [4, 7], [4, 8], [5, 8], [6, 8],
      [3, 0], [7, 4], [3, 7], [2, 6],
    ];
  }, []);

  // Lines geometry
  const linePositions = useMemo(() => {
    const coords: number[] = [];
    connections.forEach(([a, b]) => {
      coords.push(...nodes[a].pos, ...nodes[b].pos);
    });
    return new Float32Array(coords);
  }, [connections, nodes]);

  // Floating data packet particles
  const particleGeo = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!brainGroup.current) return;
    const time = state.clock.getElapsedTime();

    if (!reducedMotion) {
      // Gentle continuous rotation + smooth mouse tilt
      const targetRotY = time * 0.22 + mouse.x * 0.45;
      const targetRotX = Math.sin(time * 0.3) * 0.1 - mouse.y * 0.35;

      brainGroup.current.rotation.y = THREE.MathUtils.lerp(
        brainGroup.current.rotation.y,
        targetRotY,
        0.05
      );
      brainGroup.current.rotation.x = THREE.MathUtils.lerp(
        brainGroup.current.rotation.x,
        targetRotX,
        0.05
      );

      // Core pulsating breathing
      if (coreMesh.current) {
        const pulse = 1 + Math.sin(time * 2.4) * 0.05;
        coreMesh.current.scale.set(pulse, pulse, pulse);
      }

      // Wireframe rotation
      if (wireMesh.current) {
        wireMesh.current.rotation.y += delta * 0.3;
        wireMesh.current.rotation.x -= delta * 0.2;
      }

      // Orbiting gyroscopic rings
      if (ring1.current && ring2.current && ring3.current) {
        ring1.current.rotation.z += delta * 0.5;
        ring2.current.rotation.x += delta * 0.4;
        ring3.current.rotation.y += delta * 0.6;
      }

      // Particle cloud drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = -time * 0.1;
      }
    }
  });

  return (
    <group ref={brainGroup}>
      {/* 1. CENTRAL GEOMETRIC BRAIN / NUCLEUS (Icosahedron Facets) */}
      <mesh ref={coreMesh}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#0C2233"
          emissive="#FF6B2C"
          emissiveIntensity={0.65}
          roughness={0.15}
          metalness={0.85}
          flatShading
        />
      </mesh>

      {/* 2. OUTER CRYSTALLINE WIREFRAME CAGE */}
      <mesh ref={wireMesh}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial
          color="#27D3C2"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* 3. ORBITING CONDUIT RINGS (Energy gyroscopes) */}
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 64]} />
        <meshStandardMaterial color="#FF6B2C" emissive="#FF6B2C" emissiveIntensity={0.7} />
      </mesh>
      <mesh ref={ring2} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.1, 0.018, 16, 64]} />
        <meshStandardMaterial color="#27D3C2" emissive="#27D3C2" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI / 2, Math.PI / 6]}>
        <torusGeometry args={[1.7, 0.015, 16, 64]} />
        <meshStandardMaterial color="#FF6B2C" emissive="#FF6B2C" emissiveIntensity={0.5} />
      </mesh>

      {/* 4. NEURAL CONDUIT LINES */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#27D3C2" transparent opacity={0.6} />
      </lineSegments>

      {/* 5. INDIVIDUAL SYSTEM NODES WITH GLOW */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;

        return (
          <group
            key={node.id}
            position={node.pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredNode(node.id);
            }}
            onPointerOut={() => setHoveredNode(null)}
          >
            {/* Glowing node sphere */}
            <mesh scale={isHovered ? 1.4 : 1.0}>
              <sphereGeometry args={[node.size, 20, 20]} />
              <meshStandardMaterial
                color="#0C2233"
                emissive={node.color}
                emissiveIntensity={isHovered ? 1.5 : 0.85}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>

            {/* Orbiting halo marker */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[node.size * 1.4, 0.012, 8, 24]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.7} />
            </mesh>

            {/* Local illumination light */}
            <pointLight color={node.color} intensity={0.5} distance={1.8} />

            {/* Interactive label tag */}
            {node.id !== "core" && (
              <group position={[0, node.size + 0.18, 0]}>
                <Text
                  color={isHovered ? "#FF6B2C" : "#F5F8FC"}
                  fontSize={0.11}
                  maxWidth={2}
                  font="monospace"
                  anchorX="center"
                  anchorY="middle"
                >
                  {node.label}
                </Text>
              </group>
            )}
          </group>
        );
      })}

      {/* 6. ORBITING DATA PARTICLES */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.035}
          color="#FF6B2C"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central light source */}
      <pointLight color="#FF6B2C" intensity={1.5} distance={4.5} />
      <pointLight color="#27D3C2" intensity={1.0} distance={4.0} position={[0, -1, 1]} />
    </group>
  );
}

export function AutonomousBrainCore({ reducedMotion = false }: AutonomousBrainCoreProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouse({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-none overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* Background radial glow behind the 3D model */}
      <div className="absolute inset-0 bg-gradient-radial from-[#FF6B2C]/15 via-[#27D3C2]/5 to-transparent pointer-events-none" />

      {/* Top technical watermark badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-[#0C2233]/80 border border-[#1B3652] text-[10px] font-mono text-[#AABAC8] uppercase tracking-wider backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>AUTONOMOUS OPERATIONS ENGINE // LIVE SIMULATION</span>
      </div>

      {/* Bottom technical hint */}
      <div className="absolute bottom-4 right-4 z-10 text-right">
        <span className="text-[10px] font-mono text-[#AABAC8] bg-[#0C2233]/80 px-2.5 py-1 border border-[#1B3652]">
          [ MOUSE INTERACTIVE · 3D FACET CORE ]
        </span>
      </div>

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight color="#0C2233" intensity={1.4} />
        <directionalLight position={[4, 5, 4]} color="#FF6B2C" intensity={1.2} />
        <directionalLight position={[-4, -3, 2]} color="#27D3C2" intensity={0.9} />
        <pointLight position={[0, 0, 3]} color="#F5F8FC" intensity={0.5} />

        <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.3}>
          <NeuralCore mouse={mouse} reducedMotion={reducedMotion} />
        </Float>
      </Canvas>
    </div>
  );
}
