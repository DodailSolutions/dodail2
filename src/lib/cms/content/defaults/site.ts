/** Site-wide content: SEO defaults, company facts, header navigation and footer. */

export const seoDefaults = {
  siteUrl: "https://www.dodail.com",
  siteName: "Dodail Solutions",
  defaultTitle: "Dodail Solutions | AI Automation & Business Growth Platform",
  titleSuffix: "Dodail Solutions",
  description:
    "Dodail Solutions is an AI automation and business growth partner. We build autonomous workflows, AI lead management, custom web software, and digital growth systems for modern businesses.",
  keywords: [
    "AI Automation",
    "Business Growth",
    "Workflow Automation",
    "AI Lead Management",
    "AI Customer Support",
    "Custom Web Applications",
    "Next.js Development",
    "Dodail Solutions",
    "Hyderabad Digital Agency",
  ],
  shareImage: "",
  twitterHandle: "@dodailpvtltd",
  locale: "en_IN",
  verification: { google: "", bing: "", yandex: "" },
  /** Shown in the installed app (home-screen) and the browser UI on phones. */
  app: { name: "Dodail Solutions", shortName: "Dodail", themeColor: "#0A1B2A", backgroundColor: "#071A28" },
};

export type SeoContent = typeof seoDefaults;

export const companyDefaults = {
  name: "Dodail Solutions Private Limited",
  shortName: "Dodail Solutions",
  founded: "June 2019",
  city: "Hyderabad",
  region: "Telangana",
  country: "India",
  postalCode: "500081",
  phone: "+91 99664 00235",
  whatsapp: "+91 99664 00235",
  email: "info@dodail.com",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM IST",
  founder: "Raviteja Mathurthi",
  social: {
    linkedin: "https://www.linkedin.com/company/dodail/",
    x: "https://x.com/dodailpvtltd",
    facebook: "https://www.facebook.com/DodailSolutionPvtLtd/",
    instagram: "https://www.instagram.com/dodail/",
    youtube: "https://www.youtube.com/@dodail",
  },
};

export type CompanyContent = typeof companyDefaults;

const menuItem = (title: string, description: string, href: string, icon: string) => ({ title, description, href, icon });

export const navigationDefaults = {
  announcement: {
    enabled: false,
    text: "Dodail 2.0 AI Automation Architecture is now live.",
    link: "/solutions/ai-automation",
    linkLabel: "Learn more →",
  },
  brand: { name: "Dodail", tagline: "Solutions Pvt Ltd" },
  solutionsMenu: {
    label: "Solutions",
    mobileHeading: "AI Solutions",
    items: [
      menuItem("AI Automation Platform", "End-to-end autonomous business workflows & agents", "/solutions/ai-automation", "Bot"),
      menuItem("AI Lead Management", "Instant qualification, enrichment & CRM synchronization", "/solutions/ai-lead-management", "Users"),
      menuItem("AI Customer Support", "24/7 intelligent ticketing, resolution & escalation", "/solutions/ai-customer-support", "Headphones"),
      menuItem("Workflow Automation", "API connectors, Zapier replacements & custom DAG pipelines", "/solutions/workflow-automation", "Cpu"),
    ],
  },
  servicesMenu: {
    label: "Services",
    mobileHeading: "Core Services",
    items: [
      menuItem("Web & Software Engineering", "High-performance Next.js apps, portals & APIs", "/services/web-development", "Code2"),
      menuItem("Digital Growth & GEO / SEO", "Generative Engine Optimization & technical organic search", "/services/digital-growth-seo", "TrendingUp"),
    ],
  },
  industriesMenu: {
    mobileHeading: "Key Industries",
    items: [
      { title: "Healthcare & Dental Clinics", href: "/industries/dental" },
      { title: "Real Estate & Developers", href: "/industries/real-estate" },
      { title: "E-Commerce & Retail Brands", href: "/industries/ecommerce" },
    ],
  },
  /** Plain links after the dropdowns. "Mobile label" is used in the phone menu. */
  links: [
    { label: "Industries", mobileLabel: "", href: "/industries" },
    { label: "Work & Results", mobileLabel: "Work & Case Studies", href: "/work" },
    { label: "Resources", mobileLabel: "Resources & Blog", href: "/blog" },
    { label: "About", mobileLabel: "About Dodail", href: "/about" },
    { label: "Contact", mobileLabel: "Contact & Support", href: "/contact" },
  ],
  cta: { label: "Book a Consultation", href: "/consultation" },
  /** Phone & tablet bottom tab bar. The centre button is the header call to action above. */
  mobileBar: {
    enabled: true,
    tabs: [
      { label: "Home", href: "/", icon: "Home" },
      { label: "Solutions", href: "/solutions/ai-automation", icon: "Bot" },
      { label: "Work", href: "/work", icon: "Briefcase" },
      { label: "Contact", href: "/contact", icon: "MessageSquare" },
    ],
    ctaShortLabel: "Book",
  },
};

export type NavigationContent = typeof navigationDefaults;

const link = (label: string, href: string) => ({ label, href, highlight: false });

export const footerDefaults = {
  brandSubline: "Private Limited · Est. 2019",
  about:
    "Empowering ambitious businesses across India and international markets with autonomous AI agents, intelligent lead management, and bespoke software systems.",
  locationLine: "Hyderabad, Telangana, India",
  columns: [
    {
      title: "AI Solutions",
      links: [
        link("AI Automation Platform", "/solutions/ai-automation"),
        link("AI Lead Management", "/solutions/ai-lead-management"),
        link("AI Customer Support", "/solutions/ai-customer-support"),
        link("Workflow Automation", "/solutions/workflow-automation"),
        { label: "Book AI Feasibility Call", href: "/consultation", highlight: true },
      ],
    },
    {
      title: "Engineering & Growth",
      links: [
        link("Web & Software Engineering", "/services/web-development"),
        link("Digital Growth & GEO / SEO", "/services/digital-growth-seo"),
        link("Healthcare & Dental Clinics", "/industries/dental"),
        link("Real Estate & Developers", "/industries/real-estate"),
        link("E-Commerce & DTC Brands", "/industries/ecommerce"),
      ],
    },
    {
      title: "Company & Legal",
      links: [
        link("About Dodail", "/about"),
        link("Verified Case Studies", "/work"),
        link("Resource Library & Articles", "/blog"),
        link("Contact Us", "/contact"),
        link("Privacy Policy", "/privacy"),
        link("Terms of Service", "/terms"),
      ],
    },
  ],
  /** {year} is replaced with the current year. */
  copyright: "© {year} Dodail Solutions Private Limited. All rights reserved. Registered in India.",
  trustLine: "Strict data privacy · Zero fabricated claims · ISO / GDPR-aligned architecture",
};

export type FooterContent = typeof footerDefaults;
