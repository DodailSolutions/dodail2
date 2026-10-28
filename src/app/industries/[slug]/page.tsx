import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/templates/IndustryPage";
import { industryContent } from "@/content/industries";
import { routeMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

const pathFor = (slug: string) => `/industries/${slug}/`;

export function generateStaticParams() {
  return [...industryContent.keys()].map((p) => ({ slug: p.split("/").filter(Boolean)[1] }));
}

export async function generateMetadata({ params }: Props) {
  const path = pathFor((await params).slug);
  return industryContent.has(path) ? routeMetadata(path) : { title: "Not found", robots: { index: false } };
}

export default async function IndustryRoute({ params }: Props) {
  const content = industryContent.get(pathFor((await params).slug));
  if (!content) notFound();
  return <IndustryPage content={content} />;
}
