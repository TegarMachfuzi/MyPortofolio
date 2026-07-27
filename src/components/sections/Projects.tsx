import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { projects } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Projects({ locale }: { locale: Locale }) {
  const c = projects[locale];
  return (
    <section id="projects" className="border-y border-line bg-surface py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="04" title={c.heading} description={c.intro} />
        </Reveal>
        <Reveal delay={0.1} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.items.map((p) => (
            <article key={p.title} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-canvas">
              <div className="relative aspect-[3/2] bg-line">
                <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
                </ul>
                <div className="mt-5 flex gap-4 text-sm font-semibold">
                  {p.sourceUrl && <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">Source →</a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-ink hover:underline">Live →</a>}
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
