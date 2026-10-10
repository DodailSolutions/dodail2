import { supabase, supabaseAdmin } from "@/lib/supabase";
import { CMSPage, CMSBlock, PageRevision, GlobalNavigation, GlobalFooter, GlobalTheme, BlogPost, MediaAsset, PageStatus } from "./types";
import { validateSlug } from "./sanitize";
import fs from "fs";
import path from "path";

// Local file storage fallback to guarantee data persistence across sessions even if remote database tables are initializing
const STORAGE_FILE = path.join(process.cwd(), "cms-store.json");

export interface CMSStore {
  pages: CMSPage[];
  revisions: PageRevision[];
  blogPosts: BlogPost[];
  mediaAssets: MediaAsset[];
  globalSettings: Record<string, any>;
  auditLogs: Array<{ action: string; entity: string; user: string; timestamp: string }>;
}

const defaultStore: CMSStore = {
  pages: [
    {
      id: "home-page-id",
      slug: "home",
      title: "Homepage",
      template: "default",
      status: "published",
      author_email: "admin@dodail.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      publish_date: new Date().toISOString(),
      preview_token: "preview-home-token",
      seo_metadata: {
        meta_title: "Dodail Solutions | AI Automation & Business Growth Platform",
        meta_description: "Turn repetitive operations into autonomous growth with custom AI agents and Next.js engineering.",
      },
      sections: [
        {
          id: "hero-1",
          type: "hero",
          badge: "AI Automation & Business Growth Partner",
          headline: "Turn Repetitive Operations Into Autonomous Growth",
          subheadline: "Dodail Solutions architects dependable AI workflows, intelligent lead qualification engines, and high-performance software.",
          ctaPrimaryLabel: "Book an AI Consultation",
          ctaPrimaryLink: "/consultation",
          ctaSecondaryLabel: "Explore Solutions",
          ctaSecondaryLink: "/solutions/ai-automation",
        },
        {
          id: "cards-1",
          type: "cards",
          badge: "Why Automated Operations",
          title: "Eliminate The 4 Costliest Revenue Bottlenecks",
          description: "Manual processes slow down conversions and exhaust team bandwidth.",
          items: [
            { title: "Delayed Lead Response", description: "Inquiries sitting for hours before human review lose 80% conversion chance." },
            { title: "Unqualified Inquiries", description: "Sales teams waste 60% of their day answering basic FAQs instead of closing." },
            { title: "Fragmented Silos", description: "Leads scattered across WhatsApp chats, unorganized inboxes, and messy spreadsheets." },
            { title: "Repetitive Manual Work", description: "Copy-pasting data, sending PDF brochures, and manual reminder calls." },
          ],
        },
        {
          id: "services-1",
          type: "services",
          badge: "Core Architectures",
          title: "Engineered For Measurable Business Outcomes",
          description: "Deterministic, hardened automations that integrate into your existing tools.",
          items: [
            { title: "AI Lead Qualification", description: "Engages in sub-60-second natural language qualification and pushes directly to CRM.", href: "/solutions/ai-lead-management" },
            { title: "24/7 AI Customer Support", description: "Resolves 65% of repetitive tier-1 inquiries trained on your private knowledge base.", href: "/solutions/ai-customer-support" },
            { title: "Workflow Pipelines", description: "Durable PostgreSQL-backed queues connecting Google Sheets, WhatsApp, and databases.", href: "/solutions/workflow-automation" },
          ],
        },
        {
          id: "cta-1",
          type: "cta",
          badge: "Ready to Upgrade?",
          headline: "Schedule a Confidential AI Feasibility Audit",
          description: "Speak with a Dodail solutions engineer to map out your highest-ROI automation opportunities.",
          buttonLabel: "Book Feasibility Call",
          buttonLink: "/consultation",
        },
      ],
    },
  ],
  revisions: [],
  blogPosts: [
    {
      id: "blog-1",
      slug: "generative-engine-optimization-tools",
      title: "10 Must-Have Tools for Generative Engine Optimization (GEO)",
      excerpt: "How forward-thinking brands analyze AI crawler citations and monitor Perplexity/ChatGPT visibility.",
      content_markdown: "Generative Engine Optimization (GEO) represents the next frontier beyond traditional keyword-based search engine optimization...",
      category: "AI & Search",
      tags: ["GEO", "AI Search", "Perplexity"],
      status: "draft",
      author_name: "Dodail Technical Team",
      created_at: "2025-08-01T00:00:00.000Z",
      updated_at: "2025-08-01T00:00:00.000Z",
      publish_date: null,
    },
    {
      id: "blog-2",
      slug: "geo-workflow-ai-powered-content",
      title: "The Complete GEO Workflow for AI-Powered Content Strategies",
      excerpt: "A step-by-step technical framework for structuring semantic content clusters that search bots reliably extract.",
      content_markdown: "Building a repeatable workflow for Generative Engine Optimization requires three foundational components...",
      category: "Search Strategy",
      tags: ["Content Clustering", "Schema"],
      status: "draft",
      author_name: "Dodail Technical Team",
      created_at: "2025-08-01T00:00:00.000Z",
      updated_at: "2025-08-01T00:00:00.000Z",
      publish_date: null,
    },
  ],
  mediaAssets: [
    {
      id: "media-1",
      file_name: "dodail-emblem.png",
      file_url: "/brand/dodail-emblem.png",
      file_size: 41984,
      mime_type: "image/png",
      alt_text: "Official Dodail Circular Emblem",
      caption: "Primary Brand Symbol",
      focal_point: { x: 50, y: 50 },
      usage_count: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "media-2",
      file_name: "dodail-full-logo.png",
      file_url: "/brand/dodail-full-logo.png",
      file_size: 81920,
      mime_type: "image/png",
      alt_text: "Official Dodail Full Wordmark Logo",
      caption: "Primary Header Wordmark",
      focal_point: { x: 50, y: 50 },
      usage_count: 3,
      created_at: new Date().toISOString(),
    },
  ],
  globalSettings: {
    navigation: {
      header_cta_label: "Book AI Consultation",
      header_cta_link: "/consultation",
      links: [
        { label: "Solutions", href: "/solutions/ai-automation" },
        { label: "Services", href: "/services/web-development" },
        { label: "Industries", href: "/industries" },
        { label: "Work", href: "/work" },
        { label: "Blog", href: "/blog" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    footer: {
      company_legal_name: "Dodail Solutions Private Limited",
      founded_year: 2019,
      tagline: "Think Growth. Think Dodail.",
      phone: "+91 99664 00235",
      email: "info@dodail.com",
      address: "Hyderabad, Telangana 500081, India",
      social_links: {
        linkedin: "https://www.linkedin.com/company/dodail/",
        twitter: "https://x.com/dodailpvtltd",
        facebook: "https://www.facebook.com/DodailSolutionPvtLtd/",
        instagram: "https://www.instagram.com/dodail/",
        youtube: "https://www.youtube.com/@dodail",
      },
    },
    theme: {
      brand_orange: "#FA5B0F",
      brand_orange_hover: "#FF6C26",
      brand_navy: "#0A1B2A",
      brand_navy_surface: "#0E2235",
      border_radius: "rounded-2xl",
      motion_enabled: true,
    },
    announcement: {
      is_active: false,
      message: "Dodail 2.0 AI Automation Architecture is now live.",
      link: "/solutions/ai-automation",
    },
  },
  auditLogs: [],
};

export function readLocalStore(): CMSStore {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STORAGE_FILE, "utf-8"));
      // Fill any collections missing from older or hand-edited store files.
      return { ...defaultStore, ...data, globalSettings: { ...defaultStore.globalSettings, ...data.globalSettings } };
    }
  } catch (e) {
    // fallback
  }
  return defaultStore;
}

