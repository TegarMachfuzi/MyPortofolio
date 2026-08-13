# Brutalist Portfolio UI Redesign

**Date**: 2026-08-13
**Status**: Design Approved, Pending Implementation
**Approach**: Theme-Driven Systematic Update

## Overview

A comprehensive visual redesign of the portfolio website applying a brute-minimalist retro-tech aesthetic across all sections while preserving existing content and component architecture. The redesign establishes a new design system layer that systematically updates components to use consistent brutalist patterns.

**Key Characteristics**: Raw, honest, techy, direct — strict grids, fine borders, bold typography with outlined effects, and a high-contrast color palette.

---

## Design System Foundation

### Color Tokens

New CSS custom properties to be added to `globals.css`:

```css
:root {
  /* Backgrounds */
  --brutal-canvas: #F5F2EB;      /* Soft off-white (cream/bone) */
  --brutal-surface: #FFFFFF;     /* Pure white for cards/boxes */
  --brutal-black: #0A0A0A;       /* Deep black for text/accents */

  /* Accents */
  --brutal-yellow: #D4FF00;      /* Neon yellow/lime-green for highlights */
  --brutal-blue: #0066FF;        /* Electric blue for CTAs/interactive */

  /* Structural */
  --brutal-line: 1px solid #0A0A0A;  /* Fine black borders */
  --brutal-line-accent: 1px solid var(--brutal-yellow);
}
```

These tokens complement the existing color system and will be applied consistently across all components.

### Typography Scale

Three-tier typographic system for extreme contrast:

1. **Display (Hero headlines)**: Extra-bold sans-serif, 4-6rem, heavy black
2. **Outlined (Secondary headlines)**: Same font family with `-webkit-text-stroke: 2px black` and `text-transparent` fill
3. **Body**: Monospace (JetBrains Mono or similar) for raw, techy feel
4. **UI**: Sans-serif for navigation, buttons, labels

**Implementation**: Use existing font family (Inter/Space Grotesk) where possible to minimize dependencies.

### Grid System

- **Desktop**: 12-column CSS Grid, 2-column main body (5+7 or 6+6 split)
- **Mobile**: Single column, stacked vertically
- **Borders**: Visible grid lines via `border` on all grid cells
- **Philosophy**: Every cell gets `border-r border-b border-black` except last/right edges

---

## Layout Architecture

### Overall Page Structure

```
┌─────────────────────────────────────────────────────┐
│  HEADER (fixed, full-width)                          │
│  [Logo] [Nav Links] [CTA Button]                    │
├─────────────────────────────────────────────────────┤
│  MAIN (container, max-width, centered)               │
│  ┌──────────────────┬─────────────────────────────┐ │
│  │  HERO CONTENT    │  DATA GRID (4 boxes)         │ │
│  │  - Headline      │  - Exp Entry 1               │ │
│  │  - Body text     │  - Exp Entry 2               │ │
│  │  - 2 CTAs        │  - Exp Entry 3               │ │
│  │                  │  - Exp Entry 4               │ │
│  │                  │  ┌───────────────────────┐   │ │
│  │                  │  │ HIGHLIGHT BOX         │   │ │
│  │                  │  │ (Full Stack Dev)      │   │ │
│  │                  │  └───────────────────────┘   │ │
│  └──────────────────┴─────────────────────────────┘ │
│                                                       │
│  ABOUT SECTION (bordered grid)                        │
│  EXPERIENCE SECTION (timeline as grid)               │
│  PROJECTS SECTION (grid cards)                       │
│  TESTIMONIALS, EDUCATION, CONTACT                    │
├─────────────────────────────────────────────────────┤
│  FOOTER (full-width, neon yellow bg)                  │
│  Scrolling/static tech logos                          │
└─────────────────────────────────────────────────────┘
```

**Main Container**: `max-w-7xl mx-auto` (preserving current approach)
**Grid Pattern**: All sections use the same visible border pattern for consistency

---

## Component Specifications

### Header/Navbar

**File**: `/src/components/sections/Navbar.tsx`

