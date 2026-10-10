"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CMSPage, CMSBlock, PageRevision, PageStatus } from "@/lib/cms/types";
import { DynamicBlockRenderer } from "@/components/cms/DynamicBlockRenderer";
import {
  FileText,
  Save,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
  Eye,
  History,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Calendar,
  Sparkles,
  ChevronLeft,
  Settings,
  Layers,
  Clock,
  ShieldAlert
} from "lucide-react";

export default function PageBuilderEditor() {
  const params = useParams();
  const pageId = params.id as string;
  const router = useRouter();

  const [page, setPage] = useState<CMSPage | null>(null);
  const [revisions, setRevisions] = useState<PageRevision[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active view: 'builder' | 'preview' | 'history' | 'seo'
  const [activeTab, setActiveTab] = useState<"builder" | "preview" | "history" | "seo">("builder");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [newBlockType, setNewBlockType] = useState<string>("rich_text");

  // Load Page Data
  const loadPageData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms/pages/${pageId}`);
      const data = await res.json();
      if (data.success) {
        setPage(data.data.page);
        setRevisions(data.data.revisions || []);
        if (data.data.page.sections.length > 0) {
          setSelectedBlockId(data.data.page.sections[0].id);
        }
      } else {
        setError(data.error || "Failed to load page");
      }
    } catch (e: any) {
      setError(e.message || "Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageId) {
      loadPageData();
    }
  }, [pageId]);

  // Save Page
  const handleSave = async (statusOverride?: PageStatus) => {
    if (!page) return;
    setSaving(true);
    setError(null);
    try {
      const updatePayload = {
        ...page,
        status: statusOverride || page.status,
      };
      const res = await fetch(`/api/cms/pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });
      const data = await res.json();
      if (data.success) {
        setPage(data.data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        // Refresh revisions
        const revRes = await fetch(`/api/cms/pages/${pageId}`);
        const revData = await revRes.json();
        if (revData.success) {
          setRevisions(revData.data.revisions || []);
        }
      } else {
        setError(data.error || "Failed to save page");
      }
    } catch (e: any) {
      setError(e.message || "Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  // Revert Revision
  const handleRevert = async (revisionId: string) => {
    if (!confirm("Are you sure you want to revert to this version? Current unsaved changes will be replaced.")) return;
    try {
      const res = await fetch(`/api/cms/pages/${pageId}/revert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revision_id: revisionId }),
      });
      const data = await res.json();
      if (data.success) {
        setPage(data.data);
        setActiveTab("builder");
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to revert revision");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Block Manipulation Handlers
  const addBlock = (type: string) => {
    if (!page) return;
    const newId = `block-${Date.now()}`;
    let newBlock: CMSBlock;

    switch (type) {
      case "hero":
        newBlock = {
          id: newId,
          type: "hero",
          badge: "New Section Badge",
          headline: "Action-Driven Headline Here",
          subheadline: "Short supporting explanation of the architecture or service.",
          ctaPrimaryLabel: "Book Consultation",
          ctaPrimaryLink: "/consultation",
        };
        break;
      case "rich_text":
        newBlock = {
          id: newId,
          type: "rich_text",
          title: "Structured Information",
          contentHtml: "<p>Write rich paragraph content here. Supports lists, paragraphs, and formatted copy.</p>",
        };
        break;
      case "cards":
        newBlock = {
          id: newId,
          type: "cards",
          badge: "Key Capabilities",
          title: "Core System Capabilities",
          items: [
            { title: "Deterministic Pipelines", description: "Automated event queues that eliminate dropped data." },
            { title: "CRM Sync", description: "Instant synchronization across records and pipelines." },
          ],
        };
        break;
      case "services":
        newBlock = {
          id: newId,
          type: "services",
          badge: "What We Build",
          title: "Engineered Solutions",
          items: [
            { title: "AI Automation Workflows", description: "Multi-agent workflows replacing repetitive operations.", href: "/solutions/ai-automation" },
          ],
        };
        break;
      case "faqs":
        newBlock = {
          id: newId,
          type: "faqs",
          title: "Frequently Asked Questions",
          items: [
            { question: "How long does deployment take?", answer: "Typical workflows deploy within 7 to 14 business days." },
          ],
        };
        break;
      case "cta":
        newBlock = {
          id: newId,
          type: "cta",
          title: "Ready To Automate Your Business?",
          description: "Schedule an architecture discovery session with our engineering team.",
          buttonText: "Book an AI Consultation",
          buttonLink: "/consultation",
        };
        break;
      case "stats":
        newBlock = {
          id: newId,
          type: "stats",
          items: [
            { value: "99.4%", label: "Accuracy" },
            { value: "<60s", label: "Response Time" },
          ],
        };
        break;
      default:
        newBlock = {
          id: newId,
          type: "rich_text",
          title: "Section Title",
          contentHtml: "<p>Default content.</p>",
        };
    }

    const updatedSections = [...page.sections, newBlock];
    setPage({ ...page, sections: updatedSections });
    setSelectedBlockId(newId);
  };

  const removeBlock = (id: string) => {
    if (!page) return;
    const updated = page.sections.filter((s) => s.id !== id);
    setPage({ ...page, sections: updated });
    if (selectedBlockId === id) {
      setSelectedBlockId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (!page) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= page.sections.length) return;
    const newSections = [...page.sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);
    setPage({ ...page, sections: newSections });
  };

  const duplicateBlock = (block: CMSBlock) => {
    if (!page) return;
    const duplicated: CMSBlock = {
      ...block,
      id: `block-${Date.now()}`,
    };
    const index = page.sections.findIndex((s) => s.id === block.id);
    const newSections = [...page.sections];
    newSections.splice(index + 1, 0, duplicated);
    setPage({ ...page, sections: newSections });
    setSelectedBlockId(duplicated.id);
  };

  const updateSelectedBlock = (updatedFields: Partial<CMSBlock>) => {
    if (!page || !selectedBlockId) return;
    const updated = page.sections.map((s) => {
      if (s.id === selectedBlockId) {
        return { ...s, ...updatedFields } as CMSBlock;
      }
      return s;
    });
    setPage({ ...page, sections: updated });
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-[#FA5B0F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading page builder studio...</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-xs text-slate-400 mb-4">{error || "Could not load the requested page."}</p>
        <Link
          href="/admin/cms/pages"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-white"
        >
          Return to Pages List
        </Link>
      </div>
    );
  }

  const selectedBlock = page.sections.find((s) => s.id === selectedBlockId);

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sticky top-18 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/cms/pages"
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition"
            title="Back to Pages"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">{page.title}</h1>
              <span className="text-xs font-mono text-slate-400">/{page.slug}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
              <span
                className={`px-2 py-0.2 rounded text-[10px] font-mono capitalize border ${
                  page.status === "published"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : page.status === "scheduled"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}
              >
                {page.status}
              </span>
              <span>•</span>
              <span>{page.sections.length} typed blocks</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setActiveTab("builder")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === "builder" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1.5" />
              Builder
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === "preview" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1.5" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === "seo" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Settings className="w-3.5 h-3.5 inline mr-1.5" />
              SEO
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === "history" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <History className="w-3.5 h-3.5 inline mr-1.5" />
              Revisions ({revisions.length})
            </button>
          </div>

          {/* Status selector */}
          <select
            value={page.status}
            onChange={(e) => setPage({ ...page, status: e.target.value as PageStatus })}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#FA5B0F]"
          >
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="approved">Approved</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>

          {/* Schedule Date picker if scheduled */}
          {page.status === "scheduled" && (
            <input
              type="datetime-local"
              value={page.publish_date ? new Date(page.publish_date).toISOString().slice(0, 16) : ""}
              onChange={(e) => setPage({ ...page, publish_date: new Date(e.target.value).toISOString() })}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 font-mono"
            />
          )}

          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white text-xs font-medium transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Page saved successfully. Revisions and database records updated.</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* TAB 1: VISUAL BUILDER */}
      {activeTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Blocks Outline & Reordering (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase font-mono tracking-wider text-slate-300">
                Page Sections
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {page.sections.length} Blocks
              </span>
            </div>

            {/* Block list */}
            <div className="space-y-2">
              {page.sections.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No sections yet. Add a block below.
                </div>
              ) : (
                page.sections.map((block, index) => {
                  const isSelected = selectedBlockId === block.id;
                  return (
                    <div
                      key={block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      className={`p-3 rounded-lg border transition cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? "bg-slate-800 border-[#FA5B0F]/60 text-white"
                          : "bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[#FA5B0F]">
                            {block.type}
                          </span>
                          <span className="text-xs font-medium truncate">
                            {(block as any).title || (block as any).headline || `Block ${index + 1}`}
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          disabled={index === 0}
                          onClick={() => moveBlock(index, "up")}
                          className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={index === page.sections.length - 1}
                          onClick={() => moveBlock(index, "down")}
                          className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => duplicateBlock(block)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Duplicate Block"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeBlock(block.id)}
                          className="p-1 text-red-400 hover:text-red-300"
                          title="Delete Block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Add Block Widget */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-medium text-slate-400 block">Add New Section</span>
              <div className="flex items-center gap-2">
                <select
                  value={newBlockType}
                  onChange={(e) => setNewBlockType(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 flex-1 focus:outline-none focus:border-[#FA5B0F]"
                >
                  <option value="hero">Hero Block</option>
                  <option value="rich_text">Rich Text</option>
                  <option value="cards">Cards Grid</option>
                  <option value="services">Services Block</option>
                  <option value="stats">Metrics / Stats</option>
                  <option value="faqs">FAQs Accordion</option>
                  <option value="cta">Call to Action (CTA)</option>
                </select>
                <button
                  onClick={() => addBlock(newBlockType)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium inline-flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Block Properties Inspector (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-6">
            {selectedBlock ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#FA5B0F] tracking-wider block">
                      Editing Block: {selectedBlock.type}
                    </span>
                    <h2 className="text-base font-bold text-white">Block Properties</h2>
                  </div>
                  <span className="text-xs font-mono text-slate-500">ID: {selectedBlock.id}</span>
                </div>

                {/* Form fields depending on block type */}
                {selectedBlock.type === "hero" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={(selectedBlock as any).badge || ""}
                        onChange={(e) => updateSelectedBlock({ badge: e.target.value } as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Headline</label>
                      <input
                        type="text"
                        value={(selectedBlock as any).headline || ""}
                        onChange={(e) => updateSelectedBlock({ headline: e.target.value } as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Subheadline</label>
                      <textarea
                        rows={3}
                        value={(selectedBlock as any).subheadline || ""}
                        onChange={(e) => updateSelectedBlock({ subheadline: e.target.value } as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Primary CTA Label</label>
                        <input
                          type="text"
                          value={(selectedBlock as any).ctaPrimaryLabel || ""}
                          onChange={(e) => updateSelectedBlock({ ctaPrimaryLabel: e.target.value } as any)}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Primary CTA Link</label>
                        <input
                          type="text"
                          value={(selectedBlock as any).ctaPrimaryLink || ""}
                          onChange={(e) => updateSelectedBlock({ ctaPrimaryLink: e.target.value } as any)}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === "rich_text" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={(selectedBlock as any).title || ""}
                        onChange={(e) => updateSelectedBlock({ title: e.target.value } as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        HTML Content (Auto-sanitized against malicious scripts)
                      </label>
                      <textarea
                        rows={8}
                        value={(selectedBlock as any).contentHtml || ""}
                        onChange={(e) => updateSelectedBlock({ contentHtml: e.target.value } as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.type === "cta" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">CTA Title</label>
                      <input
                        type="text"
                        value={(selectedBlock as any).title || ""}
                        onChange={(e) => updateSelectedBlock({ title: e.target.value } as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={(selectedBlock as any).description || ""}
                        onChange={(e) => updateSelectedBlock({ description: e.target.value } as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={(selectedBlock as any).buttonText || ""}
                          onChange={(e) => updateSelectedBlock({ buttonText: e.target.value } as any)}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={(selectedBlock as any).buttonLink || ""}
                          onChange={(e) => updateSelectedBlock({ buttonLink: e.target.value } as any)}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === "cards" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={(selectedBlock as any).title || ""}
                        onChange={(e) => updateSelectedBlock({ title: e.target.value } as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Cards (JSON Array)</label>
                      <textarea
                        rows={6}
                        value={JSON.stringify((selectedBlock as any).items, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            updateSelectedBlock({ items: parsed } as any);
                          } catch (err) {}
                        }}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>
                )}

                {/* Generic fallback editor for other types */}
                {!["hero", "rich_text", "cta", "cards"].includes(selectedBlock.type) && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Raw Section Data (JSON Schema Validated)
                    </label>
                    <textarea
                      rows={10}
                      value={JSON.stringify(selectedBlock, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          updateSelectedBlock(parsed);
                        } catch (err) {}
                      }}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs">
                Select a block on the left to configure its properties.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE PREVIEW */}
      {activeTab === "preview" && (
        <div className="bg-[#07131F] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">Live Responsive Preview Canvas</span>
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              Desktop / Mobile
            </span>
          </div>
          <div className="p-0">
            <DynamicBlockRenderer sections={page.sections} previewMode={true} />
          </div>
        </div>
      )}

      {/* TAB 3: SEO METADATA */}
      {activeTab === "seo" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto space-y-4">
          <h2 className="text-base font-bold text-white mb-2">Search Engine Optimization (SEO)</h2>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Meta Title</label>
            <input
              type="text"
              value={page.seo_metadata?.meta_title || ""}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo_metadata: { ...page.seo_metadata, meta_title: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={page.seo_metadata?.meta_description || ""}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo_metadata: { ...page.seo_metadata, meta_description: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Canonical URL</label>
            <input
              type="text"
              value={page.seo_metadata?.canonical_url || ""}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo_metadata: { ...page.seo_metadata, canonical_url: e.target.value },
                })
              }
              placeholder="https://dodail.com/your-slug"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white font-mono"
            />
          </div>
        </div>
      )}

      {/* TAB 4: REVISION HISTORY */}
      {activeTab === "history" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white mb-4">Revision History & Safe Rollbacks</h2>
          {revisions.length === 0 ? (
            <p className="text-xs text-slate-400">No revisions recorded yet.</p>
          ) : (
            <div className="divide-y divide-slate-800">
              {revisions.map((rev) => (
                <div key={rev.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-white">
                        Version {rev.version}
                      </span>
                      <span className="text-xs text-slate-400">by {rev.created_by || rev.author_email || "admin"}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {new Date(rev.created_at).toLocaleString()} • {rev.sections.length} blocks
                    </div>
                  </div>

                  <button
                    onClick={() => handleRevert(rev.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition"
                  >
                    Restore This Version
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
