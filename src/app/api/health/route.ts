import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/** Public uptime probe. Reports only coarse status, never configuration details. */
export async function GET() {
  const started = Date.now();
  let database: "connected" | "unreachable" | "not_configured" = "not_configured";

  if (isSupabaseConfigured) {
    try {
      // A real select (not HEAD): HEAD requests report success even when the table is missing.
      const { error } = await supabaseAdmin.from("site_content").select("key").limit(1).abortSignal(AbortSignal.timeout(2500));
      database = error ? "unreachable" : "connected";
    } catch {
      database = "unreachable";
    }
  }

  return NextResponse.json(
    { status: "ok", database, timestamp: new Date().toISOString(), response_time_ms: Date.now() - started },
    { headers: { "Cache-Control": "no-store" } }
  );
}
