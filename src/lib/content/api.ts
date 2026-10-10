import fs from "fs";
import path from "path";
import { EditorialTopic, SocialAccountConnection, SocialPost, SocialPlatform, SocialPostVariant } from "./types";

const CONTENT_STORE_FILE = path.join(process.cwd(), "content-store.json");

interface ContentStore {
  topics: EditorialTopic[];
  socialAccounts: SocialAccountConnection[];
  socialPosts: SocialPost[];
  auditLogs: Array<{ action: string; entity_id: string; user: string; timestamp: string }>;
}

const defaultTopics: EditorialTopic[] = [
  {
    id: "topic-1",
    title: "How Multi-Agent AI Workflows Eliminate 60% of Manual Sales Inquiries",
    target_keyword: "AI workflow automation sales inquiry qualification",
    search_intent: "Commercial",
    audience: "B2B Founders & Sales Directors",
    industry: "Enterprise Software & Professional Services",
    priority: "High",
    owner: "Content Lead",
    due_date: "2026-04-18",
    status: "approved",
    research_notes: "Focus on sub-60s qualification and API synchronization directly to CRM.",
    suggested_outline: [
      "1. The true revenue cost of delayed lead response (80% drop-off within 4 hours)",
      "2. Why single prompt LLMs fail under high traffic without validation",
      "3. The Multi-Agent Blueprint: Ingestion, Qualification & PostgreSQL Sync",
      "4. Deterministic verification and human escalation fallbacks",
      "5. Measuring ROI: Reducing sales team triage hours from 20h to 2h weekly",
    ],
    associated_blog_slug: "ai-workflow-automation-sales",
    created_at: "2026-04-09T00:00:00Z",
    updated_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "topic-2",
    title: "Healthcare Automation: Reducing Patient Appointment No-Shows in India",
    target_keyword: "dental clinic patient follow up automation",
    search_intent: "Informational",
    audience: "Healthcare Clinic Directors & Practice Managers",
    industry: "Healthcare",
    priority: "Medium",
    owner: "Vertical Researcher",
    due_date: "2026-04-22",
    status: "outlined",
    research_notes: "Examine WhatsApp Business API compliance and multi-channel calendar reminders.",
    suggested_outline: [
      "1. The clinical bottleneck: Missed slots, lost revenue, and reception bandwidth exhaustion",
      "2. Automated WhatsApp confirmations vs manual calling across tier-1 & tier-2 cities",
      "3. Real-time calendar slot reconciliation and dynamic cancellation waitlists",
      "4. Technical implementation checklist: Webhooks, Razorpay advance deposits, and SMS fallbacks",
      "5. Case outcome: 42% no-show reduction across 5 multi-specialty dental clinics",
    ],
    created_at: "2026-04-09T00:00:00Z",
    updated_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "topic-3",
    title: "B2B Logistics: Real-Time WhatsApp & ERP Invoicing Automation",
    target_keyword: "dispatch scheduling ERP automation India",
    search_intent: "Commercial",
    audience: "Managing Directors & Supply Chain Heads",
    industry: "Manufacturing & B2B Logistics",
    priority: "High",
    owner: "Operations Architect",
    due_date: "2026-04-25",
    status: "idea",
    research_notes: "Focus on SAP/Tally bridging and sub-second dispatch webhook triggers.",
    suggested_outline: [
      "1. Manual dispatch bottlenecks: The hidden overhead of paper waybills and phone follow-ups",
      "2. Automated webhook triggers bridging legacy Tally/SAP systems to modern APIs",
      "3. Driver & fleet WhatsApp notifications with instant digital POD signatures",
      "4. Security & compliance: End-to-end encrypted dispatch data and immutable audit logs",
    ],
    created_at: "2026-04-10T00:00:00Z",
    updated_at: "2026-04-10T00:00:00Z",
  },
];

const defaultAccounts: SocialAccountConnection[] = [
  {
    id: "acc-fb",
    platform: "facebook",
    account_name: "Dodail Solutions Official (Facebook Page)",
    account_id: "dodail_fb_page",
    is_connected: false,
    token_status: "not_connected",
    scopes_granted: ["pages_show_list", "pages_read_engagement", "pages_manage_posts"],
    api_requirements_note: "Requires Meta Business Verification and App Review for pages_manage_posts permission. Set META_PAGE_ACCESS_TOKEN.",
    updated_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "acc-ig",
    platform: "instagram",
    account_name: "Dodail Solutions Professional Instagram",
    account_id: "dodail_instagram",
    is_connected: false,
    token_status: "not_connected",
    scopes_granted: ["instagram_basic", "instagram_content_publish"],
    api_requirements_note: "Requires Instagram Professional Account linked to a verified Meta Business Page. Set META_PAGE_ACCESS_TOKEN.",
    updated_at: "2026-04-09T00:00:00Z",
  },
  {
    id: "acc-li",
    platform: "linkedin",
    account_name: "Dodail Solutions Private Limited (LinkedIn Org)",
    account_id: "dodail_linkedin_org",
    is_connected: false,
    token_status: "not_connected",
    scopes_granted: ["w_member_social", "w_organization_social"],
    api_requirements_note: "Requires LinkedIn Developer Portal Community Management API approval. Set LINKEDIN_CLIENT_ID or LINKEDIN_ORGANIZATION_URN.",
    updated_at: "2026-04-09T00:00:00Z",
  },
];

