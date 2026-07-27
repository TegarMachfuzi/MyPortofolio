import { site } from '@/content';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export function personJsonLd(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.en.name,
    url,
    sameAs: site.en.socials.map((s) => s.href),
  };
}

export function localeAlternates(path = '') {
  return {
    languages: {
      en: `${BASE}/en${path}`,
      id: `${BASE}/id${path}`,
      'x-default': `${BASE}/en${path}`,
    },
  };
}

export { BASE };
