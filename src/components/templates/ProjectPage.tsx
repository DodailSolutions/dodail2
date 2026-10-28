import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/StructuredData";
import { CtaBand } from "@/components/sections/CtaBand";
import { BrowserFrame, PhoneFrame } from "@/components/sections/DeviceFrame";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Testimonial } from "@/components/sections/Testimonial";
import { caseStudyForProject, projectsFor } from "@/content/queries";
import { confirmed } from "@/content/site";
import type { Project } from "@/content/types";
import { getContent } from "@/lib/cms/content/store";
import { creativeWorkSchema, graph } from "@/lib/seo/schema";

const list = "list-disc space-y-2 pl-5 text-base leading-relaxed text-fg";

/**
 * Project page (template D): hero → device screenshots → challenge → what we built → highlights →
 * results (confirmed only) → testimonial → platform → CTA → 3 related projects.
 */
export async function ProjectPage({ project }: { project: Project }) {
  const seo = await getContent("site/seo");
  const path = `/work/${project.slug}/`;
  const caseStudy = caseStudyForProject(project.slug);
  const results = (project.results ?? []).filter((r) => confirmed(r.value) && confirmed(r.label));
  const liveUrl = confirmed(project.liveUrl);
  const related = projectsFor({ services: project.services, industries: [String(project.industry)], exclude: project.slug });

  return (
    <>
      <JsonLd
        data={graph(
          creativeWorkSchema(seo, path, {
            name: project.name,
            description: project.summary,
            image: project.coverImage?.src,
            about: String(project.industry),
            liveUrl,
            year: project.year,
          })
        )}
      />
      <PageHero
        path="/work/"
        breadcrumbExtra={[{ name: project.name, path }]}
        eyebrow={String(project.industry)}
        h1={project.name}
        subheading={project.summary}
        primary={liveUrl ? { label: "Visit live site ↗", href: liveUrl } : undefined}
        secondary={{ label: "Want a site like this?", href: "/contact/" }}
      />

      {(project.fullPage || project.coverImage) && (
        <Section>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto]">
            <BrowserFrame image={project.fullPage ?? project.coverImage!} label={project.name} />
            {project.mobile && <PhoneFrame image={project.mobile} />}
          </div>
        </Section>
      )}

      <Section id="details" narrow>
        <dl className="mb-10 grid grid-cols-2 gap-4 rounded-2xl border border-border-token bg-surface p-5 text-sm sm:grid-cols-4">
          {[
            ["Industry", String(project.industry)],
            ["Platform", project.platform],
            ["Location", project.location],
            ["Year", project.year ? String(project.year) : undefined],
          ]
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">{k}</dt>
                <dd className="mt-1 font-semibold text-fg">{v}</dd>
              </div>
            ))}
        </dl>

        {project.challenge && (
          <div className="mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-fg">The challenge</h2>
            <p className="mt-3 text-base leading-relaxed text-fg">{project.challenge}</p>
          </div>
        )}
        {project.whatWeBuilt && project.whatWeBuilt.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-fg">What we built</h2>
            <ul className={`mt-3 ${list}`}>
              {project.whatWeBuilt.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        )}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-fg">Highlights</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.highlights.map((h) => (
                <li key={h} className="rounded-full border border-border-token bg-surface px-3.5 py-1.5 text-sm font-medium text-fg">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-fg">Results</h2>
            <dl className="mt-3 grid gap-4 sm:grid-cols-3">
              {results.map((r) => (
                <div key={r.label} className="rounded-2xl border border-border-token bg-surface p-5">
                  <dd className="text-3xl font-extrabold text-fg">{r.value}</dd>
                  <dt className="mt-1 text-sm text-fg-muted">{r.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {caseStudy && (
            <Link href={`/case-studies/${caseStudy.slug}/`} className="inline-flex items-center gap-1.5 font-semibold text-orange-700 hover:underline">
              Read the full case study <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          )}
          <span className="text-fg-muted">Services: {project.services.join(" · ")}</span>
        </div>
      </Section>

      {project.testimonial && <Testimonial {...project.testimonial} />}
      <CtaBand title="Want a site like this?" text="Tell us about your business and we will show you what we would build first, and what it should cost." />
      <SelectedWork projects={related} title="Related projects" />
    </>
  );
}
