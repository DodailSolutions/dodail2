import { NextResponse } from "next/server";
import { getGlobalSettings, saveGlobalSettings } from "@/lib/cms/api";

export async function GET() {
  try {
    const settings = await getGlobalSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated = await saveGlobalSettings(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
