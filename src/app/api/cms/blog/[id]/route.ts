import { NextResponse } from "next/server";
import { BlogValidationError, deletePost, duplicatePost, getPost, savePost } from "@/lib/cms/blog";
import { revalidateBlog } from "@/lib/cms/publish";
import { editorEmail } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

const notFound = () => NextResponse.json({ success: false, error: "Article not found." }, { status: 404 });

export async function GET(_req: Request, { params }: Params) {
  const post = await getPost((await params).id);
  return post ? NextResponse.json({ success: true, data: post }) : notFound();
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  if (!(await getPost(id))) return notFound();
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Request body must be JSON." }, { status: 400 });
  }
  try {
    const { post, previousSlug, persisted } = await savePost({ ...body, id }, await editorEmail());
    revalidateBlog(post.slug);
    if (previousSlug) revalidateBlog(previousSlug);
    return NextResponse.json({ success: true, data: post, persisted });
  } catch (error) {
    const status = error instanceof BlogValidationError ? 400 : 500;
    return NextResponse.json({ success: false, error: (error as Error).message }, { status });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const removed = await deletePost((await params).id, await editorEmail());
  if (!removed) return notFound();
  revalidateBlog(removed.slug);
  return NextResponse.json({ success: true });
}

/** POST /api/cms/blog/:id?action=duplicate → copy saved as a draft. */
export async function POST(req: Request, { params }: Params) {
  if (new URL(req.url).searchParams.get("action") !== "duplicate") {
    return NextResponse.json({ success: false, error: "Unsupported action." }, { status: 400 });
  }
  const copy = await duplicatePost((await params).id, await editorEmail());
  return copy ? NextResponse.json({ success: true, data: copy }, { status: 201 }) : notFound();
}
