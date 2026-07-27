import { cn } from '@/lib/cn';
import type { ElementType, ReactNode } from 'react';

export function Container({
  as,
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? 'div';
  return <Tag className={cn('mx-auto w-full max-w-6xl px-6 md:px-10', className)}>{children}</Tag>;
}
