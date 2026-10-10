import { NextResponse } from "next/server";
import { getAllSocialPosts, saveSocialPost, updateSocialPost, deleteSocialPost } from "@/lib/content/api";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const platform = searchParams.get("platform");

    let posts = await getAllSocialPosts();

    if (status) {
      posts = posts.filter((p) => p.status === status);
    }
    if (platform) {
      posts = posts.filter((p) => p.selected_platforms?.includes(platform as any));
    }

    return NextResponse.json({ success: true, data: posts });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ error: "Title is required for social campaign" }, { status: 400 });
    }

    // Phase 07 Human Gate Rule: Require human approval before scheduling or publishing
    if ((body.status === "scheduled" || body.status === "published") && !body.human_approved_by) {
      return NextResponse.json(
        { error: "Human approval is strictly mandatory before scheduling or publishing social media content." },
        { status: 400 }
      );
    }

    const saved = await saveSocialPost(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // If approving or transitioning to scheduled/published, check approval
    if ((updates.status === "scheduled" || updates.status === "published") && !updates.human_approved_by) {
      return NextResponse.json(
        { error: "Human approval is required to approve or publish content." },
        { status: 400 }
      );
    }

    const updated = await updateSocialPost(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const deleted = await deleteSocialPost(id);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