export function writeLocalStore(store: CMSStore): boolean {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(store, null, 2), "utf-8");
    return true;
  } catch {
    // Read-only filesystems (serverless) rely on Supabase alone.
    return false;
  }
}

// ================= PAGES API =================

export async function getAllPages(): Promise<CMSPage[]> {
  try {
    const { data, error } = await supabaseAdmin.from("pages").select("*").order("updated_at", { ascending: false });
    if (!error && data && data.length > 0) {
      return data as CMSPage[];
    }
  } catch (e) {
    // Fall back to local persistent store
  }
  const store = readLocalStore();
  return store.pages;
}

export async function getPageById(id: string): Promise<CMSPage | null> {
  try {
    const { data, error } = await supabaseAdmin.from("pages").select("*").eq("id", id).single();
    if (!error && data) {
      return data as CMSPage;
    }
  } catch (e) {}
  const store = readLocalStore();
  return store.pages.find((p) => p.id === id) || null;
}

export async function getPageBySlug(slug: string, previewToken?: string): Promise<CMSPage | null> {
  const norm = slug.replace(/^\/+|\/+$/g, "");
  try {
    let query = supabaseAdmin.from("pages").select("*").eq("slug", norm);
    if (!previewToken) {
      query = query.eq("status", "published");
    }
    const { data, error } = await query.single();
    if (!error && data) {
      return data as CMSPage;
    }
  } catch (e) {}

  const store = readLocalStore();
  return store.pages.find((p) => p.slug === norm && (previewToken || p.status === "published")) || null;
}

