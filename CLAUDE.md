# CLAUDE.md — Dodail website (dodail2.0)

Project memory for Claude Code. Read this first; keep it current. Action plans live in [TASK.md](TASK.md).

## What this is

Marketing site, CMS/admin, CRM and AI sales assistant ("Gita") for **Dodail Solutions Pvt Ltd** (Hyderabad).
Repo: `github.com/DodailSolutions/dodail2`. Production = **Vercel**, deployed from `main`.

## Stack

- Next.js **16.4.3** (App Router, webpack: `next dev --webpack`, `next build --webpack`), React 19, TypeScript, Tailwind CSS v4.
- three.js + `@react-three/fiber` for the particle scene (no `drei` in the bundle); framer-motion; lucide-react.
- Supabase (Postgres + RLS) for CMS/CRM; local JSON fallback (`cms-store.json`, gitignored).
- pnpm 10 (`packageManager` pinned). Node 24.
- `AGENTS.md` says this Next.js has breaking changes: read `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Commands

```bash
pnpm dev            # next dev --webpack  (http://localhost:3000)
pnpm build          # next build --webpack && node scripts/check-content.js  (the content gate)
pnpm test           # scripts/verify-routes.js
pnpm exec tsc --noEmit   # type check (ignore stale .next/dev types: clear .next if it complains)
```

## Layout

```
src/app/            routes (marketing pages, /admin, /api/*, sitemaps, llms.txt, opengraph-image)
src/components/
  3d/               particle scene (see below)
  home/             homepage sections (sections/*), homeUi.tsx (Zone, buttons, Eyebrow)
  layout/           Navbar, Footer, MobileTabBar, AIChatLauncher (Gita), Breadcrumbs
  theme/            ThemeProvider + ThemeToggle
  ui/ cms/ forms/ seo/ templates/ admin/ motion/ sections/ ai/
src/lib/            cms (content defaults + store), supabase, crm, booking, automation, ai, seo, integrations
src/proxy.ts        410 Gone for old WordPress spam URLs
supabase/migrations/  SQL (CMS tables, revisions)
scripts/            check-content.js, verify-routes.js, production-readiness-test.js
```

## The particle scene (three.js)

- One persistent canvas (`OperationsCanvasHost`, fixed overlay) draws one `ParticleField`; every page "zone"
  (`<Zone phase="...">` in `homeUi.tsx`) anchors a **point-cloud shape** from `particleShapes.ts`
  (hero brain, **about: corporate building**, problem icons, services, pipeline, industries, process). Particles morph between shapes on the GPU.
- Shapes are pure math (no three import) so `CanvasFallback.tsx` renders the same shape as an SVG poster / no-WebGL fallback.
- Colour tags: palette (-1), blue (-2), gold (-3), bokeh (-4), **orange (-5, signboard)**, **white (-6, wordmark; ink on light)**.
- Light theme: `ParticleField` switches to normal blending, ink-blended colours and crisper dots (`uLight`); dark keeps additive glow.
- Canvas z-index: `z-0` in the **hero** and **cta** phases (content sits above), `z-[15]` elsewhere. A `Zone` adds `relative`:
  give it an explicit size (wrap it in a sized container) or it measures 0px.
- Gating: dynamic import after idle; skipped for reduced-motion, no WebGL, ≤2 cores / ≤2 GB / save-data; paused when the tab or zone is off-screen.
  Point count adapts to device (`pointCount()`).
- Hero "floating chips" are DOM elements over the canvas (visible on mobile too).

## Theming and brand decisions (do not undo without asking)

- Theme = `<html data-theme="light|dark">` set pre-paint by `ThemeScript`; tokens in `globals.css` (`--bg`, `--fg`, `--surface`…); custom Tailwind variant `light:`.
  Avoid `useTheme()` for markup (hydration mismatch); use `light:` classes. `ThemeProvider` re-asserts the attribute if missing (404 shell).
- **Brand orange = the logo orange `#FA5B0F`** (sampled from `public/brand/dodail-logo.png`), hover `#E04E08`. Used everywhere (buttons, text, particles).
- **Orange buttons use WHITE text** in both themes (user decision). White on #FA5B0F is ~2.8:1 (below WCAG AA); known trade-off.
- Cyan text is darkened to teal (#0F766E) on light only (bright cyan is ~1.8:1).
- About section = particle **corporate building with the Dodail signboard** (the old Buddha photo and its code are gone).
- Mobile: one floating Gita button (the separate video button is `sm:`+ only); tap targets ≥ 40px; min text 11px.
- Fonts: CSS names Poppins/Sora but they are **not loaded** (system fallback). Open question in TASK.md.

## Deploy and git workflow

- Work on a branch, verify, then **fast-forward `main`** (`git merge --ff-only`) and `git push origin main` → Vercel production.
  The user explicitly approves each merge to `main` (it deploys). No `gh` CLI installed: PRs are created in the GitHub UI.
- The Vercel adapter (Next 16.4+) moves prerendered HTML to `.next/output/functions/*.prerender-fallback.html`;
  `scripts/check-content.js` scans `.next/server/app` **then** `.next/output`. Locally pages are in `.next/server/app`.
  **Not yet confirmed on a Vercel deploy** (see TASK.md).
- `experimental.agentUpgrade: "security"` is set in `next.config.ts` (Next security upgrade marker).

## Environment variables (names only; never commit values)

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`ADMIN_SESSION_SECRET` (all required in production for /admin), `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`,
`GOOGLE_CALENDAR_ID`, `DEFAULT_GOOGLE_SPREADSHEET_ID`, `RAZORPAY_WEBHOOK_SECRET`, `PAYMENT_WEBHOOK_SECRET`, `META_PAGE_ACCESS_TOKEN`,
`META_APP_SECRET`, `LINKEDIN_*`, `CRON_SECRET`. See `.env.example`.

## Environment gotchas (learned the hard way)

- **Shell writes are blocked in this project** (macOS `com.apple.macl`): `touch/cp/mv/rm/mkdir`, `>` redirects, `cat >` fail with
  "Operation not permitted". Use the **Write/Edit tools** or `node -e "require('fs')..."`. Clear caches with
  `node -e "require('fs').rmSync('.next',{recursive:true,force:true})"`. Scratch files go in the session scratchpad.
- Dev server + `pnpm build` share `.next`: **stop the dev server before building**; after a branch switch restart it (stale chunks → ChunkLoadError).
- The page uses a smooth-scroll library: `scrollIntoView`/`window.scrollTo` can be swallowed; wheel scrolling and `scrollTo({behavior:'instant'})` work.
- First dev load is slow (compile); the hero fades in after hydration, so wait ~10 s before judging a screenshot.
- Vercel's CLI `vercel build` needs login; deploy logs are the only way to see the Vercel output layout.

## Security and data state (user action required)

- **Supabase service-role key was hardcoded and pushed** (commit 5529439, 2026-10-10). Removed from code (env vars only) but it is
  **still in git history: the user must rotate it** (Supabase → Settings → API) and update Vercel env vars.
- **Supabase CMS migrations were never run** (as of 2026-10-10): `site_content`, `blog_posts`, `pages`, `page_revisions`, `media_assets`,
  `site_content_revisions` do not exist, so CMS edits only persist to local JSON (lost on Vercel). Run `supabase/migrations/*.sql`; check `/api/health`.
  The phase_02 SQL was fixed first (TEXT ids; service-role-only writes). Locally `/case-studies/` 404s because no data loads.

## Verification checklist before telling the user it's done

1. `pnpm exec tsc --noEmit` clean. 2. Look at it in the browser (both themes; phone viewport 375×812 for UI work).
3. For anything that ships: stop dev, `pnpm build` (exit 0 + "check-content passed"). 4. Commit with the project trailer; push the branch.
5. Ask before merging to `main`.

Audit scripts used in past sessions (re-create if needed): a light-mode **contrast audit** (computed colour vs resolved background per text node)
and a **mobile audit** (horizontal overflow, tap targets < 40px, text < 11px, fixed overlays), both run via the browser JS tool.
