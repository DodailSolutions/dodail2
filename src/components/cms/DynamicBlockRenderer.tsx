import React from "react";
import Link from "next/link";
import { CMSBlock } from "@/lib/cms/types";
import { CheckCircle2, ChevronRight, Play, MessageSquare, Zap, Shield, Sparkles } from "lucide-react";

interface DynamicBlockRendererProps {
  sections: CMSBlock[];
  previewMode?: boolean;
}

export function DynamicBlockRenderer({ sections, previewMode = false }: DynamicBlockRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        <p>No content sections configured on this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {sections.map((block) => {
        switch (block.type) {
          case "hero":
            return <HeroBlockView key={block.id} block={block} />;
          case "rich_text":
            return <RichTextBlockView key={block.id} block={block} />;
          case "cards":
            return <CardsBlockView key={block.id} block={block} />;
          case "services":
            return <ServicesBlockView key={block.id} block={block} />;
          case "stats":
            return <StatsBlockView key={block.id} block={block} />;
          case "testimonials":
            return <TestimonialsBlockView key={block.id} block={block} />;
          case "case_studies":
            return <CaseStudiesBlockView key={block.id} block={block} />;
          case "faqs":
            return <FaqsBlockView key={block.id} block={block} />;
          case "cta":
            return <CtaBlockView key={block.id} block={block} />;
          case "logo_strip":
            return <LogoStripBlockView key={block.id} block={block} />;
          case "video":
            return <VideoBlockView key={block.id} block={block} />;
          default:
            return (
              <div key={(block as any).id} className="p-4 bg-slate-900 border border-slate-800 text-xs text-slate-400">
                Unknown section block type: {(block as any).type}
              </div>
            );
        }
      })}
    </div>
  );
}

// 1. Hero Block
function HeroBlockView({ block }: { block: any }) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 border-b border-slate-800/60 bg-[#07131F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {block.badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FA5B0F]/10 text-[#FA5B0F] border border-[#FA5B0F]/20 font-mono mb-6">
            {block.badge}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          {block.headline}
        </h1>
        {block.subheadline && (
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {block.subheadline}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {block.ctaPrimaryLabel && (
            <Link
              href={block.ctaPrimaryLink || "/consultation"}
              className="px-6 py-3 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-sm transition shadow-sm"
            >
              {block.ctaPrimaryLabel}
            </Link>
          )}
          {block.ctaSecondaryLabel && (
            <Link
              href={block.ctaSecondaryLink || "/solutions/ai-automation"}
              className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition"
            >
              {block.ctaSecondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

// 2. Rich Text Block
function RichTextBlockView({ block }: { block: any }) {
  return (
    <section className="py-16 bg-[#07131F] border-b border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {block.badge && (
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 mb-4">
            {block.badge}
          </div>
        )}
        {block.title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            {block.title}
          </h2>
        )}
        <div
          className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: block.contentHtml }}
        />
      </div>
    </section>
  );
}

// 3. Cards Block
function CardsBlockView({ block }: { block: any }) {
  return (
    <section className="py-16 bg-[#0A1B2A]/40 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {block.badge && (
            <span className="text-xs font-mono uppercase tracking-wider text-[#FA5B0F] block mb-2">
              {block.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {block.title}
          </h2>
          {block.description && (
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              {block.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {block.items?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-6 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
              {item.linkText && item.linkHref && (
                <Link
                  href={item.linkHref}
                  className="mt-4 text-xs font-medium text-[#FA5B0F] hover:underline inline-flex items-center gap-1"
                >
                  <span>{item.linkText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. Services Block
function ServicesBlockView({ block }: { block: any }) {
  return (
    <section className="py-16 bg-[#07131F] border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {block.badge && (
            <span className="text-xs font-mono uppercase tracking-wider text-[#FA5B0F] block mb-2">
              {block.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {block.title}
          </h2>
          {block.description && (
            <p className="mt-3 text-sm text-slate-400">{block.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.items?.map((srv: any, idx: number) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FA5B0F]/10 text-[#FA5B0F] flex items-center justify-center font-bold text-sm mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{srv.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{srv.description}</p>
              {srv.href && (
                <Link
                  href={srv.href}
                  className="text-xs font-medium text-slate-300 hover:text-white inline-flex items-center gap-1"
                >
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. Stats Block
function StatsBlockView({ block }: { block: any }) {
  return (
    <section className="py-14 bg-[#0A1B2A] border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {block.items?.map((item: any, idx: number) => (
            <div key={idx} className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-[#FA5B0F] font-mono">
                {item.value}
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. Testimonials Block
function TestimonialsBlockView({ block }: { block: any }) {
  return (
    <section className="py-16 bg-[#07131F] border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {block.badge && (
            <span className="text-xs font-mono uppercase tracking-wider text-[#FA5B0F] block mb-2">
              {block.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{block.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.items?.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <p className="text-xs text-slate-300 italic mb-6 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="border-t border-slate-800 pt-4">
                <div className="font-semibold text-xs text-white">{item.author}</div>
                <div className="text-[11px] text-slate-400">{item.role}, {item.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. Case Studies Block
function CaseStudiesBlockView({ block }: { block: any }) {
  return (
    <section className="py-16 bg-[#0A1B2A]/50 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">{block.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.items?.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <span className="text-[10px] font-mono uppercase text-[#FA5B0F] tracking-wider block mb-2">
                {item.industry}
              </span>
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{item.outcome}</p>
              <div className="p-3 bg-slate-950 rounded text-xs font-mono text-emerald-400">
                {item.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. FAQs Block
function FaqsBlockView({ block }: { block: any }) {
  return (
    <section className="py-16 bg-[#07131F] border-b border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{block.title}</h2>
          {block.description && (
            <p className="text-xs text-slate-400 mt-2">{block.description}</p>
          )}
        </div>
        <div className="space-y-4">
          {block.items?.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <h3 className="font-semibold text-sm text-white mb-2">{item.question}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 9. CTA Block
function CtaBlockView({ block }: { block: any }) {
  return (
    <section className="py-16 bg-[#0A1B2A] border-b border-slate-800/60 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          {block.title}
        </h2>
        {block.description && (
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8">
            {block.description}
          </p>
        )}
        <Link
          href={block.buttonLink || "/consultation"}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FA5B0F] hover:bg-[#FA5B0F]/90 text-white font-medium text-sm transition shadow-sm"
        >
          <span>{block.buttonText || "Get Started"}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// 10. Logo Strip Block
function LogoStripBlockView({ block }: { block: any }) {
  return (
    <section className="py-10 bg-slate-950 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {block.title && (
          <p className="text-xs font-mono uppercase text-slate-500 mb-6 tracking-wider">
            {block.title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-75">
          {block.logos?.map((logo: any, idx: number) => (
            <span key={idx} className="font-semibold text-xs text-slate-400 uppercase tracking-widest">
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// 11. Video Block
function VideoBlockView({ block }: { block: any }) {
  return (
    <section className="py-16 bg-[#07131F] border-b border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {block.title && <h2 className="text-2xl font-bold text-white mb-6">{block.title}</h2>}
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black">
          <iframe
            src={block.videoUrl}
            title={block.title || "Video"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
