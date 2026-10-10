import { PagesHub } from "@/components/admin/PagesHub";
import { listSitePages } from "@/lib/admin/pages";
import { missingCmsTables } from "@/lib/admin/health";

export const dynamic = "force-dynamic";

export default async function AllPagesPage() {
  const [rows, missingTables] = await Promise.all([listSitePages(), missingCmsTables()]);
  return <PagesHub rows={rows} missingTables={missingTables} />;
}
