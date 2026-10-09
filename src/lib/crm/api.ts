import fs from "fs";
import path from "path";
import { Lead, Company, Deal, Activity, LeadDuplicateMatch, UTMAttribution, LeadStatus, PipelineStage } from "./types";
import { supabaseAdmin } from "@/lib/supabase";

const CRM_STORE_FILE = path.join(process.cwd(), "crm-store.json");

interface CRMStore {
  leads: Lead[];
  companies: Company[];
  deals: Deal[];
  activities: Activity[];
  auditLogs: Array<{ action: string; entity_id: string; user: string; timestamp: string; details?: any }>;
}

const defaultCompanies: Company[] = [
  {
    id: "comp-1",
    name: "Apex Healthcare Clinics",
    domain: "apexclinics.in",
    industry: "Healthcare",
    city: "Hyderabad",
    country: "India",
    created_at: "2026-04-01T00:00:00Z",
    updated_at: "2026-04-01T00:00:00Z",
  },
  {
    id: "comp-2",
    name: "Skyline Properties Ltd",
    domain: "skylineproperties.com",
    industry: "Real Estate",
    city: "Bengaluru",
    country: "India",
    created_at: "2026-04-02T00:00:00Z",
    updated_at: "2026-04-02T00:00:00Z",
  },
];

const defaultLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Dr. Sandeep Varma",
    email: "sandeep@apexclinics.in",
    normalized_email: "sandeep@apexclinics.in",
    phone: "+91 98490 12345",
    normalized_phone: "919849012345",
    company_name: "Apex Healthcare Clinics",
    company_id: "comp-1",
    job_title: "Managing Director",
    status: "qualified",
    score: 85,
    owner_email: "raviteja@dodail.com",
    deal_value: 250000,
    attribution: {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "dental_automation_in",
      landing_page: "/industries/dental",
      referrer: "https://www.google.com",
    },
    consent: {
      marketing_consent: true,
      terms_agreed: true,
      consent_timestamp: "2026-04-05T10:30:00Z",
    },
    notes_summary: "Looking to automate patient follow-ups and WhatsApp appointment confirmations.",
    tags: ["Healthcare", "High Value", "Urgent"],
    created_at: "2026-04-05T10:30:00Z",
    updated_at: "2026-04-07T14:20:00Z",
    last_activity_at: "2026-04-07T14:20:00Z",
  },
  {
    id: "lead-2",
    name: "Vikram Reddy",
    email: "vikram@skylineproperties.com",
    normalized_email: "vikram@skylineproperties.com",
    phone: "+91 99887 65432",
    normalized_phone: "919988765432",
    company_name: "Skyline Properties Ltd",
    company_id: "comp-2",
    job_title: "Head of Marketing",
    status: "proposal_sent",
    score: 92,
    owner_email: "raviteja@dodail.com",
    deal_value: 450000,
    attribution: {
      utm_source: "linkedin",
      utm_medium: "social",
      utm_campaign: "real_estate_ai",
      landing_page: "/industries/real-estate",
    },
    consent: {
      marketing_consent: true,
      terms_agreed: true,
      consent_timestamp: "2026-04-06T11:00:00Z",
    },
    notes_summary: "Requested proposal for AI lead qualification answering incoming portal inquiries.",
    tags: ["Real Estate", "Enterprise"],
    created_at: "2026-04-06T11:00:00Z",
    updated_at: "2026-04-08T16:00:00Z",
    last_activity_at: "2026-04-08T16:00:00Z",
  },
  {
    id: "lead-3",
    name: "Ananya Roy",
    email: "ananya@urbanpulse.co",
    normalized_email: "ananya@urbanpulse.co",
    phone: "+91 97112 33445",
    normalized_phone: "919711233445",
    company_name: "UrbanPulse E-Com",
    job_title: "Operations Lead",
    status: "new",
    score: 60,
    owner_email: "team@dodail.com",
    deal_value: 180000,
    attribution: {
      utm_source: "organic",
      landing_page: "/solutions/workflow-automation",
    },
    consent: {
      marketing_consent: true,
      terms_agreed: true,
      consent_timestamp: "2026-04-09T09:15:00Z",
    },
    notes_summary: "Inquired about Shopify inventory synchronization and Google Sheets pipeline.",
    tags: ["E-Commerce"],
    created_at: "2026-04-09T09:15:00Z",
    updated_at: "2026-04-09T09:15:00Z",
    last_activity_at: "2026-04-09T09:15:00Z",
  },
];

