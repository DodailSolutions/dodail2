"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { faqs as defaultFaqs, type FAQItem } from "@/components/home/homeData";

/**
 * Accessible accordion. Every answer is always in the HTML (collapsed with the
 * `hidden` attribute), so crawlers and the FAQPage schema see the same content.
 */
export function FAQAccordion({ items: faqs = defaultFaqs }: { items?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1C222B] divide-y divide-[#1C222B] bg-[#0B0E13]">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className={`transition-colors duration-150 ${isOpen ? "bg-[#12161D]" : "hover:bg-[#12161D]/60"}`}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left py-6 px-4 sm:px-6 flex items-start justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C]"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-trigger-${index}`}
              >
                <span className="flex items-start gap-4 sm:gap-8">
                  <span className="text-xs sm:text-sm font-semibold tabular-nums text-[#FF6B2C] pt-1 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.14em] text-[#8A929E] font-medium">{faq.category}</span>
                    <span className="text-base sm:text-xl font-normal text-[#F5F8FC] leading-snug tracking-[-0.01em]">
                      {faq.question}
                    </span>
                  </span>
                </span>
                <span className="text-[#FF6B2C] border border-white/15 rounded-full p-1.5 shrink-0 mt-1" aria-hidden="true">
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
            </h3>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              hidden={!isOpen}
              className="px-4 sm:px-6 pb-6 pl-12 sm:pl-20"
            >
              <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-[#A3AAB5]">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
