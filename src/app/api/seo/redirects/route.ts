import { NextResponse } from "next/server";
import { getAllRedirects, saveRedirect, deleteRedirect } from "@/lib/seo/api";

export async function GET() {
  try {
    const redirects = await getAllRedirects();
    return NextResponse.json({ success: true, data: redirects });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.source) {
      return NextResponse.json({ error: "Source URL is required" }, { status: 400 });
    }
    const saved = await saveRedirect(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id param required" }, { status: 400 });
    }
    await deleteRedirect(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
