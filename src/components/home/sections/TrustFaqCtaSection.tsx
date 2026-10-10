import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, KeyRound, Layers, ListChecks, Plug, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroParticlesSVG } from "@/components/3d/CanvasFallback";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { Eyebrow, Zone, ghostBtn, primaryBtn, sectionPad } from "../homeUi";
import { services, trust } from "../homeData";

const trustIcons = {
  team: { Icon: Layers, color: "#FF6B2C" },
  ownership: { Icon: KeyRound, color: "#27D3C2" },
  people: { Icon: UserCheck, color: "#FFB547" },
  data: { Icon: ShieldCheck, color: "#27D3C2" },
  tools: { Icon: Plug, color: "#FF6B2C" },
  process: { Icon: ListChecks, color: "#8B7CFF" },
} as const;

export function TrustSection() {
  return (
    <section id="why-dodail" aria-labelledby="why-title" className={`relative bg-[#0B0E13] ${sectionPad}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>Why Dodail</Eyebrow>
            <h2 id="why-title" className="section-title-clamp mt-4 text-[#F5F8FC]">
              Why growing businesses choose Dodail
            </h2>
          </div>
          <p className="lg:col-span-5 text-lg leading-relaxed text-[#A3AAB5]">
            Six commitments behind every automation, application and website we deliver, from the first call to long
            after launch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trust.map((t, idx) => {
            const { Icon, color } = trustIcons[t.icon];
            const featured = "featured" in t && t.featured;
            return (
              <article
                key={t.title}
                className={`group relative flex flex-col rounded-3xl border border-white/[0.07] bg-[#12161D]/70 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#12161D] ${
                  // featured: 2x2 on desktop, so six commitments fill a 3x3 grid exactly;
                  // the last card spans the row on tablets to avoid a lone cell
                  featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : idx === trust.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: `${color}1A`, color, boxShadow: `inset 0 0 0 1px ${color}33` }}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className={`mt-6 font-normal tracking-tight text-[#F5F8FC] ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
                  {t.title}
                </h3>
                <p className={`mt-3 leading-relaxed text-[#A3AAB5] ${featured ? "max-w-2xl text-base sm:text-lg" : "text-[15px]"}`}>
                  {t.desc}
                </p>
                {featured && (
                  <ul className="mt-6 lg:mt-auto lg:pt-8 flex flex-wrap gap-2" aria-label="Services delivered by one team">
                    {services.map((sv) => (
                      <li key={sv.id}>
                        <Link
                          href={sv.href}
                          className="inline-block rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-[#C9CED6] transition-colors hover:border-[#FF6B2C] hover:text-[#F5F8FC]"
                        >
                          {sv.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                />
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium">
          <Link href="/about" className="inline-flex items-center gap-2 text-[#FF6B2C] hover:text-[#ff8a57]">
            More about our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/work" className="inline-flex items-center gap-2 text-[#F5F8FC] hover:text-[#FF6B2C]">
            See our work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`relative bg-[#05070B] ${sectionPad}`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <Eyebrow tone="cyan">Questions</Eyebrow>
          <h2 id="faq-title" className="section-title-clamp mt-4 text-[#F5F8FC]">Frequently asked questions about Dodail</h2>
        </div>
        <FAQAccordion />
      </div>
    </section>
  );
}

export function CtaSection({ webgl }: { webgl: boolean }) {
  return (
    <section id="contact" aria-labelledby="cta-title" className="relative overflow-hidden px-5 sm:px-8 lg:px-12 py-28 sm:py-40">
      {/* The whole section is the scene zone: nodes converge behind the call to action */}
      <Zone phase="cta" className="!absolute inset-0">
        <HeroParticlesSVG
          className={`absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 ${
            webgl ? "" : "!opacity-40"
          }`}
        />
      </Zone>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(5,7,11,0.72), rgba(5,7,11,0.25) 65%, transparent)" }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Eyebrow>Next step</Eyebrow>
        <h2 id="cta-title" className="section-title-clamp mt-4 text-[#F5F8FC]">Ready to connect your operations?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#C9CED6]">
          Book a consultation with a Dodail engineer. We will look at where manual work is slowing you down, tell you
          honestly what can be automated, and outline how we would build it.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button href="/consultation" variant="primary" size="lg" className={primaryBtn}>
            <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
            Book a Consultation
          </Button>
          <Button href="/contact" variant="outline" size="lg" className={`${ghostBtn} bg-[#05070B]/60`}>
            Send a message
          </Button>
        </div>

        <p className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#1C222B] pt-8 text-base text-[#A3AAB5]">
          <span className="font-semibold text-[#F5F8FC]">Dodail Solutions Private Limited</span>
          <span>Hyderabad, Telangana, India</span>
          <a href="tel:+919966400235" className="underline underline-offset-4 hover:text-[#FF6B2C]">
            +91 99664 00235
          </a>
          <a href="mailto:info@dodail.com" className="underline underline-offset-4 hover:text-[#FF6B2C]">
            info@dodail.com
          </a>
        </p>
      </div>
    </section>
  );
}
