"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export const THEME_STORAGE_KEY = "dodail-theme";

/**
 * Reads the theme the no-flash script (see ThemeScript) already resolved and wrote onto
 * <html data-theme>. We mirror it into React state so the toggle stays in sync; we never
 * compute the first value here, to avoid a hydration mismatch with the pre-paint script.
 */
function readInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(readInitialTheme);

  const applyTheme = React.useCallback((t: Theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t);
    root.style.colorScheme = t;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
    } catch {
      /* storage blocked (private window) — the in-memory state still drives the UI */
    }
  }, []);

  const setTheme = React.useCallback(
    (t: Theme) => {
      setThemeState(t);
      applyTheme(t);
    },
    [applyTheme]
  );

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Re-assert the theme if <html data-theme> is missing. For an unmatched URL the server sends Next's
  // bare error shell and React then swaps in the real root, after the pre-paint script has already
  // run, so the new <html> has no theme and the 404 page would render dark tokens on a light bg.
  React.useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-theme")) return;
    let resolved: Theme = "dark";
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") resolved = stored;
      else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) resolved = "light";
    } catch {
      /* storage blocked: keep the dark default */
    }
    root.setAttribute("data-theme", resolved);
    root.style.colorScheme = resolved;
    setThemeState(resolved);
  }, []);

  // Keep multiple tabs in sync.
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue);
        document.documentElement.setAttribute("data-theme", e.newValue);
        document.documentElement.style.colorScheme = e.newValue;
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = React.useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

/**
 * Runs before first paint (injected in <head>) so the correct theme is on <html> before the
 * body renders — no flash of the wrong theme. Resolves: stored choice → system preference → dark.
 */
export function ThemeScript() {
  const js = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var t=(s==="light"||s==="dark")?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var e=document.documentElement;e.setAttribute("data-theme",t);e.style.colorScheme=t;}catch(_){document.documentElement.setAttribute("data-theme","dark");}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
