import { NextResponse } from "next/server";
import { getAllBacklinks, saveBacklink } from "@/lib/seo/api";

export async function GET() {
  try {
    const list = await getAllBacklinks();
    return NextResponse.json({ success: true, data: list });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.prospect_source) {
      return NextResponse.json({ error: "Prospect source is required" }, { status: 400 });
    }
    const saved = await saveBacklink(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
