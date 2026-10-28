import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Dodail Solutions",
  description:
    "Find answers to common questions about Dodail's website development, custom software, AI automation, SEO, pricing models, and delivery timelines.",
  alternates: {
    canonical: "https://www.dodail.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Dodail Solutions",
    description:
      "Find answers to common questions about Dodail's website development, custom software, AI automation, SEO, pricing models, and delivery timelines.",
    url: "https://www.dodail.com/faq",
    siteName: "Dodail Solutions",
    locale: "en_IN",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What does Dodail Solutions do?",
    a: "Dodail designs, builds and improves the digital systems businesses use to grow — from websites and e-commerce to custom software, AI-enabled workflow automation, SEO, digital marketing, and branding/UI/UX services.",
  },
  {
    q: "Where is Dodail based?",
    a: "Dodail Solutions is headquartered in Hyderabad, Telangana, India. We operate from Hirkani Tower, Maruthi Nagar, Hyderabad, India.",
  },
  {
    q: "Does Dodail work with clients outside India?",
    a: "Yes. Dodail serves businesses across India, the United Arab Emirates (Dubai/Abu Dhabi), the United Kingdom, and the United States with dedicated timezone coordination and remote collaboration.",
  },
  {
    q: "Can Dodail build a custom web application?",
    a: "Yes. Custom web software is a core service. We engineer bespoke client portals, internal dashboards, SaaS platforms, and secure APIs using Next.js, React, Node.js, and PostgreSQL.",
  },
  {
    q: "Does Dodail build Shopify and WooCommerce websites?",
    a: "Yes. We develop custom Shopify stores, headless e-commerce platforms, and WooCommerce solutions with tailored themes, conversion-centered checkout flows, and payment gateway integrations.",
  },
  {
    q: "Can Dodail automate WhatsApp enquiries?",
    a: "Yes. We deploy automated WhatsApp lead capture, appointment confirmations, and customer support workflows using official WhatsApp Business Cloud API connectors.",
  },
  {
    q: "Does Dodail guarantee Google rankings, leads, or revenue?",
    a: "No. We never make misleading ranking or revenue guarantees. Search engines and ad platforms are governed by competition, search intent, and platform algorithms. We commit to rigorous technical execution, transparent reporting, and continuous data-backed optimization.",
  },
  {
    q: "How much does a website or software build cost?",
    a: "Pricing is transparent and tied directly to project scope. Starter workflow automations typically range from ₹75,000 to ₹1,50,000 INR. Custom websites, client portals, and SaaS platforms are milestone-scoped after an architecture discovery consultation.",
  },
  {
    q: "How long does a project take?",
    a: "Implementation timelines depend on scope: automation pipelines typically deploy within 7 to 14 business days; business websites and brand identities take 4 to 8 weeks; comprehensive custom software applications are delivered in structured 2-week agile sprints.",
  },
  {
    q: "Who owns the code, intellectual property, and ad accounts?",
    a: "You own 100% of all code, repositories, design files, accounts, and intellectual property upon milestone settlement. Dodail operates with zero vendor lock-in.",
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-bg text-fg pt-24 pb-20 px-5 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF6B2C]/10 text-[#FF6B2C] border border-[#FF6B2C]/20">
            TRANSPARENT ANSWERS
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fg leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-fg-muted max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Dodail&apos;s digital engineering, AI automations, pricing transparency, and delivery process.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 pt-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--surface-translucent)] border border-border-token hover:border-[#FF6B2C]/30 transition duration-200 space-y-3"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-fg flex items-start gap-3">
                <span className="text-[#FF6B2C] font-mono text-sm pt-1">0{idx + 1}.</span>
                <span>{faq.q}</span>
              </h2>
              <p className="text-sm sm:text-base text-fg-muted leading-relaxed pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[var(--surface)] to-[var(--surface)] border border-border-token text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-fg">
            Have a project in mind or need a custom estimate?
          </h3>
          <p className="text-sm text-fg-muted max-w-lg mx-auto">
            Speak directly with our senior solutions architects or talk with Gita, our AI assistant, to explore options.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B2C] hover:bg-[#E8541A] text-white text-sm font-semibold transition shadow-lg"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--surface-translucent)] hover:bg-[var(--surface-translucent-2)] border border-border-token text-fg text-sm font-semibold transition"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
