/**
 * Every editable content document on the public site. Adding a page to the CMS
 * means adding an entry here (defaults + hints) and reading it with getContent().
 */
import type { ContentDefinition, ContentGroup, FieldHint } from "./types";
import { homeDefaults, homeHints } from "./defaults/home";
import { LandingContent } from "./defaults/landing";
import { solutionPages } from "./defaults/landingSolutions";
import { industryPages } from "./defaults/landingIndustries";
import { companyDefaults, footerDefaults, navigationDefaults, seoDefaults } from "./defaults/site";
import { blogDefaults, consultationDefaults, contactDefaults } from "./defaults/forms";
import { aboutDefaults, industriesIndexDefaults, privacyDefaults, termsDefaults, workDefaults } from "./defaults/pages";

const define = <T,>(def: ContentDefinition<T>) => def;

const landingHints: Record<string, FieldHint> = {
  layout: { hidden: true },
  "hero.secondaryCta": { help: "Leave the label empty to hide this button." },
  integrations: { help: "Optional logo-free integrations grid. Leave the items empty to hide the section." },
};
const landingTemplates = { "integrations.items": { name: "", detail: "" } };

const landingLabels: Record<keyof typeof solutionPages | keyof typeof industryPages, string> = {
  "solutions/ai-automation": "AI Automation Platform",
  "solutions/ai-lead-management": "AI Lead Management",
  "solutions/ai-customer-support": "AI Customer Support",
  "solutions/workflow-automation": "Workflow Automation",
  "services/web-development": "Web & Software Engineering",
  "services/digital-growth-seo": "Digital Growth & GEO / SEO",
  "industries/dental": "Healthcare & Dental",
  "industries/ecommerce": "E-Commerce & DTC",
  "industries/manufacturing": "Manufacturing",
  "industries/real-estate": "Real Estate",
};

type LandingKey = keyof typeof landingLabels;

function landing(key: LandingKey, defaults: LandingContent): ContentDefinition<LandingContent> {
  const group: ContentGroup = key.startsWith("solutions/") ? "Solutions" : key.startsWith("services/") ? "Services" : "Industries";
  return {
    key,
    label: landingLabels[key],
    group,
    path: `/${key}`,
    description: "Hero, feature cards and closing call to action.",
    defaults,
    hints: landingHints,
    templates: landingTemplates,
  };
}

const landingPages = Object.fromEntries(
  Object.entries({ ...solutionPages, ...industryPages }).map(([key, defaults]) => [key, landing(key as LandingKey, defaults)])
) as Record<LandingKey, ContentDefinition<LandingContent>>;

const legalHints: Record<string, FieldHint> = {
  "sections.*.body": { help: "Supports **bold** and [links](/path). Line breaks are kept." },
};

