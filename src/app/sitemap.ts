import type { MetadataRoute } from 'next';
import { BASE } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/en`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/id`, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
