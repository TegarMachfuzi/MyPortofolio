export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function getContentLocale(pathname: string): Locale | null {
  const seg = pathname.split('/').filter(Boolean)[0];
  return isLocale(seg) ? seg : null;
}
