import { KnowledgeDocument } from "./types";

/**
 * Canonical Source of Truth for Gita (AI Sales & Support Specialist) and Website RAG.
 * Directly derived from Dodail_Website_SEO_and_Gita_RAG_Master_Spec.md.
 */
export const APPROVED_KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: "kb-company-identity",
    category: "policy",
    title: "Company Identity & Canonical Facts",
    content: `Brand: Dodail / Dodail Solutions Private Limited
Tagline: Think Growth. Think Dodail.
Brand Concept: Design-Oriented Development & AI-Led Solutions.
Positioning: Dodail designs, builds and improves the digital systems businesses use to grow — from websites and e-commerce to custom software, AI automation, SEO and digital marketing.
Headquarters: Hyderabad, Telangana, India.
Primary Markets: India, USA, UK, and UAE/Dubai (service and remote delivery markets).
Website: https://www.dodail.com
Contact Email: info@dodail.com
Contact Phone: +91 99664 00235
Hours: Mon – Sat, 9:00 AM – 7:00 PM IST
Primary CTA: Book a consultation at /consultation or /contact`,
    approved: true,
    updated_at: "2026-10-20T00:00:00Z",
  },
  {
    id: "kb-services-overview",
    category: "service",
    title: "Core Service Offerings & Deliverables",
    content: `Dodail delivers 6 core service architectures:
1. AI Automation & Workflows: Practical AI automation, lead routing, CRM workflows, WhatsApp Cloud API integrations, and eliminating repetitive manual copy-paste operations.
2. Custom Software & SaaS: Web applications, client portals, custom dashboards, inventory engines, and internal tools engineered with Next.js, React, Node.js, and PostgreSQL.
3. Website Design & Development: Fast, mobile-first business websites with conversion-focused UX, clean typography, sub-second performance, and technical SEO foundations.
4. E-commerce Development: Shopify, WooCommerce, and bespoke online stores with secure checkout, payment gateway integrations, and order management.
5. Digital Marketing & SEO: Data-driven performance ads (Google/Meta), organic technical SEO, and Generative Engine Optimization (GEO). Note: In Dodail's services, GEO stands strictly for Generative Engine Optimization (AI search visibility on ChatGPT, Perplexity, and Google AI Overviews).
6. Branding & UI/UX Design: Brand identity systems, modern logo design, typography hierarchies, brand guidelines, and high-fidelity interface design.`,
    approved: true,
    updated_at: "2026-10-20T00:00:00Z",
  },
  {
    id: "kb-products-truth",
    category: "service",
    title: "Products & Internal Tools Representation Truth Table",
    content: `Dodail internal tools and products status guide:
• BillBooky (Status: Available / Beta): A Dodail-associated billing and business management tool accessible at https://billbooky.dodail.com/. Provides invoice creation, client tracking, and payment tracking.
• Dodail AI Social (Status: In Development): A planned agency and client social media operations platform featuring an approval calendar, AI-assisted content drafting, and multi-channel publishing workflows. Currently in internal testing.
• TinyRide (Status: Concept / Prototype): A school transport coordination mobile concept for parents and drivers. Not yet publicly released.
• Manufacturing OS (Status: Concept / Custom Software Capability): A modular workflow architecture for factory tracking and operations. Built as custom software for manufacturing clients.
• Rentcot (Status: Delivered Client Project): A resort and farmhouse booking marketplace built by Dodail (https://www.rentcot.in/).`,
    approved: true,
    updated_at: "2026-10-20T00:00:00Z",
  },
  {
    id: "kb-faq-canonical",
    category: "faq",
    title: "Canonical FAQ Library (Master Spec Section 13)",
    content: `Q: What does Dodail Solutions do?
A: Dodail provides website development, e-commerce development, custom software, AI-enabled workflow automation, SEO, digital marketing and branding/UI/UX services.

Q: Where is Dodail based?
A: Dodail is based in Hyderabad, Telangana, India.

Q: Does Dodail work with clients outside India?
A: Yes. Dodail serves clients in India, the UAE/Dubai, the UK, and the USA with dedicated timezone coordination.

Q: Can Dodail build a custom web application?
A: Yes. We engineer bespoke web applications, SaaS dashboards, and client portals using Next.js, React, Node.js, and secure databases.

Q: Does Dodail build Shopify and WooCommerce websites?
A: Yes. We develop tailored Shopify stores and WooCommerce platforms with custom themes, app integrations, and conversion-optimized checkouts.

Q: Can Dodail automate WhatsApp enquiries?
A: Yes. We deploy automated WhatsApp lead capture, appointment booking reminders, and customer support using the official WhatsApp Business Cloud API.

Q: Does Dodail guarantee Google rankings, leads, or revenue?
A: No. We do not make false guarantees. Organic search and advertising depend on market demand, competition, and search engine algorithms. We commit to rigorous technical execution, clear deliverables, transparent metrics, and continuous optimization.

Q: How much does a website or software build cost?
A: Costs depend on requirements, screen count, database architecture, integrations, and ongoing support. Starter automation workflows typically start from ₹75,000 to ₹1,50,000 INR. Custom websites and platforms are scoped following a discovery call.

Q: How long does a project take?
A: Automation pipelines typically take 7 to 14 business days. High-impact web platforms take 4 to 8 weeks. Comprehensive custom software builds take 2 to 4 months delivered in milestone sprints.`,
    approved: true,
    updated_at: "2026-10-20T00:00:00Z",
  },
  {
    id: "kb-pricing-and-guarantees",
    category: "policy",
    title: "Pricing, Scoping & Truthfulness Rules",
    content: `Non-negotiable rules for Gita and Dodail communication:
1. Never promise guaranteed #1 Google rankings, guaranteed revenue, or guaranteed lead counts.
2. Distinguish clearly between Available products, Custom-build capabilities, In development, and Concepts.
3. Keep GEO unambiguous: Generative Engine Optimization means optimizing for AI search engines (ChatGPT, Gemini, Perplexity). Geographic expansion is referred to as "Growth & Market Expansion".
4. Consultations: 15-30 minute free discovery sessions available Monday through Saturday.
5. Code Ownership: Clients own 100% of their custom code, IP, repositories, and ad accounts upon project completion with zero vendor lock-in.`,
    approved: true,
    updated_at: "2026-10-20T00:00:00Z",
  },
  {
    id: "kb-industry-solutions",
    category: "case_study",
    title: "Industry Capabilities & Solutions",
    content: `Tailored solutions by vertical:
• Healthcare & Dental Clinics: Automated patient inquiry answering, appointment reminder notifications via WhatsApp, local SEO, and zero-no-show workflows.
• Real Estate & Developers: Sub-60-second lead qualification, property inquiry routing, CRM sync, and high-converting landing pages.
• E-Commerce & DTC Brands: Custom Shopify theme engineering, checkout optimization, speed optimization, cart abandonment WhatsApp automations, and performance ads.
• Manufacturing & Industrial: Custom ERP/CRM integrations, dealer portal software, quotation automation, and b2b lead generation.
• Professional Services: Clean corporate websites, appointment scheduling integrations, and authority-building content.`,
    approved: true,
    updated_at: "2026-10-20T00:00:00Z",
  },
];

export function searchApprovedKnowledge(query: string): string[] {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  const matchedDocs = APPROVED_KNOWLEDGE_BASE.filter((doc) => {
    if (!doc.approved) return false;
    const text = (doc.title + " " + doc.content).toLowerCase();
    return terms.some((term) => text.includes(term));
  });

  if (matchedDocs.length === 0) {
    return [APPROVED_KNOWLEDGE_BASE[0].content, APPROVED_KNOWLEDGE_BASE[1].content];
  }

  return matchedDocs.map((d) => `[${d.title}]:\n${d.content}`);
}
