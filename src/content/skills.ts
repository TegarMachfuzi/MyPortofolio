import type { Localized, SkillsContent } from './types';

export const skills: Localized<SkillsContent> = {
  en: {
    heading: 'Skills & tools',
    intro: 'The stack I reach for to build and ship backend systems.',
    stat: { value: '2.5+', label: 'Years building software' },
    categories: [
      { title: 'Backend', items: ['Java', 'Spring Boot', 'Quarkus', 'REST APIs'] },
      { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { title: 'Data & tools', items: ['SQL', 'Git', 'Docker', 'Linux'] },
    ],
  },
  id: {
    heading: 'Keahlian & alat',
    intro: 'Stack yang saya gunakan untuk membangun dan merilis sistem backend.',
    stat: { value: '2.5+', label: 'Tahun membangun perangkat lunak' },
    categories: [
      { title: 'Backend', items: ['Java', 'Spring Boot', 'Quarkus', 'REST API'] },
      { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { title: 'Data & alat', items: ['SQL', 'Git', 'Docker', 'Linux'] },
    ],
  },
};
