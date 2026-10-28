import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, CheckCircle2, Clock, Layers, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Products & Platforms | Dodail Solutions",
  description:
    "Explore Dodail's software products, business tools, and internal platforms — including BillBooky, Dodail AI Social, and custom enterprise accelerators.",
  alternates: {
    canonical: "https://www.dodail.com/products",
  },
  openGraph: {
    title: "Products & Platforms | Dodail Solutions",
    description:
      "Explore Dodail's software products, business tools, and internal platforms — including BillBooky, Dodail AI Social, and custom enterprise accelerators.",
    url: "https://www.dodail.com/products",
    siteName: "Dodail Solutions",
    locale: "en_IN",
    type: "website",
  },
};

interface ProductItem {
  name: string;
  category: string;
  status: "Available" | "Private Beta" | "In Development" | "Concept" | "Delivered Project";
  statusColor: string;
  description: string;
  features: string[];
  url?: string;
  ctaLabel: string;
  ctaHref: string;
  isExternal?: boolean;
}

const PRODUCTS: ProductItem[] = [
  {
    name: "BillBooky",
    category: "Billing & Business Operations",
    status: "Available",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description:
      "A Dodail-associated business tool designed to simplify professional invoicing, customer account tracking, and automated payment receipts.",
    features: ["Quick GST & Standard Invoicing", "Client Account Management", "Payment Status Tracking", "Mobile-Optimized Interface"],
    url: "https://billbooky.dodail.com/",
    ctaLabel: "Visit BillBooky",
    ctaHref: "https://billbooky.dodail.com/",
    isExternal: true,
  },
  {
    name: "Dodail AI Social",
    category: "Agency Social Media Intelligence",
    status: "In Development",
    statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description:
      "A unified social media operations platform built for modern agencies and brands: visual content calendar, AI-assisted copy drafting, client review approvals, and publishing automation.",
    features: ["Client Approval Workflow", "AI Content Drafting", "Multi-Account Calendar", "Performance Analytics"],
    ctaLabel: "Join Beta Waitlist",
    ctaHref: "/contact?subject=Dodail+AI+Social+Beta",
  },
  {
    name: "Rentcot",
    category: "Resort & Farmhouse Booking Marketplace",
    status: "Delivered Project",
    statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description:
      "A complete hospitality marketplace engineered by Dodail: property search, live availability calendars, booking reservations, and responsive mobile UX.",
    features: ["Property Listing Directory", "Availability & Reservation Engine", "Interactive Map Discovery", "Guest Reviews & Inquiries"],
    url: "https://www.rentcot.in/",
    ctaLabel: "Explore Rentcot",
    ctaHref: "https://www.rentcot.in/",
    isExternal: true,
  },
  {
    name: "Manufacturing OS",
    category: "Industrial Workflow Software",
    status: "Concept",
    statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description:
      "A modular operations architecture designed to replace fragmented spreadsheets in factory floors with unified order tracking, inventory synchronization, and dealer dispatch portals.",
    features: ["Dealer Order Management", "Inventory Telemetry", "Dispatch Stage Tracking", "ERP/Tally Connectors"],
    ctaLabel: "Discuss Custom Build",
    ctaHref: "/consultation",
  },
  {
    name: "TinyRide",
    category: "School Transport Coordination",
    status: "Concept",
    statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description:
      "A concept mobile application architecture for coordinated student transport between parents, designated drivers, and school administrators.",
    features: ["Parent Real-Time ETA", "Driver Route Management", "Student Attendance Verification", "School Admin Dashboard"],
    ctaLabel: "Explore Mobile Capabilities",
    ctaHref: "/consultation",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-bg text-fg pt-24 pb-20 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF6B2C]/10 text-[#FF6B2C] border border-[#FF6B2C]/20">
            DODAIL SOFTWARE ECOSYSTEM
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fg leading-tight">
            Products, Platforms &amp; Accelerators
          </h1>
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
            In addition to custom client engineering, Dodail develops specialized business tools and modular software frameworks. Every product is clearly marked with its verified commercial availability status.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {PRODUCTS.map((prod, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[var(--surface-translucent)] border border-border-token hover:border-[#FF6B2C]/30 flex flex-col justify-between transition duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-fg-muted">{prod.category}</span>
                  <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full border ${prod.statusColor}`}>
                    {prod.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-fg group-hover:text-[#FF6B2C] transition">
                    {prod.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-fg-muted mt-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border-token">
                  <span className="text-[11px] font-mono text-fg-muted block">Key Features:</span>
                  <ul className="space-y-1.5">
                    {prod.features.map((f, i) => (
                      <li key={i} className="text-xs text-fg-muted flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-border-token">
                {prod.isExternal ? (
                  <a
                    href={prod.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6B2C] hover:underline"
                  >
                    <span>{prod.ctaLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href={prod.ctaHref}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-fg hover:text-[#FF6B2C] transition"
                  >
                    <span>{prod.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Build Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[var(--surface)] to-[var(--surface)] border border-border-token flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-fg">
              Need a bespoke product or proprietary software engine?
            </h3>
            <p className="text-sm text-fg-muted max-w-xl">
              Dodail engineers end-to-end custom SaaS products, client dashboards, and mobile applications with 100% intellectual property ownership.
            </p>
          </div>
          <Link
            href="/consultation"
            className="px-6 py-3 rounded-xl bg-[#FF6B2C] hover:bg-[#E8541A] text-white text-sm font-semibold transition shrink-0 shadow-lg"
          >
            Schedule Product Discovery
          </Link>
        </div>
      </div>
    </main>
  );
}
