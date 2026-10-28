import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "./Section";
import { BOOKING_URL, confirmed } from "@/content/site";
import type { Plan } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Plan cards (brief §5.4): "Ideal for", 5–7 features and a CTA. A price shows only once
 * confirmed; until then the card says "Custom quote" so no number is ever invented.
 */
export function PlansGrid({ plans, note, title = "Plans and pricing" }: { plans: Plan[]; note?: string; title?: string }) {
  if (plans.length === 0) return null;
  const footnote = confirmed(note);
  return (
    <Section id="plans" title={title} tone="tint">
      <div className={cn("grid gap-6", plans.length === 2 ? "md:grid-cols-2" : plans.length >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3")}>
        {plans.map((plan) => {
          const price = confirmed(plan.price);
          const cta = plan.cta ?? { label: "Get a Quote", href: BOOKING_URL };
          return (
            <article
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-surface p-7 shadow-sm",
                plan.recommended ? "border-[#FF6B2C] ring-1 ring-[#FF6B2C]" : "border-border-token"
              )}
            >
              {plan.recommended && (
                <p className="absolute -top-3 left-6 rounded-full bg-[#FF6B2C] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                  Recommended
                </p>
              )}
              <h3 className="text-xl font-bold text-fg">{plan.name}</h3>
              <p className="mt-1 text-sm text-fg-muted">Ideal for {plan.idealFor.replace(/^ideal for\s+/i, "")}</p>
              <p className="mt-5 text-fg">
                {price ? (
                  <>
                    <span className="text-xs font-medium text-fg-muted">Starting from </span>
                    <span className="text-3xl font-extrabold">{price}</span>
                    {plan.period && <span className="text-sm font-medium text-fg-muted"> {plan.period}</span>}
                  </>
                ) : (
                  <span className="text-xl font-bold">Custom quote</span>
                )}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-fg">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                href={cta.href}
                isExternal={/^https?:/.test(cta.href)}
                variant={plan.recommended ? "primary" : "outline"}
                size="md"
                className="mt-7 w-full"
              >
                {cta.label}
              </Button>
            </article>
          );
        })}
      </div>
      {footnote && <p className="mt-6 text-sm text-fg-muted">{footnote}</p>}
    </Section>
  );
}
