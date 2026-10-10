import { IndustryKey } from "@/components/3d/3DTypes";

/**
 * Homepage copy. Deliberately free of invented statistics, client names,
 * testimonials and live-status claims; only describes what Dodail builds.
 */

export const services = [
  {
    id: "ai-automation",
    title: "AI Automation & Workflows",
    shape: "WhatsApp & web forms → automation → CRM & Sheets",
    audience: "For teams answering the same enquiries, re-typing data between tools or chasing follow-ups by hand.",
    desc: "Connect the systems your team already uses and automate the steps between them, from the first WhatsApp message or web form to the CRM record and the follow-up.",
    deliverables: ["WhatsApp Cloud API integration", "Rule-based triage with human hand-off", "CRM and Google Sheets sync"],
    href: "/solutions/ai-automation",
    accent: "#FF6B2C",
  },
  {
    id: "custom-software",
    title: "Custom Software & SaaS",
    shape: "Code-block stack",
    audience: "For businesses whose processes have outgrown spreadsheets and off-the-shelf tools.",
    desc: "Web applications, internal dashboards and client portals built on Next.js and PostgreSQL, with access control designed in from the start.",
    deliverables: ["Full-stack Next.js applications", "Database and schema design", "Source code you own"],
    href: "/services/web-development",
    accent: "#27D3C2",
  },
  {
    id: "web-ecommerce",
    title: "Websites & E-Commerce",
    shape: "Storefront → order → parcel → delivery",
    audience: "For brands that need a fast site or store that is easy to run and connects to the rest of their operations.",
    desc: "Fast storefronts and business sites that are straightforward to manage, with order, inventory and logistics steps automated behind them.",
    deliverables: ["Shopify and custom headless stores", "Post-purchase automation", "Conversion-focused interface design"],
    href: "/industries/ecommerce",
    accent: "#FF6B2C",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & SEO",
    shape: "Growth bars",
    audience: "For businesses that want more of the right enquiries from search, and to know what is driving them.",
    desc: "Search visibility, local presence and content that bring in the right enquiries, tracked so you can see what is working.",
    deliverables: ["Technical SEO and structured data", "Local search presence", "Performance tracking and reporting"],
    href: "/services/digital-growth-seo",
    accent: "#27D3C2",
  },
  {
    id: "branding-uiux",
    title: "Branding & UI/UX Design",
    shape: "Type, colour and a pen tool applied to a product UI",
    audience: "For companies launching, rebranding, or making a digital product easier to use.",
    desc: "Visual identities, design systems and product interfaces that look considered and are easy to use on every screen.",
    deliverables: ["Visual identity systems", "Component-driven design libraries", "Accessible, WCAG-minded interfaces"],
    href: "/work",
    accent: "#FF6B2C",
  },
];

export const problems = [
  {
    num: "01",
    title: "Follow-up is slow",
    desc: "Enquiries from forms, WhatsApp and ads wait for someone to read them. By the time a reply goes out, the buyer has often moved on.",
    fix: "Instant acknowledgement, qualification and routing, with your team alerted the moment a lead matters.",
  },
  {
    num: "02",
    title: "Skilled people do copy-paste work",
    desc: "The same details get re-typed between tools and the same questions get answered all day, leaving less time for the conversations that close.",
    fix: "Workflows that move data between your tools and handle the routine questions, so people focus on judgement.",
  },
  {
    num: "03",
    title: "Tools do not talk to each other",
    desc: "Orders, payments and conversations live in separate places. Nobody has the full picture, and context leaves when people do.",
    fix: "One connected data layer across messaging, payments and CRM, so every team sees the same record.",
  },
];

export const pipelineStages = [
  {
    code: "01",
    name: "Trigger",
    title: "A customer signal arrives",
    desc: "A prospect sends a WhatsApp message, submits a form or books a call.",
    details: "Example: the inbound event is captured by a webhook and its signature is verified before anything else runs.",
  },
  {
    code: "02",
    name: "Intelligent processing",
    title: "Rules and AI assess the request",
    desc: "The system checks required fields, scores the request against rules you define, and sends anything unclear to a person.",
    details: "Example: budget and timeline are validated against your criteria. Ambiguous cases go to your team with the full context attached.",
  },
  {
    code: "03",
    name: "Automated action",
    title: "Records update and people are notified",
    desc: "The CRM record is created, a calendar slot is held and the customer gets a confirmation.",
    details: "Example: a contact and deal are written to the CRM and the right team member is notified in Slack or WhatsApp.",
  },
  {
    code: "04",
    name: "Business outcome",
    title: "The customer is answered while interest is high",
    desc: "The prospect gets a prompt, accurate reply and your team starts from a qualified lead instead of a raw enquiry.",
    details: "Illustrative outcome: fewer manual hand-offs and a cleaner pipeline. Real results depend on your process and volumes.",
  },
];

