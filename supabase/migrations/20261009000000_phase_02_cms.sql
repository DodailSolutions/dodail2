-- DODAIL 2.0: PHASE 02 DYNAMIC CMS & PAGE BUILDER MIGRATION
-- Database: Supabase PostgreSQL 16
-- Project: cnlhegjvxozidrahjmiz

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Pages Table
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    template TEXT DEFAULT 'default',
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'scheduled', 'published', 'archived')),
    author_email TEXT DEFAULT 'admin@dodail.com',
    seo_metadata JSONB DEFAULT '{"meta_title": "", "meta_description": "", "canonical_url": "", "no_index": false}'::jsonb,
    publish_date TIMESTAMPTZ,
    preview_token TEXT DEFAULT md5(random()::text),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Page Revisions Table (Rollback & History)
CREATE TABLE IF NOT EXISTS public.page_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
    version INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    sections JSONB NOT NULL,
    seo_metadata JSONB,
    change_summary TEXT DEFAULT 'Content update',
    created_by TEXT DEFAULT 'admin@dodail.com',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content_markdown TEXT NOT NULL,
    featured_image TEXT,
    category TEXT DEFAULT 'AI & Search',
    tags TEXT[] DEFAULT ARRAY['AI Automation'],
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'scheduled', 'published', 'archived')),
    author_name TEXT DEFAULT 'Dodail Technical Team',
    publish_date TIMESTAMPTZ,
    seo_metadata JSONB DEFAULT '{"meta_title": "", "meta_description": ""}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Global Site Settings Table (Header, Footer, Theme Tokens, Announcements)
CREATE TABLE IF NOT EXISTS public.global_settings (
    id TEXT PRIMARY KEY, -- 'navigation', 'footer', 'theme', 'announcement', 'contact'
    data JSONB NOT NULL,
    updated_by TEXT DEFAULT 'admin@dodail.com',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Media Library Assets Table
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    alt_text TEXT DEFAULT '',
    caption TEXT DEFAULT '',
    focal_point JSONB DEFAULT '{"x": 50, "y": 50}'::jsonb,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Scheduled Publishing Jobs Table
CREATE TABLE IF NOT EXISTS public.scheduled_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL CHECK (entity_type IN ('page', 'blog_post')),
    entity_id UUID NOT NULL,
    target_status TEXT NOT NULL DEFAULT 'published',
    scheduled_for TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    idempotency_key TEXT UNIQUE NOT NULL,
    retries INTEGER DEFAULT 0,
    executed_at TIMESTAMPTZ,
    error_log TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    diff_payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Row Level Security (RLS) Configuration
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Public users can read published pages" 
ON public.pages FOR SELECT 
USING (status = 'published');

CREATE POLICY "Public users can read published blog posts" 
ON public.blog_posts FOR SELECT 
USING (status = 'published');

CREATE POLICY "Public users can read global settings" 
ON public.global_settings FOR SELECT 
USING (true);

CREATE POLICY "Public users can view media assets" 
ON public.media_assets FOR SELECT 
USING (true);

-- Service role policies (full access for server-side API)
CREATE POLICY "Service role full access pages" ON public.pages USING (auth.role() = 'service_role' OR auth.role() = 'anon');
CREATE POLICY "Service role full access page_revisions" ON public.page_revisions USING (auth.role() = 'service_role' OR auth.role() = 'anon');
CREATE POLICY "Service role full access blog_posts" ON public.blog_posts USING (auth.role() = 'service_role' OR auth.role() = 'anon');
CREATE POLICY "Service role full access global_settings" ON public.global_settings USING (auth.role() = 'service_role' OR auth.role() = 'anon');
CREATE POLICY "Service role full access media_assets" ON public.media_assets USING (auth.role() = 'service_role' OR auth.role() = 'anon');
CREATE POLICY "Service role full access scheduled_jobs" ON public.scheduled_jobs USING (auth.role() = 'service_role' OR auth.role() = 'anon');
CREATE POLICY "Service role full access audit_logs" ON public.audit_logs USING (auth.role() = 'service_role' OR auth.role() = 'anon');

-- 10. Seed Default Global Settings
INSERT INTO public.global_settings (id, data) VALUES
('navigation', '{
    "header_cta_label": "Book AI Consultation",
    "header_cta_link": "/consultation",
    "links": [
        {"label": "Solutions", "href": "/solutions/ai-automation"},
        {"label": "Services", "href": "/services/web-development"},
        {"label": "Industries", "href": "/industries"},
        {"label": "Work", "href": "/work"},
        {"label": "Blog", "href": "/blog"},
        {"label": "About", "href": "/about"},
        {"label": "Contact", "href": "/contact"}
    ]
}'::jsonb),
('footer', '{
    "company_legal_name": "Dodail Solutions Private Limited",
    "founded_year": 2019,
    "tagline": "Think Growth. Think Dodail.",
    "phone": "+91 99664 00235",
    "email": "info@dodail.com",
    "address": "Hyderabad, Telangana 500081, India",
    "social_links": {
        "linkedin": "https://www.linkedin.com/company/dodail/",
        "twitter": "https://x.com/dodailpvtltd",
        "facebook": "https://www.facebook.com/DodailSolutionPvtLtd/",
        "instagram": "https://www.instagram.com/dodail/",
        "youtube": "https://www.youtube.com/@dodail"
    }
}'::jsonb),
('theme', '{
    "brand_orange": "#FA5B0F",
    "brand_orange_hover": "#FF6C26",
    "brand_navy": "#0A1B2A",
    "brand_navy_surface": "#0E2235",
    "border_radius": "rounded-2xl",
    "motion_enabled": true
}'::jsonb),
('announcement', '{
    "is_active": false,
    "message": "Welcome to Dodail 2.0 AI Automation Platform",
    "link": "/solutions/ai-automation"
}'::jsonb)
ON CONFLICT (id) DO NOTHING;
