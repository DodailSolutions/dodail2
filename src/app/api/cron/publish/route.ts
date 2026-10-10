import { NextResponse } from "next/server";
import { runScheduledPublishing } from "@/lib/cms/api";
import { safeEqual } from "@/lib/auth/session";
import { revalidateBlog } from "@/lib/cms/publish";

/** Scheduled publishing. Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. */
async function authorized(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const bearer = req.headers.get("authorization") ?? "";
  const header = req.headers.get("x-cron-secret") ?? "";
  return (await safeEqual(bearer, `Bearer ${secret}`)) || (await safeEqual(header, secret));
}

export async function POST(req: Request) {
  if (!(await authorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await runScheduledPublishing();
    // Scheduled articles become live on their publish date; refresh the cached blog pages.
    revalidateBlog();
    return NextResponse.json({ success: true, timestamp: new Date().toISOString(), ...result });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "Cron publishing failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
