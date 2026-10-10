import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getContent } from "@/lib/cms/content/store";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/work", (await getContent("work")).seo);
}

export default async function WorkPage() {
  const { hero, labels, caseStudies, cta } = await getContent("work");

  return (
    <div className="flex flex-col gap-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">{hero.badge}</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">{hero.title}</h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{hero.subtitle}</p>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 w-full">
        {caseStudies.map((cs, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 hover:border-[#FF6B2C] transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase">{cs.sector}</span>
              {labels.verified && (
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {labels.verified}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-slate-950 mb-4">{cs.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">{labels.problem}</p>
                <p>{cs.problem}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">{labels.architecture}</p>
                <p>{cs.architecture}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50/70 p-5 border border-emerald-200/70 mb-6">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1 font-mono">{labels.outcome}</p>
              <p className="text-sm font-semibold text-emerald-950">{cs.outcome}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap gap-1.5">
                {cs.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {labels.cardCta && (
                <Button href={labels.cardCtaHref || "/consultation"} variant="ghost" size="sm">
                  {labels.cardCta} <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 p-8 sm:p-12 text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">{cta.title}</h2>
        <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">{cta.description}</p>
        {cta.button.label && (
          <div className="mt-8 flex justify-center">
            <Button href={cta.button.href || "/consultation"} variant="primary" size="lg">
              {cta.button.label}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
