import type { Metadata } from "next";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HighlightedText } from "@/components/cms/RichText";
import { contentIcon } from "@/lib/cms/content/icons";
import type { LandingContent } from "@/lib/cms/content/defaults/landing";
import { getContent } from "@/lib/cms/content/store";
import { JsonLd } from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, serviceSchema } from "@/lib/seo/schema";

/** Solution, service and industry pages share this template; all copy comes from the CMS. */

const solutionTone: Record<string, { box: string; icon: string }> = {
  orange: { box: "bg-orange-100", icon: "text-[#FF6B2C]" },
  amber: { box: "bg-amber-100", icon: "text-amber-600" },
  emerald: { box: "bg-emerald-100", icon: "text-emerald-600" },
  teal: { box: "bg-teal-100", icon: "text-teal-600" },
  blue: { box: "bg-blue-100", icon: "text-blue-600" },
};

const industryTone: Record<string, string> = {
  orange: "bg-orange-50 text-[#FF6B2C] border-orange-200/60",
  amber: "bg-amber-50 text-amber-600 border-amber-200/60",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  teal: "bg-teal-50 text-[#0D9488] border-teal-200/60",
  blue: "bg-blue-50 text-blue-600 border-blue-200/60",
};

const badgeVariants = new Set(["orange", "navy", "outline", "success", "muted", "cyan", "teal"]);

export function landingMetadata(path: string, content: LandingContent): Promise<Metadata> {
  return pageMetadata(path, content.seo);
}

/** Service + breadcrumb structured data for a landing page. */
export async function LandingJsonLd({ path, content }: { path: string; content: LandingContent }) {
  const seo = await getContent("site/seo");
  const section = path.split("/")[1] ?? "";
  const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
  return (
    <JsonLd
      data={graph(
        serviceSchema(seo, path, content.seo),
        breadcrumbSchema(seo, [
          ...(section === "industries" ? [{ name: sectionName, path: "/industries" }] : []),
          { name: content.hero.title, path },
        ])
      )}
    />
  );
}

export function LandingPage({ content }: { content: LandingContent }) {
  const isIndustry = content.layout === "industry";
  const { hero, features, integrations, cta } = content;
  const badgeVariant = (badgeVariants.has(hero.badgeTone) ? hero.badgeTone : "orange") as BadgeProps["variant"];

  return (
    <div className={`flex flex-col ${isIndustry ? "gap-20" : "gap-24"} py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
      <section className="mx-auto max-w-4xl text-center">
        <Badge variant={badgeVariant}>{hero.badge}</Badge>
        <h1
          className={
            isIndustry
              ? "mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight"
              : "mt-5 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]"
          }
        >
          <HighlightedText
            text={hero.title}
            highlight={hero.highlight}
            render={(part) => <span className="text-[#FF6B2C]">{part}</span>}
          />
        </h1>
        <p
          className={
            isIndustry
              ? "mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
              : "mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal"
          }
        >
          {hero.subtitle}
        </p>
        <div className={isIndustry ? "mt-8 flex flex-wrap justify-center gap-4" : "mt-10 flex flex-wrap justify-center gap-4"}>
          {hero.primaryCta.label && (
            <Button href={hero.primaryCta.href || "/consultation"} variant="primary" size="lg">
              <Calendar className={isIndustry ? "h-5 w-5 mr-2" : "h-4 w-4 mr-2"} />
              {hero.primaryCta.label}
            </Button>
          )}
          {hero.secondaryCta.label && (
            <Button href={hero.secondaryCta.href || "/contact"} variant="outline" size="lg">
              {hero.secondaryCta.label}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </section>

      {features.items.length > 0 && (
        <section className={isIndustry ? "mx-auto max-w-7xl w-full" : "w-full"}>
          <SectionHeader badge={features.badge || undefined} title={features.title} description={features.description || undefined} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.items.map((item, i) => {
              const Icon = contentIcon(item.icon);
              return (
                <Card key={`${item.title}-${i}`}>
                  {isIndustry ? (
                    <div
                      className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 border shadow-sm ${
                        industryTone[item.tone] ?? industryTone.orange
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                        (solutionTone[item.tone] ?? solutionTone.orange).box
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${(solutionTone[item.tone] ?? solutionTone.orange).icon}`} />
                    </div>
                  )}
                  <CardTitle>{item.title}</CardTitle>
                  <p className={`${isIndustry ? "mt-2" : "mt-3 font-normal"} text-sm text-slate-600 leading-relaxed`}>
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {integrations.items.length > 0 && (
        <section className="rounded-3xl border border-slate-200/90 bg-white p-8 lg:p-14 shadow-sm">
          <div className="text-center max-w-2xl mx-auto">
            {integrations.eyebrow && (
              <span className="text-xs font-mono font-bold text-[#FF6B2C] uppercase tracking-wider block mb-2">
                {integrations.eyebrow}
              </span>
            )}
            <h2 className="text-3xl font-extrabold text-slate-950">{integrations.title}</h2>
            {integrations.description && (
              <p className="mt-3 text-base text-slate-600 font-normal">{integrations.description}</p>
            )}
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {integrations.items.map((it, i) => (
              <div
                key={`${it.name}-${i}`}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <p className="font-bold text-slate-900 text-sm">{it.name}</p>
                <p className="text-xs text-slate-500 mt-1">{it.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section
        className={
          isIndustry
            ? "mx-auto max-w-5xl w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 p-8 sm:p-12 text-center shadow-sm"
            : "rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-orange-50/20 p-10 sm:p-14 text-center"
        }
      >
        <h2
          className={
            isIndustry
              ? "text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight"
              : "text-3xl sm:text-4xl font-extrabold text-slate-950"
          }
        >
          {cta.title}
        </h2>
        {cta.description && (
          <p className={`mt-4 text-base text-slate-600 max-w-xl mx-auto ${isIndustry ? "" : "font-normal"}`}>{cta.description}</p>
        )}
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
