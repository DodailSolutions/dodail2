"use client";

import * as React from "react";
import { Calendar, Clock, CheckCircle2, ShieldCheck, User, Mail, Phone, Building, ArrowRight, MessageSquare, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const consultationTopics = [
  "AI Automation Feasibility Audit",
  "Autonomous Lead Qualification Engine",
  "Custom Next.js Web Software Architecture",
  "Generative Engine Optimization (GEO) & Search",
  "Cross-Platform Workflow Integration (APIs/DB)",
];

const timeSlots = [
  "10:00 AM - 10:45 AM IST",
  "12:00 PM - 12:45 PM IST",
  "03:00 PM - 03:45 PM IST",
  "05:00 PM - 05:45 PM IST",
  "07:30 PM - 08:15 PM IST (US / EU Friendly)",
];

export default function ConsultationPage() {
  const [selectedTopic, setSelectedTopic] = React.useState(consultationTopics[0]);
  const [selectedSlot, setSelectedSlot] = React.useState(timeSlots[0]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please provide your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid business email address.");
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMsg("Please provide a valid contact number or WhatsApp.");
      return;
    }

    setStatus("submitting");

    try {
      // Calculate slot ISO timestamp for tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().slice(0, 10);
      const slotHour = selectedSlot.includes("10:00") ? "10:00" : selectedSlot.includes("12:00") ? "12:00" : selectedSlot.includes("03:00") ? "15:00" : selectedSlot.includes("05:00") ? "17:00" : "19:30";
      const slotIso = new Date(`${dateStr}T${slotHour}:00+05:30`).toISOString();

      const res = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "prod-arch-discovery",
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim() || undefined,
          notes: `Topic: ${selectedTopic}. Notes: ${notes.trim()}`,
          slotIso,
          timeZone: "Asia/Kolkata",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("idle");
        setErrorMsg(data.error || "Unable to secure slot. Please select an alternate time.");
      }
    } catch (err: any) {
      setStatus("idle");
      setErrorMsg(err.message || "An unexpected error occurred. Please contact us directly.");
    }
  };

  return (
    <div className="flex flex-col gap-16 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="orange">Confidential Technical Consultation</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl tracking-tight">
          Schedule an AI & Architecture Feasibility Call
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
          Speak with a senior solutions architect from Dodail Solutions. We assess your operational bottlenecks and present a clear technical blueprint.
        </p>
      </section>

      <section className="mx-auto max-w-4xl w-full">
        {status === "success" ? (
          <div className="rounded-3xl border border-emerald-300 bg-emerald-50/70 p-8 lg:p-12 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-950">Consultation Request Confirmed</h2>
            <p className="mt-4 text-slate-600 max-w-lg mx-auto">
              Thank you, <strong>{name}</strong>. Our engineering leadership has received your request for <strong>{selectedTopic}</strong> ({selectedSlot}).
            </p>
            <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto text-xs text-slate-700 text-left space-y-2 shadow-xs">
              <p><strong>Attendee:</strong> {email} ({phone})</p>
              <p><strong>Company:</strong> {company || "Independent/Stealth"}</p>
              <p><strong>Next Step:</strong> You will receive a calendar invitation and meeting link shortly.</p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/" variant="outline" size="md">
                Return to Homepage
              </Button>
              <a
                href={`https://wa.me/919966400235?text=Hello%20Dodail,%20I%20have%20booked%20a%20consultation%20under%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Notify Us on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-10 shadow-xl"
          >
            {errorMsg && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Select Topic */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#FF6B2C] mb-3 font-mono">
                01 · Choose Consultation Objective
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {consultationTopics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-3.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                      selectedTopic === topic
                        ? "bg-orange-50 border-[#FF6B2C] text-[#FF6B2C] shadow-xs ring-1 ring-[#FF6B2C]"
                        : "bg-slate-50/70 border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Preferred Slot */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#FF6B2C] mb-3 font-mono">
                02 · Select Preferred Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl text-xs font-medium text-center transition-all border ${
                      selectedSlot === slot
                        ? "bg-slate-900 border-slate-900 text-white font-semibold shadow-xs"
                        : "bg-slate-50/70 border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="mb-8 border-t border-slate-100 pt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#FF6B2C] mb-4 font-mono">
                03 · Your Organization Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 mb-1.5 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6B2C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 mb-1.5 font-medium">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6B2C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 mb-1.5 font-medium">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6B2C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 mb-1.5 font-medium">Company Name & Website</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Healthcare / acme.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6B2C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs text-slate-700 mb-1.5 font-medium">Primary Operational Challenge (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us briefly about your current workflow, lead drop-off points, or software bottlenecks..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6B2C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B2C]"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>NDA & Privacy Guarantee · Zero Spam</span>
              </div>

              <Button
                type="submit"
                disabled={status === "submitting"}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {status === "submitting" ? "Confirming Slot..." : "Confirm Consultation Booking"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
