import { NextResponse } from "next/server";
import { getAllPages, createPage } from "@/lib/cms/api";

export async function GET() {
  try {
    const pages = await getAllPages();
    return NextResponse.json({ success: true, data: pages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }
    const newPage = await createPage(body);
    return NextResponse.json({ success: true, data: newPage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
