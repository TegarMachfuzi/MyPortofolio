import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { experience } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Experience({ locale }: { locale: Locale }) {
  const c = experience[locale];
  return (
    <section id="experience" className="border-y border-line bg-surface py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="02" title={c.heading} description={c.intro} />
        <ol>
          {c.items.map((item, i) => <TimelineItem key={i} item={item} />)}
        </ol>
      </Container>
    </section>
  );
}
