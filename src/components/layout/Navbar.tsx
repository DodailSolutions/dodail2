"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";
import { contentIcon } from "@/lib/cms/content/icons";
import type { NavigationContent } from "@/lib/cms/content/defaults/site";

type MenuId = "services" | "industries";

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href);

/**
 * Header navigation. One config ("Header & navigation" in the admin CMS) drives both the
 * desktop mega menu and the phone menu, so the two can never drift apart.
 */
export function Navbar({ nav }: { nav: NavigationContent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<MenuId | null>(null);
  // A click "pins" a menu open (touch and keyboard users); hover alone opens and closes it.
  const [pinned, setPinned] = React.useState(false);
  const pathname = usePathname();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const { announcement, brand, servicesMenu, industriesMenu, links, cta } = nav;
  const ctaExternal = isExternal(cta.href);

  // Header chrome follows the active theme via the `light:` CSS variant (data-theme driven, set
  // pre-paint by ThemeScript). Markup is identical on server and client, so there's no hydration
  // mismatch and no post-paint flash. Dark is the base; `light:` overrides it.
  const navLink =
    "px-3.5 py-2 rounded-xl transition-colors text-[#C9CED6] hover:text-white hover:bg-white/10 light:text-slate-700 light:hover:text-slate-950 light:hover:bg-slate-100";

  // Close menus on route change (state adjusted during render, not in an effect).
  const [menuPath, setMenuPath] = React.useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMobileMenuOpen(false);
    setOpenMenu(null);
    setPinned(false);
  }

  React.useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return;

    const focusable = () =>
      Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>('summary, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? []
      ).filter((el) => el.offsetParent !== null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
      if (e.key !== "Tab") return;
      const els = focusable();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    focusable()[0]?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const trigger = (id: MenuId, label: string) => {
    const open = openMenu === id;
    return (
      <button
        type="button"
        className={cn(
          navLink,
          "flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#FF6B2C]",
          open && "bg-white/10 text-white light:bg-slate-100 light:text-slate-950"
        )}
        onClick={() => {
          const close = open && pinned;
          setOpenMenu(close ? null : id);
          setPinned(!close);
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={`menu-${id}`}
      >
        <span>{label}</span>
        <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform text-slate-500", open && "rotate-180")} />
      </button>
    );
  };

  const closeMenu = () => {
    setOpenMenu(null);
    setPinned(false);
  };
  const menuShell = (id: MenuId) => ({
    onMouseEnter: () => {
      if (!pinned) setOpenMenu(id);
    },
    onMouseLeave: () => {
      if (!pinned) setOpenMenu(null);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    },
    // Closes the menu when focus (or a click) leaves it.
    onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeMenu();
    },
  });

  const panelLink = "block rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#FF6B2C] transition-colors";

  const servicesDropdown = servicesMenu.columns.length > 0 && (
    <div className="static" {...menuShell("services")}>
      {trigger("services", servicesMenu.label)}
      {openMenu === "services" && (
        <div id="menu-services" className="absolute inset-x-0 top-full z-50 px-4 pt-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/10">
            <div className="grid grid-cols-5 gap-6">
              {servicesMenu.columns.map((col, ci) => {
                const Icon = contentIcon(col.icon);
                return (
                  <div key={`${col.title}-${ci}`}>
                    <Link href={col.href} className="group mb-2 flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50">
                      <span className="rounded-lg bg-orange-50 p-1.5 text-[#FF6B2C] group-hover:bg-[#FF6B2C] group-hover:text-white transition-colors">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-[#FF6B2C]">{col.title}</span>
                    </Link>
                    <ul className="space-y-0.5">
                      {col.items.map((it, ii) => (
                        <li key={`${it.href}-${ii}`}>
                          <Link href={it.href} className={panelLink}>
                            {it.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <Link href={servicesMenu.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B2C] hover:underline">
                {servicesMenu.allLabel} <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const industriesDropdown = industriesMenu.items.length > 0 && (
    <div className="relative" {...menuShell("industries")}>
      {trigger("industries", industriesMenu.label)}
      {openMenu === "industries" && (
        <div id="menu-industries" className="absolute left-0 top-full z-50 w-72 pt-2">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xl shadow-slate-900/10">
            <ul className="space-y-1">
              {industriesMenu.items.map((it, i) => {
                const Icon = contentIcon(it.icon);
                return (
                  <li key={`${it.href}-${i}`}>
                    <Link href={it.href} className="group flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 transition-colors">
                      <span className="rounded-lg bg-orange-50 p-1.5 text-[#FF6B2C] group-hover:bg-[#FF6B2C] group-hover:text-white transition-colors">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-[#FF6B2C]">{it.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href={industriesMenu.href} className="mt-2 flex items-center gap-1.5 px-2 py-1.5 text-sm font-semibold text-[#FF6B2C] hover:underline">
              {industriesMenu.allLabel} <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  const mobileLink =
    "block px-3 py-2.5 rounded-xl text-sm hover:text-[#FF6B2C] text-[#C9CED6] hover:bg-white/5 light:text-slate-700 light:hover:bg-slate-50";
  const mobileSummary =
    "flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 text-base font-semibold [&::-webkit-details-marker]:hidden text-[#F5F8FC] hover:bg-white/5 light:text-slate-900 light:hover:bg-slate-50";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md",
        "border-white/[0.06] bg-[#05070B]/70 light:border-slate-200/80 light:bg-white/90 light:shadow-xs"
      )}
    >
      {announcement.enabled && announcement.text && (
        <div className="bg-[#FF6B2C] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <span>{announcement.text}</span>
          {announcement.link && (
            <Link href={announcement.link} className="underline text-white font-semibold hover:opacity-90 ml-1">
              {announcement.linkLabel || "Learn more →"}
            </Link>
          )}
        </div>
      )}
      <div className="relative">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C] p-1">
            <div
              style={{ width: "44px", height: "44px", minWidth: "44px", minHeight: "44px" }}
              className="relative h-11 w-11 overflow-hidden rounded-lg shadow-xs group-hover:scale-105 transition-transform shrink-0"
            >
              <Image src="/brand/dodail-logo.png" alt={`${brand.name} ${brand.tagline}`.trim()} fill sizes="44px" className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight flex items-center gap-1.5 font-sans text-[#F5F8FC] light:text-slate-900">
                {brand.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#A3AAB5] light:text-slate-500">
                {brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium" aria-label="Main navigation">
            {servicesDropdown}
            {industriesDropdown}
            {links.map((l, i) => (
              <Link key={`${l.href}-${i}`} href={l.href} className={navLink} aria-current={pathname === l.href ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            {cta.label && (
              <Button
                href={cta.href}
                isExternal={ctaExternal}
                variant="primary"
                size="md"
                className={cn(
                  "rounded-xl shadow-sm font-semibold",
                  "rounded-full normal-case tracking-normal text-sm text-white hover:text-white light:rounded-xl light:uppercase light:tracking-wider light:text-xs"
                )}
              >
                <Calendar aria-hidden="true" className="h-4 w-4 mr-1.5" />
                {cta.label}
              </Button>
            )}
          </div>

          {/* Mobile controls: theme toggle + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2.5 rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C]",
                "text-[#F5F8FC] hover:bg-white/10 border-[#2C333E] light:text-slate-700 light:hover:text-slate-950 light:hover:bg-slate-100 light:border-slate-200"
              )}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu — same config as the desktop menus */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={cn(
            "lg:hidden border-b px-4 pt-2 pb-8 max-h-[85vh] overflow-y-auto shadow-xl",
            "border-white/10 bg-[#0B0E13] light:border-slate-200 light:bg-white"
          )}
        >
          <nav aria-label="Mobile navigation" className="space-y-1 pt-2">
            <details className="group">
              <summary className={mobileSummary}>
                {servicesMenu.label}
                <ChevronDown aria-hidden="true" className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-3 pb-2 pl-2">
                {servicesMenu.columns.map((col, ci) => (
                  <div key={`${col.title}-${ci}`}>
                    <Link href={col.href} className="block px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-[#FF6B2C]">
                      {col.title}
                    </Link>
                    {col.items.map((it, ii) => (
                      <Link key={`${it.href}-${ii}`} href={it.href} className={mobileLink}>
                        {it.title}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href={servicesMenu.href} className={cn(mobileLink, "font-semibold text-[#FF6B2C]")}>
                  {servicesMenu.allLabel}
                </Link>
              </div>
            </details>

            <details className="group">
              <summary className={mobileSummary}>
                {industriesMenu.label}
                <ChevronDown aria-hidden="true" className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-2 pl-2">
                {industriesMenu.items.map((it, i) => (
                  <Link key={`${it.href}-${i}`} href={it.href} className={mobileLink}>
                    {it.title}
                  </Link>
                ))}
                <Link href={industriesMenu.href} className={cn(mobileLink, "font-semibold text-[#FF6B2C]")}>
                  {industriesMenu.allLabel}
                </Link>
              </div>
            </details>

            <div className="border-t pt-2 border-white/10 light:border-slate-200">
              {links.map((l, i) => (
                <Link
                  key={`${l.href}-${i}`}
                  href={l.href}
                  className="block px-3 py-2.5 rounded-xl text-base font-semibold hover:text-[#FF6B2C] text-[#F5F8FC] hover:bg-white/5 light:text-slate-900 light:hover:bg-slate-50"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {cta.label && (
              <div className="pt-3">
                <Button
                  href={cta.href}
                  isExternal={ctaExternal}
                  variant="primary"
                  size="lg"
                  className={cn(
                    "w-full shadow-sm font-semibold",
                    "rounded-full normal-case tracking-normal text-white hover:text-white light:rounded-xl light:uppercase light:tracking-wider"
                  )}
                >
                  <Calendar aria-hidden="true" className="h-5 w-5 mr-2" />
                  {cta.label}
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