**Design Changes**:
- Fixed positioning, full width
- Bottom border: `border-b-2 border-black`
- **Top-left**: Circular icon + "CREATOR NAMA ANDA" (monospace font)
- **Center**: Navigation links in flex row with `border-r` dividers between each link
- **Top-right**: "HAVE A PROJECT?" button (solid electric blue, black text, sharp borders)
- Theme toggle: Remove or make significantly more subtle

**Key Visual Elements**:
- Fine borders separating nav items
- Sharp edges (no rounded corners)
- Hover states: Instant, sharp color changes (yellow or blue background)

---

### Hero Section (Left Column)

**File**: `/src/components/sections/Hero.tsx`

**Structure**:
```
┌─────────────────────────────┐
│ CREATING                    │  ← Extra-bold black sans
│ DIGITAL EXPERIENCE!         │  ← Outlined stroke font
│                             │
│ [Monospace intro text...]   │  ← 2-3 lines body copy
│                             │
│ [VIEW MY WORK →]  [ABOUT ME]│  ← Solid blue + outline btns
└─────────────────────────────┘
```

**Typography**:
- Upper line: `text-5xl lg:text-6xl font-black text-black`
- Lower line: `text-5xl lg:text-6xl font-black text-transparent -webkit-text-stroke-2`
- Body: `font-mono text-sm leading-relaxed`

**Buttons**:
- Primary: `bg-[var(--brutal-blue)] text-black px-6 py-3 border-2 border-black hover:bg-[var(--brutal-yellow)]`
- Secondary: `bg-transparent border-2 border-black px-6 py-3 hover:bg-[var(--brutal-yellow)]`

**Content**: Preserve existing hero content from `content/hero.ts`

---

### Data Grid (Right Column)

**New File**: `/src/components/sections/ExperienceGrid.tsx`

**Structure**: Stack of 4 bordered boxes with horizontal dividers:

