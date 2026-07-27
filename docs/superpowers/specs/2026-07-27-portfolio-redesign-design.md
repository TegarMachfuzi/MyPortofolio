# Portfolio Redesign — Design Spec

- **Date:** 2026-07-27
- **Status:** Draft (for review)
- **Owner:** Tegar Machfudzi
- **Project:** `MyPortofolio` — personal portfolio, full modern rebuild

## 1. Overview & Goals

Rebuild the current Create React App portfolio as a modern, recruiter-friendly site on Next.js. The design must be **attractive to recruiters**, **modern**, **fast**, and **easy for the owner to maintain and fill in**.

Primary goals:
- A clean **Minimal Editorial** visual system (light-led) that surfaces value fast and reads as senior/trustworthy.
- Rich, well-structured content across a complete set of portfolio sections.
- **Bilingual English / Bahasa Indonesia**, properly routed and SEO-friendly.
- Modern interactivity: dark mode, subtle scroll animations, a genuinely working contact form.

The owner writes representative copy now and fills in real specifics later; the structure and data model make that trivial.

## 2. Non-Goals (YAGNI)

- No blog/CMS (content is static, in-repo data files).
- No authentication, no admin dashboard.
- No analytics dashboards (a privacy-friendly counter may be added later).
- No 3rd-party auth or database.
- Indonesian copy is provided in full now, but no auto-translation pipeline.

## 3. Stack

- **Next.js 14** (App Router), **TypeScript**, **React 18**
- **Tailwind CSS** (utility-first styling; `dark:` class strategy)
- **Framer Motion** (animations)
- **next-themes** (dark mode, no-flash)
- **React Hook Form + Zod** (form + validation, client & server)
- **Resend** + **react-email** (transactional email for the contact form)
- **Vitest + React Testing Library** (unit/component tests)
- **Deploy:** Vercel (Node runtime for the contact route; static generation for pages)

## 4. Visual Design System — Minimal Editorial

### 4.1 Direction
Light, airy, bold typography, generous whitespace, one warm accent. A serif display face gives personality and distinguishes the site from generic all-sans dev portfolios. Dark theme is a tuned variant, not an inversion.

### 4.2 Color tokens
Light (default):
- Canvas `#FAF7F2` · Surface `#FFFFFF` · Ink `#1A1A1A` · Muted `#6B6760` · Border `#E8E3DA` · Accent (Ember) `#C2410C`

Dark:
- Canvas `#141312` · Surface `#1F1D1A` · Ink `#F5F2EC` · Muted `#A8A29A` · Border `#2E2A25` · Accent `#F97316`

Accent is tunable; default chosen is **Ember** (warm orange-rust). Alternatives considered: Clay `#B1543A`, Indigo `#4F46E5`.

Tokens are defined as CSS variables + Tailwind theme extension (`bg-canvas`, `text-ink`, `text-muted`, `border-line`, `text-accent`, etc.), with `dark:` overrides.

### 4.3 Typography
- **Display/Headlines:** Fraunces (serif), weights 500–700, tight negative tracking.
- **Body/UI/Labels:** Inter, 400–800. Labels are uppercase, tracked, muted.
- Loaded via `next/font` (self-hosted, no layout shift). Fluid type scale via `clamp()`.

### 4.4 Layout primitives
- `Container` max-width ~`72rem`, generous side padding, responsive.
- Generous vertical section rhythm (no forced `100vh` blocks like the current site — content-driven heights with consistent padding).
- Rounded corners `rounded-xl/2xl`, soft hairline borders, subtle surface elevation on cards.
- Nav: **TM.** wordmark (replaces script "Egars"; the script may return as a small personal flourish in the footer if desired).

## 5. Information Architecture

Single scrolling page, **sticky minimalist top nav**. Section order:

