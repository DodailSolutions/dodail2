import { Calendar, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { BOOKING_URL, WHATSAPP_URL, confirmed, site } from "@/content/site";

export interface PageHeroProps {
  h1: string;
  subheading: string;
  /** Registry path for breadcrumbs. Omit on Home. */
  path?: string;
  /** Appended after the registry trail for pages outside the registry (projects, posts). */
  breadcrumbExtra?: Array<{ name: string; path: string }>;
  eyebrow?: string;
  chips?: string[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Hide CTAs (legal pages). */
  noCtas?: boolean;
  align?: "center" | "left";
}

/** Trust chips under the hero: Since 2019 · clients served · Startup India recognised (hidden until confirmed). */
export function trustChips(): string[] {
  const clients = confirmed(site.clientCount);
  return [site.foundedLabel, ...(clients ? [clients] : []), "Startup India recognised"];
}

/** Every hero is Headline + Subheading, then a primary CTA and a secondary CTA (brief §1.2). */
export function PageHero({ h1, subheading, path, breadcrumbExtra, eyebrow, chips, primary, secondary, noCtas, align = "center" }: PageHeroProps) {
  const center = align === "center";
  const p = primary ?? { label: "Book a Free Strategy Call", href: BOOKING_URL };
  const s = secondary ?? { label: "Chat on WhatsApp", href: WHATSAPP_URL };
  const external = (href: string) => /^https?:/.test(href);

  return (
    <header className="mx-auto w-full max-w-7xl px-4 pt-8 pb-12 sm:px-6 sm:pt-10 lg:px-8">
      {path && <Breadcrumbs path={path} extra={breadcrumbExtra} tone="light" className="mb-8" />}
      <div className={center ? "mx-auto max-w-4xl text-center" : "max-w-3xl"}>
        {eyebrow && <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">{eyebrow}</p>}
        <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-5xl">{h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-fg-muted sm:text-xl">{subheading}</p>
        {!noCtas && (
          <div className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
            <Button href={p.href} isExternal={external(p.href)} variant="primary" size="lg">
              <Calendar aria-hidden="true" className="mr-2 h-5 w-5" />
              {p.label}
            </Button>
            <Button href={s.href} isExternal={external(s.href)} variant="outline" size="lg">
              {s.href === WHATSAPP_URL && <MessageCircle aria-hidden="true" className="mr-2 h-5 w-5" />}
              {s.label}
            </Button>
          </div>
        )}
        {chips && chips.length > 0 && (
          <ul className={`mt-8 flex flex-wrap gap-2 ${center ? "justify-center" : ""}`}>
            {chips.map((c) => (
              <li key={c} className="rounded-full border border-border-token bg-surface px-3.5 py-1.5 text-sm font-medium text-fg-muted shadow-xs">
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
