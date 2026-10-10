"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  Mail,
  Lock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function LoginForm({ next, devHint }: { next: string; devHint?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("admin@dodail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [devFilled, setDevFilled] = useState(false);

  function handleDevAutofill() {
    if (!devHint) return;
    setEmail("admin@dodail.com");
    setPassword(devHint);
    setDevFilled(true);
    setError("");
    setTimeout(() => setDevFilled(false), 2500);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setPending(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please check your credentials.");
        setPending(false);
        return;
      }

      router.replace(next);
      router.refresh();
    } catch {
      setError("Network error occurred. Please check your connection and try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5" noValidate>
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs sm:text-sm text-rose-200 animate-fadeIn"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" />
          <div className="flex-1 leading-relaxed">{error}</div>
        </div>
      )}

      {/* Email Input */}
      <div>
        <label
          htmlFor="admin-email"
          className="block text-xs font-medium text-slate-300 mb-1.5"
        >
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#FA5B0F] transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            spellCheck="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@dodail.com"
            disabled={pending}
            className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 pl-10 pr-3.5 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-[#FA5B0F] focus:outline-none focus:ring-2 focus:ring-[#FA5B0F]/20 disabled:opacity-50"
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="admin-password"
            className="block text-xs font-medium text-slate-300"
          >
            Password
          </label>
          {devHint && (
            <button
              type="button"
              onClick={handleDevAutofill}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#FA5B0F] hover:text-[#FA5B0F]/80 transition-colors"
            >
              {devFilled ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Filled dev credentials</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" />
                  <span>Autofill dev key</span>
                </>
              )}
            </button>
          )}
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#FA5B0F] transition-colors">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            autoFocus={Boolean(email && !password)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            disabled={pending}
            className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-[#FA5B0F] focus:outline-none focus:ring-2 focus:ring-[#FA5B0F]/20 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={0}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:text-[#FA5B0F]"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {devHint && !devFilled && (
          <p className="mt-2 text-[11px] text-slate-400 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
            <span className="text-amber-400 font-medium">Local Dev Mode:</span> The default password is{" "}
            <code className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-semibold">{devHint}</code>.
            Click <strong className="text-white cursor-pointer hover:underline" onClick={handleDevAutofill}>Autofill dev key</strong> above to test instantly.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FA5B0F] to-[#FF7A3D] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/40 hover:from-[#e04f0b] hover:to-[#FA5B0F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5B0F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1B2A] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authenticating session…</span>
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            <span>Sign in to Studio</span>
          </>
        )}
      </button>

      {/* Security Reassurance */}
      <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>End-to-end encrypted session with HTTP-only cookies</span>
      </div>
    </form>
  );
}