1. **Hero** — name, role, location, one-line value proposition, primary CTAs (View work, Download CV).
2. **About** — short narrative bio; current role summary.
3. **Work Experience** — vertical timeline (role, company, dates, 2–3 bullets each). *(Replaces the current "Experience" section which was only tech logos.)*
4. **Skills** — **bento grid** of category cards: Backend, Frontend, Tools & Databases, plus a highlight/stat card.
5. **Projects** — project cards with image, title, summary, tech tags, links (live + source).
6. **Testimonials** — short quotes (name, role, company).
7. **Education & Certifications** — concise list.
8. **Contact** — heading, blurb, working form, plus direct email + socials.
9. **Footer** — wordmark, nav, social links, resume download, locale/theme hints, copyright.

Nav behavior: logo left; section links center/right (anchor scroll, active-section highlight); `ThemeToggle` + `LanguageToggle` far right. Collapses to a clean slide-down/overlay menu on mobile.

## 6. Content Model

All content in typed TS files under `src/content/`, one per section. Each exports a locale-keyed object so English and Indonesian sit side by side and are type-checked. Sketch:

```ts
// src/content/hero.ts
export const hero = {
  en: { role: 'Backend Developer', location: '<city>', headline: '…', ctaPrimary: 'View work', ctaSecondary: 'Download CV' },
  id: { role: 'Backend Developer', location: '<city>', headline: '…', ctaPrimary: 'Lihat karya', ctaSecondary: 'Unduh CV' },
} satisfies Record<Locale, HeroContent>
```

Other sections analogously: `experience` → array of `{ role, company, location, period, bullets[] }`; `skills` → categories with items + optional proficiency; `projects` → `{ title, summary, tech[], image, liveUrl, sourceUrl }`; `testimonials` → `{ quote, name, role, company }`; `education` → `{ title, org, period, detail }`; `site` → global (name, nav items, socials, email, resumeUrl).

A `Locale = 'en' | 'id'` union and per-section content types live in `src/lib/i18n.ts` / `src/content/types.ts`.

**Known content placeholders to confirm/fill later** (clearly marked in the data files with a `TODO:` comment and placeholder text):
- City/location (currently unknown — used `<city>`).
- Real job history: company names, exact dates, bullets.
- Real project details/descriptions beyond the three existing (Java, React/rfm-analytics, Spring Boot).
- Real testimonials (need actual quotes — shipped as representative placeholders).
- Education & certifications specifics.

**Carried-over real data (verified from current site):**
- Name: Tegar Machfudzi · Role: Backend Developer · ~2.5 yrs experience.
- Stack: Java, Spring Boot, Quarkus, React.
- GitHub: https://github.com/TegarMachfuzi · LinkedIn: https://www.linkedin.com/in/tegar-machfudzi-8518a0229/
- Email: tegarmachfudzi99@gmail.com · Resume: `/resume.pdf` (exists in `public/`).
- Existing project links: React → https://github.com/syahrul927/rfm-analytics (collaborative — confirm ownership).

## 7. Internationalization (i18n)

- Route-based via App Router `app/[locale]/` segment. Locales: `en` (default), `id`.
- Root `/` redirects to the best locale using `Accept-Language` (fallback `en`).
- Section components read content by `useParams()`/`locale` prop and index the locale-keyed data.
- `LanguageToggle` swaps `/en` ↔ `/id`, preserving the current section anchor where possible.
- SEO: `<link rel="alternate" hreflang="en|id">` + canonical; per-locale `<title>`/description/OG.
- English is source of truth; Indonesian copy is provided complete in v1.

## 8. Component Architecture

- **Section components** (`src/components/sections/`): `Hero`, `About`, `Experience`, `Skills`, `Projects`, `Testimonials`, `Education`, `Contact`, `SiteFooter`, `Navbar`.
- **UI primitives** (`src/components/ui/`): `Container`, `SectionHeading`, `Button`, `Badge`, `Card`, `TimelineItem`, `BentoCard`, `ThemeToggle`, `LanguageToggle`.
- **Motion** (`src/components/motion/`): `Reveal` (wraps children, `whileInView` fade/slide up, staggered lists), respects `prefers-reduced-motion`.
- **Providers** (`src/components/providers/`): `ThemeProvider` (next-themes).
- Sections are presentational; they receive `locale` and pull from `src/content/*`. No business logic in section components.

## 9. Features

