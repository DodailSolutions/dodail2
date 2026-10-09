"use client";

import * as React from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Please provide a brief message about your inquiry.");
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-16 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="orange">Direct Inquiries</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
          Let&apos;s Discuss Your Architecture
        </h1>
        <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
          Reach out directly to Dodail Solutions. Whether you have an immediate automation bottleneck or a multi-month software build, we respond promptly.
        </p>
      </section>

      <section className="mx-auto max-w-5xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Direct Contact Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/70 p-6">
            <h3 className="text-base font-bold text-white mb-4">Direct Channels</h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <p className="text-xs text-slate-400 font-medium">WhatsApp Support</p>
                <a
                  href="https://wa.me/919966400235?text=Hello%20Dodail%20Solutions,%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-2 font-semibold text-emerald-400 hover:underline"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>+91 99664 00235</span>
                </a>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">Official Email</p>
                <a
                  href="mailto:info@dodail.com"
                  className="mt-1 flex items-center gap-2 font-semibold text-white hover:text-[#FA5B0F] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#FA5B0F]" />
                  <span>info@dodail.com</span>
                </a>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">Direct Telephone</p>
                <a
                  href="tel:+919966400235"
                  className="mt-1 flex items-center gap-2 font-semibold text-white hover:text-[#FA5B0F] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#FA5B0F]" />
                  <span>+91 99664 00235</span>
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/70 p-6 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-white font-bold mb-2">
              <MapPin className="h-4 w-4 text-[#FA5B0F]" />
              <span>Registered Headquarters</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dodail Solutions Private Limited<br />
              Hyderabad, Telangana 500081<br />
              India
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 pt-3 border-t border-[#1B3652]">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Operating Hours: 9:00 AM - 7:00 PM IST (Mon - Sat)</span>
            </div>
          </div>
        </div>

        {/* Contact Form (3 cols) */}
        <div className="lg:col-span-3">
          {status === "success" ? (
            <div className="rounded-3xl border border-emerald-500/40 bg-[#0E283A] p-8 text-center shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Dispatched</h3>
              <p className="mt-2 text-sm text-slate-300">
                Thank you, <strong>{name}</strong>. A technical representative will review your message and reach out within 4 business hours.
              </p>
              <div className="mt-6">
                <Button onClick={() => setStatus("idle")} variant="secondary" size="sm">
                  Send Another Message
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[#1B3652] bg-[#0E2235]/90 p-6 sm:p-8 shadow-xl"
            >
              {errorMsg && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 font-medium">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Reddy"
                    className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@enterprise.com"
                      className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 99664 00000"
                      className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Project Scope & Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your requirements or inquiry..."
                    className="w-full rounded-xl border border-[#1B3652] bg-[#0A1B2A] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
