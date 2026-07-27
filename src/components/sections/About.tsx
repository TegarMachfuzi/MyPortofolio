import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { about } from '@/content';
import type { Locale } from '@/lib/i18n';

export function About({ locale }: { locale: Locale }) {
  const c = about[locale];
  return (
    <section id="about" className="py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow="01" title={c.heading} />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p className="font-display text-2xl font-medium leading-snug text-ink">{c.lead}</p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {c.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
