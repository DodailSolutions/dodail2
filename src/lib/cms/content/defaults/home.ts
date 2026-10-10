/**
 * Homepage default copy. List content comes from homeData.ts; this adds the
 * headings, intros and buttons that were previously written inline in JSX.
 */
import {
  aboutFigures, faqs, industries, pipelineStages, problems, processStages, services, specialisms, stack, trust,
} from "@/components/home/homeData";
import type { FieldHint } from "../types";

const clone = <T,>(v: T) => structuredClone(v) as T;

export const homeDefaults = {
  seo: {
    title: "AI Automation & Software Development in Hyderabad | Dodail",
    description:
      "Dodail connects your business tools and automates repetitive work: AI automation, custom software, websites, e-commerce, SEO and branding. Hyderabad, India.",
  },
  hero: {
    eyebrow: "AI automation & software development company in Hyderabad",
    title: "Turn repetitive operations into autonomous growth.",
    highlight: "autonomous growth.",
    tagline: "AI automation · Software · Web & e-commerce · Marketing · Brand",
    description:
      "Leads, messages, CRM, payments and reports usually live in separate tools. Dodail connects them, automates the work in between, and builds the software, websites and brand around it.",
    primaryCta: { label: "Book a Consultation", href: "/consultation" },
    secondaryCta: { label: "Explore Solutions", href: "/solutions/ai-automation" },
  },
  intro: {
    badge: "About Dodail · Brand Philosophy",
    title: "Design-oriented development.",
    highlight: "AI-led growth.",
    lead:
      "At Dodail, we blend creative design, robust development and smart automation to build digital systems that are fast, beautiful and engineered for sustainable business growth.",
    paragraphs: [
      "Dodail Solutions Private Limited is an engineering-first digital studio headquartered in Hyderabad, India. We partner with ambitious startups and enterprises to connect disjointed systems—orchestrating WhatsApp, CRMs, spreadsheets, payment gateways, and e-commerce stores into seamless autonomous engines.",
      "Every line of code and every interface is purpose-driven: clean architecture, deterministic guardrails, and measurable commercial outcomes working in harmony. Learn more [about our team](/about), explore verified case studies in [Work & Results](/work), or read our architectural research in [articles and guides](/blog).",
    ],
    pillars: [
      { title: "Creative design", desc: "Brands, design systems, and product interfaces crafted for clarity and conversion across every viewport.", tag: "UI/UX & Brand Systems" },
      { title: "Robust development", desc: "Sub-second Next.js applications, PostgreSQL data layers, and clean serverless architectures built to scale.", tag: "Full-Stack Engineering" },
      { title: "Smart automation", desc: "Reliable AI pipelines connecting WhatsApp, CRMs, and payment gateways to remove repetitive manual friction.", tag: "Autonomous Workflows" },
    ],
    image: {
      src: "/brand/dodail-buddha-radiance.jpg",
      alt: "Meditative Buddha sculpture in luminous golden and celestial cyan particles at Dodail Solutions Hyderabad reception",
      badge: "HYDERABAD HQ · EMBLEM",
      quote: "Calm and mindful clarity on the surface; deep autonomous discipline and speed underneath.",
      caption: "Reception Sculpture · Hyderabad, Telangana",
    },
    figures: clone(aboutFigures),
    specialisms: {
      eyebrow: "Core Competencies",
      title: "We specialise in",
      linkLabel: "Explore All Capabilities",
      linkHref: "/consultation",
      items: specialisms.map((s) => ({ ...s })),
    },
  },
  problem: {
    stackLabel: "Built to work with the tools you already use",
    stack: [...stack],
    eyebrow: "The problem",
    title: "Where growing companies quietly lose time and revenue",
    description:
      "When software runs in silos, customer context disappears, leads go cold and good people spend their day moving information from one place to another.",
    fixLabel: "What Dodail does:",
    items: clone(problems),
  },
  services: {
    eyebrow: "Services",
    title: "AI automation, software, web, marketing and brand under one roof",
    description:
      "Five services that work best together. Each one is scoped, built and supported by the same team, so your automations, website and marketing share the same data.",
    learnMoreLabel: "Learn more about {service}",
    items: clone(services),
  },
  pipeline: {
    eyebrow: "How automation works",
    title: "How a business automation turns an enquiry into an outcome",
    badge: "Illustrative example · not live data",
    items: clone(pipelineStages),
    primaryCta: { label: "Book a Consultation", href: "/consultation" },
    secondaryCta: { label: "Explore workflow automation", href: "/solutions/workflow-automation" },
  },
  industries: {
    eyebrow: "Industries",
    title: "Automation for healthcare, real estate, manufacturing and e-commerce",
    description:
      "Every sector runs the same four steps: something comes in, it is checked, an action follows, and an outcome is recorded. What changes is the detail, and that is where most of the value is.",
    workflowLabel: "The workflow",
    changesLabel: "What it changes",
    linkLabel: "Automation for {industry} in detail",
    items: clone(industries),
  },
  process: {
    eyebrow: "How we deliver",
    title: "A clear path from first call to launch",
    description: "Five stages, each with a defined output, so you always know what is being built and what comes next.",
    items: clone(processStages),
  },
  trust: {
    eyebrow: "Why Dodail",
    title: "Why growing businesses choose Dodail",
    description:
      "Six commitments behind every automation, application and website we deliver, from the first call to long after launch.",
    items: trust.map((t) => ({ icon: t.icon, featured: "featured" in t ? t.featured : false, title: t.title, desc: t.desc })),
    links: [
      { label: "More about our team", href: "/about" },
      { label: "See our work", href: "/work" },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Frequently asked questions about Dodail",
    items: clone(faqs),
  },
  cta: {
    eyebrow: "Next step",
    title: "Ready to connect your operations?",
    description:
      "Book a consultation with a Dodail engineer. We will look at where manual work is slowing you down, tell you honestly what can be automated, and outline how we would build it.",
    primaryCta: { label: "Book a Consultation", href: "/consultation" },
    secondaryCta: { label: "Send a message", href: "/contact" },
  },
};

export type HomeContent = typeof homeDefaults;

/**
 * The homepage's 3D scene is choreographed per list position (3 problems,
 * 5 services, 4 pipeline stages, 4 industries x 4 steps, 5 process stages,
 * 6 commitments), so those lists are text-editable but fixed in length.
 */
const locked: FieldHint = { fixedLength: true, help: "Linked to the homepage 3D scene: edit the text, but items can't be added, removed or reordered." };
const internal: FieldHint = { hidden: true };

export const homeHints: Record<string, FieldHint> = {
  "intro.pillars": locked,
  "intro.figures": { help: "Shown as a 2-column grid; an even number of figures looks best." },
  "intro.specialisms.items.*.icon": { kind: "select", options: ["automation", "web", "commerce", "marketing", "apps"] },
  "intro.image.src": { kind: "image" },
  "problem.items": locked,
  "problem.items.*.num": internal,
  "services.items": locked,
  "services.items.*.id": internal,
  "services.items.*.accent": internal,
  "services.items.*.shape": { label: "3D caption", help: "Short caption under the 3D visual." },
  "services.learnMoreLabel": { help: "{service} is replaced with the service title." },
  "pipeline.items": locked,
  "pipeline.items.*.code": internal,
  "industries.items": locked,
  "industries.items.*.key": internal,
  "industries.items.*.accent": internal,
  "industries.items.*.steps": locked,
  "industries.linkLabel": { help: "{industry} is replaced with the industry label (lower case)." },
  "process.items": locked,
  "process.items.*.num": internal,
  "trust.items": locked,
  "trust.items.*.icon": internal,
  "trust.items.*.featured": internal,
};
