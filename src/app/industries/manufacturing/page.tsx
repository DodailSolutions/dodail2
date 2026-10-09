import type { Metadata } from "next";
import Link from "next/link";
import { Factory, CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck, Cpu, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Manufacturing & Industrial Automation | Dodail Solutions",
  description:
    "Automate supply chain dispatches, vendor quotation comparisons, machine maintenance logs, and production status updates with Dodail Solutions.",
  alternates: {
    canonical: "/industries/manufacturing",
  },
};

export default function ManufacturingIndustryPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">Industrial Automation</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Precision Workflows for Modern Manufacturing & Supply Chains
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We help manufacturing plants, fabrication units, and distributors eliminate manual paperwork, synchronize warehouse inventory, and deliver real-time dispatch alerts to buyers.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/consultation" variant="primary" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Book Industrial Automation Audit
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Factory Workflows"
          title="Engineered for Zero Operational Downtime"
          description="Connecting shop-floor production logs, vendor purchase orders, and warehouse logistics."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Factory className="h-8 w-8 text-[#FF6B2C] mb-4" />
            <CardTitle>PO & Vendor Quotation Triage</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Parse raw vendor quotation PDFs and WhatsApp rate sheets automatically. Compare unit costs against past purchase orders and flag discrepancies before manager sign-off.
            </p>
          </Card>

          <Card>
            <Cpu className="h-8 w-8 text-[#27D3C2] mb-4" />
            <CardTitle>Dispatch & Logistics Notifications</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              When a consignment leaves the factory dock, automatically dispatch LR copies, weighment slips, and real-time tracking links to clients via WhatsApp and email.
            </p>
          </Card>

          <Card>
            <Layers className="h-8 w-8 text-amber-400 mb-4" />
            <CardTitle>Preventive Maintenance Logs</CardTitle>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Replace paper checklists with mobile QR audits. Machine operating hours trigger automated maintenance tickets and spare-parts replenishment requests in PostgreSQL.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0C2233] p-8 sm:p-12 text-center">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Ready to Modernize Your Production Operations?
        </h2>
        <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
          Schedule a 30-minute operational assessment with our engineering team to map your factory bottlenecks.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/consultation" variant="primary" size="lg">
            Schedule Factory Operations Review
          </Button>
        </div>
      </section>
    </div>
  );
}
