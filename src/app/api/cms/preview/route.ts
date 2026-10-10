import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Admin-only (enforced by the proxy) preview switch.
 *   /api/cms/preview?path=/blog/my-draft  → enables Draft Mode and opens the page
 *   /api/cms/preview?exit=1&path=/blog    → leaves preview
 * While Draft Mode is on, unpublished articles render with a preview banner.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("path") || "/";
  // Same-site paths only, so the switch can never be used as an open redirect.
  const path = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";

  const draft = await draftMode();
  if (url.searchParams.get("exit")) draft.disable();
  else draft.enable();

  return NextResponse.redirect(new URL(path, url.origin));
}
