import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { Section } from "./Section";
import { getRoute } from "@/content/routes";
import type { ProseSection, TitledText } from "@/content/types";

/** "Who this is for" — 3–4 short audience cards. */
export function AudienceCards({ items, title = "Who this is for" }: { items: TitledText[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <Section id="who-for" title={title}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((a) => (
          <Card key={a.title} hoverEffect={false}>
            <CardTitle className="text-lg">{a.title}</CardTitle>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{a.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/** Numbered process steps (Dodail's 5D by default). */
export function ProcessSteps({ steps, title = "How we work", intro }: { steps: TitledText[]; title?: string; intro?: string }) {
  return (
    <Section id="process" title={title} intro={intro} tone="tint">
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-border-token bg-surface p-5 shadow-xs">
            <span className="font-mono text-xs font-bold text-orange-700">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 text-lg font-bold text-fg">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** "Why Dodail" — 4–5 differentiators with proof. */
export function WhyDodail({ items, title = "Why Dodail" }: { items: TitledText[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <Section id="why-dodail" title={title}>
      <dl className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        {items.map((w) => (
          <div key={w.title} className="border-l-2 border-[#FA5B0F] pl-5">
            <dt className="text-lg font-bold text-fg">{w.title}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{w.text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/** Tools and tech stack as a plain list of names (no logos until clean SVGs are sourced). */
export function TechStack({ items, title = "Tools and tech we use" }: { items: string[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <Section id="tech" title={title} tone="tint">
      <ul className="flex flex-wrap gap-2.5">
        {items.map((t) => (
          <li key={t} className="rounded-xl border border-border-token bg-surface px-4 py-2 text-sm font-semibold text-fg shadow-xs">
            {t}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Tick-list used for "What's included" and "How we measure success". */
export function Checklist({ items, title, id, intro }: { items: string[]; title: string; id: string; intro?: string }) {
  if (items.length === 0) return null;
  return (
    <Section id={id} title={title} intro={intro}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 rounded-xl border border-border-token bg-surface p-4 text-sm leading-relaxed text-fg">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Long-form prose sections: the unique angle each page must cover. */
export function ProseSections({ sections }: { sections: ProseSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <Section key={s.heading} id={`topic-${i + 1}`} narrow>
          <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">{s.heading}</h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-fg">
            {s.paragraphs.map((p, pi) => (
              <p key={pi}>{p}</p>
            ))}
          </div>
          {s.bullets && s.bullets.length > 0 && (
            <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-fg">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}
    </>
  );
}

/** Intro paragraphs placed under the hero. */
export function IntroProse({ paragraphs }: { paragraphs: string[] }) {
  if (paragraphs.length === 0) return null;
  return (
    <Section narrow className="!pt-0">
      <div className="space-y-4 text-base leading-relaxed text-fg sm:text-lg">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}

/** Cards that link to registry pages (sub-services, siblings, industries). Only built pages are linked. */
export function LinkCards({
  items,
  title,
  intro,
  id,
}: {
  items: Array<{ path: string; pitch?: string }>;
  title: string;
  intro?: string;
  id: string;
}) {
  const cards = items
    .map((it) => ({ ...it, route: getRoute(it.path) }))
    .filter((c): c is typeof c & { route: NonNullable<typeof c.route> } => Boolean(c.route?.built));
  if (cards.length === 0) return null;
  return (
    <Section id={id} title={title} intro={intro}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ route, pitch }) => (
          <li key={route.path}>
            <Link
              href={route.path}
              className="group flex h-full flex-col rounded-2xl border border-border-token bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#FA5B0F] hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-fg group-hover:text-orange-700">{route.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{pitch ?? route.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700">
                Read more <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
