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
