"use client";

import * as React from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, fill, whatsappHref } from "@/lib/utils";
import type { ConsultationContent } from "@/lib/cms/content/defaults/forms";
import { formInput, formLabel } from "./formStyles";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TIME = /^([01]?\d|2[0-3]):([0-5]\d)$/;

/** ISO timestamp for the chosen IST start time on the next weekday (bookings are never same-day). */
function slotIso(time: string): string {
  const [, h = "10", m = "00"] = TIME.exec(time.trim()) ?? [];
  const day = new Date();
  day.setDate(day.getDate() + 1);
  if (day.getDay() === 0) day.setDate(day.getDate() + 1); // skip Sunday
  const date = day.toISOString().slice(0, 10);
  return new Date(`${date}T${h.padStart(2, "0")}:${m}:00+05:30`).toISOString();
}

type Props = Pick<ConsultationContent, "steps" | "topics" | "slots" | "form" | "success"> & { whatsapp: string };

export function BookingForm({ steps, topics, slots, form, success, whatsapp }: Props) {
  const [topic, setTopic] = React.useState(topics[0] ?? "");
  const [slotIndex, setSlotIndex] = React.useState(0);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const slot = slots[slotIndex] ?? slots[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) return setErrorMsg("Please provide your full name.");
    if (!EMAIL.test(email.trim())) return setErrorMsg("Please provide a valid business email address.");
    if (phone.replace(/\D/g, "").length < 8) return setErrorMsg("Please provide a valid contact number or WhatsApp.");

    setStatus("submitting");
    try {
      const res = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "prod-arch-discovery",
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim() || undefined,
          notes: `Topic: ${topic}. Notes: ${notes.trim()}`,
          slotIso: slotIso(slot?.time ?? "10:00"),
          timeZone: "Asia/Kolkata",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus("idle");
        setErrorMsg(data.error || "Unable to secure slot. Please select an alternate time.");
      }
    } catch {
      setStatus("idle");
      setErrorMsg("Network error. Please try again or contact us directly.");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-emerald-300 bg-emerald-50/70 p-6 sm:p-8 lg:p-12 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">{success.title}</h2>
        <p className="mt-4 text-slate-600 max-w-lg mx-auto">{fill(success.body, { name, topic, slot: slot?.label ?? "" })}</p>
        <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto text-xs text-slate-700 text-left space-y-2 shadow-xs">
          <p><strong>Attendee:</strong> {email} ({phone})</p>
          {company && <p><strong>Company:</strong> {company}</p>}
          <p>{success.nextStep}</p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Button href="/" variant="outline" size="md">{success.homeLabel}</Button>
          {whatsapp && (
            <a
              href={whatsappHref(whatsapp, fill(success.whatsappMessage, { name }))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              {success.whatsappLabel}
            </a>
          )}
        </div>
      </div>
    );
  }

  const choice = (selected: boolean, dark?: boolean) =>
    cn(
      "rounded-xl border text-left text-sm sm:text-xs transition-all active:scale-[0.98]",
      selected
        ? dark
          ? "bg-slate-900 border-slate-900 text-white font-semibold shadow-xs"
          : "bg-orange-50 border-[#FF6B2C] text-[#C2410C] font-semibold ring-1 ring-[#FF6B2C]"
        : "bg-slate-50/70 border-slate-200 text-slate-700 font-medium hover:text-slate-950 hover:bg-slate-100"
    );
  const stepLabel = "block text-xs font-bold uppercase tracking-wider text-[#C2410C] mb-3 font-mono";

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-10 shadow-xl">
      {errorMsg && (
        <div role="alert" className="mb-6 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {topics.length > 0 && (
        <fieldset className="mb-8">
          <legend className={stepLabel}>{steps.topic}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {topics.map((t) => (
              <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)} className={cn("p-3.5", choice(topic === t))}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {slots.length > 0 && (
        <fieldset className="mb-8">
          <legend className={stepLabel}>{steps.slot}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {slots.map((s, i) => (
              <button key={`${s.label}-${i}`} type="button" aria-pressed={slotIndex === i} onClick={() => setSlotIndex(i)} className={cn("p-3 text-center", choice(slotIndex === i, true))}>
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="mb-8 border-t border-slate-100 pt-6">
        <legend className={cn(stepLabel, "float-left w-full mb-4")}>{steps.details}</legend>
        <div className="clear-both grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="book-name" className={formLabel}>{form.nameLabel}</label>
            <input id="book-name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder={form.namePlaceholder} className={formInput} />
          </div>
          <div>
            <label htmlFor="book-email" className={formLabel}>{form.emailLabel}</label>
            <input id="book-email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={form.emailPlaceholder} className={formInput} />
          </div>
          <div>
            <label htmlFor="book-phone" className={formLabel}>{form.phoneLabel}</label>
            <input id="book-phone" type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={form.phonePlaceholder} className={formInput} />
          </div>
          <div>
            <label htmlFor="book-company" className={formLabel}>{form.companyLabel}</label>
            <input id="book-company" type="text" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={form.companyPlaceholder} className={formInput} />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="book-notes" className={formLabel}>{form.notesLabel}</label>
          <textarea id="book-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={form.notesPlaceholder} className={formInput} />
        </div>
      </fieldset>

      <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{form.privacyNote}</span>
        </div>
        <Button type="submit" disabled={status === "submitting"} variant="primary" size="lg" className="w-full sm:w-auto">
          {status === "submitting" ? form.submittingLabel : form.submitLabel}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}
