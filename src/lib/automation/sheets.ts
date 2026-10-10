import crypto from "crypto";
import { GoogleSheetConfig, RowSyncLedger } from "./types";
import { getSyncLedgers, saveSyncLedger, saveSheetConfig } from "./store";
import { savePost } from "@/lib/cms/blog";

export interface SheetRowData {
  row_index: number;
  topic: string;
  audience: string;
  industry: string;
  intent: string;
  target_keyword: string;
  due_date?: string;
  priority: string;
  desired_format?: string;
  status?: string;
  raw_values: Record<string, any>;
}

export interface SheetSyncResult {
  success: boolean;
  total_rows_scanned: number;
  new_drafts_created: number;
  duplicate_rows_skipped: number;
  validation_errors: number;
  details: Array<{
    row_index: number;
    topic: string;
    status: "created" | "duplicate" | "error";
    draft_slug?: string;
    error_message?: string;
  }>;
  quota_exhausted?: boolean;
}

// Sample Google Sheet Dataset representing live spreadsheet rows for demonstration & testing
export const sampleSpreadsheetRows: SheetRowData[] = [
  {
    row_index: 2,
    topic: "Enterprise WhatsApp Automation for Indian E-Commerce Returns",
    audience: "D2C Founders, Supply Chain Directors, Customer Experience Heads",
    industry: "E-Commerce & Retail",
    intent: "Commercial",
    target_keyword: "WhatsApp automation e-commerce returns India",
    due_date: "2026-05-01",
    priority: "High",
    desired_format: "Technical Case Study",
    status: "Ready for Ingestion",
    raw_values: { A: "Enterprise WhatsApp Automation for Indian E-Commerce Returns", B: "D2C Founders", C: "Retail", D: "Commercial" },
  },
  {
    row_index: 3,
    topic: "Dental Clinic Patient Retention: Zero-No-Show WhatsApp Reminders",
    audience: "Clinic Owners, Dental Specialists, Practice Managers",
    industry: "Healthcare & Clinics",
    intent: "Informational",
    target_keyword: "dental clinic patient retention automation",
    due_date: "2026-05-05",
    priority: "Medium",
    desired_format: "Educational Guide",
    status: "Ready for Ingestion",
    raw_values: { A: "Dental Clinic Patient Retention", B: "Clinic Owners", C: "Healthcare", D: "Informational" },
  },
  {
    row_index: 4,
    topic: "AI Agent Routing vs Traditional Rule Engines in Real Estate Inquiries",
    audience: "Real Estate Developers, Channel Partners, Sales Directors",
    industry: "Real Estate",
    intent: "Transactional",
    target_keyword: "AI agent real estate lead qualification Hyderabad",
    due_date: "2026-05-10",
    priority: "High",
    desired_format: "Comparative Architecture",
    status: "Ready for Ingestion",
    raw_values: { A: "AI Agent Routing vs Traditional Rule Engines", B: "Real Estate Developers", C: "Real Estate", D: "Transactional" },
  },
];

export async function syncGoogleSheetRows(
  config: GoogleSheetConfig,
  rowsToProcess: SheetRowData[] = sampleSpreadsheetRows
): Promise<SheetSyncResult> {
  const syncLedgers = getSyncLedgers();
  const result: SheetSyncResult = {
    success: true,
    total_rows_scanned: rowsToProcess.length,
    new_drafts_created: 0,
    duplicate_rows_skipped: 0,
    validation_errors: 0,
    details: [],
  };

  for (const row of rowsToProcess) {
    // 1. Validation Checks
    if (!row.topic || row.topic.trim().length < 5) {
      result.validation_errors++;
      result.details.push({
        row_index: row.row_index,
        topic: row.topic || "N/A",
        status: "error",
        error_message: "Topic title must be at least 5 characters.",
      });
      continue;
    }

    if (!row.target_keyword) {
      result.validation_errors++;
      result.details.push({
        row_index: row.row_index,
        topic: row.topic,
        status: "error",
        error_message: "Target keyword is missing in sheet row.",
      });
      continue;
    }

    // 2. Compute Deterministic Row Hash & Idempotency Key
    const rowHash = crypto
      .createHash("sha256")
      .update(`${config.spreadsheet_id}:${config.worksheet_name}:${row.row_index}:${row.topic}:${row.target_keyword}`)
      .digest("hex");

    const existingLedger = syncLedgers.find((l) => l.row_hash === rowHash && l.sync_status === "synced");

    // 3. Idempotency Check: Prevent duplicate draft creation on replay
    if (existingLedger) {
      result.duplicate_rows_skipped++;
      result.details.push({
        row_index: row.row_index,
        topic: row.topic,
        status: "duplicate",
        draft_slug: existingLedger.cms_draft_slug,
        error_message: "Idempotent duplicate: row was already processed previously.",
      });
      continue;
    }

    // 4. Create CMS Draft (Strictly draft, never published post)
    try {
      const slug = row.topic
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const { post: draftPost } = await savePost({
        title: row.topic,
        slug,
        excerpt: `Grounded architecture analysis on ${row.topic} tailored for ${row.audience}.`,
        content: [
          `## Executive Overview`,
          `This article was automatically ingested from Dodail Google Sheets Automation (${config.spreadsheet_name} -> ${config.worksheet_name}, Row ${row.row_index}).`,
          `\n### Target Audience & Search Intent`,
          `- **Audience:** ${row.audience}`,
          `- **Industry:** ${row.industry}`,
          `- **Primary Keyword:** \`${row.target_keyword}\``,
          `- **Search Intent:** ${row.intent}`,
          `\n### Architectural Blueprint`,
          `Enterprise automation in the Indian and GCC markets requires deterministic data verification before LLM inference.`,
          `Explore verified solutions at [Dodail Consultation](/consultation).`,
        ].join("\n"),
        author: "Google Sheets Bot",
        category: row.industry || "AI Automation",
        tags: [row.intent, "GoogleSheetsIngestion"],
        status: "draft", // Strictly creates a draft post
      }, "Google Sheets Automation");

      // 5. Record Row in Ledger
      const newLedger: RowSyncLedger = {
        id: `ledger-${Date.now()}-${row.row_index}`,
        spreadsheet_id: config.spreadsheet_id,
        worksheet_name: config.worksheet_name,
        row_index: row.row_index,
        row_hash: rowHash,
        idempotency_key: `idemp-${rowHash.substring(0, 16)}`,
        cms_draft_id: draftPost.id,
        cms_draft_slug: draftPost.slug,
        sync_status: "synced",
        last_processed_at: new Date().toISOString(),
      };
      saveSyncLedger(newLedger);

      result.new_drafts_created++;
      result.details.push({
        row_index: row.row_index,
        topic: row.topic,
        status: "created",
        draft_slug: draftPost.slug,
      });
    } catch (err: any) {
      result.validation_errors++;
      result.details.push({
        row_index: row.row_index,
        topic: row.topic,
        status: "error",
        error_message: err.message || "Failed to persist CMS draft",
      });
    }
  }

  // Update last synced timestamp on config
  saveSheetConfig({
    ...config,
    last_synced_at: new Date().toISOString(),
  });

  return result;
}
