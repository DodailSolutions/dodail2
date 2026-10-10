"use client";

import React, { useState, useEffect } from "react";
import {
  Kanban,
  Plus,
  RefreshCw,
  IndianRupee,
  Calendar,
  Building2,
  User,
  ArrowRight
} from "lucide-react";
import { Deal, PipelineStage } from "@/lib/crm/types";

const STAGES: PipelineStage[] = [
  "Discovery",
  "Architecture Review",
  "Proposal Sent",
  "Negotiation",
  "Won",
  "Lost",
];

export default function CRMPipelineBoardPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: "",
    value_amount: 150000,
    stage: "Discovery" as PipelineStage,
    owner_email: "raviteja@dodail.com",
  });

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/deals");
      const data = await res.json();
      if (data.success) {
        setDeals(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleStageChange = async (dealId: string, newStage: PipelineStage) => {
    try {
      await fetch("/api/crm/deals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: dealId, stage: newStage }),
      });
      fetchDeals();
    } catch (e) {}
  };

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.title) return;
    try {
      const res = await fetch("/api/crm/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDeal),
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewDeal({ title: "", value_amount: 150000, stage: "Discovery", owner_email: "raviteja@dodail.com" });
        fetchDeals();
      }
    } catch (e) {}
  };

  const totalValue = deals.reduce((acc, d) => acc + d.value_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Kanban className="w-6 h-6 text-emerald-400" />
            <span>Sales & Architecture Pipeline</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active opportunities: {deals.length} deals • Pipeline Value: ₹{totalValue.toLocaleString("en-IN")}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Opportunity</span>
        </button>
      </div>

      {/* Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageTotal = stageDeals.reduce((acc, d) => acc + d.value_amount, 0);

          return (
            <div
              key={stage}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col min-h-[450px]"
            >
              {/* Column Header */}
              <div className="pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-white truncate">{stage}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {stageDeals.length}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#FA5B0F] mt-1">
                  ₹{stageTotal.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Deal Cards */}
              <div className="space-y-2.5 flex-1">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-3 bg-slate-950 border border-slate-800/90 rounded-lg shadow-sm hover:border-slate-700 transition space-y-2"
                  >
                    <div className="font-medium text-xs text-white leading-snug">
                      {deal.title}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-semibold">
                        ₹{deal.value_amount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-slate-500">{deal.probability}%</span>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 truncate max-w-[90px]">
                        {deal.owner_email.split("@")[0]}
                      </span>

                      {/* Quick stage mover */}
                      <select
                        value={deal.stage}
                        onChange={(e) => handleStageChange(deal.id, e.target.value as PipelineStage)}
                        className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded px-1.5 py-0.5"
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            → {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE DEAL MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">New Pipeline Opportunity</h2>
            <form onSubmit={handleCreateDeal} className="space-y-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Opportunity Title</label>
                <input
                  type="text"
                  required
                  value={newDeal.title}
                  onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                  placeholder="Apex Clinics - Patient Flow AI"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Value (INR)</label>
                  <input
                    type="number"
                    value={newDeal.value_amount}
                    onChange={(e) => setNewDeal({ ...newDeal, value_amount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Initial Stage</label>
                  <select
                    value={newDeal.stage}
                    onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value as PipelineStage })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
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
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
