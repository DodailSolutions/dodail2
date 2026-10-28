/**
 * Sample content used ONLY by the dev template gallery (src/app/dev/templates). Never imported by
 * a public route, never shipped as a page. Names are obviously fictional on purpose.
 */
import type { CaseStudy, IndustryPageContent, Project, ServicePageContent } from "./types";

const faqs = [
  { question: "Sample question one?", answer: "Sample answer. This text only appears in the development template gallery so the layout can be checked with realistic length. ".repeat(3).trim() },
  { question: "Sample question two?", answer: "Another sample answer used to check spacing and wrapping inside the accordion. ".repeat(4).trim() },
];

const why = [
  { title: "Sample differentiator", text: "A short supporting sentence that shows how the two-column list wraps on small screens." },
  { title: "Another differentiator", text: "More sample copy for layout checks only." },
];

export const sampleSub: ServicePageContent = {
  path: "/services/seo/local-seo/",
  kind: "sub",
  serviceType: "Local SEO",
  subheading: "Sample subheading that explains the page in one or two lines for layout checks.",
  intro: ["Sample intro paragraph one for the sub-service template.", "Sample intro paragraph two."],
  audience: [
    { title: "Sample audience A", text: "Short audience description." },
    { title: "Sample audience B", text: "Short audience description." },
    { title: "Sample audience C", text: "Short audience description." },
  ],
  included: ["Sample deliverable one", "Sample deliverable two", "Sample deliverable three", "Sample deliverable four"],
  measure: ["Sample KPI one", "Sample KPI two", "Sample KPI three"],
  sections: [{ heading: "Sample unique-angle section", paragraphs: ["Sample paragraph one.", "Sample paragraph two."], bullets: ["Sample bullet", "Another bullet"] }],
  plans: [
    { name: "Sample Starter", idealFor: "a small local business", price: "[[CONFIRM: price]]", features: ["Feature one", "Feature two", "Feature three", "Feature four", "Feature five"] },
    { name: "Sample Growth", idealFor: "a growing business", price: "₹10,000", priceValue: 10000, period: "per month", recommended: true, features: ["Feature one", "Feature two", "Feature three", "Feature four", "Feature five"] },
    { name: "Sample Custom", idealFor: "larger needs", features: ["Feature one", "Feature two", "Feature three", "Feature four", "Feature five"] },
  ],
  plansNote: "Sample price note.",
  why,
  tech: ["Sample Tool A", "Sample Tool B", "Sample Tool C"],
  faqs,
  workServices: ["Website Development"],
  siblings: ["/services/seo/", "/services/seo/technical-seo/"],
};

export const samplePillar: ServicePageContent = {
  ...sampleSub,
  path: "/services/seo/",
  kind: "pillar",
  included: undefined,
  measure: undefined,
  subServices: [
    { path: "/services/seo/local-seo/", pitch: "Sample pitch for the sub-service card." },
    { path: "/services/seo/technical-seo/", pitch: "Sample pitch for another card." },
  ],
};

export const sampleIndustry: IndustryPageContent = {
  path: "/industries/dental-clinics/",
  subheading: "Sample industry subheading for layout checks.",
  intro: ["Sample industry intro paragraph."],
  problems: [
    { title: "Sample problem one", text: "Short description of a customer-journey problem." },
    { title: "Sample problem two", text: "Short description of a customer-journey problem." },
    { title: "Sample problem three", text: "Short description of a customer-journey problem." },
  ],
  build: [
    { title: "Sample website piece", text: "What we build." },
    { title: "Sample SEO piece", text: "What we build." },
  ],
  flows: [
    { title: "Sample appointment flow", text: "How the automation works." },
    { title: "Sample reminder flow", text: "How the automation works." },
    { title: "Sample review flow", text: "How the automation works." },
  ],
  walkthrough: { title: "Sample walkthrough", steps: ["Sample step one", "Sample step two", "Sample step three"] },
  plans: sampleSub.plans,
  faqs,
  services: ["/services/seo/local-seo/", "/services/seo/"],
};

export const sampleProject: Project = {
  slug: "sample-project",
  name: "Sample Project",
  client: "Sample Client",
  industry: "Healthcare",
  services: ["Website Development", "SEO"],
  platform: "WordPress",
  location: "Hyderabad",
  year: 2025,
  summary: "A sample one-line summary of the project used to check the card and page layout.",
  challenge: "Sample challenge paragraph describing the problem the client had.",
  whatWeBuilt: ["Sample build item one", "Sample build item two"],
  highlights: ["Sample highlight", "Another highlight"],
  results: [
    { label: "Sample confirmed metric", value: "42" },
    { label: "Pending metric", value: "[[CONFIRM: value]]" },
  ],
  testimonial: { quote: "Sample testimonial text for layout only.", name: "Sample Person", role: "Sample Role" },
  order: 1,
};

export const sampleCaseStudy: CaseStudy = {
  slug: "sample-case-study",
  projectSlug: "sample-project",
  title: "How Sample Client got sample results",
  description: "Sample description for the case study hero, used to check the layout of the page.",
  timeline: "[[CONFIRM: timeline]]",
  glance: [
    { label: "Sample confirmed tile", value: "3×" },
    { label: "Pending tile", value: "[[CONFIRM: value]]" },
  ],
  clientAndChallenge: ["Sample client paragraph.", "Sample challenge paragraph."],
  whatWeDid: [
    { stage: "Strategy", text: "Sample strategy text." },
    { stage: "Build", text: "Sample build text." },
    { stage: "Launch", text: "[[CONFIRM: launch details]]" },
    { stage: "Growth", text: "Sample growth text." },
  ],
  results: ["Sample result sentence.", "[[CONFIRM: result]]"],
  servicesUsed: [{ label: "Local SEO", path: "/services/seo/local-seo/" }],
  published: "2025-10-01",
};
