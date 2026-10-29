"use client";

import React, { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, NormalBlending, Points, ShaderMaterial, Vector2 } from "three";
import type { BufferGeometry as Geometry } from "three";
import { useFrame } from "@react-three/fiber";
import { SceneState } from "./3DTypes";
import { INDUSTRY_TINT, PALETTE, PHASE_NOMINAL, SCATTER_NOMINAL, buildShape, paletteIndices, shapeKey } from "./particleShapes";

/*
 * One particle system for the whole page. Each particle morphs on the GPU from
 * its slot in the previous shape (aFrom) to its slot in the next (aTo), with a
 * per-particle stagger, so the cloud "flows" between moments instead of cutting.
 */
const vertexShader = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec3 aColor;
  attribute float aSeed;
  attribute float aTag;
  attribute vec4 aMotionFrom;
  attribute vec4 aMotionTo;
  uniform float uMix;
  uniform float uTime;
  uniform float uChaos;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uActive;
  uniform float uDim;
  uniform vec3 uTint;
  uniform float uTintAmt;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float t = clamp(uMix * 1.6 - aSeed * 0.6, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aFrom, aTo, t);
    // Swirl outwards mid-flight, then settle.
    p += normalize(p + vec3(0.001)) * sin(t * 3.14159) * 0.22 * (0.4 + aSeed);
    // Content-driven flow: the particle loops along its flow vector (sand falling,
    // data moving between stages) and fades at both ends of the loop.
    vec4 mo = mix(aMotionFrom, aMotionTo, t);
    float flowing = step(0.0001, mo.w);
    float f = fract(aSeed * 13.0 + uTime * mo.w);
    p += mo.xyz * f * flowing;
    // Breathing drift; larger when uChaos is raised.
    float n = uTime * 0.6 + aSeed * 40.0;
    p += vec3(sin(n), cos(n * 1.3), sin(n * 0.7)) * (0.012 + uChaos * 0.22 * aSeed);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec4 proj = projectionMatrix * mv;
    vec2 ndc = proj.xy / proj.w;
    float mouseDist = length(ndc - uMouse);
    float mouseInfluence = smoothstep(0.44, 0.0, mouseDist) * uMouseActive;

    // Organic magnetic displacement away from cursor + forward swell
    p += normalize(p + vec3(0.001)) * mouseInfluence * 0.2;
    p.z += mouseInfluence * 0.14;

    mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    bool hasActive = uActive > -0.5;
    float isActive = (hasActive && abs(aTag - uActive) < 0.5) ? 1.0 : 0.0;
    float scale = length(modelMatrix[0].xyz);
    // Colour tags (particleShapes): -2 blue wisp, -3 gold, -4 large soft gold bokeh.
    vec3 base = aColor;
    float bokeh = 0.0;
    if (aTag < -1.5) {
      if (aTag > -2.5) base = mix(vec3(0.2, 0.52, 1.0), vec3(0.55, 0.85, 1.0), aSeed);
      else base = mix(vec3(1.0, 0.58, 0.16), vec3(1.0, 0.86, 0.5), aSeed) * 1.3; // glowing gold
      bokeh = aTag < -3.5 ? 1.0 : 0.0;
    }

    vec3 excitedColor = mix(base, vec3(1.0, 0.74, 0.4), 0.75);
    base = mix(base, excitedColor, mouseInfluence);

    gl_PointSize = uSize * (0.55 + aSeed * 0.9) * (1.0 + isActive * 0.5 + mouseInfluence * 0.4) * (1.0 + bokeh * 2.4) * uPixelRatio * scale / -mv.z;

    float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + aSeed * 60.0);
    vColor = mix(base, uTint, uTintAmt) * (1.0 + isActive * 0.7 + mouseInfluence * 0.55);
    vAlpha = (twinkle + mouseInfluence * 0.35) * uDim * (hasActive ? (isActive > 0.5 ? 1.0 : 0.4) : 1.0) * (1.0 - bokeh * 0.6);
    vAlpha *= mix(1.0, min(1.0, sin(f * 3.14159) * 1.6), flowing);
  }
