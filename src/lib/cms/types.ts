export type PageStatus = "draft" | "review" | "approved" | "scheduled" | "published" | "archived";

export type BlockType =
  | "hero"
  | "rich_text"
  | "image"
  | "video"
  | "cards"
  | "stats"
  | "services"
  | "testimonials"
  | "case_studies"
  | "faqs"
  | "pricing"
  | "cta"
  | "logo_strip";

export interface BaseBlock {
  id: string;
  type: BlockType;
  enabled?: boolean;
}

export interface HeroBlock extends BaseBlock {
  type: "hero";
  badge?: string;
  headline: string;
  subheadline: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
}

export interface RichTextBlock extends BaseBlock {
  type: "rich_text";
  title?: string;
  headline?: string;
  content?: string; // sanitized markdown or safe html
  contentHtml?: string;
  maxWidth?: "sm" | "md" | "lg" | "full";
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  imageUrl: string;
  altText: string;
  caption?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "auto";
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  embedUrl: string; // validated youtube or vimeo allowlist only
  provider: "youtube" | "vimeo";
  title?: string;
}

export interface CardsBlock extends BaseBlock {
  type: "cards";
  badge?: string;
  title: string;
  description?: string;
  columns?: 2 | 3 | 4;
  items: Array<{
    title: string;
    description: string;
    icon?: string;
    link?: string;
  }>;
}

export interface StatsBlock extends BaseBlock {
  type: "stats";
  title?: string;
  items: Array<{
    value: string;
    label: string;
    sublabel?: string;
  }>;
}

export interface ServicesBlock extends BaseBlock {
  type: "services";
  badge?: string;
  title: string;
  description?: string;
  items: Array<{
    title: string;
    description: string;
    icon?: string;
    tag?: string;
    href?: string;
  }>;
}

export interface TestimonialsBlock extends BaseBlock {
  type: "testimonials";
  badge?: string;
  title: string;
  description?: string;
  items: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    verified?: boolean;
  }>;
}

export interface CaseStudiesBlock extends BaseBlock {
  type: "case_studies";
  badge?: string;
  title: string;
  description?: string;
  items: Array<{
    title: string;
    sector: string;
    problem: string;
    architecture: string;
    outcome: string;
    techStack?: string[];
  }>;
}

export interface FAQsBlock extends BaseBlock {
  type: "faqs";
  badge?: string;
  title: string;
  description?: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export interface CTABlock extends BaseBlock {
  type: "cta";
  badge?: string;
  headline?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonLabel?: string;
  secondaryButtonLink?: string;
}

export interface LogoStripBlock extends BaseBlock {
  type: "logo_strip";
  title?: string;
  items: Array<{
    name: string;
    logoUrl?: string;
  }>;
}

export type CMSBlock =
  | HeroBlock
  | RichTextBlock
  | ImageBlock
  | VideoBlock
  | CardsBlock
  | StatsBlock
  | ServicesBlock
  | TestimonialsBlock
  | CaseStudiesBlock
  | FAQsBlock
  | CTABlock
  | LogoStripBlock;

export interface SEOMetadata {
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  no_index?: boolean;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  template: string;
  sections: CMSBlock[];
  status: PageStatus;
  author_email: string;
  seo_metadata?: SEOMetadata;
  publish_date?: string | null;
  preview_token?: string;
  created_at: string;
  updated_at: string;
}

export interface PageRevision {
  id: string;
  page_id: string;
  version: number;
  title: string;
  sections: CMSBlock[];
  seo_metadata?: SEOMetadata;
  change_summary?: string;
  created_by?: string;
  author_email?: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  content_markdown?: string;
  featured_image?: string;
  category: string;
  tags: string[];
  status: PageStatus;
  author?: string;
  author_name?: string;
  publish_date?: string | null;
  seo_metadata?: SEOMetadata;
  created_at: string;
  updated_at: string;
}

export interface GlobalNavigation {
  header_cta_label: string;
  header_cta_link: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface GlobalFooter {
  company_legal_name: string;
  founded_year: number;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface GlobalTheme {
  brand_orange: string;
  brand_orange_hover: string;
  brand_navy: string;
  brand_navy_surface: string;
  border_radius: string;
  motion_enabled: boolean;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  alt_text: string;
  caption?: string;
  focal_point?: { x: number; y: number };
  usage_count: number;
  created_at: string;
}