```
┌─────────────────────────────┐
│  Senior Frontend Dev        │  ← Role (bold monospace)
│  TechCorp Inc.              │  ← Company
├─────────────────────────────┤
│  Full Stack Developer       │
│  StartupXYZ                 │
├─────────────────────────────┤
│  UI/UX Engineer             │
│  DesignStudio               │
├─────────────────────────────┤
│  Frontend Dev               │
│  AgencyCo                   │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ [ICON] SPECIALIZING IN  │ │  ← Highlight box
│ │       FULL STACK        │ │  (black bg, yellow text)
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**Content Mapping**: Pull first 4 entries from existing `/src/content/experience.ts`

**Box Styling**:
- Each box: `border-b border-r border-black p-6`
- Highlight box: `bg-[var(--brutal-black)] text-[var(--brutal-yellow)] p-6 m-4`
- Icon: Simple code bracket or similar (SVG or Lucide icon)

**Typography**:
- Role: `font-mono font-bold text-lg`
- Company: `font-mono text-sm`

---

### Footer

**File**: `/src/components/sections/SiteFooter.tsx`

**Complete Redesign**:
- Full-width bar
- Solid neon yellow background: `bg-[var(--brutal-yellow)]`
- Black text only: `text-[var(--brutal-black)]`
- Tech stack display: Scrolling or static horizontal row
  - Content: "REACT • NEXT.JS • PYTHON • AWS • UI/UX • TYPESCRIPT"
  - Derived from existing skills/projects data
- Minimal social links (monospace icons + text)
- Simplified copyright notice

**Layout**:
- Top section: Tech logos/names (scrolling or wrapped)
- Bottom section: Social links + copyright
- All borders removed (yellow bg provides separation)

---

### Other Sections (About, Experience, Projects, etc.)

Each existing section receives brutalist treatment following consistent patterns:

**Universal Pattern**:
- All content within bordered grid cells
- Section headings: Bold sans-serif with underline border
- Body text: Monospace
- No rounded corners anywhere
- Sharp borders on all interactive elements
- Neon yellow accent used sparingly for emphasis
- Electric blue for all CTAs and interactive elements

**Section-Specific Notes**:

**About**: Content in bordered box, preserve existing copy

**Experience (full timeline)**: Timeline rendered as vertical stack of bordered cells, each entry in its own box

**Projects**: Grid cards with borders, project title bold, tech stack in monospace with yellow accents for key technologies

**Skills**: Consider removing or simplifying — key experience highlights are now in the hero data grid

**Testimonials**: Bordered quote boxes with attribution

**Education**: Simple bordered list

**Contact**: Form with sharp borders, monospace labels, electric blue submit button

---

## Responsive Strategy

### Breakpoints

- **Mobile (< 768px)**: Single column, all borders preserved
- **Tablet (768px - 1024px)**: 2-column layout maintained, adjust proportions
- **Desktop (> 1024px)**: Full brutalist layout as specified

### Mobile Adaptations

**Header**:
- Logo + CTA button stacked
- Nav links: Hamburger menu or horizontal scroll row

**Hero Section**:
- Hero content full width, data grid stacks below
- All borders preserved (critical to aesthetic)
- Typographic scale reduced proportionally

**Data Grid**:
- 4 boxes stack vertically, each full width
- Highlight box remains inset

**Footer**:
- Tech logos: Horizontal scroll or static wrapped row
- All other elements stack vertically

---

## Implementation Phases

### Phase 1: Design System Setup

1. Update `/src/app/globals.css` with brutalist color tokens
2. Add Tailwind custom config for new palette (optional, or use arbitrary values)
3. Create typography utilities for outlined/stroke text effect
4. Add border utilities if not already present

### Phase 2: Core Component Updates

1. Update Navbar to new specification
2. Redesign Hero with new typography and button layout
3. Create new ExperienceGrid component
4. Redesign Footer with yellow background

### Phase 3: Section-by-Section Rollout

Update remaining sections in order:
- About
- Experience (full timeline)
- Projects
- Testimonials
- Education
- Contact
- Skills (decide: simplify or integrate)

### Phase 4: Refinement

- Responsive testing across breakpoints
- Micro-interactions (hover states should be sharp, instant)
- Accessibility audit (contrast ratios, keyboard navigation)
- Performance check (no heavy fonts or unnecessary animations)

---

## Technical Notes

### Font Strategy
- Use existing font families where possible (Inter/Space Grotesk)
- Add monospace font if not present (JetBrains Mono or similar)
- Outlined text via CSS: `-webkit-text-stroke: 2px black` + `text-transparent`

### Border Implementation
- Leverage Tailwind's existing border utilities
- Custom border colors via CSS custom properties
- No rounded corners: systematically remove `rounded-*` classes

### Grid Implementation
- CSS Grid for main layout structure
- Leverage existing `BentoCard` patterns where applicable
- Each cell gets consistent border treatment

### Content Preservation
- No changes to `/src/content/` files
- All existing content remains unchanged
- Purely visual redesign

---

## Files to Modify

**Styling**:
- `/src/app/globals.css` — Add brutalist tokens

**Components to Update**:
- `/src/components/sections/Navbar.tsx`
- `/src/components/sections/Hero.tsx`
- `/src/components/sections/SiteFooter.tsx`
- `/src/components/sections/About.tsx`
- `/src/components/sections/Experience.tsx`
- `/src/components/sections/Projects.tsx`
- `/src/components/sections/Testimonials.tsx`
- `/src/components/sections/Education.tsx`
- `/src/components/sections/Contact.tsx`
- `/src/components/sections/Skills.tsx` — Remove or simplify

**New Components to Create**:
- `/src/components/sections/ExperienceGrid.tsx` — The 4-box data grid component

**No Changes Needed**:
- `/src/content/` — All content files remain unchanged
- `/src/lib/` — Utilities should work as-is

---

## Success Criteria

- All sections use consistent brutalist design patterns
- Strict grid layout visible through fine borders
- Typography achieves extreme contrast (bold + outlined)
- Color palette applied consistently across site
- Responsive behavior maintains aesthetic on all breakpoints
- All existing content preserved and displayed
- No performance regression from fonts or styles
- Accessibility standards met (contrast, keyboard nav)
- Component architecture maintained and enhanced
