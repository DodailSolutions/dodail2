import { NextResponse } from "next/server";
import { addLeadActivity } from "@/lib/crm/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.lead_id || !body.title) {
      return NextResponse.json({ error: "lead_id and title are required" }, { status: 400 });
    }

    const activity = await addLeadActivity(body);
    return NextResponse.json({ success: true, data: activity }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
