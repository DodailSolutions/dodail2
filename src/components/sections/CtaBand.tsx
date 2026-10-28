import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BOOKING_URL, WHATSAPP_URL } from "@/content/site";

interface CtaBandProps {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
}

/** Closing call to action: book a call, or message on WhatsApp. */
export function CtaBand({
  title = "Tell us what you want to grow",
  text = "A 15-minute call is enough to tell you whether we can help, what we would do first and roughly what it costs. No pitch deck.",
  primary = { label: "Book a Free Strategy Call", href: BOOKING_URL },
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border-token bg-gradient-to-b from-[var(--bg)] to-orange-50/40 px-6 py-12 text-center sm:px-12">
        <h2 id="cta-heading" className="text-balance text-2xl font-extrabold tracking-tight text-fg sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fg-muted">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primary.href} isExternal={/^https?:/.test(primary.href)} variant="primary" size="lg">
            <Calendar aria-hidden="true" className="mr-2 h-5 w-5" />
            {primary.label}
          </Button>
          <Button href={WHATSAPP_URL} isExternal variant="outline" size="lg">
            <MessageCircle aria-hidden="true" className="mr-2 h-5 w-5" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
