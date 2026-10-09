export type ScenePhase =
  | "hero"
  | "problem"
  | "services"
  | "pipeline"
  | "industries"
  | "process"
  | "cta";

export type IndustryKey = "dental" | "real-estate" | "manufacturing" | "ecommerce";

export interface SceneState {
  phase: ScenePhase;
  scrollProgress: number; // 0 to 1 overall
  phaseProgress: number;  // 0 to 1 within active phase
  serviceIndex: number;   // 0 to 4
  pipelineStage: number;  // 0 to 3
  activeIndustry: IndustryKey;
  processStep: number;    // 0 to 4
  mouse: { x: number; y: number };
  isMobile: boolean;
  reducedMotion: boolean;
  isPaused: boolean;
}

export interface NodeData {
  id: string;
  label: string;
  role: string;
  basePosition: [number, number, number];
  color: string;
  size: number;
}
