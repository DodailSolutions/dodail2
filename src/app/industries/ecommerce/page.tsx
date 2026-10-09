import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, CheckCircle2, Zap, Calendar, ArrowRight, MessageSquare, RotateCcw, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "E-Commerce & DTC Brand Automation | Dodail Solutions",
  description:
    "Scale DTC e-commerce operations. Sub-second Next.js storefronts, automated shipping & order tracking inquiries, and WhatsApp abandoned cart recovery.",
  alternates: {
    canonical: "/industries/ecommerce",
  },
};

export default function EcommerceIndustryPage() {
  return (
    <div className="flex flex-col gap-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">E-Commerce Architecture</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">
          High-Velocity Storefronts & Autonomous Support
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We engineer high-performance headless Next.js e-commerce storefronts and automate repetitive post-purchase tickets so your team focuses on product and brand.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book E-Commerce Strategy Session
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl w-full">
        <SectionHeader
          badge="DTC Capabilities"
          title="Engineered for Scalable Online Retail"
          description="Transforming browse-to-buy speed and customer happiness."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="h-12 w-12 rounded-2xl bg-orange-50 text-[#FF6B2C] flex items-center justify-center mb-6 border border-orange-200/60 shadow-sm">
              <Zap className="h-6 w-6" />
            </div>
            <CardTitle>Sub-500ms Headless Storefronts</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Custom Next.js frontends connected to Shopify, WooCommerce, or Supabase backends. Instant mobile catalog browsing without template bloat.
            </p>
          </Card>

          <Card>
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200/60 shadow-sm">
              <MessageSquare className="h-6 w-6" />
            </div>
            <CardTitle>Automated Order Status (WISMO)</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Customers query order status directly via website chat or WhatsApp and receive real-time courier tracking in seconds without human agent intervention.
            </p>
          </Card>

          <Card>
            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center mb-6 border border-teal-200/60 shadow-sm">
              <RotateCcw className="h-6 w-6" />
            </div>
            <CardTitle>Self-Service Return & Exchange</CardTitle>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Automate return authorization, label generation, and reverse-pickup coordination while strictly adhering to your store return policies.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-5xl w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 p-8 sm:p-12 text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Scale Your Store Without Scaling Support Payroll
        </h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto">
          Reduce tier-1 support tickets by over 60% while increasing buyer repeat purchases with conversational post-purchase updates.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Schedule a Store Architecture Review
          </Button>
        </div>
      </section>
    </div>
  );
}
