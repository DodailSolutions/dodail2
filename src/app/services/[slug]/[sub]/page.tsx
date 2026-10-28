import { notFound } from "next/navigation";
import { ServicePage } from "@/components/templates/ServicePage";
import { serviceContent } from "@/content/services";
import { routeMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string; sub: string }> };

export const dynamicParams = false;

/** Sub-services at /services/<pillar>/<sub>/ (e.g. /services/seo/local-seo/). */
const pathFor = (slug: string, sub: string) => `/services/${slug}/${sub}/`;

export function generateStaticParams() {
  return [...serviceContent.keys()]
    .map((p) => p.split("/").filter(Boolean))
    .filter((parts) => parts.length === 3)
    .map(([, slug, sub]) => ({ slug, sub }));
}

export async function generateMetadata({ params }: Props) {
  const { slug, sub } = await params;
  const path = pathFor(slug, sub);
  return serviceContent.has(path) ? routeMetadata(path) : { title: "Not found", robots: { index: false } };
}

export default async function SubServiceRoute({ params }: Props) {
  const { slug, sub } = await params;
  const content = serviceContent.get(pathFor(slug, sub));
  if (!content) notFound();
  return <ServicePage content={content} />;
}
