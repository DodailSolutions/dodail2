import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { isPostLive } from "@/lib/cms/blog";
import { DynamicBlockRenderer } from "@/components/cms/DynamicBlockRenderer";
import { JsonLd } from "@/components/seo/StructuredData";
import { getPageBySlug, getPublishedPages } from "@/lib/cms/api";
import { getContent } from "@/lib/cms/content/store";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/seo/schema";
import type { CMSPage, FAQsBlock } from "@/lib/cms/types";

/**
 * Custom pages built in Admin → Custom Pages, served at /<slug>.
 * Built-in routes (/about, /contact, …) always take precedence over this catch-all.
 */
type Props = { params: Promise<{ slug: string }> };

/** The seeded "home" page is the homepage's block layout, not a standalone URL. */
const RESERVED = new Set(["home", "admin", "api"]);

async function loadPage(slug: string): Promise<CMSPage | null> {
  if (RESERVED.has(slug)) return null;
  // Editors previewing (Draft Mode) may see unpublished pages; visitors only live ones.
  const preview = (await draftMode()).isEnabled;
  const page = await getPageBySlug(slug, preview ? "preview" : undefined);
  if (!page) return null;
  return preview || isPostLive(page) ? page : null;
}

export async function generateStaticParams() {
  return (await getPublishedPages()).filter((p) => !RESERVED.has(p.slug) && !p.slug.includes("/")).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const page = await loadPage((await params).slug);
  if (!page) return { title: "Page not found", robots: { index: false } };
  const meta = page.seo_metadata ?? {};
  return pageMetadata(meta.canonical_url || `/${page.slug}`, { title: meta.meta_title || page.title, description: meta.meta_description || "" }, { noIndex: meta.no_index });
}

export default async function CustomPage({ params }: Props) {
  const page = await loadPage((await params).slug);
  if (!page) notFound();

  const seo = await getContent("site/seo");
  const sections = (page.sections ?? []).filter((s) => s.enabled !== false);
  const faqs = sections.filter((s): s is FAQsBlock => s.type === "faqs").flatMap((s) => s.items);
  const description = page.seo_metadata?.meta_description || "";

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema(seo, `/${page.slug}`, { title: page.title, description }),
          breadcrumbSchema(seo, [{ name: page.title, path: `/${page.slug}` }]),
          faqSchema(faqs)
        )}
      />
      <div className="bg-[#071A28] text-white">
        {/* Every page needs exactly one <h1>; the hero block provides it when present. */}
        {!sections.some((s) => s.type === "hero") && <h1 className="sr-only">{page.title}</h1>}
        <DynamicBlockRenderer sections={sections} />
      </div>
    </>
  );
}
