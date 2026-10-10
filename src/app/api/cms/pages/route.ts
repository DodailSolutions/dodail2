import { NextResponse } from "next/server";
import { getAllPages, createPage } from "@/lib/cms/api";
import { normalizeSlug, revalidateCustomPage } from "@/lib/cms/publish";
import { editorEmail } from "@/lib/auth/server";

export async function GET() {
  try {
    const pages = await getAllPages();
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug = normalizeSlug(body.slug || body.title);
    if (!body.title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }
    const newPage = await createPage({ ...body, slug }, await editorEmail());
    revalidateCustomPage(slug);
    return NextResponse.json({ success: true, data: newPage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
