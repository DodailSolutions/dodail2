import fs from "fs";
import path from "path";
import { PageSEOConfig, SEORedirect, KeywordPlan, BacklinkTrackerItem, SEOAuditIssue, InternalLinkSuggestion } from "./types";
import { supabaseAdmin } from "@/lib/supabase";

const SEO_STORE_FILE = path.join(process.cwd(), "seo-store.json");

interface SEOStore {
  configs: Record<string, PageSEOConfig>;
  redirects: SEORedirect[];
  keywords: KeywordPlan[];
  backlinks: BacklinkTrackerItem[];
}

const defaultRedirects: SEORedirect[] = [
  // Legacy WordPress URL migrations
  {
    id: "red-1",
    source: "/about-dodail-leading-digital-agency-in-india",
    destination: "/about",
    status_code: 301,
    reason: "Legacy slug migration to canonical Dodail 2.0 /about route",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-2",
    source: "/contact-us",
    destination: "/contact",
    status_code: 301,
    reason: "Legacy contact URL consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-3",
    source: "/our-works",
    destination: "/work",
    status_code: 301,
    reason: "Legacy portfolio slug update",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-4",
    source: "/blogs",
    destination: "/blog",
    status_code: 301,
    reason: "Singularization of blog resource route",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-5",
    source: "/digital-marketing-for-dental-clinics-website-seo",
    destination: "/industries/dental",
    status_code: 301,
    reason: "Dental industry practice page migration",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-6",
    source: "/hospital-website-seo-solutions-dodail",
    destination: "/industries/dental",
    status_code: 301,
    reason: "Hospital healthcare consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-7",
    source: "/real-estate-digital-marketing-website-solutions",
    destination: "/industries/real-estate",
    status_code: 301,
    reason: "Real estate industry migration",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-8",
    source: "/real-estate-website-development-company",
    destination: "/industries/real-estate",
    status_code: 301,
    reason: "Real estate development company page consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-9",
    source: "/custom-web-application-development-services",
    destination: "/services/web-development",
    status_code: 301,
    reason: "Custom web development services consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-10",
    source: "/custom-website-development-services-wordpress-web-apps",
    destination: "/services/web-development",
    status_code: 301,
    reason: "Legacy WordPress services consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-11",
    source: "/wordpress-website-design-development-company",
    destination: "/services/web-development",
    status_code: 301,
    reason: "Legacy design company keyword URL consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-12",
    source: "/seo-services-for-google-ranking-wordpress-shopify-local",
    destination: "/services/digital-growth-seo",
    status_code: 301,
    reason: "Keyword stuffed SEO slug migration",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-13",
    source: "/local-seo-services-for-small-local-businesses",
    destination: "/services/digital-growth-seo",
    status_code: 301,
    reason: "Local SEO consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-14",
    source: "/geographic-expansion-officer-geo",
    destination: "/services/digital-growth-seo",
    status_code: 301,
    reason: "GEO service route modernization",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-15",
    source: "/e-commerce-website-development-company-shopify-more",
    destination: "/industries/ecommerce",
    status_code: 301,
    reason: "E-commerce industry solutions consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-16",
    source: "/custom-e-commerce-website-solutions",
    destination: "/industries/ecommerce",
    status_code: 301,
    reason: "E-commerce solutions route consolidation",
    created_by: "system_migration",
    created_at: "2026-04-09T00:00:00Z",
  },
  // Malicious/Hacked legacy WordPress URLs explicitly neutralized with HTTP 410 Gone
  {
    id: "red-hack-1",
    source: "/slot-gacor-maxwin",
    destination: "",
    status_code: 410,
    reason: "April 2026 WordPress casino spam hack cleanup - De-indexing signal",
    created_by: "security_audit",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "red-hack-2",
    source: "/judi-online-terpercaya",
    destination: "",
    status_code: 410,
    reason: "April 2026 WordPress casino spam hack cleanup - De-indexing signal",
    created_by: "security_audit",
    created_at: "2026-04-09T00:00:00Z",
  },
];

