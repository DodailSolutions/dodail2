import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/StructuredData";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { ProjectCard } from "@/components/sections/SelectedWork";
import { allCaseStudies, getProject } from "@/content/queries";
import { requireRoute } from "@/content/routes";
import type { Project } from "@/content/types";
import { getContent } from "@/lib/cms/content/store";
import { routeMetadata } from "@/lib/seo/metadata";
import { graph, typedPageSchema } from "@/lib/seo/schema";
import Link from "next/link";

export function generateMetadata() {
  return routeMetadata("/case-studies/");
}

/** Case studies hub. Returns 404 until at least one study is written (no empty indexable page). */
export default async function CaseStudiesPage() {
  const studies = allCaseStudies();
  if (studies.length === 0) notFound();
  const route = requireRoute("/case-studies/");
  const seo = await getContent("site/seo");
  const items = studies
    .map((s) => ({ study: s, project: getProject(s.projectSlug) }))
    .filter((x): x is { study: (typeof studies)[number]; project: Project } => Boolean(x.project));

  return (
    <>
      <JsonLd data={graph(typedPageSchema(seo, "CollectionPage", route.path, { title: route.h1, description: route.description }))} />
      <PageHero
        path={route.path}
        h1={route.h1}
        subheading="Real projects, with the numbers we can confirm. Each one shows what the problem was, what we did and what changed."
        noCtas
      />
      <Section id="studies">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ study, project }) => (
            <li key={study.slug} className="flex flex-col gap-3">
              <ProjectCard project={project} />
              <Link href={`/case-studies/${study.slug}/`} className="text-sm font-semibold text-orange-700 hover:underline">
                {study.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
