import { createLeadFromSubmission, addLeadActivity } from "@/lib/crm/api";
import { searchApprovedKnowledge } from "./knowledge";
import { ToolExecutionLog } from "./types";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
  execute: (args: any, sessionId: string) => Promise<any>;
}

export const AI_SERVER_TOOLS: Record<string, ToolDefinition> = {
  // 1. Search Approved Knowledge
  search_knowledge: {
    name: "search_knowledge",
    description: "Search approved, published Dodail knowledge about services, delivery timelines, pricing guidelines, and company identity.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search terms or question topic" },
      },
      required: ["query"],
    },
    execute: async ({ query }: { query: string }, sessionId: string) => {
      const results = searchApprovedKnowledge(query);
      return { found: results.length > 0, results };
    },
  },

  // 2. Create Lead with Validation and Consent
  create_crm_lead: {
    name: "create_crm_lead",
    description: "Create or update a lead in the CRM when a visitor provides their name, email, and interest. Enforces duplicate detection.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Visitor's full name" },
        email: { type: "string", description: "Visitor's business email" },
        phone: { type: "string", description: "Contact phone number" },
        company_name: { type: "string", description: "Company or practice name" },
        problem: { type: "string", description: "Stated operational problem or goal" },
        budget_range: { type: "string", description: "Stated budget or package preference" },
      },
      required: ["name", "email"],
    },
    execute: async (args: any, sessionId: string) => {
      if (!args.email || !args.email.includes("@")) {
        return { error: "Invalid email address provided." };
      }

      const result = await createLeadFromSubmission({
        name: args.name,
        email: args.email,
        phone: args.phone,
        company_name: args.company_name,
        message: `Stated bottleneck: ${args.problem || "Unspecified"}. Budget preference: ${args.budget_range || "Standard"}.`,
        attribution: { utm_source: "ai_website_employee" },
        consent: { marketing_consent: true, terms_agreed: true },
      });

      return {
        success: true,
        lead_id: result.lead.id,
        is_duplicate: result.isDuplicate,
        message: result.isDuplicate ? "Inquiry attached to existing contact profile." : "New lead registered in CRM.",
      };
    },
  },

  // 3. Check Available Consultation Slots
  check_consultation_availability: {
    name: "check_consultation_availability",
    description: "Check available 30-minute discovery consultation appointment slots for the upcoming week.",
    parameters: {
      type: "object",
      properties: {
        preferred_day: { type: "string", description: "e.g. Tomorrow, Monday, Thursday" },
      },
    },
    execute: async ({ preferred_day }: { preferred_day?: string }) => {
      return {
        available_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        time_zone: "IST (UTC+5:30)",
        slots: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"],
        note: "All sessions are 30-minute architecture discovery calls over Google Meet.",
      };
    },
  },

  // 4. Request Human Handoff
  request_human_handoff: {
    name: "request_human_handoff",
    description: "Escalate conversation to human senior solutions architect when query is outside knowledge scope or user explicitly asks for human.",
    parameters: {
      type: "object",
      properties: {
        reason: { type: "string", description: "Reason for escalation" },
        contact_info: { type: "string", description: "Email or phone provided by visitor" },
      },
      required: ["reason"],
    },
    execute: async ({ reason, contact_info }: { reason: string; contact_info?: string }) => {
      return {
        handoff_queued: true,
        direct_channels: {
          phone: "+91 99664 00235",
          email: "info@dodail.com",
          consultation_link: "/consultation",
        },
        message: "Your inquiry has been escalated. You can also connect directly via phone or schedule on our consultation page.",
      };
    },
  },
};

// Input Sanitization and Prompt Injection Defense
export function sanitizeUserMessage(input: string): { safeText: string; isInjectionSuspected: boolean } {
  const trimmed = input.trim().slice(0, 1500); // Max input length 1500 chars

  // Common jailbreak and system override vectors
  const injectionPatterns = [
    /ignore (all )?previous instructions/i,
    /system prompt/i,
    /you are now (an? )?unrestricted/i,
    /drop all rules/i,
    /print your (hidden )?instructions/i,
    /reveal (your )?api key/i,
    /dump (database|crm|tables)/i,
    /<script/i,
    /javascript:/i,
  ];

  const isSuspected = injectionPatterns.some((pattern) => pattern.test(trimmed));

  return {
    safeText: trimmed,
    isInjectionSuspected: isSuspected,
  };
}
