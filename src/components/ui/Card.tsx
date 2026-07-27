import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
