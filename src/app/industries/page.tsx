import type { Metadata } from "next";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { contentIcon } from "@/lib/cms/content/icons";
import { getContent } from "@/lib/cms/content/store";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/industries", (await getContent("industries")).seo);
}

export default async function IndustriesPage() {
  const { hero, outcomesLabel, cardButtonLabel, verticals, cta } = await getContent("industries");

  return (
    <div className="flex flex-col gap-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="text-center max-w-4xl mx-auto">
        <Badge variant="orange">{hero.badge}</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">{hero.title}</h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{hero.subtitle}</p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verticals.map((vert, i) => {
            const Icon = contentIcon(vert.icon);
            return (
              <Card key={`${vert.href}-${i}`} className="flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-orange-50 text-[#FF6B2C] flex items-center justify-center mb-6 border border-orange-200/60 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl text-slate-950">{vert.title}</CardTitle>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{vert.description}</p>

                  {vert.outcomes.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">{outcomesLabel}</p>
                      {vert.outcomes.map((out) => (
                        <div key={out} className="flex items-center gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{out}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {vert.href && (
                  <div className="mt-8 pt-4">
                    <Button href={vert.href} variant="primary" size="md" className="w-full">
                      {cardButtonLabel}
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 p-8 sm:p-12 text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">{cta.title}</h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto">{cta.description}</p>
        {cta.button.label && (
          <div className="mt-8 flex justify-center">
            <Button href={cta.button.href || "/consultation"} variant="primary" size="lg">
              <Calendar className="h-4 w-4 mr-2" />
              {cta.button.label}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
