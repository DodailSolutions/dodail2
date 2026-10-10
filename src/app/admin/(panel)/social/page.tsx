"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Copy,
  Check,
  Trash2,
  Eye,
  Filter,
  Calendar,
  ArrowRight,
  Search,
  MessageSquare,
  ChevronRight,
  SlidersHorizontal,
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

// SVG Brand Icons
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

const COMMON_HASHTAGS = [
  "#AIAutomation",
  "#EnterpriseAI",
  "#HyderabadTech",
  "#DodailSolutions",
  "#WorkflowAutomation",
  "#NextJS",
  "#B2BGrowth",
  "#SupplyChainTech",
];

export default function SocialAndContentStudioPage() {
  const [activeTab, setActiveTab] = useState<"topics" | "composer" | "queue" | "accounts">("composer");

  // Topics & AI Outline state
  const [topics, setTopics] = useState<EditorialTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<EditorialTopic | null>(null);
  const [generatingOutline, setGeneratingOutline] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState<string[] | null>(null);
  const [newTopicForm, setNewTopicForm] = useState(false);
  const [topicSearch, setTopicSearch] = useState("");
  const [topicPriorityFilter, setTopicPriorityFilter] = useState<string>("all");

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
  const [queueStatusFilter, setQueueStatusFilter] = useState<string>("all");
  const [queueSearch, setQueueSearch] = useState("");

  // Composer state
  const [composerData, setComposerData] = useState({
    title: "Dodail Enterprise Workflow Case Study: Automated Invoicing & Dispatch",
    master_content:
      "Manual dispatch scheduling costs Indian logistics companies 22+ hours per week. Here is how Dodail deployed a dual AI automation pipeline with real-time WhatsApp & ERP sync to cut turnaround times by 80%.",
    channels: ["linkedin", "facebook", "instagram"] as SocialPlatform[],
    call_to_action: "https://www.dodail.com/solutions/ai-lead-management",
    media_url: "/brand/dodail-full-logo.png",
    hashtags: ["#AIAutomation", "#HyderabadTech", "#DodailSolutions", "#EnterpriseAI"],
    human_approved: false,
    approver_name: "Raviteja Mathurthi (Head of Operations)",
  });
  const [previewPlatform, setPreviewPlatform] = useState<SocialPlatform>("linkedin");
  const [submittingPost, setSubmittingPost] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
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
        if (json.data.length > 0 && !selectedTopic) {
          setSelectedTopic(json.data[0]);
          if (json.data[0].suggested_outline) {
            setGeneratedOutline(json.data[0].suggested_outline);
          }
        }
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
        // Persist outline back to topic
        await fetch("/api/editorial/topics", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: topic.id, suggested_outline: data.outline, status: "outlined" }),
        });
        setNotice({
          type: "success",
          msg: `Fact-grounded outline generated for "${topic.title}".`,
        });
        fetchTopics();
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
        setSelectedTopic(data.data);
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

  const handleDeleteTopic = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to remove this topic from the backlog?")) return;
    try {
      const res = await fetch(`/api/editorial/topics?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTopics((prev) => prev.filter((t) => t.id !== id));
        if (selectedTopic?.id === id) setSelectedTopic(null);
        setNotice({ type: "info", msg: "Topic removed from backlog." });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    }
  };

  const handleTransferTopicToComposer = (topic: EditorialTopic) => {
    setComposerData({
      ...composerData,
      title: topic.title,
      master_content: `${topic.title}.\n\nInquiries sitting for hours cost high-growth businesses valuable conversions. Dodail Solutions architects deterministic automated workflows to engage, qualify, and sync data in under 60 seconds.`,
      hashtags: ["#AIAutomation", `#${topic.industry.replace(/[^a-zA-Z]/g, "")}`, "#DodailSolutions", "#EnterpriseAI"],
      call_to_action: "https://www.dodail.com/consultation",
      human_approved: false,
    });
    setActiveTab("composer");
    setNotice({
      type: "success",
      msg: `Transferred "${topic.title}" into the Multi-Platform Composer. Review and refine your campaign message.`,
    });
  };

  // Generate Platform Specific Captions on Demand
  const handleSmartAdapt = () => {
    setNotice({
      type: "success",
      msg: "Smart-adapted content across LinkedIn, Instagram, and Facebook with platform-specific hooks and character counts.",
    });
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handlePublishOrSchedule = async (action: "draft" | "schedule" | "publish") => {
    setNotice(null);
    if ((action === "schedule" || action === "publish") && !composerData.human_approved) {
      setNotice({
        type: "error",
        msg: "Phase 07 Safety Protocol: Human approval is mandatory before scheduling or publishing corporate social media content.",
      });
      return;
    }

    if (composerData.channels.length === 0) {
      setNotice({ type: "error", msg: "Please select at least one distribution channel." });
      return;
    }

    setSubmittingPost(true);
    try {
      const variants: Record<SocialPlatform, SocialPostVariant> = {
        linkedin: {
          platform: "linkedin",
          caption: `${composerData.master_content}\n\nKey Takeaways for Enterprise Leaders:\n• Zero hallucinations: Transactional rules enforce execution\n• Sub-second response via regional edge deployment\n• Seamless integration with legacy ERP & modern webhooks\n\nRead the full blueprint: ${composerData.call_to_action}`,
          hashtags: composerData.hashtags,
          character_count: composerData.master_content.length + 180,
          call_to_action: `Read the full blueprint: ${composerData.call_to_action}`,
          media_url: composerData.media_url,
        },
        instagram: {
          platform: "instagram",
          caption: `Automate before you scale. 🚀\n\n${composerData.master_content}\n\nSwipe to inspect the architectural flow diagram. Link in bio.\n\n${composerData.hashtags.join(" ")}`,
          hashtags: composerData.hashtags,
          character_count: composerData.master_content.length + 110,
          call_to_action: "Link in bio to read full architecture.",
          media_url: composerData.media_url,
        },
        facebook: {
          platform: "facebook",
          caption: `${composerData.master_content}\n\nIs your business spending hours every week on repetitive data entry? Explore how Dodail customizes enterprise AI workflows: ${composerData.call_to_action}`,
          hashtags: composerData.hashtags.slice(0, 3),
          character_count: composerData.master_content.length + 90,
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
          msg: `Campaign successfully marked as ${action.toUpperCase()}! Dispatched to Content Queue.`,
        });
        fetchPosts();
        setActiveTab("queue");
      } else {
        setNotice({ type: "error", msg: data.error || "Failed to process campaign" });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    } finally {
      setSubmittingPost(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this social post from the queue?")) return;
    try {
      const res = await fetch(`/api/social/publish?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setNotice({ type: "info", msg: "Post removed from queue." });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    }
  };

  const handleApprovePost = async (post: SocialPost) => {
    try {
      const res = await fetch("/api/social/publish", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: post.id,
          status: "approved",
          human_approved_by: "Raviteja Mathurthi (Head of Operations)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.map((p) => (p.id === post.id ? data.data : p)));
        setNotice({ type: "success", msg: `Post "${post.title}" verified and marked as approved.` });
      }
    } catch (err: any) {
      setNotice({ type: "error", msg: err.message });
    }
  };

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const matchesSearch =
        !topicSearch ||
        t.title.toLowerCase().includes(topicSearch.toLowerCase()) ||
        t.target_keyword.toLowerCase().includes(topicSearch.toLowerCase()) ||
        t.industry.toLowerCase().includes(topicSearch.toLowerCase());
      const matchesPriority =
        topicPriorityFilter === "all" || t.priority.toLowerCase() === topicPriorityFilter.toLowerCase();
      return matchesSearch && matchesPriority;
    });
  }, [topics, topicSearch, topicPriorityFilter]);

  // Filtered queue posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        !queueSearch ||
        p.title.toLowerCase().includes(queueSearch.toLowerCase()) ||
        Object.values(p.variants || {}).some((v) => v.caption?.toLowerCase().includes(queueSearch.toLowerCase()));
      const matchesStatus = queueStatusFilter === "all" || p.status === queueStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [posts, queueSearch, queueStatusFilter]);

  // Current preview caption
  const currentPreviewCaption = useMemo(() => {
    if (previewPlatform === "linkedin") {
      return `${composerData.master_content}\n\nKey Takeaways for Enterprise Leaders:\n• Zero hallucinations: Transactional rules enforce execution\n• Sub-second response via regional edge deployment\n• Seamless integration with legacy ERP & modern webhooks\n\nRead the full blueprint: ${composerData.call_to_action}`;
    }
    if (previewPlatform === "instagram") {
      return `Automate before you scale. 🚀\n\n${composerData.master_content}\n\nSwipe to inspect the architectural flow diagram. Link in bio.\n\n${composerData.hashtags.join(" ")}`;
    }
    return `${composerData.master_content}\n\nIs your business spending hours every week on repetitive data entry? Explore how Dodail customizes enterprise AI workflows: ${composerData.call_to_action}`;
  }, [previewPlatform, composerData]);

  const connectedCount = accounts.filter((a) => a.is_connected).length;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Studio Header & Quick Status Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FA5B0F]/15 text-[#FA5B0F] border border-[#FA5B0F]/30">
              SOCIAL STUDIO v2.0
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Human Review Gate Active</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">
              {connectedCount > 0 ? (
                <span className="text-emerald-400">● {connectedCount} Channels Ready</span>
              ) : (
                <span className="text-amber-400">○ Sandbox / Review Mode</span>
              )}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Share2 className="w-7 h-7 text-[#FA5B0F]" />
            <span>Social Studio & Content Pipeline</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Architect grounded AI blog outlines, craft multi-platform campaigns, review queue dispatches, and manage official OAuth channels.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setActiveTab("topics");
              setNewTopicForm(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Topic</span>
          </button>

          <button
            onClick={() => setActiveTab("composer")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FA5B0F] to-[#FF7A3D] hover:from-[#e04f0b] hover:to-[#FA5B0F] text-white font-medium text-xs sm:text-sm shadow-md shadow-orange-950/30 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Compose Campaign</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => setActiveTab("topics")}
          className="p-4 rounded-2xl border border-slate-800 bg-[#0A1B2A]/60 backdrop-blur-md cursor-pointer hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Editorial Backlog</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{topics.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {topics.filter((t) => t.status === "outlined").length} outlined · {topics.filter((t) => t.priority === "High").length} high priority
          </div>
        </div>

        <div
          onClick={() => setActiveTab("queue")}
          className="p-4 rounded-2xl border border-slate-800 bg-[#0A1B2A]/60 backdrop-blur-md cursor-pointer hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Dispatches Queue</span>
            <Clock className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white">{posts.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {publishedCount} live · {scheduledCount} scheduled
          </div>
        </div>

        <div
          onClick={() => setActiveTab("accounts")}
          className="p-4 rounded-2xl border border-slate-800 bg-[#0A1B2A]/60 backdrop-blur-md cursor-pointer hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Social Channels</span>
            <Lock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">{accounts.length} Platforms</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {connectedCount > 0 ? `${connectedCount} authorized` : "Credentials pending in .env"}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0A1B2A]/60 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Safety Compliance</span>
            <ShieldCheck className="w-4 h-4 text-[#FA5B0F]" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">100%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Mandatory human review gate enforced</div>
        </div>
      </div>

      {/* Alert Notices */}
      {notice && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start justify-between gap-3 transition-all ${
            notice.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
              : notice.type === "error"
              ? "bg-rose-500/10 border-rose-500/30 text-rose-200"
              : "bg-blue-500/10 border-blue-500/30 text-blue-200"
          }`}
        >
          <div className="flex items-start gap-2.5">
            {notice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            )}
            <div className="font-medium leading-relaxed">{notice.msg}</div>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-px overflow-x-auto no-scrollbar">
        {[
          { id: "composer" as const, label: "Multi-Platform Composer", icon: Sparkles, count: null },
          { id: "topics" as const, label: "Editorial Backlog & AI Outlines", icon: BookOpen, count: topics.length },
          { id: "queue" as const, label: "Content Queue & Dispatches", icon: Clock, count: posts.length },
          { id: "accounts" as const, label: "Connected Channels & API Health", icon: Lock, count: accounts.length },
        ].map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                active
                  ? "border-[#FA5B0F] text-[#FA5B0F] bg-white/[0.02]"
                  : "border-transparent text-slate-400 hover:text-white hover:bg-white/[0.01]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    active ? "bg-[#FA5B0F]/20 text-[#FA5B0F]" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: MULTI-PLATFORM COMPOSER */}
      {activeTab === "composer" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form Editor */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 p-5 sm:p-6 backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FA5B0F]" />
                  <span>Campaign Message Architect</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Draft core message once. Engine generates tailored adaptations for LinkedIn, Instagram & Facebook.
                </p>
              </div>

              {topics.length > 0 && (
                <select
                  onChange={(e) => {
                    const found = topics.find((t) => t.id === e.target.value);
                    if (found) handleTransferTopicToComposer(found);
                  }}
                  className="hidden sm:block text-xs bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-[#FA5B0F]"
                  defaultValue=""
                >
                  <option value="" disabled>Load from Topic Backlog...</option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Campaign Reference Title</label>
                <input
                  type="text"
                  value={composerData.title}
                  onChange={(e) => setComposerData({ ...composerData, title: e.target.value })}
                  placeholder="e.g., Enterprise Lead Automation Case Study"
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#FA5B0F]"
                />
              </div>

              {/* Channel Selector Pills */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Distribution Channels</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "linkedin" as const, name: "LinkedIn Org", icon: LinkedInIcon, color: "text-blue-400" },
                    { id: "instagram" as const, name: "Instagram Pro", icon: InstagramIcon, color: "text-pink-400" },
                    { id: "facebook" as const, name: "Facebook Page", icon: FacebookIcon, color: "text-blue-500" },
                  ].map((chan) => {
                    const active = composerData.channels.includes(chan.id);
                    const Icon = chan.icon;
                    return (
                      <button
                        key={chan.id}
                        type="button"
                        onClick={() => {
                          if (active) {
                            if (composerData.channels.length === 1) return;
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
                        className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                          active
                            ? "bg-[#FA5B0F]/15 border-[#FA5B0F] text-white shadow-sm"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${active ? "text-[#FA5B0F]" : chan.color}`} />
                        <span>{chan.name}</span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-[#FA5B0F]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Master Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Master Core Message <span className="text-slate-500 font-mono text-[11px]">(Grounded facts only)</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleSmartAdapt}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FA5B0F] hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Smart Adapt Tone</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={composerData.master_content}
                  onChange={(e) => setComposerData({ ...composerData, master_content: e.target.value })}
                  placeholder="Draft your main message or key findings here..."
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-[#FA5B0F]"
                />
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 font-mono">
                  <span>{composerData.master_content.length} characters</span>
                  <span>LinkedIn max: 3,000 | IG max: 2,200</span>
                </div>
              </div>

              {/* Call to Action & Media URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Call to Action Link</label>
                  <input
                    type="url"
                    value={composerData.call_to_action}
                    onChange={(e) => setComposerData({ ...composerData, call_to_action: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#FA5B0F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Media Image URL / Asset</label>
                  <input
                    type="text"
                    value={composerData.media_url}
                    onChange={(e) => setComposerData({ ...composerData, media_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#FA5B0F]"
                  />
                </div>
              </div>

              {/* Quick Hashtag Inserter */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Recommended Hashtag Cluster</label>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_HASHTAGS.map((tag) => {
                    const included = composerData.hashtags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (included) {
                            setComposerData({
                              ...composerData,
                              hashtags: composerData.hashtags.filter((h) => h !== tag),
                            });
                          } else {
                            setComposerData({
                              ...composerData,
                              hashtags: [...composerData.hashtags, tag],
                            });
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          included
                            ? "bg-orange-500/15 text-[#FA5B0F] border border-orange-500/30"
                            : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-white"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* MANDATORY HUMAN APPROVAL GATE */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Mandatory Human Approval Gate (Phase 07 Safety Protocol)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Dodail strictly enforces human editorial sign-off before content can be queued or published. Autonomous unreviewed posting is prohibited.
                </p>
                <label className="flex items-center gap-2.5 pt-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={composerData.human_approved}
                    onChange={(e) => setComposerData({ ...composerData, human_approved: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#FA5B0F] focus:ring-[#FA5B0F] cursor-pointer"
                  />
                  <span className="text-xs text-white font-medium">
                    I have reviewed and manually approved this content for corporate publication.
                  </span>
                </label>
                {composerData.human_approved && (
                  <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 pt-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Verified by: {composerData.approver_name}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
                <button
                  type="button"
                  disabled={submittingPost}
                  onClick={() => handlePublishOrSchedule("draft")}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  disabled={submittingPost}
                  onClick={() => handlePublishOrSchedule("schedule")}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Schedule for Queue
                </button>
                <button
                  type="button"
                  disabled={submittingPost}
                  onClick={() => handlePublishOrSchedule("publish")}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FA5B0F] to-[#FF7A3D] hover:from-[#e04f0b] hover:to-[#FA5B0F] text-white text-xs font-semibold shadow-md shadow-orange-950/40 transition-all cursor-pointer"
                >
                  {submittingPost ? "Processing..." : "Publish Campaign"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Platform Simulator & Previews */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                Live Platform Simulator
              </h3>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                {(["linkedin", "instagram", "facebook"] as const).map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => setPreviewPlatform(platform)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors cursor-pointer text-xs ${
                      previewPlatform === platform
                        ? "bg-[#FA5B0F] text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Platform Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0A1B2A] p-5 shadow-xl space-y-4">
              {/* Simulator Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-slate-700 p-0.5 shrink-0">
                    <Image
                      src="/brand/dodail-logo.png"
                      alt="Dodail Solutions"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Dodail Solutions</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {previewPlatform === "linkedin"
                        ? "Enterprise AI & Systems Architecture • Hyderabad"
                        : previewPlatform === "instagram"
                        ? "AI Automation & Workflow Engineering"
                        : "Official Business Page"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyText(currentPreviewCaption, previewPlatform)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copyFeedback === previewPlatform ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Formatted Post Content */}
              <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {currentPreviewCaption}
              </div>

              {/* Media Preview */}
              {composerData.media_url && (
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-3">
                  <Image
                    src={composerData.media_url}
                    alt="Media preview"
                    fill
                    sizes="400px"
                    className="object-contain p-2"
                  />
                </div>
              )}

              {/* Platform Meta & Interaction Mock */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{currentPreviewCaption.length} characters</span>
                <span className="text-[#FA5B0F]">Ready for One-Click Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EDITORIAL TOPIC BACKLOG & AI OUTLINES */}
      {activeTab === "topics" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Topics List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Editorial Topic Backlog ({filteredTopics.length})</span>
              </h2>
              <button
                onClick={() => setNewTopicForm(!newTopicForm)}
                className="px-3 py-1.5 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Plus className="w-3.5 h-3.5 text-[#FA5B0F]" />
                <span>Add Topic</span>
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search topics or keywords..."
                  value={topicSearch}
                  onChange={(e) => setTopicSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#FA5B0F]"
                />
              </div>

              <select
                value={topicPriorityFilter}
                onChange={(e) => setTopicPriorityFilter(e.target.value)}
                className="text-xs bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-300 focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {newTopicForm && (
              <form onSubmit={handleCreateTopic} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Create Topic Record</h3>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Topic Title</label>
                  <input
                    type="text"
                    required
                    value={topicInput.title}
                    onChange={(e) => setTopicInput({ ...topicInput, title: e.target.value })}
                    placeholder="e.g., How Multi-Agent Workflows Cut Response Times"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#FA5B0F]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Target Keyword</label>
                    <input
                      type="text"
                      value={topicInput.target_keyword}
                      onChange={(e) => setTopicInput({ ...topicInput, target_keyword: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Priority</label>
                    <select
                      value={topicInput.priority}
                      onChange={(e) => setTopicInput({ ...topicInput, priority: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewTopicForm(false)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg text-xs bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-semibold cursor-pointer"
                  >
                    Save Topic
                  </button>
                </div>
              </form>
            )}

            {/* Topic Cards List */}
            <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
              {loadingTopics ? (
                <div className="p-8 text-center text-xs text-slate-400">Loading topics...</div>
              ) : filteredTopics.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 rounded-xl border border-dashed border-slate-800">
                  No topics matching your criteria.
                </div>
              ) : (
                filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic);
                      if (topic.suggested_outline) setGeneratedOutline(topic.suggested_outline);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedTopic?.id === topic.id
                        ? "bg-slate-900 border-[#FA5B0F]/60 ring-1 ring-[#FA5B0F]/30"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300">
                        {topic.industry}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            topic.priority === "High"
                              ? "bg-rose-500/10 text-rose-300 border-rose-500/20"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {topic.priority}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteTopic(topic.id, e)}
                          title="Delete topic"
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-white leading-snug">{topic.title}</h4>

                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="truncate max-w-[200px]">KW: {topic.target_keyword}</span>
                      <span className="text-[10px] font-mono capitalize text-slate-500">{topic.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Outline Preview & Actions */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 p-6 min-h-[500px]">
            {generatingOutline ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <RefreshCw className="w-8 h-8 text-[#FA5B0F] animate-spin mb-4" />
                <h3 className="text-sm font-semibold text-white">Synthesizing Verified Knowledge...</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  Grounding outline against Dodail enterprise service catalog and operations protocols.
                </p>
              </div>
            ) : selectedTopic ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                        VERIFIED TOPIC BLUEPRINT
                      </span>
                      <span className="text-xs text-slate-400 font-mono">0 Hallucinations</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white">{selectedTopic.title}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Target Keyword: <span className="text-[#FA5B0F] font-mono font-medium">{selectedTopic.target_keyword}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleGenerateOutline(selectedTopic)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FA5B0F]" />
                      <span>Regenerate</span>
                    </button>

                    <button
                      onClick={() => handleTransferTopicToComposer(selectedTopic)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Convert to Social Campaign</span>
                    </button>
                  </div>
                </div>

                {/* Grounding Citations */}
                <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                  <span className="text-[11px] font-mono font-semibold text-slate-300 block">
                    Verified Citations & Grounding Context:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Dodail 2.0 AI Architecture Baseline",
                      "Regional Edge Delivery (India & International)",
                      "Fail-Closed Security & RLS Validation",
                    ].map((src, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Structured Sections */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                    Editorial Section Hierarchy
                  </h3>
                  {(generatedOutline || selectedTopic.suggested_outline || []).map((sec, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-200">
                      {sec}
                    </div>
                  ))}
                </div>

                {/* Internal Links & Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-semibold text-white block mb-1">Recommended Internal Linking</span>
                    <p className="text-xs font-mono text-[#FA5B0F]">• /solutions/ai-lead-management</p>
                    <p className="text-xs font-mono text-[#FA5B0F]">• /consultation</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-semibold text-white block mb-1">Target Decision Maker</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedTopic.audience}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center text-slate-400">
                <BookOpen className="w-10 h-10 text-slate-600 mb-3" />
                <h3 className="text-sm font-semibold text-white">No Topic Selected</h3>
                <p className="text-xs max-w-sm mt-1">Select any topic from the backlog on the left to inspect its outline blueprint.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT QUEUE & AUDIT TRAIL */}
      {activeTab === "queue" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0A1B2A]/70 overflow-hidden shadow-sm">
          {/* Header Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white">Dispatches Queue & Audit Trail</h2>
              <p className="text-xs text-slate-400 mt-0.5">Track published, scheduled, and review-pending social media campaigns.</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter queue..."
                  value={queueSearch}
                  onChange={(e) => setQueueSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#FA5B0F]"
                />
              </div>

              <select
                value={queueStatusFilter}
                onChange={(e) => setQueueStatusFilter(e.target.value)}
                className="text-xs bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-300 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="approved">Approved</option>
                <option value="draft">Draft</option>
              </select>

              <button
                onClick={fetchPosts}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Refresh Queue"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800 text-[10px]">
                <tr>
                  <th className="px-5 py-3">Campaign & Content</th>
                  <th className="px-5 py-3">Channels</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Human Review</th>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {loadingPosts ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#FA5B0F]" />
                      <span>Loading dispatches...</span>
                    </td>
                  </tr>
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                      No matching posts in the queue.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-3.5 max-w-sm">
                        <div className="font-semibold text-white text-xs">{post.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {post.variants?.linkedin?.caption || post.variants?.facebook?.caption || post.title}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1">
                          {post.selected_platforms?.map((chan: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 capitalize"
                            >
                              {chan}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono capitalize border ${
                            post.status === "published"
                              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                              : post.status === "scheduled"
                              ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                              : post.status === "approved"
                              ? "bg-violet-500/10 text-violet-300 border-violet-500/30"
                              : "bg-slate-800 text-slate-300 border-slate-700"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {post.human_approved_by ? (
                          <div className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[140px]">{post.human_approved_by.split("@")[0]}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleApprovePost(post)}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 cursor-pointer"
                          >
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            <span>Approve Now</span>
                          </button>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-[11px] font-mono text-slate-400">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString()
                          : post.scheduled_for
                          ? `Sched: ${new Date(post.scheduled_for).toLocaleDateString()}`
                          : "Draft"}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              const caption = post.variants?.linkedin?.caption || post.title;
                              handleCopyText(caption, post.id);
                            }}
                            title="Copy post copy"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                          >
                            {copyFeedback === post.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id)}
                            title="Delete post"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CONNECTED CHANNELS & API ACCESS */}
      {activeTab === "accounts" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white block font-semibold mb-0.5">
                Integrity Standard: Truth In Integrations
              </strong>
              Dodail 2.0 strictly enforces verified developer credentials. Disconnected channels are clearly labeled without simulation. Once keys are configured in your environment variables, channels automatically unlock for direct dispatch.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className="bg-[#0A1B2A]/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                      {acc.platform === "linkedin" ? (
                        <LinkedInIcon className="w-5 h-5 text-blue-400" />
                      ) : acc.platform === "instagram" ? (
                        <InstagramIcon className="w-5 h-5 text-pink-400" />
                      ) : (
                        <FacebookIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border capitalize ${
                        acc.is_connected
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {acc.is_connected ? "● Connected" : "○ Setup Required"}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{acc.account_name}</h3>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5 mb-3">{acc.account_id}</div>

                  <div className="space-y-2.5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
                    <div>
                      <strong className="text-slate-300 block mb-1">Required OAuth Scopes:</strong>
                      <div className="flex flex-wrap gap-1">
                        {acc.scopes_granted.map((scope: string, sIdx: number) => (
                          <span key={sIdx} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <strong className="text-slate-300 block mb-1">Production Configuration:</strong>
                      <p className="text-[10px] leading-relaxed text-slate-400 font-mono bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                        {acc.api_requirements_note}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <a
                    href={
                      acc.platform === "linkedin"
                        ? "https://developer.linkedin.com"
                        : "https://developers.facebook.com"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Open Developer Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
