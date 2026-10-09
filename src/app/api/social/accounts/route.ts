import { NextResponse } from "next/server";
import { getSocialAccounts } from "@/lib/content/api";

export async function GET() {
  try {
    const accounts = await getSocialAccounts();
    return NextResponse.json({
      success: true,
      data: accounts,
      note: "Official Meta & LinkedIn OAuth connections require Meta App Review and LinkedIn Community Management API approval. Disconnected accounts are displayed transparently without simulation.",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