export const contentRegistry = {
  "site/seo": define({
    key: "site/seo",
    label: "SEO & app settings",
    group: "Site settings",
    path: "*",
    description: "Default search title and description, keywords, share image, search-console verification and the installed-app name and colours.",
    defaults: seoDefaults,
    hints: {
      siteUrl: { label: "Site URL", help: "Canonical domain used in the sitemap, canonical links and structured data. No trailing slash." },
      defaultTitle: { help: "Used for pages without their own SEO title. Aim for 50–60 characters." },
      titleSuffix: { help: "Appended to page titles that don't already mention your brand, e.g. \"About | Dodail Solutions\"." },
      description: { help: "Default meta description. Aim for 140–160 characters." },
      keywords: { help: "One keyword or phrase per item." },
      shareImage: { kind: "image", help: "1200×630 image shown when links are shared. Leave empty to use the auto-generated card." },
      locale: { kind: "select", options: ["en_IN", "en_US", "en_GB"] },
      "verification.google": { label: "Google Search Console code", help: "Only the content value of the google-site-verification meta tag." },
      "verification.bing": { label: "Bing Webmaster code" },
      "verification.yandex": { label: "Yandex code" },
      "app.themeColor": { kind: "color", help: "Colour of the phone status bar and browser toolbar." },
      "app.backgroundColor": { kind: "color", help: "Splash-screen colour when the installed app opens." },
    },
  }),
  "site/company": define({
    key: "site/company",
    label: "Company details",
    group: "Site settings",
    path: "*",
    description: "Legal name, address, phone, email and social profiles used across the site and in structured data.",
    defaults: companyDefaults,
    hints: {
      whatsapp: { label: "WhatsApp number", help: "Include the country code, e.g. +91 99664 00235." },
      hours: { label: "Business hours" },
    },
  }),
  "site/navigation": define({
    key: "site/navigation",
    label: "Header & navigation",
    group: "Site settings",
    path: "*",
    description: "Announcement bar, menus, links and the header call to action.",
    defaults: navigationDefaults,
    hints: {
      "announcement.enabled": { label: "Show announcement bar" },
      "links.*.mobileLabel": { help: "Label used in the phone menu. Leave empty to hide this link on phones." },
      mobileBar: { label: "Phone & tablet tab bar", help: "App-style bar at the bottom of the screen on phones and tablets." },
      "mobileBar.enabled": { label: "Show tab bar" },
      "mobileBar.tabs": { fixedLength: true, help: "Four tabs; the centre button uses the header call to action." },
      "mobileBar.ctaShortLabel": { label: "Centre button label", help: "Keep it to one short word." },
    },
  }),
  "site/footer": define({
    key: "site/footer",
    label: "Footer",
    group: "Site settings",
    path: "*",
    description: "Footer columns, company blurb and copyright line.",
    defaults: footerDefaults,
    hints: {
      copyright: { help: "{year} is replaced with the current year." },
      "columns.*.links.*.highlight": { label: "Highlight in orange" },
    },
  }),
  home: define({
    key: "home",
    label: "Homepage",
    group: "Home",
    path: "/",
    description: "Every homepage section, from the hero to the FAQ and closing call to action.",
    defaults: homeDefaults,
    hints: homeHints,
  }),
  ...landingPages,
  about: define({
    key: "about",
    label: "About",
    group: "Company",
    path: "/about",
    defaults: aboutDefaults,
    hints: { "story.paragraphs": { help: "Supports **bold** and [links](/path)." }, "corporate.lines": { help: "Supports **bold** labels." } },
  }),
  contact: define({
    key: "contact",
    label: "Contact",
    group: "Company",
    path: "/contact",
    description: "Contact page copy and form labels. Phone, email and address come from Company details.",
    defaults: contactDefaults,
    hints: { "success.body": { help: "{name} is replaced with the visitor's name." } },
  }),
  consultation: define({
    key: "consultation",
    label: "Book a consultation",
    group: "Company",
    path: "/consultation",
    description: "Booking page: topics, time slots, form labels and confirmation message.",
    defaults: consultationDefaults,
    hints: {
      "slots.*.time": { label: "Start time (24h, IST)", help: "For example 15:00 for 3 PM." },
      "success.body": { help: "{name}, {topic} and {slot} are replaced automatically." },
      "success.whatsappMessage": { help: "{name} is replaced with the visitor's name." },
    },
  }),
  blog: define({
    key: "blog",
    label: "Blog & resources",
    group: "Company",
    path: "/blog",
    description: "Blog index intro, curated resources and the call to action shown under every article.",
    defaults: blogDefaults,
  }),
  work: define({ key: "work", label: "Work & case studies", group: "Company", path: "/work", defaults: workDefaults }),
  industries: define({
    key: "industries",
    label: "Industries overview",
    group: "Industries",
    path: "/industries",
    defaults: industriesIndexDefaults,
  }),
  "legal/privacy": define({ key: "legal/privacy", label: "Privacy policy", group: "Legal", path: "/privacy", defaults: privacyDefaults, hints: legalHints }),
  "legal/terms": define({ key: "legal/terms", label: "Terms of service", group: "Legal", path: "/terms", defaults: termsDefaults, hints: legalHints }),
};

/**
 * Every page with an `seo` block also gets a share image and a "hide from search
 * engines" switch, so editors control indexing and social cards page by page.
 */
for (const def of Object.values(contentRegistry) as ContentDefinition[]) {
  const defaults = def.defaults as Record<string, unknown>;
  const seo = defaults.seo;
  if (!seo || typeof seo !== "object" || Array.isArray(seo)) continue;
  def.defaults = { ...defaults, seo: { image: "", noIndex: false, ...(seo as Record<string, unknown>) } };
  def.hints = {
    "seo.title": { label: "SEO title", help: "Shown in Google and browser tabs. Aim for 30–60 characters." },
    "seo.description": { label: "Meta description", help: "The summary under your link in Google. Aim for 70–160 characters." },
    "seo.image": { kind: "image", label: "Share image", help: "1200×630 image for WhatsApp, LinkedIn and X previews. Leave empty to use the site default." },
    "seo.noIndex": { label: "Hide this page from search engines" },
    ...def.hints,
  };
}

export type ContentRegistry = typeof contentRegistry;
export type ContentKey = keyof ContentRegistry;
export type ContentOf<K extends ContentKey> = ContentRegistry[K]["defaults"];

export function getDefinition(key: string): ContentDefinition | undefined {
  return Object.prototype.hasOwnProperty.call(contentRegistry, key)
    ? (contentRegistry[key as ContentKey] as ContentDefinition)
    : undefined;
}

export function allDefinitions(): ContentDefinition[] {
  return Object.values(contentRegistry) as ContentDefinition[];
}

export const GROUP_ORDER: ContentGroup[] = ["Site settings", "Home", "Solutions", "Services", "Industries", "Company", "Legal"];
