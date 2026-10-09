"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  const scale = useTransform(smoothProgress, [0, 1], [0.93, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [0.6, 1]);

  const [activeTab, setActiveTab] = React.useState<"stream" | "topology">("stream");

  return (
    <div ref={containerRef} className="relative mt-12 sm:mt-16 w-full perspective-[1200px]">
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="mx-auto max-w-5xl rounded-2xl border border-white/[0.12] bg-[#0A0D14]/95 shadow-2xl shadow-black/90 overflow-hidden"
      >
        {/* Device Window Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0D111A] px-4 sm:px-6 py-3.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FA5B0F]/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <span className="font-mono text-slate-400 border-l border-white/10 pl-3 hidden sm:inline text-[11px]">
              dodail.engine.core // runtime-cluster-01
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/[0.06]">
            <button
              onClick={() => setActiveTab("stream")}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                activeTab === "stream"
                  ? "bg-[#FA5B0F] text-white font-semibold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Event Stream
            </button>
            <button
              onClick={() => setActiveTab("topology")}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                activeTab === "topology"
                  ? "bg-[#FA5B0F] text-white font-semibold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              System Topology
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">Active & Synchronized</span>
          </div>
        </div>

        {/* Console Workspace */}
        {activeTab === "stream" ? (
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Telemetry Column */}
              <div className="md:col-span-4 space-y-4">
                <div className="p-4 rounded-xl bg-[#06080E] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                    Throughput Status
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-white flex items-baseline gap-2">
                    <span>99.98%</span>
                    <span className="text-xs text-emerald-400 font-mono font-normal">0 errors</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06] pt-2">
                    <span>Queue Lag:</span>
                    <strong className="text-white font-mono">18ms</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#06080E] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                    Live Connections
                  </span>
                  <div className="space-y-2 mt-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>WhatsApp Cloud API</span>
                      <span className="text-emerald-400">Connected</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>PostgreSQL State Store</span>
                      <span className="text-emerald-400">Pooled (4ms)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Salesforce / CRM</span>
                      <span className="text-emerald-400">OAuth Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Live Stream Ledger */}
              <div className="md:col-span-8 space-y-2.5">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Recent Real-Time Executions</span>
                  <span className="text-[#FA5B0F]">Auto-refreshing</span>
                </div>

                {/* Event Row 1 */}
                <div className="p-3.5 rounded-xl bg-[#06080E] border border-white/[0.06] flex items-center justify-between gap-4 text-xs font-mono hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <span className="text-white font-semibold">WHATSAPP_INQUIRY_RECEIVED</span>
                      <p className="text-[11px] text-slate-400 font-sans">
                        Patient Emergency Molar Slot Booked (Clinic Dr. Reddy)
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-500 shrink-0">340ms · OK</span>
                </div>

                {/* Event Row 2 */}
                <div className="p-3.5 rounded-xl bg-[#06080E] border border-white/[0.06] flex items-center justify-between gap-4 text-xs font-mono hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <span className="text-white font-semibold">LEAD_QUALIFIED_TIER_A</span>
                      <p className="text-[11px] text-slate-400 font-sans">
                        ₹3.5 Cr Luxury Villa Inquiry → Senior Director Alerted
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-500 shrink-0">410ms · OK</span>
                </div>

                {/* Event Row 3 */}
                <div className="p-3.5 rounded-xl bg-[#06080E] border border-white/[0.06] flex items-center justify-between gap-4 text-xs font-mono hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <span className="text-white font-semibold">RETURN_LOGISTICS_DISPATCHED</span>
                      <p className="text-[11px] text-slate-400 font-sans">
                        DTC Order #9821 Size Exchange → Courier Slip Auto-Created
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-500 shrink-0">190ms · OK</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#06080E] border border-white/[0.06]">
                <span className="text-[#FA5B0F] block mb-2 font-bold">LAYER 1 · INGESTION</span>
                <p className="text-slate-300 font-sans leading-relaxed mb-3">
                  Inbound Webhooks, Meta Ads, WhatsApp Cloud API, and Stripe Checkout triggers.
                </p>
                <span className="text-slate-500 text-[11px]">→ Rate limited & TLS 1.3 verified</span>
              </div>

              <div className="p-5 rounded-xl bg-[#06080E] border border-white/[0.06]">
                <span className="text-cyan-400 block mb-2 font-bold">LAYER 2 · REASONING</span>
                <p className="text-slate-300 font-sans leading-relaxed mb-3">
                  Deterministic business rules, schema guardrails, and context-bound AI evaluation.
                </p>
                <span className="text-slate-500 text-[11px]">→ Zero unverified hallucinations</span>
              </div>

              <div className="p-5 rounded-xl bg-[#06080E] border border-white/[0.06]">
                <span className="text-emerald-400 block mb-2 font-bold">LAYER 3 · SYNC</span>
                <p className="text-slate-300 font-sans leading-relaxed mb-3">
                  PostgreSQL ACID state updates, CRM bi-directional writes, and user notification.
                </p>
                <span className="text-slate-500 text-[11px]">→ Instant & audit-logged</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer info strip */}
        <div className="border-t border-white/[0.08] bg-[#0A0D14] px-6 py-3 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Encrypted End-to-End // Zero Data Sharing</span>
          <Link href="/solutions/ai-automation" className="text-[#FA5B0F] hover:underline flex items-center gap-1">
            <span>Explore Technical Specs</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
