export type RobotsDirective = "all" | "noindex" | "nofollow" | "noindex, nofollow";

export type SchemaType =
  | "Organization"
  | "WebSite"
  | "Service"
  | "Article"
  | "BreadcrumbList"
  | "FAQPage";

export interface PageSEOConfig {
  id: string;
  page_slug: string; // e.g. "solutions/ai-automation" or "home"
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  robots_directive: RobotsDirective;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  structured_data_type: SchemaType;
  sitemap_include: boolean;
  sitemap_priority: number; // 0.1 to 1.0
  sitemap_changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  updated_at: string;
}

export interface SEORedirect {
  id: string;
  source: string; // e.g. "/about-dodail-leading-digital-agency-in-india"
  destination: string; // e.g. "/about"
  status_code: 301 | 302 | 410; // 301 Permanent, 302 Temporary, 410 Gone (for malicious/spam URLs)
  reason: string;
  created_by: string;
  created_at: string;
  hit_count?: number;
  last_accessed?: string;
}

export interface SEOAuditIssue {
  id: string;
  severity: "critical" | "warning" | "notice" | "info";
  rule: string;
  target_url: string;
  message: string;
  remediation: string;
}

export interface KeywordPlan {
  id: string;
  query: string;
  search_intent: "Informational" | "Navigational" | "Commercial" | "Transactional";
  audience: string;
  industry: string;
  geography: "India" | "International" | "Global";
  target_url: string;
  owner: string;
  status: "Planned" | "In Review" | "Live" | "Monitored";
  measured_impressions?: number;
  measured_clicks?: number;
  measured_ctr?: number;
  measured_position?: number;
  notes?: string;
  updated_at: string;
}

export interface BacklinkTrackerItem {
  id: string;
  prospect_source: string; // Domain / publication name
  domain_authority?: number;
  contact_person?: string;
  contact_email?: string;
  outreach_status: "Identified" | "Contacted" | "In Negotiation" | "Earned" | "Rejected" | "Lost";
  target_url: string; // Dodail landing page
  earned_link_url?: string;
  anchor_text?: string;
  link_rel: "follow" | "nofollow" | "ugc";
  last_contact_date?: string;
  response_summary?: string;
  notes?: string;
  created_at: string;
}

export interface InternalLinkSuggestion {
  source_slug: string;
  target_slug: string;
  suggested_anchor: string;
  context_snippet: string;
  rationale: string;
}
