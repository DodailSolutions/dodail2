import { JsonLd } from "@/components/seo/StructuredData";
import { AudienceCards, Checklist, IntroProse, LinkCards, ProcessSteps, ProseSections, TechStack, WhyDodail } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero, trustChips } from "@/components/sections/PageHero";
import { PlansGrid } from "@/components/sections/PlansGrid";
import { RelatedPosts } from "@/components/sections/RelatedPosts";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { FIVE_D } from "@/content/defaults";
import { projectsFor } from "@/content/queries";
import { requireRoute } from "@/content/routes";
import { confirmed } from "@/content/site";
import type { ServicePageContent } from "@/content/types";
import { postsBySlugs } from "@/lib/blog/posts";
import { getContent } from "@/lib/cms/content/store";
import { graph, serviceSchema, type SchemaOffer } from "@/lib/seo/schema";

/**
 * Service pillar (template A) and sub-service (template B). Section order follows brief §5.1:
 * hero → who it's for → sub-services → unique angle → process → selected work → plans →
 * what we measure → why Dodail → tech → related links → FAQs → CTA → related posts.
 */
export async function ServicePage({ content }: { content: ServicePageContent }) {
  const route = requireRoute(content.path);
  const seo = await getContent("site/seo");
  const isPillar = content.kind === "pillar";

  const offers: SchemaOffer[] = (content.plans ?? [])
    .filter((p) => p.priceValue && confirmed(p.price))
    .map((p) => ({ name: p.name, price: p.priceValue as number, description: p.idealFor }));

  const related = [
    ...(content.siblings ?? []).map((path) => ({ path })),
    ...(content.relatedIndustry ? [{ path: content.relatedIndustry }] : []),
  ];

  return (
    <>
      <JsonLd data={graph(serviceSchema(seo, route.path, { title: route.h1, description: route.description, serviceType: content.serviceType, offers }))} />
      <PageHero path={route.path} h1={route.h1} subheading={content.subheading} chips={trustChips()} />
      <IntroProse paragraphs={content.intro} />
      <AudienceCards items={content.audience} />
      {isPillar && content.subServices && (
        <LinkCards id="sub-services" title={`${route.name}: what we offer`} items={content.subServices} />
      )}
      {!isPillar && content.included && <Checklist id="included" title="What's included" items={content.included} />}
      <ProseSections sections={content.sections} />
      <ProcessSteps steps={content.process ?? FIVE_D} />
      <SelectedWork projects={projectsFor({ services: content.workServices })} />
      {content.plans && <PlansGrid plans={content.plans} note={content.plansNote} />}
      {!isPillar && content.measure && <Checklist id="measure" title="How we measure success" intro="These are the numbers we report to you each month." items={content.measure} />}
      <WhyDodail items={content.why} />
      {content.tech && <TechStack items={content.tech} />}
      {related.length > 0 && <LinkCards id="related-services" title="Related services" items={related} />}
      <FaqSection faqs={content.faqs} />
      <CtaBand />
      <RelatedPosts posts={postsBySlugs(content.relatedPosts ?? [])} />
    </>
  );
}
