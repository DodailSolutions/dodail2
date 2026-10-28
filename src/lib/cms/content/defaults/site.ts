/**
 * Site-wide content: SEO defaults, company facts, header navigation and footer.
 * Facts come from src/content/site.ts and page titles from src/content/routes, so the
 * CMS starts from the same single source of truth that structured data uses.
 */
import { requireRoute } from "@/content/routes";
import { BOOKING_URL, TEL_HREF, WHATSAPP_URL, confirmed, site } from "@/content/site";

const home = requireRoute("/");

export const seoDefaults = {
  siteUrl: "https://www.dodail.com",
  siteName: "Dodail",
  defaultTitle: home.title,
  titleSuffix: "Dodail",
  description: home.description,
  keywords: [
    "digital marketing agency Hyderabad",
    "website development company Hyderabad",
    "SEO services Hyderabad",
    "generative engine optimization",
    "AI automation agency India",
    "WhatsApp chatbot development",
    "ecommerce website development",
    "Dodail Solutions",
  ],
  shareImage: "",
  twitterHandle: site.twitterHandle,
  locale: "en_IN",
  verification: {
    google: site.verification.google,
    bing: site.verification.bing,
    yandex: "",
    pinterest: site.verification.pinterest,
  },
  /** Shown in the installed app (home-screen) and the browser UI on phones. */
  app: { name: "Dodail", shortName: "Dodail", themeColor: "#0A1B2A", backgroundColor: "#071A28" },
};

export type SeoContent = typeof seoDefaults;

const opens = confirmed(site.hours.opens);
const closes = confirmed(site.hours.closes);

export const companyDefaults = {
  name: site.legalName,
  shortName: "Dodail Solutions",
  founded: "December 2019",
  city: site.address.locality,
  region: site.address.region,
  country: site.address.countryName,
  /** Filled once confirmed in src/content/site.ts (must match the Google Business Profile). */
  postalCode: confirmed(site.address.postalCode) ?? "",
  phone: site.phone,
  whatsapp: site.phone,
  email: site.email,
  hours: opens && closes ? `${site.hours.days}, ${opens}–${closes} IST` : "",
  founder: "",
  social: {
    linkedin: site.social.linkedin,
    x: site.social.x,
    facebook: site.social.facebook,
    instagram: site.social.instagram,
    youtube: site.social.youtube,
  },
};

export type CompanyContent = typeof companyDefaults;

const item = (title: string, href: string) => ({ title, href });
const column = (title: string, href: string, icon: string, items: Array<{ title: string; href: string }>) => ({ title, href, icon, items });

const WD = "/services/website-development/";
const EC = "/services/ecommerce-development/";
const DM = "/services/digital-marketing/";
const SEO = "/services/seo/";

