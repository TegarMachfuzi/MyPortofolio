'use client';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useActiveSection } from '@/hooks/useActiveSection';
import { site } from '@/content';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export function Navbar({ locale }: { locale: Locale }) {
  const content = site[locale];
  const ids = ['about', 'experience', 'skills', 'projects', 'contact'];
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-canvas/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-lg font-bold text-ink">TM.</a>
        <nav className="hidden items-center gap-7 md:flex">
          {content.navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                active === item.id ? 'text-ink' : 'text-muted',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle locale={locale} />
          <ThemeToggle />
          <button
            type="button"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </Container>
      {open && (
        <nav className="border-t border-line bg-canvas md:hidden">
          <Container className="flex flex-col py-4">
            {content.navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ink"
              >
                {item.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
