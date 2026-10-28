import Link from "next/link";
import { JsonLd } from "@/components/seo/StructuredData";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Testimonial } from "@/components/sections/Testimonial";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { allCaseStudies, getProject } from "@/content/queries";
import { confirmed } from "@/content/site";
import type { CaseStudy } from "@/content/types";
import { getContent } from "@/lib/cms/content/store";
import { caseStudySchema, graph } from "@/lib/seo/schema";

/**
 * Case study (template E): hero → at a glance (confirmed numbers only) → client and challenge →
 * what we did (strategy → build → launch → growth) → results → testimonial → services used.
 */
export async function CaseStudyPage({ study }: { study: CaseStudy }) {
  const seo = await getContent("site/seo");
  const path = `/case-studies/${study.slug}/`;
  const project = getProject(study.projectSlug);
  const glance = study.glance.filter((g) => confirmed(g.value) && confirmed(g.label));
  const results = study.results.filter((r) => confirmed(r));
  const stages = study.whatWeDid.filter((s) => confirmed(s.text));
  const others = allCaseStudies()
    .filter((c) => c.slug !== study.slug)
    .map((c) => getProject(c.projectSlug))
    .filter((p) => Boolean(p))
    .slice(0, 3) as NonNullable<ReturnType<typeof getProject>>[];

  return (
    <>
      <JsonLd
        data={graph(
          caseStudySchema(seo, path, {
            title: study.title,
            description: study.description,
            client: project?.client ?? project?.name ?? study.title,
            image: project?.coverImage?.src,
            published: study.published,
            modified: study.modified,
          })
        )}
      />
      <PageHero
        path="/case-studies/"
        breadcrumbExtra={[{ name: project?.name ?? "Case study", path }]}
        eyebrow={[project && String(project.industry), study.timeline && confirmed(study.timeline)].filter(Boolean).join(" · ")}
        h1={study.title}
        subheading={study.description}
      />

      {glance.length > 0 && (
        <Section id="at-a-glance" title="At a glance">
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {glance.map((g) => (
              <div key={g.label} className="rounded-2xl border border-border-token bg-surface p-5">
                <dd className="text-3xl font-extrabold text-fg">{g.value}</dd>
                <dt className="mt-1 text-sm text-fg-muted">{g.label}</dt>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section id="client-challenge" title="The client and the challenge" narrow>
        <div className="space-y-4 text-base leading-relaxed text-fg">
          {study.clientAndChallenge.filter((p) => confirmed(p)).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      {stages.length > 0 && (
        <Section id="what-we-did" title="What we did" tone="tint">
          <ol className="grid gap-5 md:grid-cols-2">
            {stages.map((s) => (
              <li key={s.stage} className="rounded-2xl border border-border-token bg-surface p-6">
                <h3 className="text-lg font-bold text-fg">{s.stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {results.length > 0 && (
        <Section id="results" title="Results" narrow>
          <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-fg">
            {results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Section>
      )}

      {study.testimonial && <Testimonial {...study.testimonial} />}

      <Section id="services-used" title="Services used" narrow>
        <ul className="flex flex-wrap gap-2.5">
          {study.servicesUsed.map((s) => (
            <li key={s.path}>
              <Link href={s.path} className="inline-flex min-h-11 items-center rounded-xl border border-border-token bg-surface px-4 text-sm font-semibold text-fg hover:border-[#FF6B2C]">
                {s.label}
              </Link>
            </li>
          ))}
          {project && (
            <li>
              <Link href={`/work/${project.slug}/`} className="inline-flex min-h-11 items-center rounded-xl border border-border-token bg-surface px-4 text-sm font-semibold text-fg hover:border-[#FF6B2C]">
                See the project
              </Link>
            </li>
          )}
        </ul>
      </Section>

      <CtaBand />
      <SelectedWork projects={others} title="More case studies" allHref="/case-studies/" />
    </>
  );
}
