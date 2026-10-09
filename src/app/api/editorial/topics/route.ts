import { NextResponse } from "next/server";
import { getAllTopics, saveTopic } from "@/lib/content/api";

export async function GET() {
  try {
    const topics = await getAllTopics();
    return NextResponse.json({ success: true, data: topics });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const saved = await saveTopic(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
