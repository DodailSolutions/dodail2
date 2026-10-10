import React from "react";
import { BRAND, PALETTE, PIPELINE_ICONS, PROCESS_ICONS, TAG_BLUE, TAG_BOKEH, TAG_GOLD, buildShape, paletteIndices, primsToPath } from "./particleShapes";

type Dot = { x: number; y: number; r: number; fill: string };

/** Project a particle shape to 2D dots. Deterministic, so server and client markup match. */
function posterDots(key: string, points: number, rotY: number, size: number): Dot[] {
  const { pos, tag } = buildShape(key, points);
  const colors = paletteIndices(points);
  const c = Math.cos(rotY);
  const s = Math.sin(rotY);
  const dots: Dot[] = [];
  for (let i = 0; i < points; i++) {
    const x = pos[i * 3];
    const y = pos[i * 3 + 1];
    const z = pos[i * 3 + 2];
    const depth = -x * s + z * c; // nearer points drawn larger
    const t = tag[i];
    const fill = t === TAG_BLUE ? "#4FA3FF" : t === TAG_GOLD ? (i % 3 ? "#FFB547" : "#FFD98A") : t === TAG_BOKEH ? "#FFC266" : PALETTE[colors[i]][0];
    dots.push({
      x: +(x * c + z * s).toFixed(2),
      y: +(-y).toFixed(2),
      r: +((size + size * 0.55 * ((depth + 2) / 4)) * (t === TAG_BOKEH ? 2.6 : 1)).toFixed(3),
      fill,
    });
  }
  return dots;
}

const heroDots = posterDots("hero", 460, -0.35, 0.026);
const buddhaDots = posterDots("about", 700, 0, 0.014);

function Poster({ dots, viewBox, glow, className }: { dots: Dot[]; viewBox: string; glow: [number, number, number, number]; className: string }) {
  const id = `glow-${viewBox.replace(/[^0-9]/g, "")}`;
  return (
    <svg className={className} viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor={BRAND.orange} stopOpacity="0.22" />
          <stop offset="100%" stopColor={BRAND.orange} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={glow[0]} cy={glow[1]} rx={glow[2]} ry={glow[3]} fill={`url(#${id})`} />
      <g opacity="0.85">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.fill} />
        ))}
      </g>
    </svg>
  );
}

/**
 * Static SVG version of the hero particle brain: same generator and palette as the
 * WebGL field. Shown as the first-paint poster and whenever WebGL is not used.
 */
export function HeroParticlesSVG({ className = "" }: { className?: string }) {
  return <Poster dots={heroDots} viewBox="-3.1 -2.5 6.2 5" glow={[0, -0.1, 3, 2.4]} className={className} />;
}

/** Static SVG version of the About-section particle Buddha. */
export function BuddhaParticlesSVG({ className = "" }: { className?: string }) {
  return <Poster dots={buddhaDots} viewBox="-1.75 -1.6 3.5 3.2" glow={[0, -0.2, 1.4, 1.4]} className={className} />;
}

/** Static four-stage pipeline, used when the 3D pipeline is not rendered. */
export function PipelineSVG({ active = 0, className = "" }: { active?: number; className?: string }) {
  const xs = [100, 300, 500, 700]; // quarter centres: one icon above each card
  return (
    <svg className={className} viewBox="0 0 800 170" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      {xs.slice(1).map((x, i) => (
        <line key={x} x1={xs[i] + 64} y1="85" x2={x - 64} y2="85" stroke={i % 2 === 0 ? BRAND.orange : BRAND.cyan} strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      ))}
      {xs.map((x, i) => {
        const color = i % 2 === 0 ? BRAND.orange : BRAND.cyan;
        const on = i === active;
        // Same four icons as the WebGL pipeline: message, filter, record + alert, answered.
        return (
          <g key={x} transform={`translate(${x},85)`} opacity={on ? 1 : 0.55}>
            <path d={primsToPath(PIPELINE_ICONS[i], 120)} fill="none" stroke={color} strokeWidth={on ? 4 : 3} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Small line icon for a pipeline or process step, drawn from the same shapes as the
 * 3D scene. Used inside each card on phones, where a wide 3D strip would be too small.
 */
export function StepIcon({
  set,
  index,
  active = false,
  className = "",
}: {
  set: "pipeline" | "process";
  index: number;
  active?: boolean;
  className?: string;
}) {
  const prims = (set === "pipeline" ? PIPELINE_ICONS : PROCESS_ICONS)[index];
  return (
    <svg className={className} viewBox="-62 -62 124 124" aria-hidden="true" focusable="false">
      <path
        d={primsToPath(prims, 100)}
        fill="none"
        stroke={active ? BRAND.orange : "#8A929E"}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 300ms" }}
      />
    </svg>
  );
}
