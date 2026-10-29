# TASK.md — Dodail action plan

Single place for what's done, in progress and next. Update it at the end of every working session.
Project facts and rules live in [CLAUDE.md](CLAUDE.md).

Legend: `[x]` done · `[ ]` to do · **you** = needs the owner (credentials / dashboards / decisions) · **claude** = can be done in a session.

---

## 0. In progress — branch `feat/about-particle-image`

- [x] About section: Buddha photo removed; the **Dodail HQ artwork is drawn as ~44k coloured three.js particles** (own canvas: assemble-on-scroll, shimmer, pointer ripple), logo on the signboard legible; transparent artwork texture doubles as poster/fallback. See CLAUDE.md.
- [x] Shader: per-particle colour morphing, photo tags (-7/-8), bokeh faded on light, gold half-vivid on light.
- [x] Floating hero chips now visible on mobile (compact size).
- [x] Performance: dead code removed (`AwwwardsHomepage`, `WorkflowSimulator`, `AutonomousBrainCore`, orphaned 647 KB JPEG); `next.config` image formats (AVIF/WebP), `optimizePackageImports`, `/brand` cache headers, `poweredByHeader` off; device-adaptive particle count.
- [x] `CLAUDE.md` and `TASK.md` created.
- [x] Verified building + chips on desktop (light + dark) and a 375×812 phone (light). Still to eyeball: dark mode on the phone, tablet widths.
- [ ] **you** — review the building in the browser, then approve a fast-forward merge to `main`.

---

## 1. P0 — Security and data (blocks "production ready")

- [ ] **you** — **Rotate the Supabase service-role key** (it is in git history, commit 5529439) and set the new key in Vercel env vars.
- [ ] **you** — **Run the Supabase migrations** in `supabase/migrations/` (CMS tables are missing; CMS edits are not persisting in production). Then check `/api/health` shows the database connected.
- [ ] **you** — Confirm `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` are set in Vercel (the admin refuses to start in production without them).
- [ ] **claude** — After migrations: verify `/case-studies/`, `/blog`, admin CMS save/restore against Supabase.

## 2. P0 — Deploy confirmation

- [ ] **you** — Paste the Vercel deploy log for the latest `main` commit. The content gate was changed to scan `.next/output` (Next 16.4+ adapter) and has **not** been confirmed on Vercel.
- [ ] **claude** — If it fails: read the `[vercel diagnostics]` lines (the gate prints where the HTML is) and point the scan at the real path. Never make the gate skip silently.

## 3. P1 — Performance (measure, then fix)

Current build (Next 16.4.3): client JS ≈ 824 KB gzip over 130 files; three.js ≈ 236 KB gzip, lazy-loaded after first paint; drei not bundled.

- [ ] **claude** — Run Lighthouse (mobile + desktop) against the Vercel preview/production and record LCP, CLS, INP, TBT here.
- [ ] **claude** — Hero LCP: the hero text is `initial="hidden"` (framer-motion) so it is invisible until hydration. Render it visible server-side and animate with CSS, or shorten the stagger.
- [ ] **claude** — Cache the `[data-scene-zone]` query in `OperationsCanvasHost` (it runs `querySelectorAll` + layout reads on every scroll frame).
- [ ] **claude** — Convert `public/brand/gita-avatar.png|jpg` (639 KB each) to a small WebP (≈256 px); `next/image` already resizes at request time, so this mainly shrinks the repo and cold cache.
- [ ] **claude** — Code-split heavy home sections below the fold (`dynamic()` for Pipeline/Industries/Process) if Lighthouse shows main-thread pressure.
- [ ] **you / claude** — Decide on fonts: CSS names Poppins/Sora but they are not loaded. Either load them with `next/font` (cost: ~20-40 KB) or drop the names.
- [ ] **claude** — Consider `content-visibility: auto` for tall below-fold sections (test carefully: the scene anchors to zone rects).

## 4. P1 — UX across devices

- [x] Mobile pass 1: hero CTAs, particles, single floating button, 11 px text floor, footer/breadcrumb tap targets.
- [ ] **claude** — Phone audit of the pages not yet checked: products, FAQ, industries/*, work + work/[slug], case-studies/[slug], blog/[slug], services/[slug]/[sub], consultation, privacy/terms.
- [ ] **claude** — Tablet (768 / 1024) and large-desktop (1440+) pass; check the building card and the hero chips at each breakpoint.
- [ ] **claude** — Landscape phone: the pinned stage panels (problem / services) can fill the screen; verify.
- [ ] **claude** — Keyboard + screen-reader pass (focus rings on orange, skip link, accordion semantics, reduced-motion path).
- [ ] **claude** — Light-mode contrast audit of the pages not yet scripted (case studies, work/[slug], services/[slug]); add interactive states (menus, modals, chat).

## 5. P2 — Design decisions to confirm

- [ ] **you** — White text on the logo orange is ~2.8:1 (below WCAG AA). Keep as is, or use a slightly deeper orange for button backgrounds only.
- [ ] **you** — About art: confirm you are happy with the look (it reproduces the supplied art). Could add a tilt/parallax on pointer or a looping "scan" shimmer.
- [ ] **you** — Gita avatar and chat panel are always white/dark regardless of theme; make them theme-aware?

## 6. P2 — Housekeeping

- [ ] **claude** — Delete the merged branches on GitHub (`fix/*`, `feat/light-dark-theme`, `chore/upgrade-next-16.4.3`) once you are happy.
- [ ] **claude** — Add a lightweight smoke test (`verify-routes` already exists): add a check that no page contains the Buddha/old placeholder content and that the signboard text renders.
- [ ] **claude** — Replace the stale `README.md` (create-next-app boilerplate) with a short pointer to `CLAUDE.md`.
- [ ] **claude** — Re-create the contrast and mobile audit scripts under `scripts/` so they are reusable.

---

## Done log (newest first)

- 2026-10-29 — About building rebuilt as a textured particle grid (logo legible); earlier sampled-cloud attempt discarded.
- 2026-10-29 — Corporate building + signboard, mobile chips, perf cleanup, CLAUDE.md/TASK.md.
- 2026-10-29 — Mobile UX pass; Services light-mode polish; logo orange `#FA5B0F` site-wide; white-on-orange buttons; contrast audit (14 pages); hero chip layering; merged to `main`.
- 2026-10-29 — Next.js 16.4.0 → 16.4.3 security upgrade; Vercel content gate fix (`.next/output`); light/dark theme + hydration fix.
