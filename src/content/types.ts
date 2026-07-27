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
