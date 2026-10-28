import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** Tinted band for rhythm between sections. */
  tone?: "plain" | "tint";
  narrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Page section with a consistent heading block and vertical rhythm. Renders nothing for empty content. */
export function Section({ id, eyebrow, title, intro, tone = "plain", narrow, children, className }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={cn(tone === "tint" && "border-y border-border-token bg-surface-2", className)}>
      <div className={cn("mx-auto w-full px-4 py-14 sm:px-6 sm:py-16 lg:px-8", narrow ? "max-w-3xl" : "max-w-7xl")}>
        {(title || eyebrow) && (
          <div className="mb-9 max-w-3xl">
            {eyebrow && <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="text-balance text-2xl font-extrabold tracking-tight text-fg sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-3 text-base leading-relaxed text-fg-muted sm:text-lg">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
