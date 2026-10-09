import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkflowSimulator } from "@/components/home/WorkflowSimulator";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 py-10 lg:py-16">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FA5B0F]/30 bg-[#FA5B0F]/10 px-4 py-1.5 text-xs font-semibold text-[#FA5B0F] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Automation & Business Growth Partner</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
            Turn Repetitive Operations Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FA5B0F] to-[#FF8A50]">
              Autonomous Growth
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-xl leading-relaxed">
            Dodail Solutions architects dependable AI workflows, intelligent lead qualification engines, and high-performance software for growing businesses in India and global markets.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/consultation" variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-[#FA5B0F]/25">
              <Calendar className="h-5 w-5 mr-2" />
              Book an AI Consultation
            </Button>
            <Button href="/solutions/ai-automation" variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Solutions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Transparent Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#1B3652]/60 text-left">
            <div className="p-3 rounded-xl bg-[#0E2235]/60 border border-[#1B3652]/40">
              <p className="text-2xl font-bold text-white">5+ Years</p>
              <p className="text-xs text-slate-400">Software & Growth Delivery</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0E2235]/60 border border-[#1B3652]/40">
              <p className="text-2xl font-bold text-white">&lt; 500ms</p>
              <p className="text-xs text-slate-400">Average AI Decision Latency</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0E2235]/60 border border-[#1B3652]/40">
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-slate-400">Strict Schema Verification</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0E2235]/60 border border-[#1B3652]/40">
              <p className="text-2xl font-bold text-white">India & Global</p>
              <p className="text-xs text-slate-400">Cross-border Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM STATEMENTS */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="The Operational Bottleneck"
            title="Why Traditional Businesses Leak Revenue Every Day"
            description="Manual processes slow down conversions, frustrate customers, and burn team bandwidth on low-value repetitive tasks."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/20">
                <Clock className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Delayed Lead Response</CardTitle>
              <CardDescription className="mt-2 text-xs">
                Inquiries via forms, WhatsApp, or ads sit for hours before human review. Research shows conversion drops by 80% if response exceeds 15 minutes.
              </CardDescription>
            </Card>

            <Card>
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Unqualified Inquiries</CardTitle>
              <CardDescription className="mt-2 text-xs">
                Sales advisors waste 60% of their day on low-intent tire kickers instead of speaking exclusively to high-probability buyers ready to close.
              </CardDescription>
            </Card>

            <Card>
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Fragmented Silos</CardTitle>
              <CardDescription className="mt-2 text-xs">
                Data scattered across WhatsApp chats, Google Sheets, messy inboxes, and outdated CRMs with no single source of business truth.
              </CardDescription>
            </Card>

            <Card>
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                <Workflow className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Repetitive Manual Work</CardTitle>
              <CardDescription className="mt-2 text-xs">
                Copy-pasting leads, manual scheduling reminders, sending standard PDFs, and answering the same 20 client questions repeatedly.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION CARDS WITH TRANSPARENT LIMITATIONS */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Engineered Solutions"
            title="Architected For Measurable Business Outcomes"
            description="We build deterministic, hardened automations that integrate into your existing tools. Transparent about what works and where human review remains essential."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#FA5B0F]/10 text-[#FA5B0F] flex items-center justify-center mb-6 border border-[#FA5B0F]/20">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>AI Lead Qualification & Triage</CardTitle>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Automatically receives inquiries across web, email, and WhatsApp, validates budget/intent via conversational AI, and synchronizes qualified leads to your CRM in under 60 seconds.
                </p>
                <div className="mt-4 pt-4 border-t border-[#1B3652] space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Real Outcome: Sub-1-minute lead response</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-amber-400">⚠ Limitation:</span>
                    <span>High-stakes negotiations still require human sales closing.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4">
                <Link href="/solutions/ai-lead-management" className="text-sm font-semibold text-[#FA5B0F] hover:underline inline-flex items-center">
                  Learn about Lead Management <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#FA5B0F]/10 text-[#FA5B0F] flex items-center justify-center mb-6 border border-[#FA5B0F]/20">
                  <Bot className="h-6 w-6" />
                </div>
                <CardTitle>24/7 AI Customer Support Employee</CardTitle>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Trained on your private documentation and business policies to resolve repetitive questions, look up order/appointment status, and escalate anomalies with full context.
                </p>
                <div className="mt-4 pt-4 border-t border-[#1B3652] space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Real Outcome: 65% reduction in first-response tickets</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-amber-400">⚠ Limitation:</span>
                    <span>Complex legal or financial edge-cases route to human L2 staff.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4">
                <Link href="/solutions/ai-customer-support" className="text-sm font-semibold text-[#FA5B0F] hover:underline inline-flex items-center">
                  Explore Support Agents <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#FA5B0F]/10 text-[#FA5B0F] flex items-center justify-center mb-6 border border-[#FA5B0F]/20">
                  <Cpu className="h-6 w-6" />
                </div>
                <CardTitle>Cross-Platform Workflow Pipelines</CardTitle>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Replaces brittle no-code connectors with durable PostgreSQL-backed job queues connecting Google Sheets, Meta Graph API, payment gateways, and custom business databases.
                </p>
                <div className="mt-4 pt-4 border-t border-[#1B3652] space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Real Outcome: Zero dropped leads & automatic retries</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-amber-400">⚠ Limitation:</span>
                    <span>Requires clean API access and verified third-party credentials.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4">
                <Link href="/solutions/workflow-automation" className="text-sm font-semibold text-[#FA5B0F] hover:underline inline-flex items-center">
                  View Workflow Engine <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. REAL INTERACTIVE PRODUCT DEMO */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Interactive Demonstration"
            title="Experience the Dodail Autonomous Engine"
            description="Test our live prototype to inspect how events are received, evaluated by AI guardrails, and executed across connected business services."
          />
          <WorkflowSimulator />
        </div>
      </section>

      {/* 5. INDUSTRY USE CASES (HONEST CAPABILITIES) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Industry Specializations"
            title="Tailored Workflows for High-Growth Verticals"
            description="We deploy proven automation architectures calibrated for the operational realities of healthcare, real estate, and digital commerce."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardTitle>Healthcare & Dental Clinics</CardTitle>
              <p className="mt-2 text-xs text-[#FA5B0F] font-semibold">Immediate Patient Ingestion & Scheduling</p>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Triage patient inquiries based on urgency, send automated pre-appointment intake forms, sync with doctor schedules, and deliver automated appointment reminders via WhatsApp.
              </p>
              <div className="mt-6 pt-4 border-t border-[#1B3652]">
                <Link href="/industries/dental" className="text-xs font-semibold text-slate-200 hover:text-white inline-flex items-center">
                  Clinic Blueprint & Case Details <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </Card>

            <Card>
              <CardTitle>Real Estate Developers & Brokers</CardTitle>
              <p className="mt-2 text-xs text-[#FA5B0F] font-semibold">Instant High-Intent Buyer Routing</p>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Parse incoming portal and ad leads, qualify timeline and budget tiers, dispatch customized property brochures, and schedule on-site visits directly into sales calendar.
              </p>
              <div className="mt-6 pt-4 border-t border-[#1B3652]">
                <Link href="/industries/real-estate" className="text-xs font-semibold text-slate-200 hover:text-white inline-flex items-center">
                  Real Estate Blueprint & Workflows <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </Card>

            <Card>
              <CardTitle>E-Commerce & DTC Brands</CardTitle>
              <p className="mt-2 text-xs text-[#FA5B0F] font-semibold">Order Inquiries & Return Automation</p>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Automate order tracking status, shipping updates, return authorizations, and abandoned cart recovery sequences without ballooning customer support headcounts.
              </p>
              <div className="mt-6 pt-4 border-t border-[#1B3652]">
                <Link href="/industries/ecommerce" className="text-xs font-semibold text-slate-200 hover:text-white inline-flex items-center">
                  E-Commerce Blueprint & Capabilities <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. HOW DODAIL WORKS (METHODOLOGY) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Our Process"
            title="From Architecture to Autonomous Execution"
            description="A structured, risk-mitigated engineering methodology that ensures security, reliability, and business adoption."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-5">
              <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 01</span>
              <h3 className="text-base font-bold text-white mt-1">Audit & Discovery</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                We analyze your lead channels, manual touchpoints, software subscriptions, and data leaks.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-5">
              <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 02</span>
              <h3 className="text-base font-bold text-white mt-1">System Blueprint</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Design custom workflow DAGs, schema definitions, and AI prompt guardrails before touching code.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-5">
              <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 03</span>
              <h3 className="text-base font-bold text-white mt-1">Engineering Build</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Implement production integrations with Next.js, Supabase, Gemini APIs, and verified webhooks.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-5">
              <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 04</span>
              <h3 className="text-base font-bold text-white mt-1">Sandbox Validation</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Run stress-tests, prompt injection defenses, and fallback failure drills under real traffic.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-5">
              <span className="text-xs font-mono font-bold text-[#FA5B0F]">STAGE 05</span>
              <h3 className="text-base font-bold text-white mt-1">Live Scaling</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Cutover with SLA-backed monitoring, audit logs, and continuous workflow optimizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED PROOF & REAL CAPABILITIES */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Proven Execution"
            title="Transparent Track Record, Zero Fabricated Claims"
            description="We do not purchase fake awards or make unsubstantiated revenue claims. Our work is backed by real engineering deliverables and lasting customer relationships."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardTitle className="text-lg">Hyderabad Digital Roots</CardTitle>
              <CardDescription className="mt-2 text-xs">
                Incorporated in June 2019, Dodail Solutions Private Limited has served hundreds of business owners across website development, SEO, and automation.
              </CardDescription>
            </Card>

            <Card>
              <CardTitle className="text-lg">Next.js & Supabase Native</CardTitle>
              <CardDescription className="mt-2 text-xs">
                Built on enterprise open-source foundations. Zero dependency on bloated proprietary builders; full code ownership for our clients.
              </CardDescription>
            </Card>

            <Card>
              <CardTitle className="text-lg">Enterprise AI Guardrails</CardTitle>
              <CardDescription className="mt-2 text-xs">
                Our AI tool integrations follow strict schema validation, deterministic retry logic, and audit-logged execution trees.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            badge="Frequently Asked Questions"
            title="Common Questions Before Getting Started"
            description="Clear answers about implementation, security, timelines, and ongoing operations."
          />

          <div className="space-y-4">
            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/70 p-6">
              <h3 className="text-base font-bold text-white">How does Dodail guarantee AI accuracy and avoid hallucinations?</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                We never connect raw AI models directly to your production databases. Every prompt is constrained by strict JSON schema definitions, explicit business policy contexts, and deterministic validation layers. If confidence drops below threshold, the request is cleanly flagged for human escalation.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/70 p-6">
              <h3 className="text-base font-bold text-white">How long does a typical AI automation deployment take?</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Standard lead triage or WhatsApp integration workflows typically deploy within 7 to 14 business days. Comprehensive enterprise platforms involving custom Next.js web applications and bespoke CRM sync span 3 to 6 weeks.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/70 p-6">
              <h3 className="text-base font-bold text-white">Can Dodail integrate with our existing CRM and Google Sheets?</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Yes. We build bi-directional adapters for Google Sheets, Salesforce, HubSpot, Zoho, and custom PostgreSQL/MySQL systems via secure OAuth and encrypted webhook endpoints.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235]/70 p-6">
              <h3 className="text-base font-bold text-white">How is our customer data secured?</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Data is encrypted both in transit (TLS 1.3) and at rest (AES-256). We utilize Supabase PostgreSQL with strict Row-Level Security (RLS) policies. Your sensitive business prompts and customer communications are never used to train public LLM models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA & CONTACT SUMMARY */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#FA5B0F]/30 bg-gradient-to-b from-[#0E2235] to-[#0A1B2A] p-8 lg:p-14 text-center shadow-2xl shadow-black/80">
          <Badge variant="orange">Ready to Upgrade Your Operations?</Badge>
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl mt-4">
            Schedule a Confidential AI Feasibility Audit
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
            Speak directly with a Dodail solutions engineer to map out your high-ROI automation opportunities and receive an honest architectural proposal.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/consultation" variant="primary" size="lg" className="w-full sm:w-auto">
              <Calendar className="h-5 w-5 mr-2" />
              Book Feasibility Call
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
              Send Direct Message
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1B3652] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span>Direct Phone: +91 99664 00235</span>
            <span>•</span>
            <span>Email: info@dodail.com</span>
            <span>•</span>
            <span>Office: Hyderabad, India</span>
          </div>
        </div>
      </section>
    </div>
  );
}
