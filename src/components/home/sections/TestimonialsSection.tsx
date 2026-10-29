"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SpotlightCard } from "../SpotlightCard";
import { Eyebrow, sectionPad } from "../homeUi";

const TESTIMONIALS = [
  {
    quote:
      "Dodail automated our lead follow-up and we now get 3x more patient enquiries with less manual work.",
    author: "Dr. Priya S.",
    role: "Dental Clinic, Hyderabad",
    avatar: "P",
    avatarBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    quote:
      "The custom software built by Dodail has saved us hours every day and made our operations much smoother.",
    author: "Rohit K.",
    role: "Manufacturing Business",
    avatar: "R",
    avatarBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    quote:
      "Our e-commerce sales grew 2.5x in 6 months with their digital marketing and automation systems.",
    author: "Ananya M.",
    role: "DTC Brand, India",
    avatar: "A",
    avatarBg: "bg-[#FA5B0F]/20 text-[#FA5B0F] border-[#FA5B0F]/30",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  };

  return (
    <section aria-labelledby="testimonials-title" className={`relative ${sectionPad} bg-bg`}>
      <div className="mx-auto max-w-7xl">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <Eyebrow>CLIENT TESTIMONIALS</Eyebrow>
            <h2 id="testimonials-title" className="section-title-clamp mt-4 text-fg">
              Real businesses. Real results.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border-token bg-[var(--surface-translucent)] hover:bg-[var(--surface-translucent-2)] hover:border-border-token flex items-center justify-center text-fg-muted hover:text-fg transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border-token bg-[var(--surface-translucent)] hover:bg-[var(--surface-translucent-2)] hover:border-border-token flex items-center justify-center text-fg-muted hover:text-fg transition"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(250, 91, 15, 0.1)"
              className="p-7 sm:p-8 rounded-2xl bg-[var(--surface-translucent)] border border-border-token hover:border-[#FA5B0F]/40 flex flex-col justify-between transition duration-300 group"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FFB547] fill-[#FFB547]" />
                  ))}
                </div>

                <p className="text-base sm:text-lg text-fg leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-border-token">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border ${item.avatarBg}`}
                >
                  {item.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-fg group-hover:text-[#FA5B0F] transition">
                    {item.author}
                  </h3>
                  <p className="text-xs text-fg-muted font-mono">{item.role}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
