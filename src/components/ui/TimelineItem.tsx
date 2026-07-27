import type { ExperienceItem } from '@/content/types';

export function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <li className="relative pl-8 pb-10 last:pb-0">
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-accent" aria-hidden />
      <span className="absolute left-[5px] top-4 h-full w-px bg-line" aria-hidden />
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{item.period}</p>
      <h3 className="mt-1 font-display text-xl font-semibold text-ink">{item.role}</h3>
      <p className="text-sm font-medium text-accent">{item.company}{item.location ? ` · ${item.location}` : ''}</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted marker:text-line">
        {item.bullets.map((b, i) => <li key={i} className="list-disc pl-1">{b}</li>)}
      </ul>
    </li>
  );
}