const defaultDeals: Deal[] = [
  {
    id: "deal-1",
    lead_id: "lead-1",
    company_id: "comp-1",
    title: "Apex Clinics - Patient Flow AI",
    value_amount: 250000,
    currency: "INR",
    stage: "Architecture Review",
    probability: 60,
    expected_close_date: "2026-04-30",
    owner_email: "raviteja@dodail.com",
    created_at: "2026-04-05T12:00:00Z",
    updated_at: "2026-04-07T14:20:00Z",
  },
  {
    id: "deal-2",
    lead_id: "lead-2",
    company_id: "comp-2",
    title: "Skyline Properties - Real Estate AI Agent",
    value_amount: 450000,
    currency: "INR",
    stage: "Proposal Sent",
    probability: 75,
    expected_close_date: "2026-05-15",
    owner_email: "raviteja@dodail.com",
    created_at: "2026-04-06T15:00:00Z",
    updated_at: "2026-04-08T16:00:00Z",
  },
];

const defaultActivities: Activity[] = [
  {
    id: "act-1",
    lead_id: "lead-1",
    type: "form_submission",
    title: "Contact Form Submitted",
    description: "Inquiry submitted on /industries/dental",
    performed_by: "System",
    completed: true,
    created_at: "2026-04-05T10:30:00Z",
  },
  {
    id: "act-2",
    lead_id: "lead-1",
    type: "call",
    title: "Discovery Architecture Call",
    description: "Discussed clinic branch volume and WhatsApp API requirements.",
    performed_by: "raviteja@dodail.com",
    completed: true,
    created_at: "2026-04-07T14:20:00Z",
  },
  {
    id: "act-3",
    lead_id: "lead-2",
    type: "meeting",
    title: "Proposal Presentation Demo",
    description: "Demonstrated simulated lead response flow via Dodail Simulator.",
    performed_by: "raviteja@dodail.com",
    completed: true,
    created_at: "2026-04-08T16:00:00Z",
  },
];

const defaultStore: CRMStore = {
  leads: defaultLeads,
  companies: defaultCompanies,
  deals: defaultDeals,
  activities: defaultActivities,
  auditLogs: [],
};

