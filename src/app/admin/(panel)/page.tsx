import { listPosts } from "@/lib/cms/blog";
import { getContent, listContent } from "@/lib/cms/content/store";
import { getAllLeads } from "@/lib/crm/api";
import { getAllBookings } from "@/lib/booking/api";
import { missingCmsTables, productionChecks, seoAudit } from "@/lib/admin/health";
import { getAdminSession } from "@/lib/auth/server";
import { isSupabaseConfigured } from "@/lib/supabase";
import { DashboardClient } from "@/components/admin/DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [session, blogPosts, content, navigation, seo, leads, bookings, audit, missingTables] = await Promise.all([
    getAdminSession(),
    listPosts(),
    listContent(),
    getContent("site/navigation"),
    getContent("site/seo"),
    getAllLeads().catch(() => []),
    getAllBookings().catch(() => []),
    seoAudit(),
    missingCmsTables(),
  ]);

  const publishedPosts = blogPosts.filter((b) => b.status === "published").length;
  const draftPosts = blogPosts.filter((b) => b.status !== "published" && b.status !== "archived").length;
  const customizedCount = content.filter((c) => c.customized).length;

  const pagesWithIssues = new Set(audit.issues.map((i) => i.key)).size;
  const seoScore = audit.checked ? Math.round(((audit.checked - pagesWithIssues) / audit.checked) * 100) : 100;
  const checks = productionChecks(seo, missingTables);

  const recentEdits = content
    .filter((c) => c.customized)
    .sort((a, b) => Date.parse(b.updated_at ?? "") - Date.parse(a.updated_at ?? ""))
    .slice(0, 6);

  return (
    <DashboardClient
      sessionEmail={session?.email ?? "admin@dodail.com"}
      leads={leads}
      bookings={bookings}
      publishedPosts={publishedPosts}
      draftPosts={draftPosts}
      customizedCount={customizedCount}
      totalContentCount={content.length}
      seoScore={seoScore}
      seoAudit={audit}
      checks={checks}
      recentEdits={recentEdits}
      announcement={navigation?.announcement ?? {}}
      isDbConfigured={isSupabaseConfigured}
    />
  );
}
