# Tegar Machfudzi — Portfolio

A modern, bilingual (English/Indonesian) portfolio built with Next.js 14, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 18+ 
- npm or pnpm

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (for the contact form):
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=your@email.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run TypeScript type checking
- `npm test` — Run the test suite
- `npm run test:watch` — Run tests in watch mode

## Deployment

This project is designed for deployment on [Vercel](https://vercel.com). When connected to your Git repository, Vercel will automatically:

- Build the Next.js app
- Deploy the `/en` and `/id` routes as static pages
- Deploy the `/api/contact` route as a serverless function

Ensure your environment variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`) are configured in your Vercel project settings.

## Project Structure

```
src/
  app/[locale]/       # Next.js App Router pages (EN/ID)
  components/         # React components
    sections/         # Page sections (Hero, About, Experience, etc.)
    ui/              # Reusable UI primitives
    motion/          # Animation components
  content/           # Bilingual content data files
  lib/               # Utilities, i18n, validation, email
  hooks/             # Custom React hooks
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 11
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Testing**: Vitest + React Testing Library
