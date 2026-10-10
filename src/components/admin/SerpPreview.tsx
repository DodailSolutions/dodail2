import { cn } from "@/lib/utils";

/** Approximate Google result snippet plus length meters for a title and description. */
export function SerpPreview({ url, title, description, noIndex }: { url: string; title: string; description: string; noIndex?: boolean }) {
  const shownTitle = title.length > 60 ? `${title.slice(0, 58)}…` : title;
  const shownDesc = description.length > 158 ? `${description.slice(0, 155)}…` : description;
  return (
    <div className="space-y-3">
      <div className={cn("rounded-xl bg-white p-4 font-[arial,sans-serif]", noIndex && "opacity-50")}>
        <p className="truncate text-xs text-[#202124]">{url.replace(/^https?:\/\//, "").replace(/\//g, " › ")}</p>
        <p className="mt-1 text-lg leading-snug text-[#1a0dab]">{shownTitle || "Add an SEO title"}</p>
        <p className="mt-1 text-sm leading-snug text-[#4d5156]">{shownDesc || "Add a meta description so Google shows your summary instead of a random excerpt."}</p>
      </div>
      {noIndex && <p className="text-xs text-amber-300">Hidden from search engines — this page won’t appear in Google.</p>}
      <LengthMeter label="Title" length={title.length} min={30} max={60} />
      <LengthMeter label="Description" length={description.length} min={70} max={160} />
    </div>
  );
}

export function LengthMeter({ label, length, min, max }: { label: string; length: number; min: number; max: number }) {
  const state = length === 0 ? "empty" : length < min ? "short" : length > max ? "long" : "good";
  const color = { empty: "bg-slate-700", short: "bg-amber-400", long: "bg-rose-400", good: "bg-emerald-400" }[state];
  const text = { empty: "Missing", short: "A little short", long: "Too long — will be cut off", good: "Good length" }[state];
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-400">{label}</span>
        <span className={state === "good" ? "text-emerald-300" : state === "empty" ? "text-slate-500" : "text-amber-300"}>
          {length}/{max} · {text}
        </span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-800">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${Math.min(100, (length / max) * 100)}%` }} />
      </div>
    </div>
  );
}
