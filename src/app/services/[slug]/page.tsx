import { notFound } from "next/navigation";
import { ServicePage } from "@/components/templates/ServicePage";
import { serviceContent } from "@/content/services";
import { routeMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Pillars and standalone services at /services/<slug>/ (e.g. ecommerce-development, fractional-cmo). */
const pathFor = (slug: string) => `/services/${slug}/`;

export function generateStaticParams() {
  return [...serviceContent.keys()]
    .map((p) => p.split("/").filter(Boolean))
    .filter((parts) => parts.length === 2)
    .map(([, slug]) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const path = pathFor((await params).slug);
  return serviceContent.has(path) ? routeMetadata(path) : { title: "Not found", robots: { index: false } };
}

export default async function ServiceRoute({ params }: Props) {
  const content = serviceContent.get(pathFor((await params).slug));
  if (!content) notFound();
  return <ServicePage content={content} />;
}
