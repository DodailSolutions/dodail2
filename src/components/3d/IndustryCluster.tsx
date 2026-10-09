"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { SceneState, IndustryKey } from "./3DTypes";

interface IndustryClusterProps {
  sceneState: SceneState;
}

interface SectorConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  nodes: { label: string; desc: string; pos: [number, number, number] }[];
}

const SECTOR_CONFIGS: Record<IndustryKey, SectorConfig> = {
  dental: {
    name: "HEALTHCARE // DENTAL & CLINICAL",
    primaryColor: "#27D3C2",
    secondaryColor: "#34D399",
    nodes: [
      { label: "Emergency Triage", desc: "Pain Score Filter", pos: [-1.8, 0.8, 0] },
      { label: "Patient Intake", desc: "WhatsApp Medical Form", pos: [0, 1.4, 0.2] },
      { label: "Doctor Schedule", desc: "Real-time Slot Hold", pos: [1.8, 0.8, 0] },
      { label: "SMS Confirmation", desc: "Pre-visit Instructions", pos: [0, -0.6, 0] },
    ],
  },
  "real-estate": {
    name: "REAL ESTATE // DEVELOPERS & BROKERS",
    primaryColor: "#FF6B2C",
    secondaryColor: "#27D3C2",
    nodes: [
      { label: "Inbound Portal Lead", desc: "Verified Phone & Unit", pos: [-1.8, 0.8, 0] },
      { label: "Budget Qualifier", desc: "Down-payment & Timeline", pos: [0, 1.4, 0.2] },
      { label: "Brochure Dispatch", desc: "Instant PDF over WhatsApp", pos: [1.8, 0.8, 0] },
      { label: "Site Visit Booked", desc: "Agent Calendar Reserved", pos: [0, -0.6, 0] },
    ],
  },
  manufacturing: {
    name: "MANUFACTURING // INDUSTRIAL & SUPPLY",
    primaryColor: "#FBBF24",
    secondaryColor: "#38BDF8",
    nodes: [
      { label: "Purchase Order PDF", desc: "Raw PDF Parsing OCR", pos: [-1.8, 0.8, 0] },
      { label: "Inventory Match", desc: "ERP Stock Verification", pos: [0, 1.4, 0.2] },
      { label: "Dispatch Slip", desc: "Auto-generated Waybill", pos: [1.8, 0.8, 0] },
      { label: "Consignment Sync", desc: "Carrier Logistics API", pos: [0, -0.6, 0] },
    ],
  },
  ecommerce: {
    name: "E-COMMERCE // RETAIL & DTC SYSTEMS",
    primaryColor: "#34D399",
    secondaryColor: "#A78BFA",
    nodes: [
      { label: "Order / Return Signal", desc: "Shopify Webhook", pos: [-1.8, 0.8, 0] },
      { label: "Policy Validator", desc: "Eligibility & Window Check", pos: [0, 1.4, 0.2] },
      { label: "Reverse Pickup Slip", desc: "Carrier Shipping Label", pos: [1.8, 0.8, 0] },
      { label: "Inventory Restock", desc: "WMS Atomic Increment", pos: [0, -0.6, 0] },
    ],
  },
};

export function IndustryCluster({ sceneState }: IndustryClusterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { activeIndustry, reducedMotion, isMobile, mouse } = sceneState;

  const config = SECTOR_CONFIGS[activeIndustry] || SECTOR_CONFIGS.dental;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    if (!reducedMotion) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.25 + Math.sin(time * 0.3) * 0.05,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 2.4, 0, 0]} scale={isMobile ? 0.7 : 0.95}>
      {/* Central sector label */}
      <Text
        position={[0, 2.2, 0]}
        color={config.primaryColor}
        fontSize={0.16}
        maxWidth={3.5}
        font="monospace"
        anchorX="center"
        anchorY="middle"
      >
        {config.name}
      </Text>

      {/* Nodes */}
      {config.nodes.map((node, i) => (
        <group key={`${activeIndustry}-${i}`} position={node.pos}>
          {/* Node sphere */}
          <mesh>
            <sphereGeometry args={[0.34, 24, 24]} />
            <meshStandardMaterial
              color="#0C2233"
              emissive={i % 2 === 0 ? config.primaryColor : config.secondaryColor}
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Halo ring */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.48, 0.015, 12, 32]} />
            <meshBasicMaterial color={config.primaryColor} transparent opacity={0.6} />
          </mesh>

          {/* Label text */}
          <group position={[0, -0.55, 0]}>
            <Text
              color="#F5F8FC"
              fontSize={0.13}
              maxWidth={2}
              font="monospace"
              anchorX="center"
              anchorY="middle"
            >
              {node.label}
            </Text>
            <Text
              position={[0, -0.18, 0]}
              color="#AABAC8"
              fontSize={0.09}
              maxWidth={2}
              font="monospace"
              anchorX="center"
              anchorY="middle"
            >
              {node.desc}
            </Text>
          </group>
        </group>
      ))}

      {/* Cross connect conduits */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.015, 0.015, 2.6, 8]} />
        <meshBasicMaterial color={config.primaryColor} transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.015, 0.015, 2.6, 8]} />
        <meshBasicMaterial color={config.secondaryColor} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