`;

// Dark theme: additive glow. Light theme: additive blending adds light to a near-white page and
// all but disappears, so use normal blending with deepened colours (near-white dots become navy).
const fragmentShader = /* glsl */ `
  uniform float uLight;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // Soft glow edge on dark (additive); a crisper, near-solid disc on light so dots stay distinct
    // on white instead of blurring together.
    float a = smoothstep(0.5, mix(0.05, 0.36, uLight), d);
    float lum = dot(vColor, vec3(0.299, 0.587, 0.114));
    // Deepen the palette and blend part-way toward one ink navy so the multicolour specks read as a
    // cohesive drawing on white (instead of dusty noise), while keeping the orange/teal accents.
    vec3 ink = vec3(0.10, 0.14, 0.22);
    vec3 lightColor = mix(mix(vColor * 0.72, ink, 0.30), ink, smoothstep(0.7, 0.95, lum));
    vec3 color = mix(vColor, lightColor, uLight);
    gl_FragColor = vec4(color, a * vAlpha * mix(0.85, 1.0, uLight));
  }
`;

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export function ParticleField({ sceneState }: { sceneState: SceneState }) {
  const { phase, serviceIndex, activeIndustry, pipelineStage, processStep, problemIndex, isMobile, live } = sceneState;
  const count = isMobile ? 2800 : 7000;
  const key = shapeKey(phase, serviceIndex, activeIndustry, problemIndex);

  const pointsRef = useRef<Points>(null);
  const lastKey = useRef<string | null>(null);
  const lastNominal = useRef<[number, number]>(SCATTER_NOMINAL);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const lastGeometry = useRef<Geometry | null>(null);
  const mix = useRef(0);
  const tint = useMemo(() => new Color(), []);

  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    // The page opens with the parts scattered; they assemble into the hero brain.
    const start = buildShape("scatter", count).pos;
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const idx = paletteIndices(count);
    const palette = PALETTE.map(([hex]) => new Color(hex));
    for (let i = 0; i < count; i++) {
      const c = palette[idx[i]];
      colors.set([c.r, c.g, c.b], i * 3);
      seeds[i] = ((i * 2654435761) % 1000) / 1000;
    }
    g.setAttribute("position", new BufferAttribute(new Float32Array(start), 3));
    g.setAttribute("aFrom", new BufferAttribute(new Float32Array(start), 3));
    g.setAttribute("aTo", new BufferAttribute(new Float32Array(start), 3));
    g.setAttribute("aTag", new BufferAttribute(new Float32Array(count).fill(-1), 1));
    g.setAttribute("aMotionFrom", new BufferAttribute(new Float32Array(count * 4), 4));
    g.setAttribute("aMotionTo", new BufferAttribute(new Float32Array(count * 4), 4));
    g.setAttribute("aColor", new BufferAttribute(colors, 3));
    g.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uMix: { value: 0 },
          uTime: { value: 0 },
          uChaos: { value: 0 },
          uSize: { value: 21 },
          uPixelRatio: { value: 1 },
          uLight: { value: 0 },
          uActive: { value: -1 },
          uDim: { value: 1 },
          uTint: { value: new Color("#ffffff") },
          uTintAmt: { value: 0 },
          uMouse: { value: new Vector2(999, 999) },
          uMouseActive: { value: 0 },
        },
      }),
    []
  );

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const geo = pts.geometry;
    const mat = pts.material as ShaderMaterial;
    const u = mat.uniforms;

    // The field is rebuilt when the particle count changes (e.g. a phone rotating past
    // the mobile breakpoint): start over from the scatter and morph into the current shape.
    if (lastGeometry.current !== geo) {
      lastGeometry.current = geo;
      lastKey.current = null;
      lastNominal.current = SCATTER_NOMINAL;
      mix.current = 0;
    }

    // Start a morph whenever the target shape changes, from wherever particles are now.
    if (lastKey.current !== key) {
      const fromA = geo.getAttribute("aFrom") as BufferAttribute;
      const toA = geo.getAttribute("aTo") as BufferAttribute;
      const tagA = geo.getAttribute("aTag") as BufferAttribute;
      const seedA = geo.getAttribute("aSeed") as BufferAttribute;
      const mFromA = geo.getAttribute("aMotionFrom") as BufferAttribute;
      const mToA = geo.getAttribute("aMotionTo") as BufferAttribute;
      const from = fromA.array as Float32Array;
      const to = toA.array as Float32Array;
      const mFrom = mFromA.array as Float32Array;
      const mTo = mToA.array as Float32Array;
      const m = mix.current;
      // Rescale the outgoing shape to the incoming zone's size so the morph starts
      // inside the new frame instead of spilling over neighbouring text.
      const next = PHASE_NOMINAL[phase];
      const k = Math.min(next[0] / lastNominal.current[0], next[1] / lastNominal.current[1]);
      lastNominal.current = next;
      for (let i = 0; i < count; i++) {
        let t = Math.min(Math.max(m * 1.6 - (seedA.array[i] as number) * 0.6, 0), 1);
        t = t * t * (3 - 2 * t);
        for (let a = 0; a < 3; a++) from[i * 3 + a] = (from[i * 3 + a] + (to[i * 3 + a] - from[i * 3 + a]) * t) * k;
        for (let a = 0; a < 4; a++) {
          const v = mFrom[i * 4 + a] + (mTo[i * 4 + a] - mFrom[i * 4 + a]) * t;
          mFrom[i * 4 + a] = a < 3 ? v * k : v; // scale the flow vector, not its speed
        }
      }
      const target = buildShape(key, count);
      to.set(target.pos);
      mTo.set(target.motion);
      (tagA.array as Float32Array).set(target.tag);
      for (const attr of [fromA, toA, tagA, mFromA, mToA]) attr.needsUpdate = true;
      lastKey.current = key;
      mix.current = 0;
    }
    mix.current = Math.min(1, mix.current + delta / 1.7);

    const time = state.clock.elapsedTime;
    u.uMix.value = mix.current;
    u.uTime.value = time;
    u.uPixelRatio.value = state.gl.getPixelRatio();
    // Theme is set on <html data-theme> by ThemeScript/ThemeToggle; read it per frame so the field
    // follows a toggle without remounting the canvas.
    const light = document.documentElement.getAttribute("data-theme") === "light";
    u.uLight.value = light ? 1 : 0;
    const wantBlending = light ? NormalBlending : AdditiveBlending;
    if (mat.blending !== wantBlending) {
      mat.blending = wantBlending;
      mat.needsUpdate = true;
    }
    u.uSize.value = (isMobile ? 25 : 21) * (light ? 1.35 : 1);
    u.uChaos.value = lerp(u.uChaos.value, phase === "problem" && problemIndex === 2 ? 0.25 : 0, 0.04);
    u.uDim.value = lerp(u.uDim.value, phase === "problem" ? 0.85 : phase === "cta" ? 1.15 : 1, 0.05);
    u.uActive.value =
      phase === "pipeline" ? pipelineStage : phase === "process" ? processStep : phase === "industries" ? live.step : -1;
    tint.set(phase === "industries" ? INDUSTRY_TINT[activeIndustry] : "#ffffff");
    (u.uTint.value as Color).lerp(tint, 0.08);
    u.uTintAmt.value = lerp(u.uTintAmt.value, phase === "industries" ? 0.55 : 0, 0.06);

    // Smooth mouse coordinates for shader magnetic aura
    const sm = smoothMouse.current;
    sm.x = lerp(sm.x, live.mouse.x, 0.08);
    sm.y = lerp(sm.y, live.mouse.y, 0.08);
    if (u.uMouse) {
      (u.uMouse.value as Vector2).set(sm.x, sm.y);
      u.uMouseActive.value = lerp(u.uMouseActive.value, isMobile ? 0 : 1, 0.06);
    }

    // Brain phases sway in profile; the other shapes face the reader with parallax.
    const brainPhase = phase === "hero" || phase === "cta";
    const ry = brainPhase
      ? -0.35 + Math.sin(time * 0.15) * 0.3
      : phase === "problem"
        ? Math.sin(time * 0.2) * 0.25
        : phase === "about"
          ? Math.sin(time * 0.18) * 0.22
          : 0;

    const targetRotY = ry + live.mouse.x * 0.45;
    const targetRotX = (brainPhase ? 0.14 : 0.08) - live.mouse.y * 0.28;
    const targetRotZ = -live.mouse.x * 0.12;

    pts.rotation.y = lerp(pts.rotation.y, targetRotY, 0.065);
    pts.rotation.x = lerp(pts.rotation.x, targetRotX, 0.065);
    pts.rotation.z = lerp(pts.rotation.z, targetRotZ, 0.065);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}
