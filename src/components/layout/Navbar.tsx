"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Bot,
  Users,
  Headphones,
  Cpu,
  Code2,
  TrendingUp,
  Building2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const solutions = [
  {
    title: "AI Automation Platform",
    description: "End-to-end autonomous business workflows & agents",
    href: "/solutions/ai-automation",
    icon: Bot,
  },
  {
    title: "AI Lead Management",
    description: "Instant qualification, enrichment & CRM synchronization",
    href: "/solutions/ai-lead-management",
    icon: Users,
  },
  {
    title: "AI Customer Support",
    description: "24/7 intelligent ticketing, resolution & escalation",
    href: "/solutions/ai-customer-support",
    icon: Headphones,
  },
  {
    title: "Workflow Automation",
    description: "API connectors, Zapier replacements & custom DAG pipelines",
    href: "/solutions/workflow-automation",
    icon: Cpu,
  },
];

const services = [
  {
    title: "Web & Software Engineering",
    description: "High-performance Next.js apps, portals & APIs",
    href: "/services/web-development",
    icon: Code2,
  },
  {
    title: "Digital Growth & GEO / SEO",
    description: "Generative Engine Optimization & technical organic search",
    href: "/services/digital-growth-seo",
    icon: TrendingUp,
  },
];

const industries = [
  { title: "Healthcare & Dental Clinics", href: "/industries/dental" },
  { title: "Real Estate & Developers", href: "/industries/real-estate" },
  { title: "E-Commerce & Retail Brands", href: "/industries/ecommerce" },
];

