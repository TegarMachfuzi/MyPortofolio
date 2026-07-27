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
