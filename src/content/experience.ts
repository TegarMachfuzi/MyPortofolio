import type { Localized, ExperienceContent } from './types';

export const experience: Localized<ExperienceContent> = {
  en: {
    heading: 'Work experience',
    intro: 'Roles where I shipped backend services that other teams depended on.',
    items: [
      {
        role: 'Freelance Frontend Developer',
        company: 'Photo-in',
        period: 'Recent',
        bullets: [
          'Developed comprehensive UX/UI redesign across event listing, detail pages, and participant cards using React 19, Next.js 15, and Tailwind CSS 4.',
          'Built responsive component architecture with Radix UI components and Framer Motion for smooth animations.',
          'Implemented participant page UX improvements including breadcrumb navigation, DOB display with react-day-picker, and enhanced form interactions.',
          'Enhanced public event gallery with interactive photo gallery using react-zoom-pan-pinch, dialog management, and tRPC for real-time data fetching.',
          'Resolved critical timezone bugs in DOB verification, implemented Google Drive API integration with token refresh logic, and established multi-tenant workspace scoping.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'PT Innovatz Global | Placement at PT PEGADAIAN',
        period: 'October 2024 — Present',
        bullets: [
          'Developed Gadai Tabungan Emas feature using Spring Boot, including inquiry service, payment service, and transaction journals.',
          'Implemented special rate functionality for Tring and BRImo digital channels as part of Quick Win Program 2026.',
          'Configured product parameters including base rate reduction, down payment options, and tenor adjustments.',
          'Performed system integration across BRI Group ecosystem channels with cross-functional teams.',
          'Successfully deployed within 8-day timeline, meeting target go-live date of August 7, 2026.',
          'Improved UMI card acceptance feature and added new card request functionality using Java with Vaadin UI framework.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'PT Indocyber Global Teknologi | Placement at Bank BNI',
        period: 'February 2024 — October 2024',
        bullets: [
          'Created card registration service using Spring Boot, Redis, Kafka, and Oracle database.',
          'Built inquiry and payment debit services with the same tech stack.',
          'Fixed and improved Direct Debit microsite using ReactJS.',
          'Maintained QRIS CPM service, analyzed service speed with JMeter, and created unit testing for normal and abnormal cases.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'PT Indocyber Global Teknologi | Placement at Anteraja',
        period: 'October 2022 — August 2023',
        bullets: [
          'Created new features within existing applications and modified existing features.',
          'Investigated root causes of errors and bugs in applications.',
          'Discussed features to work on with stakeholders.',
        ],
      },
      {
        role: 'Junior Software Engineer',
        company: 'Teknologi Inovasi Mandiri',
        period: 'June 2022 — October 2022',
        bullets: [
          'Gathered information from users for application functionality.',
          'Developed and added features to applications.',
          'Fixed and handled errors and bugs.',
        ],
      },
    ],
  },
  id: {
    heading: 'Pengalaman kerja',
    intro: 'Peran di mana saya merilis layanan backend yang diandalkan tim lain.',
    items: [
      {
        role: 'Freelance Frontend Developer',
        company: 'Photo-in',
        period: 'Terbaru',
        bullets: [
          'Mengembangkan redesign UX/UI komprehensif di halaman listing event, halaman detail, dan kartu peserta menggunakan React 19, Next.js 15, dan Tailwind CSS 4.',
          'Membangun arsitektur komponen responsif dengan Radix UI dan Framer Motion untuk animasi yang smooth.',
          'Implementasi perbaikan UX halaman peserta termasuk breadcrumb navigation, display DOB dengan react-day-picker, dan interaksi form yang enhanced.',
          'Enhanced gallery event publik dengan galeri foto interaktif menggunakan react-zoom-pan-pinch, dialog management, dan tRPC untuk real-time data fetching.',
          'Memperbaiki timezone bugs kritis di verifikasi DOB, mengimplementasi Google Drive API dengan token refresh logic, dan established multi-tenant workspace scoping.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'PT Innovatz Global | Penempatan di PT PEGADAIAN',
        period: 'Oktober 2024 — Sekarang',
        bullets: [
          'Mengembangkan fitur Gadai Tabungan Emas menggunakan Spring Boot, termasuk layanan inquiry, pembayaran, dan jurnal transaksi.',
          'Implementasi fungsionalitas tarif khusus untuk channel Tring dan BRImo sebagai bagian dari Quick Win Program 2026.',
          'Mengkonfigurasi parameter produk termasuk pengurangan base rate, opsi down payment, dan penyesuaian tenor.',
          'Melakukan integrasi sistem di channel ekosistem BRI Group dengan tim cross-functional.',
          'Sukses deploy dalam timeline 8 hari, memenuhi target go-live tanggal 7 Agustus 2026.',
          'Memperbaiki fitur acceptansi kartu UMI dan menambahkan fungsionalitas request kartu baru menggunakan Java dengan Vaadin UI framework.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'PT Indocyber Global Teknologi | Penempatan di Bank BNI',
        period: 'Februari 2024 — Oktober 2024',
        bullets: [
          'Membuat layanan registrasi kartu menggunakan Spring Boot, Redis, Kafka, dan Oracle database.',
          'Membangun layanan inquiry dan pembayaran debit dengan tech stack yang sama.',
          'Memperbaiki dan meningkatkan microsite Direct Debit menggunakan ReactJS.',
          'Maintain layanan QRIS CPM, analisis kecepatan layanan dengan JMeter, dan membuat unit testing untuk normal dan abnormal case.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'PT Indocyber Global Teknologi | Penempatan di Anteraja',
        period: 'Oktober 2022 — Agustus 2023',
        bullets: [
          'Membuat fitur baru dalam aplikasi yang sudah ada dan memodifikasi fitur yang sudah ada.',
          'Menginvestigasi root cause dari error dan bug di aplikasi.',
          'Membahas fitur yang akan dikerjakan dengan stakeholders.',
        ],
      },
      {
        role: 'Junior Software Engineer',
        company: 'Teknologi Inovasi Mandiri',
        period: 'Juni 2022 — Oktober 2022',
        bullets: [
          'Mengumpulkan informasi dari user untuk fungsionalitas aplikasi.',
          'Mengembangkan dan menambahkan fitur ke aplikasi.',
          'Memperbaiki dan menangani error dan bug.',
        ],
      },
    ],
  },
};
