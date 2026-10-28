import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/templates/BlogPostPage";
import { CaseStudyPage } from "@/components/templates/CaseStudyPage";
import { IndustryPage } from "@/components/templates/IndustryPage";
import { ProjectPage } from "@/components/templates/ProjectPage";
import { ServicePage } from "@/components/templates/ServicePage";
import { sampleCaseStudy, sampleIndustry, samplePillar, sampleProject, sampleSub } from "@/content/_fixtures";
import { getAllPosts } from "@/lib/blog/posts";

/**
 * Development-only gallery of every page template with sample content.
 * Returns 404 in production and is never indexed. Safe to delete: `rm -r src/app/dev`.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Template gallery", robots: { index: false, follow: false } };

export default async function TemplateGallery({ params }: { params: Promise<{ kind: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { kind } = await params;
  switch (kind) {
    case "service-sub":
      return <ServicePage content={sampleSub} />;
    case "service-pillar":
      return <ServicePage content={samplePillar} />;
    case "industry":
      return <IndustryPage content={sampleIndustry} />;
    case "project":
      return <ProjectPage project={sampleProject} />;
    case "case-study":
      return <CaseStudyPage study={sampleCaseStudy} />;
    case "blog": {
      const post = getAllPosts()[0];
      if (!post) notFound();
      return <BlogPostPage post={post} />;
    }
    default:
      notFound();
  }
}
