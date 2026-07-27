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
