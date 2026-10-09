"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  Clock,
  ArrowRight,
  RefreshCw,
  GitMerge,
  AlertCircle,
  FileSpreadsheet
} from "lucide-react";
import { Lead, Activity, LeadStatus } from "@/lib/crm/types";

export default function CRMLeadsListPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadActivities, setLeadActivities] = useState<Activity[]>([]);
  const [newNote, setNewNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  // New Lead Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    deal_value: 100000,
    status: "new" as LeadStatus,
  });

  // Merge Modal
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [targetMergeId, setTargetMergeId] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const openLeadDrawer = async (lead: Lead) => {
    setSelectedLead(lead);
    try {
      const res = await fetch(`/api/crm/leads?id=${lead.id}`);
      const data = await res.json();
      if (data.success) {
        setLeadActivities(data.data.activities || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) return;
    try {
      const res = await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewLead({ name: "", email: "", phone: "", company_name: "", deal_value: 100000, status: "new" });
        fetchLeads();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await fetch("/api/crm/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      fetchLeads();
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (e) {}
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;
    setAddingNote(true);
    try {
      const res = await fetch("/api/crm/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: selectedLead.id,
          type: "note",
          title: "Internal Note Added",
          description: newNote,
          performed_by: "Admin",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLeadActivities([data.data, ...leadActivities]);
        setNewNote("");
      }
    } catch (e) {} finally {
      setAddingNote(false);
    }
  };

  const handleMerge = async () => {
    if (!selectedLead || !targetMergeId) return;
    if (!confirm("Are you sure you want to merge this lead into the target record? This action will reassign all activities and deals.")) return;
    try {
      const res = await fetch("/api/crm/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: selectedLead.id,
          targetId: targetMergeId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowMergeModal(false);
        setSelectedLead(null);
        fetchLeads();
      }
    } catch (e) {}
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.company_name && l.company_name.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#FA5B0F]" />
            <span>Leads & Prospects Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            System of record for inbound inquiries, qualified leads, attribution, and follow-ups.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/api/crm/export"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-300 text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, or company..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#FA5B0F]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#FA5B0F]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="converted">Converted</option>
            <option value="unqualified">Unqualified</option>
          </select>

          <button
            onClick={fetchLeads}
            title="Refresh"
            className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase font-mono tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Lead / Contact</th>
              <th className="px-6 py-3.5">Company</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Deal Potential</th>
              <th className="px-6 py-3.5">Source Attribution</th>
              <th className="px-6 py-3.5">Last Activity</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#FA5B0F]" />
                  <span>Loading CRM leads...</span>
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  No leads matching your criteria.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => openLeadDrawer(lead)}
                  className="hover:bg-slate-800/40 transition cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{lead.name}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <span>{lead.email}</span>
                      {lead.phone && <span className="text-slate-500">• {lead.phone}</span>}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-300">
                    {lead.company_name || "—"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono capitalize border ${
                        lead.status === "qualified" || lead.status === "converted"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : lead.status === "proposal_sent"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : lead.status === "contacted"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-slate-200">
                    {lead.deal_value ? `₹${lead.deal_value.toLocaleString("en-IN")}` : "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-xs font-mono text-[#FA5B0F]">
                      {lead.attribution?.utm_source || "direct"}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[120px]">
                      {lead.attribution?.landing_page || "/"}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(lead.last_activity_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLeadDrawer(lead);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* LEAD PROFILE DRAWER */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-[#0A1B2A] border-l border-slate-800 w-full max-w-xl h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Drawer Top */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{selectedLead.name}</h2>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      Score: {selectedLead.score}/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedLead.company_name} • Owner: {selectedLead.owner_email}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 text-xs"
                >
                  ✕ Close
                </button>
              </div>

              {/* Status Switcher */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Change Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as LeadStatus)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="converted">Converted</option>
                  <option value="unqualified">Unqualified</option>
                </select>

                <button
                  onClick={() => setShowMergeModal(true)}
                  className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs text-slate-300"
                >
                  <GitMerge className="w-3.5 h-3.5 text-purple-400" />
                  <span>Merge</span>
                </button>
              </div>

              {/* Contact & Attribution Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Email Address</span>
                  <span className="text-white font-mono">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone</span>
                  <span className="text-white font-mono">{selectedLead.phone || "None"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Lead Source</span>
                  <span className="text-[#FA5B0F] font-mono">{selectedLead.attribution?.utm_source || "direct"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Landing Page</span>
                  <span className="text-slate-300 font-mono truncate block">{selectedLead.attribution?.landing_page || "/"}</span>
                </div>
              </div>

              {/* Note input */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <label className="text-xs font-medium text-slate-300 block">Log Note or Activity</label>
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record architecture discovery details, next action..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
                <button
                  type="submit"
                  disabled={addingNote || !newNote.trim()}
                  className="px-3 py-1.5 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white text-xs font-medium disabled:opacity-50"
                >
                  Add Note
                </button>
              </form>

              {/* Activity Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase font-mono tracking-wider text-slate-400">
                  Activity Timeline ({leadActivities.length})
                </h3>
                <div className="divide-y divide-slate-800/80">
                  {leadActivities.map((act) => (
                    <div key={act.id} className="py-2.5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{act.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(act.created_at).toLocaleString()}
                        </span>
                      </div>
                      {act.description && (
                        <p className="text-xs text-slate-400">{act.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
              Dodail CRM System of Record • Lead ID: {selectedLead.id}
            </div>
          </div>
        </div>
      )}

      {/* MERGE MODAL */}
      {showMergeModal && selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-purple-400" />
              <span>Merge Duplicate Lead</span>
            </h2>
            <p className="text-xs text-slate-400">
              Select target lead to merge <strong>{selectedLead.name}</strong> ({selectedLead.email}) into. Activities and deals will be preserved.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Lead</label>
              <select
                value={targetMergeId}
                onChange={(e) => setTargetMergeId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              >
                <option value="">Select target lead...</option>
                {leads
                  .filter((l) => l.id !== selectedLead.id)
                  .map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.email}) - {l.company_name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowMergeModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleMerge}
                disabled={!targetMergeId}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium disabled:opacity-50"
              >
                Confirm Merge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE LEAD MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">Create Lead Manually</h2>
            <form onSubmit={handleCreateLead} className="space-y-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="Rahul Sharma"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  placeholder="rahul@company.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 99999 00000"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={newLead.company_name}
                    onChange={(e) => setNewLead({ ...newLead, company_name: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white text-xs font-medium rounded-lg"
                >
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
