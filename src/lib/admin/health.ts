/**
 * Dashboard health checks: production configuration and on-page SEO for every
 * CMS document. Reports booleans only — never secret values.
 */
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";
import { getAllContent, getContent } from "@/lib/cms/content/store";
import { fullTitle } from "@/lib/seo/metadata";
import type { SeoContent } from "@/lib/cms/content/defaults/site";

export interface ReadinessCheck {
  label: string;
  ok: boolean;
  help: string;
}

/** Tables the CMS writes to. Missing ones mean the Supabase migrations have not been run. */
export const CMS_TABLES = ["site_content", "site_content_revisions", "blog_posts", "pages", "page_revisions", "media_assets"] as const;

/** Names of CMS tables that are missing or unreachable (empty when the database is ready). */
export async function missingCmsTables(): Promise<string[]> {
  if (!isSupabaseConfigured) return [...CMS_TABLES];
  const results = await Promise.all(
    CMS_TABLES.map(async (table): Promise<string | null> => {
      try {
        // A real (non-HEAD) select: HEAD requests hide "table not found" errors.
        const { error } = await supabaseAdmin.from(table).select("*").limit(1).abortSignal(AbortSignal.timeout(2500));
        return error ? table : null;
      } catch {
        return table;
      }
    })
  );
  return results.filter((t): t is string => t !== null);
}

export function productionChecks(seo: SeoContent, missingTables?: string[]): ReadinessCheck[] {
  const env = process.env;
  return [
    {
      label: "Database connected",
      ok: isSupabaseConfigured,
      help: "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY so edits persist in production.",
    },
    ...(missingTables
      ? [
          {
            label: "CMS tables created",
            ok: missingTables.length === 0,
            help: `Run the SQL files in supabase/migrations in the Supabase SQL editor. Missing: ${missingTables.join(", ")}.`,
          },
        ]
      : []),
    {
      label: "Admin password set",
      ok: Boolean(env.ADMIN_PASSWORD && env.ADMIN_PASSWORD.length >= 12),
      help: "Set ADMIN_PASSWORD (12+ characters) and ADMIN_EMAIL in the hosting environment.",
    },
    {
      label: "Session secret set",
      ok: Boolean(env.ADMIN_SESSION_SECRET && env.ADMIN_SESSION_SECRET.length >= 32),
      help: "Set ADMIN_SESSION_SECRET to 32+ random characters (e.g. `openssl rand -base64 48`).",
    },
    {
      label: "Scheduled publishing secured",
      ok: Boolean(env.CRON_SECRET),
      help: "Set CRON_SECRET so only your scheduler can trigger /api/cron/publish.",
    },
    {
      label: "Payment webhook secured",
      ok: Boolean(env.PAYMENT_WEBHOOK_SECRET || env.RAZORPAY_WEBHOOK_SECRET),
      help: "Set PAYMENT_WEBHOOK_SECRET (or RAZORPAY_WEBHOOK_SECRET) to verify payment callbacks.",
    },
    {
      label: "HTTPS site URL",
      ok: seo.siteUrl.startsWith("https://"),
      help: "Set the Site URL under SEO & app settings to your live https:// domain.",
    },
    {
      label: "Search Console verified",
      ok: Boolean(seo.verification.google),
      help: "Paste your Google Search Console verification code under SEO & app settings.",
    },
  ];
}

export interface SeoIssue {
  key: string;
  label: string;
  path?: string;
  problem: string;
}

const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;

/** Title / description length checks for every CMS document that has an `seo` block. */
export async function seoAudit(): Promise<{ checked: number; issues: SeoIssue[] }> {
  const [docs, site] = await Promise.all([getAllContent(), getContent("site/seo")]);
  const issues: SeoIssue[] = [];
  let checked = 0;
  const titles = new Map<string, string>();

  for (const { def, data } of docs) {
    const seo = (data as { seo?: { title?: unknown; description?: unknown; noIndex?: unknown } }).seo;
    if (!seo || typeof seo.title !== "string" || typeof seo.description !== "string" || seo.noIndex === true) continue;
    checked++;
    const base = { key: def.key, label: def.label, path: def.path };
    const title = seo.title.trim();
    const description = seo.description.trim();

    if (!title) issues.push({ ...base, problem: "Missing SEO title" });
    else {
      // Measure the title as search engines see it, including any brand suffix.
      const rendered = fullTitle(title, site);
      if (rendered.length > TITLE_MAX) {
        const suffix = rendered === title ? "" : " including the brand suffix";
        issues.push({ ...base, problem: `Title is ${rendered.length} characters${suffix} (aim for under ${TITLE_MAX})` });
      }
    }
    if (!description) issues.push({ ...base, problem: "Missing meta description" });
    else if (description.length < DESC_MIN) issues.push({ ...base, problem: `Description is short (${description.length} characters)` });
    else if (description.length > DESC_MAX) issues.push({ ...base, problem: `Description is ${description.length} characters (aim for under ${DESC_MAX})` });

    const duplicate = title && titles.get(title.toLowerCase());
    if (duplicate) issues.push({ ...base, problem: `Same title as “${duplicate}”` });
    else if (title) titles.set(title.toLowerCase(), def.label);
  }
  return { checked, issues };
}
