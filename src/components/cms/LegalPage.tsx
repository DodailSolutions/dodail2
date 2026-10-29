import type { Metadata } from "next";
import { RichText } from "@/components/cms/RichText";
import type { LegalContent } from "@/lib/cms/content/defaults/pages";
import { pageMetadata } from "@/lib/seo/metadata";

export function legalMetadata(path: string, content: LegalContent): Promise<Metadata> {
  return pageMetadata(path, content.seo);
}

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <div className="mx-auto max-w-4xl py-20 px-4 sm:px-6 lg:px-8 text-fg-muted">
      <h1 className="text-3xl font-extrabold text-fg sm:text-4xl mb-4 tracking-tight">{content.title}</h1>
      <p className="text-xs font-mono text-fg-subtle mb-8">{content.updatedLine}</p>

      <div className="space-y-8 text-sm leading-relaxed border-t border-border-token pt-8">
        {content.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-lg font-bold text-fg mb-2">{section.heading}</h2>
            <p className="text-fg-muted">
              <RichText text={section.body} linkClassName="text-[#FA5B0F] underline underline-offset-4" />
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
