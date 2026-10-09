export type WorkflowTriggerType =
  | "schedule"
  | "manual_run"
  | "new_updated_sheet_row"
  | "approved_cms_event"
  | "webhook";

export type WorkflowActionType =
  | "validate_data"
  | "create_cms_draft"
  | "generate_ai_content"
  | "request_approval"
  | "send_notification"
  | "update_sheet_status";

export type ExecutionState =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "paused"
  | "cancelled";

export interface WorkflowNode {
  id: string;
  name: string;
  type: "trigger" | "condition" | "action";
  actionType?: WorkflowActionType;
  triggerType?: WorkflowTriggerType;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  condition?: {
    field: string;
    operator: "equals" | "not_equals" | "contains" | "greater_than" | "is_not_empty";
    value: any;
  };
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: number;
  is_active: boolean;
  trigger_type: WorkflowTriggerType;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  owner: string;
  concurrency_limit: number;
  rate_limit_per_minute: number;
  timeout_seconds: number;
  created_at: string;
  updated_at: string;
}

export interface NodeExecutionLog {
  node_id: string;
  node_name: string;
  status: "succeeded" | "failed" | "skipped";
  started_at: string;
  completed_at: string;
  input_data: Record<string, any>;
  output_data?: Record<string, any>;
  error?: string;
  redacted_secrets_count: number;
}

export interface WorkflowExecution {
  id: string;
  workflow_id: string;
  workflow_version: number;
  trigger_source: string;
  idempotency_key: string;
  is_dry_run: boolean;
  status: ExecutionState;
  started_at: string;
  completed_at?: string;
  node_logs: NodeExecutionLog[];
  error?: string;
  created_by: string;
}

export interface ColumnMapping {
  sheet_column: string; // e.g. "A", "B", or header name "Topic Title"
  target_field:
    | "topic"
    | "audience"
    | "industry"
    | "intent"
    | "target_keyword"
    | "due_date"
    | "priority"
    | "desired_format"
    | "status";
  required: boolean;
  validation_type: "text" | "date" | "enum";
  allowed_values?: string[];
}

export interface GoogleSheetConfig {
  id: string;
  spreadsheet_id: string;
  spreadsheet_name: string;
  worksheet_name: string;
  header_row: number;
  data_start_row: number;
  auth_type: "oauth" | "service_account";
  service_account_email?: string;
  is_connected: boolean;
  token_status: "valid" | "expired" | "not_connected";
  last_synced_at?: string;
  column_mappings: ColumnMapping[];
  writeback_enabled: boolean;
  writeback_columns: {
    status_column: string;
    draft_url_column: string;
    content_id_column: string;
    error_column: string;
    timestamp_column: string;
  };
}

export interface RowSyncLedger {
  id: string;
  spreadsheet_id: string;
  worksheet_name: string;
  row_index: number;
  row_hash: string;
  idempotency_key: string;
  cms_draft_id?: string;
  cms_draft_slug?: string;
  sync_status: "synced" | "ignored_duplicate" | "validation_error" | "failed";
  error_message?: string;
  last_processed_at: string;
}
