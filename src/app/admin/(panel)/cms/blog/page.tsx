import { BlogList } from "@/components/admin/blog/BlogList";
import { listPosts } from "@/lib/cms/blog";

export const dynamic = "force-dynamic";

/** Captured once per request so every row is classified against the same moment. */
function requestTime() {
  return Date.now();
}

export default async function BlogAdminPage() {
  return <BlogList posts={await listPosts()} now={requestTime()} />;
}
