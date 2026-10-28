import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/StructuredData";
import { breadcrumbTrail } from "@/content/routes";
import { getContent } from "@/lib/cms/content/store";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  /** Registry path of the current page. */
  path: string;
  /** Extra trail for pages outside the registry (blog posts, projects), appended after the registry trail. */
  extra?: Array<{ name: string; path: string }>;
  /** Also emit BreadcrumbList JSON-LD (default). Turn off when the page already graphs it. */
  withSchema?: boolean;
  tone?: "light" | "dark";
  className?: string;
}

/** Visible breadcrumb trail for every page except Home (brief §10.8), built from the route registry. */
export async function Breadcrumbs({ path, extra = [], withSchema = true, tone = "dark", className }: BreadcrumbsProps) {
  const items = [...breadcrumbTrail(path), ...extra];
  if (items.length === 0) return null;
  const seo = withSchema ? await getContent("site/seo") : null;
  const muted = tone === "dark" ? "text-[#AABAC8] hover:text-white" : "text-slate-500 hover:text-slate-900";
  const current = tone === "dark" ? "text-white" : "text-slate-900";

  return (
    <>
      {seo && <JsonLd data={graph(breadcrumbSchema(seo, items))} />}
      <nav aria-label="Breadcrumb" className={cn("text-xs sm:text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className={cn("transition-colors", muted)}>
              Home
            </Link>
          </li>
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
                {last ? (
                  <span aria-current="page" className={cn("font-medium", current)}>
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className={cn("transition-colors", muted)}>
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
