/**
 * Version history for Site Content. Every save (and reset) records a snapshot,
 * kept in Supabase `site_content_revisions` and in a local JSON file, newest
 * first, capped per document.
 */
import fs from "fs";
import path from "path";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";

const HISTORY_FILE = path.join(process.cwd(), "cms-content-history.json");
const TABLE = "site_content_revisions";
const KEEP = 30;
const TIMEOUT_MS = 2500;

export interface ContentRevision {
  id: string;
  key: string;
  data: unknown;
  note: string;
  created_by: string;
  created_at: string;
}

type HistoryFile = Record<string, ContentRevision[]>;

function readLocal(): HistoryFile {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as HistoryFile;
    }
  } catch {
    // A corrupt history file only loses history, never content.
  }
  return {};
}

function writeLocal(file: HistoryFile) {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(file), "utf-8");
  } catch {
    // Read-only filesystem: Supabase keeps the history.
  }
}

export async function recordRevision(key: string, data: unknown, createdBy: string, note: string): Promise<void> {
  const revision: ContentRevision = { id: crypto.randomUUID(), key, data, note, created_by: createdBy, created_at: new Date().toISOString() };

  const file = readLocal();
  file[key] = [revision, ...(file[key] ?? [])].slice(0, KEEP);
  writeLocal(file);

  if (!isSupabaseConfigured) return;
  try {
    await supabaseAdmin.from(TABLE).insert(revision).abortSignal(AbortSignal.timeout(TIMEOUT_MS));
    // Trim old rows beyond the cap (best effort).
    const { data } = await supabaseAdmin
      .from(TABLE)
      .select("id")
      .eq("key", key)
      .order("created_at", { ascending: false })
      .range(KEEP, KEEP + 50)
      .abortSignal(AbortSignal.timeout(TIMEOUT_MS));
    if (data?.length) await supabaseAdmin.from(TABLE).delete().in("id", data.map((r) => r.id));
  } catch {
    // History is a convenience; a failed insert never blocks publishing.
  }
}

/** Newest-first versions of one document from both stores (deduplicated by id). */
export async function listRevisions(key: string): Promise<ContentRevision[]> {
  const merged = new Map<string, ContentRevision>();
  for (const r of readLocal()[key] ?? []) merged.set(r.id, r);
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from(TABLE)
        .select("*")
        .eq("key", key)
        .order("created_at", { ascending: false })
        .limit(KEEP)
        .abortSignal(AbortSignal.timeout(TIMEOUT_MS));
      if (!error && data) for (const r of data as ContentRevision[]) merged.set(r.id, r);
    } catch {
      // Fall back to the local history.
    }
  }
  return [...merged.values()].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)).slice(0, KEEP);
}
