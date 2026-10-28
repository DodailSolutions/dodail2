import { Section } from "./Section";

/** Genuine client quote with name and role. Never wrapped in Review/AggregateRating schema (brief §3). */
export function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <Section id="testimonial" narrow>
      <figure className="rounded-2xl border border-border-token bg-surface p-8 shadow-sm">
        <blockquote className="text-lg leading-relaxed text-fg sm:text-xl">“{quote}”</blockquote>
        <figcaption className="mt-5 text-sm text-fg-muted">
          <span className="font-bold text-fg">{name}</span>
          {role ? <span> · {role}</span> : null}
        </figcaption>
      </figure>
    </Section>
  );
}
