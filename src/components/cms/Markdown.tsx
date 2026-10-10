import React from "react";
import Link from "next/link";
import { isSafeUrl } from "@/lib/utils";

/**
 * Safe Markdown renderer for CMS articles. Produces React elements only (never raw
 * HTML), so editor content cannot inject scripts. Supports headings, paragraphs,
 * ordered/unordered lists, blockquotes, fenced code, images, horizontal rules and
 * inline **bold**, *italic*, `code` and [links](url).
 */

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|!?\[[^\]]*\]\([^)\s]+\))/g;

function inline(text: string, key: string): React.ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const k = `${key}-${i}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) return <strong key={k}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2)
      return <code key={k} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800">{part.slice(1, -1)}</code>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={k}>{part.slice(1, -1)}</em>;
    const link = /^\[([^\]]*)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (!isSafeUrl(href)) return label;
      const cls = "font-medium text-[#C2410C] underline underline-offset-4 hover:text-[#FF6B2C]";
      return href.startsWith("/") ? (
        <Link key={k} href={href} className={cls}>{label}</Link>
      ) : (
        <a key={k} href={href} className={cls} target="_blank" rel="noopener noreferrer">{label}</a>
      );
    }
    return part;
  });
}

type Block =
  | { type: "h"; level: number; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string }
  | { type: "img"; alt: string; src: string }
  | { type: "hr" };

function parse(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.trim().startsWith("```")) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) body.push(lines[i++]);
      i++;
      blocks.push({ type: "code", text: body.join("\n") });
      continue;
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) { blocks.push({ type: "h", level: heading[1].length, text: heading[2].trim() }); i++; continue; }
    if (/^(-{3,}|\*{3,})\s*$/.test(line.trim())) { blocks.push({ type: "hr" }); i++; continue; }
    const image = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.exec(line.trim());
    if (image) { blocks.push({ type: "img", alt: image[1], src: image[2] }); i++; continue; }

    if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line);
      const marker = ordered ? /^\s*\d+[.)]\s+/ : /^\s*[-*+]\s+/;
      const items: string[] = [];
      while (i < lines.length && marker.test(lines[i])) items.push(lines[i++].replace(marker, ""));
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }
    if (line.startsWith(">")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) body.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: body.join(" ") });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|>|\s*[-*+]\s|\s*\d+[.)]\s)/.test(lines[i])) para.push(lines[i++].trim());
    blocks.push({ type: "p", text: para.join(" ") });
  }
  return blocks;
}

/** Slug used for heading anchors (and a table of contents if one is added later). */
export function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="space-y-5 text-[1.0625rem] leading-relaxed text-slate-700">
      {parse(source).map((b, i) => {
        const key = String(i);
        switch (b.type) {
          case "h": {
            // Article pages own the single <h1>; markdown headings start at h2.
            const level = Math.min(b.level + 1, 4);
            const Tag = `h${level}` as "h2" | "h3" | "h4";
            const size = level === 2 ? "text-2xl mt-10" : level === 3 ? "text-xl mt-8" : "text-lg mt-6";
            return <Tag key={key} id={headingId(b.text)} className={`${size} scroll-mt-24 font-bold tracking-tight text-slate-950`}>{inline(b.text, key)}</Tag>;
          }
          case "p":
            return <p key={key}>{inline(b.text, key)}</p>;
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={key} className={`${b.type === "ul" ? "list-disc" : "list-decimal"} space-y-2 pl-6 marker:text-[#FF6B2C]`}>
                {b.items.map((item, j) => <li key={j}>{inline(item, `${key}-${j}`)}</li>)}
              </List>
            );
          }
          case "quote":
            return <blockquote key={key} className="border-l-4 border-[#FF6B2C] bg-orange-50/50 py-3 pl-5 pr-3 italic text-slate-700">{inline(b.text, key)}</blockquote>;
          case "code":
            return <pre key={key} className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100"><code>{b.text}</code></pre>;
          case "img":
            return isSafeUrl(b.src) ? (
              // eslint-disable-next-line @next/next/no-img-element -- editor images may come from any host
              <img key={key} src={b.src} alt={b.alt} loading="lazy" decoding="async" className="w-full rounded-2xl border border-slate-200" />
            ) : null;
          case "hr":
            return <hr key={key} className="border-slate-200" />;
        }
      })}
    </div>
  );
}

/** Rough reading time (220 wpm). */
export function readingTime(source: string) {
  return Math.max(1, Math.round(source.split(/\s+/).filter(Boolean).length / 220));
}

/** Level-2 headings (`## …`) for an article's table of contents. */
export function extractHeadings(source: string): Array<{ id: string; text: string }> {
  const out: Array<{ id: string; text: string }> = [];
  let inCode = false;
  for (const line of source.split("\n")) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    const m = !inCode && /^##\s+(.*)$/.exec(line);
    if (m) {
      const text = m[1].replace(/[*`]/g, "").trim();
      out.push({ id: headingId(text), text });
    }
  }
  return out;
}
