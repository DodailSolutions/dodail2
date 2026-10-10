import { ContentIndex } from "@/components/admin/content/ContentIndex";
import { listContent } from "@/lib/cms/content/store";

export const dynamic = "force-dynamic";

export default async function SiteContentPage() {
  const items = await listContent();
  return <ContentIndex items={items} />;
}
