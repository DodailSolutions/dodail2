import { NextResponse } from "next/server";
import { getAllLeads, createLeadFromSubmission, updateLead, getLeadById } from "@/lib/crm/api";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    if (id) {
      const data = await getLeadById(id);
      if (!data) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      return NextResponse.json({ success: true, data });
    }

    const leads = await getAllLeads({ status, search });
    return NextResponse.json({ success: true, data: leads });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const result = await createLeadFromSubmission(body);
    return NextResponse.json({ success: true, data: result.lead, isDuplicate: result.isDuplicate }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Lead id is required" }, { status: 400 });
    }

    const updated = await updateLead(body.id, body);
    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
