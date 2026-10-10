"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Image as ImageIcon, Plus, Search, CheckCircle2, AlertCircle, RefreshCw, FileUp } from "lucide-react";
import { MediaAsset } from "@/lib/cms/types";

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    file_name: "",
    file_url: "",
    alt_text: "",
    caption: "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms/media");
      const data = await res.json();
      if (data.success) {
        setAssets(data.data);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.file_name || !newAsset.file_url) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/cms/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAsset,
          file_size: 45000,
          mime_type: newAsset.file_url.endsWith(".svg") ? "image/svg+xml" : "image/png",
          focal_point: { x: 50, y: 50 },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setShowUploadModal(false);
        setNewAsset({ file_name: "", file_url: "", alt_text: "", caption: "" });
        fetchAssets();
      } else {
        setError(data.error || "Failed to register media asset");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredAssets = assets.filter(
    (a) =>
      a.file_name.toLowerCase().includes(search.toLowerCase()) ||
      a.alt_text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-amber-400" />
            <span>Media Assets Library</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize site images, SVGs, logos, and illustrations with verified alt text and focal points.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Media asset saved to library.</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media by filename or alt text..."
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#FA5B0F]"
        />
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#FA5B0F]" />
            <span>Loading media assets...</span>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            No media assets found.
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div className="aspect-video bg-slate-950 flex items-center justify-center p-4 relative border-b border-slate-800">
                <img
                  src={asset.file_url}
                  alt={asset.alt_text}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-4 space-y-1.5">
                <div className="font-medium text-xs text-white truncate" title={asset.file_name}>
                  {asset.file_name}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  Alt: {asset.alt_text || "None"}
                </div>
                <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span>{((asset.file_size || 0) / 1024).toFixed(0)} KB</span>
                  <span>{asset.mime_type || "image/png"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload/Add Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">Add Media Asset</h2>
            <p className="text-xs text-slate-400 mb-4">
              Register asset URL with descriptive accessible alt text.
            </p>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">File Name</label>
                <input
                  type="text"
                  required
                  value={newAsset.file_name}
                  onChange={(e) => setNewAsset({ ...newAsset, file_name: e.target.value })}
                  placeholder="dodail-hero-graphic.png"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">File URL / Path</label>
                <input
                  type="text"
                  required
                  value={newAsset.file_url}
                  onChange={(e) => setNewAsset({ ...newAsset, file_url: e.target.value })}
                  placeholder="/brand/dodail-emblem.png"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Alt Text (Screen readers & SEO)
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.alt_text}
                  onChange={(e) => setNewAsset({ ...newAsset, alt_text: e.target.value })}
                  placeholder="Dodail automation workflow node"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white text-xs font-medium transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Add to Library"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
