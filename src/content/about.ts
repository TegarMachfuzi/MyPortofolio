import type { Localized, AboutContent } from './types';

export const about: Localized<AboutContent> = {
  en: {
    heading: 'About',
    lead: 'I am a Java backend developer who enjoys turning ambiguous requirements into clean, maintainable services.',
    paragraphs: [
      'In my current role I build and maintain the backend that streams data to the Android team, working closely with the product owner to translate roadmap items into shipped features.',
      'I care about readable code, sensible tests, and APIs that other developers actually enjoy consuming. I ramp up quickly on new domains and adapt well to changing priorities.',
    ],
  },
  id: {
    heading: 'Tentang',
    lead: 'Saya seorang backend developer Java yang senang mengubah kebutuhan ambigu menjadi layanan yang bersih dan mudah dirawat.',
    paragraphs: [
      'Di peran saat ini saya membangun dan memelihara backend yang mengalirkan data ke tim Android, bekerja sama erat dengan product owner untuk menerjemahkan peta jalan menjadi fitur yang rilis.',
      'Saya peduli pada kode yang mudah dibaca, pengujian yang masuk akal, dan API yang nyaman digunakan developer lain. Saya belajar cepat pada domain baru dan beradaptasi baik dengan perubahan prioritas.',
    ],
  },
};
