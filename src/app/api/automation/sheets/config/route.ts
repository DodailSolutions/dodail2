import { NextResponse } from "next/server";
import { getSheetConfigs, saveSheetConfig } from "@/lib/automation/store";

export async function GET() {
  try {
    const configs = getSheetConfigs();
    return NextResponse.json({ success: true, data: configs[0] || null });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const saved = saveSheetConfig(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
