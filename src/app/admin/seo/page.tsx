"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Layers,
  Link2,
  BarChart3,
  ListOrdered,
  FileCheck
} from "lucide-react";
import { SEORedirect, KeywordPlan, BacklinkTrackerItem, SEOAuditIssue, InternalLinkSuggestion } from "@/lib/seo/types";

export default function SEOControlCenterPage() {
  const [activeTab, setActiveTab] = useState<"audit" | "redirects" | "keywords" | "backlinks" | "internal">("audit");
  
  // Data states
  const [auditIssues, setAuditIssues] = useState<SEOAuditIssue[]>([]);
  const [auditScore, setAuditScore] = useState<number>(100);
  const [internalSuggestions, setInternalSuggestions] = useState<InternalLinkSuggestion[]>([]);
  const [redirects, setRedirects] = useState<SEORedirect[]>([]);
  const [keywords, setKeywords] = useState<KeywordPlan[]>([]);
  const [backlinks, setBacklinks] = useState<BacklinkTrackerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals & Forms
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [newRedirect, setNewRedirect] = useState({ source: "", destination: "", status_code: 301, reason: "" });
  const [showKeywordModal, setShowKeywordModal] = useState(false);
  const [newKeyword, setNewKeyword] = useState({ query: "", search_intent: "Commercial", audience: "", target_url: "/" });
  const [showBacklinkModal, setShowBacklinkModal] = useState(false);
  const [newBacklink, setNewBacklink] = useState({ prospect_source: "", domain_authority: 50, contact_email: "", target_url: "/", link_rel: "follow" });

  const loadAllSEOData = async () => {
    setLoading(true);
    try {
      const [auditRes, redRes, kwRes, blRes] = await Promise.all([
        fetch("/api/seo/audit").then((r) => r.json()),
        fetch("/api/seo/redirects").then((r) => r.json()),
        fetch("/api/seo/keywords").then((r) => r.json()),
        fetch("/api/seo/backlinks").then((r) => r.json()),
      ]);

      if (auditRes.success) {
        setAuditIssues(auditRes.audit?.issues || []);
        setAuditScore(auditRes.audit?.score || 95);
        setInternalSuggestions(auditRes.internalLinkSuggestions || []);
      }
      if (redRes.success) setRedirects(redRes.data || []);
      if (kwRes.success) setKeywords(kwRes.data || []);
      if (blRes.success) setBacklinks(blRes.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllSEOData();
  }, []);

  // Handlers
  const handleSaveRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRedirect.source) return;
    try {
      const res = await fetch("/api/seo/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRedirect),
      });
      const data = await res.json();
      if (data.success) {
        setShowRedirectModal(false);
        setNewRedirect({ source: "", destination: "", status_code: 301, reason: "" });
        loadAllSEOData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    if (!confirm("Delete this redirect rule?")) return;
    try {
      await fetch(`/api/seo/redirects?id=${id}`, { method: "DELETE" });
      loadAllSEOData();
    } catch (e) {}
  };

  const handleSaveKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.query) return;
    try {
      const res = await fetch("/api/seo/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newKeyword),
      });
      const data = await res.json();
      if (data.success) {
        setShowKeywordModal(false);
        setNewKeyword({ query: "", search_intent: "Commercial", audience: "", target_url: "/" });
        loadAllSEOData();
      }
    } catch (e) {}
  };

  const handleSaveBacklink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBacklink.prospect_source) return;
    try {
      const res = await fetch("/api/seo/backlinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBacklink),
      });
      const data = await res.json();
      if (data.success) {
        setShowBacklinkModal(false);
        setNewBacklink({ prospect_source: "", domain_authority: 50, contact_email: "", target_url: "/", link_rel: "follow" });
        loadAllSEOData();
      }
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0A1B2A] border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20 font-mono">
            PHASE 03 TECHNICAL SEO & MIGRATION
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Compass className="w-7 h-7 text-[#FA5B0F]" />
            <span>SEO Control Center & Migration Safety</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Audit on-page signals, manage 301/410 migration redirects, maintain Schema.org structured data, coordinate intent-led keyword targeting, and monitor earned backlink outreach.
          </p>
        </div>

        {/* Audit Score Pill */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4 shrink-0">
          <div>
            <div className="text-xs uppercase font-mono text-slate-400">Technical Health</div>
            <div className="text-3xl font-bold text-white font-mono flex items-baseline gap-1">
              <span className={auditScore >= 80 ? "text-emerald-400" : "text-amber-400"}>
                {auditScore}
              </span>
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
          </div>
          <button
            onClick={loadAllSEOData}
            title="Re-run SEO Audit"
            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 gap-1 text-xs">
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            activeTab === "audit" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Audit & Health ({auditIssues.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("redirects")}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            activeTab === "redirects" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5 text-blue-400" />
          <span>Redirect Manager ({redirects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("keywords")}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            activeTab === "keywords" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          <span>Keyword Database ({keywords.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("backlinks")}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            activeTab === "backlinks" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Link2 className="w-3.5 h-3.5 text-purple-400" />
          <span>Backlink Tracker ({backlinks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("internal")}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            activeTab === "internal" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#FA5B0F]" />
          <span>Internal Links ({internalSuggestions.length})</span>
        </button>
      </div>

      {/* TAB 1: AUDIT & HEALTH */}
      {activeTab === "audit" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Technical Audit Findings</h2>
            <p className="text-xs text-slate-400 mb-6">
              Automated on-page checks across title length, meta description snippet space, canonical uniformity, and spam cleanup signals.
            </p>

            <div className="space-y-3">
              {auditIssues.length === 0 ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>All tested routes satisfy on-page title, description, and canonical integrity standards.</span>
                </div>
              ) : (
                auditIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                      issue.severity === "critical"
                        ? "bg-red-500/10 border-red-500/30 text-red-200"
                        : issue.severity === "warning"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                        : "bg-blue-500/10 border-blue-500/30 text-blue-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            issue.severity === "critical"
                              ? "bg-red-500/20 text-red-400"
                              : issue.severity === "warning"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {issue.severity}
                        </span>
                        <span className="font-semibold text-xs text-white">{issue.rule}</span>
                        <code className="text-[11px] font-mono text-slate-400">({issue.target_url})</code>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{issue.message}</p>
                      <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-1 font-mono">
                        <span className="text-[#FA5B0F]">Action:</span> {issue.remediation}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Technical SEO Assets Check */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">XML Sitemap</span>
                <span className="text-sm font-semibold text-white">/sitemap.xml</span>
              </div>
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Robots Directives</span>
                <span className="text-sm font-semibold text-white">/robots.txt</span>
              </div>
              <Link
                href="/robots.txt"
                target="_blank"
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Active 301 / 410 Rules</span>
                <span className="text-sm font-semibold text-emerald-400 font-mono">
                  {redirects.length} Configured
                </span>
              </div>
              <button
                onClick={() => setActiveTab("redirects")}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REDIRECTS MANAGER */}
      {activeTab === "redirects" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">URL Redirect & De-indexing Manager</h2>
              <p className="text-xs text-slate-400">
                Preserve link equity via 301 Permanent Redirects and signal spam de-indexing via 410 Gone.
              </p>
            </div>

            <button
              onClick={() => setShowRedirectModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Redirect Rule</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3">Source URL</th>
                  <th className="px-5 py-3">Code</th>
                  <th className="px-5 py-3">Destination</th>
                  <th className="px-5 py-3">Reason</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {redirects.map((red) => (
                  <tr key={red.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-3 font-mono text-slate-200">{red.source}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          red.status_code === 301
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : red.status_code === 410
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {red.status_code}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-slate-300">
                      {red.destination ? red.destination : <span className="text-red-400 italic">None (Gone)</span>}
                    </td>
                    <td className="px-5 py-3 text-slate-400 max-w-xs truncate" title={red.reason}>
                      {red.reason}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => handleDeleteRedirect(red.id)}
                        className="p-1 text-slate-400 hover:text-red-400 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: KEYWORD PLANNING DATABASE */}
      {activeTab === "keywords" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">Keyword & Search Intent Database</h2>
              <p className="text-xs text-slate-400">
                Strategic target queries mapped to specific URLs. Prevents keyword cannibalization.
              </p>
            </div>

            <button
              onClick={() => setShowKeywordModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Target Keyword</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3">Target Query</th>
                  <th className="px-5 py-3">Intent</th>
                  <th className="px-5 py-3">Target URL</th>
                  <th className="px-5 py-3">Audience</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {keywords.map((kw) => (
                  <tr key={kw.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-3 font-semibold text-white">{kw.query}</td>
                    <td className="px-5 py-3 font-mono text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {kw.search_intent}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-[#FA5B0F]">{kw.target_url}</td>
                    <td className="px-5 py-3 text-slate-400">{kw.audience}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {kw.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: BACKLINK TRACKER */}
      {activeTab === "backlinks" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">Legitimate Backlink & Outreach Tracker</h2>
              <p className="text-xs text-slate-400">
                Monitors genuine PR outreach, media coverage, and verified authority citations without automated spam.
              </p>
            </div>

            <button
              onClick={() => setShowBacklinkModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Outreach Prospect</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3">Source Publication</th>
                  <th className="px-5 py-3">DA Est.</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Target URL</th>
                  <th className="px-5 py-3">Link Rel</th>
                  <th className="px-5 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {backlinks.map((bl) => (
                  <tr key={bl.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-3 font-semibold text-white">{bl.prospect_source}</td>
                    <td className="px-5 py-3 font-mono text-slate-300">{bl.domain_authority || "—"}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize ${
                          bl.outreach_status === "Earned"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {bl.outreach_status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-[#FA5B0F]">{bl.target_url}</td>
                    <td className="px-5 py-3 font-mono text-slate-400">{bl.link_rel}</td>
                    <td className="px-5 py-3 text-slate-400 max-w-xs truncate">{bl.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: INTERNAL LINKING SUGGESTIONS */}
      {activeTab === "internal" && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Contextual Internal Link Suggestions</h2>
            <p className="text-xs text-slate-400 mb-6">
              Editorial suggestions based on topical relevance. Internal links must be reviewed and approved manually.
            </p>

            <div className="space-y-4">
              {internalSuggestions.map((sug, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-slate-300">{sug.source_slug}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FA5B0F]" />
                      <span className="font-mono text-[#FA5B0F]">{sug.target_slug}</span>
                    </div>
                    <span className="text-[11px] font-medium bg-slate-900 px-2.5 py-0.5 rounded text-slate-300 border border-slate-800">
                      Anchor: &ldquo;{sug.suggested_anchor}&rdquo;
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    Context: {sug.context_snippet}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <strong>Rationale:</strong> {sug.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD REDIRECT */}
      {showRedirectModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">Add SEO Redirect Rule</h2>
            <p className="text-xs text-slate-400 mb-4">Configures permanent 301 migration or 410 spam cleanup.</p>

            <form onSubmit={handleSaveRedirect} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Source Path</label>
                <input
                  type="text"
                  required
                  value={newRedirect.source}
                  onChange={(e) => setNewRedirect({ ...newRedirect, source: e.target.value })}
                  placeholder="/old-wordpress-url"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Status Code</label>
                  <select
                    value={newRedirect.status_code}
                    onChange={(e) => setNewRedirect({ ...newRedirect, status_code: parseInt(e.target.value) as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                  >
                    <option value={301}>301 Permanent</option>
                    <option value={302}>302 Temporary</option>
                    <option value={410}>410 Gone (Spam removal)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Destination Path</label>
                  <input
                    type="text"
                    disabled={newRedirect.status_code === 410}
                    value={newRedirect.destination}
                    onChange={(e) => setNewRedirect({ ...newRedirect, destination: e.target.value })}
                    placeholder={newRedirect.status_code === 410 ? "N/A (Gone)" : "/new-destination"}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white disabled:opacity-40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Reason / Rationale</label>
                <input
                  type="text"
                  required
                  value={newRedirect.reason}
                  onChange={(e) => setNewRedirect({ ...newRedirect, reason: e.target.value })}
                  placeholder="Migration from legacy CMS or de-indexing signal"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRedirectModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white text-xs font-medium"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD KEYWORD */}
      {showKeywordModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">Target Keyword Plan</h2>
            <form onSubmit={handleSaveKeyword} className="space-y-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Search Query</label>
                <input
                  type="text"
                  required
                  value={newKeyword.query}
                  onChange={(e) => setNewKeyword({ ...newKeyword, query: e.target.value })}
                  placeholder="AI lead qualification engine"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Search Intent</label>
                  <select
                    value={newKeyword.search_intent}
                    onChange={(e) => setNewKeyword({ ...newKeyword, search_intent: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Informational">Informational</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Navigational">Navigational</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target URL</label>
                  <input
                    type="text"
                    required
                    value={newKeyword.target_url}
                    onChange={(e) => setNewKeyword({ ...newKeyword, target_url: e.target.value })}
                    placeholder="/solutions/ai-lead-management"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={newKeyword.audience}
                  onChange={(e) => setNewKeyword({ ...newKeyword, audience: e.target.value })}
                  placeholder="B2B Sales Directors"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowKeywordModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FA5B0F] text-white text-xs font-medium"
                >
                  Save Keyword
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD BACKLINK */}
      {showBacklinkModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">Add Backlink Outreach Prospect</h2>
            <form onSubmit={handleSaveBacklink} className="space-y-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Source Domain / Media Outlet</label>
                <input
                  type="text"
                  required
                  value={newBacklink.prospect_source}
                  onChange={(e) => setNewBacklink({ ...newBacklink, prospect_source: e.target.value })}
                  placeholder="YourStory / Tech In Asia"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Domain Authority</label>
                  <input
                    type="number"
                    value={newBacklink.domain_authority}
                    onChange={(e) => setNewBacklink({ ...newBacklink, domain_authority: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Page</label>
                  <input
                    type="text"
                    required
                    value={newBacklink.target_url}
                    onChange={(e) => setNewBacklink({ ...newBacklink, target_url: e.target.value })}
                    placeholder="/about"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowBacklinkModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FA5B0F] text-white text-xs font-medium"
                >
                  Save Prospect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
