import React from 'react';
import Link from 'next/link';

interface BrutalButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  variant,
  children,
  href,
  onClick,
  className = ''
}) => {
  const baseClasses = "px-6 py-3 font-mono text-sm border-2 border-black transition-colors";
  const primaryClasses = "bg-[#0066FF] text-black hover:bg-[#D4FF00]";
  const secondaryClasses = "bg-transparent text-black hover:bg-[#D4FF00]";

  const classes = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
