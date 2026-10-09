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
    <div className="flex flex-col gap-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Customer Experience</Badge>
        <h1 className="mt-5 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
          24/7 Customer Resolutions With <span className="text-[#FF6B2C]">Zero Hallucinations</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          Deploy an intelligent support employee that knows your product documentation, resolves 60%+ of tier-1 inquiries, and seamlessly hands off to humans.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Book Support Automation Call
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Talk to an Engineer
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          badge="Support Capabilities"
          title="Architected For High-Volume Precision"
          description="Combining vector search retrieval (RAG) with deterministic policy guardrails."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
              <Headphones className="h-6 w-6 text-[#FF6B2C]" />
            </div>
            <CardTitle>Omni-Channel Availability</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Integrate the same AI support brain across your website widget, WhatsApp Cloud API, email tickets, and customer portal.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle>Strict Business Knowledge Base</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              Responds solely using your approved operating manuals, refund rules, and pricing sheets. Never invents unsupported promises.
            </p>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-5">
              <Bot className="h-6 w-6 text-teal-600" />
            </div>
            <CardTitle>Context-Preserved Human Handoff</CardTitle>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
              When an issue requires human review, the conversation transfers with full summary, sentiment analysis, and suggested actions.
            </p>
          </Card>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-orange-50/20 p-10 sm:p-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Cut your first-response time from hours to seconds</h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-normal">
          Let our solutions architects design a custom support automation workflow tailored to your product stack.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Request Architecture Review
          </Button>
        </div>
      </section>
    </div>
  );
}
