import { NextResponse } from "next/server";
import { getPageById, updatePage, deletePage, getPageRevisions } from "@/lib/cms/api";
import { normalizeSlug, revalidateCustomPage } from "@/lib/cms/publish";
import { editorEmail } from "@/lib/auth/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const page = await getPageById(id);
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    const revisions = await getPageRevisions(id);
    return NextResponse.json({ success: true, data: { page, revisions } });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    if (body.slug !== undefined) body.slug = normalizeSlug(body.slug);
    const previous = await getPageById(id);
    const updated = await updatePage(id, body, await editorEmail());
    revalidateCustomPage(previous?.slug);
    revalidateCustomPage(updated?.slug);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const page = await getPageById(id);
    const success = await deletePage(id, await editorEmail());
    revalidateCustomPage(page?.slug);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
