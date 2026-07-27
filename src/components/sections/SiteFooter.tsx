import { Container } from '@/components/ui/Container';
import { site } from '@/content';
import type { Locale } from '@/lib/i18n';

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = site[locale];
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <a href="#home" className="font-display text-lg font-bold text-ink">TM.</a>
        <nav className="flex flex-wrap gap-5">
          {content.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted hover:text-accent">
              {s.label}
            </a>
          ))}
          <a href={content.resumeUrl} className="text-sm font-medium text-muted hover:text-accent">CV</a>
        </nav>
        <p className="text-xs text-muted">© {new Date().getFullYear()} {content.name}. {content.footerNote}</p>
      </Container>
    </footer>
  );
}
