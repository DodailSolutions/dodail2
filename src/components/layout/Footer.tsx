import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1B3652] bg-[#071A28] text-[#AABAC8]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div
                style={{ width: "40px", height: "40px", minWidth: "40px", minHeight: "40px" }}
                className="relative h-10 w-10 overflow-hidden rounded-none shadow-sm shrink-0"
              >
                <Image
                  src="/brand/dodail-logo.png"
                  alt="Dodail Solutions Pvt Ltd"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Dodail Solutions
                </span>
                <p className="text-xs text-[#AABAC8]">Private Limited · Est. 2019</p>
              </div>
            </Link>

            <p className="text-sm text-[#AABAC8] leading-relaxed max-w-sm">
              Empowering ambitious businesses across India and international markets with autonomous AI agents, intelligent lead management, and bespoke software systems.
            </p>

            <div className="space-y-2 text-sm text-[#AABAC8]">
              <div className="flex items-center gap-2.5">
                <MapPin aria-hidden="true" className="h-4 w-4 text-[#FF6B2C] shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail aria-hidden="true" className="h-4 w-4 text-[#FF6B2C] shrink-0" />
                <a href="mailto:info@dodail.com" className="hover:text-white transition-colors">
                  info@dodail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone aria-hidden="true" className="h-4 w-4 text-[#FF6B2C] shrink-0" />
                <a href="tel:+919966400235" className="hover:text-white transition-colors">
                  +91 99664 00235
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/dodail/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-none bg-[#0C2233] text-[#AABAC8] hover:text-white hover:bg-[#10293B] transition-colors"
                aria-label="Dodail Solutions on LinkedIn"
              >
                <svg aria-hidden="true" width="16" height="16" className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.66-1.63 1.63 1.63 0 0 0-3.3 0 1.64 1.64 0 0 0 1.64 1.63m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
                </svg>
              </a>
              <a
                href="https://x.com/dodailpvtltd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-none bg-[#0C2233] text-[#AABAC8] hover:text-white hover:bg-[#10293B] transition-colors"
                aria-label="Dodail Solutions on X"
              >
                <svg aria-hidden="true" width="16" height="16" className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/DodailSolutionPvtLtd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-none bg-[#0C2233] text-[#AABAC8] hover:text-white hover:bg-[#10293B] transition-colors"
                aria-label="Dodail Solutions on Facebook"
              >
                <svg aria-hidden="true" width="16" height="16" className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/dodail/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-none bg-[#0C2233] text-[#AABAC8] hover:text-white hover:bg-[#10293B] transition-colors"
                aria-label="Dodail Solutions on Instagram"
              >
                <svg aria-hidden="true" width="16" height="16" className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@dodail"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-none bg-[#0C2233] text-[#AABAC8] hover:text-white hover:bg-[#10293B] transition-colors"
                aria-label="Dodail Solutions on YouTube"
              >
                <svg aria-hidden="true" width="16" height="16" className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: AI Solutions */}
          <div className="space-y-3">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">
              AI Solutions
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/solutions/ai-automation" className="hover:text-white transition-colors">
                  AI Automation Platform
                </Link>
              </li>
              <li>
                <Link href="/solutions/ai-lead-management" className="hover:text-white transition-colors">
                  AI Lead Management
                </Link>
              </li>
              <li>
                <Link href="/solutions/ai-customer-support" className="hover:text-white transition-colors">
                  AI Customer Support
                </Link>
              </li>
              <li>
                <Link href="/solutions/workflow-automation" className="hover:text-white transition-colors">
                  Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-[#FF6B2C] hover:underline font-medium">
                  Book AI Feasibility Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services & Industries */}
          <div className="space-y-3">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">
              Engineering & Growth
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/web-development" className="hover:text-white transition-colors">
                  Web & Software Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/digital-growth-seo" className="hover:text-white transition-colors">
                  Digital Growth & GEO / SEO
                </Link>
              </li>
              <li>
                <Link href="/industries/dental" className="hover:text-white transition-colors">
                  Healthcare & Dental Clinics
                </Link>
              </li>
              <li>
                <Link href="/industries/real-estate" className="hover:text-white transition-colors">
                  Real Estate & Developers
                </Link>
              </li>
              <li>
                <Link href="/industries/ecommerce" className="hover:text-white transition-colors">
                  E-Commerce & DTC Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Company */}
          <div className="space-y-3">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Dodail
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Verified Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Resource Library & Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#1B3652] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AABAC8]">
          <p>
            © {currentYear} Dodail Solutions Private Limited. All rights reserved. Registered in India.
          </p>
          <div className="flex items-center gap-2 text-[#AABAC8]">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-400" />
            <span>Strict data privacy · Zero fabricated claims · ISO / GDPR-aligned architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
