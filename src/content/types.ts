/**
 * Content shapes for the page templates (brief §5.1, §6.1, §7, §8). Copy lives in typed data
 * files under src/content/**; templates in src/components/templates render them. Any field that
 * waits on Ravitej holds "[[CONFIRM: …]]" and is hidden on the page until replaced.
 */

export interface Faq {
  question: string;
  /** Plain text, 60–120 words. Rendered visibly and in FAQPage schema. */
  answer: string;
}

export interface TitledText {
  title: string;
  text: string;
}

export interface Plan {
  name: string;
  /** "Ideal for …" one-liner. */
  idealFor: string;
  /** Display price, e.g. "₹30,000". Shown only once confirmed (no [[CONFIRM]] marker). */
  price?: string;
  /** Numeric INR amount for Offer schema; set only together with a confirmed `price`. */
  priceValue?: number;
  /** e.g. "one-time", "per month". */
  period?: string;
  /** 5–7 features that match the service. */
  features: string[];
  recommended?: boolean;
  cta?: { label: string; href: string };
}

export interface ProseSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

/** A service pillar or sub-service page (templates A and B). */
export interface ServicePageContent {
  /** Registry path, e.g. "/services/seo/local-seo/". Supplies H1, title, meta and breadcrumbs. */
  path: string;
  kind: "pillar" | "sub";
  /** schema.org serviceType. */
  serviceType: string;
  subheading: string;
  /** Opening paragraphs; the primary keyword appears in the first 100 words. */
  intro: string[];
  audience: TitledText[];
  /** Short bullets "What's included" (sub-services). */
  included?: string[];
  /** KPIs reported to the client (sub-services). */
  measure?: string[];
  /** Unique angle sections prose (brief §5.3). */
  sections: ProseSection[];
  /** Process steps; defaults to Dodail's 5D (Discover → Design → Develop → Deploy → Drive). */
  process?: TitledText[];
  plans?: Plan[];
  plansNote?: string;
  why: TitledText[];
  tech?: string[];
  faqs: Faq[];
  /** Project service tags used to pull "Selected work" automatically. */
  workServices: string[];
  /** Blog slugs shown under "Keep reading". */
  relatedPosts?: string[];
  /** Sibling sub-service paths (2) and one related industry path. */
  siblings?: string[];
  relatedIndustry?: string;
  /** Pillar only: sub-service paths in display order, each with a one-line pitch. */
  subServices?: Array<{ path: string; pitch: string }>;
  /** Pages to link to from "Read more" (e.g. the GEO hub's best posts). */
  furtherReading?: string[];
}

export interface IndustryPageContent {
  path: string;
  subheading: string;
  intro: string[];
  /** The industry's real problems along the customer's journey. */
  problems: TitledText[];
  /** What we build: website, SEO, social, AI automation. */
  build: TitledText[];
  /** AI automation flows for the sector. */
  flows: TitledText[];
  /** Honest walk-through shown when no real project exists yet. */
  walkthrough?: { title: string; steps: string[] };
  /** Project slugs from src/content/work. */
  projects?: string[];
  plans?: Plan[];
  plansNote?: string;
  faqs: Faq[];
  services: string[];
  relatedPosts?: string[];
}

export type ProjectIndustry =
  | "Healthcare"
  | "Dental"
  | "E-commerce"
  | "Education"
  | "Real Estate"
  | "Food & Restaurant"
  | "Services"
  | "Other";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** One portfolio project (brief §6.1). Only confirmed facts: unknowns stay undefined or [[CONFIRM]]. */
export interface Project {
  slug: string;
  name: string;
  client: string;
  industry: ProjectIndustry | string;
  services: string[];
  platform?: string;
  /** External live site; omit unless confirmed. */
  liveUrl?: string;
  year?: number;
  location?: string;
  summary: string;
  /** Page title (≤ 60) and meta description (140–155). Derived from the name and summary when omitted. */
  seo?: { title: string; description: string };
  challenge?: string;
  whatWeBuilt?: string[];
  highlights?: string[];
  /** ONLY confirmed numbers. */
  results?: Array<{ label: string; value: string }>;
  testimonial?: { quote: string; name: string; role: string };
  /** 16:10 above-the-fold cover. */
  coverImage?: ProjectImage;
  /** Tall full-page capture for the scrolling device frame. */
  fullPage?: ProjectImage;
  mobile?: ProjectImage;
  gallery?: ProjectImage[];
  caseStudySlug?: string;
  featured?: boolean;
  order: number;
}

export interface CaseStudy {
  slug: string;
  /** Project slug this study is about. */
  projectSlug: string;
  /** "How [Client] [achieved outcome]" */
  title: string;
  description: string;
  timeline?: string;
  /** 3–4 tiles, only confirmed numbers; the section hides when empty or pending. */
  glance: Array<{ label: string; value: string }>;
  clientAndChallenge: string[];
  whatWeDid: Array<{ stage: "Strategy" | "Build" | "Launch" | "Growth"; text: string }>;
  results: string[];
  testimonial?: { quote: string; name: string; role: string };
  servicesUsed: Array<{ label: string; path: string }>;
  published: string;
  modified?: string;
}

export interface BlogPostData {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  author: string;
  datePublished: string;
  dateModified: string;
  featuredImage: string | null;
  category: string;
  contentHtml: string;
  wordCount: number;
}
