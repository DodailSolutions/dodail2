"use client";

import React, { useState, useEffect } from "react";
import {
  Bot,
  ShieldCheck,
  Search,
  CheckCircle2,
  Calendar,
  FileSpreadsheet,
  Clock,
  User,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Video,
  Wrench,
  AlertCircle
} from "lucide-react";
import { APPROVED_KNOWLEDGE_BASE } from "@/lib/ai/knowledge";
import { ConversationSession } from "@/lib/ai/types";

export default function AIEmployeeManagerPage() {
  const [activeTab, setActiveTab] = useState<"conversations" | "tools">("conversations");
  const [sessions, setSessions] = useState<ConversationSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ConversationSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [knowledge] = useState(APPROVED_KNOWLEDGE_BASE);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/sessions");
      if (res.ok) {
        const data = await res.json();
        const loaded: ConversationSession[] = data.sessions || [];
        setSessions(loaded);
        if (loaded.length > 0 && !selectedSession) {
          setSelectedSession(loaded[0]);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch AI sessions:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter((s) => {
    const q = searchQuery.toLowerCase();
    const name = s.qualification_state?.name || "";
    const email = s.qualification_state?.email || "";
    const problem = s.qualification_state?.problem || "";
    return (
      s.id.toLowerCase().includes(q) ||
      name.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q) ||
      problem.toLowerCase().includes(q)
    );
  });

  const bookedCount = sessions.filter((s) => s.messages.some((m) => m.content.toLowerCase().includes("consultation confirmed") || m.content.toLowerCase().includes("booked your discovery"))).length;
  const leadsCount = sessions.filter((s) => s.qualification_state?.email).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0A1B2A] border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20 font-mono">
            GITA AI SALES & SUPPORT ASSISTANT
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Bot className="w-7 h-7 text-[#FA5B0F]" />
            <span>AI Conversations & Google Integration Center</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Monitor live visitor conversations with Gita, inspect qualified leads, review Google Calendar consultation bookings, and verify two-way Google Sheets CRM synchronization.
          </p>
        </div>

        {/* Integration Status Badges */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Google Calendar:</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Google Sheets CRM:</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Two-Way Sync
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">RAG Knowledge Engine:</span>
            <span className="text-blue-400 font-mono">CMS Grounded</span>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Total Conversations</span>
            <MessageSquare className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">{sessions.length}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Leads Qualified</span>
            <User className="w-4 h-4 text-[#FA5B0F]" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">{leadsCount}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Booked Consultations</span>
            <Calendar className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">{bookedCount}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Active Assistant</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">Gita (v2.0)</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => setActiveTab("conversations")}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === "conversations"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Conversations & Transcripts ({sessions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("tools")}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === "tools"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Server Tools & Knowledge Base</span>
        </button>
      </div>

      {/* TAB 1: CONVERSATIONS & TRANSCRIPTS */}
      {activeTab === "conversations" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
          {/* Left Session List (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by name, email, query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FA5B0F]"
                />
              </div>
              <button
                onClick={fetchSessions}
                disabled={loading}
                title="Refresh sessions"
                className="p-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 max-h-[520px] pr-1">
              {filteredSessions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  {loading ? "Loading conversations..." : "No conversation sessions recorded yet."}
                </div>
              ) : (
                filteredSessions.map((s) => {
                  const isSelected = selectedSession?.id === s.id;
                  const name = s.qualification_state?.name || "Website Visitor";
                  const email = s.qualification_state?.email;
                  const lastMsg = s.messages[s.messages.length - 1];
                  const hasBooking = s.messages.some((m) => m.content.toLowerCase().includes("consultation confirmed") || m.content.toLowerCase().includes("booked your discovery"));

                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSession(s)}
                      className={`p-3 rounded-lg border cursor-pointer transition text-left space-y-1.5 ${
                        isSelected
                          ? "bg-slate-800/90 border-[#FA5B0F]/50 shadow-sm"
                          : "bg-slate-950/70 border-slate-800/80 hover:bg-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white flex items-center gap-1.5 truncate">
                          {name}
                          {hasBooking && (
                            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded border border-emerald-500/20 font-mono">
                              Booked
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(s.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      {email && (
                        <p className="text-[11px] text-slate-400 truncate">{email}</p>
                      )}

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {lastMsg?.content || "Session initiated"}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/50">
                        <span>{s.messages.length} messages</span>
                        <span className="font-mono text-slate-500">{s.id.substring(0, 16)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Session Details & Transcript (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col space-y-4">
            {selectedSession ? (
              <>
                {/* Session Header Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {selectedSession.qualification_state?.name || "Website Visitor"}
                        <span className="text-xs text-slate-400 font-normal font-mono">
                          ({selectedSession.id})
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Started {new Date(selectedSession.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20 text-xs font-mono">
                        {selectedSession.qualification_state?.recommended_solution || "General Inquiry"}
                      </span>
                    </div>
                  </div>

                  {/* Qualification Metadata Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Email:</span>
                      <span className="text-slate-300 font-mono truncate block">
                        {selectedSession.qualification_state?.email || "Not provided"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Phone:</span>
                      <span className="text-slate-300 font-mono truncate block">
                        {selectedSession.qualification_state?.phone || "Not provided"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Google Sheets Status:</span>
                      <span className="text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Synced
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message Timeline */}
                <div className="flex-1 overflow-y-auto space-y-3 max-h-[420px] pr-2">
                  {selectedSession.messages.map((m) => {
                    const isAssistant = m.role === "assistant";
                    return (
                      <div key={m.id} className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"}`}>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1 ${
                            isAssistant
                              ? "bg-[#FA5B0F] text-white"
                              : "bg-slate-700 text-slate-200"
                          }`}
                        >
                          {isAssistant ? "G" : "U"}
                        </div>

                        <div className="max-w-[85%] space-y-1">
                          <div
                            className={`p-3.5 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                              isAssistant
                                ? "bg-slate-950 border border-slate-800 text-slate-200"
                                : "bg-blue-600 text-white shadow-sm"
                            }`}
                          >
                            {m.content}
                          </div>
                          <p className={`text-[10px] text-slate-500 px-1 font-mono ${isAssistant ? "" : "text-right"}`}>
                            {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs py-20">
                <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                Select a conversation from the left to view the full dialogue transcript.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SERVER TOOLS & KNOWLEDGE BASE */}
      {activeTab === "tools" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Server Tools */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#FA5B0F]" />
                <span>Gita's Registered Server-Side Tools</span>
              </h2>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Live & Typed
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FA5B0F] font-semibold">getCalendarAvailability(date, timezone)</span>
                  <span className="text-emerald-400">Google Calendar</span>
                </div>
                <p className="text-xs text-slate-300">
                  Queries live calendar free/busy slots during business hours (10 AM - 6:30 PM IST).
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FA5B0F] font-semibold">bookCalendarAppointment(name, email, slot)</span>
                  <span className="text-emerald-400">Google Calendar + Meet</span>
                </div>
                <p className="text-xs text-slate-300">
                  Creates discovery consultation event with automatic Google Meet link and sends calendar invitation.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FA5B0F] font-semibold">appendLeadToSheet(leadPayload)</span>
                  <span className="text-emerald-400">Google Sheets CRM</span>
                </div>
                <p className="text-xs text-slate-300">
                  Appends qualified lead contact information, project need, and consultation status into Google Sheets.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FA5B0F] font-semibold">readLeadStatusFromSheet(email)</span>
                  <span className="text-emerald-400">Two-Way CRM Read</span>
                </div>
                <p className="text-xs text-slate-300">
                  Reads admin notes and update status from Google Sheets to provide continuity for returning visitors.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#FA5B0F] font-semibold">retrieveRelevantKnowledge(query)</span>
                  <span className="text-blue-400">In-App RAG</span>
                </div>
                <p className="text-xs text-slate-300">
                  Dynamically indexes CMS pages, 5 service pillars, pricing guidelines, Hyderabad office facts, and blog case studies.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Knowledge Base Documents */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Approved Knowledge Corpus</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">
                {knowledge.length} Documents
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Source of truth. Gita is grounded exclusively in verified Dodail capabilities, preventing hallucinations.
            </p>

            <div className="space-y-3 pt-2 max-h-[440px] overflow-y-auto pr-1">
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
      )}
    </div>
  );
}
