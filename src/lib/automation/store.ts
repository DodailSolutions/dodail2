import fs from "fs";
import path from "path";
import {
  WorkflowDefinition,
  WorkflowExecution,
  GoogleSheetConfig,
  RowSyncLedger,
} from "./types";

const AUTOMATION_STORE_FILE = path.join(process.cwd(), "automation-store.json");

interface AutomationStore {
  workflows: WorkflowDefinition[];
  sheetConfigs: GoogleSheetConfig[];
  syncLedgers: RowSyncLedger[];
  executions: WorkflowExecution[];
}

const defaultSheetConfig: GoogleSheetConfig = {
  id: "sheet-cfg-default",
  spreadsheet_id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  spreadsheet_name: "Dodail Editorial & Growth Pipeline 2026",
  worksheet_name: "Topic Backlog",
  header_row: 1,
  data_start_row: 2,
  auth_type: "service_account",
  service_account_email: "dodail-automation-sa@dodail-enterprise.iam.gserviceaccount.com",
  is_connected: true,
  token_status: "valid",
  last_synced_at: "2026-04-09T08:00:00Z",
  column_mappings: [
    { sheet_column: "A", target_field: "topic", required: true, validation_type: "text" },
    { sheet_column: "B", target_field: "audience", required: true, validation_type: "text" },
    { sheet_column: "C", target_field: "industry", required: true, validation_type: "text" },
    { sheet_column: "D", target_field: "intent", required: true, validation_type: "enum", allowed_values: ["Commercial", "Informational", "Transactional"] },
    { sheet_column: "E", target_field: "target_keyword", required: true, validation_type: "text" },
    { sheet_column: "F", target_field: "due_date", required: false, validation_type: "date" },
    { sheet_column: "G", target_field: "priority", required: true, validation_type: "enum", allowed_values: ["High", "Medium", "Low"] },
    { sheet_column: "H", target_field: "desired_format", required: false, validation_type: "text" },
    { sheet_column: "I", target_field: "status", required: false, validation_type: "text" },
  ],
  writeback_enabled: true,
  writeback_columns: {
    status_column: "J",
    draft_url_column: "K",
    content_id_column: "L",
    error_column: "M",
    timestamp_column: "N",
  },
};

const defaultWorkflow: WorkflowDefinition = {
  id: "wf-sheets-to-cms-draft",
  name: "Google Sheets Topic to CMS Draft Pipeline",
  description: "Reads new topic ideas from Google Sheets, validates required SEO attributes, checks idempotency, generates architecture-grounded draft, and writes back the draft URL.",
  version: 1,
  is_active: true,
  trigger_type: "new_updated_sheet_row",
  owner: "raviteja@dodail.com",
  concurrency_limit: 3,
  rate_limit_per_minute: 20,
  timeout_seconds: 60,
  created_at: "2026-04-09T00:00:00Z",
  updated_at: "2026-04-09T00:00:00Z",
  nodes: [
    {
      id: "node-1",
      name: "Google Sheets Row Ingestion",
      type: "trigger",
      triggerType: "new_updated_sheet_row",
      config: { sheet_id: "sheet-cfg-default", batch_size: 10 },
      position: { x: 50, y: 150 },
    },
    {
      id: "node-2",
      name: "Validate Required Fields & SEO Schema",
      type: "action",
      actionType: "validate_data",
      config: { strict_dates: true, require_intent: true },
      position: { x: 300, y: 150 },
    },
    {
      id: "node-3",
      name: "Is Priority High Or Commercial Intent?",
      type: "condition",
      config: { field: "priority", operator: "equals", value: "High" },
      position: { x: 550, y: 150 },
    },
    {
      id: "node-4",
      name: "Synthesize Grounded Draft Content",
      type: "action",
      actionType: "generate_ai_content",
      config: { model: "gemini-pro", ground_against_knowledge_base: true },
      position: { x: 800, y: 100 },
    },
    {
      id: "node-5",
      name: "Create CMS Draft Article",
      type: "action",
      actionType: "create_cms_draft",
      config: { initial_status: "draft", category: "AI Workflows" },
      position: { x: 1050, y: 100 },
    },
    {
      id: "node-6",
      name: "Writeback Status & URL to Google Sheet",
      type: "action",
      actionType: "update_sheet_status",
      config: { status_text: "Draft Created", write_timestamp: true },
      position: { x: 1300, y: 100 },
    },
  ],
  edges: [
    { id: "e1", source: "node-1", target: "node-2" },
    { id: "e2", source: "node-2", target: "node-3" },
    { id: "e3", source: "node-3", target: "node-4" },
    { id: "e4", source: "node-4", target: "node-5" },
    { id: "e5", source: "node-5", target: "node-6" },
  ],
};

