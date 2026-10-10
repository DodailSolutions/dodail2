import type { Metadata } from "next";
import { RichText } from "@/components/cms/RichText";
import type { LegalContent } from "@/lib/cms/content/defaults/pages";
import { pageMetadata } from "@/lib/seo/metadata";

export function legalMetadata(path: string, content: LegalContent): Promise<Metadata> {
  return pageMetadata(path, content.seo);
}

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <div className="mx-auto max-w-4xl py-20 px-4 sm:px-6 lg:px-8 text-slate-700">
      <h1 className="text-3xl font-extrabold text-slate-950 sm:text-4xl mb-4 tracking-tight">{content.title}</h1>
      <p className="text-xs font-mono text-slate-500 mb-8">{content.updatedLine}</p>

      <div className="space-y-8 text-sm leading-relaxed border-t border-slate-200 pt-8">
        {content.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-lg font-bold text-slate-950 mb-2">{section.heading}</h2>
            <p className="text-slate-600">
              <RichText text={section.body} linkClassName="text-[#FF6B2C] underline underline-offset-4" />
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
