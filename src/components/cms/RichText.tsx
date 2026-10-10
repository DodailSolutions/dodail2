import React from "react";
import Link from "next/link";
import { isSafeUrl } from "@/lib/utils";

/**
 * Renders CMS text with a deliberately tiny, safe formatting set:
 * **bold**, [link text](/path) and line breaks. No HTML is ever injected.
 */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

function renderLine(line: string, linkClassName: string | undefined, keyPrefix: string): React.ReactNode[] {
  return line.split(TOKEN).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (!isSafeUrl(href)) return label;
      return href.startsWith("/") ? (
        <Link key={key} href={href} className={linkClassName}>{label}</Link>
      ) : (
        <a key={key} href={href} className={linkClassName} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    return part;
  });
}

export function RichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {renderLine(line, linkClassName, String(i))}
        </React.Fragment>
      ))}
    </>
  );
}

/** Wraps the first occurrence of `highlight` inside `title` with `render`. */
export function HighlightedText({
  text,
  highlight,
  render,
}: {
  text: string;
  highlight?: string;
  render: (part: string) => React.ReactNode;
}) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      {render(highlight)}
      {text.slice(at + highlight.length)}
    </>
  );
}
