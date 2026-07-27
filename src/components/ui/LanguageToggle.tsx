'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? '/';
  const other: Locale = locale === 'en' ? 'id' : 'en';
  const swapped = pathname.replace(`/${locale}`, `/${other}`);
  return (
    <Link
      href={swapped}
      aria-label={`Switch to ${other === 'en' ? 'English' : 'Bahasa Indonesia'}`}
      className="inline-flex h-9 items-center gap-1 rounded-full border border-line px-3 text-xs font-semibold text-ink hover:text-accent"
    >
      <span className={cn(locale === 'en' ? 'text-accent' : 'text-muted')}>EN</span>
      <span className="text-muted">/</span>
      <span className={cn(locale === 'id' ? 'text-accent' : 'text-muted')}>ID</span>
    </Link>
  );
}
