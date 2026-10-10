import { NextResponse } from "next/server";
import { adminCredentials, createSessionToken, safeEqual, SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

/** Simple per-instance brute-force throttle: 8 failed attempts per IP per 15 minutes. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;
const failures = new Map<string, { count: number; since: number }>();

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function isLocked(ip: string) {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.since > WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.since > WINDOW_MS) failures.set(ip, { count: 1, since: Date.now() });
  else entry.count += 1;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isLocked(ip)) {
    return NextResponse.json({ success: false, error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }

  const credentials = adminCredentials();
  if (!credentials) {
    return NextResponse.json(
      { success: false, error: "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 503 }
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const [emailOk, passwordOk] = await Promise.all([
    safeEqual(email, credentials.email),
    safeEqual(password, credentials.password),
  ]);
  if (!emailOk || !passwordOk) {
    recordFailure(ip);
    return NextResponse.json({ success: false, error: "Incorrect email or password." }, { status: 401 });
  }

  failures.delete(ip);
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(credentials.email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
