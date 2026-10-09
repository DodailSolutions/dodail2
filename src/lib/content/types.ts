export type ContentStatus =
  | "idea"
  | "outlined"
  | "draft"
  | "in_review"
  | "approved"
  | "scheduled"
  | "published"
  | "archived";

export type SocialPlatform = "facebook" | "instagram" | "linkedin";

export type SocialPostStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "scheduled"
  | "published"
  | "failed";

export interface EditorialTopic {
  id: string;
  title: string;
  target_keyword: string;
  search_intent: "Informational" | "Commercial" | "Transactional";
  audience: string;
  industry: string;
  priority: "High" | "Medium" | "Low";
  owner: string;
  due_date?: string;
  status: ContentStatus;
  research_notes?: string;
  suggested_outline?: string[];
  associated_blog_slug?: string;
  created_at: string;
  updated_at: string;
}

export interface SocialAccountConnection {
  id: string;
  platform: SocialPlatform;
  account_name: string;
  account_id: string;
  is_connected: boolean;
  token_status: "valid" | "expired" | "not_connected";
  token_expires_at?: string;
  scopes_granted: string[];
  api_requirements_note: string;
  updated_at: string;
}

export interface SocialPostVariant {
  platform: SocialPlatform;
  caption: string;
  hashtags: string[];
  character_count: number;
  call_to_action: string;
  media_url?: string;
}

export interface SocialPost {
  id: string;
  topic_id?: string;
  title: string;
  variants: Record<SocialPlatform, SocialPostVariant>;
  selected_platforms: SocialPlatform[];
  status: SocialPostStatus;
  scheduled_for?: string;
  published_at?: string;
  provider_post_ids?: Record<string, string>;
  error_message?: string;
  retry_count: number;
  human_approved_by?: string;
  created_at: string;
  updated_at: string;
}
