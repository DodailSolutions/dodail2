import { notFound } from "next/navigation";
import { BlogEditor } from "@/components/admin/blog/BlogEditor";
import { blogTaxonomy, getPost } from "@/lib/cms/blog";
import { getContent } from "@/lib/cms/content/store";
import { getAdminSession } from "@/lib/auth/server";
import { siteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

/** /admin/cms/blog/new creates an article; /admin/cms/blog/<id> edits one. */
export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, taxonomy, seo, company, session] = await Promise.all([
    id === "new" ? null : getPost(id),
    blogTaxonomy(),
    getContent("site/seo"),
    getContent("site/company"),
    getAdminSession(),
  ]);
  if (id !== "new" && !post) notFound();

  return (
    <BlogEditor
      key={post?.id ?? "new"}
      post={post}
      categories={taxonomy.categories}
      tags={taxonomy.tags}
      siteUrl={siteUrl(seo)}
      defaultAuthor={company.shortName || session?.email || "Dodail Solutions"}
    />
  );
}
