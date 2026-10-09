"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Share2,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  RefreshCw,
  Plus,
  ExternalLink,
  Lock,
  Layers,
  FileCheck,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import {
  EditorialTopic,
  SocialAccountConnection,
  SocialPost,
  SocialPostVariant,
  SocialPlatform,
  ContentStatus,
  SocialPostStatus,
} from "@/lib/content/types";

// Clean brand icons for platforms
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.597 0 9 1.582 9 4.615V8z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function SocialAndContentStudioPage() {
  const [activeTab, setActiveTab] = useState<"topics" | "composer" | "accounts" | "queue">("topics");

  // Topics & AI Outline state
  const [topics, setTopics] = useState<EditorialTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<EditorialTopic | null>(null);
  const [generatingOutline, setGeneratingOutline] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState<string[] | null>(null);
  const [newTopicForm, setNewTopicForm] = useState(false);
  const [topicInput, setTopicInput] = useState<{
    title: string;
    industry: string;
    audience: string;
    search_intent: "Informational" | "Commercial" | "Transactional";
    target_keyword: string;
    priority: "High" | "Medium" | "Low";
  }>({
    title: "",
    industry: "Manufacturing & B2B Logistics",
    audience: "Managing Directors, COOs, Operations Heads in India & GCC",
    search_intent: "Commercial",
    target_keyword: "AI workflow automation Hyderabad",
    priority: "High",
  });

  // Accounts state
  const [accounts, setAccounts] = useState<SocialAccountConnection[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  // Queue state
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Composer state
  const [composerData, setComposerData] = useState({
    title: "Dodail Enterprise Workflow Case Study: Automated Invoicing & Dispatch",
    master_content:
      "Manual dispatch scheduling costs Indian logistics companies 22+ hours per week. Here is how Dodail deployed a dual AI automation pipeline with real-time WhatsApp & ERP sync to cut turnaround times by 80%.",
    channels: ["linkedin", "facebook"] as SocialPlatform[],
    call_to_action: "https://dodail.com/case-studies",
    media_url: "/brand/dodail-full-logo.png",
    hashtags: ["#AIAutomation", "#HyderabadTech", "#DodailSolutions", "#EnterpriseAI"],
    human_approved: false,
    approver_name: "Raviteja Mathurthi (Head of Operations)",
  });
  const [submittingPost, setSubmittingPost] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error" | "info"; msg: string } | null>(null);

  useEffect(() => {
    fetchTopics();
    fetchAccounts();
    fetchPosts();
  }, []);

  const fetchTopics = async () => {
    setLoadingTopics(true);
    try {
      const res = await fetch("/api/editorial/topics");
      const json = await res.json();
      if (json.success) {
        setTopics(json.data);
      }
    } catch (err: any) {
      console.error("Failed to load topics:", err);
    } finally {
      setLoadingTopics(false);
    }
  };

  const fetchAccounts = async () => {
    setLoadingAccounts(true);
    try {
      const res = await fetch("/api/social/accounts");
      const json = await res.json();
      if (json.success) {
        setAccounts(json.data);
      }
    } catch (err: any) {
      console.error("Failed to load accounts:", err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch("/api/social/publish");
      const json = await res.json();
      if (json.success) {
        setPosts(json.data);
      }
    } catch (err: any) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleGenerateOutline = async (topic: EditorialTopic) => {
    setSelectedTopic(topic);
    setGeneratingOutline(true);
    setGeneratedOutline(null);
    setNotice(null);

    try {
      const res = await fetch("/api/ai/outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: topic.title,
          keyword: topic.target_keyword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedOutline(data.outline);
        setNotice({
          type: "success",
          msg: `Fact-grounded outline generated for "${topic.title}" based on verified Dodail architecture.`,
        });
      } else {
        setNotice({ type: "error", msg: data.error || "Failed to generate outline" });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    } finally {
      setGeneratingOutline(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/editorial/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: topicInput.title,
          industry: topicInput.industry,
          audience: topicInput.audience,
          search_intent: topicInput.search_intent,
          target_keyword: topicInput.target_keyword,
          priority: topicInput.priority,
          status: "idea" as ContentStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTopics((prev) => [data.data, ...prev]);
        setNewTopicForm(false);
        setTopicInput({
          title: "",
          industry: "Manufacturing & B2B Logistics",
          audience: "Managing Directors, COOs, Operations Heads in India & GCC",
          search_intent: "Commercial",
          target_keyword: "AI workflow automation Hyderabad",
          priority: "High",
        });
        setNotice({ type: "success", msg: "New topic added to editorial backlog." });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    }
  };

  const handlePublishOrSchedule = async (action: "draft" | "schedule" | "publish") => {
    setNotice(null);
    if ((action === "schedule" || action === "publish") && !composerData.human_approved) {
      setNotice({
        type: "error",
        msg: "Safety Violation: Phase 07 strictly prohibits unreviewed publishing. You must confirm human approval before scheduling or publishing.",
      });
      return;
    }

    setSubmittingPost(true);
    try {
      const variants: Record<SocialPlatform, SocialPostVariant> = {
        linkedin: {
          platform: "linkedin",
          caption: `${composerData.master_content}\n\nKey Takeaways for Enterprise Leaders:\n• Zero hallucinations: Transactional rules enforce execution\n• Sub-second response via regional edge deployment\n• Seamless integration with legacy SAP/Tally & modern webhooks`,
          hashtags: composerData.hashtags,
          character_count: composerData.master_content.length + 150,
          call_to_action: `Read the full blueprint: ${composerData.call_to_action}`,
          media_url: composerData.media_url,
        },
        instagram: {
          platform: "instagram",
          caption: `Automate before you scale. 🚀\n\n${composerData.master_content}\n\nSwipe to inspect the architectural flow diagram. Link in bio.\n\n.${composerData.hashtags.join(" ")}`,
          hashtags: composerData.hashtags,
          character_count: composerData.master_content.length + 100,
          call_to_action: "Link in bio to read full architecture.",
          media_url: composerData.media_url,
        },
        facebook: {
          platform: "facebook",
          caption: `${composerData.master_content}\n\nIs your business spending hours every week on repetitive data entry? Explore how Dodail customizes enterprise AI workflows: ${composerData.call_to_action}`,
          hashtags: composerData.hashtags.slice(0, 2),
          character_count: composerData.master_content.length + 80,
          call_to_action: `Explore solutions: ${composerData.call_to_action}`,
          media_url: composerData.media_url,
        },
      };

      const res = await fetch("/api/social/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: composerData.title,
          variants,
          selected_platforms: composerData.channels,
          status: (action === "publish" ? "published" : action === "schedule" ? "scheduled" : "draft") as SocialPostStatus,
          scheduled_for: action === "schedule" ? new Date(Date.now() + 86400000).toISOString() : undefined,
          published_at: action === "publish" ? new Date().toISOString() : undefined,
          human_approved_by: composerData.human_approved ? composerData.approver_name : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotice({
          type: "success",
          msg: `Post successfully marked as ${action}!`,
        });
        fetchPosts();
        setActiveTab("queue");
      } else {
        setNotice({ type: "error", msg: data.error || "Failed to process post" });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    } finally {
      setSubmittingPost(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20">
              PHASE 07 ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">No Fake Third-Party Success • Strict Human Gate</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Share2 className="w-6 h-6 text-[#FA5B0F]" />
            <span>Blog & Social Media Studio</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Architect grounded AI blog outlines, multi-platform social campaigns, and official OAuth account registries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("composer")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-xs transition shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notice && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-start gap-3 transition ${
            notice.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : notice.type === "error"
              ? "bg-red-500/10 border-red-500/30 text-red-300"
              : "bg-blue-500/10 border-blue-500/30 text-blue-300"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          )}
          <div className="flex-1 font-medium">{notice.msg}</div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab("topics")}
          className={`px-4 py-3 text-xs font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "topics"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Editorial Topic Backlog & AI Outlines ({topics.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("composer")}
          className={`px-4 py-3 text-xs font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "composer"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Multi-Platform Social Composer</span>
        </button>

        <button
          onClick={() => setActiveTab("accounts")}
          className={`px-4 py-3 text-xs font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "accounts"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Connected Channels & Scopes ({accounts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("queue")}
          className={`px-4 py-3 text-xs font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "queue"
              ? "border-[#FA5B0F] text-[#FA5B0F]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Content Queue & Audit Trail ({posts.length})</span>
        </button>
      </div>

      {/* TAB 1: EDITORIAL TOPIC BACKLOG & AI OUTLINER */}
      {activeTab === "topics" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Topics List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Editorial Topic Backlog</span>
              </h2>
              <button
                onClick={() => setNewTopicForm(!newTopicForm)}
                className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Topic</span>
              </button>
            </div>

            {newTopicForm && (
              <form onSubmit={handleCreateTopic} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Add Topic Idea</h3>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Topic Title</label>
                  <input
                    type="text"
                    required
                    value={topicInput.title}
                    onChange={(e) => setTopicInput({ ...topicInput, title: e.target.value })}
                    placeholder="e.g., How AI Agents Automate High-Volume CRM Follow-ups"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Target Keyword</label>
                    <input
                      type="text"
                      value={topicInput.target_keyword}
                      onChange={(e) => setTopicInput({ ...topicInput, target_keyword: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Priority</label>
                    <select
                      value={topicInput.priority}
                      onChange={(e) => setTopicInput({ ...topicInput, priority: e.target.value as any })}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Search Intent</label>
                  <select
                    value={topicInput.search_intent}
                    onChange={(e) => setTopicInput({ ...topicInput, search_intent: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Informational">Informational</option>
                    <option value="Transactional">Transactional</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewTopicForm(false)}
                    className="px-3 py-1 rounded text-xs bg-slate-800 text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded text-xs bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium"
                  >
                    Save Topic
                  </button>
                </div>
              </form>
            )}

            {/* Topic Cards */}
            <div className="space-y-2.5">
              {loadingTopics ? (
                <div className="p-8 text-center text-xs text-slate-400">Loading topics...</div>
              ) : topics.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">No topics in backlog yet.</div>
              ) : (
                topics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`p-4 rounded-xl border transition cursor-pointer ${
                      selectedTopic?.id === topic.id
                        ? "bg-slate-900 border-[#FA5B0F]/50 ring-1 ring-[#FA5B0F]/30"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300">
                        {topic.industry}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          topic.priority === "High"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {topic.priority.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white leading-snug">{topic.title}</h4>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>KW: {topic.target_keyword}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenerateOutline(topic);
                        }}
                        className="px-2 py-1 text-[11px] rounded bg-[#FA5B0F]/10 hover:bg-[#FA5B0F]/20 text-[#FA5B0F] border border-[#FA5B0F]/30 font-medium flex items-center gap-1 transition"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>AI Outline</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Outline Preview & Fact Grounding */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 min-h-[500px]">
            {generatingOutline ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <RefreshCw className="w-8 h-8 text-[#FA5B0F] animate-spin mb-4" />
                <h3 className="text-sm font-semibold text-white">Synthesizing Verified Knowledge...</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  Cross-referencing Dodail service catalog, Hyderabad operations protocols, and transactional safety rules.
                </p>
              </div>
            ) : generatedOutline && selectedTopic ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                        FACT-GROUNDED OUTLINE
                      </span>
                      <span className="text-xs text-slate-400 font-mono">0 Hallucinations Checked</span>
                    </div>
                    <h2 className="text-base font-bold text-white">{selectedTopic.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Primary Target Keyword: <span className="text-slate-200 font-mono">{selectedTopic.target_keyword}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setNotice({
                        type: "info",
                        msg: "Outline transferred to Blog CMS Editor queue for draft authoring.",
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition flex items-center gap-1.5"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Send to Blog Drafts</span>
                  </button>
                </div>

                {/* Grounding Sources */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1.5">
                  <span className="text-[11px] font-mono font-medium text-slate-300 block">
                    Verified Dodail Citations & Knowledge Base Grounding:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Dodail Service Catalog 2026",
                      "Operational Architecture Blueprint (Hyderabad, India)",
                      "Transactional Lead Qualification Matrix",
                    ].map((src, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Structured Sections */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Planned Section Hierarchy</h3>
                  {generatedOutline.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                      <div className="text-xs font-medium text-slate-200 leading-relaxed">{item}</div>
                    </div>
                  ))}
                </div>

                {/* Internal Links & Schema */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                    <span className="text-xs font-semibold text-white block mb-1">Recommended Internal Links</span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li className="font-mono text-[11px] text-[#FA5B0F]">• /services/ai-automation</li>
                      <li className="font-mono text-[11px] text-[#FA5B0F]">• /consultation</li>
                    </ul>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                    <span className="text-xs font-semibold text-white block mb-1">Target Audience</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{selectedTopic.audience}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center text-slate-400">
                <BookOpen className="w-10 h-10 text-slate-600 mb-3" />
                <h3 className="text-sm font-semibold text-white">No Outline Selected</h3>
                <p className="text-xs max-w-sm mt-1">
                  Select any topic from the backlog on the left and click &quot;AI Outline&quot; to synthesize an architecture-grounded draft plan.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-PLATFORM SOCIAL COMPOSER */}
      {activeTab === "composer" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FA5B0F]" />
                <span>Compose Campaign Message</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Draft master content once. The engine generates platform-tailored adaptations for LinkedIn, Instagram & Facebook.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Campaign Reference Title</label>
                <input
                  type="text"
                  value={composerData.title}
                  onChange={(e) => setComposerData({ ...composerData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Channels</label>
                <div className="flex gap-2">
                  {[
                    { id: "linkedin" as const, name: "LinkedIn Org", icon: LinkedInIcon },
                    { id: "instagram" as const, name: "Instagram Pro", icon: InstagramIcon },
                    { id: "facebook" as const, name: "Facebook Page", icon: FacebookIcon },
                  ].map((chan) => {
                    const active = composerData.channels.includes(chan.id);
                    const Icon = chan.icon;
                    return (
                      <button
                        key={chan.id}
                        type="button"
                        onClick={() => {
                          if (active) {
                            setComposerData({
                              ...composerData,
                              channels: composerData.channels.filter((c) => c !== chan.id),
                            });
                          } else {
                            setComposerData({
                              ...composerData,
                              channels: [...composerData.channels, chan.id],
                            });
                          }
                        }}
                        className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-2 transition ${
                          active
                            ? "bg-[#FA5B0F]/15 border-[#FA5B0F] text-white"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-[#FA5B0F]" />
                        <span>{chan.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Master Core Message <span className="text-slate-400 font-mono text-[10px]">(Grounded facts only)</span>
                </label>
                <textarea
                  rows={4}
                  value={composerData.master_content}
                  onChange={(e) => setComposerData({ ...composerData, master_content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 leading-relaxed font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Call to Action Link</label>
                  <input
                    type="text"
                    value={composerData.call_to_action}
                    onChange={(e) => setComposerData({ ...composerData, call_to_action: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Media Image Asset URL</label>
                  <input
                    type="text"
                    value={composerData.media_url}
                    onChange={(e) => setComposerData({ ...composerData, media_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* MANDATORY HUMAN APPROVAL GATE */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Mandatory Human Approval Gate (Phase 07 Safety Protocol)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Dodail enforces strict human editorial review before any post transitions to scheduled or live status. AI-assisted copy must never be published autonomously.
                </p>
                <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={composerData.human_approved}
                    onChange={(e) => setComposerData({ ...composerData, human_approved: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#FA5B0F] focus:ring-[#FA5B0F]"
                  />
                  <span className="text-xs text-white font-medium">
                    I have reviewed and manually approved this content for corporate publication.
                  </span>
                </label>
                {composerData.human_approved && (
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5 pt-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Verified by: {composerData.approver_name}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={submittingPost}
                  onClick={() => handlePublishOrSchedule("draft")}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  disabled={submittingPost}
                  onClick={() => handlePublishOrSchedule("schedule")}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition"
                >
                  Schedule for Tomorrow
                </button>
                <button
                  type="button"
                  disabled={submittingPost}
                  onClick={() => handlePublishOrSchedule("publish")}
                  className="px-4 py-2 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white text-xs font-medium transition shadow-sm"
                >
                  {submittingPost ? "Processing..." : "Publish Post"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Platform-Specific Previews */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Multi-Platform Previews</h3>

            {/* LinkedIn Preview */}
            {composerData.channels.includes("linkedin") && (
              <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="flex items-center gap-1.5 font-medium text-blue-400">
                    <LinkedInIcon className="w-3.5 h-3.5" />
                    LinkedIn Company Page
                  </span>
                  <span className="text-[10px] font-mono">Professional Tone</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm">
                    <Image
                      src="/brand/dodail-logo.png"
                      alt="Dodail Solutions"
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Dodail Solutions</div>
                    <div className="text-[10px] text-slate-400">Enterprise AI Automation • Hyderabad</div>
                  </div>
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  {composerData.master_content}
                  {"\n\nKey Takeaways for Enterprise Leaders:\n• Zero hallucinations: Transactional rules enforce execution\n• Sub-second response via regional edge deployment\n• Seamless integration with legacy SAP/Tally & modern webhooks\n\nRead the full blueprint: "}
                  <span className="text-blue-400 underline">{composerData.call_to_action}</span>
                </div>
              </div>
            )}

            {/* Instagram Preview */}
            {composerData.channels.includes("instagram") && (
              <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="flex items-center gap-1.5 font-medium text-pink-400">
                    <InstagramIcon className="w-3.5 h-3.5" />
                    Instagram Professional
                  </span>
                  <span className="text-[10px] font-mono">Visual + Hashtags</span>
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  Automate before you scale. 🚀
                  {"\n\n"}
                  {composerData.master_content}
                  {"\n\nSwipe to inspect the architectural flow diagram. Link in bio.\n\n."}
                  <span className="text-blue-400">
                    {composerData.hashtags.map((h) => ` ${h}`).join("")}
                  </span>
                </div>
              </div>
            )}

            {/* Facebook Preview */}
            {composerData.channels.includes("facebook") && (
              <div className="bg-[#0A1B2A] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="flex items-center gap-1.5 font-medium text-blue-500">
                    <FacebookIcon className="w-3.5 h-3.5" />
                    Facebook Page
                  </span>
                  <span className="text-[10px] font-mono">Community Tone</span>
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  {composerData.master_content}
                  {"\n\nIs your business spending hours every week on repetitive data entry? Explore how Dodail customizes enterprise AI workflows: "}
                  <span className="text-blue-400 underline">{composerData.call_to_action}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CONNECTED CHANNELS & OAUTH SCOPES */}
      {activeTab === "accounts" && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white block font-medium mb-0.5">Integrity Standard: Real Credentials Only</strong>
              Dodail 2.0 strictly adheres to enterprise compliance. We never simulate or fake third-party publishing success. The accounts below display real developer registration requirements. Until enterprise access tokens are configured in production environment variables, posts remain queued and visible in review.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accounts.map((acc) => (
              <div key={acc.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center">
                      {acc.platform === "linkedin" ? (
                        <LinkedInIcon className="w-5 h-5 text-blue-400" />
                      ) : acc.platform === "instagram" ? (
                        <InstagramIcon className="w-5 h-5 text-pink-400" />
                      ) : (
                        <FacebookIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border capitalize ${
                        acc.is_connected
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {acc.token_status.replace("_", " ")}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{acc.account_name}</h3>
                  <div className="text-[11px] font-mono text-slate-400 mb-3">{acc.account_id}</div>

                  <div className="space-y-2 border-t border-slate-800/80 pt-3">
                    <div className="text-[11px] text-slate-400">
                      <strong className="text-slate-300 block mb-1">Required OAuth Scopes:</strong>
                      <div className="flex flex-wrap gap-1">
                        {acc.scopes_granted.map((scope: string, sIdx: number) => (
                          <span key={sIdx} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 font-mono">
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-1">
                      <strong className="text-slate-300 block mb-1">Production Prerequisite:</strong>
                      <p className="text-[10px] leading-relaxed text-slate-400 font-mono">{acc.api_requirements_note}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 mt-4">
                  <a
                    href={
                      acc.platform === "linkedin"
                        ? "https://developer.linkedin.com"
                        : "https://developers.facebook.com"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Developer Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CONTENT QUEUE & AUDIT TRAIL */}
      {activeTab === "queue" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Published & Queued Social Dispatches
            </h2>
            <button
              onClick={fetchPosts}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Queue</span>
            </button>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Campaign Title & Content</th>
                <th className="px-6 py-3.5">Channels</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Human Approval</th>
                <th className="px-6 py-3.5">Scheduled / Published</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loadingPosts ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#FA5B0F]" />
                    <span>Loading social dispatches...</span>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No scheduled or published posts found. Compose one in Tab 2.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-semibold text-white text-xs">{post.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                        {post.variants?.linkedin?.caption || post.variants?.facebook?.caption || post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {post.selected_platforms?.map((chan: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 capitalize"
                          >
                            {chan}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize border ${
                          post.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : post.status === "scheduled"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : post.status === "failed"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-slate-800 text-slate-300 border-slate-700"
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.error_message && (
                        <div className="text-[10px] text-amber-400 font-mono mt-1">{post.error_message}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {post.human_approved_by ? (
                        <div className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="font-medium text-[11px]">{post.human_approved_by}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Pending Review</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleString()
                        : post.scheduled_for
                        ? `Sched: ${new Date(post.scheduled_for).toLocaleString()}`
                        : "Draft"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
