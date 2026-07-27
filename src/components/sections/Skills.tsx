import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BentoCard } from '@/components/ui/BentoCard';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { skills } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Skills({ locale }: { locale: Locale }) {
  const c = skills[locale];
  return (
    <section id="skills" className="py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="03" title={c.heading} description={c.intro} />
        </Reveal>
        <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BentoCard className="bg-ink text-canvas lg:col-span-1">
            <p className="font-display text-4xl font-semibold">{c.stat.value}</p>
            <p className="mt-1 text-sm text-canvas/80">{c.stat.label}</p>
          </BentoCard>
          {c.categories.map((cat) => (
            <BentoCard key={cat.title} title={cat.title} className="lg:col-span-1">
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((s) => <li key={s}><Badge>{s}</Badge></li>)}
              </ul>
            </BentoCard>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
