import { NextResponse } from "next/server";
import { mergeLeads } from "@/lib/crm/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sourceId, targetId, userEmail } = body;
    if (!sourceId || !targetId) {
      return NextResponse.json({ error: "sourceId and targetId are required" }, { status: 400 });
    }

    const merged = await mergeLeads(sourceId, targetId, userEmail);
    if (!merged) {
      return NextResponse.json({ error: "Merge failed. Verify both lead IDs exist." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: merged });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
