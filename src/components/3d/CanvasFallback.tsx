"use client";

import React from "react";

export function CanvasFallback({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-60"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="fb-glow-orange" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fb-glow-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#27D3C2" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#27D3C2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fb-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#27D3C2" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1B3652" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ambient atmospheric glow pools */}
        <circle cx="850" cy="380" r="320" fill="url(#fb-glow-orange)" />
        <circle cx="1120" cy="520" r="280" fill="url(#fb-glow-cyan)" />

        {/* Network connection conduits */}
        <path
          d="M 680 320 Q 820 240 960 300 T 1180 260"
          stroke="url(#fb-line-grad)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <path
          d="M 740 450 Q 880 380 1020 480 T 1220 420"
          stroke="url(#fb-line-grad)"
          strokeWidth="1.5"
        />
        <path
          d="M 960 300 L 1020 480"
          stroke="#1B3652"
          strokeWidth="1"
        />
        <path
          d="M 820 240 L 880 380"
          stroke="#1B3652"
          strokeWidth="1"
        />

        {/* Key System Nodes */}
        <g transform="translate(680, 320)">
          <circle r="18" fill="#0C2233" stroke="#FF6B2C" strokeWidth="2" />
          <circle r="6" fill="#FF6B2C" />
          <text x="24" y="4" fill="#AABAC8" fontSize="11" fontFamily="monospace">Inbound Leads</text>
        </g>

        <g transform="translate(960, 300)">
          <circle r="22" fill="#0C2233" stroke="#27D3C2" strokeWidth="2" />
          <circle r="8" fill="#27D3C2" />
          <text x="28" y="4" fill="#AABAC8" fontSize="11" fontFamily="monospace">Workflow Engine</text>
        </g>

        <g transform="translate(1180, 260)">
          <circle r="16" fill="#0C2233" stroke="#FF6B2C" strokeWidth="2" />
          <circle r="5" fill="#FF6B2C" />
          <text x="22" y="4" fill="#AABAC8" fontSize="11" fontFamily="monospace">PostgreSQL Core</text>
        </g>

        <g transform="translate(880, 380)">
          <circle r="20" fill="#0C2233" stroke="#27D3C2" strokeWidth="2" />
          <circle r="7" fill="#27D3C2" />
          <text x="26" y="4" fill="#AABAC8" fontSize="11" fontFamily="monospace">CRM Hub</text>
        </g>

        <g transform="translate(1020, 480)">
          <circle r="18" fill="#0C2233" stroke="#FF6B2C" strokeWidth="2" />
          <circle r="6" fill="#FF6B2C" />
          <text x="24" y="4" fill="#AABAC8" fontSize="11" fontFamily="monospace">Automated Dispatch</text>
        </g>
      </svg>
    </div>
  );
}
