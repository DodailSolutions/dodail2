-- CMS v3: version history for Site Content documents, plus blog post fields
-- used by the Blog Studio (reading time is computed; these are editorial fields).

CREATE TABLE IF NOT EXISTS public.site_content_revisions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    key TEXT NOT NULL,
    data JSONB NOT NULL,
    note TEXT DEFAULT '',
    created_by TEXT NOT NULL DEFAULT 'admin@dodail.com',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS site_content_revisions_key_created_idx
    ON public.site_content_revisions (key, created_at DESC);

ALTER TABLE public.site_content_revisions ENABLE ROW LEVEL SECURITY;

-- History is admin-only: no public read policy, server (service role) only.
CREATE POLICY "Service role manages site content revisions"
ON public.site_content_revisions FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS featured_image_alt TEXT DEFAULT '';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS blog_posts_status_publish_idx ON public.blog_posts (status, publish_date DESC);
