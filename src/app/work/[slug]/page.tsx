import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/templates/ProjectPage";
import { allProjects, getProject } from "@/content/queries";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return pageMetadata(
    `/work/${project.slug}/`,
    {
      title: project.seo?.title ?? `${project.name} – ${project.industry} Project | Dodail`,
      description: project.seo?.description ?? project.summary,
    },
    { image: project.coverImage?.src, exactTitle: true }
  );
}

export default async function WorkProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
