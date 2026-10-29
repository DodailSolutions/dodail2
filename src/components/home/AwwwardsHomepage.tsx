"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  Globe2,
  Layers,
  MapPin,
  MessageSquare,
  Phone,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { ThreeHeroCanvas } from "./ThreeHeroCanvas";
import { LivingCursor } from "./LivingCursor";
import { SpotlightCard } from "./SpotlightCard";
import { BorderBeam } from "./BorderBeam";
import { RoiCalculator } from "./RoiCalculator";
import { ArchitectureStudio } from "./ArchitectureStudio";
import { GrowthBentoChart } from "./GrowthBentoChart";

export function AwwwardsHomepage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [expandedAcronym, setExpandedAcronym] = useState<number | null>(0);
  const [activeService, setActiveService] = useState<number>(0);

  // Preloader session check
  useEffect(() => {
    try {
      const visited = sessionStorage.getItem("dd_visited");
      if (visited === "true") {
        setPreloaderDone(true);
      } else {
        const timer = setTimeout(() => {
          setPreloaderDone(true);
          sessionStorage.setItem("dd_visited", "true");
        }, 1100);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      setPreloaderDone(true);
    }
  }, []);

  const acronymItems = [
    { letter: "D", title: "Design-Oriented", desc: "Award-winning visual craft that builds trust and authority within 50ms of landing." },
    { letter: "O", title: "Operations-Grade", desc: "Engineered for 99.98% uptime, zero vendor lock-in, and seamless compliance." },
    { letter: "D", title: "Development", desc: "Clean Next.js 16 Edge runtime architecture with sub-18ms page delivery." },
    { letter: "A", title: "AI-Led Solutions", desc: "Autonomous workflows, RAG knowledge pipelines, and generative search visibility." },
    { letter: "I", title: "Impact & Growth", desc: "Zero vanity metrics. Every sprint ties directly to pipeline, CAC reduction, and ROAS." },
    { letter: "L", title: "Lifelong Partnership", desc: "Continuous iteration, dedicated engineering pods, and CMO-as-a-Service leadership." },
  ];

  const services = [
    {
      num: "01",
      title: "Digital Marketing",
      subtitle: "AI-First Organic Dominance & High-Yield Performance",
      desc: "Search Generative Experience (GEO) optimization, AI search visibility (ChatGPT/Perplexity), multi-channel PPC, and autonomous customer acquisition engines.",
      tags: ["GEO / AI Search", "Performance Ads", "Technical SEO", "Growth Funnels"],
      stat: "+218% Organic Traffic",
    },
    {
      num: "02",
      title: "Web & Application Development",
      subtitle: "Sub-Second Next.js & React Architectures",
      desc: "Ultra-fast headless websites, complex enterprise SaaS platforms, and bespoke client dashboards built with zero-latency Edge runtimes and clean codebases.",
      tags: ["Next.js 16", "React 19", "Headless Shopify", "SaaS Dashboards"],
      stat: "0.6s LCP Benchmark",
    },
    {
      num: "03",
      title: "Mobile App Development",
      subtitle: "Native & Cross-Platform Product Engineering",
      desc: "Polished iOS, Android, and Flutter applications engineered for rapid adoption, seamless biometric authentication, and offline-first data sync.",
      tags: ["iOS & Swift", "Android Kotlin", "Flutter", "Cross-Platform"],
      stat: "4.9/5 App Store Rating",
    },
    {
      num: "04",
      title: "Branding & Identity Systems",
      subtitle: "Distinctive Visual Assets That Command Premium Pricing",
      desc: "Complete visual identity systems, typography guidelines, packaging, and digital design language that separate industry leaders from commodity competitors.",
      tags: ["Brand Architecture", "Logo Systems", "Design Guidelines", "3D Motion"],
      stat: "100% Brand IP Handover",
    },
    {
      num: "05",
      title: "Marketing & Strategy Development",
      subtitle: "Full-Funnel Go-to-Market & CMO-as-a-Service",
      desc: "Comprehensive market positioning, pricing architecture, customer journey mapping, and fractional executive leadership that turns products into market leaders.",
      tags: ["CMO-as-a-Service", "GTM Strategy", "Unit Economics", "Funnel Mapping"],
      stat: "4.6x Average ROAS",
    },
  ];

  const caseStudies = [
    {
      id: "dentalpulse",
      client: "DentalPulse Healthcare",
      market: "India & UAE",
      category: "Web Engineering & AI Automation",
      title: "Scaling Patient Intake Across 14 Specialized Clinics",
      desc: "Re-engineered a slow WordPress multisite into a sub-second Next.js platform integrated with automated WhatsApp booking bots and EHR appointment sync.",
      stats: [
        { label: "Bookings Increase", val: "+340%" },
        { label: "Cost Per Acquisition", val: "-68%" },
        { label: "Page Load Time", val: "0.58s" },
      ],
      img: "/brand/dodail-buddha-radiance.jpg",
    },
    {
      id: "dubairealty",
      client: "Dubai Prime Luxury Estates",
      market: "Dubai, UAE",
      category: "Digital Marketing & Performance Strategy",
      title: "Generating $18M+ In Verified HNW Property Inquiries",
      desc: "Executed a targeted multi-lingual Google and Meta performance funnel paired with interactive 3D virtual floorplans and real-time CRM qualification.",
      stats: [
        { label: "High-Ticket Pipeline", val: "$18.4M" },
        { label: "Cost Per Lead", val: "-46%" },
        { label: "Qualified Meetings", val: "280+" },
      ],
      img: "/brand/dodail-office-hyderabad.webp",
    },
    {
      id: "luminance",
      client: "Luminance Global Brand",
      market: "USA & Europe",
      category: "Headless E-Commerce & Rebranding",
      title: "Accelerating Global D2C Revenue with Headless Shopify",
      desc: "Designed and built an editorial headless storefront with instant micro-interactions, multi-currency routing, and automated fulfillment workflows.",
      stats: [
        { label: "Checkout Conversion", val: "+42%" },
        { label: "Mobile Bounce Rate", val: "-38%" },
        { label: "Average Order Value", val: "+26%" },
      ],
      img: "/brand/dodail-full-logo.png",
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Deep Discovery & Technical Audit",
      timeline: "Days 1 – 7",
      desc: "We analyze your unit economics, audit your existing funnel telemetry, interrogate codebase bottlenecks, and identify high-leverage growth opportunities.",
    },
    {
      num: "02",
      title: "System Architecture & Prototyping",
      timeline: "Days 8 – 21",
      desc: "We deliver full-fidelity Figma prototypes, technical architectural schematics, and an unambiguous delivery roadmap with fixed milestone SLAs.",
    },
    {
      num: "03",
      title: "Agile Development Sprint",
      timeline: "Weeks 3 – 8",
      desc: "Bi-weekly sprint demos, continuous staging deployments, and strict TypeScript/Next.js linting to deliver defect-free, battle-tested software.",
    },
    {
      num: "04",
      title: "AI Integration & Performance Testing",
      timeline: "Weeks 7 – 10",
      desc: "Integration of automated lead qualification pipelines, GEO search schema, CRM routing, and 100/100 Core Web Vitals stress tests.",
    },
    {
      num: "05",
      title: "Launch, Handover & Scale",
      timeline: "Ongoing",
      desc: "Zero-downtime DNS cutover, 100% intellectual property transfer, team training, and continuous growth telemetry monitoring.",
    },
  ];

  const whyPoints = [
    {
      title: "Zero Vendor Lock-in",
      desc: "You own 100% of the code, IP, repositories, analytics, and accounts. Clean documentation and zero proprietary dependencies.",
      badge: "Full Ownership",
      highlight: true,
    },
    {
      title: "Sub-Second Performance SLA",
      desc: "Every web platform we ship guarantees < 1.0s LCP on mobile. Speed translates directly to conversion and organic search rank.",
      badge: "Core Web Vitals",
      highlight: false,
    },
    {
      title: "Enterprise AI Guardrails",
      desc: "We deploy grounded AI models with strict hallucination checks, DPDP/GDPR privacy masking, and deterministic fallbacks.",
      badge: "Hardened AI",
      highlight: false,
    },
    {
      title: "Cross-Border Market Expertise",
      desc: "Active operational presence in India, UAE, and the USA. We understand local payment gateways, currencies, and cultural nuances.",
      badge: "IN · UAE · US",
      highlight: false,
    },
    {
      title: "Direct Access to Senior Leads",
      desc: "No junior agency handoffs. You work directly with senior architects, art directors, and growth strategists with 10+ years experience.",
      badge: "Senior Pods",
      highlight: false,
    },
    {
      title: "Transparent Attribution",
      desc: "Custom live attribution dashboards. Know the exact CAC, ROAS, and pipeline velocity of every dollar deployed.",
      badge: "Real-time Telemetry",
      highlight: false,
    },
  ];

  const industries = [
    "Healthcare & HealthTech",
    "Real Estate & PropTech",
    "High-Growth E-Commerce",
    "B2B SaaS & Enterprise Software",
    "Financial Services & FinTech",
    "Supply Chain & Logistics",
    "EdTech & Professional Training",
    "Hospitality & Luxury Retail",
  ];

  const faqs = [
    {
      q: "Who owns the code, design assets, and marketing accounts after delivery?",
      a: "You do, 100%. From Day 1, all code repositories, Figma design files, cloud infrastructure accounts, and ad platforms are either created under your corporate accounts or transferred unconditionally with full IP rights upon final milestone settlement. Dodail does not lock clients into proprietary hosting or closed frameworks.",
    },
    {
      q: "How does Dodail differ from legacy IT service giants and traditional creative shops?",
      a: "Legacy IT consultancies move slowly with bloated junior teams, while pure creative studios lack technical rigor and AI capabilities. Dodail operates at the intersection: boutique aesthetic craft and high-velocity engineering, combined with enterprise-grade SLA compliance and direct access to senior technical leaders.",
    },
    {
      q: "What is your typical project timeline from kickoff to launch?",
      a: "High-impact web applications and rebranding initiatives typically ship in 6 to 10 weeks via structured agile sprints. Full-scale enterprise SaaS platforms and complex digital transformations span 3 to 5 months. We establish locked timelines with contractual SLA milestones during our discovery phase.",
    },
    {
      q: "How do you weave AI into web development and marketing without hallucination risks?",
      a: "We only deploy hardened AI pipelines with deterministic guardrails. On the web side, this includes automated lead scoring, conversational RAG grounded strictly in your verified documentation, and generative search optimization (GEO) to dominate modern AI engines like ChatGPT, Perplexity, and Google Gemini.",
    },
    {
      q: "What are your engagement models?",
      a: "We offer three flexible models: 1) Fixed-Scope Milestone Sprints for rapid web/branding delivery; 2) Dedicated Growth Retainers with continuous engineering and performance optimization; and 3) CMO-as-a-Service for leadership teams seeking fractional strategic direction.",
    },
    {
      q: "Where is Dodail headquartered and how do you support international clients?",
      a: "Our global delivery headquarters is located at Hirkani Tower, Maruthi Nagar, Hyderabad, India, operating Monday through Saturday. We maintain dedicated timezone coverage for clients in the UAE (Gulf Standard Time) and the United States (EST/PST) with real-time Slack/Teams communication.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-[#1A2535] antialiased selection:bg-[#E04E08] selection:text-white">
      {/* Living Custom Cursor */}
      <LivingCursor />

      {/* SECTION 01: PRELOADER */}
      <AnimatePresence>
        {!preloaderDone && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          >
            <div className="relative flex flex-col items-center">
              <div className="relative h-20 w-20">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E3E6EB" strokeWidth="3" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#E04E08"
                    strokeWidth="3.5"
                    strokeDasharray="264"
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-[#1A2535]">
                  <span className="text-xl font-display">d<span className="text-[#E04E08]">.</span></span>
                </div>
              </div>
              <span className="mt-4 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#1A2535]/60">
                Dodail Solutions
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 02: HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Three.js Interactive 3D Node Mesh */}
        <ThreeHeroCanvas />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E3E6EB] bg-white/80 px-4 py-2 backdrop-blur-md shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#E04E08] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1A2535]">
              Creative &amp; Technology Growth Agency · Hyderabad · UAE · USA
            </span>
          </div>

          {/* Fluid Editorial H1 with Animated Orange Dot */}
          <div className="mt-8 max-w-5xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#1A2535] leading-[1.04]">
              Think Growth<span className="text-[#E04E08]">.</span>
              <br />
              Think Dodail<span className="inline-block h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 rounded-full bg-[#E04E08] ml-2 align-baseline animate-bounce" />
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#1A2535]/70">
              <strong className="text-[#1A2535] font-semibold">Design-Oriented Development &amp; AI-Led Solutions.</strong> We engineer high-conversion web platforms, autonomous marketing funnels, and enterprise brand systems that prove their value in revenue.
            </p>
          </div>

          {/* Dual CTAs & Reassurance Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://calendly.com/dodailsolutions/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#E04E08] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#E04E08]/20 transition-all hover:bg-[#D04510] hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span>Book a Free Strategy Call</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#E3E6EB] bg-white px-7 py-4 text-base font-semibold text-[#1A2535] transition-all hover:border-[#1A2535] hover:bg-[#F6F7F9]"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Proof Strip */}
          <div className="mt-12 flex flex-wrap items-center gap-y-4 gap-x-8 text-xs font-medium text-[#1A2535]/70 border-t border-[#E3E6EB] pt-6">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#E04E08]" />
              <span>15-min discovery, zero sales fluff</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#E04E08]" />
              <span>Full IP &amp; repository ownership</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#E04E08]" />
              <span>100% Core Web Vitals SLA guaranteed</span>
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 03: LOGO MARQUEE */}
      <section className="border-y border-[#E3E6EB] bg-[#F6F7F9] py-6 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-3 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A2535]/50">
            Trusted By High-Growth Scale-Ups &amp; Enterprise Leaders Across 3 Continents
          </span>
        </div>
        <div className="flex w-max animate-marquee space-x-12 whitespace-nowrap">
          {[
            "DentalPulse Healthcare",
            "Dubai Prime Realty",
            "Luminance D2C",
            "Apex Logistics UAE",
            "Vanguard FinTech",
            "Aura AI Labs",
            "Horizon EdTech",
            "Nexus Cloud Systems",
            "DentalPulse Healthcare",
            "Dubai Prime Realty",
            "Luminance D2C",
            "Apex Logistics UAE",
          ].map((client, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-semibold text-[#1A2535]/60 hover:text-[#1A2535] transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E04E08]" />
              <span>{client}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04: IMPACT METRICS BAND */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <SpotlightCard className="p-6 sm:p-8">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#E04E08] font-mono">+218%</span>
              <h4 className="mt-2 text-base font-bold text-[#1A2535]">Organic Traffic Velocity</h4>
              <p className="mt-1 text-xs text-[#1A2535]/60">Average 12-month client gain via technical AI GEO search architectures.</p>
            </SpotlightCard>

            <SpotlightCard className="p-6 sm:p-8">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#1A2535] font-mono">4.6x</span>
              <h4 className="mt-2 text-base font-bold text-[#1A2535]">Average ROAS Return</h4>
              <p className="mt-1 text-xs text-[#1A2535]/60">Measured return on digital performance capital across client campaigns.</p>
            </SpotlightCard>

            <SpotlightCard className="p-6 sm:p-8">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#E04E08] font-mono">140+</span>
              <h4 className="mt-2 text-base font-bold text-[#1A2535]">Platforms Shipped</h4>
              <p className="mt-1 text-xs text-[#1A2535]/60">High-concurrency web applications, SaaS dashboards, and brands since 2019.</p>
            </SpotlightCard>

            <SpotlightCard className="p-6 sm:p-8">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#1A2535] font-mono">94%</span>
              <h4 className="mt-2 text-base font-bold text-[#1A2535]">Annual Client Retention</h4>
              <p className="mt-1 text-xs text-[#1A2535]/60">Clients who expand their retainer contracts year-over-year.</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* SECTION 05: MANIFESTO & DODAIL ACRONYM EXPANDER */}
      <section id="manifesto" className="py-20 sm:py-28 bg-[#F6F7F9] border-t border-[#E3E6EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E04E08]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
                The Dodail Philosophy
              </span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535] leading-tight">
              Design gives you authority<span className="text-[#E04E08]">.</span> Code gives you scale<span className="text-[#E04E08]">.</span> AI gives you leverage<span className="text-[#E04E08]">.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#1A2535]/70">
              Most agencies build digital brochures that sit idle. We engineer commercial engines: platforms that attract qualified buyers, articulate your value with clarity, and turn repetitive operations into autonomous growth.
            </p>
          </div>

          {/* DODAIL Acronym Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acronymItems.map((item, idx) => (
              <SpotlightCard
                key={idx}
                onClick={() => setExpandedAcronym(expandedAcronym === idx ? null : idx)}
                className={`cursor-pointer p-6 transition-all ${
                  expandedAcronym === idx ? "border-[#E04E08] ring-2 ring-[#E04E08]/20 bg-white" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E04E08] font-display text-xl font-bold text-white shadow-sm">
                    {item.letter}
                  </span>
                  <h3 className="text-lg font-bold text-[#1A2535]">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm text-[#1A2535]/70 leading-relaxed">{item.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06: ENTERPRISE ARCHITECTURE STUDIO */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ArchitectureStudio />
        </div>
      </section>

      {/* SECTION 07: INTERACTIVE ROI & FINANCIAL CALCULATOR */}
      <section className="py-20 bg-[#F6F7F9] border-y border-[#E3E6EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RoiCalculator />
        </div>
      </section>

      {/* SECTION 08: 5 CORE SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E3E6EB]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
                Disciplines &amp; Core Capabilities
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
                Five Engineered Growth Services<span className="text-[#E04E08]">.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#1A2535]/70">
              No generalist bloat. Five focused disciplines delivered by dedicated technical pods with end-to-end accountability.
            </p>
          </div>

          <div className="mt-8 divide-y divide-[#E3E6EB]">
            {services.map((srv, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveService(idx)}
                className={`group py-8 sm:py-10 transition-all rounded-2xl px-4 sm:px-6 ${
                  activeService === idx ? "bg-[#F2D5C4]/20" : "hover:bg-[#F6F7F9]"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-[#E04E08]">{srv.num}</span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1A2535] group-hover:text-[#E04E08] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#1A2535]/50 uppercase tracking-wider">{srv.subtitle}</p>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="text-sm text-[#1A2535]/70 leading-relaxed">{srv.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {srv.tags.map((t, i) => (
                        <span key={i} className="rounded-full bg-white border border-[#E3E6EB] px-2.5 py-1 text-[11px] font-medium text-[#1A2535]/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex lg:justify-end items-center gap-3">
                    <span className="rounded-full bg-[#E04E08]/10 px-3.5 py-1.5 text-xs font-bold text-[#E04E08]">
                      {srv.stat}
                    </span>
                    <a
                      href="https://calendly.com/dodailsolutions/15min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full border border-[#E3E6EB] bg-white flex items-center justify-center text-[#1A2535] group-hover:bg-[#E04E08] group-hover:text-white transition-colors"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 09: SELECTED WORK (CASE STUDIES) */}
      <section id="work" className="py-24 bg-[#F6F7F9] border-t border-[#E3E6EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
              Proven Results &amp; Telemetry
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
              Commercial Case Studies<span className="text-[#E04E08]">.</span>
            </h2>
            <p className="mt-3 text-sm text-[#1A2535]/70">
              Real metrics, real revenue, and real platforms shipped across India, the UAE, and the United States.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {caseStudies.map((cs, idx) => (
              <SpotlightCard key={idx} data-cursor="view" className="p-8 sm:p-12 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#E04E08]/10 px-3 py-1 text-xs font-bold text-[#E04E08]">
                        {cs.category}
                      </span>
                      <span className="text-xs font-semibold text-[#1A2535]/50">
                        {cs.market} · {cs.client}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl sm:text-4xl font-bold text-[#1A2535] leading-snug">
                      {cs.title}
                    </h3>
                    <p className="mt-4 text-base text-[#1A2535]/70 leading-relaxed">
                      {cs.desc}
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#E3E6EB] pt-6">
                      {cs.stats.map((s, i) => (
                        <div key={i}>
                          <span className="text-2xl sm:text-3xl font-extrabold text-[#E04E08] font-mono">{s.val}</span>
                          <span className="block mt-1 text-[11px] font-semibold text-[#1A2535]/60 uppercase tracking-wider">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-[#F6F7F9] border border-[#E3E6EB] shadow-inner flex items-center justify-center">
                    <Image
                      src={cs.img}
                      alt={cs.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: MOBBIN GROWTH BENTO DASHBOARD */}
      <section id="results" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
              Attribution Dashboard
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
              Real-Time Growth Attribution<span className="text-[#E04E08]">.</span>
            </h2>
            <p className="mt-2 text-sm text-[#1A2535]/70">
              We monitor every attribution vector so executive stakeholders have unassailable financial transparency.
            </p>
          </div>

          <GrowthBentoChart />
        </div>
      </section>

      {/* SECTION 11: 5-STEP PLAYBOOK & PROCESS */}
      <section id="process" className="py-24 bg-[#F6F7F9] border-t border-[#E3E6EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
              Methodology &amp; Execution
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
              The 5-Step Dodail Playbook<span className="text-[#E04E08]">.</span>
            </h2>
            <p className="mt-3 text-sm text-[#1A2535]/70">
              A disciplined, milestone-driven delivery process designed to eliminate project drift and guarantee commercial output.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <SpotlightCard key={idx} className="p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-[#E04E08]">{step.num}</span>
                    <span className="rounded-full bg-[#F6F7F9] border border-[#E3E6EB] px-2.5 py-0.5 text-[11px] font-bold text-[#1A2535]/60 uppercase tracking-wider">
                      {step.timeline}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#1A2535]">{step.title}</h3>
                  <p className="mt-2 text-xs text-[#1A2535]/70 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold text-[#E04E08]">
                  <Check className="h-3.5 w-3.5" />
                  <span>SLA Locked</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: WHY DODAIL (ENTERPRISE BENTO) */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
              Enterprise Assurances
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
              Why Leading Brands Choose Dodail<span className="text-[#E04E08]">.</span>
            </h2>
            <p className="mt-3 text-sm text-[#1A2535]/70">
              Engineering standards and commercial guarantees built for institutional confidence.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPoints.map((pt, idx) => (
              <SpotlightCard
                key={idx}
                className={`p-8 ${pt.highlight ? "bg-[#F2D5C4]/30 border-[#E04E08]/30" : "bg-white"}`}
              >
                <span className="rounded-full bg-white border border-[#E3E6EB] px-3 py-1 text-xs font-bold text-[#1A2535] inline-block shadow-xs">
                  {pt.badge}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#1A2535]">{pt.title}</h3>
                <p className="mt-2 text-sm text-[#1A2535]/70 leading-relaxed">{pt.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: 8 INDUSTRIES CHIPS */}
      <section className="py-16 bg-[#F6F7F9] border-y border-[#E3E6EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
            Domain Specialization
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-[#1A2535]">
            Engineered for High-Stakes Industries<span className="text-[#E04E08]">.</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {industries.map((ind, i) => (
              <span
                key={i}
                className="flex items-center gap-2 rounded-full border border-[#E3E6EB] bg-white px-5 py-2.5 text-xs font-semibold text-[#1A2535] shadow-xs hover:border-[#E04E08] hover:bg-[#F2D5C4]/20 transition-all cursor-default"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#E04E08]" />
                <span>{ind}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: TESTIMONIALS & VIDEO */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
              Client Endorsements
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
              Executive Perspectives<span className="text-[#E04E08]">.</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Testimonial Card */}
            <SpotlightCard data-cursor="play" className="p-8 bg-[#1A2535] text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E04E08]">Video Interview</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E04E08] text-white shadow-md">
                    <Play className="h-4 w-4 ml-0.5 fill-current" />
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white leading-snug">
                  &ldquo;Dodail transformed our digital customer intake from a cost center into our highest-yielding acquisition asset.&rdquo;
                </h3>
              </div>
              <div className="mt-8 border-t border-white/10 pt-4">
                <span className="block text-sm font-bold text-white">Tariq Al-Mansoori</span>
                <span className="block text-xs text-white/60">COO · Dubai Prime Luxury Estates</span>
              </div>
            </SpotlightCard>

            {/* Quote 02 */}
            <SpotlightCard className="p-8 bg-[#F6F7F9] flex flex-col justify-between">
              <p className="text-sm sm:text-base text-[#1A2535] leading-relaxed italic">
                &ldquo;Their technical rigor on Next.js 16 and AI lead qualification is unmatched in India. We saw patient booking conversion double within 60 days of migration.&rdquo;
              </p>
              <div className="mt-6 border-t border-[#E3E6EB] pt-4">
                <span className="block text-sm font-bold text-[#1A2535]">Dr. Sunita Rao</span>
                <span className="block text-xs text-[#1A2535]/60">Managing Director · DentalPulse Network</span>
              </div>
            </SpotlightCard>

            {/* Quote 03 */}
            <SpotlightCard className="p-8 bg-[#F6F7F9] flex flex-col justify-between">
              <p className="text-sm sm:text-base text-[#1A2535] leading-relaxed italic">
                &ldquo;Dodail delivered an award-winning brand identity and a sub-second headless Shopify store that increased our average order value by 26%. Exceptional partners.&rdquo;
              </p>
              <div className="mt-6 border-t border-[#E3E6EB] pt-4">
                <span className="block text-sm font-bold text-[#1A2535]">Sarah Jenkins</span>
                <span className="block text-xs text-[#1A2535]/60">VP of Brand · Luminance Global</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* SECTION 15: PARTNER BADGES & CERTIFICATIONS */}
      <section className="py-12 bg-[#F6F7F9] border-y border-[#E3E6EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-bold uppercase tracking-wider text-[#1A2535]/60">
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#E04E08]" />
              <span>Google Premier Partner</span>
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#E04E08]" />
              <span>Meta Agency Partner</span>
            </span>
            <span className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#E04E08]" />
              <span>Next.js &amp; Vercel Enterprise Verified</span>
            </span>
            <span className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#E04E08]" />
              <span>ISO/IEC 27001 Security Aligned</span>
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 16: HYDERABAD STUDIO & CULTURE */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
                Global Delivery Headquarters
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
                Crafted in Hyderabad<span className="text-[#E04E08]">.</span> Deployed Globally<span className="text-[#E04E08]">.</span>
              </h2>
              <p className="mt-4 text-base text-[#1A2535]/70 leading-relaxed">
                Founded in 2019 in Hyderabad, India, Dodail operates from Hirkani Tower, Maruthi Nagar. We bring the engineering discipline of India&apos;s premier tech capital to enterprises and ambitious scale-ups across India, the UAE, and the USA.
              </p>
              <div className="mt-8 space-y-3 border-l-2 border-[#E04E08] pl-4 text-sm text-[#1A2535]">
                <p><strong>Office:</strong> Hirkani Tower, Maruthi Nagar, Hyderabad, Telangana, India</p>
                <p><strong>Operating Hours:</strong> Monday – Saturday: 09:30 – 18:30 IST</p>
                <p><strong>Direct Desk:</strong> +91 99664 00235 · info@dodail.com</p>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#E3E6EB] shadow-lg">
              <Image
                src="/brand/dodail-office-hyderabad.webp"
                alt="Dodail Solutions Hyderabad Headquarters"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17: 3 ENGAGEMENT MODELS */}
      <section className="py-24 bg-[#F6F7F9] border-t border-[#E3E6EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
              Commercial Models
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
              Flexible Ways to Partner<span className="text-[#E04E08]">.</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1 */}
            <SpotlightCard className="p-8 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A2535]/50">Fixed Scope</span>
                <h3 className="mt-2 text-2xl font-bold text-[#1A2535]">Agile Sprint</h3>
                <p className="mt-3 text-sm text-[#1A2535]/70">Best for standalone web platform builds, complete rebranding, or AI workflow architecture.</p>
                <ul className="mt-6 space-y-2.5 text-xs text-[#1A2535]/80">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> Fixed timeline &amp; deliverables</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> Bi-weekly sprint milestones</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> Complete IP &amp; code transfer</li>
                </ul>
              </div>
              <a
                href="https://calendly.com/dodailsolutions/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block text-center rounded-full border border-[#E3E6EB] py-3 text-xs font-bold text-[#1A2535] hover:border-[#1A2535] hover:bg-[#F6F7F9]"
              >
                Inquire for Sprint
              </a>
            </SpotlightCard>

            {/* Model 2 (Featured) */}
            <SpotlightCard className="p-8 bg-white border-2 border-[#E04E08] shadow-xl relative flex flex-col justify-between">
              <BorderBeam size={180} duration={8} />
              <div>
                <span className="rounded-full bg-[#E04E08] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white inline-block">
                  Most Popular
                </span>
                <h3 className="mt-3 text-2xl font-bold text-[#1A2535]">Dedicated Growth Retainer</h3>
                <p className="mt-3 text-sm text-[#1A2535]/70">Continuous engineering pod, technical SEO/GEO, CRO testing, and dedicated design resources.</p>
                <ul className="mt-6 space-y-2.5 text-xs text-[#1A2535]/80">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> Dedicated senior engineers &amp; designers</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> Weekly strategy &amp; progress syncs</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> Live attribution &amp; CRO telemetry</li>
                </ul>
              </div>
              <a
                href="https://calendly.com/dodailsolutions/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block text-center rounded-full bg-[#E04E08] py-3 text-xs font-bold text-white hover:bg-[#D04510] shadow-md"
              >
                Inquire for Retainer
              </a>
            </SpotlightCard>

            {/* Model 3 */}
            <SpotlightCard className="p-8 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A2535]/50">Executive Advisory</span>
                <h3 className="mt-2 text-2xl font-bold text-[#1A2535]">CMO-as-a-Service</h3>
                <p className="mt-3 text-sm text-[#1A2535]/70">Fractional executive leadership to steer your go-to-market strategy, brand positioning, and team alignment.</p>
                <ul className="mt-6 space-y-2.5 text-xs text-[#1A2535]/80">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> Board-level commercial roadmap</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> In-house team hiring &amp; mentoring</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#E04E08]" /> Cross-border expansion architecture</li>
                </ul>
              </div>
              <a
                href="https://calendly.com/dodailsolutions/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block text-center rounded-full border border-[#E3E6EB] py-3 text-xs font-bold text-[#1A2535] hover:border-[#1A2535] hover:bg-[#F6F7F9]"
              >
                Inquire for CMO
              </a>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* SECTION 18: INSIGHTS & THOUGHT LEADERSHIP */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E3E6EB]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
                Engineering &amp; Strategy Perspectives
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
                Intelligence for Modern Operators<span className="text-[#E04E08]">.</span>
              </h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-[#E04E08] hover:underline flex items-center gap-1">
              <span>View all articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard className="p-6 bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E04E08]">GEO / AI Search</span>
              <h3 className="mt-2 text-xl font-bold text-[#1A2535] hover:text-[#E04E08] transition-colors">
                How to Optimize for Search Generative Experience &amp; Perplexity in 2026
              </h3>
              <p className="mt-2 text-xs text-[#1A2535]/70 leading-relaxed">
                Why traditional keywords are being replaced by vector citations and knowledge graph grounding.
              </p>
              <span className="mt-4 block text-[11px] font-mono text-[#1A2535]/50">6 min read · Engineering</span>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E04E08]">Web Performance</span>
              <h3 className="mt-2 text-xl font-bold text-[#1A2535] hover:text-[#E04E08] transition-colors">
                The Revenue Impact of Sub-18ms Edge Caching on Enterprise B2B Conversions
              </h3>
              <p className="mt-2 text-xs text-[#1A2535]/70 leading-relaxed">
                Auditing 140 client deployments: every 100ms decrease in LCP yields a 3.4% lift in form completions.
              </p>
              <span className="mt-4 block text-[11px] font-mono text-[#1A2535]/50">8 min read · Next.js Edge</span>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E04E08]">Brand Strategy</span>
              <h3 className="mt-2 text-xl font-bold text-[#1A2535] hover:text-[#E04E08] transition-colors">
                Brand Equity vs Performance Ads: Balancing Immediate CAC with Long-Term Multiples
              </h3>
              <p className="mt-2 text-xs text-[#1A2535]/70 leading-relaxed">
                How enterprise scale-ups prevent commoditization by investing in distinctive digital brand assets.
              </p>
              <span className="mt-4 block text-[11px] font-mono text-[#1A2535]/50">5 min read · Growth Strategy</span>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* SECTION 19: FAQ ACCORDION */}
      <section id="faq" className="py-24 bg-[#F6F7F9] border-t border-[#E3E6EB]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
              Clear Answers
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#1A2535]">
              Frequently Asked Questions<span className="text-[#E04E08]">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E3E6EB] bg-white overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-base sm:text-lg text-[#1A2535] hover:text-[#E04E08] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#E04E08] transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="border-t border-[#E3E6EB] p-6 pt-4 text-sm text-[#1A2535]/70 leading-relaxed bg-[#F6F7F9]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 20: FINAL CTA & GIANT ARCHITECTURAL FOOTER */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Peach CTA Box */}
          <div className="rounded-[36px] bg-[#F2D5C4]/40 border border-[#E04E08]/20 p-8 sm:p-14 lg:p-20 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E04E08]">
                  Ready for Measurable Growth?
                </span>
                <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A2535] leading-tight">
                  Let&apos;s build something that sets the industry standard<span className="text-[#E04E08]">.</span>
                </h2>
                <p className="mt-4 text-base text-[#1A2535]/70 max-w-lg">
                  Book a free 15-minute discovery consultation. We&apos;ll audit your current digital footprint and propose high-leverage growth solutions.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://calendly.com/dodailsolutions/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#E04E08] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#E04E08]/20 hover:bg-[#D04510] transition-all hover:scale-105"
                  >
                    <span>Book 15-Min Strategy Call</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:marketing@dodail.in"
                    className="inline-flex items-center gap-2 rounded-full border border-[#1A2535]/30 bg-white px-7 py-4 text-sm font-semibold text-[#1A2535] hover:bg-white"
                  >
                    <span>Direct: marketing@dodail.in</span>
                  </a>
                </div>
              </div>

              {/* Quick Inquiry Form */}
              <div className="lg:col-span-5 rounded-[24px] bg-white p-6 sm:p-8 border border-[#E3E6EB] shadow-xl">
                <h3 className="text-lg font-bold text-[#1A2535]">Send Direct Brief</h3>
                <p className="text-xs text-[#1A2535]/60 mt-0.5">Response within 4 business hours.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = "mailto:marketing@dodail.in?subject=Dodail Growth Inquiry";
                  }}
                  className="mt-4 space-y-3"
                >
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A2535]/70">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="mt-1 w-full rounded-xl border border-[#E3E6EB] px-3.5 py-2.5 text-xs text-[#1A2535] focus:border-[#E04E08] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A2535]/70">Corporate Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="mt-1 w-full rounded-xl border border-[#E3E6EB] px-3.5 py-2.5 text-xs text-[#1A2535] focus:border-[#E04E08] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A2535]/70">Primary Growth Goal</label>
                    <select className="mt-1 w-full rounded-xl border border-[#E3E6EB] px-3.5 py-2.5 text-xs text-[#1A2535] focus:border-[#E04E08] focus:outline-none">
                      <option>Scale Qualified Inbound Leads (SEO / GEO)</option>
                      <option>Architect New Web / App Platform</option>
                      <option>Complete Rebranding &amp; Positioning</option>
                      <option>CMO-as-a-Service Advisory</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 rounded-full bg-[#1A2535] py-3 text-xs font-bold text-white hover:bg-[#E04E08] transition-colors"
                  >
                    Submit Project Brief
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Giant Architectural Wordmark */}
          <div className="mt-20 overflow-hidden text-center select-none" aria-hidden="true">
            <span className="font-display text-[14vw] font-extrabold tracking-tighter text-[#1A2535]/10 leading-none block">
              dodail<span className="text-[#E04E08]">.</span>
            </span>
          </div>

          {/* Footer Details Strip */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#E3E6EB] pt-8 text-xs text-[#1A2535]/60">
            <div>
              © 2019–2026 Dodail Solutions Pvt Ltd. Hirkani Tower, Maruthi Nagar, Hyderabad, India.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy/" className="hover:text-[#E04E08]">Privacy Policy</Link>
              <Link href="/terms-of-use/" className="hover:text-[#E04E08]">Terms of Service</Link>
              <a href="#main-content" className="hover:text-[#E04E08]">Back to Top ↑</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
