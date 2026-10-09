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
    <div className="mx-auto max-w-4xl py-16 px-4 sm:px-6 lg:px-8 text-slate-300">
      <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
        Terms of Service
      </h1>
      <p className="text-xs text-slate-400 mb-8">
        Last updated: October 2026 · Dodail Solutions Private Limited
      </p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">1. Agreement to Terms</h2>
          <p>
            By accessing or using the services of Dodail Solutions Private Limited (&quot;Dodail&quot;), you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company, you represent that you possess the authority to bind that entity.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">2. Scope of Services</h2>
          <p>
            Dodail provides software engineering, AI workflow automation design, custom software development, and digital marketing/GEO consulting. Specific deliverables, timelines, and fees are governed by individual Statements of Work (SOW).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">3. Intellectual Property & Code Ownership</h2>
          <p>
            Unless otherwise agreed in a written SOW, upon full payment for custom software deliverables, the client retains full ownership of the custom application code and database schemas developed specifically for their engagement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">4. Warranties & Disclaimers</h2>
          <p>
            We adhere to rigorous software engineering best practices. However, services are provided on an &quot;as is&quot; and &quot;as available&quot; basis regarding third-party API rate limits, platform outages (e.g. Meta, Google, OpenAI, Anthropic), or downstream infrastructure disruptions outside our control.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">5. Governing Law & Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any legal dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
          </p>
        </section>
      </div>
    </div>
  );
}