export async function savePage(pageData: Partial<CMSPage>, userEmail: string = "admin@dodail.com"): Promise<CMSPage> {
  const store = readLocalStore();
  const now = new Date().toISOString();
  let existingIndex = store.pages.findIndex((p) => p.id === pageData.id || p.slug === pageData.slug);

  let pageToSave: CMSPage;

  if (existingIndex >= 0) {
    const prev = store.pages[existingIndex];
    // Create Revision checkpoint
    const rev: PageRevision = {
      id: `rev-${Date.now()}`,
      page_id: prev.id,
      version: (store.revisions.filter((r) => r.page_id === prev.id).length || 0) + 1,
      title: prev.title,
      sections: prev.sections,
      seo_metadata: prev.seo_metadata,
      change_summary: `Updated by ${userEmail}`,
      created_by: userEmail,
      created_at: now,
    };
    store.revisions.unshift(rev);

    pageToSave = {
      ...prev,
      ...pageData,
      updated_at: now,
    };
    store.pages[existingIndex] = pageToSave;
  } else {
    pageToSave = {
      id: pageData.id || `page-${Date.now()}`,
      slug: pageData.slug || `page-${Date.now()}`,
      title: pageData.title || "Untitled Page",
      template: pageData.template || "default",
      sections: pageData.sections || [],
      status: pageData.status || "draft",
      author_email: userEmail,
      seo_metadata: pageData.seo_metadata || {},
      publish_date: pageData.status === "published" ? now : null,
      preview_token: `token-${Date.now()}`,
      created_at: now,
      updated_at: now,
    };
    store.pages.unshift(pageToSave);
  }

  // Audit Log
  store.auditLogs.unshift({
    action: existingIndex >= 0 ? "UPDATE_PAGE" : "CREATE_PAGE",
    entity: pageToSave.slug,
    user: userEmail,
    timestamp: now,
  });

  writeLocalStore(store);

  // Attempt Supabase push
  try {
    await supabaseAdmin.from("pages").upsert({
      id: pageToSave.id,
      slug: pageToSave.slug,
      title: pageToSave.title,
      template: pageToSave.template,
      sections: pageToSave.sections,
      status: pageToSave.status,
      author_email: pageToSave.author_email,
      seo_metadata: pageToSave.seo_metadata,
      publish_date: pageToSave.publish_date,
      preview_token: pageToSave.preview_token,
      updated_at: pageToSave.updated_at,
    });
  } catch (e) {}

  return pageToSave;
}

export async function deletePage(id: string, userEmail: string = "admin@dodail.com"): Promise<boolean> {
  const store = readLocalStore();
  const page = store.pages.find((p) => p.id === id);
  if (!page) return false;

  store.pages = store.pages.filter((p) => p.id !== id);
  store.auditLogs.unshift({
    action: "DELETE_PAGE",
    entity: page.slug,
    user: userEmail,
    timestamp: new Date().toISOString(),
  });
  writeLocalStore(store);

  try {
    await supabaseAdmin.from("pages").delete().eq("id", id);
  } catch (e) {}

  return true;
}

