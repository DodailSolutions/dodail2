import type { RouteEntry } from "./types";

type ServiceInput = Omit<RouteEntry, "sitemap" | "built"> & { built?: boolean };

const WD = "/services/website-development/";
const EC = "/services/ecommerce-development/";
const DM = "/services/digital-marketing/";
const SEO = "/services/seo/";

const service = (r: ServiceInput): RouteEntry => ({ built: false, ...r, sitemap: "services" });

/** Services hub, 4 pillars, their sub-services and the AI & growth services (brief §4.2, §5.3). */
export const serviceRoutes: RouteEntry[] = [
  service({
    path: "/services/",
    name: "Services",
    title: "Digital Marketing & Web Development Services | Dodail",
    description:
      "Websites, e-commerce, SEO, digital marketing and AI automation — planned together so every channel feeds the next. Explore Dodail's services in full.",
    h1: "Digital Services That Work Together",
    keywords: { primary: "digital marketing services", secondary: ["web development services India"] },
    built: true,
  }),

  // ── Website development ─────────────────────────────────────────────
  service({
    path: WD,
    name: "Website Development",
    title: "Website Development Company in Hyderabad | Dodail",
    description:
      "Custom websites on WordPress, Next.js and Laravel — mobile-first, SEO-ready and built to convert. Plans for startups, growing businesses and enterprises.",
    h1: "Website Development Services Built for Speed, SEO and Sales",
    keywords: { primary: "website development company Hyderabad", secondary: ["custom website development India", "web design company"] },
    parent: "/services/",
    built: true,
  }),
  service({
    path: `${WD}wordpress/`,
    name: "WordPress Development",
    title: "WordPress Website Development Company | Dodail",
    description:
      "Fast, secure WordPress websites with clean builds, Core Web Vitals tuning, Rank Math SEO and easy editing for your team. See plans and recent work.",
    h1: "WordPress Website Design & Development",
    keywords: { primary: "WordPress development company", secondary: ["WordPress website design Hyderabad", "Elementor developer"] },
    parent: WD,
  }),
  service({
    path: `${WD}custom-web-apps/`,
    name: "Custom Web Apps",
    title: "Custom Web Application Development | Dodail",
    description:
      "Dashboards, portals, CRMs and SaaS platforms built with React, Next.js, Node and Laravel — role-based access, payments, automation and APIs included.",
    h1: "Custom Web Application Development",
    keywords: { primary: "custom web application development", secondary: ["web app development company India"] },
    parent: WD,
  }),
  service({
    path: `${WD}startup-websites/`,
    name: "Startup Websites",
    title: "Website Design for Startups – Launch in 5–10 Days",
    description:
      "MVP landing pages and startup websites delivered in 5–10 days. Mobile-first and SEO-ready, with WhatsApp, Calendly and payment integrations built in.",
    h1: "Startup Websites That Launch Fast and Look Investor-Ready",
    keywords: { primary: "website design for startups", secondary: ["startup landing page design"] },
    parent: WD,
  }),
  service({
    path: `${WD}business-websites/`,
    name: "Business Websites",
    title: "Business & Corporate Website Design | Dodail",
    description:
      "Professional websites for SMEs, firms and corporates — clear service pages, lead forms, WhatsApp, case studies and SEO set up from the very first day.",
    h1: "Business Websites That Build Trust and Bring In Leads",
    keywords: { primary: "business website development", secondary: ["corporate website design company"] },
    parent: WD,
  }),
  service({
    path: `${WD}real-estate-websites/`,
    name: "Real Estate Websites",
    title: "Real Estate Website Development Company | Dodail",
    description:
      "Property websites with filters, floor plans, virtual tours, brochure downloads, WhatsApp and CRM lead capture — built for builders, developers and agents.",
    h1: "Real Estate Website Development",
    keywords: { primary: "real estate website development", secondary: ["property listing website design"] },
    parent: WD,
  }),

  // ── E-commerce ──────────────────────────────────────────────────────
  service({
    path: EC,
    name: "E-commerce Development",
    title: "E-commerce Website Development Company | Dodail",
    description:
      "Shopify, WooCommerce, Magento and custom stores with Razorpay, shipping, cart recovery and SEO built in — from your first product to D2C scale.",
    h1: "E-commerce Website Development That Turns Browsers Into Buyers",
    keywords: { primary: "ecommerce website development company", secondary: ["online store development India"] },
    parent: "/services/",
  }),
  service({
    path: `${EC}shopify/`,
    name: "Shopify Development",
    title: "Shopify Store Development & Setup Experts | Dodail",
    description:
      "Shopify stores set up right — theme customisation, product uploads, Razorpay or Stripe, shipping zones, apps, speed and SEO. Built for D2C brands.",
    h1: "Shopify Store Development",
    keywords: { primary: "Shopify development company India", secondary: ["Shopify store setup"] },
    parent: EC,
  }),
  service({
    path: `${EC}woocommerce/`,
    name: "WooCommerce Development",
    title: "WooCommerce Development Services | Dodail",
    description:
      "WooCommerce stores on WordPress with GST invoicing, Razorpay, filters, product schema and Rank Math SEO. Training video and 30-day support included.",
    h1: "WooCommerce Development Services",
    keywords: { primary: "WooCommerce development company", secondary: ["WooCommerce website India"] },
    parent: EC,
  }),
  service({
    path: `${EC}magento/`,
    name: "Magento Development",
    title: "Magento Website Development Services | Dodail",
    description:
      "Magento (Adobe Commerce) stores for large catalogues, multi-store and international selling — with ERP and POS integrations, performance work and SEO.",
    h1: "Magento Development for Large Catalogues",
    keywords: { primary: "Magento development company", secondary: ["Adobe Commerce development India"] },
    parent: EC,
  }),
  service({
    path: `${EC}custom-ecommerce/`,
    name: "Custom E-commerce",
    title: "Custom E-commerce & Marketplace Development | Dodail",
    description:
      "Subscription stores, B2B ordering portals and multi-vendor marketplaces on Next.js, Node or Laravel — with commission engines and admin dashboards.",
    h1: "Custom E-commerce Platforms and Marketplaces",
    keywords: { primary: "custom ecommerce development", secondary: ["multi-vendor marketplace development India"] },
    parent: EC,
  }),

  // ── Digital marketing ───────────────────────────────────────────────
  service({
    path: DM,
    name: "Digital Marketing",
    title: "Digital Marketing Services in Hyderabad | Dodail",
    description:
      "SEO, Google Ads, social media, reels and WhatsApp marketing run as one plan, with dashboards you can actually read. Plans from local to national reach.",
    h1: "Digital Marketing That Shows Up in Your Numbers",
    keywords: { primary: "digital marketing services Hyderabad", secondary: ["digital marketing agency India"] },
    parent: "/services/",
  }),
  service({
    path: `${DM}google-ads/`,
    name: "Google Ads",
    title: "Google Ads Management Services (PPC) | Dodail",
    description:
      "Search, Performance Max, Shopping, Display and YouTube campaigns with conversion tracking, landing page reviews and monthly ROI reporting you can trust.",
    h1: "Google Ads Management That Pays for Itself",
    keywords: { primary: "Google Ads management services", secondary: ["PPC agency Hyderabad"] },
    parent: DM,
  }),
  service({
    path: `${DM}social-media-marketing/`,
    name: "Social Media Marketing",
    title: "Social Media Marketing Services | Dodail",
    description:
      "Content calendars, posts, reels and ads for Instagram, Facebook and LinkedIn — planned around your sales goals and reported to you every single month.",
    h1: "Social Media Marketing for Brands That Want Leads, Not Just Likes",
    keywords: { primary: "social media marketing agency Hyderabad", secondary: ["social media management services"] },
    parent: DM,
  }),
  service({
    path: `${DM}email-whatsapp-marketing/`,
    name: "Email & WhatsApp Marketing",
    title: "WhatsApp & Email Marketing Services | Dodail",
    description:
      "WhatsApp Cloud API broadcasts, catalogue flows, drip campaigns and email newsletters that bring customers back — set up, written and run for you.",
    h1: "Email & WhatsApp Marketing Automation",
    keywords: { primary: "WhatsApp marketing services", secondary: ["WhatsApp Business API India", "email marketing agency"] },
    parent: DM,
  }),
  service({
    path: `${DM}reels-video-marketing/`,
    name: "Reels & Video Marketing",
    title: "Instagram Reels & Short Video Marketing | Dodail",
    description:
      "Scripted, shot and edited reels and YouTube Shorts with hooks, captions and trending formats — built to reach the right people and drive enquiries.",
    h1: "Reels & Short Video Marketing",
    keywords: { primary: "Instagram reels marketing", secondary: ["short video marketing agency"] },
    parent: DM,
  }),
  service({
    path: `${DM}google-business-profile/`,
    name: "Google Business Profile",
    title: "Google Business Profile Optimisation | Dodail",
    description:
      "Rank in Google Maps and 'near me' searches. Profile setup, categories, geotagged photos, posts, review strategy and monthly calls and directions reports.",
    h1: "Google Business Profile Optimisation",
    keywords: { primary: "Google My Business optimization", secondary: ["Google Business Profile management Hyderabad"] },
    parent: DM,
  }),

  // ── SEO ─────────────────────────────────────────────────────────────
  service({
    path: SEO,
    name: "SEO",
    title: "SEO Services in Hyderabad | Dodail",
    description:
      "White-hat SEO for local businesses, WordPress sites and online stores — technical fixes, content, links and AI-search (GEO) readiness, reported monthly.",
    h1: "SEO Services That Bring Customers, Not Just Traffic",
    keywords: { primary: "SEO services Hyderabad", secondary: ["SEO company India", "SEO agency"] },
    parent: "/services/",
    built: true,
  }),
  service({
    path: `${SEO}local-seo/`,
    name: "Local SEO",
    title: "Local SEO Services for Small Businesses | Dodail",
    description:
      "Get found by nearby customers. Google Business Profile, local citations, review systems and location pages for clinics, restaurants, stores and services.",
    h1: "Local SEO for “Near Me” Searches",
    keywords: { primary: "local SEO services", secondary: ["local SEO Hyderabad"] },
    parent: SEO,
  }),
  service({
    path: `${SEO}technical-seo/`,
    name: "Technical SEO",
    title: "Technical SEO Audit & Optimisation | Dodail",
    description:
      "Crawl, index and speed problems fixed — Core Web Vitals, redirects, canonicals, schema, sitemaps and hreflang on WordPress, Shopify and custom sites.",
    h1: "Technical SEO Audits and Fixes",
    keywords: { primary: "technical SEO audit", secondary: ["Core Web Vitals optimization"] },
    parent: SEO,
  }),
  service({
    path: `${SEO}on-page-seo/`,
    name: "On-Page SEO",
    title: "On-Page SEO Services | Dodail",
    description:
      "Keyword mapping, titles, headings, internal links, schema and content updates that make every page on your site clearer to Google and to your buyers.",
    h1: "On-Page SEO Optimisation",
    keywords: { primary: "on-page SEO services", secondary: ["on-page optimization"] },
    parent: SEO,
  }),
  service({
    path: `${SEO}link-building/`,
    name: "Link Building",
    title: "Link Building & Off-Page SEO Services | Dodail",
    description:
      "Niche-relevant backlinks through manual outreach, digital PR and citations — no PBNs, no link farms. Monitored in Ahrefs and reported every month.",
    h1: "White-Hat Link Building",
    keywords: { primary: "link building services India", secondary: ["off-page SEO services"] },
    parent: SEO,
  }),
  service({
    path: `${SEO}multilingual-seo/`,
    name: "Multilingual SEO",
    title: "Multilingual SEO Services (Telugu, Hindi & More) | Dodail",
    description:
      "Rank in the language your customers search in. Hreflang, localised keywords, native-language content and regional Google Business Profiles that convert.",
    h1: "Multilingual SEO in Telugu, Hindi, English and Beyond",
    keywords: { primary: "multilingual SEO services", secondary: ["Telugu SEO", "Hindi SEO"] },
    parent: SEO,
  }),
  service({
    path: `${SEO}wordpress-seo/`,
    name: "WordPress SEO",
    title: "WordPress SEO Services for Blogs & Business Sites",
    description:
      "Rank Math or Yoast setup, speed fixes, schema, internal linking and content audits for WordPress and WooCommerce sites — on any theme or page builder.",
    h1: "WordPress SEO Services",
    keywords: { primary: "WordPress SEO services", secondary: ["WordPress SEO expert"] },
    parent: SEO,
  }),
  service({
    path: `${SEO}ecommerce-seo/`,
    name: "E-commerce SEO",
    title: "Shopify & WooCommerce SEO Services | Dodail",
    description:
      "Product and collection SEO, product schema, faceted navigation fixes, Google Shopping feeds and speed work that turns organic traffic into real orders.",
    h1: "E-commerce SEO for Shopify and WooCommerce",
    keywords: { primary: "ecommerce SEO services", secondary: ["Shopify SEO", "WooCommerce SEO"] },
    parent: SEO,
  }),
  service({
    path: `${SEO}generative-engine-optimization/`,
    name: "Generative Engine Optimization",
    title: "Generative Engine Optimization (GEO) Services | Dodail",
    description:
      "Make your brand the answer AI search gives. Entity setup, schema, citation-worthy content and AI-visibility tracking in ChatGPT, Gemini and Perplexity.",
    h1: "Generative Engine Optimization (GEO): Get Cited by ChatGPT, Gemini and Google AI",
    keywords: {
      primary: "generative engine optimization services",
      secondary: ["GEO agency", "AI search optimization", "AI Overviews optimization"],
    },
    parent: SEO,
  }),

  // ── AI & growth ─────────────────────────────────────────────────────
  service({
    path: "/services/ai-automation/",
    name: "AI Automation",
    title: "AI Automation & WhatsApp Chatbots | Dodail",
    description:
      "WhatsApp and website AI assistants, n8n workflows and CRM automation that answer enquiries, book appointments and follow up with every lead 24/7.",
    h1: "AI Automation for Leads, Bookings and Follow-Ups",
    keywords: { primary: "AI automation agency India", secondary: ["WhatsApp chatbot development", "n8n automation"] },
    parent: "/services/",
    built: true,
  }),
  service({
    path: "/services/ai-content-automation/",
    name: "AI Content & Ad Automation",
    title: "AI Content & Ad Automation Services | Dodail",
    description:
      "A repeatable system for daily content, ad creatives and AI avatar videos — planned, produced, approved and published on schedule. Monthly plans.",
    h1: "AI Content & Ad Automation",
    keywords: { primary: "AI content automation", secondary: ["AI avatar video India", "AI ad creatives"] },
    parent: "/services/",
  }),
  service({
    path: "/services/ui-ux-design/",
    name: "UI/UX Design",
    title: "UI/UX Design Services | Dodail",
    description:
      "Research-led UX, wireframes, design systems and clickable prototypes for websites, mobile apps and SaaS products — handed off ready to build.",
    h1: "UI/UX Design for Websites, Apps and SaaS",
    keywords: { primary: "UI UX design company Hyderabad", secondary: ["UX design services India"] },
    parent: "/services/",
  }),
  service({
    path: "/services/saas-product-development/",
    name: "SaaS Product Development",
    title: "SaaS Product Development Company | Dodail",
    description:
      "Multi-tenant SaaS built on Next.js, Supabase and Postgres — auth, subscriptions with Razorpay or Stripe, dashboards and AI features. From MVP to scale.",
    h1: "SaaS Product Development From MVP to Scale",
    keywords: { primary: "SaaS development company India", secondary: ["MVP development"] },
    parent: "/services/",
  }),
  service({
    path: "/services/mobile-app-development/",
    name: "Mobile App Development",
    title: "Mobile App Development (React Native) | Dodail",
    description:
      "Cross-platform apps with React Native and Capacitor — booking, e-commerce and service apps with payments, push notifications and admin panels built in.",
    h1: "Mobile App Development",
    keywords: { primary: "mobile app development Hyderabad", secondary: ["React Native development"] },
    parent: "/services/",
    confirm: "Build only if Dodail actively sells mobile apps",
  }),
  service({
    path: "/services/fractional-cmo/",
    name: "Fractional CMO",
    title: "Fractional CMO Services (CMO-as-a-Service) | Dodail",
    description:
      "Senior marketing leadership on a monthly retainer — strategy, budgets, team and agency management, and a dashboard your board will actually understand.",
    h1: "Fractional CMO Services: Senior Marketing Leadership Without the Full-Time Cost",
    keywords: { primary: "fractional CMO India", secondary: ["CMO as a service", "outsourced CMO"] },
    parent: "/services/",
  }),
  service({
    path: "/services/market-expansion/",
    name: "Market Expansion",
    title: "Market Expansion & Geographic Growth Services | Dodail",
    description:
      "Enter new cities and countries with a clear plan — market research, localised websites and SEO, regional campaigns and performance tracking that holds up.",
    h1: "Market Expansion Services (Geographic Expansion Officer)",
    keywords: { primary: "market expansion services", secondary: ["international expansion strategy", "geographic expansion"] },
    parent: "/services/",
  }),
];
