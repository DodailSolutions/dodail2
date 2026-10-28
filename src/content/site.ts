/**
 * Business facts for Dodail — the single source of truth (brief §3).
 *
 * Any value that still needs Ravitej's sign-off is written as "[[CONFIRM: …]]".
 * Pages must read such values through `confirmed()`, which returns `undefined`
 * until the marker is replaced, so the element is hidden rather than rendered.
 * The full list of open questions lives in ./_confirm.md.
 */

export const CONFIRM_MARKER = "[[CONFIRM";

/** True while a value still carries a [[CONFIRM: …]] marker. */
export function isPending(value: unknown): boolean {
  return typeof value === "string" && value.includes(CONFIRM_MARKER);
}

/** The value once confirmed, otherwise undefined (so callers can hide the element). */
export function confirmed<T>(value: T): T | undefined {
  return isPending(value) ? undefined : value;
}

export const SITE_URL = "https://www.dodail.com";

/** One booking link everywhere (brief §2 #16). */
export const BOOKING_URL = "https://calendly.com/dodailsolutions/15min";

export const PHONE_DISPLAY = "+91 99664 00235";
export const PHONE_E164 = "+919966400235";
export const TEL_HREF = `tel:${PHONE_E164}`;
export const WHATSAPP_URL = "https://wa.me/919966400235";

export const site = {
  legalName: "Dodail Solutions Private Limited",
  brand: "Dodail",
  logoText: "DODAIL",
  tagline: "Think Growth. Think DODAIL.",
  positioning: "Design-Oriented Development. AI-Led Growth.",
  /** schema.org foundingDate */
  foundingDate: "2019-12",
  foundedLabel: "Since 2019",
  experienceLine: "Agency since 2019; founding team with 10+ years across design, development and marketing.",
  recognition: "Recognised by Startup India (DPIIT)",
  dpiitNumber: "[[CONFIRM: DPIIT recognition number]]",

  phone: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  whatsapp: WHATSAPP_URL,
  email: "info@dodail.com",
  salesEmail: "marketing@dodail.com",
  bookingUrl: BOOKING_URL,
  bookingUrlAlt: "[[CONFIRM: is https://calendly.com/marketing-2255/30min still in use?]]",

  address: {
    /** Must match the Google Business Profile exactly (NAP consistency). */
    street: "[[CONFIRM: current street address — Maruthi Nagar (Rajendra Nagar) or Hirkani Tower]]",
    locality: "Hyderabad",
    region: "Telangana",
    postalCode: "[[CONFIRM: PIN code]]",
    country: "IN",
    countryName: "India",
  },
  geo: { latitude: 17.3619267, longitude: 78.4350899 },
  mapsQuery: "Dodail Solutions Pvt Ltd",

  hours: {
    days: "Monday–Saturday",
    opens: "[[CONFIRM: opening time, e.g. 10:00]]",
    closes: "[[CONFIRM: closing time, e.g. 19:00]]",
  },

  /** Markets served — "clients in" until physical offices are confirmed. */
  markets: ["India", "UAE (Dubai)", "USA"],
  areaServed: ["IN", "AE", "US"],
  marketsLine: "[[CONFIRM: offices in Dubai/USA, or clients only?]]",

  clientCount: "[[CONFIRM: 100+ businesses served]]",
  teamSize: "[[CONFIRM: show team size or omit]]",

  leadership: [
    { name: "M. Satya Sai Prasanna Lakshmi", role: "CEO" },
    { name: "Ravitej Mathurthi", role: "Marketing Head & Business Development" },
  ],
  showLeadership: "[[CONFIRM: OK to show leadership names/photos on About?]]",

  assistantName: "Lakshmi",

  social: {
    facebook: "https://www.facebook.com/DodailSolutionPvtLtd/",
    x: "https://twitter.com/dodailpvtltd",
    youtube: "https://www.youtube.com/@dodail",
    instagram: "https://www.instagram.com/dodail/",
    linkedin: "https://www.linkedin.com/company/dodail/",
  },
  twitterHandle: "@dodailpvtltd",

  verification: {
    google: "-8t9f7kYXCnXv0O-BgLx_Jb5-3bIRO8R2gfR2nMYLTw",
    bing: "58D63AD2F74C518904D1754A4760D785",
    pinterest: "4602f2349aef95e301637c2570193c09",
  },

  analytics: {
    ga4: "[[CONFIRM: GA4 measurement ID]]",
    gtm: "[[CONFIRM: GTM container ID]]",
    metaPixel: "[[CONFIRM: Meta Pixel ID]]",
  },

  stack: [
    "Next.js", "React", "Node.js", "Laravel", "WordPress", "WooCommerce", "Shopify", "Magento", "Tailwind CSS",
    "shadcn/ui", "Supabase", "PostgreSQL", "MySQL", "MongoDB", "n8n", "Razorpay", "WhatsApp Cloud API", "Resend",
    "Claude API", "OpenAI API", "Vercel",
  ],
} as const;

/** Genuine testimonials copied verbatim from the old homepage (legacy/testimonials.json). */
export const testimonials = [
  {
    quote:
      "Dodail Solutions designed a website that truly reflects the care and trust parents look for. Professional, responsive, and highly reliable service!",
    name: "Dr. Bhanu Prakash",
    role: "M.B.B.S, M.D, Paediatrician, Hyderabad",
  },
  {
    quote:
      "Dodail Solutions helped us craft a website that beautifully highlights our natural oils. Their creative and timely work truly elevated our brand presence online!",
    name: "Raj",
    role: "Hyderabad",
    project: "be-heavenly-oils",
  },
  {
    quote:
      "Dodail Solutions transformed our clinic's online presence with precision. The website feels modern, patient-friendly, and truly represents our specialty. A great partner for healthcare professionals!",
    name: "Dr. Shirish",
    role: "Pulmonologist, Hyderabad",
    project: "dr-shirish-chest-clinic",
  },
] as const;

/** Address as one line, built only from confirmed parts. */
export function addressLine(): string {
  const a = site.address;
  return [confirmed(a.street), a.locality, a.region, confirmed(a.postalCode), a.countryName].filter(Boolean).join(", ");
}