export function Navbar({ announcement }: { announcement?: { enabled: boolean; text: string; link?: string } }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const pathname = usePathname();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  // The homepage is dark navy; every other route keeps the light header.
  const dark = pathname === "/";
  const navLink = cn(
    "px-3.5 py-2 rounded-xl transition-colors",
    dark ? "text-[#C9CED6] hover:text-white hover:bg-white/10" : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
  );

  // Close menus on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return;
    
    const focusableElements = mobileMenuRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md",
        dark ? "border-white/[0.06] bg-[#05070B]/70" : "border-slate-200/80 bg-white/90 shadow-xs"
      )}
    >
      {announcement?.enabled && announcement.text && (
        <div className="bg-[#FF6B2C] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <span>{announcement.text}</span>
          {announcement.link && (
            <Link href={announcement.link} className="underline text-white font-semibold hover:opacity-90 ml-1">
              Learn more →
            </Link>
          )}
        </div>
      )}
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C] p-1">
          <div
            style={{ width: "44px", height: "44px", minWidth: "44px", minHeight: "44px" }}
            className="relative h-11 w-11 overflow-hidden rounded-lg shadow-xs group-hover:scale-105 transition-transform shrink-0"
          >
            <Image
              src="/brand/dodail-logo.png"
              alt="Dodail Solutions Pvt Ltd"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className={cn("text-xl font-bold tracking-tight flex items-center gap-1.5 font-sans", dark ? "text-[#F5F8FC]" : "text-slate-900")}>
              Dodail
            </span>
            <span className={cn("text-[10px] font-mono uppercase tracking-[0.16em]", dark ? "text-[#A3AAB5]" : "text-slate-500")}>
              Solutions Pvt Ltd
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium" aria-label="Main Navigation">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSolutionsOpen(false);
            }}
          >
            <button
              type="button"
              className={cn(
                navLink,
                "flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#FF6B2C]",
                solutionsOpen && (dark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-950")
              )}
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              aria-haspopup="true"
              aria-expanded={solutionsOpen}
            >
              <span>Solutions</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform text-slate-500", solutionsOpen && "rotate-180")} />
            </button>

            {solutionsOpen && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xl shadow-slate-900/10">
                  <div className="space-y-1">
                    {solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="rounded-xl bg-orange-50 p-2 text-[#FF6B2C] group-hover:bg-[#FF6B2C] group-hover:text-white transition-colors">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-[#FF6B2C] text-sm transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setServicesOpen(false);
            }}
          >
            <button
              type="button"
              className={cn(
                navLink,
                "flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#FF6B2C]",
                servicesOpen && (dark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-950")
              )}
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              <span>Services</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform text-slate-500", servicesOpen && "rotate-180")} />
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xl shadow-slate-900/10">
                  <div className="space-y-1">
                    {services.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="rounded-xl bg-orange-50 p-2 text-[#FF6B2C] group-hover:bg-[#FF6B2C] group-hover:text-white transition-colors">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-[#FF6B2C] text-sm transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Industries */}
          <Link
            href="/industries"
            className={navLink}
          >
            Industries
          </Link>

          {/* Work */}
          <Link
            href="/work"
            className={navLink}
          >
            Work & Results
          </Link>

          {/* Blog / Resources */}
          <Link
            href="/blog"
            className={navLink}
          >
            Resources
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={navLink}
          >
            About
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={navLink}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA & Consultation */}
        <div className="hidden lg:flex items-center gap-3">
          <Button href="/consultation" variant="primary" size="md" className={cn("rounded-xl shadow-sm font-semibold", dark ? "rounded-full normal-case tracking-normal text-sm text-[#05070B] hover:text-[#05070B]" : "text-white")}>
            <Calendar className="h-4 w-4 mr-1.5" />
            Book a Consultation
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C]",
            dark
              ? "text-[#F5F8FC] hover:bg-white/10 border-[#2C333E]"
              : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 border-slate-200"
          )}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className={cn("lg:hidden border-b px-4 pt-2 pb-8 max-h-[85vh] overflow-y-auto shadow-xl", dark ? "border-white/10 bg-[#0B0E13]" : "border-slate-200 bg-white")}>
          <div className="space-y-4 pt-2">
            <div>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF6B2C]">
                AI Solutions
              </p>
              <div className="mt-1 space-y-1">
                {solutions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:text-[#FF6B2C]", dark ? "text-[#F5F8FC] hover:bg-white/5" : "text-slate-900 hover:bg-slate-50")}
                  >
                    <item.icon className="h-4 w-4 text-[#FF6B2C]" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF6B2C]">
                Core Services
              </p>
              <div className="mt-1 space-y-1">
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:text-[#FF6B2C]", dark ? "text-[#F5F8FC] hover:bg-white/5" : "text-slate-900 hover:bg-slate-50")}
                  >
                    <item.icon className="h-4 w-4 text-[#FF6B2C]" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Key Industries
              </p>
              <div className="mt-1 space-y-1">
                {industries.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("block px-3 py-2 rounded-xl text-sm", dark ? "text-[#A3AAB5] hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950")}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className={cn("border-t pt-4 space-y-1", dark ? "border-white/10" : "border-slate-200")}>
              <Link
                href="/work"
                className={cn("block px-3 py-2.5 rounded-xl text-base font-medium hover:text-[#FF6B2C]", dark ? "text-[#F5F8FC] hover:bg-white/5" : "text-slate-800 hover:bg-slate-50")}
              >
                Work & Case Studies
              </Link>
              <Link
                href="/blog"
                className={cn("block px-3 py-2.5 rounded-xl text-base font-medium hover:text-[#FF6B2C]", dark ? "text-[#F5F8FC] hover:bg-white/5" : "text-slate-800 hover:bg-slate-50")}
              >
                Resources & Blog
              </Link>
              <Link
                href="/about"
                className={cn("block px-3 py-2.5 rounded-xl text-base font-medium hover:text-[#FF6B2C]", dark ? "text-[#F5F8FC] hover:bg-white/5" : "text-slate-800 hover:bg-slate-50")}
              >
                About Dodail
              </Link>
              <Link
                href="/contact"
                className={cn("block px-3 py-2.5 rounded-xl text-base font-medium hover:text-[#FF6B2C]", dark ? "text-[#F5F8FC] hover:bg-white/5" : "text-slate-800 hover:bg-slate-50")}
              >
                Contact & Support
              </Link>
            </div>

            <div className="pt-2">
              <Button href="/consultation" variant="primary" size="lg" className={cn("w-full shadow-sm font-semibold", dark ? "rounded-full normal-case tracking-normal text-[#05070B] hover:text-[#05070B]" : "rounded-xl text-white")}>
                <Calendar className="h-5 w-5 mr-2" />
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
