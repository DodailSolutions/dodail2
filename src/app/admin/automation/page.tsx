"use client";

import React, { useState, useEffect } from "react";
import {
  GitBranch,
  FileSpreadsheet,
  Play,
  RotateCw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Database,
  Lock,
  Layers,
  Settings,
  Sparkles,
  RefreshCw,
  Eye,
  Filter,
  Check,
  Zap,
  Terminal,
} from "lucide-react";
import {
  WorkflowDefinition,
  WorkflowExecution,
  GoogleSheetConfig,
  RowSyncLedger,
} from "@/lib/automation/types";
import { SheetSyncResult } from "@/lib/automation/sheets";

export default function AutomationsAndSheetsStudioPage() {
  const [activeTab, setActiveTab] = useState<"canvas" | "sheets" | "history" | "security">("canvas");

  // Workflows state
  const [workflows, setWorkflows] = useState<WorkflowDefinition[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowDefinition | null>(null);
  const [loadingWorkflows, setLoadingWorkflows] = useState(true);

  // Sheets config state
  const [sheetConfig, setSheetConfig] = useState<GoogleSheetConfig | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [syncingSheets, setSyncingSheets] = useState(false);
  const [syncResult, setSyncResult] = useState<SheetSyncResult | null>(null);

  // Executions state
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [selectedExecution, setSelectedExecution] = useState<WorkflowExecution | null>(null);
  const [loadingExecutions, setLoadingExecutions] = useState(true);

  // Ledgers state
  const [ledgers, setLedgers] = useState<RowSyncLedger[]>([]);

  // Testing & execution modal
  const [runningWorkflow, setRunningWorkflow] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error" | "info"; msg: string } | null>(null);

  useEffect(() => {
    fetchWorkflows();
    fetchSheetConfig();
    fetchExecutions();
    fetchLedgers();
  }, []);

  const fetchWorkflows = async () => {
    setLoadingWorkflows(true);
    try {
      const res = await fetch("/api/automation/workflows");
      const json = await res.json();
      if (json.success) {
        setWorkflows(json.data);
        if (json.data.length > 0 && !selectedWorkflow) {
          setSelectedWorkflow(json.data[0]);
        }
      }
    } catch (e: any) {
      console.error("Failed to load workflows:", e);
    } finally {
      setLoadingWorkflows(false);
    }
  };

  const fetchSheetConfig = async () => {
    setLoadingConfig(true);
    try {
      const res = await fetch("/api/automation/sheets/config");
      const json = await res.json();
      if (json.success) {
        setSheetConfig(json.data);
      }
    } catch (e: any) {
      console.error("Failed to load sheet config:", e);
    } finally {
      setLoadingConfig(false);
    }
  };

  const fetchExecutions = async () => {
    setLoadingExecutions(true);
    try {
      const res = await fetch("/api/automation/runs");
      const json = await res.json();
      if (json.success) {
        setExecutions(json.data);
        if (json.data.length > 0 && !selectedExecution) {
          setSelectedExecution(json.data[0]);
        }
      }
    } catch (e: any) {
      console.error("Failed to load runs:", e);
    } finally {
      setLoadingExecutions(false);
    }
  };

  const fetchLedgers = async () => {
    try {
      const res = await fetch("/api/automation/sheets/sync");
      const json = await res.json();
      if (json.success) {
        setLedgers(json.data);
      }
    } catch (e: any) {
      console.error("Failed to load ledgers:", e);
    }
  };

  const handleRunWorkflow = async (isDryRun: boolean) => {
    if (!selectedWorkflow) return;
    setRunningWorkflow(true);
    setNotice(null);

    try {
      const res = await fetch(`/api/automation/workflows/${selectedWorkflow.id}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_dry_run: isDryRun }),
      });
      const data = await res.json();
      if (data.success) {
        setNotice({
          type: "success",
          msg: isDryRun
            ? "Dry-Run Simulation Complete: All validation steps and node conditions verified with 0 mutations."
            : "Live Workflow Execution Complete: CMS draft generated and status ledger recorded.",
        });
        setSelectedExecution(data.data);
        fetchExecutions();
        fetchLedgers();
      } else {
        setNotice({ type: "error", msg: data.error || "Workflow execution failed" });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    } finally {
      setRunningWorkflow(false);
    }
  };

  const handleSyncSheets = async () => {
    setSyncingSheets(true);
    setNotice(null);
    setSyncResult(null);

    try {
      const res = await fetch("/api/automation/sheets/sync", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSyncResult(data.data);
        setNotice({
          type: "success",
          msg: `Google Sheets sync finished: ${data.data.new_drafts_created} new CMS drafts created, ${data.data.duplicate_rows_skipped} duplicate rows protected by idempotency.`,
        });
        fetchLedgers();
        fetchExecutions();
      } else {
        setNotice({ type: "error", msg: data.error || "Google Sheets synchronization failed" });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    } finally {
      setSyncingSheets(false);
    }
  };

  const handleReplayExecution = async (execId: string) => {
    setNotice(null);
    try {
      const res = await fetch("/api/automation/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ execution_id: execId }),
      });
      const data = await res.json();
      if (data.success) {
        setNotice({
          type: "success",
          msg: `Execution replayed safely with unique execution ID (${data.data.id}).`,
        });
        setSelectedExecution(data.data);
        fetchExecutions();
      } else {
        setNotice({ type: "error", msg: data.error || "Failed to replay execution" });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20">
              PHASE 08 ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Durable Workers • Strict Idempotency • SSRF Shield
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <GitBranch className="w-6 h-6 text-[#FA5B0F]" />
            <span>Google Sheets & Automation Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automate observable, deterministic workflows connecting Google Sheets to Dodail CMS drafts with zero arbitrary code execution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleRunWorkflow(true)}
            disabled={runningWorkflow}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition border border-slate-700 shadow-sm disabled:opacity-50"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Dry-Run Test</span>
          </button>

          <button
            onClick={() => handleRunWorkflow(false)}
            disabled={runningWorkflow}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm disabled:opacity-50"
          >
            {runningWorkflow ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Run Workflow Live</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notice && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-start gap-3 transition ${
            notice.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : notice.type === "error"
              ? "bg-red-500/10 border-red-500/30 text-red-300"
              : "bg-blue-500/10 border-blue-500/30 text-blue-300"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          )}
          <div className="flex-1 font-medium">{notice.msg}</div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab("canvas")}
          className={`px-4 py-3 text-xs font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "canvas"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Visual Workflow Graph Canvas</span>
        </button>

        <button
          onClick={() => setActiveTab("sheets")}
          className={`px-4 py-3 text-xs font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "sheets"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Google Sheets Connector & Mapping</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-3 text-xs font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "history"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Execution Runs & Step Logs ({executions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-3 text-xs font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "security"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security, SSRF Guard & Idempotency</span>
        </button>
      </div>

      {/* TAB 1: VISUAL WORKFLOW GRAPH CANVAS */}
      {activeTab === "canvas" && selectedWorkflow && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{selectedWorkflow.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  v{selectedWorkflow.version} ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{selectedWorkflow.description}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span>Concurrency: {selectedWorkflow.concurrency_limit}</span>
              <span>•</span>
              <span>Rate Limit: {selectedWorkflow.rate_limit_per_minute}/min</span>
              <span>•</span>
              <span>Timeout: {selectedWorkflow.timeout_seconds}s</span>
            </div>
          </div>

          {/* Visual Canvas Diagram */}
          <div className="bg-[#050D15] border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-x-auto shadow-inner">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-6 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Deterministic Pipeline Graph Representation</span>
              </span>
              <span className="text-slate-400">Total Nodes: {selectedWorkflow.nodes.length}</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 min-w-[900px] justify-between py-6">
              {selectedWorkflow.nodes.map((node, idx) => {
                const isTrigger = node.type === "trigger";
                const isCondition = node.type === "condition";
                return (
                  <React.Fragment key={node.id}>
                    <div
                      className={`w-52 p-4 rounded-xl border transition relative flex flex-col justify-between shadow-lg ${
                        isTrigger
                          ? "bg-slate-900/90 border-[#FA5B0F]/50 ring-1 ring-[#FA5B0F]/30"
                          : isCondition
                          ? "bg-slate-900/90 border-amber-500/50 ring-1 ring-amber-500/20"
                          : "bg-slate-900/90 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider font-bold ${
                              isTrigger
                                ? "bg-[#FA5B0F]/20 text-[#FA5B0F]"
                                : isCondition
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            Step {idx + 1}: {node.type}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        </div>
                        <h4 className="text-xs font-semibold text-white leading-snug">{node.name}</h4>
                        <div className="text-[10px] text-slate-400 mt-2 font-mono">
                          {node.actionType || node.triggerType || "field_comparison"}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 mt-3 text-[10px] text-slate-300">
                        {isTrigger ? (
                          <span className="text-[#FA5B0F]">Ingests rows idempotently</span>
                        ) : isCondition ? (
                          <span className="text-amber-400">If High Priority → Generate</span>
                        ) : (
                          <span className="text-emerald-400">Typed Allowlist Action</span>
                        )}
                      </div>
                    </div>

                    {idx < selectedWorkflow.nodes.length - 1 && (
                      <div className="flex items-center justify-center text-slate-600">
                        <ArrowRight className="w-5 h-5 text-slate-500 animate-pulse" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Workflow Parameters Drawer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FA5B0F]" />
                Trigger Configuration
              </span>
              <p className="text-xs text-slate-300">
                Triggered automatically upon new/updated Google Sheet rows, or triggered via secure manual invocation.
              </p>
              <div className="text-[11px] font-mono text-slate-400">Source: Topic Backlog (Worksheet)</div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Fact-Grounded Generation
              </span>
              <p className="text-xs text-slate-300">
                AI synthesis is bounded to verified Dodail knowledge models. Zero autonomous publication; creates draft only.
              </p>
              <div className="text-[11px] font-mono text-slate-400">Target: /admin/cms/blog (drafts)</div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <RotateCw className="w-4 h-4 text-blue-400" />
                Sheet Status Writeback
              </span>
              <p className="text-xs text-slate-300">
                Records generated draft slug, processing timestamp, and approval state back into Google Sheets.
              </p>
              <div className="text-[11px] font-mono text-slate-400">Columns: J (Status), K (Draft URL)</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GOOGLE SHEETS CONNECTOR HUB */}
      {activeTab === "sheets" && sheetConfig && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sheet Connection Details */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Google Spreadsheet Source</span>
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CONNECTED
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Spreadsheet Name</label>
                <input
                  type="text"
                  readOnly
                  value={sheetConfig.spreadsheet_name}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Spreadsheet ID</label>
                <input
                  type="text"
                  readOnly
                  value={sheetConfig.spreadsheet_id}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Worksheet Name</label>
                  <input
                    type="text"
                    readOnly
                    value={sheetConfig.worksheet_name}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Data Start Row</label>
                  <input
                    type="number"
                    readOnly
                    value={sheetConfig.data_start_row}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-[11px] text-slate-400 mb-1">Service Account Authentication</label>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 break-all">
                  {sheetConfig.service_account_email}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSyncSheets}
                  disabled={syncingSheets}
                  className="w-full py-2.5 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs flex items-center justify-center gap-2 transition shadow-sm disabled:opacity-50"
                >
                  {syncingSheets ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RotateCw className="w-4 h-4" />}
                  <span>Synchronize Google Sheet Now</span>
                </button>
              </div>
            </div>

            {/* Column Mapping Grid */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    <span>Column-to-Field Schema Mapping</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Maps raw Google Sheet columns to validated Dodail CMS parameters.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Strict Validation</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/60 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="px-3 py-2">Col</th>
                      <th className="px-3 py-2">Target CMS Field</th>
                      <th className="px-3 py-2">Required</th>
                      <th className="px-3 py-2">Validation Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {sheetConfig.column_mappings.map((mapping, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="px-3 py-2.5 font-mono text-[#FA5B0F] font-bold">Col {mapping.sheet_column}</td>
                        <td className="px-3 py-2.5 font-medium text-white capitalize">
                          {mapping.target_field.replace("_", " ")}
                        </td>
                        <td className="px-3 py-2.5">
                          {mapping.required ? (
                            <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                              MANDATORY
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-400">Optional</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 font-mono text-[11px] text-slate-300">
                          {mapping.validation_type}
                          {mapping.allowed_values ? ` (${mapping.allowed_values.join(", ")})` : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Writeback Specifications */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-white block">Authorized Writeback Columns</span>
                <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                  Status: Col {sheetConfig.writeback_columns.status_column} • Draft URL: Col{" "}
                  {sheetConfig.writeback_columns.draft_url_column} • Content ID: Col{" "}
                  {sheetConfig.writeback_columns.content_id_column} • Processed At: Col{" "}
                  {sheetConfig.writeback_columns.timestamp_column}
                </p>
              </div>
            </div>
          </div>

          {/* Sync Result Summary If Run */}
          {syncResult && (
            <div className="p-5 bg-slate-900 border border-emerald-500/30 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Google Sheets Sync Audit Results</span>
                </h4>
                <div className="flex gap-4 text-xs font-mono">
                  <span className="text-slate-300">Scanned: {syncResult.total_rows_scanned}</span>
                  <span className="text-emerald-400">Created: {syncResult.new_drafts_created}</span>
                  <span className="text-blue-400">Duplicates Skipped: {syncResult.duplicate_rows_skipped}</span>
                  <span className="text-red-400">Errors: {syncResult.validation_errors}</span>
                </div>
              </div>

              <div className="space-y-2">
                {syncResult.details.map((detail, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono text-slate-400 mr-2">Row {detail.row_index}:</span>
                      <span className="font-medium text-white">{detail.topic}</span>
                    </div>
                    <div>
                      {detail.status === "created" ? (
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Draft Created: /blog/{detail.draft_slug}
                        </span>
                      ) : detail.status === "duplicate" ? (
                        <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          Skipped Duplicate (Idempotent)
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                          {detail.error_message}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EXECUTION RUNS & STEP LOGS */}
      {activeTab === "history" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Runs Table */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Execution Runs History</h3>
              <button onClick={fetchExecutions} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="divide-y divide-slate-800 max-h-[600px] overflow-y-auto">
              {loadingExecutions ? (
                <div className="p-8 text-center text-xs text-slate-400">Loading executions...</div>
              ) : executions.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">No workflow executions recorded yet.</div>
              ) : (
                executions.map((exec) => (
                  <div
                    key={exec.id}
                    onClick={() => setSelectedExecution(exec)}
                    className={`p-4 transition cursor-pointer ${
                      selectedExecution?.id === exec.id
                        ? "bg-slate-800/80 border-l-2 border-[#FA5B0F]"
                        : "hover:bg-slate-800/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono font-semibold text-white">{exec.id.substring(0, 18)}...</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                          exec.status === "succeeded"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : exec.status === "running"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {exec.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Trigger: {exec.trigger_source}</span>
                      {exec.is_dry_run && (
                        <span className="text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded">DRY RUN</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {new Date(exec.started_at).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Node-Level Log Inspector */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[500px]">
            {selectedExecution ? (
              <div className="space-y-5">
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-400">Execution Inspector:</span>
                      <span className="text-xs font-mono text-white font-bold">{selectedExecution.id}</span>
                      {selectedExecution.is_dry_run && (
                        <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          SIMULATED DRY RUN
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Idempotency Key: {selectedExecution.idempotency_key.substring(0, 24)}...
                    </div>
                  </div>
                  <button
                    onClick={() => handleReplayExecution(selectedExecution.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition border border-slate-700"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Replay Safely</span>
                  </button>
                </div>

                {/* Step Logs Accordion */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Node Execution Steps ({selectedExecution.node_logs.length})
                  </h4>

                  {selectedExecution.node_logs.map((log, lIdx) => (
                    <div key={lIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white">{log.node_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {log.redacted_secrets_count > 0 && (
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                              {log.redacted_secrets_count} Secrets Redacted
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-400">
                            {new Date(log.started_at).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      {/* Log Output JSON Display */}
                      <pre className="p-3 bg-[#050D15] rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-900 leading-relaxed">
                        {JSON.stringify(log.output_data, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center text-slate-400">
                <Clock className="w-10 h-10 text-slate-600 mb-3" />
                <h4 className="text-sm font-semibold text-white">No Execution Selected</h4>
                <p className="text-xs max-w-sm mt-1">
                  Select an execution from the list on the left to inspect step-by-step logs and redacted payloads.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY, SSRF GUARD & IDEMPOTENCY */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Arbitrary Code Execution</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Workflows run strictly through typed, compiled action handlers (`validate_data`, `create_cms_draft`, `generate_ai_content`). No eval or user-submitted JavaScript execution is permitted anywhere in the engine.
              </p>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider font-mono">
                <Lock className="w-4 h-4" />
                <span>SSRF Outbound Guard</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Any outbound webhook requests are strictly filtered to public domains only. Calls to loopback (`127.0.0.1`), RFC1918 private subnets (`10.x`, `192.168.x`), and cloud metadata services (`169.254.x`) are instantly blocked.
              </p>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-[#FA5B0F] font-bold text-xs uppercase tracking-wider font-mono">
                <Database className="w-4 h-4" />
                <span>Deterministic Idempotency</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Row hashes and sha256 execution keys ensure that re-processing the same Google Sheet row or retrying an execution never creates duplicate CMS blog posts or triggers redundant AI billing.
              </p>
            </div>
          </div>

          {/* Idempotency Ledger Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Active Idempotency Ledgers ({ledgers.length})
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Protects Against Duplicate Drafts</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Worksheet & Row</th>
                  <th className="px-6 py-3">Row Hash</th>
                  <th className="px-6 py-3">CMS Draft Slug</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Processed Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ledgers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                      No rows processed in ledger yet. Run Google Sheets Sync in Tab 2.
                    </td>
                  </tr>
                ) : (
                  ledgers.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-800/40">
                      <td className="px-6 py-3 font-medium text-white">
                        {l.worksheet_name} (Row {l.row_index})
                      </td>
                      <td className="px-6 py-3 font-mono text-slate-400">{l.row_hash.substring(0, 16)}...</td>
                      <td className="px-6 py-3 font-mono text-[#FA5B0F]">/blog/{l.cms_draft_slug}</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {l.sync_status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-400 font-mono">
                        {new Date(l.last_processed_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
