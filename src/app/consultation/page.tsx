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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate submission
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-16 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="orange">Confidential Technical Consultation</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
          Schedule an AI & Architecture Feasibility Call
        </h1>
        <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
          Speak with a senior solutions architect from Dodail Solutions. We assess your operational bottlenecks and present a clear technical blueprint.
        </p>
      </section>

      <section className="mx-auto max-w-4xl w-full">
        {status === "success" ? (
          <div className="rounded-3xl border border-emerald-500/40 bg-[#0E283A] p-8 lg:p-12 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-white">Consultation Request Confirmed</h2>
            <p className="mt-4 text-slate-300 max-w-lg mx-auto">
              Thank you, <strong>{name}</strong>. Our engineering leadership has received your request for <strong>{selectedTopic}</strong> ({selectedSlot}).
            </p>
            <div className="mt-6 p-4 rounded-2xl bg-[#0A1B2A] border border-[#1B3652] max-w-md mx-auto text-xs text-slate-300 text-left space-y-1.5">
              <p><strong>Attendee:</strong> {email} ({phone})</p>
              <p><strong>Company:</strong> {company || "Independent/Stealth"}</p>
              <p><strong>Next Step:</strong> You will receive a calendar invitation and meeting link shortly.</p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/" variant="secondary" size="md">
                Return to Homepage
              </Button>
              <a
                href={`https://wa.me/919966400235?text=Hello%20Dodail,%20I%20have%20booked%20a%20consultation%20under%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Notify Us on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-6 lg:p-10 shadow-2xl backdrop-blur-md"
          >
            {errorMsg && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-medium text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Select Topic */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#FA5B0F] mb-3">
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
                        ? "bg-[#FA5B0F]/20 border-[#FA5B0F] text-white shadow-md shadow-[#FA5B0F]/10"
                        : "bg-[#142C44]/60 border-[#1B3652] text-slate-300 hover:text-white hover:bg-[#142C44]"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Preferred Slot */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#FA5B0F] mb-3">
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
                        ? "bg-[#1B3652] border-[#FA5B0F] text-white font-semibold"
                        : "bg-[#142C44]/40 border-[#1B3652] text-slate-300 hover:bg-[#142C44]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="mb-8 border-t border-[#1B3652] pt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#FA5B0F] mb-4">
                03 · Your Organization Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@company.com"
                    className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">Company Name & Website</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Healthcare / acme.com"
                    className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">Primary Operational Challenge (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us briefly about your current workflow, lead drop-off points, or software bottlenecks..."
                  className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                />
              </div>
            </div>

            <div className="border-t border-[#1B3652] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
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
