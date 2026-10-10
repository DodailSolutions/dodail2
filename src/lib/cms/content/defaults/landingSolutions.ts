import { LandingContent, noIntegrations } from "./landing";

const consult = "/consultation";
const contact = "/contact";

export const solutionPages = {
  "solutions/ai-automation": {
    layout: "solution",
    seo: {
      title: "AI Automation Platform & Autonomous Agents",
      description:
        "Deploy enterprise AI agents and autonomous workflows that orchestrate lead capture, CRM synchronization, and operational execution with strict guardrails.",
    },
    hero: {
      badge: "Core Platform // v2.0",
      badgeTone: "orange",
      title: "Autonomous AI Operations for Modern Business",
      highlight: "Modern Business",
      subtitle:
        "We architect and deploy specialized AI agents connected directly to your existing databases, communication channels, and back-office tools.",
      primaryCta: { label: "Book AI Architecture Call", href: consult },
      secondaryCta: { label: "Contact Engineering Team", href: contact },
    },
    features: {
      badge: "Platform Capabilities",
      title: "What the Dodail AI Platform Powers",
      description:
        "Built on Google Gemini API with structured tool-calling, PostgreSQL state management, and real-time event webhooks.",
      items: [
        { icon: "Bot", tone: "orange", title: "Autonomous Multi-Agent Systems", description: "Orchestrate specialized agents for research, data extraction, invoice processing, and customer triage working collaboratively with shared state." },
        { icon: "Zap", tone: "amber", title: "Sub-Second Decision Latency", description: "Edge-optimized execution pipelines that evaluate customer intent, validate schemas, and trigger external API actions in under 500 milliseconds." },
        { icon: "Shield", tone: "emerald", title: "Enterprise Security & Isolation", description: "Every tool call runs in an isolated sandbox with OAuth token encryption, cryptographic audit logging, and zero training on your proprietary data." },
      ],
    },
    integrations: {
      eyebrow: "Connectivity",
      title: "Seamless Ecosystem Integration",
      description:
        "Connects out of the box with your vital business infrastructure without ripping and replacing your current software investments.",
      items: [
        { name: "Google Workspace", detail: "Sheets, Calendar, Gmail" },
        { name: "Meta Graph API", detail: "WhatsApp Cloud & IG" },
        { name: "Payment Rails", detail: "Razorpay & Stripe" },
        { name: "Enterprise CRMs", detail: "Salesforce, HubSpot, Zoho" },
      ],
    },
    cta: {
      title: "Ready to automate your operations?",
      description: "Talk to a solutions architect to audit your current manual bottlenecks and receive a technical blueprint.",
      button: { label: "Schedule a Feasibility Call", href: consult },
    },
  },

  "solutions/ai-lead-management": {
    layout: "solution",
    seo: {
      title: "AI Lead Management & Qualification | Dodail Solutions",
      description:
        "Capture, qualify, and triage inbound business leads in under 60 seconds with conversational AI, instant CRM sync, and automated calendar scheduling.",
    },
    hero: {
      badge: "Revenue Acceleration",
      badgeTone: "orange",
      title: "Never Lose a High-Value Lead to Slow Follow-Up Again",
      highlight: "Slow Follow-Up",
      subtitle:
        "Convert website visitors, WhatsApp inquiries, and ad traffic into booked calendar meetings in under 60 seconds with autonomous qualification.",
      primaryCta: { label: "Book Lead Automation Demo", href: consult },
      secondaryCta: { label: "Talk to an Engineer", href: contact },
    },
    features: {
      badge: "How It Works",
      title: "The 3-Step Autonomous Lead Pipeline",
      description: "From first click to calendar booking without human bottlenecks.",
      items: [
        { icon: "Zap", tone: "orange", title: "1. Instant Ingestion", description: "Catches inbound queries across your website forms, WhatsApp messages, LinkedIn ads, or Google Ads the exact millisecond they submit." },
        { icon: "Filter", tone: "amber", title: "2. Intelligent Qualification", description: "Engages in natural language conversation to verify budget, timeline, company size, and specific requirement before routing to sales." },
        { icon: "Database", tone: "emerald", title: "3. Instant CRM & Meeting Sync", description: "Pushes full enriched contact records into your CRM, dispatches a personalized calendar booking link, and sends a WhatsApp confirmation." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Stop letting qualified revenue sit in an unread inbox",
      description: "Let our solutions architects audit your current lead flow and deploy an automated qualification pilot.",
      button: { label: "Audit Your Lead Pipeline", href: consult },
    },
  },

  "solutions/ai-customer-support": {
    layout: "solution",
    seo: {
      title: "AI Customer Support & Ticketing Automation | Dodail Solutions",
      description:
        "Deliver 24/7 intelligent customer resolutions, automatic ticket triaging, and zero-wait answers trained securely on your company knowledge base.",
    },
    hero: {
      badge: "Customer Experience",
      badgeTone: "orange",
      title: "24/7 Customer Resolutions With Zero Hallucinations",
      highlight: "Zero Hallucinations",
      subtitle:
        "Deploy an intelligent support employee that knows your product documentation, resolves 60%+ of tier-1 inquiries, and seamlessly hands off to humans.",
      primaryCta: { label: "Book Support Automation Call", href: consult },
      secondaryCta: { label: "Talk to an Engineer", href: contact },
    },
    features: {
      badge: "Support Capabilities",
      title: "Architected For High-Volume Precision",
      description: "Combining vector search retrieval (RAG) with deterministic policy guardrails.",
      items: [
        { icon: "Headphones", tone: "orange", title: "Omni-Channel Availability", description: "Integrate the same AI support brain across your website widget, WhatsApp Cloud API, email tickets, and customer portal." },
        { icon: "Shield", tone: "emerald", title: "Strict Business Knowledge Base", description: "Responds solely using your approved operating manuals, refund rules, and pricing sheets. Never invents unsupported promises." },
        { icon: "Bot", tone: "teal", title: "Context-Preserved Human Handoff", description: "When an issue requires human review, the conversation transfers with full summary, sentiment analysis, and suggested actions." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Cut your first-response time from hours to seconds",
      description: "Let our solutions architects design a custom support automation workflow tailored to your product stack.",
      button: { label: "Request Architecture Review", href: consult },
    },
  },

  "solutions/workflow-automation": {
    layout: "solution",
    seo: {
      title: "Workflow Automation & System Integration | Dodail Solutions",
      description:
        "Replace fragile no-code connectors with resilient, PostgreSQL-backed asynchronous workflow pipelines, bi-directional API sync, and automated background jobs.",
    },
    hero: {
      badge: "Infrastructure & APIs",
      badgeTone: "orange",
      title: "Durable Workflow Automation That Never Drops a Transaction",
      highlight: "Never Drops a Transaction",
      subtitle:
        "We replace brittle Zapier integrations with hardened, error-recovering serverless DAG pipelines backed by durable database queues.",
      primaryCta: { label: "Book Workflow Audit", href: consult },
      secondaryCta: { label: "Talk to an Engineer", href: contact },
    },
    features: {
      badge: "Why Code Over No-Code",
      title: "Engineered for Fault-Tolerant Reliability",
      description: "The difference between a fragile script and an enterprise-grade pipeline.",
      items: [
        { icon: "Database", tone: "orange", title: "PostgreSQL-Backed Durability", description: "If an external service like Google Sheets or Meta rate-limits your request, our job queue automatically backs off with exponential retry without losing a single record." },
        { icon: "Workflow", tone: "teal", title: "Bi-Directional State Synchronization", description: "Keep your operational spreadsheets, internal accounting tools, and external CRMs synchronized in real-time with conflict resolution and cryptographic HMAC verification." },
        { icon: "Zap", tone: "amber", title: "Zero Per-Task Tax", description: "No punitive per-task pricing tiers that penalize you as your business scales. Run millions of background transactions on modern, predictable cloud infrastructure." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Upgrade your backend plumbing today",
      description: "Consult with our systems engineers to architect resilient automation for your core company operations.",
      button: { label: "Discuss Your Integration Architecture", href: consult },
    },
  },

  "services/web-development": {
    layout: "solution",
    seo: {
      title: "Custom Web & Software Engineering (Next.js)",
      description:
        "Custom full-stack web application development, Next.js architecture, headless e-commerce, and cloud APIs engineered for speed, SEO, and long-term scale.",
    },
    hero: {
      badge: "Full-Stack Engineering",
      badgeTone: "orange",
      title: "Next.js Web Applications Built For Speed, Security & Search",
      highlight: "Speed, Security & Search",
      subtitle:
        "We build custom web software that delivers sub-second page loads, passes Core Web Vitals with flying colors, and converts visitors into committed clients.",
      primaryCta: { label: "Discuss Your Web Project", href: consult },
      secondaryCta: { label: "Request Code Review", href: contact },
    },
    features: {
      badge: "Engineering Capabilities",
      title: "Modern Architecture Stack",
      description:
        "Crafted using Next.js 16, TypeScript, Tailwind CSS, Supabase PostgreSQL, and edge serverless infrastructure.",
      items: [
        { icon: "Code2", tone: "orange", title: "Custom Web Applications", description: "Customer portals, internal business dashboards, quotation engines, and high-conversion SaaS interfaces tailored to your exact business rules." },
        { icon: "Globe", tone: "teal", title: "Headless & E-Commerce Systems", description: "Ultra-fast headless Shopify, WooCommerce, and custom checkout flows engineered for instantaneous mobile checkout and zero cart latency." },
        { icon: "Server", tone: "emerald", title: "Cloud APIs & Database Design", description: "Resilient PostgreSQL schemas, secure Supabase Auth, Row-Level Security, automated backups, and REST/GraphQL API development." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Have a software build or legacy redesign in mind?",
      description: "Talk to a senior technical architect about your tech stack, scope of work, and delivery roadmap.",
      button: { label: "Book Engineering Scoping Session", href: consult },
    },
  },

  "services/digital-growth-seo": {
    layout: "solution",
    seo: {
      title: "Digital Growth, GEO & SEO Services",
      description:
        "Dominate search results across traditional Google Search and next-gen AI search engines (Perplexity, ChatGPT, Gemini) with technical SEO and GEO strategy.",
    },
    hero: {
      badge: "Generative Engine Optimization (GEO)",
      badgeTone: "orange",
      title: "Rank On Google & Be Cited By Leading AI Engines",
      highlight: "Leading AI Engines",
      subtitle:
        "Modern buyers ask ChatGPT, Perplexity, and Google Gemini before purchasing. We engineer your brand to become the trusted, authoritative source AI cites.",
      primaryCta: { label: "Book Search & GEO Audit", href: consult },
      secondaryCta: { label: "Request SEO Analysis", href: contact },
    },
    features: {
      badge: "Growth Pillars",
      title: "Dual Optimization Strategy",
      description: "Bridging technical on-page authority with modern AI citation architecture.",
      items: [
        { icon: "Sparkles", tone: "orange", title: "Generative Engine Optimization (GEO)", description: "We structure your content schema, entity graphs, and topical authority clusters so AI models recognize and cite your business in generative search overviews." },
        { icon: "Search", tone: "teal", title: "Technical & Core Web Vitals SEO", description: "Eliminate crawl errors, optimize rendering budgets, fix indexing blocks, and achieve 95+ Lighthouse scores to maximize organic Google search ranking." },
        { icon: "MapPin", tone: "emerald", title: "Local SEO & Multi-Region Expansion", description: "Optimize Google Business Profiles, localized schema, and hyper-targeted landing pages for multi-branch clinics, real estate, and regional service leaders." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Find out how your business currently ranks across AI search",
      description: "Get a comprehensive audit identifying opportunities to increase search impressions and LLM citation frequency.",
      button: { label: "Request Comprehensive SEO / GEO Audit", href: consult },
    },
  },
} satisfies Record<string, LandingContent>;
