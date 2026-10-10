import { LandingContent, noIntegrations, noLink } from "./landing";

const consult = "/consultation";

export const industryPages = {
  "industries/dental": {
    layout: "industry",
    seo: {
      title: "Dental & Healthcare Clinic Automation | Dodail Solutions",
      description:
        "Automate dental clinic appointment booking, emergency patient triage via WhatsApp, automated reminders to eliminate no-shows, and local Google Maps SEO.",
    },
    hero: {
      badge: "Healthcare Automation",
      badgeTone: "teal",
      title: "Eliminate Empty Chairs & Automate Patient Appointments",
      highlight: "",
      subtitle:
        "We help dental and medical clinics capture emergency patients 24/7, triage treatment urgency, and automate WhatsApp scheduling directly into doctor calendars.",
      primaryCta: { label: "Book Clinic Automation Audit", href: consult },
      secondaryCta: noLink,
    },
    features: {
      badge: "Clinic Workflows",
      title: "The Complete Clinic Growth Engine",
      description: "Designed to ease front-desk overload and guarantee patients receive immediate answers.",
      items: [
        { icon: "Clock", tone: "orange", title: "24/7 Emergency Triage", description: "When a patient messages at 10 PM with acute tooth pain, our conversational AI classifies symptoms, checks doctor emergency slots, and books an instant morning appointment." },
        { icon: "MessageSquare", tone: "emerald", title: "WhatsApp Attendance Reminders", description: "Automated 24h and 2h WhatsApp reminders with interactive \"Confirm\" and \"Reschedule\" buttons reduce expensive no-shows by up to 70%." },
        { icon: "MapPin", tone: "teal", title: "Local Google Maps Dominance", description: "Rank in the top 3 on Google Maps for \"dentist near me\" and specific high-value treatments (implants, invisalign, root canals) with structured local schema." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Ready to Fill Your Clinic Calendar?",
      description:
        "We configure the entire system end-to-end: WhatsApp Cloud API verified phone numbers, doctor appointment slots, and automated reminder sequences.",
      button: { label: "Schedule a Clinic Consultation", href: consult },
    },
  },

  "industries/ecommerce": {
    layout: "industry",
    seo: {
      title: "E-Commerce & DTC Brand Automation | Dodail Solutions",
      description:
        "Scale DTC e-commerce operations. Sub-second Next.js storefronts, automated shipping & order tracking inquiries, and WhatsApp abandoned cart recovery.",
    },
    hero: {
      badge: "E-Commerce Architecture",
      badgeTone: "orange",
      title: "High-Velocity Storefronts & Autonomous Support",
      highlight: "",
      subtitle:
        "We engineer high-performance headless Next.js e-commerce storefronts and automate repetitive post-purchase tickets so your team focuses on product and brand.",
      primaryCta: { label: "Book E-Commerce Strategy Session", href: consult },
      secondaryCta: noLink,
    },
    features: {
      badge: "DTC Capabilities",
      title: "Engineered for Scalable Online Retail",
      description: "Transforming browse-to-buy speed and customer happiness.",
      items: [
        { icon: "Zap", tone: "orange", title: "Sub-500ms Headless Storefronts", description: "Custom Next.js frontends connected to Shopify, WooCommerce, or Supabase backends. Instant mobile catalog browsing without template bloat." },
        { icon: "MessageSquare", tone: "emerald", title: "Automated Order Status (WISMO)", description: "Customers query order status directly via website chat or WhatsApp and receive real-time courier tracking in seconds without human agent intervention." },
        { icon: "RotateCcw", tone: "teal", title: "Self-Service Return & Exchange", description: "Automate return authorization, label generation, and reverse-pickup coordination while strictly adhering to your store return policies." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Scale Your Store Without Scaling Support Payroll",
      description:
        "Reduce tier-1 support tickets by over 60% while increasing buyer repeat purchases with conversational post-purchase updates.",
      button: { label: "Schedule a Store Architecture Review", href: consult },
    },
  },

  "industries/manufacturing": {
    layout: "industry",
    seo: {
      title: "Manufacturing & Industrial Automation | Dodail Solutions",
      description:
        "Automate supply chain dispatches, vendor quotation comparisons, machine maintenance logs, and production status updates with Dodail Solutions.",
    },
    hero: {
      badge: "Industrial Automation",
      badgeTone: "orange",
      title: "Precision Workflows for Modern Manufacturing & Supply Chains",
      highlight: "",
      subtitle:
        "We help manufacturing plants, fabrication units, and distributors eliminate manual paperwork, synchronize warehouse inventory, and deliver real-time dispatch alerts to buyers.",
      primaryCta: { label: "Book Industrial Automation Audit", href: consult },
      secondaryCta: noLink,
    },
    features: {
      badge: "Factory Workflows",
      title: "Engineered for Zero Operational Downtime",
      description: "Connecting shop-floor production logs, vendor purchase orders, and warehouse logistics.",
      items: [
        { icon: "Factory", tone: "orange", title: "PO & Vendor Quotation Triage", description: "Parse raw vendor quotation PDFs and WhatsApp rate sheets automatically. Compare unit costs against past purchase orders and flag discrepancies before manager sign-off." },
        { icon: "Cpu", tone: "teal", title: "Dispatch & Logistics Notifications", description: "When a consignment leaves the factory dock, automatically dispatch LR copies, weighment slips, and real-time tracking links to clients via WhatsApp and email." },
        { icon: "Layers", tone: "amber", title: "Preventive Maintenance Logs", description: "Replace paper checklists with mobile QR audits. Machine operating hours trigger automated maintenance tickets and spare-parts replenishment requests in PostgreSQL." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Ready to Modernize Your Production Operations?",
      description: "Schedule a 30-minute operational assessment with our engineering team to map your factory bottlenecks.",
      button: { label: "Schedule Factory Operations Review", href: consult },
    },
  },

  "industries/real-estate": {
    layout: "industry",
    seo: {
      title: "Real Estate Lead Qualification & Automation | Dodail Solutions",
      description:
        "Accelerate property sales. Instant buyer qualification, WhatsApp brochure delivery, and automated site visit scheduling for real estate developers and agencies.",
    },
    hero: {
      badge: "Real Estate Automation",
      badgeTone: "orange",
      title: "Qualify High-Intent Buyers in 60 Seconds, Not 6 Hours",
      highlight: "",
      subtitle:
        "Filter out window shoppers and connect your sales advisors exclusively with qualified buyers whose budgets and timelines match your inventory.",
      primaryCta: { label: "Book Real Estate Blueprint Call", href: consult },
      secondaryCta: noLink,
    },
    features: {
      badge: "Real Estate Workflows",
      title: "Engineered for Fast Property Conversions",
      description: "Every lead from Facebook ads, portals, or Google Search handled immediately with precision.",
      items: [
        { icon: "Filter", tone: "orange", title: "Autonomous Budget & BHK Triage", description: "Instantly prompts buyers for their budget range, BHK preference, and possession timeline. Flags qualified enterprise and luxury buyers for immediate senior agent callback." },
        { icon: "FileText", tone: "teal", title: "Instant WhatsApp Brochure Delivery", description: "Sends verified project floor plans, walk-through videos, and cost breakdowns directly via WhatsApp while buyer interest is peak." },
        { icon: "Calendar", tone: "emerald", title: "Automated Site Visit Booking", description: "Enables buyers to choose weekend site-visit slots, provides automated Google Maps directions, and notifies the project sales coordinator." },
      ],
    },
    integrations: noIntegrations,
    cta: {
      title: "Protect Your Sales Team From Burnout",
      description:
        "Equip your property development team with automated buyer triage. Never lose a high-net-worth prospect to slow follow-up again.",
      button: { label: "Schedule a Real Estate Demo", href: consult },
    },
  },
} satisfies Record<string, LandingContent>;
