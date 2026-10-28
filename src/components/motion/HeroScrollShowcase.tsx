"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import {
  Activity,
  Check,
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Layers,
  RefreshCw,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";

export function HeroScrollShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Scroll driven 3D perspective transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rotateX = useTransform(smoothProgress, [0, 1], [14, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [0.7, 1]);
  
  const prefersReducedMotion = useReducedMotion();

  const [activeTab, setActiveTab] = React.useState<"stream" | "topology">("stream");

  return (
    <div ref={containerRef} className="relative mt-12 sm:mt-16 w-full perspective-[1200px]">
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          scale: prefersReducedMotion ? 1 : scale,
          opacity: prefersReducedMotion ? 1 : opacity,
          transformStyle: "preserve-3d",
        }}
        className="mx-auto max-w-5xl rounded-none border border-border-strong bg-surface shadow-2xl overflow-hidden relative"
      >
        {/* Registration Crosshairs */}
        <div className="absolute top-2 left-2 font-mono text-[10px] text-[#FF6B2C] select-none pointer-events-none">+</div>
        <div className="absolute top-2 right-2 font-mono text-[10px] text-[#27D3C2] select-none pointer-events-none">+</div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#27D3C2] select-none pointer-events-none">+</div>
        <div className="absolute bottom-2 right-2 font-mono text-[10px] text-[#FF6B2C] select-none pointer-events-none">+</div>

        {/* Device Window Header Bar (Swiss Style Toolbar) */}
        <div className="flex items-center justify-between border-b border-border-strong bg-bg px-4 sm:px-6 py-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#FF6B2C]">
              [DOD // SYS-01]
            </div>
            <span className="font-mono text-fg-muted border-l border-border-strong pl-3 hidden sm:inline text-[11px] uppercase tracking-wider">
              dodail.engine.core // runtime-telemetry
            </span>
          </div>

          <div className="flex items-center gap-0 border border-border-strong bg-surface" role="tablist">
            <button
              onClick={() => setActiveTab("stream")}
              role="tab"
              aria-selected={activeTab === "stream"}
              aria-controls="panel-stream"
              id="tab-stream"
              className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                activeTab === "stream"
                  ? "bg-[#FF6B2C] text-[#071A28] font-bold"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              Event Stream
            </button>
            <button
              onClick={() => setActiveTab("topology")}
              role="tab"
              aria-selected={activeTab === "topology"}
              aria-controls="panel-topology"
              id="tab-topology"
              className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors border-l border-border-strong ${
                activeTab === "topology"
                  ? "bg-[#FF6B2C] text-[#071A28] font-bold"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              Architecture Matrix
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-none bg-emerald-400"></span>
            <span className="hidden sm:inline uppercase tracking-wider">SYNCHRONIZED</span>
          </div>
        </div>

        {/* Console Workspace */}
        {activeTab === "stream" ? (
          <div className="p-6 sm:p-8" role="tabpanel" id="panel-stream" aria-labelledby="tab-stream">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Telemetry Column */}
              <div className="md:col-span-4 space-y-4">
                <div className="p-5 rounded-none bg-bg border border-border-strong">
                  <span className="text-[10px] font-mono text-fg-muted uppercase tracking-[0.16em] block mb-1">
                    System Accuracy
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-fg flex items-baseline gap-2 tracking-tight">
                    <span>99.98%</span>
                    <span className="text-xs text-emerald-400 font-mono font-normal">0 FAILURES</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-fg-muted border-t border-border-strong pt-2 font-mono">
                    <span>QUEUE LATENCY:</span>
                    <strong className="text-fg">18ms</strong>
                  </div>
                </div>

                <div className="p-5 rounded-none bg-bg border border-border-strong">
                  <span className="text-[10px] font-mono text-fg-muted uppercase tracking-[0.16em] block mb-1">
                    Verified Endpoints
                  </span>
                  <div className="space-y-2 mt-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-fg">
                      <span>WhatsApp Cloud API</span>
                      <span className="text-emerald-400">OK</span>
                    </div>
                    <div className="flex items-center justify-between text-fg">
                      <span>Supabase PostgreSQL</span>
                      <span className="text-emerald-400">POOLED (4ms)</span>
                    </div>
                    <div className="flex items-center justify-between text-fg">
                      <span>CRM Webhook Router</span>
                      <span className="text-emerald-400">HMAC VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Live Stream Ledger */}
              <div className="md:col-span-8 space-y-2.5">
                <div className="text-[11px] font-mono text-fg-muted uppercase tracking-[0.16em] mb-2 flex items-center justify-between">
                  <span>REAL-TIME TRANSACTION AUDIT TRAIL</span>
                  <span className="text-[#FF6B2C] font-semibold">STREAMING</span>
                </div>

                {/* Event Row 1 */}
                <div className="p-3.5 rounded-none bg-bg border border-border-strong flex items-center justify-between gap-4 text-xs font-mono hover:border-[#FF6B2C] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 shrink-0" />
                    <div>
                      <span className="text-fg font-bold">WHATSAPP_INQUIRY_RECEIVED</span>
                      <p className="text-[11px] text-fg-muted font-sans">
                        Patient Emergency Molar Slot Booked (Clinic Dr. Reddy)
                      </p>
                    </div>
                  </div>
                  <span className="text-fg-muted shrink-0">340ms · OK</span>
                </div>

                {/* Event Row 2 */}
                <div className="p-3.5 rounded-none bg-bg border border-border-strong flex items-center justify-between gap-4 text-xs font-mono hover:border-[#FF6B2C] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 shrink-0" />
                    <div>
                      <span className="text-fg font-bold">LEAD_QUALIFIED_TIER_A</span>
                      <p className="text-[11px] text-fg-muted font-sans">
                        ₹3.5 Cr Luxury Villa Inquiry → Senior Director Alerted
                      </p>
                    </div>
                  </div>
                  <span className="text-fg-muted shrink-0">410ms · OK</span>
                </div>

                {/* Event Row 3 */}
                <div className="p-3.5 rounded-none bg-bg border border-border-strong flex items-center justify-between gap-4 text-xs font-mono hover:border-[#FF6B2C] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 shrink-0" />
                    <div>
                      <span className="text-fg font-bold">RETURN_LOGISTICS_DISPATCHED</span>
                      <p className="text-[11px] text-fg-muted font-sans">
                        DTC Order #9821 Size Exchange → Courier Slip Auto-Created
                      </p>
                    </div>
                  </div>
                  <span className="text-fg-muted shrink-0">190ms · OK</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 font-mono text-xs" role="tabpanel" id="panel-topology" aria-labelledby="tab-topology">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-none bg-bg border border-border-strong">
                <span className="text-[#FF6B2C] block mb-2 font-bold uppercase tracking-wider">01 · INGESTION LAYER</span>
                <p className="text-fg font-sans leading-relaxed mb-3">
                  Inbound Webhooks, Meta Ads, WhatsApp Cloud API, and Stripe Checkout triggers.
                </p>
                <span className="text-fg-muted text-[11px]">→ Rate limited & TLS 1.3 verified</span>
              </div>

              <div className="p-5 rounded-none bg-bg border border-border-strong">
                <span className="text-[#27D3C2] block mb-2 font-bold uppercase tracking-wider">02 · LOGIC & EVALUATION</span>
                <p className="text-fg font-sans leading-relaxed mb-3">
                  Deterministic business rules, schema guardrails, and context-bound AI evaluation.
                </p>
                <span className="text-fg-muted text-[11px]">→ Zero unverified hallucinations</span>
              </div>

              <div className="p-5 rounded-none bg-bg border border-border-strong">
                <span className="text-emerald-400 block mb-2 font-bold uppercase tracking-wider">03 · PERSISTENCE & SYNC</span>
                <p className="text-fg font-sans leading-relaxed mb-3">
                  PostgreSQL ACID state updates, CRM bi-directional writes, and user notification.
                </p>
                <span className="text-fg-muted text-[11px]">→ Instant & audit-logged</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer info strip */}
        <div className="border-t border-border-strong bg-bg px-6 py-3 flex items-center justify-between text-xs text-fg-muted font-mono">
          <span>ENCRYPTED END-TO-END // ZERO DATA LEAKAGE</span>
          <Link href="/services/ai-automation/" className="text-[#FF6B2C] hover:text-fg flex items-center gap-1 font-semibold">
            <span>Explore Technical Architecture</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
