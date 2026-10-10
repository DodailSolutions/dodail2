"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CMSPage, PageStatus } from "@/lib/cms/types";
import { FileText, Plus, Search, Filter, ExternalLink, Calendar, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CMSPagesListPage() {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // New page form state
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms/pages");
      const data = await res.json();
      if (data.success) {
        setPages(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newTitle.trim() || !newSlug.trim()) {
      setError("Please fill out both title and slug.");
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/cms/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          slug: newSlug,
          template: "default",
          author_email: "admin@dodail.com",
          status: "draft",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewTitle("");
        setNewSlug("");
        fetchPages();
      } else {
        setError(data.error || "Failed to create page");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setCreating(false);
    }
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(search.toLowerCase()) ||
      page.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#FA5B0F]" />
            <span>Pages & Layout Manager</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Build, edit and publish structured pages with validated typed section blocks.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-sm transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Page</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pages by title or slug..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#FA5B0F]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#FA5B0F]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="review">Review</option>
            <option value="archived">Archived</option>
          </select>

          <button
            onClick={fetchPages}
            title="Refresh"
            className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Page Title & Slug</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Sections</th>
                <th className="px-6 py-3.5">Publish Date</th>
                <th className="px-6 py-3.5">Last Updated</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#FA5B0F]" />
                    <span>Loading CMS pages...</span>
                  </td>
                </tr>
              ) : filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No pages matching your filter.
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{page.title}</div>
                      <div className="text-xs font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                        <span>/{page.slug}</span>
                        {page.status === "published" && (
                          <Link
                            href={page.slug === "home" ? "/" : `/${page.slug}`}
                            target="_blank"
                            className="text-[#FA5B0F] hover:text-[#FA5B0F]/80 ml-1 inline-flex items-center"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono capitalize border ${
                          page.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : page.status === "scheduled"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : page.status === "review"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            page.status === "published"
                              ? "bg-emerald-400"
                              : page.status === "scheduled"
                              ? "bg-blue-400"
                              : "bg-amber-400"
                          }`}
                        />
                        {page.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-300 font-mono text-xs">
                      {page.sections.length} blocks
                    </td>

                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {page.publish_date ? new Date(page.publish_date).toLocaleDateString() : "—"}
                    </td>

                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(page.updated_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/cms/pages/${page.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FA5B0F]/10 hover:bg-[#FA5B0F]/20 text-[#FA5B0F] border border-[#FA5B0F]/30 text-xs font-medium transition"
                      >
                        <span>Open Builder</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Page Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">Create New Page</h2>
            <p className="text-xs text-slate-400 mb-4">
              Specify page title and URL slug. Initialized with default draft status.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (!newSlug || newSlug === newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
                      setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                    }
                  }}
                  placeholder="e.g. AI Customer Onboarding"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#FA5B0F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  URL Slug
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-950 border border-r-0 border-slate-800 rounded-l-lg text-xs font-mono text-slate-400">
                    dodail.com/
                  </span>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="ai-customer-onboarding"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-r-lg text-sm text-white font-mono focus:outline-none focus:border-[#FA5B0F]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white text-xs font-medium transition disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
