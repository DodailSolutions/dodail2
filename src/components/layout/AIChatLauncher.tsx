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
  const modalRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKeyPress);
      // Auto focus the input field which is usually the last element, but wait, it's better to focus the input directly
      const inputElement = modalRef.current.querySelector('input') as HTMLElement;
      inputElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKeyPress);
      };
    }
  }, [isOpen]);

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
    <div className="fixed bottom-20 sm:bottom-6 right-6 z-50">
      {isOpen ? (
        <div ref={modalRef} role="dialog" aria-modal="true" aria-label="AI Chat" className="relative w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col h-[520px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-4 bg-slate-50/90">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#FF6B2C] border border-orange-200 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  Dodail AI Employee
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <p className="text-[10px] text-slate-500 font-mono">Knowledge-Grounded Sales Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetConversation}
                title="Reset conversation"
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition"
                aria-label="Close AI chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-slate-50/40">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-md bg-orange-100 text-[#FF6B2C] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-xl max-w-[82%] leading-relaxed ${
                      isUser
                        ? "bg-[#FF6B2C] text-white font-medium shadow-sm"
                        : "bg-white border border-slate-200 text-slate-800 shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2 items-center text-slate-500 text-xs pl-8">
                <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] font-mono">Consulting approved knowledge base...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Consultation Pill */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span className="flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified Knowledge Only
            </span>
            <Link
              href="/consultation"
              className="text-[#FF6B2C] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Book Call</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI workflows, timelines, pricing..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF6B2C] focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-lg bg-[#FF6B2C] hover:bg-[#e0561b] text-white disabled:opacity-40 transition shrink-0 shadow-sm"
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
          className="group flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/95 px-4 py-3 text-xs font-semibold text-slate-800 shadow-xl backdrop-blur-md hover:border-[#FF6B2C] hover:shadow-2xl transition-all duration-200"
          aria-label="Open Dodail AI Assistant"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <Bot className="h-4 w-4 text-[#FF6B2C]" />
          <span>Dodail AI Assistant</span>
        </button>
      )}
    </div>
  );
}