const defaultPosts: SocialPost[] = [
  {
    id: "post-1",
    topic_id: "topic-1",
    title: "Multi-Agent AI Announcement",
    variants: {
      linkedin: {
        platform: "linkedin",
        caption: "Inquiries waiting 4 hours for human review lose over 80% of conversion probability.\n\nAt Dodail Solutions, we engineer deterministic multi-agent workflows that qualify incoming leads in under 60 seconds and sync structured data directly to your CRM.\n\nRead our technical architecture breakdown:",
        hashtags: ["#AIAutomation", "#NextJS", "#B2BGrowth", "#Dodail"],
        character_count: 312,
        call_to_action: "Explore Architecture: https://www.dodail.com/solutions/ai-lead-management",
        media_url: "/brand/dodail-full-logo.png",
      },
      facebook: {
        platform: "facebook",
        caption: "Tired of leads slipping through WhatsApp and spreadsheet cracks? Dodail Solutions builds automated workflows that engage your prospective clients instantly.",
        hashtags: ["#DodailSolutions", "#BusinessAutomation"],
        character_count: 165,
        call_to_action: "Book a consultation at https://www.dodail.com/consultation",
        media_url: "/brand/dodail-full-logo.png",
      },
      instagram: {
        platform: "instagram",
        caption: "Automate repetitive business bottlenecks with engineered AI workflows.\n\nSwipe to see how Dodail synchronizes Google Sheets, WhatsApp, and PostgreSQL pipelines.",
        hashtags: ["#TechIndia", "#AIWorkflow", "#SoftwareEngineering"],
        character_count: 198,
        call_to_action: "Link in bio to read full case study.",
        media_url: "/brand/dodail-full-logo.png",
      },
    },
    selected_platforms: ["linkedin", "facebook", "instagram"],
    status: "approved",
    human_approved_by: "raviteja@dodail.com",
    retry_count: 0,
    created_at: "2026-04-09T00:00:00Z",
    updated_at: "2026-04-09T00:00:00Z",
  },
];

const defaultStore: ContentStore = {
  topics: defaultTopics,
  socialAccounts: defaultAccounts,
  socialPosts: defaultPosts,
  auditLogs: [],
};

function readContentStore(): ContentStore {
  try {
    if (fs.existsSync(CONTENT_STORE_FILE)) {
      const data = fs.readFileSync(CONTENT_STORE_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === "object") {
        return {
          topics: parsed.topics || defaultTopics,
          socialAccounts: parsed.socialAccounts || defaultAccounts,
          socialPosts: parsed.socialPosts || defaultPosts,
          auditLogs: parsed.auditLogs || [],
        };
      }
    }
  } catch (e) {
    console.error("Failed to read content store:", e);
  }
  return defaultStore;
}

