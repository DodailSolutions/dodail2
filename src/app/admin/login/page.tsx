import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Users, Globe2 } from "lucide-react";
import { getAdminSession } from "@/lib/auth/server";
import { adminCredentials, usingDevCredentials } from "@/lib/auth/session";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: { absolute: "Sign in · Dodail Studio" },
  robots: { index: false, follow: false },
};

/** Only same-site paths are accepted as a post-login destination. */
function safeNext(next: string | string[] | undefined) {
  const value = Array.isArray(next) ? next[0] : next;
  return value && value.startsWith("/admin") && !value.startsWith("//") ? value : "/admin";
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const next = safeNext((await searchParams).next);
  if (await getAdminSession()) redirect(next);

  const configured = adminCredentials() !== null;

  return (
    <div className="relative min-h-dvh bg-[#061019] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#FA5B0F]/30 selection:text-white">
      {/* Background Ambient Orbs and Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#FA5B0F]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#27D3C2]/10 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-slate-800 transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to public website</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-400 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] text-slate-300">Studio Core · Operational</span>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand & Value Narrative (Visible on LG) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-center space-y-8 pr-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FA5B0F] text-xs font-semibold uppercase tracking-wider w-fit">
              <Zap className="w-3.5 h-3.5" />
              <span>Dodail Studio v2.0</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-xl shadow-black/40 flex items-center justify-center p-2">
                  <Image
                    src="/brand/dodail-logo.png"
                    alt="Dodail Solutions"
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-white">
                    Dodail Studio
                  </h1>
                  <p className="text-sm text-slate-400 font-medium">
                    Mission Control for Digital Growth & Systems
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                Unified workspace for managing high-converting content, real-time sales pipelines,
                consultation calendars, and AI-powered operational automations.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
              <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#FA5B0F] font-semibold text-xs tracking-wide">
                  <Globe2 className="w-4 h-4" />
                  <span>Real-Time CMS</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Update live copy, menus, and SEO instantly without deploying code.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wide">
                  <Users className="w-4 h-4" />
                  <span>CRM & Bookings</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Track qualified leads, schedule consultations, and sync pipeline stages.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wide">
                  <Zap className="w-4 h-4" />
                  <span>AI Workflows</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generate SEO content outlines and automate client inquiry responses.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs tracking-wide">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Zero-Trust Security</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cryptographic HTTP-only sessions with granular rate limiting.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Next.js 16 Production Ready</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Supabase Cloud Sync</span>
              </span>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div className="w-full lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Mobile Header (Hidden on LG) */}
              <div className="lg:hidden flex flex-col items-center text-center mb-6">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-xl mb-3 flex items-center justify-center p-2">
                  <Image
                    src="/brand/dodail-logo.png"
                    alt="Dodail Solutions"
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                    priority
                  />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Dodail Studio</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Sign in to manage your website, leads, and content.
                </p>
              </div>

              {/* Login Card */}
              <div className="relative rounded-3xl border border-slate-800/90 bg-[#0A1B2A]/90 p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl">
                <div className="hidden lg:block mb-6">
                  <h2 className="text-xl font-bold tracking-tight text-white">Sign in to console</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your administrative credentials to continue.
                  </p>
                </div>

                {configured ? (
                  <LoginForm
                    next={next}
                    devHint={usingDevCredentials() ? "dodail-dev" : undefined}
                  />
                ) : (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-300 space-y-2">
                    <p className="font-semibold text-amber-200">Admin login is not configured.</p>
                    <p className="leading-relaxed">
                      Please configure <code className="font-mono text-amber-200 bg-amber-950/60 px-1 py-0.5 rounded">ADMIN_EMAIL</code>,{" "}
                      <code className="font-mono text-amber-200 bg-amber-950/60 px-1 py-0.5 rounded">ADMIN_PASSWORD</code> and{" "}
                      <code className="font-mono text-amber-200 bg-amber-950/60 px-1 py-0.5 rounded">ADMIN_SESSION_SECRET</code> in your environment variables.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 text-center space-y-1">
                <p className="text-xs text-slate-500">
                  Dodail Solutions Private Limited · Hyderabad, India
                </p>
                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
                  <Link href="/privacy" className="hover:text-slate-300 hover:underline">
                    Privacy Policy
                  </Link>
                  <span>·</span>
                  <Link href="/terms" className="hover:text-slate-300 hover:underline">
                    Terms of Service
                  </Link>
                  <span>·</span>
                  <Link href="/contact" className="hover:text-slate-300 hover:underline">
                    Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 w-full text-center py-4 text-[11px] text-slate-400">
        Dodail Studio &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
}