const defaultKeywords: KeywordPlan[] = [
  {
    id: "kw-1",
    query: "AI automation for business Hyderabad",
    search_intent: "Commercial",
    audience: "Local Business Owners & CTOs",
    industry: "Multi-Industry",
    geography: "India",
    target_url: "/solutions/ai-automation",
    owner: "SEO Team",
    status: "Live",
    notes: "Core commercial priority query for regional India expansion.",
    updated_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "kw-2",
    query: "AI lead qualification engine",
    search_intent: "Commercial",
    audience: "B2B Sales Directors",
    industry: "Technology / Professional Services",
    geography: "Global",
    target_url: "/solutions/ai-lead-management",
    owner: "Product Marketing",
    status: "Live",
    notes: "High conversion intent query targeting autonomous lead qualification.",
    updated_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "kw-3",
    query: "Dental clinic patient appointment automation",
    search_intent: "Commercial",
    audience: "Dental Clinic Owners & Practice Managers",
    industry: "Healthcare",
    geography: "India",
    target_url: "/industries/dental",
    owner: "Vertical Lead",
    status: "Live",
    notes: "Specific vertical solution for reducing no-shows.",
    updated_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "kw-4",
    query: "Next.js web application development company",
    search_intent: "Commercial",
    audience: "Startup Founders & Enterprise PMs",
    industry: "Software Engineering",
    geography: "Global",
    target_url: "/services/web-development",
    owner: "Engineering Lead",
    status: "Live",
    notes: "Drives qualified software engineering leads.",
    updated_at: "2026-04-09T00:00:00Z",
  },
];

const defaultBacklinks: BacklinkTrackerItem[] = [
  {
    id: "bl-1",
    prospect_source: "YourStory",
    domain_authority: 78,
    contact_person: "Editorial Team",
    contact_email: "editorial@yourstory.com",
    outreach_status: "Identified",
    target_url: "/about",
    link_rel: "follow",
    notes: "Targeting founder story on Hyderabad AI Automation landscape.",
    created_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "bl-2",
    prospect_source: "Clutch.co",
    domain_authority: 89,
    contact_person: "Directory Profile",
    outreach_status: "Earned",
    target_url: "/",
    earned_link_url: "https://clutch.co/profile/dodail-solutions",
    anchor_text: "Dodail Solutions Private Limited",
    link_rel: "follow",
    notes: "Verified B2B directory listing with client reviews.",
    created_at: "2026-04-09T00:00:00Z",
  },
];

const defaultStore: SEOStore = {
  configs: {
    home: {
      id: "seo-home",
      page_slug: "home",
      meta_title: "Dodail Solutions | AI Automation & Business Growth Platform",
      meta_description: "Turn repetitive operations into autonomous growth with custom AI agents and Next.js engineering.",
      canonical_url: "https://www.dodail.com",
      robots_directive: "all",
      og_title: "Dodail Solutions | AI Automation & Business Growth",
      og_description: "Turn repetitive operations into autonomous growth with custom AI agents.",
      og_image: "/brand/dodail-full-logo.png",
      structured_data_type: "Organization",
      sitemap_include: true,
      sitemap_priority: 1.0,
      sitemap_changefreq: "daily",
      updated_at: new Date().toISOString(),
    },
    "solutions/ai-automation": {
      id: "seo-sol-auto",
      page_slug: "solutions/ai-automation",
      meta_title: "AI Automation Platform | Autonomous Workflows | Dodail Solutions",
      meta_description: "Architect dependable multi-agent AI workflows that eliminate repetitive operations and sync directly into your database.",
      canonical_url: "https://www.dodail.com/solutions/ai-automation",
      robots_directive: "all",
      structured_data_type: "Service",
      sitemap_include: true,
      sitemap_priority: 0.9,
      sitemap_changefreq: "weekly",
      updated_at: new Date().toISOString(),
    },
  },
  redirects: defaultRedirects,
  keywords: defaultKeywords,
  backlinks: defaultBacklinks,
};

