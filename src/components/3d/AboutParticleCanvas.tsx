"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, NormalBlending, ShaderMaterial, TextureLoader, Vector2 } from "three";
import { mulberry32 } from "./particleShapes";

/**
 * The About card's three.js scene: the Dodail HQ artwork drawn as a dense grid of particles, each
 * taking its colour straight from the (sky-removed) artwork texture, so the building and the
 * signboard logo are reproduced faithfully. The particles assemble from a scatter when the card
 * scrolls in, shimmer gently, and ripple away from the pointer. See scripts/build-about-art.mjs.
 */
export const ART_URL = "/brand/about-hq-art.webp";
export const ART_ASPECT = 696 / 638;

const vertexShader = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerOn;
  uniform vec2 uHalf;
  uniform float uSize;
  uniform float uLod;
  attribute vec2 aUv;
  attribute float aSeed;
  varying vec3 vCol;
  varying float vA;

  void main() {
    vec4 t = textureLod(uTex, aUv, uLod);
    vec2 target = vec2((aUv.x - 0.5) * uHalf.x * 2.0, (0.5 - aUv.y) * uHalf.y * 2.0);

    // Scatter origin: a loose cloud around the card, then each particle flies home on its own delay.
    float ang = aSeed * 43.9823;
    vec2 origin = vec2(cos(ang), sin(ang * 1.37)) * uHalf.x * (0.7 + aSeed * 1.1);
    float p = clamp(uProgress * 1.55 - aSeed * 0.55, 0.0, 1.0);
    float e = 1.0 - pow(1.0 - p, 3.0);
    vec2 pos = mix(origin, target, e);

    // Idle shimmer once assembled.
    pos += vec2(sin(uTime * 1.2 + aSeed * 40.0), cos(uTime * 1.0 + aSeed * 29.0)) * uHalf.x * 0.0035 * p;

    // Pointer ripple: particles are pushed away from the cursor and swell a little.
    vec2 d = pos - uPointer;
    float r = length(d);
    float k = smoothstep(uHalf.x * 0.3, 0.0, r) * uPointerOn;
    pos += (d / max(r, 0.001)) * k * uHalf.x * 0.07;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
    gl_PointSize = t.a > 0.07 ? uSize * (1.0 + k * 0.5) : 0.0;
    vCol = t.rgb;
    vA = t.a * smoothstep(0.0, 0.2, p);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uLight;
  varying vec3 vCol;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.3, d) * vA;
    if (a < 0.02) discard;
    // On the light card the white signboard would vanish: darken the art a touch.
    vec3 c = mix(vCol, vCol * 0.9, uLight);
    gl_FragColor = vec4(c, a);
  }
`;

function Cloud({ active, onReady }: { active: boolean; onReady: () => void }) {
  const { size, gl } = useThree();
  const cols = size.width < 520 ? 150 : 230;
  const rows = Math.round(cols / ART_ASPECT);

  const geometry = useMemo(() => {
    const n = cols * rows;
    const uv = new Float32Array(n * 2);
    const seed = new Float32Array(n);
    const rnd = mulberry32(1337); // a real random sequence: index-based hashes line up into diagonal stripes
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        // Cell centres, with a hair of jitter so the grid does not read as a screen-door pattern.
        uv[i * 2] = (x + 0.5 + (rnd() - 0.5) * 0.28) / cols;
        uv[i * 2 + 1] = (y + 0.5 + (rnd() - 0.5) * 0.28) / rows;
        seed[i] = rnd();
      }
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute("aUv", new BufferAttribute(uv, 2));
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    return g;
  }, [cols, rows]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: NormalBlending,
        uniforms: {
          uTex: { value: null },
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uPointer: { value: new Vector2(9999, 9999) },
          uPointerOn: { value: 0 },
          uHalf: { value: new Vector2(1, 1) },
          uSize: { value: 2 },
          uLod: { value: 1 },
          uLight: { value: 0 },
        },
      }),
    []
  );

  const loaded = useRef(false);
  const reported = useRef(false);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0, on: 0, target: 0 });

  useEffect(() => {
    let cancelled = false;
    new TextureLoader().load(ART_URL, (tex) => {
      if (cancelled) return;
      tex.flipY = false; // aUv.y = 0 is the top row of the image
      material.uniforms.uTex.value = tex;
      loaded.current = true;
    });
    return () => {
      cancelled = true;
    };
  }, [material]);

  // Pointer position relative to this canvas, in canvas pixels centred on the middle (fine pointers only).
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const canvas = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      pointer.current.target = inside ? 1 : 0;
      pointer.current.x = e.clientX - r.left - r.width / 2;
      pointer.current.y = r.height / 2 - (e.clientY - r.top);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame((state, delta) => {
    if (!loaded.current || !active) return;
    const u = material.uniforms;
    const fitW = Math.min(size.width, size.height * ART_ASPECT);
    const fitH = fitW / ART_ASPECT;
    (u.uHalf.value as Vector2).set(fitW / 2, fitH / 2);
    const dpr = gl.getPixelRatio();
    u.uSize.value = (fitW / cols) * 1.42 * dpr;
    u.uLod.value = Math.max(0, Math.log2((696 / cols) * 0.9));
    progress.current = Math.min(1, progress.current + delta / 2.8);
    u.uProgress.value = progress.current;
    u.uTime.value = state.clock.elapsedTime;
    pointer.current.on += (pointer.current.target - pointer.current.on) * 0.12;
    (u.uPointer.value as Vector2).set(pointer.current.x, pointer.current.y);
    u.uPointerOn.value = pointer.current.on;
    u.uLight.value = document.documentElement.getAttribute("data-theme") === "light" ? 1 : 0;
    if (!reported.current && progress.current > 0.12) {
      reported.current = true;
      onReady();
    }
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

export default function AboutParticleCanvas({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas
      className="!absolute inset-0"
      orthographic
      flat
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], zoom: 1, near: 0.1, far: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Cloud active={active} onReady={onReady} />
    </Canvas>
  );
}
