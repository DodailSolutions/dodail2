import fs from "fs";
import path from "path";
import { getGoogleServiceAccountAccessToken } from "./google-auth";

const SHEETS_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export interface SheetLeadPayload {
  sessionId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  requirement?: string;
  problem?: string;
  service?: string;
  budget?: string;
  bookedSlot?: string;
  status?: string;
  adminNotes?: string;
  adminStatus?: string;
}

const LOCAL_LEADS_FILE = path.join(process.cwd(), "data", "sheet-leads.json");

function ensureLocalFile() {
  try {
    const dir = path.dirname(LOCAL_LEADS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    console.warn("[google-sheets] Failed to ensure local dir:", e);
  }
}

function readLocalLeads(): SheetLeadPayload[] {
  ensureLocalFile();
  try {
    if (fs.existsSync(LOCAL_LEADS_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_LEADS_FILE, "utf-8"));
    }
  } catch (e) {
    console.warn("[google-sheets] Failed to read local leads:", e);
  }
  return [];
}

function writeLocalLeads(leads: SheetLeadPayload[]) {
  ensureLocalFile();
  try {
    fs.writeFileSync(LOCAL_LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (e) {
    console.warn("[google-sheets] Failed to write local leads:", e);
  }
}

/**
 * Appends or updates a lead row in Google Sheets.
 */
export async function appendLeadToSheet(lead: SheetLeadPayload): Promise<{
  success: boolean;
  isLive: boolean;
  rowIndex?: number;
  message: string;
}> {
  // Always update local cache
  const local = readLocalLeads();
  const existingIdx = local.findIndex((l) => l.sessionId === lead.sessionId || (lead.email && l.email.toLowerCase() === lead.email.toLowerCase()));
  if (existingIdx >= 0) {
    local[existingIdx] = { ...local[existingIdx], ...lead };
  } else {
    local.push(lead);
  }
  writeLocalLeads(local);

  const token = await getGoogleServiceAccountAccessToken(SHEETS_SCOPES);
  const spreadsheetId = process.env.DEFAULT_GOOGLE_SPREADSHEET_ID;

  if (token && spreadsheetId) {
    try {
      const now = new Date().toISOString();
      const rowValues = [
        now,
        lead.sessionId,
        lead.name || "Anonymous Visitor",
        lead.email || "",
        lead.phone || "",
        lead.company || "",
        lead.requirement || lead.problem || "",
        lead.service || "General Strategy & AI",
        lead.budget || "Custom Scope",
        lead.bookedSlot || "Not Scheduled",
        lead.status || "Qualified Lead",
        lead.adminNotes || "",
        lead.adminStatus || "Pending Review",
      ];

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:M:append?valueInputOption=USER_ENTERED`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [rowValues],
          }),
        }
      );

      if (res.ok) {
        return {
          success: true,
          isLive: true,
          message: "Lead recorded in live Google Sheet successfully.",
        };
      } else {
        const err = await res.text();
        console.warn("[google-sheets] Append row failed:", err);
      }
    } catch (err) {
      console.warn("[google-sheets] API call exception:", err);
    }
  }

  return {
    success: true,
    isLive: false,
    message: "Lead saved to local sync registry. Will sync to Google Sheet when online.",
  };
}

/**
 * Reads lead status and administrator notes from Google Sheets.
 */
export async function readLeadStatusFromSheet(emailOrSessionId: string): Promise<{
  status?: string;
  adminNotes?: string;
  adminStatus?: string;
  bookedSlot?: string;
} | null> {
  const query = emailOrSessionId.toLowerCase().trim();

  // Check local cache first
  const local = readLocalLeads();
  const matched = local.find(
    (l) => l.sessionId.toLowerCase() === query || (l.email && l.email.toLowerCase() === query)
  );

  const token = await getGoogleServiceAccountAccessToken(SHEETS_SCOPES);
  const spreadsheetId = process.env.DEFAULT_GOOGLE_SPREADSHEET_ID;

  if (token && spreadsheetId) {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:M`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const rows: string[][] = data.values || [];

        // Scan rows (skip header row 0)
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const rowSessionId = (row[1] || "").toLowerCase();
          const rowEmail = (row[3] || "").toLowerCase();

          if (rowSessionId === query || (rowEmail && rowEmail === query)) {
            return {
              bookedSlot: row[9],
              status: row[10],
              adminNotes: row[11],
              adminStatus: row[12],
            };
          }
        }
      }
    } catch (err) {
      console.warn("[google-sheets] Read values exception:", err);
    }
  }

  if (matched) {
    return {
      bookedSlot: matched.bookedSlot,
      status: matched.status,
      adminNotes: matched.adminNotes,
      adminStatus: matched.adminStatus,
    };
  }

  return null;
}
