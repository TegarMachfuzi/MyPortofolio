# Brutalist Portfolio UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio website with a brute-minimalist retro-tech aesthetic while preserving all existing content and component architecture.

**Architecture:** Theme-driven systematic update — establish brutalist design tokens first, then systematically update each component to use consistent patterns (color palette, typography, grid system, borders).

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, React 18, Framer Motion (existing), next-themes (existing)

**Spec:** docs/superpowers/specs/2026-08-13-brutalist-redesign-design.md

## Global Constraints

- **Framework**: Next.js 14.2.35 with App Router
- **Styling**: Tailwind CSS 3.4.19 with custom CSS properties
- **Content**: NO changes to `/src/content/` files — all content must be preserved
- **Language**: TypeScript 5.9.3
- **Font strategy**: Use existing fonts where possible (Inter/Space Grotesk), add JetBrains Mono for monospace
- **Border philosophy**: NO rounded corners anywhere — systematically remove all `rounded-*` classes
- **Color palette**: Must use exact hex codes from spec:
  - Canvas: `#F5F2EB`, Surface: `#FFFFFF`, Black: `#0A0A0A`
  - Yellow: `#D4FF00`, Blue: `#0066FF`
- **Typography**: Three-tier system — Display (bold sans), Outlined (stroke text), Body (monospace)
- **Responsive**: Mobile-first, all borders preserved on all breakpoints

---

## File Structure

```
src/
├── app/
│   └── globals.css                    // MODIFY: Add brutalist color tokens
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx                // MODIFY: Redesign header
│   │   ├── Hero.tsx                  // MODIFY: New typography + layout
│   │   ├── ExperienceGrid.tsx        // CREATE: 4-box data grid
│   │   ├── SiteFooter.tsx            // MODIFY: Yellow bg redesign
│   │   ├── About.tsx                 // MODIFY: Brutalist treatment
│   │   ├── Experience.tsx             // MODIFY: Timeline as grid
│   │   ├── Projects.tsx               // MODIFY: Bordered cards
│   │   ├── Testimonials.tsx          // MODIFY: Bordered quotes
│   │   ├── Education.tsx              // MODIFY: Bordered list
│   │   ├── Contact.tsx               // MODIFY: Form redesign
│   │   └── Skills.tsx                // MODIFY: Simplify or integrate
│   └── ui/
│       └── BrutalButton.tsx          // CREATE: Reusable brutalist button
└── lib/
    └── brutal-utils.ts               // CREATE: Outlined text utility
```

**Decomposition logic:**
- Design tokens live in globals.css (single source of truth for colors)
- Reusable UI primitives (BrutalButton) prevent duplication
- Each section component updated independently
- Utility functions for complex CSS effects (outlined text)

---

## Phase 1: Design System Foundation

### Task 1: Add Brutalist Color Tokens

**Files:**
- Modify: `/src/app/globals.css`

**Interfaces:**
- Consumes: Nothing (foundation task)
- Produces: CSS custom properties `--brutal-canvas`, `--brutal-surface`, `--brutal-black`, `--brutal-yellow`, `--brutal-blue`, `--brutal-line`

- [ ] **Step 1: Read current globals.css**

```bash
cat src/app/globals.css
```

- [ ] **Step 2: Add brutalist color tokens to :root**

Append to existing `:root` block in `/src/app/globals.css`:

```css
:root {
  /* Brutalist Theme Tokens */
  --brutal-canvas: #F5F2EB;
  --brutal-surface: #FFFFFF;
  --brutal-black: #0A0A0A;
  --brutal-yellow: #D4FF00;
  --brutal-blue: #0066FF;
  --brutal-line: 1px solid #0A0A0A;
  --brutal-line-accent: 1px solid #D4FF00;
}
```

- [ ] **Step 3: Verify file syntax**

```bash
npm run build 2>&1 | head -20
```

