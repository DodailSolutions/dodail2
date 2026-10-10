/**
 * Shared shape for the solution, service and industry landing pages. Each page's
 * default copy lives in landingSolutions.ts / landingIndustries.ts.
 */

export interface LinkContent {
  label: string;
  href: string;
}

export interface LandingContent {
  /** "solution" = solutions & services styling; "industry" = industry page styling. */
  layout: "solution" | "industry";
  seo: { title: string; description: string };
  hero: {
    badge: string;
    badgeTone: string;
    title: string;
    /** Part of the title shown in the accent colour; leave empty for none. */
    highlight: string;
    subtitle: string;
    primaryCta: LinkContent;
    secondaryCta: LinkContent;
  };
  features: {
    badge: string;
    title: string;
    description: string;
    items: Array<{ icon: string; tone: string; title: string; description: string }>;
  };
  integrations: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ name: string; detail: string }>;
  };
  cta: { title: string; description: string; button: LinkContent };
}

export const TONES = ["orange", "amber", "emerald", "teal", "blue"] as const;

export const noIntegrations: LandingContent["integrations"] = { eyebrow: "", title: "", description: "", items: [] };
export const noLink: LinkContent = { label: "", href: "" };
