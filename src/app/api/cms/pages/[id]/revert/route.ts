import { NextResponse } from "next/server";
import { revertPageRevision } from "@/lib/cms/api";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { revision_id, author_email } = body;
    if (!revision_id) {
      return NextResponse.json({ error: "revision_id is required" }, { status: 400 });
    }
    const reverted = await revertPageRevision(id, revision_id, author_email || "admin@dodail.com");
    return NextResponse.json({ success: true, data: reverted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
