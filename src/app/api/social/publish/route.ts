import { NextResponse } from "next/server";
import { getAllSocialPosts, saveSocialPost } from "@/lib/content/api";

export async function GET() {
  try {
    const posts = await getAllSocialPosts();
    return NextResponse.json({ success: true, data: posts });
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

    // Require human approval check
    if (body.status === "scheduled" && !body.human_approved_by) {
      return NextResponse.json(
        { error: "Human approval is required before scheduling or publishing social media content." },
        { status: 400 }
      );
    }

    const saved = await saveSocialPost(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
