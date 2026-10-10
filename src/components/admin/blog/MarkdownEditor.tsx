"use client";

import React from "react";
import { Bold, Code, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Minus, Quote } from "lucide-react";
import { Markdown, readingTime } from "@/components/cms/Markdown";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { cn } from "@/lib/utils";

type Mode = "write" | "preview" | "split";

interface Action {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  apply: (selected: string) => { text: string; select?: [number, number] };
}

/** Line-prefix actions toggle on every selected line; inline actions wrap the selection. */
const linePrefix = (prefix: string | ((i: number) => string)) => (selected: string) => {
  const lines = (selected || "").split("\n");
  const text = lines.map((l, i) => `${typeof prefix === "function" ? prefix(i) : prefix}${l.replace(/^(#{1,4}\s|[-*]\s|\d+\.\s|>\s?)/, "")}`).join("\n");
  return { text };
};
const wrap = (before: string, after: string, placeholder: string) => (selected: string) => {
  const inner = selected || placeholder;
  return { text: `${before}${inner}${after}`, select: [before.length, before.length + inner.length] as [number, number] };
};

const ACTIONS: Action[] = [
  { label: "Heading", icon: Heading2, apply: linePrefix("## ") },
  { label: "Subheading", icon: Heading3, apply: linePrefix("### ") },
  { label: "Bold", icon: Bold, shortcut: "b", apply: wrap("**", "**", "bold text") },
  { label: "Italic", icon: Italic, shortcut: "i", apply: wrap("*", "*", "italic text") },
  { label: "Link", icon: Link2, shortcut: "k", apply: (s) => ({ text: `[${s || "link text"}](https://)`, select: [s ? s.length + 3 : 12, s ? s.length + 11 : 20] }) },
  { label: "Bulleted list", icon: List, apply: linePrefix("- ") },
  { label: "Numbered list", icon: ListOrdered, apply: linePrefix((i) => `${i + 1}. `) },
  { label: "Quote", icon: Quote, apply: linePrefix("> ") },
  { label: "Code block", icon: Code, apply: (s) => ({ text: `\n\`\`\`\n${s || "code"}\n\`\`\`\n` }) },
  { label: "Divider", icon: Minus, apply: () => ({ text: "\n\n---\n\n" }) },
];

export function MarkdownEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = React.useState<Mode>("write");
  const [picker, setPicker] = React.useState(false);
  const words = value.split(/\s+/).filter(Boolean).length;

  /** Replaces the current selection and restores a sensible caret / selection afterwards. */
  const replaceSelection = (make: (selected: string) => { text: string; select?: [number, number] }) => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const { text, select } = make(value.slice(start, end));
    onChange(value.slice(0, start) + text + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      if (select) el.setSelectionRange(start + select[0], start + select[1]);
      else el.setSelectionRange(start + text.length, start + text.length);
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.metaKey || e.ctrlKey)) return;
    const action = ACTIONS.find((a) => a.shortcut === e.key.toLowerCase());
    if (action) {
      e.preventDefault();
      replaceSelection(action.apply);
    }
  };

  const toolbarButton = "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white active:scale-95";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40">
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-2 py-1.5">
        <div className="no-scrollbar flex min-w-0 items-center gap-0.5 overflow-x-auto" role="toolbar" aria-label="Formatting">
          {ACTIONS.map((a) => (
            <button
              key={a.label}
              type="button"
              title={a.shortcut ? `${a.label} (⌘${a.shortcut.toUpperCase()})` : a.label}
              aria-label={a.label}
              onClick={() => replaceSelection(a.apply)}
              disabled={mode === "preview"}
              className={cn(toolbarButton, "disabled:opacity-30")}
            >
              <a.icon className="h-4 w-4" />
            </button>
          ))}
          <button type="button" title="Insert image" aria-label="Insert image" onClick={() => setPicker(true)} disabled={mode === "preview"} className={cn(toolbarButton, "disabled:opacity-30")}>
            <ImagePlus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex shrink-0 rounded-lg bg-slate-900 p-0.5 text-[11px] font-medium" role="tablist" aria-label="Editor view">
          {(["write", "split", "preview"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cn("rounded-md px-2.5 py-1.5 capitalize", m === "split" && "hidden lg:block", mode === m ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white")}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("grid", mode === "split" && "lg:grid-cols-2 lg:divide-x lg:divide-slate-800")}>
        {mode !== "preview" && (
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck
            aria-label="Article body (Markdown)"
            placeholder={"## Start with a heading\n\nWrite your article here. Use the toolbar for headings, lists, links and images."}
            className="min-h-[55dvh] w-full resize-y bg-transparent p-4 font-mono text-[15px] leading-relaxed text-slate-100 placeholder-slate-600 focus:outline-none sm:text-sm"
          />
        )}
        {mode !== "write" && (
          <div className="max-h-[75dvh] min-h-[55dvh] overflow-y-auto bg-[#FAFBFD] p-5 sm:p-8">
            {value.trim() ? <Markdown source={value} /> : <p className="text-sm text-slate-400">Nothing to preview yet.</p>}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 px-4 py-2 text-[11px] text-slate-500">
        <span>Markdown · ⌘B bold · ⌘I italic · ⌘K link</span>
        <span>
          {words.toLocaleString()} words · {readingTime(value)} min read
        </span>
      </div>

      <MediaPicker
        open={picker}
        onClose={() => setPicker(false)}
        title="Insert an image"
        onSelect={({ url, alt }) => replaceSelection(() => ({ text: `\n![${alt || "Describe the image"}](${url})\n` }))}
      />
    </div>
  );
}
