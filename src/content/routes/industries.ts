import type { RouteEntry } from "./types";

const IND = "/industries/";

/** Industries hub and the 7 industry pages (brief §4.3, §5.5). */
export const industryRoutes: RouteEntry[] = [
  {
    path: IND,
    name: "Industries",
    title: "Industries We Serve | Dodail",
    description:
      "Websites, SEO, social media and AI automation designed around how patients, diners, home buyers and parents actually choose — organised by industry.",
    h1: "Digital Growth Systems Built for Your Industry",
    keywords: { primary: "industry-specific digital marketing" },
    sitemap: "industries",
    built: true,
  },
  {
    path: `${IND}dental-clinics/`,
    name: "Dental Clinics",
    title: "Dental Clinic Marketing & Website Design | Dodail",
    description:
      "More patients from Google and WhatsApp. Dental websites, local SEO, before/after galleries, appointment bots and review systems for dental clinics.",
    h1: "Dental Clinic Marketing: Website, SEO and WhatsApp Booking",
    keywords: { primary: "dental clinic marketing", secondary: ["dental website design", "dental SEO Hyderabad"] },
    parent: IND,
    sitemap: "industries",
    built: true,
  },
  {
    path: `${IND}hospitals/`,
    name: "Hospitals",
    title: "Hospital Website Design & Digital Marketing | Dodail",
    description:
      "Doctor and department pages, appointment booking, WhatsApp bots, multilingual patient support and local SEO — built for multispeciality hospitals.",
    h1: "Hospital Websites and Digital Marketing",
    keywords: { primary: "hospital website design", secondary: ["hospital digital marketing", "healthcare SEO"] },
    parent: IND,
    sitemap: "industries",
    built: false,
  },
  {
    path: `${IND}restaurants/`,
    name: "Restaurants",
    title: "Restaurant Digital Marketing & Website | Dodail",
    description:
      "Menu websites, Google Maps visibility, reels and WhatsApp ordering bots that fill tables and grow direct orders — without paying aggregator commission.",
    h1: "Restaurant Marketing: Website, Reels and Online Orders",
    keywords: { primary: "restaurant digital marketing", secondary: ["restaurant website design Hyderabad"] },
    parent: IND,
    sitemap: "industries",
    built: false,
  },
  {
    path: `${IND}real-estate/`,
    name: "Real Estate",
    title: "Real Estate Digital Marketing | Dodail",
    description:
      "Project websites, lead ads, WhatsApp brochure bots and site-visit reminders for builders and agents — with CRM sync and full lead-source tracking.",
    h1: "Real Estate Marketing That Turns Enquiries Into Site Visits",
    keywords: { primary: "real estate digital marketing", secondary: ["real estate lead generation Hyderabad"] },
    parent: IND,
    sitemap: "industries",
    built: true,
  },
  {
    path: `${IND}schools-institutes/`,
    name: "Schools & Institutes",
    title: "School Website & Admission Marketing | Dodail",
    description:
      "School websites, admission enquiry bots, multilingual parent support, open-house reminders and local SEO that bring in more applications each season.",
    h1: "School and Institute Marketing for More Admissions",
    keywords: { primary: "school digital marketing", secondary: ["school website design", "admission marketing"] },
    parent: IND,
    sitemap: "industries",
    built: false,
  },
  {
    path: `${IND}startups/`,
    name: "Startups",
    title: "Startup Growth: Website, Marketing & Automation",
    description:
      "MVP websites, lead funnels, CRM automation and growth marketing for startups and SMEs — one accountable team from launch day all the way to scale.",
    h1: "Launch and Grow Your Startup With One Digital Partner",
    keywords: { primary: "startup digital marketing", secondary: ["startup growth agency"] },
    parent: IND,
    sitemap: "industries",
    built: false,
  },
  {
    path: `${IND}ecommerce-brands/`,
    name: "E-commerce Brands",
    title: "E-commerce Growth Services for D2C Brands | Dodail",
    description:
      "Store optimisation, product SEO, Google Shopping, reels and WhatsApp cart recovery for D2C and e-commerce brands that want profitable, repeatable growth.",
    h1: "E-commerce Growth: Store, SEO, Ads and Automation",
    keywords: { primary: "ecommerce marketing agency", secondary: ["D2C marketing India"] },
    parent: IND,
    sitemap: "industries",
    built: true,
  },
];
