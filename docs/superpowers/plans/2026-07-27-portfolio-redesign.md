# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the personal portfolio as a modern, bilingual (EN/ID), recruiter-friendly Next.js site with a Minimal Editorial design system.

**Architecture:** Next.js 14 App Router with a `[locale]` dynamic segment for route-based i18n. All copy lives in typed, locale-keyed TS data files. Section components are presentational and receive `locale` as a prop. A Vercel serverless route handles the contact form via Resend. Static generation for all pages.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3.4, Framer Motion 11, next-themes, React Hook Form + Zod, Resend + react-email, Vitest + React Testing Library.

## Global Constraints

- Locales: `en` (default), `id`. Locale union type `Locale = 'en' | 'id'`.
- Accent: Ember `#C2410C` (light) / `#F97316` (dark).
- Fonts: Fraunces (display) + Inter (body), via `next/font/google`.
- Path alias: `@/*` → `./src/*`.
- Content placeholders carry a `// TODO: replace with real value` comment.
- Branch: `portfolio-redesign` (already created). Conventional-commit messages, lowercase, matching existing repo style.
- `darkMode: 'class'` via next-themes; design tokens are CSS variables that swap under `.dark`.
- Deploy target: Vercel. Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.
- Every task ends green: `pnpm test` / typecheck where applicable, then commit.

---

## File Structure

```
.env.example
next.config.mjs
postcss.config.mjs
tailwind.config.ts
tsconfig.json                # path alias @/* -> ./src/*
vitest.config.ts
vitest.setup.ts
public/
  resume.pdf                 # reused from current repo
  favicon.ico                # reused
src/
  middleware.ts              # locale redirect
  app/
    [locale]/
      layout.tsx             # root layout: <html lang>, fonts, providers, Navbar, Footer
      page.tsx               # composes all sections
      not-found.tsx
      error.tsx
    api/contact/route.ts
    sitemap.ts
    robots.ts
    globals.css
  components/
    ui/                      # Container, SectionHeading, Button, Badge, Card
    sections/                # Hero, About, Experience, Skills, Projects, Testimonials, Education, Contact, SiteFooter, Navbar
    motion/Reveal.tsx
    providers/ThemeProvider.tsx
  content/
    types.ts
    site.ts hero.ts about.ts experience.ts skills.ts projects.ts testimonials.ts education.ts contact.ts
  lib/
    i18n.ts
    cn.ts
    validation.ts
    email.ts
  hooks/useActiveSection.ts
  assets/                    # reused images from current src/assets
```

---

## Task 1: Project bootstrap & tooling

**Files:**
- Create: `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `vitest.config.ts`, `vitest.setup.ts`, `.env.example`, `src/app/globals.css`
- Modify: `package.json` (deps + scripts), `tsconfig.json` (path alias)
- Delete: all current CRA files (`src/App.js`, `src/index.js`, `src/index.css`, `src/components/*`, `src/reportWebVitals`, `public/index.html`, `public/manifest.json`, `public/logo*.png`, `public/robots.txt`)

**Interfaces:**
- Produces: a runnable Next.js dev server (`pnpm dev`), a Vitest runner (`pnpm test`), the `@/*` path alias, and the `cn()` helper at `src/lib/cn.ts` used by every later UI task.

- [ ] **Step 1: Install Next.js + all dependencies**

Remove CRA deps and install the new stack. Run:

```bash
# from repo root, on branch portfolio-redesign
rm -rf node_modules package-lock.json
# remove CRA source (keep public/resume.pdf and favicon)
rm -f src/App.js src/index.js src/index.css src/reportWebVitals.js src/setupTests.js
rm -rf src/components
rm -f public/index.html public/manifest.json public/logo192.png public/logo512.png public/robots.txt

npm install \
  next@^14.2.5 react@^18.3.1 react-dom@^18.3.1 \
  tailwindcss@^3.4.7 postcss@^8.4 autoprefixer@^10.4 \
  framer-motion@^11.3 next-themes@^0.3.0 \
  react-hook-form@^7.52 @hookform/resolvers@^3.9 zod@^3.23 \
  resend@^3.4 @react-email/components@^0.0.21 \
  clsx@^2.1 tailwind-merge@^2.4

npm install -D \
  typescript@^5.5 @types/node@^20 @types/react@^18 @types/react-dom@^18 \
  eslint@^8 eslint-config-next@^14.2.5 \
  vitest@^2.0 @vitejs/plugin-react@^4.3 vite-tsconfig-paths@^5.0 \
  jsdom@^24 @testing-library/react@^16 @testing-library/jest-dom@^6.4 @testing-library/user-event@^14.5
```

- [ ] **Step 2: Replace `package.json` scripts**

Overwrite the `scripts` block so it reads exactly:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Write `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
export default nextConfig;
```

- [ ] **Step 5: Write PostCSS config `postcss.config.mjs`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Write minimal `tailwind.config.ts` (design tokens added in Task 2)**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
};
export default config;
```

- [ ] **Step 7: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: false,
  },
});
```

- [ ] **Step 8: Write `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// next/image renders a plain <img> in jsdom tests
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) =>
    (props.alt ? `__IMG__:${props.alt}` : null) && null,
}));
```

> The mock returns nothing visible; tests assert on text/roles, not image markup. Adjust in Task 12 if a project image test needs the `src`.

- [ ] **Step 9: Write `.env.example`**

```bash
# Resend (contact form). Get a key at https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxx
# Address that receives contact messages (your inbox)
CONTACT_TO_EMAIL=tegarmachfudzi99@gmail.com
# Optional: verified "from" domain. Defaults to Resend's sandbox sender.
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

- [ ] **Step 10: Write placeholder `src/app/globals.css` (tokens added in Task 2)**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 11: Create a placeholder root page so the dev server boots**

Create `src/app/page.tsx`:

```tsx
export default function Page() {
  return <main className="p-10">Bootstrap OK</main>;
}
```

- [ ] **Step 12: Verify the dev server + toolchain boots**

Run: `npm run dev` (Ctrl-C once it prints "Ready").
Run: `npx tsc --noEmit` → expected: no errors.
Run: `npm test` → expected: "No test files found" (not a crash).

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "chore: bootstrap next.js 14 + typescript + tailwind + vitest"
```

---

## Task 2: Design tokens, fonts & `cn` helper

**Files:**
- Create: `src/lib/cn.ts`, `src/lib/cn.test.ts`
- Modify: `src/app/globals.css`, `tailwind.config.ts`

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` (clsx + tailwind-merge); CSS variables `--canvas`, `--surface`, `--ink`, `--muted`, `--line`, `--accent` (with `.dark` overrides); Tailwind color utilities `bg-canvas`, `bg-surface`, `text-ink`, `text-muted`, `border-line`, `text-accent` / `bg-accent`; font families `font-sans` (Inter) and `font-display` (Fraunces).

- [ ] **Step 1: Write the failing test for `cn`**

`src/lib/cn.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges class strings', () => {
    expect(cn('a', 'b')).toBe('a b');
  });
  it('drops falsy values', () => {
    expect(cn('a', false && 'b', undefined, 'c')).toBe('a c');
  });
  it('resolves conflicting tailwind classes (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/cn.test.ts`
Expected: FAIL — `cn` is not defined / module not found.

- [ ] **Step 3: Implement `cn`**

`src/lib/cn.ts`:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/cn.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Write design-token CSS variables**

Replace `src/app/globals.css` entirely:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --canvas: 250 247 242;   /* #FAF7F2 */
  --surface: 255 255 255;  /* #FFFFFF */
  --ink: 26 26 26;         /* #1A1A1A */
  --muted: 107 103 96;     /* #6B6760 */
  --line: 232 227 218;     /* #E8E3DA */
  --accent: 194 65 12;     /* #C2410C */
}

