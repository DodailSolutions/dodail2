"use client";

import * as React from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fill } from "@/lib/utils";
import type { ContactContent } from "@/lib/cms/content/defaults/forms";
import { formInput, formLabel } from "./formStyles";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({ form, success }: Pick<ContactContent, "form" | "success">) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) return setErrorMsg("Please enter your name.");
    if (!EMAIL.test(email.trim())) return setErrorMsg("Please enter a valid email address.");
    if (!message.trim()) return setErrorMsg("Please provide a brief message about your inquiry.");

    setStatus("submitting");
    try {
      const topic = new URLSearchParams(window.location.search).get("topic");
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          message: topic ? `[${topic.slice(0, 200)}] ${message.trim()}` : message.trim(),
          landing_page: "/contact",
          marketing_consent: true,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("idle");
        setErrorMsg(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setStatus("idle");
      setErrorMsg("Network error. Please try again or contact us directly.");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-emerald-300 bg-emerald-50/70 p-8 text-center shadow-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-950">{success.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{fill(success.body, { name })}</p>
        <div className="mt-6">
          <Button onClick={() => setStatus("idle")} variant="secondary" size="sm">
            {success.againLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-lg">
      {errorMsg && (
        <div role="alert" className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-4 text-xs">
        <div>
          <label htmlFor="contact-name" className={formLabel}>{form.nameLabel}</label>
          <input id="contact-name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder={form.namePlaceholder} className={formInput} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-email" className={formLabel}>{form.emailLabel}</label>
            <input id="contact-email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={form.emailPlaceholder} className={formInput} />
          </div>
          <div>
            <label htmlFor="contact-phone" className={formLabel}>{form.phoneLabel}</label>
            <input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={form.phonePlaceholder} className={formInput} />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={formLabel}>{form.messageLabel}</label>
          <textarea id="contact-message" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={form.messagePlaceholder} className={formInput} />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={status === "submitting"} variant="primary" size="lg" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {status === "submitting" ? form.submittingLabel : form.submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
