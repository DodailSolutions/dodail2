import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken, type AdminSession } from "./session";

/** Current admin session from the request cookies (server components and route handlers). */
export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Email recorded as the author of a CMS change. The proxy guarantees a session on admin APIs. */
export async function editorEmail(): Promise<string> {
  return (await getAdminSession())?.email ?? "admin@dodail.com";
}
