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
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">E-Commerce Architecture</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          High-Velocity Storefronts & Autonomous Support
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We engineer high-performance headless Next.js e-commerce storefronts and automate repetitive post-purchase tickets so your team focuses on product and brand.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book E-Commerce Strategy Session
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="DTC Capabilities"
          title="Engineered for Scalable Online Retail"
          description="Transforming browse-to-buy speed and customer happiness."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Zap className="h-8 w-8 text-[#FA5B0F] mb-4" />
            <CardTitle>Sub-500ms Headless Storefronts</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Custom Next.js frontends connected to Shopify, WooCommerce, or Supabase backends. Instant mobile catalog browsing without template bloat.
            </p>
          </Card>

          <Card>
            <MessageSquare className="h-8 w-8 text-emerald-400 mb-4" />
            <CardTitle>Automated Where-Is-My-Order (WISMO)</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Customers query order status directly via website chat or WhatsApp and receive real-time courier tracking in seconds without human agent intervention.
            </p>
          </Card>

          <Card>
            <RotateCcw className="h-8 w-8 text-cyan-400 mb-4" />
            <CardTitle>Self-Service Return & Exchange Flows</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Automate return authorization, label generation, and reverse-pickup coordination while adhering to your company return policies.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-[#1B3652] bg-[#0E2235]/60 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Scale your store without scaling support payroll</h2>
        <div className="mt-6 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Schedule a Store Architecture Review
          </Button>
        </div>
      </section>
    </div>
  );
}