### 9.1 Dark mode
`next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, persisted. `suppressHydrationWarning` on `<html>`. Inline no-flash script. Tailwind `dark:` variants drive all theming; CSS variables swap per theme.

### 9.2 Animations
Framer Motion `whileInView` reveals on sections, headings, cards, and timeline items with subtle stagger. Hero gets a gentle entrance. A restrained on-brand accent flourish (no heavy gradients/auto-play). `prefers-reduced-motion` disables motion entirely (content appears statically).

### 9.3 Contact form
- Client: React Hook Form + Zod schema (`name`, `email`, `message`; min lengths, valid email).
- Submit → `POST /api/contact`.
- Server route (`src/app/api/contact/route.ts`): re-validates with Zod, calls Resend via `react-email` template, sends to owner inbox (reply-to = submitter email).
- Honeypot field + simple rate limit to reduce spam.
- UX states: idle → submitting (disabled button + spinner) → success (inline confirmation + reset) → error (inline message, retain input). No `alert()`.
- Environment: `RESEND_API_KEY`, optional `CONTACT_TO_EMAIL` on Vercel.

## 10. SEO & Performance

- Per-locale metadata (title, description), OG + Twitter card images, canonical, `hreflang` alternates.
- `sitemap.xml` (both locales) via `src/app/sitemap.ts`; `robots.txt` via `src/app/robots.ts`.
- JSON-LD `Person` schema (name, role, sameAs → GitHub/LinkedIn).
- Fonts via `next/font` (Inter + Fraunces), zero layout shift.
- All raster images via `next/image`; existing `public/` logos/screenshots reused/optimized.
- Pages fully static-generated (`generateStaticParams` for locales). Minimal client JS.

## 11. Error Handling

- Localized `app/[locale]/not-found.tsx` (404) and `error.tsx` (boundary) on-brand.
- Inline form validation (client) + server validation with structured error responses.
- Graceful degradation if Resend fails (user-facing error, logged server-side).
- `prefers-reduced-motion` and no-JS fallbacks render content statically.

## 12. Testing

- **Vitest + React Testing Library**: content data shape/typing per locale, Zod validation schema (valid/invalid cases), key components (`Contact` form states, `LanguageToggle`, `Navbar` active link).
- Optional **Playwright** smoke test: load `/en` + `/id`, submit contact form against a mock route.
- Lightweight but meaningful; no chase for 100% coverage.

## 13. Project Structure

```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      not-found.tsx
      error.tsx
    api/contact/route.ts
    sitemap.ts
    robots.ts
    globals.css
  components/
    sections/      # Hero, About, Experience, Skills, Projects, Testimonials, Education, Contact, SiteFooter, Navbar
    ui/            # Container, SectionHeading, Button, Badge, Card, TimelineItem, BentoCard, ThemeToggle, LanguageToggle
    motion/        # Reveal
    providers/     # ThemeProvider
  content/         # typed per-section data: { en, id }
  lib/             # i18n config, resend client, validation schemas, utils
  hooks/           # e.g. useActiveSection
  assets/          # images (reused from current src/assets where suitable)
next.config.mjs
tailwind.config.ts
tsconfig.json
.env.example
```

## 14. Deployment

- Vercel, connected to the git repo (auto-deploy on push).
- Env vars set in Vercel project settings (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`).
- Production domain configurable; default `*.vercel.app` until a custom domain is added.

## 15. Migration from Current Site

- Replace the CRA (`react-scripts`) project with the Next.js app in the same repo (new `src/`, new configs; remove `react-scripts`, `react-scroll` dependency).
- Reuse existing assets (`src/assets/*`, `public/resume.pdf`, logos) where suitable; replace the hero portrait if a better one is available.
- Preserve all real personal data listed in §6.
- The old `src/components/*.jsx` are superseded (not edited in place).

## 16. Open Questions

1. Confirm **city/location** for the hero.
2. Confirm whether `rfm-analytics` (under `syahrul927`) is collaborative/owned, and the desired link.
3. Decide on **accent** (default Ember) and whether to keep the script "Egars" as a footer flourish.
4. Provide real job history, testimonials, and education when ready (placeholders until then).
