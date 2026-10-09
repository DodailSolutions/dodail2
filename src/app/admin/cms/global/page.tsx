"use client";

import React, { useState, useEffect } from "react";
import { Sliders, Save, Plus, Trash2, CheckCircle2, AlertCircle, ShieldAlert, Sparkles } from "lucide-react";
import { GlobalNavigation, GlobalFooter, GlobalTheme } from "@/lib/cms/types";

export default function GlobalSettingsManagerPage() {
  const [navItems, setNavItems] = useState<Array<{ label: string; href: string }>>([]);
  const [announcement, setAnnouncement] = useState({ enabled: true, text: "", link: "" });
  const [theme, setTheme] = useState({
    primaryColor: "#FA5B0F",
    navyColor: "#0A1B2A",
    borderRadius: "rounded-lg",
    fontHeading: "Inter",
    fontBody: "Inter",
  });
  const [footer, setFooter] = useState({
    copyrightText: "© 2026 Dodail Solutions Private Limited. All rights reserved.",
    columns: [] as any[],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cms/global")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setNavItems(res.data.navigation?.items || []);
          setAnnouncement(
            res.data.navigation?.announcement || { enabled: true, text: "", link: "" }
          );
          setTheme(res.data.theme || theme);
          setFooter(res.data.footer || footer);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        navigation: {
          items: navItems,
          announcement,
        },
        theme,
        footer,
      };
      const res = await fetch("/api/cms/global", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to save global settings");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const addNavItem = () => {
    setNavItems([...navItems, { label: "New Link", href: "/solutions" }]);
  };

  const updateNavItem = (index: number, field: "label" | "href", val: string) => {
    const updated = [...navItems];
    updated[index][field] = val;
    setNavItems(updated);
  };

  const removeNavItem = (index: number) => {
    setNavItems(navItems.filter((_, idx) => idx !== index));
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading global site settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-blue-400" />
            <span>Global Navigation & Brand Tokens</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage global header menus, notification announcements, footer copyright, and brand design tokens.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Global Settings"}</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Global site settings saved and propagated successfully.</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Warning on global updates */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-300 leading-relaxed">
          <strong>Notice:</strong> Changes to global navigation and tokens immediately apply across all public website pages.
        </div>
      </div>

      {/* 1. Header Navigation Items */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Header Navigation Links</h2>
            <p className="text-xs text-slate-400">Order and links shown in top public navigation.</p>
          </div>
          <button
            onClick={addNavItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Menu Item</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {navItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateNavItem(idx, "label", e.target.value)}
                placeholder="Link Label"
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
              />
              <input
                type="text"
                value={item.href}
                onChange={(e) => updateNavItem(idx, "href", e.target.value)}
                placeholder="/path"
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white font-mono"
              />
              <button
                onClick={() => removeNavItem(idx)}
                className="p-1.5 text-red-400 hover:text-red-300"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Top Announcement Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Announcement Banner</h2>
            <p className="text-xs text-slate-400">Top notification bar for alerts and consultations.</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={announcement.enabled}
              onChange={(e) => setAnnouncement({ ...announcement, enabled: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-[#FA5B0F]"
            />
            <span className="text-xs font-medium text-slate-300">Enabled</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Banner Text</label>
            <input
              type="text"
              value={announcement.text}
              onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Banner Link</label>
            <input
              type="text"
              value={announcement.link}
              onChange={(e) => setAnnouncement({ ...announcement, link: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. Brand Design Tokens */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Brand Tokens & Typography</h2>
          <p className="text-xs text-slate-400">
            Brand colors measured from official assets. Constrained to approved design tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Primary Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                className="w-9 h-9 rounded border border-slate-700 cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={theme.primaryColor}
                readOnly
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
              />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Dodail measured orange: #FA5B0F</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Deep Navy Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.navyColor}
                onChange={(e) => setTheme({ ...theme, navyColor: e.target.value })}
                className="w-9 h-9 rounded border border-slate-700 cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={theme.navyColor}
                readOnly
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
              />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Dodail measured navy: #0A1B2A</span>
          </div>
        </div>
      </div>

      {/* 4. Footer Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Footer Legal & Identity</h2>
          <p className="text-xs text-slate-400">Manage copyright statement and registered entity name.</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Copyright Line</label>
          <input
            type="text"
            value={footer.copyrightText}
            onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
          />
        </div>
      </div>
    </div>
  );
}
