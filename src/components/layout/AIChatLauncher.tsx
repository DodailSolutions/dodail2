"use client";

import * as React from "react";
import { Bot, X, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AIChatLauncher() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
      {isOpen ? (
        <div className="relative w-80 rounded-2xl border border-[#1B3652] bg-[#0E2235] p-5 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-[#1B3652] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#FA5B0F]/20 p-1.5 text-[#FA5B0F]">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Dodail AI Employee</h4>
                <p className="text-[10px] text-amber-400 font-medium">Prototype Interface (Phase 06)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-[#142C44]"
              aria-label="Close AI preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="rounded-xl bg-[#142C44]/80 p-3 border border-[#1B3652]">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> The live Gemini-powered AI employee is under scheduled implementation for <strong>Phase 06</strong>. In the meantime, you can schedule a direct consultation with our engineering team.
                </p>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/consultation"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl bg-[#FA5B0F] px-4 py-2.5 font-semibold text-white hover:bg-[#FF6C26] transition-colors"
              >
                <span>Book Human Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-[#FA5B0F]/40 bg-[#0E2235]/95 px-4 py-3 text-xs font-semibold text-slate-100 shadow-xl shadow-[#06111C]/80 backdrop-blur-md hover:border-[#FA5B0F] hover:bg-[#142C44] transition-all duration-200"
          aria-label="Preview Dodail AI Assistant"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FA5B0F] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FA5B0F]"></span>
          </div>
          <Bot className="h-4 w-4 text-[#FA5B0F]" />
          <span>Dodail AI (Prototype)</span>
        </button>
      )}
    </div>
  );
}
