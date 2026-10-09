import type { Metadata } from "next";
import Link from "next/link";
import { Headphones, CheckCircle2, Shield, Bot, ArrowRight, Calendar, MessageSquare, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "AI Customer Support & Ticketing Automation | Dodail Solutions",
  description:
    "Deliver 24/7 intelligent customer resolutions, automatic ticket triaging, and zero-wait answers trained securely on your company knowledge base.",
  alternates: {
    canonical: "/solutions/ai-customer-support",
  },
};

export default function AICustomerSupportPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Customer Experience</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          24/7 Customer Resolutions With Zero Hallucinations
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Deploy an intelligent support employee that knows your product documentation, resolves 60%+ of tier-1 inquiries, and seamlessly hands off to humans.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book Support Automation Call
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Support Capabilities"
          title="Architected For High-Volume Precision"
          description="Combining vector search retrieval (RAG) with deterministic policy guardrails."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Headphones className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>Omni-Channel Availability</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Integrate the same AI support brain across your website widget, WhatsApp Cloud API, email tickets, and customer portal.
            </p>
          </Card>

          <Card>
            <Shield className="h-8 w-8 text-emerald-400 mb-4" />
            <CardTitle>Strict Business Knowledge Base</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Responds solely using your approved operating manuals, refund rules, and pricing sheets. Never invents unsupported promises.
            </p>
          </Card>

          <Card>
            <Bot className="h-8 w-8 text-cyan-400 mb-4" />
            <CardTitle>Context-Preserved Human Handoff</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              When an issue requires human review, the conversation transfers with full summary, sentiment analysis, and suggested actions.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Cut your first-response time from hours to seconds</h2>
        <div className="mt-6 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Request Architecture Review
          </Button>
        </div>
      </section>
    </div>
  );
}