export interface IndustryItem {
  key: IndustryKey;
  label: string;
  headline: string;
  desc: string;
  features: string[];
  steps: string[];
  href: string;
  accent: string;
}

export const industries: IndustryItem[] = [
  {
    key: "dental",
    label: "Healthcare",
    headline: "Patient intake and appointment automation",
    desc: "Triage enquiries by urgency, offer appointment slots over WhatsApp and send pre-visit forms, so reception time goes to patients in the clinic.",
    features: ["After-hours triage", "Fewer reception phone calls", "Intake forms sent automatically"],
    steps: ["Emergency triage", "Patient intake", "Doctor schedule", "Confirmation message"],
    href: "/industries/dental",
    accent: "#27D3C2",
  },
  {
    key: "real-estate",
    label: "Real estate",
    headline: "Buyer qualification and site-visit scheduling",
    desc: "Filter portal enquiries by budget and timeline, send brochures instantly and book site visits into the right advisor's calendar.",
    features: ["Budget and timeline qualification", "Brochures sent instantly over WhatsApp", "Site visits booked automatically"],
    steps: ["Portal lead", "Budget qualifier", "Brochure dispatch", "Site visit booked"],
    href: "/industries/real-estate",
    accent: "#FF6B2C",
  },
  {
    key: "manufacturing",
    label: "Manufacturing",
    headline: "Purchase orders, stock checks and dispatch",
    desc: "Read incoming purchase orders, check stock against your inventory system and generate dispatch notes and carrier tracking for buyers.",
    features: ["Less manual order entry", "Inventory checks against your ERP", "Tracking links sent to buyers"],
    steps: ["Purchase order in", "Inventory match", "Dispatch note", "Carrier sync"],
    href: "/industries/manufacturing",
    accent: "#FBBF24",
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    headline: "Order updates, returns and restock alerts",
    desc: "Answer where-is-my-order questions, check return eligibility against your policy and create return pickups without staff involvement.",
    features: ["Order-status questions answered", "Policy-checked return requests", "Restock alerts for your team"],
    steps: ["Order or return event", "Policy check", "Pickup created", "Inventory updated"],
    href: "/industries/ecommerce",
    accent: "#34D399",
  },
];

export const processStages = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map your current touchpoints, manual steps, tools and where revenue or time is being lost.",
  },
  {
    num: "02",
    title: "Solution design",
    desc: "We define the architecture, data rules and the points where a person stays in the loop.",
  },
  {
    num: "03",
    title: "Implementation",
    desc: "We build the integrations, workflows and interfaces with secure webhooks and audit logging.",
  },
  {
    num: "04",
    title: "Testing",
    desc: "We test failure cases and retries in a sandbox before anything touches your live customers.",
  },
  {
    num: "05",
    title: "Launch & improvement",
    desc: "We cut over to production, watch how it behaves and keep refining it with you.",
  },
];

/**
 * "Why Dodail" commitments. Each one restates something the site already promises
 * elsewhere (services, FAQ, process); no new statistics or client claims.
 */
export const trust = [
  {
    icon: "team",
    title: "One team, from automation to brand",
    desc: "Automation, custom software, websites, marketing and design are planned and built by the same team, so your systems, site and brand share the same data instead of passing between vendors.",
    featured: true,
  },
  {
    icon: "ownership",
    title: "You own what we build",
    desc: "Your source code, database schemas and workflows stay yours. No proprietary platform, no lock-in, and no markup on your own API keys or software licences.",
  },
  {
    icon: "people",
    title: "People stay in control",
    desc: "Automations follow rules you approve. Anything ambiguous, high-value or sensitive goes to your team with the full context, rather than being guessed.",
  },
  {
    icon: "data",
    title: "Your data is handled with care",
    desc: "Data is encrypted in transit and at rest, access is restricted with row-level security, and your private communications are never used to train public AI models.",
  },
  {
    icon: "tools",
    title: "Works with the tools you already use",
    desc: "WhatsApp, Google Sheets, CRMs, Shopify and payment gateways are connected, not replaced, so your team keeps working the way it does today.",
  },
  {
    icon: "process",
    title: "A clear process and scope",
    desc: "Every project follows five defined stages with an agreed scope, so you always know what is being built and what comes next.",
  },
] as const;

/**
 * About-section figures. "100+ global clients" comes from Dodail's own published
 * copy; keep it in sync with reality (it is the only number on the page).
 */
export const aboutFigures = [
  { value: "100+", label: "Global systems delivered" },
  { value: "2019", label: "Founded in Hyderabad, India" },
  { value: "< 60s", label: "Autonomous triage speed" },
  { value: "100%", label: "Client code & IP ownership" },
];

