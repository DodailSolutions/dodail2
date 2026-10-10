import { NextResponse } from "next/server";
import { generateEditorialOutline } from "@/lib/content/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const outline = await generateEditorialOutline(body.title, body.keyword || "");
    return NextResponse.json({ success: true, outline });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
