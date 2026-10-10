import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * Guards the admin panel and every admin API behind a signed session cookie.
 * Public endpoints used by the website itself are allowlisted below; endpoints
 * with their own secret (cron, payment webhook) verify it in the handler.
 */
const PUBLIC_API = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/health",
  "/api/leads/submit",
  "/api/ai/chat",
  "/api/booking/availability",
  "/api/booking/checkout",
  "/api/booking/webhook",
  "/api/cron/",
];

function isPublicApi(pathname: string) {
  return PUBLIC_API.some((p) => (p.endsWith("/") ? pathname.startsWith(p) : pathname === p));
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/api/") && isPublicApi(pathname)) return NextResponse.next();

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
  }

  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
