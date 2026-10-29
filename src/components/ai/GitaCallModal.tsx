"use client";

import React, { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  X,
  ChevronRight,
  Send,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Sliders
} from "lucide-react";
import { GitaAvatar } from "./GitaAvatar";
import { useGitaVoice } from "@/lib/ai/useVoice";

interface GitaCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

export function GitaCallModal({ isOpen, onClose, sessionId }: GitaCallModalProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [lastUserSpeech, setLastUserSpeech] = useState<string>("");
  const [lastGitaSpeech, setLastGitaSpeech] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<Array<{ display: string }>>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState<{
    summary: string;
    startTime: string;
    meetLink?: string;
  } | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showMicHelp, setShowMicHelp] = useState(false);

  // Voice Engine hook
  const {
    voiceState,
    transcript,
    audioLevel,
    isSupported,
    hasMicPermission,
    micError,
    requestMicPermission,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useGitaVoice({
    onTranscriptReady: (finalText) => {
      setLastUserSpeech(finalText);
      processVoiceInteraction(finalText);
    },
  });

  // Call timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setCallDuration(0);
      setHasStarted(false);
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
        stopSpeaking();
        stopListening();
      };
    }
  }, [isOpen, stopSpeaking, stopListening]);

  // Connect call & explicitly request microphone access
  const handleConnectCall = async () => {
    setHasStarted(true);
    // Explicitly prompt the browser's native microphone dialog
    const micGranted = await requestMicPermission();

    const welcome = "Hello! I'm Gita from Dodail Solutions. It is wonderful to meet you. You can talk to me directly about our AI automations, web and mobile engineering, or schedule a strategy consultation. What's on your mind today?";
    setLastGitaSpeech(welcome);
    speak(welcome, () => {
      if (micGranted) {
        startListening();
      }
    });
  };

  const handleRetryMic = async () => {
    const granted = await requestMicPermission();
    if (granted) {
      startListening();
    }
  };

  // Send interaction to Gita server API
  const processVoiceInteraction = async (userText: string) => {
    if (!userText.trim()) return;
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
      const replyText = data.reply || "Thank you for sharing. Could you elaborate on your project requirements?";
      setLastGitaSpeech(replyText);

      if (data.slots_available && Array.isArray(data.slots_available)) {
        setAvailableSlots(data.slots_available.slice(0, 3));
      }

      if (data.booking_confirmed) {
        setBookingConfirmed(data.booking_confirmed);
      }

      // Speak response verbally
      speak(replyText, () => {
        if (hasMicPermission) {
          startListening();
        }
      });
    } catch {
      const fallback = "I had a momentary glitch connecting to our systems, but I am right here. Please tell me more about your requirements!";
      setLastGitaSpeech(fallback);
      speak(fallback);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    const msg = textInput.trim();
    setTextInput("");
    setLastUserSpeech(msg);
    processVoiceInteraction(msg);
  };

  const handleQuickQuestion = (msg: string) => {
    setLastUserSpeech(msg);
    processVoiceInteraction(msg);
  };

  const handleSelectSlot = (display: string) => {
    const text = `I would like to book the slot: ${display}`;
    setLastUserSpeech(text);
    processVoiceInteraction(text);
  };

  const toggleMic = async () => {
    if (voiceState === "listening") {
      stopListening();
    } else {
      stopSpeaking();
      await startListening();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fade">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[820px] bg-gradient-to-b from-[var(--bg)] to-[var(--bg)] border border-border-token rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Video Call Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-token bg-surface z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h2 className="text-sm font-bold text-fg flex items-center gap-2">
                Live Video Call with Gita
                <span className="text-[11px] font-mono bg-[#E04E08]/20 text-[#E04E08] px-2 py-0.5 rounded border border-[#E04E08]/30">
                  HD 1080p
                </span>
              </h2>
              <p className="text-[11px] text-fg-muted font-mono">
                Dodail Solutions · Hyderabad Headquarters
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-fg-muted bg-surface px-3 py-1 rounded-full border border-border-token">
              {formatTime(callDuration)}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-fg-muted hover:text-fg rounded-full hover:bg-[var(--surface-translucent-2)] transition"
              aria-label="Close call modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Stage */}
        <div className="flex-1 relative flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#E04E08]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Connect / Tap to Start Banner */}
          {!hasStarted ? (
            <div className="text-center space-y-4 z-20 max-w-md bg-surface border border-border-token p-6 rounded-3xl shadow-2xl backdrop-blur-md">
              <div className="w-16 h-16 rounded-full bg-[#E04E08]/20 text-[#E04E08] flex items-center justify-center mx-auto ring-4 ring-[#E04E08]/30 animate-pulse">
                <Video className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-fg">Connect with Gita</h3>
                <p className="text-xs text-fg-muted mt-1 leading-relaxed">
                  Start an interactive voice conversation with Gita. She will speak with you in real-time and answer any questions.
                </p>
              </div>
              <button
                onClick={handleConnectCall}
                className="w-full py-3.5 bg-[#E04E08] hover:bg-[#D44710] text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <Mic className="w-4 h-4" />
                <span>Start Talking with Gita</span>
              </button>
            </div>
          ) : (
            <>
              {/* Interactive Gita Avatar */}
              <GitaAvatar
                voiceState={voiceState}
                audioLevel={audioLevel}
                size="call"
                showStatusBadge={true}
              />

              {/* Microphone Blocked Helper Banner */}
              {micError === "BLOCKED" && (
                <div className="mt-3 px-4 py-3 bg-amber-500/15 border border-amber-500/40 rounded-2xl text-amber-200 text-xs max-w-lg z-20 space-y-2 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5 text-amber-300">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      Microphone Access Blocked
                    </span>
                    <button
                      onClick={() => setShowMicHelp(!showMicHelp)}
                      className="text-[11px] underline text-amber-300 hover:text-fg"
                    >
                      {showMicHelp ? "Hide guide" : "How to allow?"}
                    </button>
                  </div>

                  <p className="text-[11px] text-amber-100/90 leading-relaxed">
                    Your browser blocked microphone access for localhost. Click the <strong>tune icon 🎚️</strong> (or lock 🔒) in your browser address bar above, set <strong>Microphone</strong> to <strong>Allow</strong>, then click Retry:
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleRetryMic}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-fg font-bold rounded-lg text-xs flex items-center gap-1 transition"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Retry Microphone</span>
                    </button>
                    <span className="text-[11px] text-amber-300/80">
                      (Or simply type below — Gita will still speak aloud!)
                    </span>
                  </div>
                </div>
              )}

              {/* Inline Consultation Slots Popup */}
              {availableSlots.length > 0 && (
                <div className="absolute top-4 right-4 max-w-xs bg-surface border border-orange-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-md space-y-2 z-20">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                    <Calendar className="w-4 h-4" />
                    <span>Open Consultation Slots</span>
                  </div>
                  <div className="space-y-1.5">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSlot(slot.display)}
                        className="w-full text-left text-xs bg-surface hover:bg-[#E04E08] hover:text-white border border-border-token text-white p-2 rounded-xl transition flex items-center justify-between group"
                      >
                        <span>{slot.display}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Inline Booking Confirmation Card */}
              {bookingConfirmed && (
                <div className="absolute top-4 left-4 max-w-xs bg-emerald-950/90 border border-emerald-500/40 rounded-2xl p-4 shadow-xl backdrop-blur-md space-y-2 z-20 animate-fade">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Consultation Scheduled!</span>
                  </div>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    {bookingConfirmed.summary}
                  </p>
                  {bookingConfirmed.meetLink && (
                    <a
                      href={bookingConfirmed.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Google Meet Link Ready</span>
                    </a>
                  )}
                </div>
              )}

              {/* Live Speech Captions */}
              <div className="w-full max-w-2xl mt-4 px-4 py-3 bg-surface border border-border-token rounded-2xl backdrop-blur-md text-center space-y-1 min-h-[60px] flex flex-col justify-center z-10">
                {voiceState === "listening" && transcript ? (
                  <p className="text-xs text-emerald-400 font-mono animate-pulse">
                    You: &ldquo;{transcript}&rdquo;
                  </p>
                ) : voiceState === "speaking" && lastGitaSpeech ? (
                  <p className="text-xs text-orange-200 leading-relaxed line-clamp-2">
                    Gita: &ldquo;{lastGitaSpeech}&rdquo;
                  </p>
                ) : lastUserSpeech ? (
                  <p className="text-xs text-fg-muted italic line-clamp-1">
                    You: &ldquo;{lastUserSpeech}&rdquo;
                  </p>
                ) : (
                  <p className="text-xs text-fg-muted">
                    {voiceState === "listening"
                      ? "Listening to you... Speak into your microphone now."
                      : "Tap the microphone below to speak, or ask Gita using the box below!"}
                  </p>
                )}
              </div>

              {/* Quick Preset Prompts */}
              <div className="flex gap-2 mt-2 z-10 overflow-x-auto max-w-xl py-1 no-scrollbar">
                <button
                  type="button"
                  onClick={() => handleQuickQuestion("What services does Dodail provide?")}
                  className="text-[11px] bg-surface hover:bg-surface border border-border-token text-fg-muted px-3 py-1 rounded-full whitespace-nowrap transition"
                >
                  Our Services
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion("How much does an AI workflow project cost?")}
                  className="text-[11px] bg-surface hover:bg-surface border border-border-token text-fg-muted px-3 py-1 rounded-full whitespace-nowrap transition"
                >
                  Pricing Models
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion("Can I check available consultation slots?")}
                  className="text-[11px] bg-surface hover:bg-surface border border-border-token text-fg-muted px-3 py-1 rounded-full whitespace-nowrap transition"
                >
                  Check Open Slots
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom Control Bar & Text Input */}
        <div className="px-6 py-4 border-t border-border-token bg-surface flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
          {/* Quick in-call text fallback */}
          <form onSubmit={handleTextSubmit} className="w-full sm:max-w-sm flex gap-2 order-2 sm:order-1">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Or type here & Gita will speak..."
              className="flex-1 text-xs bg-surface border border-border-token rounded-xl px-3 py-2.5 text-fg placeholder-fg-subtle focus:outline-none focus:border-[#E04E08]"
            />
            <button
              type="submit"
              disabled={!textInput.trim()}
              className="p-2.5 bg-[#E04E08] hover:bg-[#D44710] disabled:opacity-50 text-white rounded-xl transition"
              aria-label="Send text"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Central Call Actions */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            {/* Microphone Toggle / Push-To-Talk */}
            <button
              onClick={toggleMic}
              className={`p-3.5 rounded-full transition shadow-lg flex items-center gap-2 ${
                voiceState === "listening"
                  ? "bg-emerald-500 hover:bg-emerald-600 text-fg animate-pulse"
                  : "bg-[#E04E08] hover:bg-[#D44710] text-white"
              }`}
              title={voiceState === "listening" ? "Stop listening" : "Tap to Speak"}
              aria-label="Toggle microphone"
            >
              <Mic className="w-5 h-5" />
              <span className="text-xs font-bold pr-1">
                {voiceState === "listening" ? "Listening..." : "Tap to Speak"}
              </span>
            </button>

            {/* Mute/Pause Speech */}
            {voiceState === "speaking" && (
              <button
                onClick={stopSpeaking}
                className="p-3 bg-surface hover:bg-surface text-fg-muted rounded-full transition"
                title="Pause Gita voice"
                aria-label="Pause voice"
              >
                <VolumeX className="w-5 h-5" />
              </button>
            )}

            {/* End Call Button */}
            <button
              onClick={onClose}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-fg font-bold rounded-full transition shadow-lg flex items-center gap-2"
              title="End call"
              aria-label="End call"
            >
              <PhoneOff className="w-5 h-5" />
              <span className="text-xs">End</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
