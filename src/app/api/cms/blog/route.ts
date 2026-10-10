import { NextResponse } from "next/server";
import { BlogValidationError, blogTaxonomy, listPosts, savePost } from "@/lib/cms/blog";
import { revalidateBlog } from "@/lib/cms/publish";
import { editorEmail } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

/** All articles (any status) plus the categories and tags in use. Admin only (proxy). */
export async function GET() {
  try {
    const [posts, taxonomy] = await Promise.all([listPosts(), blogTaxonomy()]);
    return NextResponse.json({ success: true, data: posts, taxonomy });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

/** Create an article (or update one when `id` is supplied). */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Request body must be JSON." }, { status: 400 });
  }
  try {
    const { post, previousSlug, persisted } = await savePost(body, await editorEmail());
    revalidateBlog(post.slug);
    if (previousSlug) revalidateBlog(previousSlug);
    return NextResponse.json({ success: true, data: post, persisted }, { status: body.id ? 200 : 201 });
  } catch (error) {
    const status = error instanceof BlogValidationError ? 400 : 500;
    return NextResponse.json({ success: false, error: (error as Error).message }, { status });
  }
}
