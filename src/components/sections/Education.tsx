import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { education } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Education({ locale }: { locale: Locale }) {
  const c = education[locale];
  return (
    <section id="education" className="py-24">
      <Container>
        <SectionHeading eyebrow="06" title={c.heading} />
        <ul className="mt-10 divide-y divide-line">
          {c.items.map((e, i) => (
            <li key={i} className="grid gap-1 py-6 md:grid-cols-[1fr_auto] md:items-baseline">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{e.title}</h3>
                <p className="text-sm text-accent">{e.org}</p>
                {e.detail && <p className="mt-1 text-sm text-muted">{e.detail}</p>}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{e.period}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