function readSEOStore(): SEOStore {
  try {
    if (fs.existsSync(SEO_STORE_FILE)) {
      const data = fs.readFileSync(SEO_STORE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {}
  return defaultStore;
}

function writeSEOStore(store: SEOStore) {
  try {
    fs.writeFileSync(SEO_STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write SEO store:", e);
  }
}

// ================= REDIRECTS API =================

export async function getAllRedirects(): Promise<SEORedirect[]> {
  const store = readSEOStore();
  return store.redirects;
}

export async function saveRedirect(redirect: Partial<SEORedirect>): Promise<SEORedirect> {
  const store = readSEOStore();
  const existingIdx = store.redirects.findIndex((r) => r.id === redirect.id || r.source === redirect.source);

  const item: SEORedirect = {
    id: redirect.id || `red-${Date.now()}`,
    source: redirect.source || "/",
    destination: redirect.destination || "/",
    status_code: redirect.status_code || 301,
    reason: redirect.reason || "Manual redirect configured in SEO Control Center",
    created_by: redirect.created_by || "admin@dodail.com",
    created_at: redirect.created_at || new Date().toISOString(),
    hit_count: redirect.hit_count || 0,
  };

  if (existingIdx >= 0) {
    store.redirects[existingIdx] = { ...store.redirects[existingIdx], ...item };
  } else {
    store.redirects.unshift(item);
  }

  writeSEOStore(store);
  return item;
}

export async function deleteRedirect(id: string): Promise<boolean> {
  const store = readSEOStore();
  store.redirects = store.redirects.filter((r) => r.id !== id);
  writeSEOStore(store);
  return true;
}

// ================= KEYWORDS DATABASE =================

export async function getAllKeywords(): Promise<KeywordPlan[]> {
  const store = readSEOStore();
  return store.keywords;
}

export async function saveKeyword(kw: Partial<KeywordPlan>): Promise<KeywordPlan> {
  const store = readSEOStore();
  const existingIdx = store.keywords.findIndex((k) => k.id === kw.id || k.query.toLowerCase() === kw.query?.toLowerCase());

  const item: KeywordPlan = {
    id: kw.id || `kw-${Date.now()}`,
    query: kw.query || "",
    search_intent: kw.search_intent || "Commercial",
    audience: kw.audience || "Business Decision Makers",
    industry: kw.industry || "Technology",
    geography: kw.geography || "India",
    target_url: kw.target_url || "/",
    owner: kw.owner || "SEO Specialist",
    status: kw.status || "Planned",
    notes: kw.notes || "",
    updated_at: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    store.keywords[existingIdx] = { ...store.keywords[existingIdx], ...item };
  } else {
    store.keywords.unshift(item);
  }

  writeSEOStore(store);
  return item;
}

// ================= BACKLINKS TRACKER =================

export async function getAllBacklinks(): Promise<BacklinkTrackerItem[]> {
  const store = readSEOStore();
  return store.backlinks;
}

export async function saveBacklink(item: Partial<BacklinkTrackerItem>): Promise<BacklinkTrackerItem> {
  const store = readSEOStore();
  const existingIdx = store.backlinks.findIndex((b) => b.id === item.id);

  const record: BacklinkTrackerItem = {
    id: item.id || `bl-${Date.now()}`,
    prospect_source: item.prospect_source || "Industry Publication",
    domain_authority: item.domain_authority,
    contact_person: item.contact_person,
    contact_email: item.contact_email,
    outreach_status: item.outreach_status || "Identified",
    target_url: item.target_url || "/",
    earned_link_url: item.earned_link_url,
    anchor_text: item.anchor_text,
    link_rel: item.link_rel || "follow",
    notes: item.notes,
    created_at: item.created_at || new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    store.backlinks[existingIdx] = { ...store.backlinks[existingIdx], ...record };
  } else {
    store.backlinks.unshift(record);
  }

  writeSEOStore(store);
  return record;
}

// ================= SEO AUDIT RUNNER =================

export async function runSEOAudit(): Promise<{ issues: SEOAuditIssue[]; score: number }> {
  const issues: SEOAuditIssue[] = [];

  // 1. Audit core public routes
  const publicRoutes = [
    { slug: "/", title: "Dodail Solutions | AI Automation & Business Growth Platform", desc: "Turn repetitive operations into autonomous growth with custom AI agents and Next.js engineering.", canonical: "https://www.dodail.com" },
    { slug: "/about", title: "About Dodail Solutions | Engineering AI Automation & Growth", desc: "Discover how Dodail Solutions designs autonomous operations for modern businesses.", canonical: "https://www.dodail.com/about" },
    { slug: "/solutions/ai-automation", title: "AI Automation Platform | Dodail Solutions", desc: "Autonomous AI workflows for enterprise operations.", canonical: "https://www.dodail.com/solutions/ai-automation" },
    { slug: "/solutions/ai-lead-management", title: "AI Lead Management | Instant Qualification", desc: "Engage leads in sub-60 seconds with verified qualification.", canonical: "https://www.dodail.com/solutions/ai-lead-management" },
    { slug: "/work", title: "Case Studies & Work | Dodail Solutions", desc: "Measured client outcomes and verified business automation results.", canonical: "https://www.dodail.com/work" },
    { slug: "/consultation", title: "Book an AI Automation Consultation | Dodail Solutions", desc: "Schedule a 30-minute architecture discovery session with our senior engineers.", canonical: "https://www.dodail.com/consultation" },
  ];

  for (const page of publicRoutes) {
    // Check title length
    if (page.title.length < 30) {
      issues.push({
        id: `aud-${page.slug}-title-short`,
        severity: "warning",
        rule: "Title Tag Too Short",
        target_url: page.slug,
        message: `Title length (${page.title.length} chars) is below recommended 30 characters.`,
        remediation: "Add specific brand positioning or outcome phrase (recommended 40-60 characters).",
      });
    } else if (page.title.length > 70) {
      issues.push({
        id: `aud-${page.slug}-title-long`,
        severity: "notice",
        rule: "Title Tag May Truncate",
        target_url: page.slug,
        message: `Title length (${page.title.length} chars) may truncate on mobile SERPs.`,
        remediation: "Keep titles under 60-65 characters to avoid SERP ellipsis.",
      });
    }

    // Check description length
    if (page.desc.length < 80) {
      issues.push({
        id: `aud-${page.slug}-desc-short`,
        severity: "warning",
        rule: "Meta Description Too Short",
        target_url: page.slug,
        message: `Description length (${page.desc.length} chars) does not maximize SERP snippet space.`,
        remediation: "Expand description to 120-155 characters with a clear call-to-action.",
      });
    }
  }

  // 2. Check for redirect chains & spam neutralization
  const store = readSEOStore();
  const hackedRoutes = store.redirects.filter((r) => r.status_code === 410);
  if (hackedRoutes.length === 0) {
    issues.push({
      id: "aud-spam-410-missing",
      severity: "critical",
      rule: "Spam URLs Not Neutralized",
      target_url: "/slot-gacor",
      message: "Legacy casino spam URLs must return HTTP 410 Gone to signal removal to Googlebot.",
      remediation: "Add explicit 410 Gone redirect rules for identified malicious legacy URLs.",
    });
  }

  // Calculate score (100 base minus deductions)
  let deductions = 0;
  issues.forEach((iss) => {
    if (iss.severity === "critical") deductions += 25;
    else if (iss.severity === "warning") deductions += 10;
    else if (iss.severity === "notice") deductions += 5;
  });
  const score = Math.max(30, 100 - deductions);

  return { issues, score };
}

// ================= INTERNAL LINK SUGGESTIONS =================

export function getInternalLinkSuggestions(): InternalLinkSuggestion[] {
  return [
    {
      source_slug: "/solutions/ai-automation",
      target_slug: "/solutions/ai-lead-management",
      suggested_anchor: "AI lead qualification engine",
      context_snippet: "For sales teams experiencing response delays, pairing workflow automation with an...",
      rationale: "High contextual relevance; guides users from operational automation to lead capture.",
    },
    {
      source_slug: "/industries/dental",
      target_slug: "/solutions/ai-customer-support",
      suggested_anchor: "24/7 intelligent patient answering",
      context_snippet: "Ensure emergency appointments and treatment queries are addressed using...",
      rationale: "Directly solves after-hours clinic patient enquiry drops.",
    },
    {
      source_slug: "/services/web-development",
      target_slug: "/services/digital-growth-seo",
      suggested_anchor: "Generative Engine Optimization (GEO)",
      context_snippet: "Modern web architecture must be paired with technical indexing and...",
      rationale: "Upsells web engineering clients into technical search visibility.",
    },
  ];
}
