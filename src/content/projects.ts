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
