export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "converted"
  | "unqualified"
  | "spam";

export type PipelineStage =
  | "Discovery"
  | "Architecture Review"
  | "Proposal Sent"
  | "Negotiation"
  | "Won"
  | "Lost";

export type ActivityType =
  | "note"
  | "call"
  | "meeting"
  | "task"
  | "email"
  | "form_submission"
  | "status_change";

export interface UTMAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  ip_country?: string;
}

export interface ConsentRecord {
  marketing_consent: boolean;
  terms_agreed: boolean;
  consent_timestamp: string;
  ip_address?: string;
}

export interface Company {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  size?: string;
  city?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  lead_id?: string;
  company_id?: string;
  title: string;
  value_amount: number;
  currency: "INR" | "USD" | "EUR";
  stage: PipelineStage;
  probability: number; // 0 - 100
  expected_close_date?: string;
  owner_email: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  lead_id: string;
  type: ActivityType;
  title: string;
  description?: string;
  performed_by: string;
  scheduled_for?: string;
  completed: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  normalized_email: string; // trimmed lowercase for duplicate detection
  phone?: string;
  normalized_phone?: string; // digits only
  company_name?: string;
  company_id?: string;
  job_title?: string;
  status: LeadStatus;
  score: number; // 0 - 100 qualification rating
  owner_email: string;
  deal_value?: number;
  attribution: UTMAttribution;
  consent: ConsentRecord;
  notes_summary?: string;
  tags: string[];
  is_duplicate?: boolean;
  merged_into_id?: string;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
}

export interface LeadDuplicateMatch {
  lead_id: string;
  matched_lead_id: string;
  match_reason: "exact_email" | "exact_phone" | "fuzzy_name_and_company";
  similarity_score: number;
}
