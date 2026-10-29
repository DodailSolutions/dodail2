"use client";

import * as React from "react";
import Image from "next/image";
import {
  Bot,
  X,
  Send,
  Sparkles,
  RefreshCw,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  ChevronRight,
  User,
  Mic,
  PhoneCall
} from "lucide-react";
import { ChatMessage } from "@/lib/ai/types";
import { GitaCallModal } from "@/components/ai/GitaCallModal";

interface SlotItem {
  start: string;
  end: string;
  display: string;
}

export function AIChatLauncher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<string>("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: "Hello! I'm Gita from Dodail Solutions in Hyderabad. Whether you want to explore our AI automations, discuss a new web or mobile project, or schedule a 15-minute strategy consultation, I'm here to help. What's on your mind today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [availableSlots, setAvailableSlots] = React.useState<SlotItem[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = React.useState<{
    summary: string;
    startTime: string;
    meetLink?: string;
  } | null>(null);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Initialize persistent session ID
  React.useEffect(() => {
    try {
      const stored = sessionStorage.getItem("dodail_gita_session_id");
      if (stored) {
        setSessionId(stored);
      } else {
        const newId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        sessionStorage.setItem("dodail_gita_session_id", newId);
        setSessionId(newId);
      }
    } catch {
      setSessionId(`session-${Date.now()}`);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, availableSlots, bookingConfirmed]);

  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTabKeyPress);
      const inputElement = modalRef.current.querySelector("input") as HTMLElement;
      inputElement?.focus();

      return () => {
        document.removeEventListener("keydown", handleTabKeyPress);
      };
    }
  }, [isOpen]);

  const sendUserMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userText = textToSend.trim();
    setInput("");
    setAvailableSlots([]);

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message: userText,
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: data.reply || "Thank you for reaching out. A team member will follow up with you.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.slots_available && Array.isArray(data.slots_available)) {
        setAvailableSlots(data.slots_available.slice(0, 4));
      }

      if (data.booking_confirmed) {
        setBookingConfirmed(data.booking_confirmed);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: "assistant",
          content: "I am experiencing a momentary connection error. You can reach our Hyderabad engineering team directly at info@dodail.com or call +91 99664 00235.",
          timestamp: new Date().toISOString(),
          is_fallback: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendUserMessage(input);
  };

  const handleSelectSlot = async (slot: SlotItem) => {
    await sendUserMessage(`I would like to book the slot: ${slot.display}`);
  };

  const resetConversation = () => {
    const newId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    try {
      sessionStorage.setItem("dodail_gita_session_id", newId);
    } catch {
      // Ignore
    }
    setSessionId(newId);
    setAvailableSlots([]);
    setBookingConfirmed(null);
    setMessages([
      {
        id: "msg-welcome",
        role: "assistant",
        content: "Conversation refreshed. How can I help with your project goals or consultation scheduling?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <>
      {/* Real-time Voice & Video Call Modal */}
      <GitaCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        sessionId={sessionId}
      />

      <div className={`fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 lg:bottom-6 sm:right-6 ${isOpen ? "z-50" : "z-40"}`}>
        {isOpen ? (
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Gita"
            className="relative w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col h-[540px] overflow-hidden animate-fade"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-3 bg-gradient-to-r from-slate-900 to-[#1A2535] text-white">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#E04E08] shadow-md shrink-0 bg-slate-800">
                  <Image
                    src="/brand/gita-avatar.png"
                    alt="Gita"
                    fill
                    className="object-cover object-top"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1A2535]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5 text-white">
                    Gita
                    <span className="text-[11px] bg-[#E04E08]/30 text-orange-200 px-1.5 py-0.5 rounded font-mono font-normal">
                      Dodail Specialist
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-300">Sales & Solutions · Online</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Voice Call Button */}
                <button
                  type="button"
                  onClick={() => setIsCallModalOpen(true)}
                  title="Talk to Gita (Real-Time Voice Call)"
                  className="px-2.5 py-1 bg-[#E04E08] hover:bg-[#D44710] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition mr-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Call</span>
                </button>

                <button
                  type="button"
                  onClick={resetConversation}
                  title="Reset conversation"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                  aria-label="Reset conversation"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Live Call Banner */}
            <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border-b border-orange-200/50 px-3.5 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E04E08] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E04E08]" />
                </span>
                <span className="text-xs font-medium text-slate-800">
                  Want to speak directly?
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCallModalOpen(true)}
                className="text-xs font-bold text-[#E04E08] hover:underline flex items-center gap-1"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Talk to Gita</span>
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm bg-white">
              {messages.map((m) => {
                const isAssistant = m.role === "assistant";
                return (
                  <div key={m.id} className={`flex gap-2.5 ${isAssistant ? "" : "flex-row-reverse"}`}>
                    {isAssistant ? (
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 shadow-sm ring-1 ring-slate-200 bg-slate-800">
                        <Image
                          src="/brand/gita-avatar.png"
                          alt="Gita"
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div className="max-w-[80%] space-y-1">
                      <div
                        className={`p-3 rounded-2xl whitespace-pre-line leading-relaxed text-[13px] ${
                          isAssistant
                            ? "bg-[#F6F7F9] text-slate-900 rounded-tl-sm border border-slate-100"
                            : "bg-[#1A2535] text-white rounded-tr-sm shadow-sm"
                        }`}
                      >
                        {m.content}
                      </div>
                      <p className={`text-[11px] text-slate-400 px-1 font-mono ${isAssistant ? "" : "text-right"}`}>
                        {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Interactive Slot Selection Chips */}
              {availableSlots.length > 0 && (
                <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-[#E04E08]" />
                    <span>Select an available time slot:</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSlot(slot)}
                        className="text-left px-2.5 py-1.5 bg-white border border-orange-200 hover:border-[#E04E08] hover:bg-orange-50/50 rounded-lg text-xs font-medium text-slate-800 transition flex items-center justify-between group"
                      >
                        <span>{slot.display}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#E04E08] opacity-0 group-hover:opacity-100 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirmed Appointment Card */}
              {bookingConfirmed && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Consultation Confirmed!</span>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    {bookingConfirmed.summary}
                  </p>
                  {bookingConfirmed.meetLink && (
                    <a
                      href={bookingConfirmed.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Google Meet</span>
                    </a>
                  )}
                </div>
              )}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-w-[180px]">
                  <div className="w-2 h-2 rounded-full bg-[#E04E08] animate-ping" />
                  <span>Gita is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Prompts */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-slate-50/60 border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => sendUserMessage("What services does Dodail provide?")}
                  className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-full text-slate-600 hover:text-slate-900 hover:border-slate-300 shrink-0 transition"
                >
                  Services
                </button>
                <button
                  type="button"
                  onClick={() => sendUserMessage("How much does an automation project cost?")}
                  className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-full text-slate-600 hover:text-slate-900 hover:border-slate-300 shrink-0 transition"
                >
                  Pricing Models
                </button>
                <button
                  type="button"
                  onClick={() => sendUserMessage("Can I check available consultation slots?")}
                  className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-full text-slate-600 hover:text-slate-900 hover:border-slate-300 shrink-0 transition"
                >
                  Book Call
                </button>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Gita about services, pricing, or bookings..."
                disabled={loading}
                className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#E04E08] focus:border-[#E04E08] disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setIsCallModalOpen(true)}
                title="Start Voice Conversation"
                className="p-2.5 text-[#E04E08] hover:bg-orange-50 border border-orange-200 rounded-xl transition"
                aria-label="Voice conversation"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-[#E04E08] hover:bg-[#D44710] disabled:opacity-50 text-white rounded-xl px-3.5 flex items-center justify-center transition shadow-sm"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Quick Call Button — desktop only: on phones the tab bar already offers Call/WhatsApp and the
                chat panel has its own Call button, so one floating button covers less of the page. */}
            <button
              type="button"
              onClick={() => setIsCallModalOpen(true)}
              className="group hidden sm:flex items-center gap-2 bg-[#E04E08] hover:bg-[#D44710] text-white px-3.5 py-3 rounded-full shadow-2xl transition duration-200 hover:scale-105 active:scale-95"
              title="Talk to Gita (Voice & Video)"
              aria-label="Talk to Gita"
            >
              <Video className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">Talk to Gita</span>
            </button>

            {/* Standard Chat Pill */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative group flex items-center gap-2.5 bg-[#1A2535] hover:bg-slate-900 text-white px-4 py-3 rounded-full shadow-2xl transition duration-200 border border-slate-700 hover:scale-105 active:scale-95"
              aria-label="Chat with Gita, Dodail Solutions Specialist"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#E04E08] shadow-md shrink-0 bg-slate-800">
                <Image
                  src="/brand/gita-avatar.png"
                  alt="Gita"
                  fill
                  className="object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1A2535]" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold leading-tight">Gita</p>
                <p className="text-[11px] text-slate-400 leading-tight">Solutions Specialist</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