export const specialisms = [
  { icon: "automation", label: "AI automation & workflows", detail: "WhatsApp, CRMs and spreadsheets, connected", href: "/solutions/ai-automation" },
  { icon: "web", label: "Website design & development", detail: "Fast, accessible business websites", href: "/services/web-development" },
  { icon: "commerce", label: "E-commerce", detail: "Shopify, WooCommerce and custom stores", href: "/industries/ecommerce" },
  { icon: "marketing", label: "SEO & digital marketing", detail: "Including marketing automation", href: "/services/digital-growth-seo" },
  { icon: "apps", label: "Mobile & web apps", detail: "Mobile apps and custom web applications", href: "/services/web-development" },
] as const;

/** Plain company facts for the intro section and structured data. */
export const company = {
  name: "Dodail Solutions Private Limited",
  shortName: "Dodail Solutions",
  city: "Hyderabad",
  region: "Telangana",
  country: "India",
  founded: "June 2019",
  phone: "+91 99664 00235",
  phoneHref: "tel:+919966400235",
  email: "info@dodail.com",
  url: "https://www.dodail.com",
};

export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

/**
 * Homepage FAQ. Rendered in full in the HTML (collapsed visually) and mirrored in
 * FAQPage structured data, so the two can never drift apart.
 */
export const faqs: FAQItem[] = [
  {
    category: "About Dodail",
    question: "What does Dodail Solutions do?",
    answer:
      "Dodail Solutions is a Hyderabad-based technology company that connects business systems and automates repetitive work. We build AI automation and workflows, custom software and SaaS platforms, websites and e-commerce stores, and we provide digital marketing, SEO, branding and UI/UX design.",
  },
  {
    category: "About Dodail",
    question: "Where is Dodail based, and do you work with clients outside India?",
    answer:
      "Dodail Solutions Private Limited is based in Hyderabad, Telangana, India, and was incorporated in June 2019. We work with businesses in India and overseas, collaborating remotely.",
  },
  {
    category: "Getting started",
    question: "Which businesses is AI automation a good fit for?",
    answer:
      "Automation helps most when the same steps repeat every day: answering enquiries, qualifying leads, booking appointments, updating a CRM or spreadsheet, sending order or delivery updates. We regularly design these workflows for healthcare clinics, real estate teams, manufacturers and e-commerce brands.",
  },
  {
    category: "AI reliability & safety",
    question: "How does Dodail guarantee AI accuracy and eliminate hallucinations?",
    answer:
      "We never connect unconstrained, raw AI language models directly to your production databases or customer channels. Every prompt is bound by deterministic JSON schema validation, verified business policy contexts, and strict confidence thresholds. If confidence falls below 95% or an input is ambiguous, the system triggers a graceful human escalation rather than guessing.",
  },
  {
    category: "Timeline & delivery",
    question: "How long does a typical automation or custom software deployment take?",
    answer:
      "Standard lead triage, WhatsApp business routing, or Google Sheets bi-directional synchronization typically goes live within 7 to 14 business days. Comprehensive enterprise initiatives—such as bespoke Next.js web applications, full CRM migrations, or multi-department workflow DAGs—typically span 3 to 6 weeks from initial architecture to live cutover.",
  },
  {
    category: "Integration & compatibility",
    question: "Can Dodail integrate with our existing CRM, Google Sheets, and custom tools?",
    answer:
      "Yes. We specialize in zero-disruption integration. We construct bi-directional connectors for Google Sheets, Salesforce, HubSpot, Zoho, WhatsApp Cloud API, and internal PostgreSQL/MySQL databases using secure OAuth 2.0 and encrypted webhooks, preserving your current operating habits while automating the grunt work.",
  },
  {
    category: "Security & data governance",
    question: "How is our proprietary customer data and business intelligence protected?",
    answer:
      "All data is encrypted in transit via TLS 1.3 and at rest via AES-256. Database instances operate with strict PostgreSQL Row-Level Security (RLS) policies. Crucially, your private operational data, customer inquiries, and commercial records are NEVER submitted to train public foundational LLMs.",
  },
  {
    category: "Human oversight",
    question: "What happens when an inquiry requires human judgment or sales closing?",
    answer:
      "Dodail systems are engineered for human-in-the-loop collaboration. High-stakes edge cases, complex pricing negotiations, or sensitive customer complaints are tagged with full context and instant routing alerts to your designated team members via Slack, WhatsApp, or CRM notifications.",
  },
  {
    category: "Commercial model",
    question: "What is your pricing structure for automation engineering?",
    answer:
      "We provide transparent, fixed-scope engineering packages for initial discovery and implementation, coupled with predictable monthly maintenance and SLA support agreements. We do not charge arbitrary transaction markups on your own API keys or software licenses.",
  },
];

export const stack = [
  "WhatsApp Cloud API",
  "Google Sheets",
  "Supabase PostgreSQL",
  "Next.js",
  "Shopify",
  "Razorpay & Stripe",
  "Meta Graph API",
  "Google Gemini",
];
