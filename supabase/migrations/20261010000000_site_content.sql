-- Site Content: editable copy for every public page, one JSON document per key
-- (e.g. 'home', 'site/navigation', 'solutions/ai-lead-management').
-- Documents are validated against code-defined defaults before they are stored,
-- and missing fields fall back to those defaults when read.

CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_by TEXT NOT NULL DEFAULT 'admin@dodail.com',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Published site copy is public.
CREATE POLICY "Public users can read site content"
ON public.site_content FOR SELECT
USING (true);

-- Only the server (service role) may write. Unlike the phase 02 tables, the
-- anon role is deliberately NOT granted write access here.
CREATE POLICY "Service role writes site content"
ON public.site_content FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
