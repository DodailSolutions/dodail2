import crypto from "crypto";

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: Record<string, CachedToken> = {};

function base64url(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Generates an OAuth2 Bearer Access Token for Google APIs using a Service Account Private Key.
 * Returns null if service account credentials are not configured.
 */
export async function getGoogleServiceAccountAccessToken(scopes: string[]): Promise<string | null> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!email || !privateKey) {
    return null;
  }

  // Handle escaped newlines from environment variable strings
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  const cacheKey = `${email}:${scopes.sort().join(",")}`;
  const now = Math.floor(Date.now() / 1000);

  if (tokenCache[cacheKey] && tokenCache[cacheKey].expiresAt > now + 60) {
    return tokenCache[cacheKey].accessToken;
  }

  try {
    const header = {
      alg: "RS256",
      typ: "JWT",
    };

    const claimSet = {
      iss: email,
      scope: scopes.join(" "),
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedClaimSet = base64url(JSON.stringify(claimSet));
    const signingInput = `${encodedHeader}.${encodedClaimSet}`;

    const signer = crypto.createSign("RSA-SHA256");
    signer.update(signingInput);
    const signature = signer.sign(privateKey, "base64");
    const encodedSignature = signature
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const jwt = `${signingInput}.${encodedSignature}`;

    // Exchange JWT for Bearer Access Token
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("[google-auth] Token exchange error:", errText);
      return null;
    }

    const data = await res.json();
    if (data.access_token) {
      tokenCache[cacheKey] = {
        accessToken: data.access_token,
        expiresAt: now + (data.expires_in || 3600),
      };
      return data.access_token;
    }
  } catch (err) {
    console.warn("[google-auth] Failed to generate Google Service Account token:", err);
  }

  return null;
}
