import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/StructuredData";
import { Section } from "./Section";
import { faqSchema, graph } from "@/lib/seo/schema";
import type { Faq } from "@/content/types";

/**
 * FAQs as native <details>: every answer is in the HTML (crawlers, no-JS and print), keyboard
 * and screen-reader accessible without client code. Emits FAQPage schema for exactly the
 * questions shown (brief §10.2).
 */
export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  if (faqs.length === 0) return null;
  const schema = faqSchema(faqs);
  return (
    <Section id="faq" title={title} narrow>
      {schema && <JsonLd data={graph(schema)} />}
      <div className="divide-y divide-border-token overflow-hidden rounded-2xl border border-border-token bg-surface">
        {faqs.map((f) => (
          <details key={f.question} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-fg hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-semibold">{f.question}</h3>
              <Plus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-orange-700 transition-transform group-open:rotate-45" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-fg-muted sm:text-base">{f.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
