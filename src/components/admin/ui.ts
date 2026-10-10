/** Shared admin form styles (dark studio theme). */
export const adminInput =
  "w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-base sm:text-sm text-white placeholder-slate-500 focus:border-[#FA5B0F] focus:outline-none focus:ring-1 focus:ring-[#FA5B0F] disabled:opacity-50";

export const adminLabel = "mb-1.5 block text-xs font-medium text-slate-300";

export const adminCard = "rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5";

export const adminButton =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white disabled:opacity-40";

export const adminPrimary =
  "inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#FA5B0F] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#FA5B0F]/90 disabled:cursor-not-allowed disabled:opacity-40";

/** "2026-10-10T09:30:00.000Z" -> "2026-10-10T15:00" in the browser's time zone, for <input type="datetime-local">. */
export function toLocalInput(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromLocalInput(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