export async function getPageRevisions(pageId: string): Promise<PageRevision[]> {
  try {
    const { data, error } = await supabaseAdmin.from("page_revisions").select("*").eq("page_id", pageId).order("version", { ascending: false });
    if (!error && data && data.length > 0) {
      return data as PageRevision[];
    }
  } catch (e) {}

  const store = readLocalStore();
  return store.revisions.filter((r) => r.page_id === pageId);
}

export async function restorePageRevision(pageId: string, revisionId: string, userEmail: string = "admin@dodail.com"): Promise<CMSPage | null> {
  const store = readLocalStore();
  const rev = store.revisions.find((r) => r.id === revisionId);
  const page = store.pages.find((p) => p.id === pageId);
  if (!rev || !page) return null;

  return savePage({
    id: pageId,
    title: rev.title,
    sections: rev.sections,
    seo_metadata: rev.seo_metadata,
  }, `Restored revision #${rev.version} by ${userEmail}`);
}

// ================= GLOBAL SETTINGS =================

export interface NormalizedGlobalSettings {
  navigation: {
    items: Array<{ label: string; href: string }>;
    announcement: { enabled: boolean; text: string; link: string };
  };
  theme: { primaryColor: string; navyColor: string; borderRadius: string };
  footer: { copyrightText: string };
  [key: string]: unknown;
}

/**
 * Settings have been saved in two shapes over time: the seed shape
 * (navigation.links, top-level announcement, theme.brand_orange) and the editor
 * shape (navigation.items, navigation.announcement, theme.primaryColor).
 * Accept both and always return the editor shape, so no caller sees undefined.
 */
function normalizeGlobalSettings(raw: Record<string, any> = {}): NormalizedGlobalSettings {
  const nav = raw.navigation ?? {};
  const legacyAnnouncement = raw.announcement ?? {};
  const theme = raw.theme ?? {};
  const footer = raw.footer ?? {};
  const items = Array.isArray(nav.items) ? nav.items : Array.isArray(nav.links) ? nav.links : [];

  return {
    ...raw,
    navigation: {
      ...nav,
      items,
      announcement: {
        enabled: Boolean(nav.announcement?.enabled ?? legacyAnnouncement.is_active ?? false),
        text: String(nav.announcement?.text ?? legacyAnnouncement.message ?? ""),
        link: String(nav.announcement?.link ?? legacyAnnouncement.link ?? ""),
      },
    },
    theme: {
      ...theme,
      primaryColor: theme.primaryColor ?? theme.brand_orange ?? "#FA5B0F",
      navyColor: theme.navyColor ?? theme.brand_navy ?? "#0A1B2A",
      borderRadius: theme.borderRadius ?? theme.border_radius ?? "rounded-lg",
    },
    footer: {
      ...footer,
      copyrightText:
        footer.copyrightText ??
        `© ${new Date().getFullYear()} ${footer.company_legal_name ?? "Dodail Solutions Private Limited"}. All rights reserved.`,
    },
  };
}

export async function getGlobalSettings<T = any>(key?: "navigation" | "footer" | "theme" | "announcement" | string): Promise<T> {
  const store = readLocalStore();
  if (!key) {
    return normalizeGlobalSettings(store.globalSettings) as T;
  }

  try {
    const { data, error } = await supabaseAdmin.from("global_settings").select("data").eq("id", key).single();
    if (!error && data) {
      return data.data as T;
    }
  } catch (e) {}

  return (store.globalSettings[key] || (defaultStore.globalSettings as any)[key]) as T;
}

