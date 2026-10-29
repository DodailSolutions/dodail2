"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { VoiceState } from "@/lib/ai/useVoice";
import { Sparkles, Mic, Volume2 } from "lucide-react";

interface GitaAvatarProps {
  voiceState: VoiceState;
  audioLevel: number; // 0 to 1
  size?: "sm" | "md" | "lg" | "call";
  className?: string;
  showStatusBadge?: boolean;
}

export function GitaAvatar({
  voiceState,
  audioLevel,
  size = "md",
  className = "",
  showStatusBadge = true,
}: GitaAvatarProps) {
  const [blink, setBlink] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Natural blinking interval
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const triggerBlink = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
      const nextInterval = 2800 + Math.random() * 3500;
      timeout = setTimeout(triggerBlink, nextInterval);
    };
    timeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Subtle natural head movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (voiceState === "speaking") {
        setTilt({
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 3,
        });
      } else if (voiceState === "listening") {
        setTilt({ x: 0.5, y: -2 }); // Leaning slightly attentive
      } else {
        setTilt({
          x: (Math.random() - 0.5) * 1.5,
          y: (Math.random() - 0.5) * 1.5,
        });
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [voiceState]);

  // Dimensions
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-20 h-20",
    lg: "w-36 h-36",
    call: "w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96",
  }[size];

  // Lip-sync opening height based on live audioLevel (0 to 1)
  const mouthScaleY = voiceState === "speaking" ? 1 + audioLevel * 1.2 : 1;
  const mouthScaleX = voiceState === "speaking" ? 1 + audioLevel * 0.3 : 1;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Outer Soundwave Aura Rings */}
      {voiceState === "speaking" && (
        <>
          <div
            className="absolute rounded-full border-2 border-[#E04E08]/40 animate-ping pointer-events-none"
            style={{
              width: "115%",
              height: "115%",
              animationDuration: "1.8s",
            }}
          />
          <div
            className="absolute rounded-full border border-orange-400/30 animate-pulse pointer-events-none"
            style={{
              width: "130%",
              height: "130%",
              animationDuration: "2.4s",
            }}
          />
        </>
      )}

      {voiceState === "listening" && (
        <div
          className="absolute rounded-full border-2 border-emerald-400/50 animate-ping pointer-events-none"
          style={{
            width: "120%",
            height: "120%",
            animationDuration: "1.4s",
          }}
        />
      )}

      {/* Main Avatar Container */}
      <div
        className={`relative ${sizeClasses} rounded-full overflow-hidden shadow-2xl transition-all duration-300 ring-4 ${
          voiceState === "speaking"
            ? "ring-[#E04E08] shadow-orange-500/30"
            : voiceState === "listening"
            ? "ring-emerald-400 shadow-emerald-500/30"
            : voiceState === "thinking"
            ? "ring-blue-400 shadow-blue-500/30"
            : "ring-border-token shadow-black/40"
        } bg-[#0A1420]`}
        style={{
          transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        {/* Gita Photorealistic Portrait Image */}
        <div
          className="relative w-full h-full transform transition-transform duration-200"
          style={{
            transform: `scale(${voiceState === "speaking" ? 1.02 + audioLevel * 0.03 : 1}) translateY(${
              voiceState === "listening" ? "-1.5%" : "0%"
            })`,
          }}
        >
          <Image
            src="/brand/gita-avatar.png"
            alt="Gita - Dodail Senior Solutions Specialist"
            fill
            sizes="(max-width: 768px) 320px, 480px"
            className="object-cover object-top select-none pointer-events-none"
            priority
          />

          {/* Micro Animation Overlay: Dynamic Eye Blink */}
          {blink && (
            <div
              className="absolute inset-0 bg-[#0A1420]/15 pointer-events-none transition-opacity duration-75"
              style={{
                clipPath: "ellipse(48% 6% at 50% 39%)",
                backdropFilter: "blur(0.5px)",
              }}
            />
          )}

          {/* Micro Animation Overlay: Audio-Reactive Mouth Modulation */}
          {voiceState === "speaking" && audioLevel > 0.15 && (
            <div
              className="absolute pointer-events-none transition-all duration-75"
              style={{
                top: "60%",
                left: "44%",
                width: "12%",
                height: "4%",
                background: "radial-gradient(ellipse at center, rgba(30,10,10,0.65) 0%, transparent 70%)",
                transform: `scale(${mouthScaleX}, ${mouthScaleY})`,
                borderRadius: "50%",
                filter: "blur(0.5px)",
              }}
            />
          )}

          {/* Warm Studio Light Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Floating Status Pill */}
      {showStatusBadge && (
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg border transition-colors duration-200">
          {voiceState === "speaking" && (
            <div className="flex items-center gap-1.5 bg-[#E04E08]/10 text-[#E04E08] border border-[#E04E08]/30 px-2 py-0.5 rounded-full">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Gita is speaking...</span>
            </div>
          )}

          {voiceState === "listening" && (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span>Listening to you...</span>
            </div>
          )}

          {voiceState === "thinking" && (
            <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Checking Dodail systems...</span>
            </div>
          )}

          {voiceState === "idle" && (
            <div className="flex items-center gap-1.5 bg-surface text-fg-muted border border-border-token px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Gita · Online (Hyderabad)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
