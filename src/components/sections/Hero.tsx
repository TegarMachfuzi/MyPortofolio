import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { hero } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Hero({ locale }: { locale: Locale }) {
  const c = hero[locale];
  return (
    <section id="home" className="relative overflow-hidden">
      <Container className="flex min-h-[88vh] flex-col justify-center py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {c.headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{c.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={c.ctaPrimary.href}>{c.ctaPrimary.label} →</Button>
          <Button variant="outline" href={c.ctaSecondary.href}>{c.ctaSecondary.label}</Button>
        </div>
      </Container>
    </section>
  );
}
