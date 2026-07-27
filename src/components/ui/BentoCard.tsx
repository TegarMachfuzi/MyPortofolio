import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function BentoCard({ title, className, children }: { title?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-line bg-surface p-6', className)}>
      {title && <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{title}</h3>}
      {children}
    </div>
  );
}
