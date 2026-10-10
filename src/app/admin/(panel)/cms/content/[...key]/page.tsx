import { notFound } from "next/navigation";
import { ContentEditor } from "@/components/admin/content/ContentEditor";
import { getDefinition } from "@/lib/cms/content/registry";
import { getContent, getContentRecord } from "@/lib/cms/content/store";
import { siteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export default async function EditContentPage({ params }: { params: Promise<{ key: string[] }> }) {
  const { key: segments } = await params;
  const key = segments.map(decodeURIComponent).join("/");
  const def = getDefinition(key);
  const [record, seo] = await Promise.all([def ? getContentRecord(key) : null, getContent("site/seo")]);
  if (!def || !record) notFound();

  const { defaults, ...schema } = def;
  return (
    <ContentEditor
      key={key}
      schema={schema}
      initialData={record.data}
      defaults={defaults as Record<string, unknown>}
      customized={record.customized}
      updatedAt={record.updated_at}
      updatedBy={record.updated_by}
      siteUrl={siteUrl(seo)}
    />
  );
}
