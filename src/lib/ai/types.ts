export type MessageRole = "system" | "user" | "assistant" | "tool";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  tool_calls?: Array<{
    id: string;
    name: string;
    arguments: Record<string, any>;
  }>;
  tool_call_id?: string;
  is_fallback?: boolean;
}

export interface ConversationSession {
  id: string;
  visitor_fingerprint?: string;
  messages: ChatMessage[];
  qualification_state: {
    name?: string;
    email?: string;
    phone?: string;
    company_name?: string;
    industry?: string;
    location?: string;
    problem?: string;
    budget_range?: string;
    urgency?: string;
    recommended_solution?: string;
    lead_created_id?: string;
    handoff_requested?: boolean;
  };
  consent: {
    marketing_consent: boolean;
    terms_agreed: boolean;
    timestamp: string;
  };
  created_at: string;
  updated_at: string;
}

export interface KnowledgeDocument {
  id: string;
  category: "service" | "process" | "policy" | "faq" | "case_study" | "consultation";
  title: string;
  content: string;
  approved: boolean;
  updated_at: string;
}

export interface ToolExecutionLog {
  id: string;
  session_id: string;
  tool_name: string;
  arguments: Record<string, any>;
  result: Record<string, any>;
  status: "success" | "rejected" | "error";
  executed_at: string;
}
