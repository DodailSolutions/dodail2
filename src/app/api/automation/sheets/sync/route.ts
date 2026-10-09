import { NextResponse } from "next/server";
import { getSheetConfigs, getSyncLedgers } from "@/lib/automation/store";
import { syncGoogleSheetRows } from "@/lib/automation/sheets";

export async function GET() {
  try {
    const ledgers = getSyncLedgers();
    return NextResponse.json({ success: true, data: ledgers });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const configs = getSheetConfigs();
    const activeConfig = configs[0];

    if (!activeConfig) {
      return NextResponse.json({ error: "No Google Sheet configuration found" }, { status: 400 });
    }

    const result = await syncGoogleSheetRows(activeConfig);
    return NextResponse.json({ success: true, data: result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
