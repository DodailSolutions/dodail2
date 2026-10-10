/**
 * Default copy for the Contact, Consultation and Blog index pages.
 * Phone, email, WhatsApp and address come from "Company details".
 */

export const contactDefaults = {
  seo: {
    title: "Contact Dodail Solutions | AI Automation Experts, Hyderabad",
    description:
      "Talk to Dodail Solutions about AI automation, lead management, custom software or SEO. Reach us on WhatsApp, phone or email — we reply within 4 business hours.",
  },
  hero: {
    badge: "Direct Inquiries",
    title: "Let's Discuss Your Architecture",
    subtitle:
      "Reach out directly to Dodail Solutions. Whether you have an immediate automation bottleneck or a multi-month software build, we respond promptly.",
  },
  channels: {
    title: "Direct Channels",
    whatsappLabel: "WhatsApp Support",
    whatsappMessage: "Hello Dodail Solutions, I have an inquiry.",
    emailLabel: "Official Email",
    phoneLabel: "Direct Telephone",
  },
  office: { title: "Registered Headquarters", hoursLabel: "Operating Hours" },
  form: {
    nameLabel: "Your Name *",
    namePlaceholder: "e.g. Vikram Reddy",
    emailLabel: "Email Address *",
    emailPlaceholder: "vikram@enterprise.com",
    phoneLabel: "Phone / WhatsApp",
    phonePlaceholder: "+91 99664 00000",
    messageLabel: "Project Scope & Message *",
    messagePlaceholder: "Briefly describe your requirements or inquiry...",
    submitLabel: "Submit Inquiry",
    submittingLabel: "Sending...",
  },
  success: {
    title: "Message Dispatched",
    body: "Thank you, {name}. A technical representative will review your message and reach out within 4 business hours.",
    againLabel: "Send Another Message",
  },
};

export type ContactContent = typeof contactDefaults;

export const consultationDefaults = {
  seo: {
    title: "Book a Free AI & Architecture Consultation | Dodail Solutions",
    description:
      "Schedule a confidential call with a senior Dodail solutions architect. Get a clear technical blueprint for AI automation, lead management or custom software.",
  },
  hero: {
    badge: "Confidential Technical Consultation",
    title: "Schedule an AI & Architecture Feasibility Call",
    subtitle:
      "Speak with a senior solutions architect from Dodail Solutions. We assess your operational bottlenecks and present a clear technical blueprint.",
  },
  steps: {
    topic: "01 · Choose Consultation Objective",
    slot: "02 · Select Preferred Window",
    details: "03 · Your Organization Details",
  },
  topics: [
    "AI Automation Feasibility Audit",
    "Autonomous Lead Qualification Engine",
    "Custom Next.js Web Software Architecture",
    "Generative Engine Optimization (GEO) & Search",
    "Cross-Platform Workflow Integration (APIs/DB)",
  ],
  /** `time` is the 24-hour start time in IST (e.g. 15:00); the label is what visitors see. */
  slots: [
    { label: "10:00 AM - 10:45 AM IST", time: "10:00" },
    { label: "12:00 PM - 12:45 PM IST", time: "12:00" },
    { label: "03:00 PM - 03:45 PM IST", time: "15:00" },
    { label: "05:00 PM - 05:45 PM IST", time: "17:00" },
    { label: "07:30 PM - 08:15 PM IST (US / EU Friendly)", time: "19:30" },
  ],
  form: {
    nameLabel: "Full Name *",
    namePlaceholder: "e.g. Rahul Sharma",
    emailLabel: "Business Email *",
    emailPlaceholder: "rahul@company.com",
    phoneLabel: "Phone / WhatsApp Number *",
    phonePlaceholder: "+91 98765 43210",
    companyLabel: "Company Name & Website",
    companyPlaceholder: "Acme Healthcare / acme.com",
    notesLabel: "Primary Operational Challenge (Optional)",
    notesPlaceholder: "Tell us briefly about your current workflow, lead drop-off points, or software bottlenecks...",
    privacyNote: "NDA & Privacy Guarantee · Zero Spam",
    submitLabel: "Confirm Consultation Booking",
    submittingLabel: "Confirming Slot...",
  },
  success: {
    title: "Consultation Request Confirmed",
    body: "Thank you, {name}. Our engineering leadership has received your request for {topic} ({slot}).",
    nextStep: "You will receive a calendar invitation and meeting link shortly.",
    homeLabel: "Return to Homepage",
    whatsappLabel: "Notify Us on WhatsApp",
    whatsappMessage: "Hello Dodail, I have booked a consultation under {name}.",
  },
};

export type ConsultationContent = typeof consultationDefaults;

export const blogDefaults = {
  seo: {
    title: "AI Automation & SEO Insights | Dodail Solutions Blog",
    description:
      "Engineering insights, Generative Engine Optimization (GEO) guides, and automation architecture playbooks published by Dodail Solutions.",
  },
  hero: {
    badge: "Knowledge Hub",
    title: "Architectural Insights & Growth Strategies",
    subtitle:
      "Deep-dive guides on Generative Engine Optimization, autonomous workflows, and modern web software engineering.",
  },
  latestTitle: "Latest articles",
  readMoreLabel: "Read article",
  emptyText: "New articles are on the way. Meanwhile, explore our curated resources below.",
  resources: {
    title: "Curated resources",
    note: "Request any whitepaper and we'll send the full version to your inbox.",
    ctaLabel: "Request Full Whitepaper",
    items: [
      {
        title: "10 Must-Have Tools for Generative Engine Optimization (GEO)",
        category: "AI & Search",
        date: "August 2025",
        readTime: "6 min read",
        excerpt: "How forward-thinking brands analyze AI crawler citations, monitor Perplexity/ChatGPT visibility, and optimize entity coverage.",
      },
      {
        title: "The Complete GEO Workflow for AI-Powered Content Strategies",
        category: "Search Strategy",
        date: "August 2025",
        readTime: "8 min read",
        excerpt: "A step-by-step technical framework for structuring semantic content clusters that search bots and LLMs reliably extract.",
      },
      {
        title: "Schema Markup for GEO: Real Examples & Implementation Guide",
        category: "Technical SEO",
        date: "August 2025",
        readTime: "7 min read",
        excerpt: "Why standard JSON-LD is no longer enough and how nested Organization, Service, and FAQ schemas drive AI visibility.",
      },
      {
        title: "AI Digital Transformation Strategy: 7 Ways to Accelerate ROI",
        category: "Business Growth",
        date: "August 2025",
        readTime: "10 min read",
        excerpt: "Pragmatic guide for enterprise leaders seeking measurable cost reductions and lead velocity through custom AI workflows.",
      },
      {
        title: "How to Build High-Yield Content Clusters for Generative Search",
        category: "Search Strategy",
        date: "August 2025",
        readTime: "5 min read",
        excerpt: "Structuring topic clusters and internal link architecture to cement domain authority across modern search engines.",
      },
      {
        title: "Local SEO & WhatsApp Integration for High-Volume Clinics",
        category: "Healthcare",
        date: "July 2025",
        readTime: "6 min read",
        excerpt: "Case-backed playbooks for dental and medical clinics looking to eliminate empty appointment slots.",
      },
    ],
  },
  article: {
    backLabel: "All articles",
    ctaTitle: "Want this implemented for your business?",
    ctaBody: "Book a free consultation and we'll map out the exact workflow for your team.",
    ctaButton: { label: "Book a Consultation", href: "/consultation" },
  },
};

export type BlogContent = typeof blogDefaults;
