import type { Localized, SkillsContent } from './types';

export const skills: Localized<SkillsContent> = {
  en: {
    heading: 'Skills & tools',
    intro: 'The stack I reach for to build and ship backend systems.',
    stat: { value: '3.5+', label: 'Years building software' },
    categories: [
      { title: 'Backend', items: ['Java', 'Spring Boot', 'Quarkus', 'REST APIs', 'Microservice Architecture'] },
      { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
      { title: 'Databases', items: ['Oracle Database', 'MySQL', 'PostgreSQL', 'MongoDB'] },
      { title: 'Tools & others', items: ['Redis', 'Kafka', 'Git', 'Postman', 'JasperReports'] },
    ],
  },
  id: {
    heading: 'Keahlian & alat',
    intro: 'Stack yang saya gunakan untuk membangun dan merilis sistem backend.',
    stat: { value: '3.5+', label: 'Tahun membangun perangkat lunak' },
    categories: [
      { title: 'Backend', items: ['Java', 'Spring Boot', 'Quarkus', 'REST API', 'Microservice Architecture'] },
      { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
      { title: 'Database', items: ['Oracle Database', 'MySQL', 'PostgreSQL', 'MongoDB'] },
      { title: 'Tools & lainnya', items: ['Redis', 'Kafka', 'Git', 'Postman', 'JasperReports'] },
    ],
  },
};
