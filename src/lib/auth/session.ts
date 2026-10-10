/**
 * Admin session tokens: `<base64url payload>.<base64url HMAC-SHA256>`.
 * Uses Web Crypto only, so it runs in the proxy as well as in route handlers.
 *
 * Configuration (required in production):
 *   ADMIN_EMAIL           login email for the CMS
 *   ADMIN_PASSWORD        login password for the CMS
 *   ADMIN_SESSION_SECRET  32+ random characters used to sign session cookies
 */

export const SESSION_COOKIE = "dodail_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

const DEV_SECRET = "dodail-dev-only-session-secret-change-me";
const DEV_PASSWORD = "dodail-dev";

export interface AdminSession {
  email: string;
  exp: number;
}

const isProduction = () => process.env.NODE_ENV === "production";

function sessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  return isProduction() ? null : DEV_SECRET;
}

/** Credentials the login form checks against; null when login is not configured (fails closed in production). */
export function adminCredentials(): { email: string; password: string } | null {
  const email = (process.env.ADMIN_EMAIL || "admin@dodail.com").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || (isProduction() ? "" : DEV_PASSWORD);
  if (!password || !sessionSecret()) return null;
  return { email, password };
}

/** True when running locally without ADMIN_PASSWORD, so the login page can show the dev password hint. */
export function usingDevCredentials(): boolean {
  return !isProduction() && !process.env.ADMIN_PASSWORD;
}

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(base64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function createSessionToken(email: string): Promise<string> {
  const secret = sessionSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  const payload: AdminSession = { email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(body)));
  return `${body}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<AdminSession | null> {
  const secret = sessionSecret();
  if (!token || !secret) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret),
      fromBase64Url(signature) as BufferSource,
      encoder.encode(body)
    );
    if (!valid) return null;
    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as AdminSession;
    if (typeof session.email !== "string" || typeof session.exp !== "number") return null;
    return session.exp > Date.now() / 1000 ? session : null;
  } catch {
    return null;
  }
}

/** Constant-time string comparison (both sides are hashed first so lengths never leak). */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const x = new Uint8Array(ha);
  const y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}
