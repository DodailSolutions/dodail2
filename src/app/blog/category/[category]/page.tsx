import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/StructuredData";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PostGrid, categoryCounts } from "@/components/templates/BlogListing";
import { BLOG_CATEGORIES } from "@/content/legacy/blog-posts";
import { getRoute } from "@/content/routes";
import { getAllPosts, postsInCategory } from "@/lib/blog/posts";
import { getContent } from "@/lib/cms/content/store";
import { routeMetadata } from "@/lib/seo/metadata";
import { graph, typedPageSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(BLOG_CATEGORIES)
    .filter((c) => postsInCategory(c).length > 0)
    .map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  if (!getRoute(`/blog/category/${category}/`)) return { title: "Not found", robots: { index: false } };
  return routeMetadata(`/blog/category/${category}/`);
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const route = getRoute(`/blog/category/${category}/`);
  const posts = postsInCategory(category);
  if (!route || posts.length === 0) notFound();
  const seo = await getContent("site/seo");

  return (
    <>
      <JsonLd data={graph(typedPageSchema(seo, "CollectionPage", route.path, { title: route.h1, description: route.description }))} />
      <PageHero path={route.path} h1={route.h1} subheading={BLOG_CATEGORIES[category as keyof typeof BLOG_CATEGORIES].description} noCtas />
      <PostGrid posts={posts} active={category} counts={categoryCounts(getAllPosts())} />
      <CtaBand />
    </>
  );
}
