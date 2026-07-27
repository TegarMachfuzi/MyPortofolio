import { describe, it, expect } from 'vitest';
import { locales, defaultLocale, isLocale, getContentLocale } from './i18n';

describe('i18n', () => {
  it('exposes en + id with en default', () => {
    expect(locales).toEqual(['en', 'id']);
    expect(defaultLocale).toBe('en');
  });
  it('isLocale validates', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('id')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
  it('getContentLocale parses the first segment', () => {
    expect(getContentLocale('/en/about')).toBe('en');
    expect(getContentLocale('/id')).toBe('id');
    expect(getContentLocale('/about')).toBe(null);
  });
});
