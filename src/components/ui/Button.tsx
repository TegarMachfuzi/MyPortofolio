import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'outline' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-canvas hover:bg-accent hover:text-white',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-canvas',
  ghost: 'text-ink hover:text-accent',
};

export function Button({
  variant = 'solid',
  href,
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  href?: string;
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
