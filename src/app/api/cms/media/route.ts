import { NextResponse } from "next/server";
import { getAllMediaAssets, saveMediaAsset } from "@/lib/cms/api";

export async function GET() {
  try {
    const assets = await getAllMediaAssets();
    return NextResponse.json({ success: true, data: assets });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.file_name || !body.file_url) {
      return NextResponse.json({ error: "file_name and file_url are required" }, { status: 400 });
    }
    const asset = await saveMediaAsset(body);
    return NextResponse.json({ success: true, data: asset }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
