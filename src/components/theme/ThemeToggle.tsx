"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/ThemeProvider";

/**
 * Light/dark switch. Mounted in the navbar (desktop + mobile). Renders a stable, theme-neutral
 * shell on the server and only swaps the icon after mount, so it never mismatches hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";
  // Keep the label theme-neutral until mounted so the server-rendered attributes match the first
  // client render (the resolved theme isn't known on the server).
  const label = !mounted ? "Toggle theme" : isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
        "border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5B0F]",
        className
      )}
    >
      {/* Avoid an icon flash before mount: show the sun (universally legible) until mounted. */}
      {!mounted ? (
        <Sun aria-hidden="true" className="h-5 w-5" />
      ) : isDark ? (
        <Sun aria-hidden="true" className="h-5 w-5" />
      ) : (
        <Moon aria-hidden="true" className="h-5 w-5" />
      )}
    </button>
  );
}
