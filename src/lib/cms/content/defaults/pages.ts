/**
 * Default copy for the About, Work, Industries overview and legal pages.
 * Text fields support **bold** and [link text](/path) inline formatting.
 */

const consult = "/consultation";

export const aboutDefaults = {
  seo: {
    title: "About Dodail Solutions | AI Automation & Engineering Partner",
    description:
      "Learn about Dodail Solutions Private Limited. Established in 2019 in Hyderabad, India, building reliable AI automations, custom software, and digital growth engines.",
  },
  hero: {
    badge: "Company & Mission",
    title: "Engineering Pragmatic AI & Digital Growth Since 2019",
    subtitle:
      "Dodail Solutions Private Limited was founded in Hyderabad with a singular conviction: businesses grow faster when technology automates the mundane and amplifies human ingenuity.",
  },
  story: {
    eyebrow: "Our Story",
    title: "From Custom Web Engineering to Autonomous Enterprise Systems",
    paragraphs: [
      "Founded on June 2, 2019, Dodail Solutions began as a web development and digital marketing agency delivering performant websites and measurable search growth for clients across India, North America, and the Middle East.",
      "With the advent of Large Language Models and cloud-native serverless infrastructure, we evolved into a full-lifecycle **AI Automation and Software Growth Platform**. We don't just build static websites; we build autonomous workflows that capture leads, resolve customer inquiries, and synchronize business data in real time.",
    ],
    stats: [
      { value: "2019", label: "Year Incorporated", tone: "orange" },
      { value: "100+", label: "Digital Systems Delivered", tone: "slate" },
      { value: "0", label: "Fabricated Reviews", tone: "emerald" },
      { value: "100%", label: "Clean Code Ownership", tone: "teal" },
    ],
  },
  principles: {
    badge: "Guiding Tenets",
    title: "Our Architectural Commitments",
    description: "How we maintain production-grade quality, customer trust, and long-term maintainability.",
    items: [
      { icon: "ShieldCheck", tone: "emerald", title: "Deterministic Guardrails", description: "We never let AI run unconstrained on customer data. Every automated action is validated against strict JSON schema contracts with audit trails and human escalation paths." },
      { icon: "Code", tone: "orange", title: "Open Standard Foundations", description: "Built on Next.js, TypeScript, PostgreSQL, and standard cloud APIs. We do not trap clients inside fragile, closed-source no-code lock-in. You own your code and your database." },
      { icon: "Target", tone: "teal", title: "Measurable Commercial ROI", description: "We only build automations that generate revenue, accelerate response times, or eliminate verifiable labor costs. If a workflow doesn't justify its investment, we say so upfront." },
    ],
  },
  corporate: {
    title: "Corporate Identity & Verification",
    lines: [
      "**Legal Entity:** Dodail Solutions Private Limited (CIN Registered in Telangana, India).",
      "**Registered Address:** Hyderabad, Telangana 500081, India.",
      "**Official Contact:** info@dodail.com · +91 99664 00235.",
      "**Core Technologies:** Next.js 16, React 19, Tailwind CSS, Supabase PostgreSQL, Google Gemini API, Meta Graph API, Razorpay, Stripe.",
    ],
  },
  cta: {
    title: "Ready to partner with an engineering-first growth team?",
    button: { label: "Schedule Introductory Call", href: consult },
  },
};

