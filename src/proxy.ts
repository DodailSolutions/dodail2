import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { GONE_SLUGS, SPAM_PATTERN } from "@/content/legacy/gone";
import { ROUTES } from "@/content/routes";

/**
 * 1. Answers 410 Gone for the hacked-spam URLs of the old WordPress site (brief §9.2).
 *    Legacy 301s in next.config.ts run before this, so genuine old URLs never reach it.
 * 2. Guards the admin panel and every admin API behind a signed session cookie.
 *    Public endpoints used by the website itself are allowlisted below; endpoints
 *    with their own secret (cron, payment webhook) verify it in the handler.
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

/** First path segments the new site owns; the spam pattern is never applied to these. */
const OWN_SEGMENTS = new Set([
  ...ROUTES.map((r) => r.path.split("/")[1]).filter(Boolean),
  "admin", "api", "consultation", "faq", "products", "solutions", "llms.txt", "robots.txt",
]);

/** WordPress system paths that bots and old backlinks still hit. */
const WP_SYSTEM = /^\/(wp-admin(\/|$)|wp-login\.php|xmlrpc\.php)/i;

function isGone(request: NextRequest): boolean {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname === "/") return searchParams.has("p"); // old WordPress ?p=123 links
  if (WP_SYSTEM.test(pathname)) return true;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length !== 1) return false;
  const slug = decodeURIComponent(segments[0]).toLowerCase();
  if (GONE_SLUGS.has(slug)) return true;
  if (OWN_SEGMENTS.has(slug)) return false;
  return SPAM_PATTERN.test(slug);
}

const GONE_HTML = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>This page no longer exists | Dodail</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#071A28;color:#F5F8FC;font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
  main{max-width:34rem;padding:2rem 1.5rem;text-align:center}
  p.code{font:600 .75rem/1 ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase;color:#FA5B0F;margin:0 0 1rem}
  h1{font-size:1.75rem;line-height:1.25;margin:0 0 .75rem}
  p{color:#AABAC8;margin:0 0 1.75rem}
  nav{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}
  a{display:inline-block;min-height:44px;line-height:44px;padding:0 1.25rem;border-radius:.75rem;border:1px solid #1B3652;color:#F5F8FC;text-decoration:none;font-weight:600}
  a.primary{background:#FA5B0F;border-color:#FA5B0F;color:#071A28}
  a:focus-visible{outline:2px solid #FA5B0F;outline-offset:2px}
</style>
</head>
<body>
<main>
  <p class="code">410 · Gone</p>
  <h1>This page no longer exists</h1>
  <p>It was removed from dodail.com permanently. Here is where to go instead.</p>
  <nav aria-label="Helpful links">
    <a class="primary" href="/">Home</a>
    <a href="/services/">Services</a>
    <a href="/blog/">Blog</a>
  </nav>
</main>
</body>
</html>`;

function gone(): NextResponse {
  return new NextResponse(GONE_HTML, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAdmin = pathname.startsWith("/admin");
  const isApi = pathname.startsWith("/api/");

  if (!isAdmin && !isApi) return isGone(request) ? gone() : NextResponse.next();

  if (pathname === "/admin/login" || pathname === "/admin/login/") return NextResponse.next();
  if (isApi && isPublicApi(pathname.replace(/\/$/, ""))) return NextResponse.next();

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (isApi) {
    return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
  }

  const login = new URL("/admin/login/", request.url);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  // Everything except Next.js internals and static files (but .php is included for WordPress paths).
  matcher: ["/((?!_next/|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|css|js|map|woff2?|ttf|mp4|webm|txt|xml|json|webmanifest)$).*)"],
};
