import { NextResponse } from "next/server";
import { runScheduledPublishing } from "@/lib/cms/api";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.CRON_SECRET || "dodail-cron-secret-2026";
    
    // Check bearer token or secret header
    if (authHeader !== `Bearer ${secret}` && req.headers.get("x-cron-secret") !== secret) {
      // In dev mode allow if no secret configured
      if (process.env.NODE_ENV === "production" && process.env.CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const result = await runScheduledPublishing();
    return NextResponse.json({ success: true, timestamp: new Date().toISOString(), ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Cron publishing failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
