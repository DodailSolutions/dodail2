import type { RouteEntry } from "./types";

/** Home, company, proof, blog and legal pages (brief §4.1, §5.2). */
export const coreRoutes: RouteEntry[] = [
  {
    path: "/",
    name: "Home",
    title: "Dodail – Web Development, SEO & AI Agency, Hyderabad",
    description:
      "Hyderabad digital agency for websites, e-commerce, SEO, Google Ads and AI automation for businesses in India, UAE and USA. Book a free strategy call.",
    h1: "Design-Oriented Development. AI-Led Growth.",
    keywords: { primary: "digital marketing agency Hyderabad", secondary: ["web development company Hyderabad", "AI automation agency India"] },
    sitemap: "pages",
    built: true,
  },
  {
    path: "/about/",
    name: "About",
    title: "About Dodail – Digital Agency in Hyderabad Since 2019",
    description:
      "Meet Dodail Solutions — a Startup India–recognised digital agency in Hyderabad building websites, SEO and AI automation for brands in India, UAE and USA.",
    h1: "About Dodail: A Hyderabad Agency Building Growth Systems Since 2019",
    keywords: { primary: "digital agency in Hyderabad", secondary: ["about Dodail", "Dodail Solutions Private Limited"] },
    sitemap: "pages",
    built: true,
  },
  {
    path: "/contact/",
    name: "Contact",
    title: "Contact Dodail – Book a Free Strategy Call",
    description:
      "Call +91 99664 00235, WhatsApp us, or book a free 15-minute strategy call. Dodail helps businesses in India, UAE and USA with websites, SEO and marketing.",
    h1: "Let's Talk About Your Growth",
    keywords: { primary: "contact digital marketing agency Hyderabad", secondary: ["Dodail contact number"] },
    sitemap: "pages",
    built: true,
  },
  {
    path: "/careers/",
    name: "Careers",
    title: "Careers at Dodail – Design, Dev & Marketing Jobs",
    description:
      "Join Dodail in Hyderabad. We hire designers, developers and marketers who like shipping real work for real clients. See open roles and how to apply today.",
    h1: "Careers at Dodail",
    keywords: { primary: "digital marketing jobs Hyderabad", secondary: ["web developer jobs Hyderabad"] },
    sitemap: "pages",
    built: false,
  },
  {
    path: "/free-audit/",
    name: "Free Audit",
    title: "Free Website & SEO Audit – Dodail",
    description:
      "Find out what's holding your website back. Get a free audit covering speed, SEO, Google Business Profile and conversion gaps, with a clear list of fixes.",
    h1: "Get a Free Website & Marketing Audit",
    keywords: { primary: "free website audit", secondary: ["free SEO audit India", "website speed check"] },
    sitemap: "pages",
    built: false,
  },
  {
    path: "/work/",
    name: "Our Work",
    title: "Portfolio – Websites & Campaigns by Dodail",
    description:
      "See websites, e-commerce stores, social campaigns and brand designs Dodail has built for hospitals, clinics, D2C brands and institutes across India.",
    h1: "Our Work: Websites, Campaigns and Brands We've Built",
    keywords: { primary: "web design portfolio Hyderabad", secondary: ["website design examples"] },
    sitemap: "work",
    built: true,
  },
  {
    path: "/work/social-media/",
    name: "Social Media",
    title: "Social Media Portfolio – Posts & Reels | Dodail",
    description:
      "Instagram posts, carousels and reels Dodail has designed and edited for clinics, hospitals, D2C brands and local businesses — planned around sales goals.",
    h1: "Social Media Work: Posts, Carousels and Reels",
    keywords: { primary: "social media design portfolio", secondary: ["Instagram reels examples"] },
    parent: "/work/",
    sitemap: "work",
    built: false,
  },
  {
    path: "/work/graphic-design/",
    name: "Graphic Design",
    title: "Graphic Design Portfolio – Logos & Packaging | Dodail",
    description:
      "Logos, packaging, banners and print designs Dodail has created for Indian brands. See the identity and design work behind our websites and campaigns.",
    h1: "Graphic Design Work: Logos, Packaging and Banners",
    keywords: { primary: "graphic design portfolio Hyderabad", secondary: ["logo design examples"] },
    parent: "/work/",
    sitemap: "work",
    built: false,
  },
  {
    path: "/case-studies/",
    name: "Case Studies",
    title: "Case Studies – Real Client Results | Dodail",
    description:
      "Real projects, real numbers. See how Dodail helped hospitals, clinics, D2C brands and service businesses grow with websites, SEO and marketing automation.",
    h1: "Case Studies: How Our Clients Grew",
    keywords: { primary: "digital marketing case studies India" },
    sitemap: "work",
    built: false,
  },
  {
    path: "/blog/",
    name: "Blog",
    title: "Blog – SEO, GEO & AI Marketing Guides | Dodail",
    description:
      "Practical guides on SEO, Generative Engine Optimization, AI marketing and growth for business owners — written by the team that does the work every day.",
    h1: "The Dodail Blog: SEO, GEO and AI Marketing Guides",
    keywords: { primary: "generative engine optimization blog", secondary: ["SEO blog India"] },
    sitemap: "blog",
    built: true,
  },
  {
    path: "/blog/category/generative-engine-optimization/",
    name: "Generative Engine Optimization",
    title: "GEO Guides – Generative Engine Optimization | Dodail",
    description:
      "Guides on Generative Engine Optimization: how ChatGPT, Gemini and Google AI choose sources, and what to change so your brand is the one they cite.",
    h1: "Generative Engine Optimization Guides",
    parent: "/blog/",
    sitemap: "blog",
    built: true,
  },
  {
    path: "/blog/category/seo/",
    name: "SEO",
    title: "SEO Guides for Business Websites | Dodail Blog",
    description:
      "SEO guides for business owners — how search is changing with generative AI, sector strategies like real estate SEO, and fixes you can act on this month.",
    h1: "SEO Guides",
    parent: "/blog/",
    sitemap: "blog",
    built: true,
  },
  {
    path: "/blog/category/ai-marketing/",
    name: "AI Marketing",
    title: "AI Marketing & Growth Guides | Dodail Blog",
    description:
      "How growing businesses use AI in marketing, sales and expansion — digital transformation planning, global SaaS growth and where automation pays back first.",
    h1: "AI Marketing Guides",
    parent: "/blog/",
    sitemap: "blog",
    built: true,
  },
  {
    path: "/blog/category/industry-guides/",
    name: "Industry Guides",
    title: "Industry Guides – Healthcare, Real Estate & More | Dodail",
    description:
      "Search and AI visibility playbooks for healthcare, real estate, education and legal websites, with examples of what each sector needs to win enquiries.",
    h1: "Industry Guides",
    parent: "/blog/",
    sitemap: "blog",
    built: true,
  },
  {
    path: "/digital-marketing-agency-hyderabad/",
    name: "Digital Marketing Agency Hyderabad",
    title: "Digital Marketing Agency in Hyderabad | Dodail",
    description:
      "Hyderabad-based agency for websites, SEO, Google Ads, social media and WhatsApp automation. Local team, transparent reporting. Book a free strategy call.",
    h1: "Digital Marketing Agency in Hyderabad That Builds, Ranks and Grows Your Business",
    keywords: {
      primary: "digital marketing agency in Hyderabad",
      secondary: ["SEO company Hyderabad", "website design company Hyderabad"],
    },
    sitemap: "pages",
    built: false,
  },
  {
    path: "/privacy-policy/",
    name: "Privacy Policy",
    title: "Privacy Policy | Dodail Solutions",
    description:
      "How Dodail Solutions collects, uses and protects personal data from our website, contact forms, WhatsApp and bookings, in line with India's DPDP Act, 2023.",
    h1: "Privacy Policy",
    sitemap: "pages",
    built: true,
  },
  {
    path: "/terms-of-use/",
    name: "Terms of Use",
    title: "Terms of Use | Dodail Solutions",
    description:
      "The terms that apply when you use dodail.com: acceptable use, intellectual property, disclaimers and the governing law of Telangana, India. Plain English.",
    h1: "Terms of Use",
    sitemap: "pages",
    built: true,
  },
  {
    path: "/sitemap/",
    name: "Sitemap",
    title: "Sitemap – Every Page on dodail.com | Dodail",
    description:
      "Every page on dodail.com in one place: services, industries, our work, case studies, blog guides and company pages. Find what you need in a single click.",
    h1: "Sitemap",
    sitemap: "pages",
    built: false,
  },
];
