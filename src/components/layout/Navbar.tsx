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

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const pathname = usePathname();

  // Close menus on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1B3652] bg-[#0A1B2A]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5B0F] rounded-lg p-1">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-[#0E2235] p-1 border border-[#1B3652] group-hover:border-[#FA5B0F]/50 transition-colors">
            <Image
              src="/brand/dodail-emblem.png"
              alt="Dodail Solutions Emblem"
              fill
              sizes="44px"
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Dodail
              <span className="text-[#FA5B0F] text-xs font-semibold px-1.5 py-0.5 rounded bg-[#FA5B0F]/10 border border-[#FA5B0F]/20">
                2.0
              </span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
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
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#0E2235] transition-colors focus-visible:ring-2 focus-visible:ring-[#FA5B0F]",
                solutionsOpen && "bg-[#0E2235] text-white"
              )}
              aria-expanded={solutionsOpen}
            >
              <span>Solutions</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", solutionsOpen && "rotate-180")} />
            </button>

            {solutionsOpen && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50">
                <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235] p-3 shadow-2xl shadow-black/80">
                  <div className="space-y-1">
                    {solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-[#142C44] transition-colors group"
                      >
                        <div className="rounded-lg bg-[#142C44] p-2 text-[#FA5B0F] group-hover:bg-[#FA5B0F] group-hover:text-white transition-colors">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100 group-hover:text-white text-sm">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-400 leading-snug">
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
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#0E2235] transition-colors focus-visible:ring-2 focus-visible:ring-[#FA5B0F]",
                servicesOpen && "bg-[#0E2235] text-white"
              )}
              aria-expanded={servicesOpen}
            >
              <span>Services</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50">
                <div className="rounded-2xl border border-[#1B3652] bg-[#0E2235] p-3 shadow-2xl shadow-black/80">
                  <div className="space-y-1">
                    {services.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-[#142C44] transition-colors group"
                      >
                        <div className="rounded-lg bg-[#142C44] p-2 text-[#FA5B0F] group-hover:bg-[#FA5B0F] group-hover:text-white transition-colors">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100 group-hover:text-white text-sm">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-400 leading-snug">
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
            className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#0E2235] transition-colors"
          >
            Industries
          </Link>

          {/* Work */}
          <Link
            href="/work"
            className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#0E2235] transition-colors"
          >
            Work & Results
          </Link>

          {/* Blog / Resources */}
          <Link
            href="/blog"
            className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#0E2235] transition-colors"
          >
            Resources
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#0E2235] transition-colors"
          >
            About
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#0E2235] transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA & Consultation */}
        <div className="hidden lg:flex items-center gap-3">
          <Button href="/consultation" variant="primary" size="md">
            <Calendar className="h-4 w-4 mr-1.5" />
            Book AI Consultation
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-[#0E2235] border border-[#1B3652] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5B0F]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#1B3652] bg-[#0A1B2A] px-4 pt-2 pb-8 max-h-[85vh] overflow-y-auto">
          <div className="space-y-4 pt-2">
            <div>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FA5B0F]">
                AI Solutions
              </p>
              <div className="mt-1 space-y-1">
                {solutions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-[#0E2235] hover:text-white"
                  >
                    <item.icon className="h-4 w-4 text-[#FA5B0F]" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FA5B0F]">
                Core Services
              </p>
              <div className="mt-1 space-y-1">
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-[#0E2235] hover:text-white"
                  >
                    <item.icon className="h-4 w-4 text-[#FA5B0F]" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key Industries
              </p>
              <div className="mt-1 space-y-1">
                {industries.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-[#0E2235] hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1B3652] pt-4 space-y-1">
              <Link
                href="/work"
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-[#0E2235]"
              >
                Work & Case Studies
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-[#0E2235]"
              >
                Resources & Blog
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-[#0E2235]"
              >
                About Dodail
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-[#0E2235]"
              >
                Contact & Support
              </Link>
            </div>

            <div className="pt-2">
              <Button href="/consultation" variant="primary" size="lg" className="w-full">
                <Calendar className="h-5 w-5 mr-2" />
                Book AI Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
