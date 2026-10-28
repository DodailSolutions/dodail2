import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Dodail" },
  robots: { index: false, follow: true },
};

/** Branded 404 with the routes people actually want (the 410 page in src/proxy.ts mirrors this). */
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B2C]">404</p>
      <h1 className="mt-4 text-3xl font-bold text-fg">We can&apos;t find that page</h1>
      <p className="mt-3 text-fg-muted">The link may be old or mistyped. These will get you back on track.</p>
      <nav aria-label="Helpful links" className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-[#FF6B2C] px-5 font-semibold text-[#071A28]">
          Home
        </Link>
        <Link href="/services/" className="inline-flex min-h-11 items-center rounded-xl border border-border-strong px-5 font-semibold text-fg hover:border-[#FF6B2C]">
          Services
        </Link>
        <Link href="/blog/" className="inline-flex min-h-11 items-center rounded-xl border border-border-strong px-5 font-semibold text-fg hover:border-[#FF6B2C]">
          Blog
        </Link>
        <Link href="/contact/" className="inline-flex min-h-11 items-center rounded-xl border border-border-strong px-5 font-semibold text-fg hover:border-[#FF6B2C]">
          Contact
        </Link>
      </nav>
    </section>
  );
}
