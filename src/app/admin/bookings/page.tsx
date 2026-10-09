"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Link2,
  Video,
  User,
  Mail,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Plus
} from "lucide-react";
import { Booking, ConsultationProduct, BookingStatus } from "@/lib/booking/types";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [products, setProducts] = useState<ConsultationProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking/availability");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
      // Fetch bookings list
      const bookRes = await fetch("/api/crm/leads"); // We can query via API
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0A1B2A] border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20 font-mono">
            PHASE 06 CONSULTATION & PAYMENT ENGINE
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Calendar className="w-7 h-7 text-[#FA5B0F]" />
            <span>Consultations, Calendar & Payments</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Manage discovery appointments, paid architecture audits, double-booking locks, and signed webhook payment reconciliation. All confirmed sessions automatically synchronize to the CRM.
          </p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1.5 shrink-0">
          <div className="text-emerald-400 font-mono">Double-Booking Lock: ACTIVE</div>
          <div className="text-blue-400 font-mono">Idempotent Webhooks: ENABLED</div>
          <div className="text-slate-400 font-mono">Timezone: Asia/Kolkata (IST)</div>
        </div>
      </div>

      {/* Configured Consultation Products */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Configured Consultation Tiers</h2>
            <p className="text-xs text-slate-400">Duration, working hours, cancellation policies, and fee settings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {products.map((prod) => (
            <div key={prod.id} className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-[#FA5B0F] border border-slate-800 block mb-1">
                    {prod.duration_minutes} Mins Session
                  </span>
                  <h3 className="font-semibold text-sm text-white">{prod.name}</h3>
                </div>
                <div className="text-right font-mono">
                  <span className="text-lg font-bold text-emerald-400">
                    {prod.is_free ? "Free" : `₹${prod.price_amount.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{prod.description}</p>

              <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-500 space-y-1">
                <div>Working Window: {prod.working_hours_start} - {prod.working_hours_end} ({prod.time_zone})</div>
                <div>Cancellation Notice: {prod.cancellation_policy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