export const navigationDefaults = {
  announcement: {
    enabled: false,
    text: "Get a free website & marketing audit with a clear fix list.",
    link: "/free-audit/",
    linkLabel: "Request yours →",
  },
  brand: { name: "Dodail", tagline: "Solutions Pvt Ltd" },
  /** Desktop mega menu and the phone menu's "Services" section — one list for both. */
  servicesMenu: {
    label: "Services",
    href: "/services/",
    allLabel: "All services",
    columns: [
      column("Website Development", WD, "Code2", [
        item("WordPress Websites", `${WD}wordpress/`),
        item("Custom Web Apps", `${WD}custom-web-apps/`),
        item("Startup Websites", `${WD}startup-websites/`),
        item("Business Websites", `${WD}business-websites/`),
        item("Real Estate Websites", `${WD}real-estate-websites/`),
      ]),
      column("E-commerce", EC, "ShoppingBag", [
        item("Shopify Stores", `${EC}shopify/`),
        item("WooCommerce Stores", `${EC}woocommerce/`),
        item("Magento Stores", `${EC}magento/`),
        item("Custom E-commerce", `${EC}custom-ecommerce/`),
      ]),
      column("Digital Marketing", DM, "TrendingUp", [
        item("Google Ads", `${DM}google-ads/`),
        item("Social Media Marketing", `${DM}social-media-marketing/`),
        item("Email & WhatsApp Marketing", `${DM}email-whatsapp-marketing/`),
        item("Reels & Video Marketing", `${DM}reels-video-marketing/`),
        item("Google Business Profile", `${DM}google-business-profile/`),
      ]),
      column("SEO", SEO, "Search", [
        item("Local SEO", `${SEO}local-seo/`),
        item("Technical SEO", `${SEO}technical-seo/`),
        item("On-Page SEO", `${SEO}on-page-seo/`),
        item("Link Building", `${SEO}link-building/`),
        item("Multilingual SEO", `${SEO}multilingual-seo/`),
        item("WordPress SEO", `${SEO}wordpress-seo/`),
        item("E-commerce SEO", `${SEO}ecommerce-seo/`),
        item("Generative Engine Optimization", `${SEO}generative-engine-optimization/`),
      ]),
      column("AI & Growth", "/services/", "Bot", [
        item("AI Automation & Chatbots", "/services/ai-automation/"),
        item("AI Content & Ad Automation", "/services/ai-content-automation/"),
        item("UI/UX Design", "/services/ui-ux-design/"),
        item("SaaS Product Development", "/services/saas-product-development/"),
        item("Fractional CMO", "/services/fractional-cmo/"),
        item("Market Expansion", "/services/market-expansion/"),
      ]),
    ],
  },
  industriesMenu: {
    label: "Industries",
    href: "/industries/",
    allLabel: "All industries",
    items: [
      { title: "Dental Clinics", href: "/industries/dental-clinics/", icon: "Stethoscope" },
      { title: "Hospitals", href: "/industries/hospitals/", icon: "Heart" },
      { title: "Restaurants", href: "/industries/restaurants/", icon: "Star" },
      { title: "Real Estate", href: "/industries/real-estate/", icon: "Building2" },
      { title: "Schools & Institutes", href: "/industries/schools-institutes/", icon: "BookOpen" },
      { title: "Startups", href: "/industries/startups/", icon: "Rocket" },
      { title: "E-commerce Brands", href: "/industries/ecommerce-brands/", icon: "ShoppingBag" },
    ],
  },
  /** Plain links after the menus, in this order on desktop and phone. */
  links: [
    { label: "Work", href: "/work/" },
    { label: "Case Studies", href: "/case-studies/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
  ],
  /** Header button; opens the booking calendar (one BOOKING_URL everywhere). */
  cta: { label: "Book a Free Call", href: BOOKING_URL },
  /** Phone & tablet bottom tab bar (brief: Home · Services · WhatsApp · Call). The centre button is the header CTA. */
  mobileBar: {
    enabled: true,
    tabs: [
      { label: "Home", href: "/", icon: "Home" },
      { label: "Services", href: "/services/", icon: "Layers" },
      { label: "WhatsApp", href: WHATSAPP_URL, icon: "MessageSquare" },
      { label: "Call", href: TEL_HREF, icon: "Phone" },
    ],
    ctaShortLabel: "Book",
  },
};

export type NavigationContent = typeof navigationDefaults;

const link = (label: string, href: string) => ({ label, href });

export const footerDefaults = {
  brandSubline: "Private Limited · Since 2019",
  about:
    "A Hyderabad digital agency building websites, online stores, SEO and AI automation for businesses in India, the UAE and the USA. Think Growth. Think DODAIL.",
  columns: [
    {
      title: "Services",
      links: [
        link("Website Development", WD),
        link("E-commerce Development", EC),
        link("Digital Marketing", DM),
        link("SEO Services", SEO),
        link("Generative Engine Optimization", `${SEO}generative-engine-optimization/`),
        link("AI Automation", "/services/ai-automation/"),
        link("All Services", "/services/"),
      ],
    },
    {
      title: "Industries",
      links: [
        link("Dental Clinics", "/industries/dental-clinics/"),
        link("Hospitals", "/industries/hospitals/"),
        link("Restaurants", "/industries/restaurants/"),
        link("Real Estate", "/industries/real-estate/"),
        link("Schools & Institutes", "/industries/schools-institutes/"),
        link("Startups", "/industries/startups/"),
        link("E-commerce Brands", "/industries/ecommerce-brands/"),
      ],
    },
    {
      title: "Company",
      links: [
        link("About Dodail", "/about/"),
        link("Careers", "/careers/"),
        link("Contact", "/contact/"),
        link("Free Website Audit", "/free-audit/"),
        link("Digital Marketing Agency in Hyderabad", "/digital-marketing-agency-hyderabad/"),
      ],
    },
    {
      title: "Resources",
      links: [
        link("Blog", "/blog/"),
        link("GEO Guides", "/blog/category/generative-engine-optimization/"),
        link("Our Work", "/work/"),
        link("Case Studies", "/case-studies/"),
      ],
    },
  ],
  legalLinks: [link("Privacy Policy", "/privacy-policy/"), link("Terms of Use", "/terms-of-use/"), link("Sitemap", "/sitemap/")],
  /** {year} is replaced with the current year. */
  copyright: "© {year} Dodail Solutions Private Limited. All rights reserved.",
  recognition: site.recognition,
  /** Startup India badge image (keep the existing badge/QR). Leave empty to show the text line only. */
  recognitionImage: "/brand/startup-india-icon.png",
  mapLabel: "Find us on Google Maps",
};

export type FooterContent = typeof footerDefaults;
