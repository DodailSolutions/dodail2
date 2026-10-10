import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RichText } from "@/components/cms/RichText";
import { contentIcon } from "@/lib/cms/content/icons";
import { getContent } from "@/lib/cms/content/store";
import { pageMetadata } from "@/lib/seo/metadata";

const statTone: Record<string, string> = {
  orange: "text-[#FF6B2C]",
  slate: "text-slate-900",
  emerald: "text-emerald-600",
  teal: "text-[#0D9488]",
  amber: "text-amber-600",
  blue: "text-blue-600",
};

const iconTone: Record<string, string> = {
  orange: "bg-orange-50 text-[#FF6B2C] border-orange-200/60",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  teal: "bg-teal-50 text-[#0D9488] border-teal-200/60",
  amber: "bg-amber-50 text-amber-600 border-amber-200/60",
  blue: "bg-blue-50 text-blue-600 border-blue-200/60",
  slate: "bg-slate-50 text-slate-700 border-slate-200/60",
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/about", (await getContent("about")).seo);
}

export default async function AboutPage() {
  const { hero, story, principles, corporate, cta } = await getContent("about");

  return (
    <div className="flex flex-col gap-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="orange">{hero.badge}</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">{hero.title}</h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{hero.subtitle}</p>
      </section>

      {/* Story & Evolution */}
      <section className="mx-auto max-w-5xl w-full">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-wider">{story.eyebrow}</span>
              <h2 className="text-2xl font-bold text-slate-950 mt-2">{story.title}</h2>
              {story.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-sm text-slate-600 leading-relaxed">
                  <RichText text={p} linkClassName="text-[#FF6B2C] underline underline-offset-4" />
                </p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {story.stats.map((s, i) => (
                <div key={`${s.label}-${i}`} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center shadow-xs">
                  <p className={`text-3xl font-extrabold ${statTone[s.tone] ?? statTone.slate}`}>{s.value}</p>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mx-auto max-w-7xl w-full">
        <SectionHeader badge={principles.badge} title={principles.title} description={principles.description} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.items.map((item, i) => {
            const Icon = contentIcon(item.icon);
            return (
              <Card key={`${item.title}-${i}`}>
                <div
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 border shadow-sm ${
                    iconTone[item.tone] ?? iconTone.orange
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Legal & Corporate Registration */}
      <section className="mx-auto max-w-5xl w-full rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-2">{corporate.title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          <RichText text={corporate.lines.join("\n")} />
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{cta.title}</h2>
        {cta.button.label && (
          <div className="mt-6 flex justify-center gap-4">
            <Button href={cta.button.href || "/consultation"} variant="primary" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              {cta.button.label}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
