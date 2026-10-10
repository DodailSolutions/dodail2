"use client";

import React, { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { LiveState } from "./3DTypes";

interface SceneAnchorProps {
  live: LiveState;
  /** Nominal content size in world units; the anchor scales it to fit the zone. */
  nominal: [number, number];
  /** Changing this (the section) snaps to the new zone instead of gliding across the page. */
  snapKey: string;
  children: React.ReactNode;
}

/**
 * Keeps its children centred on the active HTML "zone" (a reserved, empty box in
 * the page). That is what guarantees the 3D never sits underneath text: layout
 * decides where the scene may live, and the scene follows it while scrolling.
 */
export function SceneAnchor({ live, nominal, snapKey, children }: SceneAnchorProps) {
  const ref = useRef<Group>(null);
  const snapped = useRef(false);
  const lastKey = useRef(snapKey);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const { width: vw, height: vh } = state.viewport;
    const z = live.zone;
    const tx = (z.x * vw) / 2;
    const ty = (z.y * vh) / 2;
    const fit = Math.min((z.w * vw) / nominal[0], (z.h * vh) / nominal[1]);
    const ts = Math.min(Math.max(fit, 0.2), 1.5);

    if (lastKey.current !== snapKey) {
      lastKey.current = snapKey;
      snapped.current = false;
    }
    if (!snapped.current) {
      g.position.set(tx, ty, 0);
      g.scale.setScalar(ts);
      snapped.current = true;
      return;
    }
    g.position.x += (tx - g.position.x) * 0.2;
    g.position.y += (ty - g.position.y) * 0.2;
    g.scale.setScalar(g.scale.x + (ts - g.scale.x) * 0.15);
  });

  return <group ref={ref}>{children}</group>;
}
