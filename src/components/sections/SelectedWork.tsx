import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "./Section";
import type { Project } from "@/content/types";

/** Project card: real link to /work/<slug>/ (crawlable), cover, industry, one-line summary, service chips. */
export function ProjectCard({ project }: { project: Project }) {
  const href = `/work/${project.slug}/`;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-token bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#FA5B0F] hover:shadow-md">
      {project.coverImage ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="grid aspect-[16/10] place-items-center bg-gradient-to-br from-[var(--surface-2)] to-orange-50 text-3xl font-extrabold text-fg-muted" aria-hidden="true">
          {project.name.slice(0, 1)}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-orange-700">{String(project.industry)}</p>
        <h3 className="mt-1 text-xl font-bold text-fg">
          <Link href={href} className="after:absolute after:inset-0 hover:text-orange-700 focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.services.map((s) => (
            <li key={s} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-fg-muted">
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700" aria-hidden="true">
          View project <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

/** "Selected work": 3 matching projects. Renders nothing when there is no real match. */
export function SelectedWork({ projects, title = "Selected work", allHref = "/work/" }: { projects: Project[]; title?: string; allHref?: string }) {
  if (projects.length === 0) return null;
  return (
    <Section id="selected-work" title={title}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href={allHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:underline">
          See all our work <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </p>
    </Section>
  );
}