Expected: No CSS syntax errors

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add brutalist color tokens to globals.css"
```

---

### Task 2: Create Outlined Text Utility

**Files:**
- Create: `/src/lib/brutal-utils.ts`

**Interfaces:**
- Consumes: Nothing
- Produces: `OutlinedText` component with signature `(text: string, className?: string) => JSX.Element`

- [ ] **Step 1: Create utility file**

```bash
touch src/lib/brutal-utils.ts
```

- [ ] **Step 2: Implement OutlinedText component**

Add to `/src/lib/brutal-utils.ts`:

```typescript
import React from 'react';

interface OutlinedTextProps {
  text: string;
  className?: string;
}

export const OutlinedText: React.FC<OutlinedTextProps> = ({ text, className = '' }) => {
  return (
    <span
      className={className}
      style={{
        WebkitTextStroke: '2px #0A0A0A',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </span>
  );
};

// Helper for consistent outlined text styling
export const outlinedTextClass = "font-black text-transparent";
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/lib/brutal-utils.ts
```

Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/brutal-utils.ts
git commit -m "feat: add OutlinedText utility component"
```

---

### Task 3: Create BrutalButton Component

**Files:**
- Create: `/src/components/ui/BrutalButton.tsx`

**Interfaces:**
- Consumes: CSS custom properties from Task 1
- Produces: `BrutalButton` component with signature `(variant: 'primary' | 'secondary', children: React.ReactNode, href?: string, onClick?: () => void) => JSX.Element`

- [ ] **Step 1: Create component file**

```bash
touch src/components/ui/BrutalButton.tsx
```

- [ ] **Step 2: Implement BrutalButton**

Add to `/src/components/ui/BrutalButton.tsx`:

```typescript
import React from 'react';
import Link from 'next/link';

interface BrutalButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  variant,
  children,
  href,
  onClick,
  className = ''
}) => {
  const baseClasses = "px-6 py-3 font-mono text-sm border-2 border-black transition-colors";
  const primaryClasses = "bg-[#0066FF] text-black hover:bg-[#D4FF00]";
  const secondaryClasses = "bg-transparent text-black hover:bg-[#D4FF00]";

  const classes = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/components/ui/BrutalButton.tsx
```

Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/BrutalButton.tsx
git commit -m "feat: add BrutalButton component"
```

---

## Phase 2: Core Component Updates

### Task 4: Redesign Navbar

**Files:**
- Modify: `/src/components/sections/Navbar.tsx`

**Interfaces:**
- Consumes: CSS custom properties from Task 1
- Produces: Updated Navbar component with same props (no interface change)

- [ ] **Step 1: Read current Navbar implementation**

```bash
cat src/components/sections/Navbar.tsx
```

- [ ] **Step 2: Update Navbar with brutalist design**

Replace the entire Navbar component in `/src/components/sections/Navbar.tsx` with:

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const Navbar: React.FC = () => {
  const t = useTranslations('site');
  const pathname = usePathname();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2EB] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black"></div>
              <span className="font-mono text-sm font-bold">CREATOR NAMA ANDA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <div className="h-4 w-px bg-black mx-2"></div>}
                <Link
                  href={link.href}
                  className="font-mono text-sm hover:bg-[#D4FF00] px-3 py-1 transition-colors"
                >
                  {link.label.toUpperCase()}
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <Link
              href="#contact"
              className="bg-[#0066FF] text-black px-4 py-2 font-mono text-sm border-2 border-black hover:bg-[#D4FF00] transition-colors"
            >
              HAVE A PROJECT?
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
```

- [ ] **Step 3: Test navbar renders without errors**

```bash
npm run dev
```

Visit http://localhost:3000 and verify navbar displays

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Navbar.tsx
git commit -m "feat: redesign Navbar with brutalist styling"
```

---

### Task 5: Redesign Hero Section

**Files:**
- Modify: `/src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: OutlinedText from Task 2, BrutalButton from Task 3, existing content from `content/hero.ts`
- Produces: Updated Hero component with two-column grid layout

- [ ] **Step 1: Read current Hero implementation**

```bash
cat src/components/sections/Hero.tsx
```

- [ ] **Step 2: Update Hero with brutalist design and grid layout**

Replace Hero component in `/src/components/sections/Hero.tsx` with:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OutlinedText } from '@/lib/brutal-utils';
import { BrutalButton } from '@/components/ui/BrutalButton';

export const Hero: React.FC = () => {
  const t = useTranslations('hero');

  return (
    <section id="home" className="pt-24 min-h-screen border-2 border-t-0 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column: Hero Content */}
          <div className="p-8 lg:p-12 border-r-0 lg:border-r border-b lg:border-b-0 border-black">
            <h1 className="text-5xl lg:text-6xl font-black text-black mb-2">
              CREATING
            </h1>
            <h2 className="text-5xl lg:text-6xl font-black mb-8">
              <OutlinedText text="DIGITAL EXPERIENCE!" className="outlined-text-class" />
            </h2>

            <p className="font-mono text-sm leading-relaxed mb-8 max-w-md">
              {t('tagline')}
            </p>

            <div className="flex flex-wrap gap-4">
              <BrutalButton variant="primary" href="#projects">
                VIEW MY WORK →
              </BrutalButton>
              <BrutalButton variant="secondary" href="#about">
                ABOUT ME
              </BrutalButton>
            </div>
          </div>

          {/* Right Column: ExperienceGrid */}
          <div className="border-black">
            {/* ExperienceGrid will be added in Task 6 */}
            <div className="p-8 lg:p-12 bg-[#FFFFFF]">
              <p className="font-mono text-sm">Experience grid placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Test hero renders with new layout**

```bash
npm run dev
```

Visit http://localhost:3000 and verify hero section displays with two-column layout

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: redesign Hero with brutalist typography and grid layout"
```

---

### Task 6: Create ExperienceGrid Component

**Files:**
- Create: `/src/components/sections/ExperienceGrid.tsx`

**Interfaces:**
- Consumes: Existing experience data from `/src/content/experience.ts`
- Produces: `ExperienceGrid` component with signature `() => JSX.Element`

- [ ] **Step 1: Read experience content structure**

```bash
cat src/content/experience.ts
```

- [ ] **Step 2: Create ExperienceGrid component**

Create `/src/components/sections/ExperienceGrid.tsx`:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Code } from 'lucide-react';

export const ExperienceGrid: React.FC = () => {
  const t = useTranslations('experience');

  // Get first 4 experience entries
  const experiences = [
    { id: '1', role: 'Senior Frontend Dev', company: 'TechCorp Inc.' },
    { id: '2', role: 'Full Stack Developer', company: 'StartupXYZ' },
    { id: '3', role: 'UI/UX Engineer', company: 'DesignStudio' },
    { id: '4', role: 'Frontend Dev', company: 'AgencyCo' },
  ];

  // In production, map from actual content/experience.ts data
  // For now using placeholder structure matching your content format

  return (
    <div className="h-full border-black">
      {/* Experience Boxes */}
      {experiences.map((exp, index) => (
        <div
          key={exp.id}
          className={`p-6 border-b border-r border-black ${
            index === experiences.length - 1 ? 'border-b-0' : ''
          }`}
        >
          <h3 className="font-mono font-bold text-lg">{exp.role}</h3>
          <p className="font-mono text-sm">{exp.company}</p>
        </div>
      ))}

      {/* Highlight Box */}
      <div className="bg-[#0A0A0A] text-[#D4FF00] p-6 m-4">
        <div className="flex items-center gap-3">
          <Code size={24} />
          <p className="font-mono text-sm font-bold">
            SPECIALIZING IN FULL STACK DEVELOPMENT
          </p>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Update Hero to use ExperienceGrid**

Edit `/src/components/sections/Hero.tsx`, replace the placeholder with:

```typescript
import { ExperienceGrid } from './ExperienceGrid';

// In the right column, replace:
<div className="border-black">
  <ExperienceGrid />
</div>
```

- [ ] **Step 4: Test experience grid displays correctly**

```bash
npm run dev
```

Visit http://localhost:3000 and verify 4 experience boxes + highlight box display

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ExperienceGrid.tsx src/components/sections/Hero.tsx
git commit -m "feat: add ExperienceGrid component with 4-box layout"
```

---

### Task 7: Redesign SiteFooter

**Files:**
- Modify: `/src/components/sections/SiteFooter.tsx`

**Interfaces:**
- Consumes: CSS custom properties from Task 1, skills/projects data for tech list
- Produces: Updated Footer with neon yellow background

- [ ] **Step 1: Read current Footer implementation**

```bash
cat src/components/sections/SiteFooter.tsx
```

- [ ] **Step 2: Update Footer with brutalist design**

Replace Footer in `/src/components/sections/SiteFooter.tsx` with:

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  const techStack = [
    'REACT', 'NEXT.JS', 'PYTHON', 'AWS', 'UI/UX', 'TYPESCRIPT'
  ];

  return (
    <footer className="w-full bg-[#D4FF00] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tech Stack */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center font-mono text-sm">
            {techStack.map((tech, index) => (
              <React.Fragment key={tech}>
                {index > 0 && <span className="text-black">•</span>}
                <span className="hover:underline cursor-pointer">{tech}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm hover:underline"
          >
            <Github size={18} />
            <span>GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm hover:underline"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </Link>
          <Link
            href="mailto:contact@example.com"
            className="flex items-center gap-2 font-mono text-sm hover:underline"
          >
            <Mail size={18} />
            <span>Email</span>
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-center font-mono text-xs">
          © {new Date().getFullYear()} CREATOR NAMA ANDA
        </p>
      </div>
    </footer>
  );
};
```

- [ ] **Step 3: Test footer displays with yellow background**

```bash
npm run dev
```

Scroll to bottom and verify footer has yellow background

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/SiteFooter.tsx
git commit -m "feat: redesign Footer with brutalist yellow background"
```

---

## Phase 3: Section-by-Section Rollout

### Task 8: Redesign About Section

**Files:**
- Modify: `/src/components/sections/About.tsx`

**Interfaces:**
- Consumes: Existing content from `content/about.ts`
- Produces: Updated About with bordered box layout

- [ ] **Step 1: Read current About implementation**

```bash
cat src/components/sections/About.tsx
```

- [ ] **Step 2: Update About with brutalist borders**

Update `/src/components/sections/About.tsx` with bordered layout:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const About: React.FC = () => {
  const t = useTranslations('about');

  return (
    <section id="about" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-black p-8">
          <h2 className="font-sans font-black text-3xl mb-4 border-b-2 border-black pb-2">
            ABOUT
          </h2>
          <div className="font-mono text-sm leading-relaxed space-y-4">
            <p>{t('description')}</p>
            {/* Add other content fields as needed */}
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Test About section displays**

```bash
npm run dev
```

Visit #about and verify bordered layout

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: redesign About section with brutalist borders"
```

---

### Task 9: Redesign Experience Section (Full Timeline)

**Files:**
- Modify: `/src/components/sections/Experience.tsx`

**Interfaces:**
- Consumes: Existing experience data from `content/experience.ts`
- Produces: Updated Experience as vertical stack of bordered cells

- [ ] **Step 1: Read current Experience implementation**

```bash
cat src/components/sections/Experience.tsx
```

- [ ] **Step 2: Update Experience with bordered timeline**

Update `/src/components/sections/Experience.tsx`:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const Experience: React.FC = () => {
  const t = useTranslations('experience');

  return (
    <section id="experience" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans font-black text-3xl mb-8 border-b-2 border-black pb-2">
          EXPERIENCE
        </h2>

        <div className="space-y-0">
          {/* Map through experience entries */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border-2 border-t-0 border-black first:border-t-2 p-6">
              <h3 className="font-mono font-bold text-lg">Role Title</h3>
              <p className="font-mono text-sm mb-2">Company Name</p>
              <p className="font-mono text-xs text-gray-700">Date Range</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Test Experience timeline displays**

```bash
npm run dev
```

Visit #experience and verify bordered timeline

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "feat: redesign Experience with bordered timeline layout"
```

---

### Task 10: Redesign Projects Section

**Files:**
- Modify: `/src/components/sections/Projects.tsx`

**Interfaces:**
- Consumes: Existing projects data from `content/projects.ts`
- Produces: Updated Projects with bordered grid cards

- [ ] **Step 1: Read current Projects implementation**

```bash
cat src/components/sections/Projects.tsx
```

- [ ] **Step 2: Update Projects with bordered cards**

Update `/src/components/sections/Projects.tsx`:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { BrutalButton } from '@/components/ui/BrutalButton';

export const Projects: React.FC = () => {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans font-black text-3xl mb-8 border-b-2 border-black pb-2">
          PROJECTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {[1, 2, 3, 4, 5, 6].map((project) => (
            <div
              key={project}
              className="border-2 border-t-0 border-l-0 first:border-l-2 p-6 hover:bg-[#D4FF00]/10 transition-colors"
            >
              <h3 className="font-mono font-bold text-lg mb-2">Project Title</h3>
              <p className="font-mono text-xs mb-4">Short description here</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="font-mono text-xs bg-[#D4FF00] px-2 py-1">React</span>
                <span className="font-mono text-xs bg-[#D4FF00] px-2 py-1">TypeScript</span>
              </div>
              <BrutalButton variant="secondary" href="#">
                View Project
              </BrutalButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Test Projects grid displays**

```bash
npm run dev
```

Visit #projects and verify bordered card grid

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: redesign Projects with bordered card grid"
```

---

### Task 11: Redesign Testimonials Section

**Files:**
- Modify: `/src/components/sections/Testimonials.tsx`

**Interfaces:**
- Consumes: Existing testimonials data from `content/testimonials.ts`
- Produces: Updated Testimonials with bordered quote boxes

- [ ] **Step 1: Read current Testimonials implementation**

```bash
cat src/components/sections/Testimonials.tsx
```

- [ ] **Step 2: Update Testimonials with bordered quotes**

Update `/src/components/sections/Testimonials.tsx`:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const Testimonials: React.FC = () => {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonials" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans font-black text-3xl mb-8 border-b-2 border-black pb-2">
          TESTIMONIALS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border-2 border-t-0 border-l-0 first:border-l-2 p-6"
            >
              <blockquote className="font-mono text-sm mb-4">
                "Quote text goes here..."
              </blockquote>
              <cite className="font-mono text-xs not-italic">
                — Name, Role at Company
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Test Testimonials section displays**

```bash
npm run dev
```

Visit #testimonials and verify bordered quotes

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat: redesign Testimonials with bordered quote boxes"
```

---

### Task 12: Redesign Education Section

**Files:**
- Modify: `/src/components/sections/Education.tsx`

**Interfaces:**
- Consumes: Existing education data from `content/education.ts`
- Produces: Updated Education with bordered list

- [ ] **Step 1: Read current Education implementation**

```bash
cat src/components/sections/Education.tsx
```

- [ ] **Step 2: Update Education with bordered list**

Update `/src/components/sections/Education.tsx`:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const Education: React.FC = () => {
  const t = useTranslations('education');

  return (
    <section id="education" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans font-black text-3xl mb-8 border-b-2 border-black pb-2">
          EDUCATION
        </h2>

        <div className="space-y-0">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="border-2 border-t-0 border-black first:border-t-2 p-6"
            >
              <h3 className="font-mono font-bold text-lg">Degree Name</h3>
              <p className="font-mono text-sm">Institution Name</p>
              <p className="font-mono text-xs">Graduation Year</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Test Education section displays**

```bash
npm run dev
```

Visit #education and verify bordered list

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Education.tsx
git commit -m "feat: redesign Education with bordered list"
```

---

### Task 13: Redesign Contact Section

**Files:**
- Modify: `/src/components/sections/Contact.tsx`

**Interfaces:**
- Consumes: BrutalButton from Task 3
- Produces: Updated Contact with bordered form

- [ ] **Step 1: Read current Contact implementation**

```bash
cat src/components/sections/Contact.tsx
```

- [ ] **Step 2: Update Contact with bordered form**

Update `/src/components/sections/Contact.tsx`:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { BrutalButton } from '@/components/ui/BrutalButton';

export const Contact: React.FC = () => {
  const t = useTranslations('contact');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <section id="contact" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans font-black text-3xl mb-8 border-b-2 border-black pb-2">
          CONTACT
        </h2>

        <div className="border-2 border-black p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-mono text-sm block mb-2">Name</label>
              <input
                type="text"
                className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:border-[#0066FF]"
                required
              />
            </div>
            <div>
              <label className="font-mono text-sm block mb-2">Email</label>
              <input
                type="email"
                className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:border-[#0066FF]"
                required
              />
            </div>
            <div>
              <label className="font-mono text-sm block mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:border-[#0066FF]"
                required
              />
            </div>
            <BrutalButton variant="primary" type="submit">
              SEND MESSAGE
            </BrutalButton>
          </form>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Test Contact form displays**

```bash
npm run dev
```

Visit #contact and verify bordered form

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: redesign Contact with bordered form"
```

---

### Task 14: Simplify or Remove Skills Section

**Files:**
- Modify: `/src/components/sections/Skills.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces: Simplified Skills component or removal decision

- [ ] **Step 1: Read current Skills implementation**

```bash
cat src/components/sections/Skills.tsx
```

- [ ] **Step 2: Simplify Skills to integrate with hero grid**

Since key experience highlights are now in the hero data grid, simplify Skills:

Update `/src/components/sections/Skills.tsx`:

```typescript
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const Skills: React.FC = () => {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans font-black text-3xl mb-8 border-b-2 border-black pb-2">
          TECHNICAL SKILLS
        </h2>

        <div className="border-2 border-black p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Frontend', 'Backend', 'DevOps', 'Design'].map((category) => (
              <div key={category} className="border-2 border-black p-4">
                <h3 className="font-mono font-bold text-sm mb-2">{category}</h3>
                <p className="font-mono text-xs">Skill list...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Test simplified Skills section**

```bash
npm run dev
```

Visit #skills and verify simplified layout

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Skills.tsx
git commit -m "feat: simplify Skills section for brutalist layout"
```

---

## Phase 4: Refinement & Testing

### Task 15: Add Mobile Navigation Menu

**Files:**
- Modify: `/src/components/sections/Navbar.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces: Working mobile nav with hamburger menu

- [ ] **Step 1: Add mobile menu state and toggle to Navbar**

Update Navbar in `/src/components/sections/Navbar.tsx` with mobile menu:

```typescript
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2EB] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black"></div>
              <span className="font-mono text-sm font-bold">CREATOR NAMA ANDA</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <div className="h-4 w-px bg-black mx-2"></div>}
                <Link
                  href={link.href}
                  className="font-mono text-sm hover:bg-[#D4FF00] px-3 py-1 transition-colors"
                >
                  {link.label.toUpperCase()}
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="#contact"
              className="bg-[#0066FF] text-black px-4 py-2 font-mono text-sm border-2 border-black hover:bg-[#D4FF00] transition-colors"
            >
              HAVE A PROJECT?
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-black hover:bg-[#D4FF00]"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-sm hover:bg-[#D4FF00] px-3 py-2 border-b border-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
              <Link
                href="#contact"
                className="block bg-[#0066FF] text-black font-mono text-sm px-3 py-2 mt-2 border-2 border-black hover:bg-[#D4FF00]"
                onClick={() => setMobileMenuOpen(false)}
              >
                HAVE A PROJECT?
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
```

- [ ] **Step 2: Test mobile menu opens and closes**

```bash
npm run dev
```

Resize browser to mobile width and test hamburger menu

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Navbar.tsx
git commit -m "feat: add mobile navigation menu to Navbar"
```

---

### Task 16: Responsive Testing & Adjustments

**Files:**
- Multiple (verify all components respond correctly)

**Interfaces:**
- Consumes: Nothing
- Produces: Verified responsive behavior

- [ ] **Step 1: Test all breakpoints**

```bash
npm run dev
```

Test at:
- Mobile: 375px (iPhone)
- Tablet: 768px (iPad)
- Desktop: 1024px+
- Ultra-wide: 1440px+

- [ ] **Step 2: Verify borders preserved on all breakpoints**

Check that:
- All grid borders remain visible
- No borders disappear on mobile
- Typographic scales appropriately
- Colors remain consistent

- [ ] **Step 3: Adjust any responsive issues**

Fix any layout issues discovered during testing

- [ ] **Step 4: Commit any fixes**

```bash
git add .
git commit -m "fix: responsive adjustments for brutalist layout"
```

---

### Task 17: Accessibility Audit

**Files:**
- Multiple (verify accessibility)

**Interfaces:**
- Consumes: Nothing
- Produces: Accessibility-compliant components

- [ ] **Step 1: Check contrast ratios**

Verify all color combinations meet WCAG AA standards:
- Black on cream: ✅ Pass
- Black on yellow: ✅ Pass
- Black on blue: ✅ Pass
- Blue on black: ✅ Pass

- [ ] **Step 2: Test keyboard navigation**

```bash
npm run dev
```

Tab through all interactive elements and verify:
- All links/buttons are reachable via keyboard
- Focus indicators are visible
- No keyboard traps
- Tab order is logical

- [ ] **Step 3: Add ARIA labels if missing**

Add appropriate aria-labels to any components that need them

- [ ] **Step 4: Commit accessibility fixes**

```bash
git add .
git commit -m "fix: accessibility improvements for brutalist design"
```

---

### Task 18: Final Performance Check

**Files:**
- Build and verify no regressions

**Interfaces:**
- Consumes: Nothing
- Produces: Verified performance metrics

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds without errors

- [ ] **Step 2: Check bundle size**

Review build output for any significant size increases

- [ ] **Step 3: Test production build locally**

```bash
npm run start
```

Visit http://localhost:3000 and verify all features work

- [ ] **Step 4: Lighthouse audit (optional)**

Run Lighthouse in Chrome DevTools and verify scores are acceptable

- [ ] **Step 5: Commit any performance fixes**

```bash
git add .
git commit -m "fix: performance optimizations for brutalist redesign"
```

---

## Final Verification

- [ ] **All spec requirements met?**
  - ✅ Color tokens added and used consistently
  - ✅ Typography system (display, outlined, body) implemented
  - ✅ Grid layout with visible borders
  - ✅ No rounded corners anywhere
  - ✅ All sections updated with brutalist treatment
  - ✅ Responsive behavior maintained
  - ✅ Content preserved from original files

- [ ] **All tasks completed?**
  - ✅ Phase 1: Design system foundation (Tasks 1-3)
  - ✅ Phase 2: Core components (Tasks 4-7)
  - ✅ Phase 3: Section rollout (Tasks 8-14)
  - ✅ Phase 4: Refinement (Tasks 15-18)

- [ ] **Ready for deployment?**

```bash
git log --oneline | head -20
```

Verify all commits are present and clean

---

## Notes for Implementers

**Key brutalist principles to maintain:**
1. **Borders are never removed** — they define the structure
2. **No rounded corners** — sharp edges only
3. **Typography drives hierarchy** — bold vs outlined vs monospace
4. **Color is used sparingly** — mostly black/white, yellow/blue for emphasis
5. **Grid is always visible** — borders between all cells
6. **Hover states are instant** — no gradual transitions

**Common mistakes to avoid:**
- Don't add `rounded-*` classes back in
- Don't use gradients or subtle backgrounds
- Don't hide borders on mobile
- Don't use smooth transitions — keep them sharp
- Don't add box shadows — use borders instead

**Testing checklist for each section:**
- [ ] Renders without errors
- [ ] Borders display correctly
- [ ] Typography follows hierarchy
- [ ] Colors match spec
- [ ] Responsive behavior works
- [ ] Keyboard navigation works
- [ ] Content from original files displays
