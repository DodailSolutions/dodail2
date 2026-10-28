import type { TitledText } from "./types";

/** Dodail's 5D process. Service pages override the wording to fit their work; this is the fallback. */
export const FIVE_D: TitledText[] = [
  {
    title: "Discover",
    text: "We start with a call about your customers, your numbers and what has and hasn't worked. You get a short written plan before any work begins.",
  },
  {
    title: "Design",
    text: "Layouts, messaging and structure are drawn up and shown to you early. You react to something real, not a long document.",
  },
  {
    title: "Develop",
    text: "The build happens in short stages, with a staging link you can open on your own phone and comment on as it takes shape.",
  },
  {
    title: "Deploy",
    text: "We launch with tracking, redirects and speed checks done, then watch the first few days closely for anything that needs a quick fix.",
  },
  {
    title: "Drive",
    text: "After launch we keep improving what the numbers show: pages that need work, searches worth targeting and leads that need follow-up.",
  },
];

export const CTA = {
  primary: { label: "Book a Free Strategy Call" },
  secondaryWork: { label: "View Our Work", href: "/work/" },
  secondaryWhatsapp: { label: "Chat on WhatsApp" },
};

/** Standard price note under plan cards. Held back until Ravitej confirms it (brief §5.4). */
export const PRICE_NOTE = "[[CONFIRM: Prices exclude GST. Ad spend is paid directly to the platform.]]";
