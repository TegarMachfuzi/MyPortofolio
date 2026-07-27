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
