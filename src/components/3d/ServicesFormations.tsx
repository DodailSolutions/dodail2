"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { SceneState } from "./3DTypes";

interface ServicesFormationsProps {
  sceneState: SceneState;
}

export function ServicesFormations({ sceneState }: ServicesFormationsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const stackRef = useRef<THREE.Group>(null);
  const growthRef = useRef<THREE.Group>(null);
  const prismRef = useRef<THREE.Mesh>(null);
  const storeRef = useRef<THREE.Group>(null);

  const { serviceIndex, reducedMotion, isMobile, mouse } = sceneState;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Smooth hover / mouse response
    if (!reducedMotion) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.35 + (time * 0.1),
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.25,
        0.05
      );
    }

    // Formation 0: AI Automation rings
    if (ringRef1.current && ringRef2.current && ringRef3.current && !reducedMotion) {
      ringRef1.current.rotation.x += delta * 0.6;
      ringRef1.current.rotation.y += delta * 0.4;
      ringRef2.current.rotation.y += delta * 0.7;
      ringRef2.current.rotation.z += delta * 0.3;
      ringRef3.current.rotation.z += delta * 0.5;
    }

    // Formation 1: Software Stack hovering levels
    if (stackRef.current && !reducedMotion) {
      stackRef.current.children.forEach((child: THREE.Object3D, i: number) => {
        child.position.y = (i - 1) * 0.55 + Math.sin(time * 2 + i) * 0.05;
        child.rotation.y = Math.sin(time * 0.8 + i) * 0.1;
      });
    }

    // Formation 2: Storefront frame pulse
    if (storeRef.current && !reducedMotion) {
      storeRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
    }

    // Formation 3: Growth bars
    if (growthRef.current && !reducedMotion) {
      growthRef.current.children.forEach((child: THREE.Object3D, i: number) => {
        const mesh = child as THREE.Mesh;
        const targetScaleY = 0.6 + i * 0.5 + Math.sin(time * 2 + i * 0.8) * 0.15;
        mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, targetScaleY, 0.1);
      });
    }

    // Formation 4: Geometric Prism
    if (prismRef.current && !reducedMotion) {
      prismRef.current.rotation.y += delta * 0.4;
      prismRef.current.rotation.x += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 2.6, 0, 0]}>
      {/* 0: AI Automation — Gyroscopic conduits */}
      <group visible={serviceIndex === 0}>
        <mesh ref={ringRef1}>
          <torusGeometry args={[1.5, 0.035, 16, 48]} />
          <meshStandardMaterial color="#FF6B2C" emissive="#FF6B2C" emissiveIntensity={0.6} />
        </mesh>
        <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.2, 0.03, 16, 48]} />
          <meshStandardMaterial color="#27D3C2" emissive="#27D3C2" emissiveIntensity={0.5} />
        </mesh>
        <mesh ref={ringRef3} rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[0.9, 0.025, 16, 48]} />
          <meshStandardMaterial color="#FF6B2C" emissive="#FF6B2C" emissiveIntensity={0.4} />
        </mesh>
        {/* Core processing sphere */}
        <mesh>
          <sphereGeometry args={[0.38, 24, 24]} />
          <meshStandardMaterial color="#0C2233" emissive="#27D3C2" emissiveIntensity={0.8} roughness={0.1} />
        </mesh>
        <pointLight color="#FF6B2C" intensity={0.8} distance={3} />
      </group>

      {/* 1: Custom Software & SaaS — Tiered Modular Architecture */}
      <group ref={stackRef} visible={serviceIndex === 1}>
        {[0, 1, 2].map((lvl) => (
          <group key={lvl} position={[0, (lvl - 1) * 0.55, 0]}>
            <mesh>
              <boxGeometry args={[1.8 - lvl * 0.25, 0.16, 1.4 - lvl * 0.2]} />
              <meshStandardMaterial
                color="#0C2233"
                emissive={lvl === 1 ? "#FF6B2C" : "#27D3C2"}
                emissiveIntensity={0.4}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            {/* Wireframe border */}
            <mesh>
              <boxGeometry args={[1.82 - lvl * 0.25, 0.17, 1.42 - lvl * 0.2]} />
              <meshBasicMaterial color="#1B3652" wireframe />
            </mesh>
          </group>
        ))}
        <pointLight color="#27D3C2" intensity={0.6} distance={3} />
      </group>

      {/* 2: Website & E-Commerce — 3D Storefront Canvas */}
      <group ref={storeRef} visible={serviceIndex === 2}>
        {/* Outer browser/store frame */}
        <mesh>
          <boxGeometry args={[2.0, 1.5, 0.08]} />
          <meshStandardMaterial color="#0C2233" emissive="#10293B" emissiveIntensity={0.5} />
        </mesh>
        {/* Neon active border */}
        <mesh>
          <boxGeometry args={[2.02, 1.52, 0.085]} />
          <meshBasicMaterial color="#FF6B2C" wireframe />
        </mesh>
        {/* Internal product showcase plane */}
        <mesh position={[0, -0.1, 0.08]}>
          <planeGeometry args={[1.6, 1.0]} />
          <meshStandardMaterial color="#071A28" emissive="#27D3C2" emissiveIntensity={0.3} />
        </mesh>
        {/* Floating conversion pill */}
        <mesh position={[0, -0.4, 0.22]}>
          <capsuleGeometry args={[0.08, 0.6, 8, 16]} />
          <meshStandardMaterial color="#FF6B2C" emissive="#FF6B2C" emissiveIntensity={0.8} />
        </mesh>
        <pointLight color="#FF6B2C" intensity={0.7} distance={3} />
      </group>

      {/* 3: Digital Marketing & SEO — Ascending 3D Growth Bars */}
      <group ref={growthRef} visible={serviceIndex === 3}>
        {[-1.0, -0.5, 0, 0.5, 1.0].map((x, i) => (
          <mesh key={i} position={[x, -0.6, 0]}>
            <boxGeometry args={[0.26, 1, 0.26]} />
            <meshStandardMaterial
              color="#0C2233"
              emissive={i >= 3 ? "#FF6B2C" : "#27D3C2"}
              emissiveIntensity={0.3 + i * 0.12}
            />
          </mesh>
        ))}
        {/* Growth trajectory vector line */}
        <mesh position={[0, 0.35, 0.2]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
          <meshStandardMaterial color="#FF6B2C" emissive="#FF6B2C" emissiveIntensity={0.9} />
        </mesh>
        <pointLight color="#FF6B2C" intensity={0.8} distance={3} />
      </group>

      {/* 4: Branding & UI/UX — Kinetic Geometric Prism */}
      <group visible={serviceIndex === 4}>
        <mesh ref={prismRef}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#0C2233"
            emissive="#27D3C2"
            emissiveIntensity={0.65}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <octahedronGeometry args={[1.25, 0]} />
          <meshBasicMaterial color="#FF6B2C" wireframe opacity={0.6} transparent />
        </mesh>
        <pointLight color="#27D3C2" intensity={0.8} distance={3} />
      </group>
    </group>
  );
}