.dark {
  --canvas: 20 19 18;      /* #141312 */
  --surface: 31 29 26;     /* #1F1D1A */
  --ink: 245 242 236;      /* #F5F2EC */
  --muted: 168 162 154;    /* #A8A29A */
  --line: 46 42 37;        /* #2E2A25 */
  --accent: 249 115 22;    /* #F97316 */
}

html {
  scroll-behavior: smooth;
}

/* offset anchor scrolling for the sticky navbar */
section[id] {
  scroll-margin-top: 6rem;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 6: Extend `tailwind.config.ts` with tokens + fonts**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 7: Verify typecheck + build**

Run: `npx tsc --noEmit` → no errors.
Run: `npm run build` → expected: build succeeds (the placeholder page still renders).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: design tokens, fonts config, cn helper"
```

---

## Task 3: Core UI primitives

**Files:**
- Create: `src/components/ui/Container.tsx`, `SectionHeading.tsx`, `Button.tsx`, `Badge.tsx`, `Card.tsx`, `Button.test.tsx`

**Interfaces:**
- Produces:
  - `<Container as?>` — max-width wrapper.
  - `<SectionHeading eyebrow title description?>` — consistent section header.
  - `<Button variant href?>` — variants `'solid' | 'outline' | 'ghost'`, optional `href` renders `<a>`/`<Link>`-style anchor.
  - `<Badge>` — small pill.
  - `<Card>` — surface container.

- [ ] **Step 1: Write the failing test for `Button`**

`src/components/ui/Button.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>View work</Button>);
    expect(screen.getByText('View work')).toBeInTheDocument();
  });
  it('renders an anchor when href is provided', () => {
    render(<Button href="#projects">Go</Button>);
    expect(document.querySelector('a[href="#projects"]')).not.toBeNull();
  });
  it('applies outline variant classes', () => {
    render(<Button variant="outline">CV</Button>);
    const el = screen.getByText('CV');
    expect(el.className).toContain('border');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/ui/Button.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the primitives**

`src/components/ui/Container.tsx`:

```tsx
import { cn } from '@/lib/cn';
import type { ElementType, ReactNode } from 'react';

export function Container({
  as,
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? 'div';
  return <Tag className={cn('mx-auto w-full max-w-6xl px-6 md:px-10', className)}>{children}</Tag>;
}
```

`src/components/ui/SectionHeading.tsx`:

```tsx
import { cn } from '@/lib/cn';

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
```

`src/components/ui/Button.tsx`:

```tsx
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'outline' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-canvas hover:bg-accent hover:text-white',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-canvas',
  ghost: 'text-ink hover:text-accent',
};

export function Button({
  variant = 'solid',
  href,
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  href?: string;
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
```

`src/components/ui/Badge.tsx`:

```tsx
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-medium text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
```

`src/components/ui/Card.tsx`:

```tsx
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/ui/Button.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit` → no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: core ui primitives (container, heading, button, badge, card)"
```

---

## Task 4: i18n config & middleware

**Files:**
- Create: `src/lib/i18n.ts`, `src/lib/i18n.test.ts`, `src/middleware.ts`

**Interfaces:**
- Produces: `Locale = 'en' | 'id'`, `locales = ['en','id']`, `defaultLocale = 'en'`, `isLocale(x): boolean`, `getContentLocale(pathname): Locale | null`. Middleware redirects `/` and localeless paths to `/en`, excluding `/api`, `/_next`, and static files.

- [ ] **Step 1: Write the failing tests**

`src/lib/i18n.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { locales, defaultLocale, isLocale, getContentLocale } from './i18n';

describe('i18n', () => {
  it('exposes en + id with en default', () => {
    expect(locales).toEqual(['en', 'id']);
    expect(defaultLocale).toBe('en');
  });
  it('isLocale validates', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('id')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
  it('getContentLocale parses the first segment', () => {
    expect(getContentLocale('/en/about')).toBe('en');
    expect(getContentLocale('/id')).toBe('id');
    expect(getContentLocale('/about')).toBe(null);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/i18n.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/i18n.ts`**

```ts
export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function getContentLocale(pathname: string): Locale | null {
  const seg = pathname.split('/').filter(Boolean)[0];
  return isLocale(seg) ? seg : null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/i18n.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Write `src/middleware.ts`**

```ts
import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/').filter(Boolean)[0];
  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|resume.pdf|.*\\.).*)'],
};
```

- [ ] **Step 6: Verify build + manual redirect check**

Run: `npm run build` → succeeds, both locales prerendered.
Run: `npm run dev`, then `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/` → expected `308 http://localhost:3000/en`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: locale config + redirect middleware"
```

---

## Task 5: Theme provider & toggle

**Files:**
- Create: `src/components/providers/ThemeProvider.tsx`, `src/components/ui/ThemeToggle.tsx`, `src/components/ui/ThemeToggle.test.tsx`

**Interfaces:**
- Produces: `<ThemeProvider>` (wraps `next-themes`), `<ThemeToggle>` (client button cycling dark/light). Consumed by the root layout (Task 7).

- [ ] **Step 1: Write the failing test**

`src/components/ui/ThemeToggle.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('renders an accessible theme button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/ui/ThemeToggle.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the provider**

`src/components/providers/ThemeProvider.tsx`:

```tsx
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
```

`src/components/ui/ThemeToggle.tsx`:

```tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:text-accent"
    >
      {mounted ? (isDark ? '☀' : '☾') : null}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/ui/ThemeToggle.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: theme provider + theme toggle"
```

---

## Task 6: Content data layer

**Files:**
- Create: `src/content/types.ts`, `src/content/site.ts`, `hero.ts`, `about.ts`, `experience.ts`, `skills.ts`, `projects.ts`, `testimonials.ts`, `education.ts`, `contact.ts`, `src/content/content.test.ts`

**Interfaces:**
- Produces typed, locale-keyed exports consumed by every section component:
  - `site`, `hero`, `about`, `experience`, `skills`, `projects`, `testimonials`, `education`, `contact` — each `satisfies Record<Locale, T>`.
  - All English copy is complete; real specifics carry `// TODO: replace with real value`.

- [ ] **Step 1: Write content type definitions**

`src/content/types.ts`:

```ts
import type { Locale } from '@/lib/i18n';
export type Localized<T> = Record<Locale, T>;

export interface NavItem { id: string; label: string }
export interface SocialLink { label: string; href: string }
export interface SiteContent {
  name: string; navItems: NavItem[]; socials: SocialLink[];
  resumeUrl: string; footerNote: string;
}

export interface HeroContent {
  eyebrow: string; name: string; headline: string; intro: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface AboutContent { heading: string; lead: string; paragraphs: string[] }

export interface ExperienceItem {
  role: string; company: string; period: string; location?: string; bullets: string[];
}
export interface ExperienceContent { heading: string; intro: string; items: ExperienceItem[] }

export interface SkillCategory { title: string; items: string[] }
export interface SkillsContent {
  heading: string; intro: string; categories: SkillCategory[];
  stat: { value: string; label: string };
}

export interface ProjectItem {
  title: string; summary: string; tech: string[]; image: string;
  liveUrl?: string; sourceUrl?: string;
}
export interface ProjectsContent { heading: string; intro: string; items: ProjectItem[] }

export interface TestimonialItem { quote: string; name: string; role: string; company: string }
export interface TestimonialsContent { heading: string; items: TestimonialItem[] }

export interface EducationItem { title: string; org: string; period: string; detail?: string }
export interface EducationContent { heading: string; items: EducationItem[] }

export interface ContactContent { heading: string; intro: string; email: string }
```

- [ ] **Step 2: Write the failing content-integrity test**

`src/content/content.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { locales } from '@/lib/i18n';
import { site, hero, about, experience, skills, projects, testimonials, education, contact } from './index';

const bundles = { site, hero, about, experience, skills, projects, testimonials, education, contact };

describe('content bundles', () => {
  it.each(Object.keys(bundles))('%s ships both locales', (key) => {
    const bundle = bundles[key as keyof typeof bundles];
    expect(Object.keys(bundle).sort()).toEqual([...locales].sort());
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- src/content/content.test.ts`
Expected: FAIL — `./index` not found.

- [ ] **Step 4: Write all content bundles**

`src/content/site.ts`:

```ts
import type { Localized, SiteContent } from './types';

export const site: Localized<SiteContent> = {
  en: {
    name: 'Tegar Machfudzi',
    navItems: [
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' },
    ],
    socials: [
      { label: 'GitHub', href: 'https://github.com/TegarMachfuzi' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tegar-machfudzi-8518a0229/' },
      { label: 'Email', href: 'mailto:tegarmachfudzi99@gmail.com' },
    ],
    resumeUrl: '/resume.pdf',
    footerNote: 'Built with Next.js & Tailwind CSS.',
  },
  id: {
    name: 'Tegar Machfudzi',
    navItems: [
      { id: 'about', label: 'Tentang' },
      { id: 'experience', label: 'Pengalaman' },
      { id: 'skills', label: 'Keahlian' },
      { id: 'projects', label: 'Proyek' },
      { id: 'contact', label: 'Kontak' },
    ],
    socials: [
      { label: 'GitHub', href: 'https://github.com/TegarMachfuzi' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tegar-machfudzi-8518a0229/' },
      { label: 'Email', href: 'mailto:tegarmachfudzi99@gmail.com' },
    ],
    resumeUrl: '/resume.pdf',
    footerNote: 'Dibuat dengan Next.js & Tailwind CSS.',
  },
};
```

`src/content/hero.ts`:

```ts
import type { Localized, HeroContent } from './types';

export const hero: Localized<HeroContent> = {
  en: {
    eyebrow: 'Backend Developer',
    name: 'Tegar Machfudzi',
    headline: 'Backend developer building reliable systems with Java & Spring.',
    intro:
      '2.5+ years designing APIs and data pipelines in Java, Spring Boot and Quarkus, with React on the front end. I turn product direction into dependable, well-tested backend services.',
    ctaPrimary: { label: 'View work', href: '#projects' },
    ctaSecondary: { label: 'Download CV', href: '/resume.pdf' },
  },
  id: {
    eyebrow: 'Backend Developer',
    name: 'Tegar Machfudzi',
    headline: 'Backend developer yang membangun sistem andal dengan Java & Spring.',
    intro:
      'Lebih dari 2,5 tahun merancang API dan pipeline data dengan Java, Spring Boot, dan Quarkus, serta React di sisi front end. Saya mengubah arah produk menjadi layanan backend yang andal dan teruji.',
    ctaPrimary: { label: 'Lihat karya', href: '#projects' },
    ctaSecondary: { label: 'Unduh CV', href: '/resume.pdf' },
  },
};
```

`src/content/about.ts`:

```ts
import type { Localized, AboutContent } from './types';

export const about: Localized<AboutContent> = {
  en: {
    heading: 'About',
    lead: 'I am a Java backend developer who enjoys turning ambiguous requirements into clean, maintainable services.',
    paragraphs: [
      'In my current role I build and maintain the backend that streams data to the Android team, working closely with the product owner to translate roadmap items into shipped features.',
      'I care about readable code, sensible tests, and APIs that other developers actually enjoy consuming. I ramp up quickly on new domains and adapt well to changing priorities.',
    ],
  },
  id: {
    heading: 'Tentang',
    lead: 'Saya seorang backend developer Java yang senang mengubah kebutuhan ambigu menjadi layanan yang bersih dan mudah dirawat.',
    paragraphs: [
      'Di peran saat ini saya membangun dan memelihara backend yang mengalirkan data ke tim Android, bekerja sama erat dengan product owner untuk menerjemahkan peta jalan menjadi fitur yang rilis.',
      'Saya peduli pada kode yang mudah dibaca, pengujian yang masuk akal, dan API yang nyaman digunakan developer lain. Saya belajar cepat pada domain baru dan beradaptasi baik dengan perubahan prioritas.',
    ],
  },
};
```

`src/content/experience.ts`:

```ts
import type { Localized, ExperienceContent } from './types';

export const experience: Localized<ExperienceContent> = {
  en: {
    heading: 'Work experience',
    intro: 'Roles where I shipped backend services that other teams depended on.',
    items: [
      {
        role: 'Backend Developer',
        company: 'Current employer', // TODO: replace with real value
        period: '2023 — Present',
        bullets: [
          'Design and maintain Java/Spring Boot services that deliver data to the Android client team.',
          'Collaborate with the product owner to scope, estimate and deliver roadmap features.',
          'Improve API reliability and observability across core data-streaming endpoints.',
        ],
      },
    ],
  },
  id: {
    heading: 'Pengalaman kerja',
    intro: 'Peran di mana saya merilis layanan backend yang diandalkan tim lain.',
    items: [
      {
        role: 'Backend Developer',
        company: 'Pemberi kerja saat ini', // TODO: replace with real value
        period: '2023 — Sekarang',
        bullets: [
          'Merancang dan memelihara layanan Java/Spring Boot yang mengirim data ke tim klien Android.',
          'Berkolaborasi dengan product owner untuk memperkirakan dan merilis fitur peta jalan.',
          'Meningkatkan keandalan dan observabilitas API pada endpoint streaming data inti.',
        ],
      },
    ],
  },
};
```

`src/content/skills.ts`:

```ts
import type { Localized, SkillsContent } from './types';

export const skills: Localized<SkillsContent> = {
  en: {
    heading: 'Skills & tools',
    intro: 'The stack I reach for to build and ship backend systems.',
    stat: { value: '2.5+', label: 'Years building software' },
    categories: [
      { title: 'Backend', items: ['Java', 'Spring Boot', 'Quarkus', 'REST APIs'] },
      { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { title: 'Data & tools', items: ['SQL', 'Git', 'Docker', 'Linux'] },
    ],
  },
  id: {
    heading: 'Keahlian & alat',
    intro: 'Stack yang saya gunakan untuk membangun dan merilis sistem backend.',
    stat: { value: '2.5+', label: 'Tahun membangun perangkat lunak' },
    categories: [
      { title: 'Backend', items: ['Java', 'Spring Boot', 'Quarkus', 'REST API'] },
      { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { title: 'Data & alat', items: ['SQL', 'Git', 'Docker', 'Linux'] },
    ],
  },
};
```

`src/content/projects.ts`:

```ts
import type { Localized, ProjectsContent } from './types';

export const projects: Localized<ProjectsContent> = {
  en: {
    heading: 'Selected projects',
    intro: 'A few things I have built or contributed to.',
    items: [
      {
        title: 'Spring Boot service template',
        summary: 'A production-leaning Spring Boot starter with auth, validation and observability wired in.', // TODO: replace with real value
        tech: ['Java', 'Spring Boot', 'PostgreSQL'],
        image: '/projects/springboot.svg',
        sourceUrl: 'https://github.com/TegarMachfuzi',
      },
      {
        title: 'RFM analytics dashboard',
        summary: 'Recency-Frequency-Monetary analytics with a React front end over a Java backend.', // TODO: confirm ownership
        tech: ['React', 'Java', 'REST'],
        image: '/projects/react.svg',
        sourceUrl: 'https://github.com/syahrul927/rfm-analytics',
      },
      {
        title: 'Java CLI utilities',
        summary: 'Small command-line tools for data wrangling and automation.', // TODO: replace with real value
        tech: ['Java', 'CLI'],
        image: '/projects/java.svg',
        sourceUrl: 'https://github.com/TegarMachfuzi',
      },
    ],
  },
  id: {
    heading: 'Proyek terpilih',
    intro: 'Beberapa hal yang saya bangun atau ikut kerjakan.',
    items: [
      {
        title: 'Template layanan Spring Boot',
        summary: 'Starter Spring Boot siap produksi dengan auth, validasi, dan observabilitas terpasang.', // TODO: replace with real value
        tech: ['Java', 'Spring Boot', 'PostgreSQL'],
        image: '/projects/springboot.svg',
        sourceUrl: 'https://github.com/TegarMachfuzi',
      },
      {
        title: 'Dashboard analitik RFM',
        summary: 'Analitik Recency-Frequency-Monetary dengan front end React di atas backend Java.', // TODO: konfirmasi kepemilikan
        tech: ['React', 'Java', 'REST'],
        image: '/projects/react.svg',
        sourceUrl: 'https://github.com/syahrul927/rfm-analytics',
      },
      {
        title: 'Utilitas CLI Java',
        summary: 'Alat command-line kecil untuk pengolahan data dan otomasi.', // TODO: replace with real value
        tech: ['Java', 'CLI'],
        image: '/projects/java.svg',
        sourceUrl: 'https://github.com/TegarMachfuzi',
      },
    ],
  },
};
```

`src/content/testimonials.ts`:

```ts
import type { Localized, TestimonialsContent } from './types';

export const testimonials: Localized<TestimonialsContent> = {
  en: {
    heading: 'Kind words',
    items: [
      {
        quote: 'Tegar picks up new domains fast and ships backend work the rest of the team can rely on.', // TODO: replace with a real quote
        name: 'Colleague',
        role: 'Engineering',
        company: '—',
      },
    ],
  },
  id: {
    heading: 'Kata mereka',
    items: [
      {
        quote: 'Tegar cepat memahami domain baru dan merilis pekerjaan backend yang dapat diandalkan tim.', // TODO: ganti dengan kutipan asli
        name: 'Rekan kerja',
        role: 'Engineering',
        company: '—',
      },
    ],
  },
};
```

`src/content/education.ts`:

```ts
import type { Localized, EducationContent } from './types';

export const education: Localized<EducationContent> = {
  en: {
    heading: 'Education & certifications',
    items: [
      {
        title: 'Degree', // TODO: replace with real value
        org: 'University', // TODO: replace with real value
        period: '2018 — 2022', // TODO: replace with real value
      },
    ],
  },
  id: {
    heading: 'Pendidikan & sertifikasi',
    items: [
      {
        title: 'Gelar', // TODO: ganti dengan nilai asli
        org: 'Universitas', // TODO: ganti dengan nilai asli
        period: '2018 — 2022', // TODO: ganti dengan nilai asli
      },
    ],
  },
};
```

`src/content/contact.ts`:

```ts
import type { Localized, ContactContent } from './types';

export const contact: Localized<ContactContent> = {
  en: {
    heading: 'Get in touch',
    intro: 'Have a role or project in mind? Send a message and I will get back to you.',
    email: 'tegarmachfudzi99@gmail.com',
  },
  id: {
    heading: 'Hubungi saya',
    intro: 'Punya lowongan atau proyek? Kirim pesan dan saya akan membalas.',
    email: 'tegarmachfudzi99@gmail.com',
  },
};
```

`src/content/index.ts` (the barrel the test imports):

```ts
export { site } from './site';
export { hero } from './hero';
export { about } from './about';
export { experience } from './experience';
export { skills } from './skills';
export { projects } from './projects';
export { testimonials } from './testimonials';
export { education } from './education';
export { contact } from './contact';
export * from './types';
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/content/content.test.ts`
Expected: PASS — all 9 bundles ship both locales.

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit` → no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: typed bilingual content data layer"
```

---

## Task 7: Root layout, Navbar, LanguageToggle, Footer

**Files:**
- Create: `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/components/sections/Navbar.tsx`, `src/components/sections/Navbar.test.tsx`, `src/components/ui/LanguageToggle.tsx`, `src/components/sections/SiteFooter.tsx`, `src/hooks/useActiveSection.ts`
- Delete: `src/app/page.tsx` (placeholder from Task 1)

**Interfaces:**
- Consumes: `ThemeProvider` (Task 5), `Locale` + `site` content (Tasks 4, 6), `Container`, `Button`, `ThemeToggle` (Tasks 3, 5).
- Produces: the app shell (fonts, `<html lang>`, providers, nav, footer), and `LanguageToggle` that swaps `/en`↔`/id`. Section components receive `locale: Locale`.

- [ ] **Step 1: Write the failing Navbar test**

`src/components/sections/Navbar.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders the wordmark and localized nav links', () => {
    render(<Navbar locale="en" />);
    expect(screen.getByText('TM.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/sections/Navbar.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `useActiveSection`**

`src/hooks/useActiveSection.ts`:

```ts
'use client';
import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}
```

- [ ] **Step 4: Implement `LanguageToggle`**

`src/components/ui/LanguageToggle.tsx`:

```tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? '/';
  const other: Locale = locale === 'en' ? 'id' : 'en';
  const swapped = pathname.replace(`/${locale}`, `/${other}`);
  return (
    <Link
      href={swapped}
      aria-label={`Switch to ${other === 'en' ? 'English' : 'Bahasa Indonesia'}`}
      className="inline-flex h-9 items-center gap-1 rounded-full border border-line px-3 text-xs font-semibold text-ink hover:text-accent"
    >
      <span className={cn(locale === 'en' ? 'text-accent' : 'text-muted')}>EN</span>
      <span className="text-muted">/</span>
      <span className={cn(locale === 'id' ? 'text-accent' : 'text-muted')}>ID</span>
    </Link>
  );
}
```

- [ ] **Step 5: Implement `Navbar`**

`src/components/sections/Navbar.tsx`:

```tsx
'use client';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useActiveSection } from '@/hooks/useActiveSection';
import { site } from '@/content';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export function Navbar({ locale }: { locale: Locale }) {
  const content = site[locale];
  const ids = ['about', 'experience', 'skills', 'projects', 'contact'];
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-canvas/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-lg font-bold text-ink">TM.</a>
        <nav className="hidden items-center gap-7 md:flex">
          {content.navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                active === item.id ? 'text-ink' : 'text-muted',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle locale={locale} />
          <ThemeToggle />
          <button
            type="button"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </Container>
      {open && (
        <nav className="border-t border-line bg-canvas md:hidden">
          <Container className="flex flex-col py-4">
            {content.navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ink"
              >
                {item.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 6: Implement `SiteFooter`**

`src/components/sections/SiteFooter.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { site } from '@/content';
import type { Locale } from '@/lib/i18n';

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = site[locale];
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <a href="#home" className="font-display text-lg font-bold text-ink">TM.</a>
        <nav className="flex flex-wrap gap-5">
          {content.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted hover:text-accent">
              {s.label}
            </a>
          ))}
          <a href={content.resumeUrl} className="text-sm font-medium text-muted hover:text-accent">CV</a>
        </nav>
        <p className="text-xs text-muted">© {new Date().getFullYear()} {content.name}. {content.footerNote}</p>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 7: Run Navbar test to verify it passes**

Run: `npm test -- src/components/sections/Navbar.test.tsx`
Expected: PASS.

- [ ] **Step 8: Implement the root layout + page**

`src/app/[locale]/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/sections/Navbar';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { locales, type Locale } from '@/lib/i18n';
import { site } from '@/content';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const c = site[locale];
  return {
    title: { default: `${c.name} — ${site.en.navItems ? 'Backend Developer' : ''}`, template: `%s — ${c.name}` },
    description: c.footerNote,
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();
  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <ThemeProvider>
          <Navbar locale={locale} />
          <main className="pt-16">{children}</main>
          <SiteFooter locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> Metadata title is refined in Task 18. The awkward `site.en.navItems ?` placeholder is replaced there with a clean `site` title field if added; for now it yields a valid string.

Replace `src/app/[locale]/page.tsx` (and delete `src/app/page.tsx`):

`src/app/[locale]/page.tsx`:

```tsx
import type { Locale } from '@/lib/i18n';
import { Hero } from '@/components/sections/Hero';
// remaining sections are imported as they are built; add incrementally

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return (
    <>
      <Hero locale={locale} />
    </>
  );
}
```

> Delete `src/app/page.tsx` now (the Task 1 placeholder) so the locale route is the only entry: `rm src/app/page.tsx`.

- [ ] **Step 9: Verify build**

Run: `npm run build` → succeeds, `/en` and `/id` prerendered.
Run: `npm run dev`, open `http://localhost:3000/en` → header + footer render (Hero is added next; if not yet present, temporarily return `<div/>` until Task 8 — but it is created in Task 8 below; to keep this task green, add a temporary `Hero` stub now and replace it in Task 8).

> To keep Task 7 self-contained and buildable, create a minimal `src/components/sections/Hero.tsx` stub now: `export function Hero({locale}:{locale:Locale}){return <section id="home" className="min-h-screen" />}` and import `{ Locale }`. Task 8 overwrites it.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: app shell — root layout, navbar, language toggle, footer"
```

---

## Task 8: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx` (replace stub), `src/components/sections/Hero.test.tsx`

**Interfaces:**
- Consumes: `hero` content (Task 6), `Container`, `Button` (Task 3).

- [ ] **Step 1: Write the failing test**

`src/components/sections/Hero.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the localized headline and primary CTA', () => {
    render(<Hero locale="en" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view work/i })).toHaveAttribute('href', '#projects');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/sections/Hero.test.tsx`
Expected: FAIL — stub has no heading/link.

- [ ] **Step 3: Implement `Hero`**

`src/components/sections/Hero.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { hero } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Hero({ locale }: { locale: Locale }) {
  const c = hero[locale];
  return (
    <section id="home" className="relative overflow-hidden">
      <Container className="flex min-h-[88vh] flex-col justify-center py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {c.headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{c.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={c.ctaPrimary.href}>{c.ctaPrimary.label} →</Button>
          <Button variant="outline" href={c.ctaSecondary.href}>{c.ctaSecondary.label}</Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/sections/Hero.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: hero section"
```

---

## Task 9: About section

**Files:**
- Create: `src/components/sections/About.tsx`, `About.test.tsx`
- Modify: `src/app/[locale]/page.tsx` (mount About)

- [ ] **Step 1: Write the failing test**

`src/components/sections/About.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About', () => {
  it('renders the heading and lead paragraph', () => {
    render(<About locale="en" />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/Java backend developer/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/sections/About.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `About`**

`src/components/sections/About.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { about } from '@/content';
import type { Locale } from '@/lib/i18n';

export function About({ locale }: { locale: Locale }) {
  const c = about[locale];
  return (
    <section id="about" className="py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="01" title={c.heading} />
        <div>
          <p className="font-display text-2xl font-medium leading-snug text-ink">{c.lead}</p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {c.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/sections/About.test.tsx`
Expected: PASS.

- [ ] **Step 5: Mount About in the page**

Update `src/app/[locale]/page.tsx` imports/body:

```tsx
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
// ...
      <Hero locale={locale} />
      <About locale={locale} />
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: about section"
```

---

## Task 10: Work Experience timeline

**Files:**
- Create: `src/components/ui/TimelineItem.tsx`, `src/components/sections/Experience.tsx`, `Experience.test.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write the failing test**

`src/components/sections/Experience.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

describe('Experience', () => {
  it('renders each role with its period and bullets', () => {
    render(<Experience locale="en" />);
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    expect(screen.getByText('2023 — Present')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/sections/Experience.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `TimelineItem`**

`src/components/ui/TimelineItem.tsx`:

```tsx
import type { ExperienceItem } from '@/content/types';

export function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <li className="relative pl-8 pb-10 last:pb-0">
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-accent" aria-hidden />
      <span className="absolute left-[5px] top-4 h-full w-px bg-line" aria-hidden />
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{item.period}</p>
      <h3 className="mt-1 font-display text-xl font-semibold text-ink">{item.role}</h3>
      <p className="text-sm font-medium text-accent">{item.company}{item.location ? ` · ${item.location}` : ''}</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted marker:text-line">
        {item.bullets.map((b, i) => <li key={i} className="list-disc pl-1">{b}</li>)}
      </ul>
    </li>
  );
}
```

- [ ] **Step 4: Implement `Experience`**

`src/components/sections/Experience.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { experience } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Experience({ locale }: { locale: Locale }) {
  const c = experience[locale];
  return (
    <section id="experience" className="border-y border-line bg-surface py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="02" title={c.heading} description={c.intro} />
        <ol>
          {c.items.map((item, i) => <TimelineItem key={i} item={item} />)}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/components/sections/Experience.test.tsx`
Expected: PASS.

- [ ] **Step 6: Mount in page (after About)**

```tsx
import { Experience } from '@/components/sections/Experience';
// ...
      <Experience locale={locale} />
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: work experience timeline"
```

---

## Task 11: Skills (bento grid)

**Files:**
- Create: `src/components/ui/BentoCard.tsx`, `src/components/sections/Skills.tsx`, `Skills.test.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write the failing test**

`src/components/sections/Skills.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';

describe('Skills', () => {
  it('renders category titles and the stat', () => {
    render(<Skills locale="en" />);
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('2.5+')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/sections/Skills.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `BentoCard`**

`src/components/ui/BentoCard.tsx`:

```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function BentoCard({ title, className, children }: { title?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-line bg-surface p-6', className)}>
      {title && <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{title}</h3>}
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Implement `Skills`**

`src/components/sections/Skills.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BentoCard } from '@/components/ui/BentoCard';
import { Badge } from '@/components/ui/Badge';
import { skills } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Skills({ locale }: { locale: Locale }) {
  const c = skills[locale];
  return (
    <section id="skills" className="py-24">
      <Container>
        <SectionHeading eyebrow="03" title={c.heading} description={c.intro} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BentoCard className="bg-ink text-canvas lg:col-span-1">
            <p className="font-display text-4xl font-semibold">{c.stat.value}</p>
            <p className="mt-1 text-sm text-canvas/80">{c.stat.label}</p>
          </BentoCard>
          {c.categories.map((cat) => (
            <BentoCard key={cat.title} title={cat.title} className="lg:col-span-1">
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((s) => <li key={s}><Badge>{s}</Badge></li>)}
              </ul>
            </BentoCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/components/sections/Skills.test.tsx`
Expected: PASS.

- [ ] **Step 6: Mount in page (after Experience)**

```tsx
import { Skills } from '@/components/sections/Skills';
// ...
      <Skills locale={locale} />
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: skills bento grid"
```

---

## Task 12: Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`, `Projects.test.tsx`
- Add static SVGs: `public/projects/springboot.svg`, `react.svg`, `java.svg`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write the failing test**

`src/components/sections/Projects.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders project titles and source links', () => {
    render(<Projects locale="en" />);
    expect(screen.getByText('RFM analytics dashboard')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /source/i }).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/sections/Projects.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Add placeholder project SVGs**

Create `public/projects/springboot.svg`, `public/projects/react.svg`, `public/projects/java.svg`. Each a simple 600×400 placeholder, e.g. `public/projects/react.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" role="img" aria-label="React">
  <rect width="600" height="400" fill="#0f172a"/>
  <text x="300" y="210" font-family="sans-serif" font-size="40" fill="#e2e8f0" text-anchor="middle">React</text>
</svg>
```

(Repeat for `springboot.svg` and `java.svg`, swapping the label text.)

- [ ] **Step 4: Implement `Projects`**

`src/components/sections/Projects.tsx`:

```tsx
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Projects({ locale }: { locale: Locale }) {
  const c = projects[locale];
  return (
    <section id="projects" className="border-y border-line bg-surface py-24">
      <Container>
        <SectionHeading eyebrow="04" title={c.heading} description={c.intro} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.items.map((p) => (
            <article key={p.title} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-canvas">
              <div className="relative aspect-[3/2] bg-line">
                <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
                </ul>
                <div className="mt-5 flex gap-4 text-sm font-semibold">
                  {p.sourceUrl && <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">Source →</a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-ink hover:underline">Live →</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Configure remote/allowed image paths**

The project images are local under `/public`, so no remote config is needed. Ensure `next.config.mjs` stays as-is.

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- src/components/sections/Projects.test.tsx`
Expected: PASS (the `next/image` mock from Task 1 keeps jsdom happy).

- [ ] **Step 7: Mount in page (after Skills)**

```tsx
import { Projects } from '@/components/sections/Projects';
// ...
      <Projects locale={locale} />
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: projects section with images"
```

---

## Task 13: Testimonials section

**Files:**
- Create: `src/components/sections/Testimonials.tsx`, `Testimonials.test.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write the failing test**

`src/components/sections/Testimonials.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Testimonials } from './Testimonials';

describe('Testimonials', () => {
  it('renders the quote text', () => {
    render(<Testimonials locale="en" />);
    expect(screen.getByText(/picks up new domains/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/sections/Testimonials.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `Testimonials`**

`src/components/sections/Testimonials.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { testimonials } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Testimonials({ locale }: { locale: Locale }) {
  const c = testimonials[locale];
  return (
    <section id="testimonials" className="py-24">
      <Container>
        <SectionHeading eyebrow="05" title={c.heading} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.items.map((t, i) => (
            <Card key={i}>
              <blockquote className="font-display text-xl leading-relaxed text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-ink">{t.name}</span>
                <span className="text-muted"> · {t.role}{t.company !== '—' ? `, ${t.company}` : ''}</span>
              </figcaption>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/sections/Testimonials.test.tsx`
Expected: PASS.

- [ ] **Step 5: Mount in page (after Projects)**

```tsx
import { Testimonials } from '@/components/sections/Testimonials';
// ...
      <Testimonials locale={locale} />
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: testimonials section"
```

---

## Task 14: Education & Certifications section

**Files:**
- Create: `src/components/sections/Education.tsx`, `Education.test.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write the failing test**

`src/components/sections/Education.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Education } from './Education';

describe('Education', () => {
  it('renders the section heading', () => {
    render(<Education locale="en" />);
    expect(screen.getByRole('heading', { name: /education & certifications/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/sections/Education.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `Education`**

`src/components/sections/Education.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { education } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Education({ locale }: { locale: Locale }) {
  const c = education[locale];
  return (
    <section id="education" className="py-24">
      <Container>
        <SectionHeading eyebrow="06" title={c.heading} />
        <ul className="mt-10 divide-y divide-line">
          {c.items.map((e, i) => (
            <li key={i} className="grid gap-1 py-6 md:grid-cols-[1fr_auto] md:items-baseline">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{e.title}</h3>
                <p className="text-sm text-accent">{e.org}</p>
                {e.detail && <p className="mt-1 text-sm text-muted">{e.detail}</p>}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{e.period}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/sections/Education.test.tsx`
Expected: PASS.

- [ ] **Step 5: Mount in page (after Testimonials)**

```tsx
import { Education } from '@/components/sections/Education';
// ...
      <Education locale={locale} />
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: education & certifications section"
```

---

## Task 15: Reveal motion wrapper + reduced-motion

**Files:**
- Create: `src/components/motion/Reveal.tsx`, `Reveal.test.tsx`
- Modify: all section components to wrap their top-level content in `<Reveal>`; Navbar/SiteFooter stay static.

**Interfaces:**
- Produces: `<Reveal as? delay?>` — Framer Motion `whileInView` fade/slide-up; honors `prefers-reduced-motion` (renders children statically).

- [ ] **Step 1: Write the failing test**

`src/components/motion/Reveal.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from './Reveal';

describe('Reveal', () => {
  it('renders children', () => {
    render(<Reveal><p>hello</p></Reveal>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/motion/Reveal.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `Reveal`**

`src/components/motion/Reveal.tsx`:

```tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/motion/Reveal.test.tsx`
Expected: PASS.

- [ ] **Step 5: Wrap section content in `Reveal`**

For each section component (`Hero`, `About`, `Experience`, `Skills`, `Projects`, `Testimonials`, `Education`, and the contact form from Task 16), import `Reveal` and wrap the inner `Container` content. Example for `About`:

```tsx
import { Reveal } from '@/components/motion/Reveal';
// ...
    <section id="about" className="py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow="01" title={c.heading} />
        </Reveal>
        <Reveal delay={0.1}>
          {/* existing body */}
        </Reveal>
      </Container>
    </section>
```

Apply the same two-`Reveal` pattern (heading + body) to Experience, Skills, Projects, Testimonials, Education. Leave `Hero` unwrapped (above-the-fold should paint immediately) or wrap only the intro/CTA with `Reveal delay={0.1}`.

- [ ] **Step 6: Verify build + that tests still pass**

Run: `npm test` → all green.
Run: `npm run build` → succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scroll-reveal motion wrapper with reduced-motion fallback"
```

---

## Task 16: Contact form (client) + Zod schema

**Files:**
- Create: `src/lib/validation.ts`, `src/lib/validation.test.ts`, `src/components/sections/Contact.tsx`, `Contact.test.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Produces: `contactSchema` (Zod), `ContactInput` type, and the `<Contact>` form with idle/submitting/success/error states. Posts to `/api/contact`.

- [ ] **Step 1: Write the failing validation tests**

`src/lib/validation.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { contactSchema } from './validation';

describe('contactSchema', () => {
  it('accepts a valid message', () => {
    const r = contactSchema.safeParse({ name: 'Ana', email: 'a@b.co', message: 'Hello there world' });
    expect(r.success).toBe(true);
  });
  it('rejects a bad email', () => {
    const r = contactSchema.safeParse({ name: 'Ana', email: 'nope', message: 'Hello there world' });
    expect(r.success).toBe(false);
  });
  it('rejects a too-short message', () => {
    const r = contactSchema.safeParse({ name: 'Ana', email: 'a@b.co', message: 'hi' });
    expect(r.success).toBe(false);
  });
  it('silently allows an empty honeypot field', () => {
    const r = contactSchema.safeParse({ name: 'Ana', email: 'a@b.co', message: 'Hello there world', company: '' });
    expect(r.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/validation.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/validation.ts`**

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(2000),
  company: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/validation.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Write the failing Contact form test**

`src/components/sections/Contact.test.tsx`:

```tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from './Contact';

afterEach(() => vi.restoreAllMocks());

describe('Contact', () => {
  it('submits valid input and shows success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }));
    render(<Contact locale="en" />);
    await userEvent.type(screen.getByLabelText(/name/i), 'Ana');
    await userEvent.type(screen.getByLabelText(/email/i), 'a@b.co');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello there world');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText(/thanks/i)).toBeInTheDocument();
  });

  it('shows an error when the server fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({ error: 'fail' }) }));
    render(<Contact locale="en" />);
    await userEvent.type(screen.getByLabelText(/name/i), 'Ana');
    await userEvent.type(screen.getByLabelText(/email/i), 'a@b.co');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello there world');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm test -- src/components/sections/Contact.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 7: Implement `Contact`**

`src/components/sections/Contact.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { contactSchema, type ContactInput } from '@/lib/validation';
import { contact } from '@/content';
import type { Locale } from '@/lib/i18n';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact({ locale }: { locale: Locale }) {
  const c = contact[locale];
  const [status, setStatus] = useState<Status>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactInput) {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  const inputCls = 'w-full rounded-lg border border-line bg-canvas px-4 py-3 text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent';

  return (
    <section id="contact" className="border-t border-line bg-surface py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="07" title={c.heading} description={c.intro} />
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* honeypot */}
          <input type="text" tabIndex={-1} autoComplete="off" aria-hidden {...register('company')} className="hidden" />
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">Name</label>
            <input id="name" className={inputCls} {...register('name')} />
            {errors.name && <p className="mt-1 text-sm text-accent">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">Email</label>
            <input id="email" type="email" className={inputCls} {...register('email')} />
            {errors.email && <p className="mt-1 text-sm text-accent">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">Message</label>
            <textarea id="message" rows={5} className={inputCls} {...register('message')} />
            {errors.message && <p className="mt-1 text-sm text-accent">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send →'}
          </Button>
          {status === 'success' && <p className="text-sm font-medium text-ink">Thanks — your message is on its way.</p>}
          {status === 'error' && <p className="text-sm font-medium text-accent">Something went wrong. Please email me directly.</p>}
        </form>
      </Container>
    </section>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm test -- src/components/sections/Contact.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 9: Mount in page (after Education)**

```tsx
import { Contact } from '@/components/sections/Contact';
// ...
      <Contact locale={locale} />
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: contact form with validation and states"
```

---

## Task 17: Contact API route + Resend

**Files:**
- Create: `src/lib/email.ts`, `src/app/api/contact/route.ts`, `src/app/api/contact/route.test.ts`
- Create: `.env.local` (gitignored; never committed)

**Interfaces:**
- Consumes: `contactSchema` (Task 16), `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- Produces: `POST /api/contact` returning `{ ok: true }` (200), `{ error }` (400 invalid), or `{ error }` (500 mail failure). Simple in-memory per-IP rate limit (5 req / 10 min). `sendContactEmail(input)` wrapper in `src/lib/email.ts`.

- [ ] **Step 1: Implement `src/lib/email.ts`**

```ts
import { Resend } from 'resend';
import type { ContactInput } from './validation';

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';
  if (!to) throw new Error('CONTACT_TO_EMAIL is not set');

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `Portfolio message from ${input.name}`,
    text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
  });
  if (error) throw new Error(error.message);
}
```

- [ ] **Step 2: Implement the route handler**

`src/app/api/contact/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const hits = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX;
}

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  // honeypot: silently accept and drop
  if (parsed.data.company) return NextResponse.json({ ok: true });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 });
  }
}
```

- [ ] **Step 3: Write the route test**

`src/app/api/contact/route.test.ts`:

```ts
import { describe, it, expect, vi, afterEach } from 'vitest';
import { POST } from './route';

afterEach(() => vi.restoreAllMocks());

describe('POST /api/contact', () => {
  it('returns 400 on invalid input', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'bad', message: 'hi' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 200 when email send succeeds', async () => {
    vi.mock('@/lib/email', () => ({ sendContactEmail: vi.fn().mockResolvedValue(undefined) }));
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Ana', email: 'a@b.co', message: 'Hello there world' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/app/api/contact/route.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Create local env (not committed)**

Create `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=tegarmachfudzi99@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

Ensure `.gitignore` contains `.env*.local` (CRA's gitignore already does; verify).

- [ ] **Step 6: Manual smoke test (with a real Resend key)**

Run: `npm run dev`, then:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"a@b.co","message":"Hello there world"}'
```

Expected: `{"ok":true}` and an email arriving at `CONTACT_TO_EMAIL`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: contact api route with resend + rate limiting"
```

---

## Task 18: SEO — metadata, sitemap, robots, JSON-LD, hreflang

**Files:**
- Modify: `src/app/[locale]/layout.tsx` (rich metadata + hreflang)
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo.ts`, `src/lib/seo.test.ts`

**Interfaces:**
- Produces: per-locale `Metadata` (title/description/OG/Twitter + `alternates.languages`), `sitemap()`, `robots()`, and `personJsonLd()` JSON-LD `Person`.

- [ ] **Step 1: Write the failing SEO test**

`src/lib/seo.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { personJsonLd } from './seo';

describe('personJsonLd', () => {
  it('includes name and sameAs links', () => {
    const json = personJsonLd('https://example.com');
    expect(json['@type']).toBe('Person');
    expect((json.sameAs as string[]).some((s) => s.includes('github'))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/seo.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/seo.ts`**

```ts
import { site } from '@/content';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export function personJsonLd(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.en.name,
    url,
    sameAs: site.en.socials.map((s) => s.href),
  };
}

export function localeAlternates(path = '') {
  return {
    languages: {
      en: `${BASE}/en${path}`,
      id: `${BASE}/id${path}`,
      'x-default': `${BASE}/en${path}`,
    },
  };
}

export { BASE };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Rich metadata in the layout**

Replace the `generateMetadata` in `src/app/[locale]/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { site } from '@/content';
import { localeAlternates, BASE } from '@/lib/seo';
import { hero } from '@/content';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const s = site[locale];
  const h = hero[locale];
  const title = `${s.name} — ${h.eyebrow}`;
  const description = h.intro;
  return {
    title,
    description,
    metadataBase: new URL(BASE),
    alternates: localeAlternates(),
    openGraph: { title, description, url: `${BASE}/${locale}`, siteName: s.name, locale: locale === 'id' ? 'id_ID' : 'en_US', type: 'profile' },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}
```

Add the JSON-LD script in the layout body (inside `<body>`, before `<ThemeProvider>`):

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(`${BASE}/${locale}`)) }} />
```

(import `personJsonLd` from `@/lib/seo` and remove the awkward placeholder title from Task 7).

- [ ] **Step 6: Implement sitemap + robots**

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { BASE } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/en`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/id`, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
```

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';
import { BASE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build` → succeeds; `/sitemap.xml` and `/robots.txt` are generated.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: seo metadata, sitemap, robots, json-ld, hreflang"
```

---

## Task 19: Localized not-found & error boundaries

**Files:**
- Create: `src/app/[locale]/not-found.tsx`, `src/app/[locale]/error.tsx`

- [ ] **Step 1: Implement `not-found`**

`src/app/[locale]/not-found.tsx`:

```tsx
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { locales } from '@/lib/i18n';

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-semibold text-ink">404</p>
      <p className="mt-4 text-muted">This page could not be found.</p>
      <div className="mt-8 flex gap-3">
        {locales.map((l) => (
          <Button key={l} variant="outline" href={`/${l}#home`} >{l.toUpperCase()}</Button>
        ))}
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Implement `error` boundary**

`src/app/[locale]/error.tsx`:

```tsx
'use client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-3xl font-semibold text-ink">Something went wrong.</p>
      <p className="mt-3 text-muted">Please try again.</p>
      <Button className="mt-8" onClick={() => reset()}>Try again</Button>
    </Container>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build` → succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: localized 404 and error boundary"
```

---

## Task 20: Final verification & cleanup

**Files:**
- Modify: `README.md` (update run instructions), `.gitignore` (ensure `.env*.local` ignored)

- [ ] **Step 1: Full test suite + typecheck**

Run: `npm test` → all green.
Run: `npm run typecheck` → no errors.
Run: `npm run lint` → no errors (fix any).

- [ ] **Step 2: Production build + static check**

Run: `npm run build`.
Confirm the output shows `/en` and `/id` as `○ (Static)` (prerendered), and `/api/contact` as `ƒ (Dynamic)`.

- [ ] **Step 3: Manual cross-locale + theme check**

Run: `npm run dev`.
- Visit `/` → redirects to `/en`.
- `/en` and `/id` render all sections; nav anchors scroll; active link highlights.
- Theme toggle switches light/dark; reload persists choice.
- Language toggle swaps `/en`↔`/id`.
- Submit the contact form → success state (with env set).

- [ ] **Step 4: Update README**

Replace CRA instructions in `README.md` with: prerequisites (Node 18+), `npm install`, `npm run dev`, env vars (copy `.env.example` → `.env.local`), and Vercel deploy notes.

- [ ] **Step 5: Ensure `.env*.local` is ignored**

Confirm `.gitignore` contains `.env*.local` (it does from CRA). Confirm no secrets are staged:

```bash
git status --porcelain | grep -i env
```
Expected: no `.env.local` listed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: readme, final verification, cleanup"
```

---

## Self-Review

**Spec coverage** — every spec section maps to a task:
- Visual system (§4): Tasks 2 (tokens/fonts), 3 (primitives), applied across 8–14.
- IA / sections (§5): Tasks 7 (shell), 8–14, 16.
- Content model (§6): Task 6 (all bundles + types, placeholders marked `// TODO`).
- i18n (§7): Tasks 4 (config/middleware), 7 (LanguageToggle), 18 (hreflang).
- Component architecture (§8): Tasks 3, 5, 7, 8–14, 15 (Reveal).
- Features — dark mode (§9.1): Task 5. Animations (§9.2): Task 15. Contact (§9.3): Tasks 16–17.
- SEO/perf (§10): Tasks 18 (metadata/sitemap/robots/JSON-LD/hreflang), 2 (`next/font`), 12 (`next/image`), 20 (static-gen check).
- Error handling (§11): Task 19, plus inline form errors (16) + route errors (17).
- Testing (§12): Vitest + RTL across tasks; meaningful tests for `cn`, i18n, validation, route, content integrity, and key components.
- Project structure (§13): established in Task 1, followed throughout.
- Deployment (§14): env documented in Task 1/17; build verified Task 20.
- Migration (§15): CRA removal in Task 1; real data carried into Task 6.
- Open questions (§16): surfaced as `// TODO` placeholders in Task 6 content files.

**Placeholder scan** — no "TBD/TODO/implement later" in the plan's own steps; the only `// TODO` strings are intentional content placeholders for the owner to fill (per spec §6). All code blocks are complete.

**Type consistency** — `Locale`, `cn`, `contactSchema`/`ContactInput`, content types (`HeroContent`, `ExperienceItem`, `SkillCategory`, `ProjectItem`, `TestimonialItem`, `EducationItem`, `SiteContent`), `sendContactEmail`, `personJsonLd`, `localeAlternates` are defined once and referenced consistently. Section components share the `({ locale }: { locale: Locale })` signature.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-27-portfolio-redesign.md`.
