/** Lookups shared by the page templates. Pure functions over the typed content registries. */
import { projects } from "./work";
import { caseStudies } from "./case-studies";
import type { CaseStudy, Project } from "./types";

export function allProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects(limit = 3): Project[] {
  return allProjects().filter((p) => p.featured).slice(0, limit);
}

/**
 * Projects whose service tags or industry match, best match first (brief §6.4: service and
 * industry pages show 3 matching projects automatically). Falls back to nothing, never to filler.
 */
export function projectsFor({ services = [], industries = [], limit = 3, exclude }: { services?: string[]; industries?: string[]; limit?: number; exclude?: string }): Project[] {
  const wantedServices = services.map((s) => s.toLowerCase());
  const wantedIndustries = industries.map((i) => i.toLowerCase());
  return allProjects()
    .filter((p) => p.slug !== exclude)
    .map((p) => {
      const svc = p.services.filter((s) => wantedServices.includes(s.toLowerCase())).length;
      const ind = wantedIndustries.includes(String(p.industry).toLowerCase()) ? 2 : 0;
      return { p, score: svc + ind };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.p.order - b.p.order)
    .slice(0, limit)
    .map((x) => x.p);
}

export function allCaseStudies(): CaseStudy[] {
  return [...caseStudies].sort((a, b) => b.published.localeCompare(a.published));
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function caseStudyForProject(projectSlug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.projectSlug === projectSlug);
}