const defaultStore: AutomationStore = {
  workflows: [defaultWorkflow],
  sheetConfigs: [defaultSheetConfig],
  syncLedgers: [],
  executions: [],
};

export function readAutomationStore(): AutomationStore {
  try {
    if (fs.existsSync(AUTOMATION_STORE_FILE)) {
      const data = fs.readFileSync(AUTOMATION_STORE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to read automation store:", e);
  }
  return defaultStore;
}

export function writeAutomationStore(store: AutomationStore): void {
  try {
    fs.writeFileSync(AUTOMATION_STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write automation store:", e);
  }
}

// Workflow CRUD
export function getWorkflows(): WorkflowDefinition[] {
  return readAutomationStore().workflows;
}

export function getWorkflowById(id: string): WorkflowDefinition | undefined {
  return readAutomationStore().workflows.find((w) => w.id === id);
}

export function saveWorkflow(workflow: Partial<WorkflowDefinition>): WorkflowDefinition {
  const store = readAutomationStore();
  const idx = store.workflows.findIndex((w) => w.id === workflow.id);
  let saved: WorkflowDefinition;

  if (idx >= 0) {
    saved = {
      ...store.workflows[idx],
      ...workflow,
      version: store.workflows[idx].version + 1,
      updated_at: new Date().toISOString(),
    };
    store.workflows[idx] = saved;
  } else {
    saved = {
      id: workflow.id || `wf-${Date.now()}`,
      name: workflow.name || "Untitled Workflow",
      description: workflow.description || "",
      version: 1,
      is_active: workflow.is_active ?? true,
      trigger_type: workflow.trigger_type || "manual_run",
      nodes: workflow.nodes || [],
      edges: workflow.edges || [],
      owner: workflow.owner || "admin@dodail.com",
      concurrency_limit: workflow.concurrency_limit || 2,
      rate_limit_per_minute: workflow.rate_limit_per_minute || 30,
      timeout_seconds: workflow.timeout_seconds || 60,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.workflows.push(saved);
  }

  writeAutomationStore(store);
  return saved;
}

// Sheet Configs CRUD
export function getSheetConfigs(): GoogleSheetConfig[] {
  return readAutomationStore().sheetConfigs;
}

export function saveSheetConfig(config: Partial<GoogleSheetConfig>): GoogleSheetConfig {
  const store = readAutomationStore();
  const idx = store.sheetConfigs.findIndex((s) => s.id === config.id);
  let saved: GoogleSheetConfig;

  if (idx >= 0) {
    saved = { ...store.sheetConfigs[idx], ...config };
    store.sheetConfigs[idx] = saved;
  } else {
    saved = {
      id: config.id || `sheet-cfg-${Date.now()}`,
      spreadsheet_id: config.spreadsheet_id || "",
      spreadsheet_name: config.spreadsheet_name || "New Spreadsheet",
      worksheet_name: config.worksheet_name || "Sheet1",
      header_row: config.header_row || 1,
      data_start_row: config.data_start_row || 2,
      auth_type: config.auth_type || "service_account",
      service_account_email: config.service_account_email,
      is_connected: config.is_connected ?? true,
      token_status: config.token_status || "valid",
      column_mappings: config.column_mappings || [],
      writeback_enabled: config.writeback_enabled ?? true,
      writeback_columns: config.writeback_columns || {
        status_column: "J",
        draft_url_column: "K",
        content_id_column: "L",
        error_column: "M",
        timestamp_column: "N",
      },
    };
    store.sheetConfigs.push(saved);
  }

  writeAutomationStore(store);
  return saved;
}

// Executions & Sync Ledgers
export function getExecutions(): WorkflowExecution[] {
  return readAutomationStore().executions;
}

export function saveExecution(execution: WorkflowExecution): void {
  const store = readAutomationStore();
  const idx = store.executions.findIndex((e) => e.id === execution.id);
  if (idx >= 0) {
    store.executions[idx] = execution;
  } else {
    store.executions.unshift(execution);
  }
  // Keep last 100 executions
  if (store.executions.length > 100) {
    store.executions = store.executions.slice(0, 100);
  }
  writeAutomationStore(store);
}

export function getSyncLedgers(): RowSyncLedger[] {
  return readAutomationStore().syncLedgers;
}

export function saveSyncLedger(ledger: RowSyncLedger): void {
  const store = readAutomationStore();
  const idx = store.syncLedgers.findIndex((l) => l.idempotency_key === ledger.idempotency_key);
  if (idx >= 0) {
    store.syncLedgers[idx] = ledger;
  } else {
    store.syncLedgers.push(ledger);
  }
  writeAutomationStore(store);
}
