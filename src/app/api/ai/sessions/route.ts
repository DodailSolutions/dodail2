import { NextResponse } from "next/server";
import { listSessions, getSession } from "@/lib/ai/store";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("id");

    if (sessionId) {
      const session = await getSession(sessionId);
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
      }
      return NextResponse.json({ session });
    }

    const sessions = await listSessions(100);
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("[api/ai/sessions] Error fetching sessions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
