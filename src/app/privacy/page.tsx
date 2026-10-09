import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dodail Solutions",
  description: "Dodail Solutions Private Limited Privacy Policy and data protection terms.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl py-16 px-4 sm:px-6 lg:px-8 text-slate-300">
      <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
        Privacy Policy
      </h1>
      <p className="text-xs text-slate-400 mb-8">
        Last updated: October 2026 · Dodail Solutions Private Limited
      </p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">1. Overview</h2>
          <p>
            Dodail Solutions Private Limited (&quot;Dodail&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your personal and corporate data. This policy explains what information we collect when you visit our website, book consultations, or utilize our AI automation platforms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">2. Information We Collect</h2>
          <p>
            We collect information provided directly by you, including your name, business email address, telephone/WhatsApp number, company details, and inquiry descriptions through our consultation forms and communication channels.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">3. Artificial Intelligence & Data Isolation</h2>
          <p>
            We adhere to strict enterprise AI ethics. Any customer inputs, confidential prompts, or business workflow logs processed via our integrated Google Gemini or Claude providers are isolated, encrypted, and <strong>never used to train public LLM models</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">4. Data Storage & Security</h2>
          <p>
            All data is secured using industry-standard TLS 1.3 encryption in transit and AES-256 encryption at rest. We utilize PostgreSQL with Row-Level Security (RLS) to enforce data privacy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">5. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data deletion, contact our Data Protection Officer at: <br />
            <strong>Email:</strong> info@dodail.com <br />
            <strong>Address:</strong> Dodail Solutions Private Limited, Hyderabad, Telangana, India.
          </p>
        </section>
      </div>
    </div>
  );
}
