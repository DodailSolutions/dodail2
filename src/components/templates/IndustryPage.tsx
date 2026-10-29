import { JsonLd } from "@/components/seo/StructuredData";
import { IntroProse, LinkCards } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero, trustChips } from "@/components/sections/PageHero";
import { PlansGrid } from "@/components/sections/PlansGrid";
import { RelatedPosts } from "@/components/sections/RelatedPosts";
import { Section } from "@/components/sections/Section";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Card, CardTitle } from "@/components/ui/Card";
import { getProject } from "@/content/queries";
import { requireRoute } from "@/content/routes";
import type { IndustryPageContent, Project } from "@/content/types";
import { postsBySlugs } from "@/lib/blog/posts";
import { getContent } from "@/lib/cms/content/store";
import { graph, serviceSchema } from "@/lib/seo/schema";

/**
 * Industry page (template C): the sector's real problems → what we build → AI flows → a real
 * project from that sector (or an honest walkthrough with no invented numbers) → bundle plans → FAQs.
 */
export async function IndustryPage({ content }: { content: IndustryPageContent }) {
  const route = requireRoute(content.path);
  const seo = await getContent("site/seo");
  const projects = (content.projects ?? []).map((s) => getProject(s)).filter((p): p is Project => Boolean(p));

  return (
    <>
      <JsonLd data={graph(serviceSchema(seo, route.path, { title: route.h1, description: route.description, serviceType: route.name }))} />
      <PageHero path={route.path} h1={route.h1} subheading={content.subheading} chips={trustChips()} />
      <IntroProse paragraphs={content.intro} />

      <Section id="problems" title="Where customers drop off today" tone="tint">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.problems.map((p) => (
            <Card key={p.title} hoverEffect={false}>
              <CardTitle className="text-lg">{p.title}</CardTitle>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="what-we-build" title="What we build for you">
        <dl className="grid gap-x-10 gap-y-7 md:grid-cols-2">
          {content.build.map((b) => (
            <div key={b.title} className="border-l-2 border-[#FA5B0F] pl-5">
              <dt className="text-lg font-bold text-fg">{b.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{b.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="automation" title="AI automation that fits this industry" tone="tint">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.flows.map((f) => (
            <Card key={f.title} hoverEffect={false}>
              <CardTitle className="text-lg">{f.title}</CardTitle>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {projects.length > 0 ? (
        <SelectedWork projects={projects} title="Work in this industry" />
      ) : (
        content.walkthrough && (
          <Section id="walkthrough" title={content.walkthrough.title} narrow>
            <ol className="space-y-3">
              {content.walkthrough.steps.map((s, i) => (
                <li key={s} className="flex gap-4 rounded-xl border border-border-token bg-surface p-4 text-sm leading-relaxed text-fg">
                  <span className="font-mono text-xs font-bold text-orange-700">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-fg-muted">This is how the work runs in general. It is not a client result.</p>
          </Section>
        )
      )}

      {content.plans && <PlansGrid plans={content.plans} note={content.plansNote} title="Bundles for this industry" />}
      <LinkCards id="services" title="Services we use for this" items={content.services.map((path) => ({ path }))} />
      <FaqSection faqs={content.faqs} />
      <CtaBand />
      <RelatedPosts posts={postsBySlugs(content.relatedPosts ?? [])} />
    </>
  );
}
