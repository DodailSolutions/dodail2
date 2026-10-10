export type ScenePhase =
  | "hero"
  | "about"
  | "problem"
  | "services"
  | "pipeline"
  | "industries"
  | "process"
  | "cta";

export type IndustryKey = "dental" | "real-estate" | "manufacturing" | "ecommerce";

/**
 * Continuously changing values. Mutated in place (never React state) so scroll
 * and pointer movement do not re-render the R3F tree; scenes read it in useFrame.
 */
export interface LiveState {
  mouse: { x: number; y: number };
  /** 0..1 progress through the section that owns the active zone. */
  phaseProgress: number;
  /** Active zone as fractions of the viewport: centre in NDC (-1..1), size 0..1. */
  zone: { x: number; y: number; w: number; h: number };
  /** Workflow step currently highlighted by the page (industries), -1 = none. */
  step: number;
}

/** Discrete state. A new object is only created when one of these values changes. */
export interface SceneState {
  phase: ScenePhase;
  problemIndex: number; // 0 to 2
  serviceIndex: number; // 0 to 4
  pipelineStage: number; // 0 to 3
  activeIndustry: IndustryKey;
  processStep: number; // 0 to 4
  isMobile: boolean;
  reducedMotion: boolean;
  isPaused: boolean;
  live: LiveState;
}

export interface NodeData {
  id: string;
  label: string;
  role: string;
  basePosition: [number, number, number];
  color: string;
  size: number;
}