function readCRMStore(): CRMStore {
  try {
    if (fs.existsSync(CRM_STORE_FILE)) {
      const data = fs.readFileSync(CRM_STORE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {}
  return defaultStore;
}

function writeCRMStore(store: CRMStore) {
  try {
    fs.writeFileSync(CRM_STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write CRM store:", e);
  }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone?: string): string {
  if (!phone) return "";
  return phone.replace(/[^0-9]/g, "");
}

// ================= LEADS API =================

export async function getAllLeads(filter?: { status?: string; search?: string }): Promise<Lead[]> {
  const store = readCRMStore();
  let list = store.leads.filter((l) => !l.merged_into_id);

  if (filter?.status && filter.status !== "all") {
    list = list.filter((l) => l.status === filter.status);
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company_name && l.company_name.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function getLeadById(id: string): Promise<{ lead: Lead; activities: Activity[]; deals: Deal[] } | null> {
  const store = readCRMStore();
  const lead = store.leads.find((l) => l.id === id);
  if (!lead) return null;

  const activities = store.activities.filter((a) => a.lead_id === id);
  const deals = store.deals.filter((d) => d.lead_id === id);

  return { lead, activities, deals };
}

export async function createLeadFromSubmission(params: {
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  message?: string;
  attribution?: UTMAttribution;
  consent?: { marketing_consent: boolean; terms_agreed: boolean };
  userEmail?: string;
}): Promise<{ lead: Lead; isDuplicate: boolean; duplicateId?: string }> {
  const store = readCRMStore();
  const now = new Date().toISOString();
  const normEmail = normalizeEmail(params.email);
  const normPhone = normalizePhone(params.phone);

  // Check duplicate
  const existing = store.leads.find(
    (l) =>
      !l.merged_into_id &&
      (l.normalized_email === normEmail || (normPhone && l.normalized_phone === normPhone))
  );

  if (existing) {
    // Add activity to existing lead rather than creating silent duplicate
    const act: Activity = {
      id: `act-${Date.now()}`,
      lead_id: existing.id,
      type: "form_submission",
      title: "Re-submitted Public Contact Form",
      description: params.message || "Customer submitted another inquiry.",
      performed_by: "System",
      completed: true,
      created_at: now,
    };
    store.activities.unshift(act);
    existing.last_activity_at = now;
    writeCRMStore(store);

    return { lead: existing, isDuplicate: true, duplicateId: existing.id };
  }

  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name: params.name.trim(),
    email: params.email.trim(),
    normalized_email: normEmail,
    phone: params.phone?.trim(),
    normalized_phone: normPhone,
    company_name: params.company_name?.trim() || "Independent / Direct",
    status: "new",
    score: 50,
    owner_email: params.userEmail || "team@dodail.com",
    attribution: params.attribution || { landing_page: "/contact" },
    consent: {
      marketing_consent: params.consent?.marketing_consent ?? true,
      terms_agreed: params.consent?.terms_agreed ?? true,
      consent_timestamp: now,
    },
    notes_summary: params.message || "",
    tags: ["Inbound Form"],
    created_at: now,
    updated_at: now,
    last_activity_at: now,
  };

  store.leads.unshift(newLead);

  // Add initial activity
  const act: Activity = {
    id: `act-${Date.now()}`,
    lead_id: newLead.id,
    type: "form_submission",
    title: "Initial Form Submission",
    description: params.message || "Contact form submission received.",
    performed_by: "System",
    completed: true,
    created_at: now,
  };
  store.activities.unshift(act);

  store.auditLogs.unshift({
    action: "CREATE_LEAD",
    entity_id: newLead.id,
    user: "public_form",
    timestamp: now,
  });

  writeCRMStore(store);
  return { lead: newLead, isDuplicate: false };
}

export async function updateLead(id: string, updates: Partial<Lead>, userEmail: string = "admin@dodail.com"): Promise<Lead | null> {
  const store = readCRMStore();
  const idx = store.leads.findIndex((l) => l.id === id);
  if (idx < 0) return null;

  const prev = store.leads[idx];
  const now = new Date().toISOString();

  // If status changed, record activity
  if (updates.status && updates.status !== prev.status) {
    store.activities.unshift({
      id: `act-${Date.now()}`,
      lead_id: id,
      type: "status_change",
      title: `Status changed to ${updates.status}`,
      description: `Updated by ${userEmail}`,
      performed_by: userEmail,
      completed: true,
      created_at: now,
    });
  }

  const updated: Lead = {
    ...prev,
    ...updates,
    updated_at: now,
    last_activity_at: now,
  };

  store.leads[idx] = updated;
  writeCRMStore(store);
  return updated;
}

export async function mergeLeads(sourceId: string, targetId: string, userEmail: string = "admin@dodail.com"): Promise<Lead | null> {
  const store = readCRMStore();
  const source = store.leads.find((l) => l.id === sourceId);
  const target = store.leads.find((l) => l.id === targetId);
  if (!source || !target) return null;

  const now = new Date().toISOString();

  // Re-link activities
  store.activities.forEach((act) => {
    if (act.lead_id === sourceId) {
      act.lead_id = targetId;
    }
  });

  // Re-link deals
  store.deals.forEach((deal) => {
    if (deal.lead_id === sourceId) {
      deal.lead_id = targetId;
    }
  });

  // Mark source as merged
  source.merged_into_id = targetId;
  source.is_duplicate = true;

  // Combine tags
  target.tags = Array.from(new Set([...target.tags, ...source.tags]));
  target.updated_at = now;

  store.auditLogs.unshift({
    action: "MERGE_LEADS",
    entity_id: targetId,
    user: userEmail,
    timestamp: now,
    details: { merged_from: sourceId },
  });

  writeCRMStore(store);
  return target;
}

// ================= DEALS & PIPELINE API =================

export async function getAllDeals(): Promise<Deal[]> {
  const store = readCRMStore();
  return store.deals;
}

export async function updateDealStage(dealId: string, newStage: PipelineStage, userEmail: string = "admin@dodail.com"): Promise<Deal | null> {
  const store = readCRMStore();
  const deal = store.deals.find((d) => d.id === dealId);
  if (!deal) return null;

  deal.stage = newStage;
  deal.updated_at = new Date().toISOString();

  if (deal.lead_id) {
    store.activities.unshift({
      id: `act-${Date.now()}`,
      lead_id: deal.lead_id,
      type: "status_change",
      title: `Opportunity Stage: ${newStage}`,
      description: `Deal "${deal.title}" moved to ${newStage} by ${userEmail}`,
      performed_by: userEmail,
      completed: true,
      created_at: new Date().toISOString(),
    });
  }

  writeCRMStore(store);
  return deal;
}

export async function saveDeal(deal: Partial<Deal>, userEmail: string = "admin@dodail.com"): Promise<Deal> {
  const store = readCRMStore();
  const now = new Date().toISOString();
  const existingIdx = store.deals.findIndex((d) => d.id === deal.id);

  let item: Deal;
  if (existingIdx >= 0) {
    item = { ...store.deals[existingIdx], ...deal, updated_at: now };
    store.deals[existingIdx] = item;
  } else {
    item = {
      id: deal.id || `deal-${Date.now()}`,
      lead_id: deal.lead_id,
      company_id: deal.company_id,
      title: deal.title || "Untitled Deal",
      value_amount: deal.value_amount || 0,
      currency: deal.currency || "INR",
      stage: deal.stage || "Discovery",
      probability: deal.probability || 30,
      owner_email: deal.owner_email || userEmail,
      created_at: now,
      updated_at: now,
    };
    store.deals.unshift(item);
  }

  writeCRMStore(store);
  return item;
}

// ================= ACTIVITIES API =================

export async function addLeadActivity(activity: Partial<Activity>): Promise<Activity> {
  const store = readCRMStore();
  const act: Activity = {
    id: activity.id || `act-${Date.now()}`,
    lead_id: activity.lead_id || "",
    type: activity.type || "note",
    title: activity.title || "Activity logged",
    description: activity.description,
    performed_by: activity.performed_by || "admin@dodail.com",
    completed: activity.completed ?? true,
    created_at: new Date().toISOString(),
  };

  store.activities.unshift(act);

  // Update lead last_activity_at
  const lead = store.leads.find((l) => l.id === act.lead_id);
  if (lead) {
    lead.last_activity_at = act.created_at;
  }

  writeCRMStore(store);
  return act;
}

// ================= CRM METRICS SUMMARY =================

export async function getCRMSummary() {
  const store = readCRMStore();
  const activeLeads = store.leads.filter((l) => !l.merged_into_id);
  
  const totalLeads = activeLeads.length;
  const qualifiedLeads = activeLeads.filter((l) => ["qualified", "proposal_sent", "converted"].includes(l.status)).length;
  const totalPipelineValue = store.deals.reduce((acc, d) => acc + d.value_amount, 0);

  // Leads by Source
  const bySource: Record<string, number> = {};
  activeLeads.forEach((l) => {
    const src = l.attribution?.utm_source || "direct";
    bySource[src] = (bySource[src] || 0) + 1;
  });

  // Leads by Status
  const byStatus: Record<string, number> = {};
  activeLeads.forEach((l) => {
    byStatus[l.status] = (byStatus[l.status] || 0) + 1;
  });

  // Deals by Stage
  const byStage: Record<string, { count: number; value: number }> = {
    "Discovery": { count: 0, value: 0 },
    "Architecture Review": { count: 0, value: 0 },
    "Proposal Sent": { count: 0, value: 0 },
    "Negotiation": { count: 0, value: 0 },
    "Won": { count: 0, value: 0 },
    "Lost": { count: 0, value: 0 },
  };
  store.deals.forEach((d) => {
    if (byStage[d.stage]) {
      byStage[d.stage].count += 1;
      byStage[d.stage].value += d.value_amount;
    }
  });

  return {
    totalLeads,
    qualifiedLeads,
    totalPipelineValue,
    bySource,
    byStatus,
    byStage,
  };
}
