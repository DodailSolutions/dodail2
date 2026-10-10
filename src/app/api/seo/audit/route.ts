import { NextResponse } from "next/server";
import { runSEOAudit, getInternalLinkSuggestions } from "@/lib/seo/api";

export async function GET() {
  try {
    const audit = await runSEOAudit();
    const suggestions = getInternalLinkSuggestions();
    return NextResponse.json({
      success: true,
      audit,
      internalLinkSuggestions: suggestions,
      testedAt: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
