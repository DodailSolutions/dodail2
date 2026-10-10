"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import { contentIcon } from "@/lib/cms/content/icons";
import type { NavigationContent } from "@/lib/cms/content/defaults/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const base = href.split(/[?#]/)[0];
  // "/solutions/ai-automation" also lights up for sibling solution pages.
  const section = base.split("/").slice(0, 2).join("/");
  return pathname === base || pathname.startsWith(`${section}/`) || pathname === section;
}

/**
 * Native-app style bottom tab bar for phones and tablets (hidden on desktop).
 * Tabs and the centre button are edited in the CMS under "Header & navigation".
 */
export function MobileTabBar({ nav }: { nav: NavigationContent }) {
  const pathname = usePathname() ?? "/";
  if (!nav.mobileBar.enabled) return null;

  const [first, second, third, fourth] = nav.mobileBar.tabs;
  const ctaActive = isActive(pathname, nav.cta.href);

  const tab = (item: (typeof nav.mobileBar.tabs)[number] | undefined) => {
    if (!item?.label) return <span />;
    const Icon = contentIcon(item.icon);
    const active = isActive(pathname, item.href);
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex flex-col items-center justify-center gap-1 py-2 text-[10.5px] font-medium tracking-wide transition-colors active:scale-95",
          active ? "text-white" : "text-[#8DA2B5]"
        )}
      >
        <Icon className={cn("h-[22px] w-[22px] transition-colors", active ? "text-[#FF6B2C]" : "")} strokeWidth={active ? 2.25 : 1.75} aria-hidden="true" />
        <span className="max-w-full truncate px-1">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Spacer so the fixed bar never covers the end of the footer */}
      <div className="h-[calc(4.5rem+env(safe-area-inset-bottom))] bg-[#05070B] lg:hidden" aria-hidden="true" />
      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#05070B]/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 lg:hidden"
      >
        <div className="mx-auto grid h-16 max-w-2xl grid-cols-5 items-stretch px-1">
          {tab(first)}
          {tab(second)}
          <div className="relative flex items-start justify-center">
            <Link
              href={nav.cta.href}
              aria-label={nav.cta.label}
              aria-current={ctaActive ? "page" : undefined}
              className="absolute -top-5 flex flex-col items-center gap-1 active:scale-95 transition-transform"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#FF6B2C] text-[#05070B] shadow-[0_8px_24px_-6px_rgba(255,107,44,0.65)] ring-4 ring-[#05070B]">
                <Calendar className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className={cn("text-[10.5px] font-semibold tracking-wide", ctaActive ? "text-white" : "text-[#FF6B2C]")}>
                {nav.mobileBar.ctaShortLabel || nav.cta.label}
              </span>
            </Link>
          </div>
          {tab(third)}
          {tab(fourth)}
        </div>
      </nav>
    </>
  );
}
