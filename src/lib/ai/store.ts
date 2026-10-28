import fs from "fs";
import path from "path";
import { ConversationSession, ChatMessage } from "./types";
import { supabaseAdmin } from "@/lib/supabase";

const SESSIONS_DIR = path.join(process.cwd(), "data");
const SESSIONS_FILE = path.join(SESSIONS_DIR, "chat-sessions.json");

function ensureDirectory() {
  try {
    if (!fs.existsSync(SESSIONS_DIR)) {
      fs.mkdirSync(SESSIONS_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("[ai/store] Unable to create data directory:", err);
  }
}

function readLocalSessions(): Record<string, ConversationSession> {
  ensureDirectory();
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = fs.readFileSync(SESSIONS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("[ai/store] Failed to read local sessions file:", err);
  }
  return {};
}

function writeLocalSessions(sessions: Record<string, ConversationSession>): boolean {
  ensureDirectory();
  try {
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn("[ai/store] Failed to write local sessions file:", err);
    return false;
  }
}

/**
 * Persists or updates a chat session.
 */
export async function saveSession(session: ConversationSession): Promise<void> {
  // 1. Always update local store
  const local = readLocalSessions();
  local[session.id] = {
    ...session,
    updated_at: new Date().toISOString(),
  };
  writeLocalSessions(local);

  // 2. Best-effort Supabase sync
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      await supabaseAdmin.from("ai_chat_sessions").upsert(
        {
          id: session.id,
          visitor_fingerprint: session.visitor_fingerprint || null,
          qualification_state: session.qualification_state,
          consent: session.consent,
          messages: session.messages,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
    }
  } catch {
    // Non-blocking fallback to local persistence
  }
}

/**
 * Retrieves a chat session by ID.
 */
export async function getSession(sessionId: string): Promise<ConversationSession | null> {
  const local = readLocalSessions();
  if (local[sessionId]) {
    return local[sessionId];
  }

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data, error } = await supabaseAdmin
        .from("ai_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          visitor_fingerprint: data.visitor_fingerprint || undefined,
          messages: data.messages || [],
          qualification_state: data.qualification_state || {},
          consent: data.consent || { marketing_consent: false, terms_agreed: false, timestamp: new Date().toISOString() },
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString(),
        };
      }
    }
  } catch {
    // Fall back to local
  }

  return null;
}

/**
 * Returns all saved sessions for the Admin panel.
 */
export async function listSessions(limit = 100): Promise<ConversationSession[]> {
  const local = readLocalSessions();
  const sessions = Object.values(local);

  // Sort by updated_at descending
  sessions.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  if (sessions.length > 0) {
    return sessions.slice(0, limit);
  }

  // Try Supabase if local is empty
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data } = await supabaseAdmin
        .from("ai_chat_sessions")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(limit);

      if (data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          visitor_fingerprint: d.visitor_fingerprint || undefined,
          messages: d.messages || [],
          qualification_state: d.qualification_state || {},
          consent: d.consent || { marketing_consent: false, terms_agreed: false, timestamp: new Date().toISOString() },
          created_at: d.created_at || new Date().toISOString(),
          updated_at: d.updated_at || new Date().toISOString(),
        }));
      }
    }
  } catch {
    // Return empty array
  }

  return [];
}
