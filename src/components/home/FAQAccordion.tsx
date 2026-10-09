"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQItem[] = [
  {
    category: "AI Reliability & Safety",
    question: "How does Dodail guarantee AI accuracy and eliminate hallucinations?",
    answer:
      "We never connect unconstrained, raw AI language models directly to your production databases or customer channels. Every prompt is bound by deterministic JSON schema validation, verified business policy contexts, and strict confidence thresholds. If confidence falls below 95% or an input is ambiguous, the system triggers a graceful human escalation rather than guessing.",
  },
  {
    category: "Timeline & Delivery",
    question: "How long does a typical automation or custom software deployment take?",
    answer:
      "Standard lead triage, WhatsApp business routing, or Google Sheets bi-directional synchronization typically goes live within 7 to 14 business days. Comprehensive enterprise initiatives—such as bespoke Next.js web applications, full CRM migrations, or multi-department workflow DAGs—typically span 3 to 6 weeks from initial architecture to live cutover.",
  },
  {
    category: "Integration & Compatibility",
    question: "Can Dodail integrate with our existing CRM, Google Sheets, and custom tools?",
    answer:
      "Yes. We specialize in zero-disruption integration. We construct bi-directional connectors for Google Sheets, Salesforce, HubSpot, Zoho, WhatsApp Cloud API, and internal PostgreSQL/MySQL databases using secure OAuth 2.0 and encrypted webhooks, preserving your current operating habits while automating the grunt work.",
  },
  {
    category: "Security & Data Governance",
    question: "How is our proprietary customer data and business intelligence protected?",
    answer:
      "All data is encrypted in transit via TLS 1.3 and at rest via AES-256. Database instances operate with strict PostgreSQL Row-Level Security (RLS) policies. Crucially, your private operational data, customer inquiries, and commercial records are NEVER submitted to train public foundational LLMs.",
  },
  {
    category: "Human Oversight",
    question: "What happens when an inquiry requires human judgment or sales closing?",
    answer:
      "Dodail systems are engineered for human-in-the-loop collaboration. High-stakes edge cases, complex pricing negotiations, or sensitive customer complaints are tagged with full context and instant routing alerts to your designated team members via Slack, WhatsApp, or CRM notifications.",
  },
  {
    category: "Commercial Model",
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
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-[#FA5B0F]/40 bg-[#0E2235]/90 shadow-lg shadow-black/40"
                : "border-[#1B3652]/70 bg-[#0A1B2A]/70 hover:border-[#1B3652] hover:bg-[#0E2235]/50"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5B0F] rounded-2xl"
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-1 pr-2">
                {faq.category && (
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#FA5B0F] font-semibold">
                    {faq.category}
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {faq.question}
                </h3>
              </div>
              <div
                className={`h-8 w-8 rounded-full border border-[#1B3652] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-[#FA5B0F]/20 text-[#FA5B0F] border-[#FA5B0F]/40" : "bg-[#142C44] text-slate-400"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-[#1B3652]/50">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
