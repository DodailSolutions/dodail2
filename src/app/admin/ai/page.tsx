"use client";

import React, { useState } from "react";
import {
  Bot,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  Wrench,
  Terminal,
  ExternalLink
} from "lucide-react";
import { APPROVED_KNOWLEDGE_BASE } from "@/lib/ai/knowledge";

export default function AIEmployeeManagerPage() {
  const [knowledge] = useState(APPROVED_KNOWLEDGE_BASE);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0A1B2A] border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20 font-mono">
            PHASE 05 AI WEBSITE EMPLOYEE
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Bot className="w-7 h-7 text-amber-400" />
            <span>AI Knowledge & Server-Side Tool Controls</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            The AI Website Employee operates as a sales and qualification helper grounded exclusively in verified, approved Dodail content. Private CRM data, raw database access, and unrestricted HTTP are strictly isolated from the model.
          </p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1.5 shrink-0">
          <div className="text-slate-400 font-mono">Model Isolation: ACTIVE</div>
          <div className="text-emerald-400 font-mono">Prompt Injection Defense: ON</div>
          <div className="text-blue-400 font-mono">Server-Side Tools: 4 REGISTERED</div>
        </div>
      </div>

      {/* Grid: Server Tools vs Knowledge Base */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Server-Side Tool Registry */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#FA5B0F]" />
              <span>Registered Server-Side Tools</span>
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Narrow & Typed
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Tools run outside the model with parameter validation, rate limiting, and duplicate detection.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#FA5B0F] font-semibold">search_knowledge(query)</span>
                <span className="text-slate-400">Read-Only</span>
              </div>
              <p className="text-xs text-slate-300">
                Retrieves verified content from approved knowledge base. Private CRM and drafts are never exposed.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#FA5B0F] font-semibold">create_crm_lead(name, email, ...)</span>
                <span className="text-blue-400">CRM Mutation</span>
              </div>
              <p className="text-xs text-slate-300">
                Registers qualified visitor in CRM. Matches normalized email/phone to prevent duplicate fragmentation.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#FA5B0F] font-semibold">check_consultation_availability()</span>
                <span className="text-slate-400">Read-Only</span>
              </div>
              <p className="text-xs text-slate-300">
                Returns validated 30-minute discovery consultation openings in IST timezone.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#FA5B0F] font-semibold">request_human_handoff(reason)</span>
                <span className="text-amber-400">Escalation</span>
              </div>
              <p className="text-xs text-slate-300">
                Gracefully transfers visitor to direct phone, email, and human booking channels.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Approved Knowledge Base */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Approved Knowledge Documents</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {knowledge.length} Documents
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Source of truth. The AI employee is forbidden from stating facts or pricing outside this corpus.
          </p>

          <div className="space-y-3 pt-2 max-h-[380px] overflow-y-auto pr-1">
            {knowledge.map((doc) => (
              <div key={doc.id} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{doc.title}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {doc.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {doc.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
