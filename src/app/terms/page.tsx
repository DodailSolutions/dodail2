import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dodail Solutions",
  description: "Dodail Solutions Private Limited Terms of Service and master consulting agreement.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl py-20 px-4 sm:px-6 lg:px-8 text-slate-700">
      <h1 className="text-3xl font-extrabold text-slate-950 sm:text-4xl mb-4 tracking-tight">
        Terms of Service
      </h1>
      <p className="text-xs font-mono text-slate-500 mb-8">
        Last updated: October 2026 · Dodail Solutions Private Limited
      </p>

      <div className="space-y-8 text-sm leading-relaxed border-t border-slate-200 pt-8">
        <section>
          <h2 className="text-lg font-bold text-slate-950 mb-2">1. Agreement to Terms</h2>
          <p className="text-slate-600">
            By accessing or using the services of Dodail Solutions Private Limited (&quot;Dodail&quot;), you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company, you represent that you possess the authority to bind that entity.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-950 mb-2">2. Scope of Services</h2>
          <p className="text-slate-600">
            Dodail provides software engineering, AI workflow automation design, custom software development, and digital marketing/GEO consulting. Specific deliverables, timelines, and fees are governed by individual Statements of Work (SOW).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-950 mb-2">3. Intellectual Property & Code Ownership</h2>
          <p className="text-slate-600">
            Unless otherwise agreed in a written SOW, upon full payment for custom software deliverables, the client retains full ownership of the custom application code and database schemas developed specifically for their engagement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-950 mb-2">4. Warranties & Disclaimers</h2>
          <p className="text-slate-600">
            We adhere to rigorous software engineering best practices. However, services are provided on an &quot;as is&quot; and &quot;as available&quot; basis regarding third-party API rate limits, platform outages (e.g. Meta, Google, OpenAI, Anthropic), or downstream infrastructure disruptions outside our control.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-950 mb-2">5. Governing Law & Jurisdiction</h2>
          <p className="text-slate-600">
            These Terms shall be governed by and construed in accordance with the laws of India. Any legal dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
          </p>
        </section>
      </div>
    </div>
  );
}