export const workDefaults = {
  seo: {
    title: "Case Studies & Work Portfolio | Dodail Solutions",
    description:
      "Explore verified implementation blueprints, real automation architectures, and digital systems engineered by Dodail Solutions.",
  },
  hero: {
    badge: "Verified Work",
    title: "Real Engineering. Measurable Outcomes.",
    subtitle:
      "We pride ourselves on transparent, verifiable case studies. No exaggerated marketing claims—just clean software architecture and business metrics that move the needle.",
  },
  labels: {
    verified: "Verified Implementation",
    problem: "The Friction",
    architecture: "The Architecture",
    outcome: "Measured Outcome",
    cardCta: "Discuss Similar Architecture",
    cardCtaHref: consult,
  },
  caseStudies: [
    {
      title: "Autonomous Dental Clinic Patient Triage & Appointment Engine",
      sector: "Healthcare & Dental (Hyderabad, India)",
      problem: "Clinic front-desk was overwhelmed with after-hours WhatsApp inquiries and suffered high appointment no-show rates (~28%).",
      architecture: "Integrated WhatsApp Cloud API with Google Calendar via Supabase PostgreSQL state engine, delivering 24/7 symptom triage and automated attendance confirmations.",
      outcome: "Emergency inquiries addressed in <2 minutes; appointment no-shows dropped by ~70% over 90 days.",
      techStack: ["Next.js 16", "Supabase PostgreSQL", "WhatsApp Cloud API", "Google Calendar API"],
    },
    {
      title: "High-Intent Real Estate Lead Qualification & Broker Dispatch",
      sector: "Commercial & Residential Developers",
      problem: "Sales team spent 4+ hours daily filtering unqualified portal leads with mismatched budgets and distant timelines.",
      architecture: "Deployed multi-step conversational lead qualification form with instant SMS/WhatsApp brochure delivery and priority routing for verified HNI buyers.",
      outcome: "Immediate qualification under 60 seconds; sales team conversion efficiency increased by 3.2x.",
      techStack: ["Next.js", "Gemini Evaluator", "PostgreSQL", "Twilio SMS", "Salesforce API"],
    },
    {
      title: "Generative Engine Optimization (GEO) & Technical Search Migration",
      sector: "B2B Professional Services",
      problem: "Traditional organic traffic stalled due to changing Google AI overviews and slow legacy CMS mobile rendering.",
      architecture: "Engineered headless Next.js App Router architecture, implemented structured JSON-LD entity graphs, and created high-authority topical clusters.",
      outcome: "Achieved 98/100 Lighthouse performance and multiple direct citations in Perplexity and Google AI Overviews.",
      techStack: ["Next.js 16", "Schema.org Graphs", "Cloudflare Edge", "Tailwind CSS"],
    },
  ],
  cta: {
    title: "Have a Specific Technical Problem to Solve?",
    description: "Book an engineering scoping call with our core technical architects to map your current bottlenecks.",
    button: { label: "Book Architecture Scoping", href: consult },
  },
};

export const industriesIndexDefaults = {
  seo: {
    title: "Industry Solutions & Vertical Blueprints | Dodail Solutions",
    description:
      "Tailored AI automation, custom software and growth systems for healthcare clinics, real estate developers, e-commerce brands and manufacturers.",
  },
  hero: {
    badge: "Vertical Blueprints",
    title: "Specialized Architectures For High-Impact Industries",
    subtitle:
      "We don't apply one-size-fits-all templates. Each industry architecture addresses the specific operational frictions, compliance standards, and conversion dynamics of your sector.",
  },
  outcomesLabel: "Target Outcomes",
  cardButtonLabel: "Explore Blueprint Details",
  verticals: [
    {
      icon: "Stethoscope",
      title: "Healthcare & Dental Clinics",
      href: "/industries/dental",
      description: "Urgent patient triage, WhatsApp appointment booking, automated pre-intake forms, and local Google Maps search ranking.",
      outcomes: ["Sub-2-minute emergency booking", "70% reduction in appointment no-shows", "Top-3 local Google Maps ranking"],
    },
    {
      icon: "Building2",
      title: "Real Estate Developers & Brokers",
      href: "/industries/real-estate",
      description: "Instant buyer qualification, budget filtering, WhatsApp property brochure delivery, and automated site visit scheduling.",
      outcomes: ["Zero delayed ad leads", "Sales advisors speak only to verified budgets", "Automated multi-channel CRM sync"],
    },
    {
      icon: "ShoppingBag",
      title: "E-Commerce & DTC Retail Brands",
      href: "/industries/ecommerce",
      description: "Headless Next.js storefronts, automated shipping & order tracking inquiries, and automated WhatsApp abandoned cart recovery.",
      outcomes: ["Under-500ms mobile page speeds", "60% reduction in order-status tickets", "Recovered cart conversion lifts"],
    },
    {
      icon: "Factory",
      title: "Manufacturing & Industrial Operations",
      href: "/industries/manufacturing",
      description: "Vendor quotation parsing, automated purchase order verification, machine maintenance schedules, and dispatch logistics tracking.",
      outcomes: ["Zero manual PO entry delays", "Real-time ERP inventory synchronization", "Automated carrier tracking links"],
    },
  ],
  cta: {
    title: "Don't See Your Specific Industry Listed?",
    description:
      "Our core integration engine connects any relational database, REST/GraphQL API, and customer communication channel. Schedule an architecture review for custom vertical workflows.",
    button: { label: "Book Architecture Scoping Call", href: consult },
  },
};

