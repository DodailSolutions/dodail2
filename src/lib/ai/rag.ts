import { APPROVED_KNOWLEDGE_BASE } from "./knowledge";
import { listPosts } from "@/lib/cms/blog";
import { getContent } from "@/lib/cms/content/store";

export interface KnowledgeChunk {
  id: string;
  category: "service" | "company" | "process" | "policy" | "faq" | "case_study" | "pricing";
  title: string;
  content: string;
  keywords: string[];
}

// In-memory indexed cache of knowledge chunks
let CACHED_CHUNKS: KnowledgeChunk[] | null = null;
let LAST_INDEXED_AT = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Builds or refreshes the unified website knowledge index.
 */
export async function getKnowledgeIndex(): Promise<KnowledgeChunk[]> {
  const now = Date.now();
  if (CACHED_CHUNKS && now - LAST_INDEXED_AT < CACHE_TTL_MS) {
    return CACHED_CHUNKS;
  }

  const chunks: KnowledgeChunk[] = [];

  // 1. Static pre-approved knowledge base
  for (const doc of APPROVED_KNOWLEDGE_BASE) {
    chunks.push({
      id: `doc-${doc.id}`,
      category: doc.category as any,
      title: doc.title,
      content: doc.content,
      keywords: doc.title.toLowerCase().split(/\s+/),
    });
  }

  // 2. Company Identity & Core Facts
  chunks.push({
    id: "dodail-company-overview",
    category: "company",
    title: "About Dodail Solutions Pvt Ltd",
    content: `Dodail Solutions Private Limited (founded in 2019, Hyderabad, India) is a digital technology and growth partner.
Tagline: "Think Growth. Think Dodail."
Positioning: Dodail designs, builds and improves the digital systems businesses use to grow — from websites and e-commerce to custom software, AI automation, SEO and digital marketing.
Brand Concept: DODAIL = Design-Oriented Development & AI-Led Solutions.
Headquarters: Hyderabad, Telangana, India.
Primary Markets: India, USA, UK, and UAE/Dubai.
Contact: Phone +91 99664 00235 | Email: info@dodail.com.
Website: https://www.dodail.com.
Primary CTA: "Book a consultation" (15-30 min discovery consultation).`,
    keywords: ["dodail", "about", "hyderabad", "office", "phone", "email", "address", "founded", "contact", "acronym", "location", "positioning"],
  });

  // 3. Six Core Service Offerings (Master Spec Section 2 & 4)
  chunks.push(
    {
      id: "service-ai-automation",
      category: "service",
      title: "AI Automation & Workflows",
      content: `Connect business tools and reduce repetitive work with practical AI automation, lead routing, CRM workflows, WhatsApp Cloud API integrations, and webhook pipelines designed around your process.`,
      keywords: ["ai automation", "automation", "workflows", "whatsapp", "crm", "lead routing", "tools", "pipelines"],
    },
    {
      id: "service-custom-software",
      category: "service",
      title: "Custom Software & SaaS Development",
      content: `Plan and build web applications, client portals, custom dashboards, inventory engines, and SaaS products with clear milestone scope, maintainable Next.js/React/Node.js architecture, and secure PostgreSQL access controls.`,
      keywords: ["custom software", "saas", "web app", "client portal", "dashboard", "software", "development"],
    },
    {
      id: "service-website-development",
      category: "service",
      title: "Website Design & Development",
      content: `Build fast, mobile-friendly business websites with clear messaging, conversion-focused UX, technical SEO foundations, sub-second performance, and a manageable content system using modern Next.js or WordPress.`,
      keywords: ["website development", "web design", "business website", "wordpress", "next.js", "seo-ready", "hyderabad"],
    },
    {
      id: "service-ecommerce-development",
      category: "service",
      title: "E-Commerce Development",
      content: `Launch or improve Shopify, WooCommerce, or custom online stores with conversion-centered product layouts, secure payment gateway integrations (Razorpay, Stripe), automated inventory workflows, and speed optimization.`,
      keywords: ["ecommerce", "shopify", "woocommerce", "online store", "razorpay", "stripe", "checkout"],
    },
    {
      id: "service-digital-marketing-seo",
      category: "service",
      title: "Digital Marketing, SEO & Generative Engine Optimization (GEO)",
      content: `Grow qualified traffic and customer pipeline through technical SEO, local SEO, data-driven paid advertising (Google & Meta ads), and Generative Engine Optimization (GEO). In Dodail's services, GEO stands strictly for Generative Engine Optimization: optimizing brand visibility and citations on AI search engines such as ChatGPT, Perplexity, and Google AI Overviews.`,
      keywords: ["seo", "digital marketing", "geo", "generative engine optimization", "ai search", "google ads", "meta ads", "local seo"],
    },
    {
      id: "service-branding-ui-ux",
      category: "service",
      title: "Branding & UI/UX Design",
      content: `Create distinctive brand identity systems, modern logo design, typography hierarchies, brand guidelines, and high-fidelity UI/UX design that communicates authority and converts visitors.`,
      keywords: ["branding", "brand identity", "logo design", "ui/ux", "brand guidelines", "packaging", "interface"],
    }
  );

  // 4. Pricing & Engagement Framework
  chunks.push({
    id: "dodail-pricing-framework",
    category: "pricing",
    title: "Pricing Models & Project Scoping",
    content: `Dodail operates on transparent, milestone-driven engagement models:
1. Workflow Automations & AI Pipelines: Starter projects typically range from ₹75,000 to ₹1,50,000 INR depending on API connectors and complexity.
2. Web & Mobile Engineering: Scoped based on technical specifications, UX screens, and database architecture.
3. Strategy & Growth Retainers: Monthly CMO-as-a-service and performance marketing retainers.
Dodail never provides blind estimates without understanding business goals. The recommended first step is booking a free 15-30 min discovery call.`,
    keywords: ["price", "pricing", "cost", "fees", "package", "budget", "quote", "rate", "how much", "inr", "usd"],
  });

  // 5. Ingest dynamic CMS content if available
  try {
    const siteCompany = await getContent("site/company");
    if (siteCompany) {
      chunks.push({
        id: "cms-company-live",
        category: "company",
        title: "Live Company Registry Details",
        content: JSON.stringify(siteCompany),
        keywords: ["company", "cms", "live", "address", "phone"],
      });
    }
  } catch {
    // Non-blocking
  }

  // 6. Ingest published blog case studies
  try {
    const posts = await listPosts();
    for (const post of posts.slice(0, 5)) {
      chunks.push({
        id: `blog-${post.slug}`,
        category: "case_study",
        title: post.title,
        content: `${post.title}: ${post.excerpt} ${post.content ? post.content.slice(0, 300) : ""}`,
        keywords: post.title.toLowerCase().split(/\s+/),
      });
    }
  } catch {
    // Non-blocking
  }

  CACHED_CHUNKS = chunks;
  LAST_INDEXED_AT = now;
  return chunks;
}

/**
 * Searches the RAG index and returns the most relevant chunks for Gita.
 */
export async function retrieveRelevantKnowledge(query: string, maxResults = 3): Promise<KnowledgeChunk[]> {
  const index = await getKnowledgeIndex();
  const lowerQuery = query.toLowerCase();
  const queryTokens = lowerQuery.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t.length > 2);

  const scored = index.map((chunk) => {
    let score = 0;
    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();

    // Exact phrase match in title or content
    if (titleLower.includes(lowerQuery)) score += 10;
    if (contentLower.includes(lowerQuery)) score += 5;

    // Token frequency and keyword matching
    for (const token of queryTokens) {
      if (titleLower.includes(token)) score += 3;
      if (chunk.keywords.includes(token)) score += 2;
      if (contentLower.includes(token)) score += 1;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const results = scored.filter((s) => s.score > 0).slice(0, maxResults).map((s) => s.chunk);

  // If no strong match found, return general company overview and services
  if (results.length === 0) {
    return index.filter((c) => c.id === "dodail-company-overview" || c.id === "dodail-pricing-framework");
  }

  return results;
}
