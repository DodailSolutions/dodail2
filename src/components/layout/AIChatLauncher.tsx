"use client";

import * as React from "react";
import { Bot, X, Send, Sparkles, RefreshCw, AlertCircle, ArrowRight, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ChatMessage } from "@/lib/ai/types";

export function AIChatLauncher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: "Hello! I am the Dodail Solutions AI Employee. I can answer questions about our AI workflow automations, delivery timelines, and help you schedule an architecture discovery consultation. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

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
          message: userText,
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: data.reply || "Thank you for reaching out. A team member can follow up with you.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: "assistant",
          content: "I am experiencing a momentary connection error. You can reach our engineering team directly at info@dodail.com or visit /consultation.",
          timestamp: new Date().toISOString(),
          is_fallback: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: "msg-welcome",
        role: "assistant",
        content: "Conversation reset. How can I assist you with your business automation goals?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="relative w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-800 bg-[#0A1B2A] shadow-2xl flex flex-col h-[520px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-[#07131F]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FA5B0F]/15 text-[#FA5B0F] border border-[#FA5B0F]/30 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Dodail AI Employee
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">Knowledge-Grounded Sales Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetConversation}
                title="Reset conversation"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                aria-label="Close AI chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded bg-[#FA5B0F]/20 text-[#FA5B0F] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-xl max-w-[82%] leading-relaxed ${
                      isUser
                        ? "bg-[#FA5B0F] text-white rounded-tr-none font-medium"
                        : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs pl-8">
                <span className="w-2 h-2 rounded-full bg-[#FA5B0F] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#FA5B0F] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#FA5B0F] animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] font-mono">Consulting approved knowledge base...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Consultation Pill */}
          <div className="px-4 py-1.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified Knowledge Only
            </span>
            <Link
              href="/consultation"
              className="text-[#FA5B0F] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Book Call</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-[#07131F] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI workflows, timelines, pricing..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FA5B0F]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white disabled:opacity-40 transition shrink-0"
              title="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-[#FA5B0F]/50 bg-[#0E2235]/95 px-4 py-3 text-xs font-semibold text-slate-100 shadow-2xl shadow-black/80 backdrop-blur-md hover:border-[#FA5B0F] hover:bg-[#142C44] transition-all duration-200"
          aria-label="Open Dodail AI Assistant"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
          </div>
          <Bot className="h-4 w-4 text-[#FA5B0F]" />
          <span>Dodail AI Assistant</span>
        </button>
      )}
    </div>
  );
}