export async function saveGlobalSettings(
  keyOrData: string | Record<string, any>,
  dataMaybe?: any,
  userEmail: string = "admin@dodail.com"
): Promise<boolean> {
  const store = readLocalStore();
  const now = new Date().toISOString();

  if (typeof keyOrData === "string") {
    const key = keyOrData;
    const data = dataMaybe;
    store.globalSettings[key] = data;
    store.auditLogs.unshift({
      action: "UPDATE_GLOBAL_SETTING",
      entity: key,
      user: userEmail,
      timestamp: now,
    });
    writeLocalStore(store);

    try {
      await supabaseAdmin.from("global_settings").upsert({
        id: key,
        data,
        updated_by: userEmail,
        updated_at: now,
      });
    } catch (e) {}
  } else {
    // Dictionary of settings
    Object.assign(store.globalSettings, keyOrData);
    store.auditLogs.unshift({
      action: "UPDATE_GLOBAL_SETTINGS_BULK",
      entity: "all",
      user: userEmail,
      timestamp: now,
    });
    writeLocalStore(store);

    for (const [k, v] of Object.entries(keyOrData)) {
      try {
        await supabaseAdmin.from("global_settings").upsert({
          id: k,
          data: v,
          updated_by: userEmail,
          updated_at: now,
        });
      } catch (e) {}
    }
  }

  return true;
}

// ================= BLOG POSTS =================
// Articles live in ./blog.ts (listPosts, savePost, deletePost, …).

/** True when the item is published (or scheduled) and its publish date (if any) has passed. */
function isLive(item: { status: string; publish_date?: string | null }) {
  if (item.status !== "published" && item.status !== "scheduled") return false;
  if (!item.publish_date) return item.status === "published";
  return Date.parse(item.publish_date) <= Date.now();
}

/** Published custom pages (public site and sitemap). */
export async function getPublishedPages(): Promise<CMSPage[]> {
  return (await getAllPages()).filter(isLive);
}

// ================= MEDIA ASSETS =================

export async function getAllMediaAssets(): Promise<MediaAsset[]> {
  try {
    const { data, error } = await supabaseAdmin.from("media_assets").select("*").order("created_at", { ascending: false });
    if (!error && data && data.length > 0) {
      return data as MediaAsset[];
    }
  } catch (e) {}

  const store = readLocalStore();
  return store.mediaAssets;
}

export async function saveMediaAsset(asset: Partial<MediaAsset>): Promise<MediaAsset> {
  const store = readLocalStore();
  const newAsset: MediaAsset = {
    id: asset.id || `media-${Date.now()}`,
    file_name: asset.file_name || "asset.png",
    file_url: asset.file_url || "/brand/dodail-emblem.png",
    file_size: asset.file_size || 40960,
    mime_type: asset.mime_type || "image/png",
    alt_text: asset.alt_text || "",
    caption: asset.caption || "",
    focal_point: asset.focal_point || { x: 50, y: 50 },
    usage_count: asset.usage_count || 1,
    created_at: new Date().toISOString(),
  };

  store.mediaAssets.unshift(newAsset);
  writeLocalStore(store);

  try {
    await supabaseAdmin.from("media_assets").upsert(newAsset);
  } catch (e) {}

  return newAsset;
}

// ================= DURABLE SCHEDULED PUBLISHING =================

export async function runScheduledPublishing(): Promise<{ publishedCount: number; logs: string[] }> {
  const now = new Date();
  const store = readLocalStore();
  let count = 0;
  const logs: string[] = [];

  // Check scheduled pages
  for (const page of store.pages) {
    if (page.status === "scheduled" && page.publish_date && new Date(page.publish_date) <= now) {
      page.status = "published";
      count++;
      const log = `Published scheduled page "${page.title}" (${page.slug}) at ${now.toISOString()}`;
      logs.push(log);
      store.auditLogs.unshift({
        action: "AUTO_PUBLISH_PAGE",
        entity: page.slug,
        user: "system_cron",
        timestamp: now.toISOString(),
      });
    }
  }

  // Scheduled blog posts go live by themselves once their publish date passes (see blog.ts isPostLive).


  if (count > 0) {
    writeLocalStore(store);
  }

  return { publishedCount: count, logs };
}

// Aliases for unified route conventions
export const createPage = (data: Partial<CMSPage>, userEmail?: string) => savePage(data, userEmail);
export const updatePage = (id: string, data: Partial<CMSPage>, userEmail?: string) => savePage({ ...data, id }, userEmail);
export const revertPageRevision = restorePageRevision;

