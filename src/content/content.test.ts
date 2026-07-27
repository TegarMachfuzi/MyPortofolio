import { describe, it, expect } from 'vitest';
import { locales } from '@/lib/i18n';
import { site, hero, about, experience, skills, projects, testimonials, education, contact } from './index';

const bundles = { site, hero, about, experience, skills, projects, testimonials, education, contact };

describe('content bundles', () => {
  it.each(Object.keys(bundles))('%s ships both locales', (key) => {
    const bundle = bundles[key as keyof typeof bundles];
    expect(Object.keys(bundle).sort()).toEqual([...locales].sort());
  });
});
