import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Code2, Globe2, ShoppingBag, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Services & AI Solutions | Dodail Solutions",
  description:
    "Explore Dodail's end-to-end digital services: AI workflow automation, custom software, high-performance websites, e-commerce, technical SEO, and brand UI/UX.",
  alternates: {
    canonical: "https://www.dodail.com/services",
  },
  openGraph: {
    title: "Digital Services & AI Solutions | Dodail Solutions",
    description:
      "Explore Dodail's end-to-end digital services: AI workflow automation, custom software, high-performance websites, e-commerce, technical SEO, and brand UI/UX.",
    url: "https://www.dodail.com/services",
    siteName: "Dodail Solutions",
    locale: "en_IN",
    type: "website",
  },
};

const SERVICES = [
  {
    num: "01",
    title: "AI Automation & Workflows",
    icon: Bot,
    tagline: "Autonomous Process Orchestration",
    description:
      "Connect business tools and eliminate repetitive manual copy-paste work with practical AI automation, lead routing, CRM workflows, WhatsApp Cloud API integrations, and webhook pipelines designed around your process.",
    capabilities: [
      "Sub-60-second conversational lead qualification",
      "WhatsApp Business Cloud API automation & reminders",
      "Bidirectional CRM & Google Sheets sync",
      "PostgreSQL stateful queues & webhook triggers",
    ],
    href: "/services/ai-automation/",
  },
  {
    num: "02",
    title: "Custom Software & SaaS Development",
    icon: Code2,
    tagline: "Tailored Web Platforms & Portals",
    description:
      "Plan and build web applications, client portals, custom dashboards, inventory engines, and SaaS products with clear milestone scope, maintainable architecture, and secure access controls.",
    capabilities: [
      "Full-stack Next.js 16 & React 19 web applications",
      "Bespoke client & dealer management portals",
      "REST & GraphQL API design with PostgreSQL / Supabase",
      "Role-based access control (RBAC) & security hardening",
    ],
    href: "/services/website-development/",
  },
  {
    num: "03",
    title: "Website Design & Development",
    icon: Globe2,
    tagline: "Ultra-Fast, Conversion-Focused Business Sites",
    description:
      "Build fast, mobile-friendly business websites with clear messaging, conversion-focused UX, technical SEO foundations, sub-second performance, and a manageable content system.",
    capabilities: [
      "Sub-second Core Web Vitals (<1.0s LCP on mobile)",
      "Headless CMS integration & easy content editing",
      "Structured JSON-LD schema & semantic accessibility",
      "Conversion rate optimized layout & lead capture",
    ],
    href: "/services/website-development/",
  },
  {
    num: "04",
    title: "E-Commerce Development",
    icon: ShoppingBag,
    tagline: "Shopify, WooCommerce & Custom Stores",
    description:
      "Launch or improve a Shopify, WooCommerce or custom online store with conversion-centered product layouts, secure payment gateway integrations (Razorpay, Stripe), automated inventory workflows, and speed optimization.",
    capabilities: [
      "Custom Shopify theme design & checkout optimization",
      "WooCommerce architecture & high-volume scaling",
      "Payment gateway integration (UPI, Razorpay, Stripe)",
      "Cart abandonment & order notification automations",
    ],
    href: "/industries/ecommerce-brands/",
  },
  {
    num: "05",
    title: "Digital Marketing, SEO & Generative Engine Optimization (GEO)",
    icon: TrendingUp,
    tagline: "AI Search Visibility & Performance Acquisition",
    description:
      "Grow qualified traffic and pipeline through technical SEO, local SEO, high-yield paid ads, and Generative Engine Optimization (GEO). In Dodail's services, GEO stands strictly for Generative Engine Optimization: optimizing brand visibility and citations on AI search engines such as ChatGPT, Perplexity, and Google AI Overviews.",
    capabilities: [
      "Generative Engine Optimization (GEO) for ChatGPT & Perplexity",
      "Technical, on-page, and local Google SEO foundations",
      "Data-backed Google Ads & Meta paid performance funnels",
      "Real-time analytics, attribution & transparent reporting",
    ],
    href: "/services/seo/",
  },
  {
    num: "06",
    title: "Branding & UI/UX Design",
    icon: Sparkles,
    tagline: "Distinctive Visual Identities & Design Systems",
    description:
      "Create distinctive brand identity systems, modern logo design, typography hierarchies, brand guidelines, and high-fidelity UI/UX design that communicates market authority and earns trust quickly.",
    capabilities: [
      "Comprehensive logo systems & typography guidelines",
      "Product UI/UX design, wireframing & prototyping",
      "Marketing collaterals & branded presentation decks",
      "Complete design system tokens for web & mobile",
    ],
    href: "/consultation",
  },
];

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Technology & AI Solutions",
    provider: {
      "@type": "Organization",
      name: "Dodail Solutions Private Limited",
      url: "https://www.dodail.com",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dodail Core Services",
      itemListElement: SERVICES.map((s, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  return (
    <main className="min-h-screen bg-bg text-fg pt-24 pb-20 px-5 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20">
            DODAIL SERVICE ARCHITECTURES
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fg leading-tight">
            Connected Digital Systems Designed for Business Growth
          </h1>
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
            Dodail designs, builds and improves the digital systems businesses use to attract enquiries, convert customers, eliminate repetitive manual work, and understand performance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.num}
                className="p-8 rounded-2xl bg-[var(--surface-translucent)] border border-border-token hover:border-[#FA5B0F]/40 flex flex-col justify-between transition duration-200 group relative"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FA5B0F]/10 border border-[#FA5B0F]/20 flex items-center justify-center text-[#FA5B0F] group-hover:scale-110 transition duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm text-[#FA5B0F] font-semibold">{srv.num}</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-fg group-hover:text-[#FA5B0F] transition">
                      {srv.title}
                    </h2>
                    <p className="text-xs font-mono text-fg-muted mt-1">{srv.tagline}</p>
                    <p className="text-sm text-fg-muted mt-3 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-border-token">
                    <span className="text-[11px] font-mono text-fg-muted block uppercase tracking-wider">
                      Core Capabilities:
                    </span>
                    <ul className="space-y-2">
                      {srv.capabilities.map((cap, i) => (
                        <li key={i} className="text-xs text-fg-muted flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FA5B0F] shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border-token">
                  <Link
                    href={srv.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-fg group-hover:text-[#FA5B0F] transition"
                  >
                    <span>Explore Solution</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--surface)] via-[var(--surface)] to-[var(--surface)] border border-border-token flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-fg">
              Not sure which service fits your bottleneck?
            </h3>
            <p className="text-sm sm:text-base text-fg-muted max-w-xl">
              Talk directly with Gita, our AI assistant, or book a 15-minute discovery consultation with our senior solutions engineers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/consultation"
              className="px-6 py-3.5 rounded-xl bg-[#FA5B0F] hover:bg-[#E04E08] text-white text-sm font-semibold transition shadow-lg"
            >
              Book Strategy Call
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-[var(--surface-translucent)] hover:bg-[var(--surface-translucent-2)] border border-border-token text-fg text-sm font-semibold transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
