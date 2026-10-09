import { NextResponse } from "next/server";
import { getAllDeals, updateDealStage, saveDeal } from "@/lib/crm/api";

export async function GET() {
  try {
    const deals = await getAllDeals();
    return NextResponse.json({ success: true, data: deals });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Deal title is required" }, { status: 400 });
    }
    const saved = await saveDeal(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, stage } = body;
    if (!id || !stage) {
      return NextResponse.json({ error: "Deal id and stage are required" }, { status: 400 });
    }

    const updated = await updateDealStage(id, stage);
    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