export interface LegalContent {
  seo: { title: string; description: string };
  title: string;
  updatedLine: string;
  sections: Array<{ heading: string; body: string }>;
}

export const privacyDefaults: LegalContent = {
  seo: { title: "Privacy Policy | Dodail Solutions", description: "Dodail Solutions Private Limited Privacy Policy and data protection terms." },
  title: "Privacy Policy",
  updatedLine: "Last updated: October 2026 · Dodail Solutions Private Limited",
  sections: [
    { heading: "1. Overview", body: "Dodail Solutions Private Limited (\"Dodail\", \"we\", \"us\") is committed to protecting your personal and corporate data. This policy explains what information we collect when you visit our website, book consultations, or utilize our AI automation platforms." },
    { heading: "2. Information We Collect", body: "We collect information provided directly by you, including your name, business email address, telephone/WhatsApp number, company details, and inquiry descriptions through our consultation forms and communication channels." },
    { heading: "3. Artificial Intelligence & Data Isolation", body: "We adhere to strict enterprise AI ethics. Any customer inputs, confidential prompts, or business workflow logs processed via our integrated Google Gemini or Claude providers are isolated, encrypted, and **never used to train public LLM models**." },
    { heading: "4. Data Storage & Security", body: "All data is secured using industry-standard TLS 1.3 encryption in transit and AES-256 encryption at rest. We utilize PostgreSQL with Row-Level Security (RLS) to enforce data privacy." },
    { heading: "5. Contact Information", body: "If you have questions regarding this Privacy Policy or wish to request data deletion, contact our Data Protection Officer at:\n**Email:** info@dodail.com\n**Address:** Dodail Solutions Private Limited, Hyderabad, Telangana, India." },
  ],
};

export const termsDefaults: LegalContent = {
  seo: { title: "Terms of Service | Dodail Solutions", description: "Dodail Solutions Private Limited Terms of Service and master consulting agreement." },
  title: "Terms of Service",
  updatedLine: "Last updated: October 2026 · Dodail Solutions Private Limited",
  sections: [
    { heading: "1. Agreement to Terms", body: "By accessing or using the services of Dodail Solutions Private Limited (\"Dodail\"), you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company, you represent that you possess the authority to bind that entity." },
    { heading: "2. Scope of Services", body: "Dodail provides software engineering, AI workflow automation design, custom software development, and digital marketing/GEO consulting. Specific deliverables, timelines, and fees are governed by individual Statements of Work (SOW)." },
    { heading: "3. Intellectual Property & Code Ownership", body: "Unless otherwise agreed in a written SOW, upon full payment for custom software deliverables, the client retains full ownership of the custom application code and database schemas developed specifically for their engagement." },
    { heading: "4. Warranties & Disclaimers", body: "We adhere to rigorous software engineering best practices. However, services are provided on an \"as is\" and \"as available\" basis regarding third-party API rate limits, platform outages (e.g. Meta, Google, OpenAI, Anthropic), or downstream infrastructure disruptions outside our control." },
    { heading: "5. Governing Law & Jurisdiction", body: "These Terms shall be governed by and construed in accordance with the laws of India. Any legal dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India." },
  ],
};