function writeContentStore(store: ContentStore) {
  try {
    fs.writeFileSync(CONTENT_STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write content store:", e);
  }
}

// ================= TOPIC BACKLOG API =================

export async function getAllTopics(): Promise<EditorialTopic[]> {
  const store = readContentStore();
  return store.topics;
}

export async function saveTopic(topic: Partial<EditorialTopic>, userEmail: string = "admin@dodail.com"): Promise<EditorialTopic> {
  const store = readContentStore();
  const existingIdx = store.topics.findIndex((t) => t.id === topic.id);

  let item: EditorialTopic;
  if (existingIdx >= 0) {
    item = { ...store.topics[existingIdx], ...topic, updated_at: new Date().toISOString() };
    store.topics[existingIdx] = item;
  } else {
    item = {
      id: topic.id || `topic-${Date.now()}`,
      title: topic.title || "Untitled Topic",
      target_keyword: topic.target_keyword || "",
      search_intent: topic.search_intent || "Informational",
      audience: topic.audience || "Business Decision Makers",
      industry: topic.industry || "General Technology",
      priority: topic.priority || "Medium",
      owner: topic.owner || userEmail,
      due_date: topic.due_date,
      status: topic.status || "idea",
      research_notes: topic.research_notes || "",
      suggested_outline: topic.suggested_outline || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.topics.unshift(item);
  }

  writeContentStore(store);
  return item;
}

export async function deleteTopic(id: string): Promise<boolean> {
  const store = readContentStore();
  const initLength = store.topics.length;
  store.topics = store.topics.filter((t) => t.id !== id);
  if (store.topics.length !== initLength) {
    writeContentStore(store);
    return true;
  }
  return false;
}

export async function updateTopic(id: string, updates: Partial<EditorialTopic>): Promise<EditorialTopic | null> {
  const store = readContentStore();
  const idx = store.topics.findIndex((t) => t.id === id);
  if (idx < 0) return null;

  const updated: EditorialTopic = {
    ...store.topics[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  store.topics[idx] = updated;
  writeContentStore(store);
  return updated;
}

// ================= SOCIAL ACCOUNTS API =================

export async function getSocialAccounts(): Promise<SocialAccountConnection[]> {
  const store = readContentStore();
  
  // Real environment token detection
  const hasMeta = Boolean(process.env.META_PAGE_ACCESS_TOKEN || process.env.META_APP_SECRET);
  const hasLinkedIn = Boolean(
    process.env.LINKEDIN_CLIENT_ID ||
    process.env.LINKEDIN_ORGANIZATION_URN ||
    process.env.LINKEDIN_ACCESS_TOKEN
  );

  return store.socialAccounts.map((acc) => {
    if (acc.platform === "facebook" || acc.platform === "instagram") {
      if (hasMeta) {
        return {
          ...acc,
          is_connected: true,
          token_status: "valid",
          api_requirements_note: "Meta Graph API token configured in environment variables. Ready for live publishing.",
        };
      }
    }
    if (acc.platform === "linkedin") {
      if (hasLinkedIn) {
        return {
          ...acc,
          is_connected: true,
          token_status: "valid",
          api_requirements_note: "LinkedIn Community Management credentials configured. Ready for corporate publishing.",
        };
      }
    }
    return acc;
  });
}

export async function updateSocialAccount(
  id: string,
  updates: Partial<SocialAccountConnection>
): Promise<SocialAccountConnection | null> {
  const store = readContentStore();
  const idx = store.socialAccounts.findIndex((a) => a.id === id);
  if (idx < 0) return null;

  const updated: SocialAccountConnection = {
    ...store.socialAccounts[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  store.socialAccounts[idx] = updated;
  writeContentStore(store);
  return updated;
}

// ================= SOCIAL POSTS API =================

export async function getAllSocialPosts(): Promise<SocialPost[]> {
  const store = readContentStore();
  return store.socialPosts;
}

export async function saveSocialPost(
  post: Partial<SocialPost>,
  userEmail: string = "admin@dodail.com"
): Promise<SocialPost> {
  const store = readContentStore();
  const existingIdx = store.socialPosts.findIndex((p) => p.id === post.id);

  let item: SocialPost;
  if (existingIdx >= 0) {
    item = { ...store.socialPosts[existingIdx], ...post, updated_at: new Date().toISOString() };
    store.socialPosts[existingIdx] = item;
  } else {
    item = {
      id: post.id || `post-${Date.now()}`,
      topic_id: post.topic_id,
      title: post.title || "New Social Campaign",
      variants: post.variants || ({} as any),
      selected_platforms: post.selected_platforms || ["linkedin"],
      status: post.status || "draft",
      scheduled_for: post.scheduled_for,
      published_at: post.published_at,
      human_approved_by: post.human_approved_by,
      retry_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.socialPosts.unshift(item);
  }

  writeContentStore(store);
  return item;
}

export async function deleteSocialPost(id: string): Promise<boolean> {
  const store = readContentStore();
  const initLength = store.socialPosts.length;
  store.socialPosts = store.socialPosts.filter((p) => p.id !== id);
  if (store.socialPosts.length !== initLength) {
    writeContentStore(store);
    return true;
  }
  return false;
}

export async function updateSocialPost(id: string, updates: Partial<SocialPost>): Promise<SocialPost | null> {
  const store = readContentStore();
  const idx = store.socialPosts.findIndex((p) => p.id === id);
  if (idx < 0) return null;

  const updated: SocialPost = {
    ...store.socialPosts[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  store.socialPosts[idx] = updated;
  writeContentStore(store);
  return updated;
}

// ================= AI CONTENT OUTLINE & SOCIAL COPY SYNTHESIS =================

export async function generateEditorialOutline(topicTitle: string, keyword: string): Promise<string[]> {
  const titleClean = topicTitle.trim();
  const topicCore = titleClean.includes(":") ? titleClean.split(":")[0].trim() : titleClean;
  const kw = keyword.trim() || "AI workflow automation";

  return [
    `1. Industry Operational Baseline: The hidden revenue leakage in ${topicCore}`,
    `2. Why conventional approaches fail (Manual spreadsheets vs fragmented disconnected apps)`,
    `3. The Dodail Architectural Paradigm: Deterministic rules, PostgreSQL audit trails & AI reasoning`,
    `4. Step-by-Step Implementation Blueprint: Webhooks, ERP synchronization & fail-closed safety`,
    `5. Measurable Outcomes: Triage time cut by 80% & target keyword optimization (${kw})`,
  ];
}
