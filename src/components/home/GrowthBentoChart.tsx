"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, TrendingUp } from "lucide-react";

export function GrowthBentoChart() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main SVG Area Chart Card (8 cols) */}
      <div className="lg:col-span-8 rounded-[28px] border border-[#E3E6EB] bg-white p-6 sm:p-8 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#E04E08]">
                Attribution &amp; Performance Telemetry
              </span>
              <h4 className="mt-1 text-2xl font-bold text-[#1A2535]">
                Aggregated Organic Inbound Revenue (M1 – M12)
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <TrendingUp className="h-3.5 w-3.5" />
                +218% YoY Velocity
              </span>
            </div>
          </div>

          <p className="mt-2 text-xs text-[#1A2535]/60">
            Median verified client growth trajectory across India, UAE, and US accounts following Dodail deployment.
          </p>
        </div>

        {/* Self-Drawing SVG Chart */}
        <div className="relative mt-8 h-56 w-full">
          <svg
            viewBox="0 0 700 240"
            className="h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="peachGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E04E08" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#F2D5C4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal guidelines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#E3E6EB" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="#E3E6EB" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="160" x2="700" y2="160" stroke="#E3E6EB" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="220" x2="700" y2="220" stroke="#E3E6EB" strokeWidth="1" />

            {/* Area Fill */}
            <path
              d="M 20 200 C 140 185, 240 155, 340 120 C 440 85, 540 45, 680 25 L 680 220 L 20 220 Z"
              fill="url(#peachGradient)"
            />

            {/* Dynamic Stroke Line */}
            <path
              d="M 20 200 C 140 185, 240 155, 340 120 C 440 85, 540 45, 680 25"
              fill="none"
              stroke="#E04E08"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 900,
                strokeDashoffset: animated ? 0 : 900,
                transition: "stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />

            {/* Milestones / Nodes */}
            <circle cx="20" cy="200" r="5" fill="#1A2535" />
            <circle cx="340" cy="120" r="5.5" fill="#E04E08" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="680" cy="25" r="7" fill="#E04E08" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>

          {/* Month Axis Labels */}
          <div className="mt-3 flex justify-between text-[11px] font-mono text-[#1A2535]/50">
            <span>M1 Baseline</span>
            <span>M4 Architecture</span>
            <span>M8 AI GEO Velocity</span>
            <span className="font-bold text-[#E04E08]">M12 Market Dominance</span>
          </div>
        </div>
      </div>

      {/* Side Attribution Bento Tiles (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* CPA Compression Card */}
        <div className="rounded-[28px] border border-[#E3E6EB] bg-white p-6 shadow-lg">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A2535]/50">
            Customer Acquisition Cost
          </span>
          <h5 className="mt-1 text-lg font-bold text-[#1A2535]">Average CPA Compression</h5>

          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1A2535]/60 mb-1">
                <span>Pre-Dodail Legacy Spend</span>
                <span className="font-mono text-[#1A2535]">$142 / lead</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#E3E6EB]">
                <div className="h-full w-[85%] rounded-full bg-[#1A2535]/40" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1A2535] mb-1">
                <span>With Dodail AI &amp; Performance</span>
                <span className="font-mono font-bold text-[#E04E08]">$46 / lead</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#E3E6EB]">
                <div className="h-full w-[28%] rounded-full bg-[#E04E08]" />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-700">
            -67.6% Blended CAC Reduction
          </div>
        </div>

        {/* Client Quote Stat Tile */}
        <div className="rounded-[28px] border border-[#E3E6EB] bg-[#F6F7F9] p-6 shadow-sm flex flex-col justify-between flex-1">
          <p className="text-sm font-medium text-[#1A2535] italic leading-relaxed">
            &ldquo;Dodail re-engineered our customer intake pipeline and reduced our cost-per-consultation from $138 to $44 in 90 days. Phenomenal velocity.&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3 border-t border-[#E3E6EB] pt-3">
            <div className="h-8 w-8 rounded-full bg-[#E04E08] flex items-center justify-center font-bold text-white text-xs">
              TA
            </div>
            <div>
              <span className="block text-xs font-bold text-[#1A2535]">Tariq Al-Mansoori</span>
              <span className="block text-[11px] text-[#1A2535]/60">COO, Dubai Prime Realty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
