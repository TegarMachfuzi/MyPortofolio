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
