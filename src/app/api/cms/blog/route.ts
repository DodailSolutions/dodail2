import { NextResponse } from "next/server";
import { getAllBlogPosts, createBlogPost } from "@/lib/cms/api";

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ success: true, data: posts });
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
    const newPost = await createBlogPost(body);
    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
