"use client";

import * as React from "react";
import { ProjectCard } from "./SelectedWork";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Portfolio grid with filter chips. Filtering only toggles the `hidden` attribute, so every
 * card stays in the HTML as a real <a href="/work/<slug>/"> and remains crawlable (brief §6.4).
 */
export function ProjectGrid({ projects, filters }: { projects: Project[]; filters: Array<{ label: string; services?: string[]; industries?: string[] }> }) {
  const [active, setActive] = React.useState("All");
  const filter = filters.find((f) => f.label === active);
  const matches = (p: Project) =>
    active === "All" ||
    Boolean(filter?.services?.some((s) => p.services.some((ps) => ps.toLowerCase() === s.toLowerCase()))) ||
    Boolean(filter?.industries?.some((i) => String(p.industry).toLowerCase() === i.toLowerCase()));

  const chips = ["All", ...filters.map((f) => f.label)];
  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#FA5B0F]",
              active === c ? "border-border-strong bg-surface text-fg" : "border-border-strong bg-surface text-fg hover:border-[#FA5B0F]"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug} hidden={!matches(p)}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
