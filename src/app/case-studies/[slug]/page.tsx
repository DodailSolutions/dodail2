import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/templates/CaseStudyPage";
import { allCaseStudies, getCaseStudy, getProject } from "@/content/queries";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) return { title: "Case study not found", robots: { index: false } };
  const project = getProject(study.projectSlug);
  return pageMetadata(
    `/case-studies/${study.slug}/`,
    { title: study.title, description: study.description },
    { type: "article", image: project?.coverImage?.src, publishedTime: study.published, modifiedTime: study.modified }
  );
}

export default async function CaseStudyRoute({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
