import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { fill, telHref } from "@/lib/utils";
import type { CompanyContent, FooterContent } from "@/lib/cms/content/defaults/site";

const SOCIAL_ICONS: Record<keyof CompanyContent["social"], { label: string; path: string }> = {
  linkedin: {
    label: "LinkedIn",
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.66-1.63 1.63 1.63 0 0 0-3.3 0 1.64 1.64 0 0 0 1.64 1.63m1.39 9.74v-8.37H5.07v8.37h2.78Z",
  },
  x: {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  facebook: {
    label: "Facebook",
    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z",
  },
  instagram: {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  youtube: {
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
};

/** Site footer. Columns, blurb and legal lines are managed in the admin CMS ("Footer" and "Company details"). */
export function Footer({ footer, company }: { footer: FooterContent; company: CompanyContent }) {
  const currentYear = new Date().getFullYear();
  const socials = (Object.keys(SOCIAL_ICONS) as Array<keyof CompanyContent["social"]>).filter((k) => company.social[k]);

  return (
    <footer className="border-t border-white/[0.08] bg-[#05070B] text-[#AABAC8]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div
                style={{ width: "40px", height: "40px", minWidth: "40px", minHeight: "40px" }}
                className="relative h-10 w-10 overflow-hidden rounded-none shadow-sm shrink-0"
              >
                <Image src="/brand/dodail-logo.png" alt={company.name} fill sizes="40px" className="object-contain" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">{company.shortName}</span>
                <p className="text-xs text-[#AABAC8]">{footer.brandSubline}</p>
              </div>
            </Link>

            <p className="text-sm text-[#AABAC8] leading-relaxed max-w-sm">{footer.about}</p>

            <div className="space-y-2 text-sm text-[#AABAC8]">
              {footer.locationLine && (
                <div className="flex items-center gap-2.5">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-[#FF6B2C] shrink-0" />
                  <span>{footer.locationLine}</span>
                </div>
              )}
              {company.email && (
                <div className="flex items-center gap-2.5">
                  <Mail aria-hidden="true" className="h-4 w-4 text-[#FF6B2C] shrink-0" />
                  <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                    {company.email}
                  </a>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone aria-hidden="true" className="h-4 w-4 text-[#FF6B2C] shrink-0" />
                  <a href={telHref(company.phone)} className="hover:text-white transition-colors">
                    {company.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Social Links */}
            {socials.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socials.map((key) => (
                  <a
                    key={key}
                    href={company.social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-none bg-[#0C2233] text-[#AABAC8] hover:text-white hover:bg-[#10293B] transition-colors"
                    aria-label={`${company.shortName} on ${SOCIAL_ICONS[key].label}`}
                  >
                    <svg aria-hidden="true" width="16" height="16" className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d={SOCIAL_ICONS[key].path} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {footer.columns.map((col, ci) => (
            <div key={`${col.title}-${ci}`} className="space-y-3">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l, li) => (
                  <li key={`${l.href}-${li}`}>
                    <Link
                      href={l.href || "/"}
                      className={l.highlight ? "text-[#FF6B2C] hover:underline font-medium" : "hover:text-white transition-colors"}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AABAC8]">
          <p>{fill(footer.copyright, { year: String(currentYear) })}</p>
          {footer.trustLine && (
            <div className="flex items-center gap-2 text-[#AABAC8]">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-400" />
              <span>{footer.trustLine}</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
