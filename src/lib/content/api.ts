import fs from "fs";
import path from "path";
import { EditorialTopic, SocialAccountConnection, SocialPost, SocialPlatform } from "./types";
import { getAllBlogPosts, saveBlogPost } from "@/lib/cms/api";

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
      "The true revenue cost of delayed lead response",
      "Why single LLM prompts fail under volume",
      "Multi-agent architecture: Parser, Qualifier, and CRM Sync",
      "Deterministic verification and human escalation fallbacks",
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
      "The clinical bottleneck: missed slots and reception bandwidth",
      "Automated WhatsApp confirmations vs manual calling",
      "Calendar slot reconciliation and dynamic waitlists",
      "Implementation checklist for Indian clinic operators",
    ],
    created_at: "2026-04-09T00:00:00Z",
    updated_at: "2026-04-09T00:00:00Z",
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
    api_requirements_note: "Requires Meta Business Verification and App Review for pages_manage_posts permission.",
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
    api_requirements_note: "Requires Instagram Professional Account linked to a verified Meta Business Page.",
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
    api_requirements_note: "Requires LinkedIn Developer Portal Community Management API approval.",
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
      return JSON.parse(data);
    }
  } catch (e) {}
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

// ================= SOCIAL ACCOUNTS API =================

export async function getSocialAccounts(): Promise<SocialAccountConnection[]> {
  const store = readContentStore();
  return store.socialAccounts;
}

// ================= SOCIAL POSTS API =================

export async function getAllSocialPosts(): Promise<SocialPost[]> {
  const store = readContentStore();
  return store.socialPosts;
}

export async function saveSocialPost(post: Partial<SocialPost>, userEmail: string = "admin@dodail.com"): Promise<SocialPost> {
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

// ================= AI CONTENT OUTLINE ENGINE =================

export async function generateEditorialOutline(topicTitle: string, keyword: string): Promise<string[]> {
  return [
    `1. Industry Context: The root operational bottleneck in ${topicTitle.split(":")[0]}`,
    `2. Why conventional approaches fail (Manual spreadsheets vs fragmented tools)`,
    `3. The Dodail Architecture: Deterministic pipelines, database integrity & AI agents`,
    `4. Step-by-step implementation roadmap & integration checklist`,
    `5. Measurable business outcomes and next architecture discovery actions`,
  ];
}
