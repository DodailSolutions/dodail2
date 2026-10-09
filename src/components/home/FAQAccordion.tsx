"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQItem[] = [
  {
    category: "AI RELIABILITY & SAFETY",
    question: "How does Dodail guarantee AI accuracy and eliminate hallucinations?",
    answer:
      "We never connect unconstrained, raw AI language models directly to your production databases or customer channels. Every prompt is bound by deterministic JSON schema validation, verified business policy contexts, and strict confidence thresholds. If confidence falls below 95% or an input is ambiguous, the system triggers a graceful human escalation rather than guessing.",
  },
  {
    category: "TIMELINE & DELIVERY",
    question: "How long does a typical automation or custom software deployment take?",
    answer:
      "Standard lead triage, WhatsApp business routing, or Google Sheets bi-directional synchronization typically goes live within 7 to 14 business days. Comprehensive enterprise initiatives—such as bespoke Next.js web applications, full CRM migrations, or multi-department workflow DAGs—typically span 3 to 6 weeks from initial architecture to live cutover.",
  },
  {
    category: "INTEGRATION & COMPATIBILITY",
    question: "Can Dodail integrate with our existing CRM, Google Sheets, and custom tools?",
    answer:
      "Yes. We specialize in zero-disruption integration. We construct bi-directional connectors for Google Sheets, Salesforce, HubSpot, Zoho, WhatsApp Cloud API, and internal PostgreSQL/MySQL databases using secure OAuth 2.0 and encrypted webhooks, preserving your current operating habits while automating the grunt work.",
  },
  {
    category: "SECURITY & DATA GOVERNANCE",
    question: "How is our proprietary customer data and business intelligence protected?",
    answer:
      "All data is encrypted in transit via TLS 1.3 and at rest via AES-256. Database instances operate with strict PostgreSQL Row-Level Security (RLS) policies. Crucially, your private operational data, customer inquiries, and commercial records are NEVER submitted to train public foundational LLMs.",
  },
  {
    category: "HUMAN OVERSIGHT",
    question: "What happens when an inquiry requires human judgment or sales closing?",
    answer:
      "Dodail systems are engineered for human-in-the-loop collaboration. High-stakes edge cases, complex pricing negotiations, or sensitive customer complaints are tagged with full context and instant routing alerts to your designated team members via Slack, WhatsApp, or CRM notifications.",
  },
  {
    category: "COMMERCIAL MODEL",
    question: "What is your pricing structure for automation engineering?",
    answer:
      "We provide transparent, fixed-scope engineering packages for initial discovery and implementation, coupled with predictable monthly maintenance and SLA support agreements. We do not charge arbitrary transaction markups on your own API keys or software licenses.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-[#1B3652] divide-y divide-[#1B3652]">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const indexStr = String(index + 1).padStart(2, "0");

        return (
          <div
            key={index}
            className={`transition-colors duration-150 ${
              isOpen ? "bg-[#0C2233]" : "hover:bg-[#0C2233]/40"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full text-left py-6 px-4 sm:px-6 flex items-start justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C]"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-4 sm:gap-8">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#FF6B2C] pt-0.5 shrink-0">
                  {indexStr}
                </span>
                <div className="flex flex-col gap-1">
                  {faq.category && (
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#AABAC8] font-semibold">
                      {faq.category}
                    </span>
                  )}
                  <h3 className="text-base sm:text-xl font-bold text-[#F5F8FC] leading-snug tracking-[-0.015em]">
                    {faq.question}
                  </h3>
                </div>
              </div>

              <div className="font-mono text-xs text-[#FF6B2C] border border-[#1B3652] px-2 py-1 shrink-0 mt-1 select-none">
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-4 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#AABAC8] leading-relaxed pl-12 sm:pl-20 border-t border-[#1B3652]/40">
                <p className="font-light max-w-3xl">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
