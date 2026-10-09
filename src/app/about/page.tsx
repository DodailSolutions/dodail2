import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Target, Users, Code, Award, ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About Dodail Solutions | AI Automation & Engineering Partner",
  description:
    "Learn about Dodail Solutions Private Limited. Established in 2019 in Hyderabad, India, building reliable AI automations, custom software, and digital growth engines.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Company & Mission</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">
          Engineering Pragmatic AI & Digital Growth Since 2019
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Dodail Solutions Private Limited was founded in Hyderabad with a singular conviction: businesses grow faster when technology automates the mundane and amplifies human ingenuity.
        </p>
      </section>

      {/* Story & Evolution */}
      <section className="mx-auto max-w-5xl w-full">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-wider">OUR STORY</span>
              <h2 className="text-2xl font-bold text-slate-950 mt-2">
                From Custom Web Engineering to Autonomous Enterprise Systems
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Founded on June 2, 2019, Dodail Solutions began as a web development and digital marketing agency delivering performant websites and measurable search growth for clients across India, North America, and the Middle East.
              </p>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                With the advent of Large Language Models and cloud-native serverless infrastructure, we evolved into a full-lifecycle <strong>AI Automation and Software Growth Platform</strong>. We don&apos;t just build static websites; we build autonomous workflows that capture leads, resolve customer inquiries, and synchronize business data in real time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center shadow-xs">
                <p className="text-3xl font-extrabold text-[#FF6B2C]">2019</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Year Incorporated</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center shadow-xs">
                <p className="text-3xl font-extrabold text-slate-900">100+</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Digital Systems Delivered</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center shadow-xs">
                <p className="text-3xl font-extrabold text-emerald-600">0</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Fabricated Reviews</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center shadow-xs">
                <p className="text-3xl font-extrabold text-[#0D9488]">100%</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Clean Code Ownership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mx-auto max-w-7xl w-full">
        <SectionHeader
          badge="Guiding Tenets"
          title="Our Architectural Commitments"
          description="How we maintain production-grade quality, customer trust, and long-term maintainability."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200/60 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle>Deterministic Guardrails</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              We never let AI run unconstrained on customer data. Every automated action is validated against strict JSON schema contracts with audit trails and human escalation paths.
            </p>
          </Card>

          <Card>
            <div className="h-12 w-12 rounded-2xl bg-orange-50 text-[#FF6B2C] flex items-center justify-center mb-6 border border-orange-200/60 shadow-sm">
              <Code className="h-6 w-6" />
            </div>
            <CardTitle>Open Standard Foundations</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Built on Next.js, TypeScript, PostgreSQL, and standard cloud APIs. We do not trap clients inside fragile, closed-source no-code lock-in. You own your code and your database.
            </p>
          </Card>

          <Card>
            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center mb-6 border border-teal-200/60 shadow-sm">
              <Target className="h-6 w-6" />
            </div>
            <CardTitle>Measurable Commercial ROI</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              We only build automations that generate revenue, accelerate response times, or eliminate verifiable labor costs. If a workflow doesn&apos;t justify its investment, we say so upfront.
            </p>
          </Card>
        </div>
      </section>

      {/* Legal & Corporate Registration */}
      <section className="mx-auto max-w-5xl w-full rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-2">Corporate Identity & Verification</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Legal Entity:</strong> Dodail Solutions Private Limited (CIN Registered in Telangana, India).<br />
          <strong>Registered Address:</strong> Hyderabad, Telangana 500081, India.<br />
          <strong>Official Contact:</strong> info@dodail.com · +91 99664 00235.<br />
          <strong>Core Technologies:</strong> Next.js 16, React 19, Tailwind CSS, Supabase PostgreSQL, Google Gemini API, Meta Graph API, Razorpay, Stripe.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
          Ready to partner with an engineering-first growth team?
        </h2>
        <div className="mt-6 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Schedule Introductory Call
          </Button>
        </div>
      </section>
    </div>
  );
}
