import { describe, it, expect } from 'vitest';
import { personJsonLd } from './seo';

describe('personJsonLd', () => {
  it('includes name and sameAs links', () => {
    const json = personJsonLd('https://example.com');
    expect(json['@type']).toBe('Person');
    expect((json.sameAs as string[]).some((s) => s.includes('github'))).toBe(true);
  });
});
