import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { testimonials } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Testimonials({ locale }: { locale: Locale }) {
  const c = testimonials[locale];
  return (
    <section id="testimonials" className="py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="05" title={c.heading} />
        </Reveal>
        <Reveal delay={0.1} className="mt-10 grid gap-6 md:grid-cols-2">
          {c.items.map((t, i) => (
            <Card key={i}>
              <blockquote className="font-display text-xl leading-relaxed text-ink">"{t.quote}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-ink">{t.name}</span>
                <span className="text-muted"> · {t.role}{t.company !== '—' ? `, ${t.company}` : ''}</span>
              </figcaption>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
