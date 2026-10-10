/**
 * Server-side persistence for Site Content.
 *
 * Writes go to a local JSON file (dev / single-server) and to the Supabase
 * `site_content` table when it is reachable. Reads take whichever copy is newer,
 * then merge it over the code defaults, so a page always renders.
 */
import fs from "fs";
import path from "path";
import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { allDefinitions, ContentKey, ContentOf, contentRegistry, getDefinition } from "./registry";
import { sanitizeContent } from "./schema";
import { recordRevision } from "./history";
import type { ContentDefinition, ContentSummary, StoredContent } from "./types";

const STORE_FILE = path.join(process.cwd(), "cms-content.json");
const TABLE = "site_content";
const REMOTE_TIMEOUT_MS = 2500;

type StoreFile = Record<string, StoredContent>;

function readLocal(): StoreFile {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(STORE_FILE, "utf-8"));
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as StoreFile;
    }
  } catch (e) {
    console.error("[cms-content] Could not read local content store:", e);
  }
  return {};
}

function writeLocal(store: StoreFile): boolean {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
    return true;
  } catch {
    // Read-only filesystems (e.g. serverless) rely on Supabase alone.
    return false;
  }
}

interface RemoteRow {
  key: string;
  data: unknown;
  updated_at: string;
  updated_by: string;
}

async function readRemote(keys?: string[]): Promise<StoreFile> {
  try {
    let query = supabaseAdmin.from(TABLE).select("key, data, updated_at, updated_by");
    if (keys) query = query.in("key", keys);
    const { data, error } = await query.abortSignal(AbortSignal.timeout(REMOTE_TIMEOUT_MS));
    if (error || !data) return {};
    return Object.fromEntries(
      (data as RemoteRow[]).map((r) => [r.key, { data: r.data, updated_at: r.updated_at, updated_by: r.updated_by }])
    );
  } catch {
    return {};
  }
}

function newer(a?: StoredContent, b?: StoredContent): StoredContent | undefined {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(a.updated_at) >= Date.parse(b.updated_at) ? a : b;
}

/** Stored record for one key (deduplicated per request). */
const getStored = cache(async (key: string): Promise<StoredContent | undefined> => {
  const remote = await readRemote([key]);
  return newer(remote[key], readLocal()[key]);
});

function resolve<T>(def: ContentDefinition<T>, stored?: StoredContent): T {
  return sanitizeContent(def.defaults, stored ? stored.data : def.defaults, def);
}

/** Published content for a page: stored edits merged over the defaults. */
export async function getContent<K extends ContentKey>(key: K): Promise<ContentOf<K>> {
  const def = contentRegistry[key] as ContentDefinition<ContentOf<K>>;
  return resolve(def, await getStored(key));
}

export async function getContentRecord(key: string) {
  const def = getDefinition(key);
  if (!def) return null;
  const stored = await getStored(key);
  return {
    data: resolve(def, stored),
    defaults: def.defaults,
    customized: Boolean(stored),
    updated_at: stored?.updated_at,
    updated_by: stored?.updated_by,
  };
}

export async function listContent(): Promise<ContentSummary[]> {
  const local = readLocal();
  const remote = await readRemote();
  return allDefinitions().map((def) => {
    const stored = newer(remote[def.key], local[def.key]);
    return {
      key: def.key,
      label: def.label,
      group: def.group,
      description: def.description,
      path: def.path,
      customized: Boolean(stored),
      updated_at: stored?.updated_at,
      updated_by: stored?.updated_by,
    };
  });
}

/** Resolved content for every document in one round trip (dashboard audits). */
export async function getAllContent(): Promise<Array<{ def: ContentDefinition; data: unknown; updated_at?: string }>> {
  const local = readLocal();
  const remote = await readRemote();
  return allDefinitions().map((def) => {
    const stored = newer(remote[def.key], local[def.key]);
    return { def, data: resolve(def, stored), updated_at: stored?.updated_at };
  });
}

export interface SaveResult {
  data: unknown;
  updated_at: string;
  persisted: { local: boolean; remote: boolean };
}

export class ContentNotFoundError extends Error {}

export async function saveContent(key: string, input: unknown, userEmail: string, note = "Published"): Promise<SaveResult> {
  const def = getDefinition(key);
  if (!def) throw new ContentNotFoundError(`Unknown content key: ${key}`);

  const record: StoredContent = {
    data: sanitizeContent(def.defaults, input, def),
    updated_at: new Date().toISOString(),
    updated_by: userEmail,
  };

  const store = readLocal();
  store[key] = record;
  const local = writeLocal(store);

  let remote = false;
  try {
    const { error } = await supabaseAdmin
      .from(TABLE)
      .upsert({ key, ...record })
      .abortSignal(AbortSignal.timeout(REMOTE_TIMEOUT_MS));
    remote = !error;
  } catch {
    remote = false;
  }

  if (!local && !remote) {
    throw new Error("Content could not be saved: the local store is read-only and Supabase is unreachable.");
  }
  await recordRevision(key, record.data, userEmail, note);
  return { data: record.data, updated_at: record.updated_at, persisted: { local, remote } };
}

/** Removes stored edits so the page falls back to its default copy. */
export async function resetContent(key: string, userEmail = "admin@dodail.com"): Promise<void> {
  const def = getDefinition(key);
  if (!def) throw new ContentNotFoundError(`Unknown content key: ${key}`);
  await recordRevision(key, def.defaults, userEmail, "Reset to original copy");
  const store = readLocal();
  if (key in store) {
    delete store[key];
    writeLocal(store);
  }
  try {
    await supabaseAdmin.from(TABLE).delete().eq("key", key).abortSignal(AbortSignal.timeout(REMOTE_TIMEOUT_MS));
  } catch {
    // Remote copy is optional.
  }
}
