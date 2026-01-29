import React, { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FastLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  prefetch?: boolean;
}

const FastLink = memo<FastLinkProps>(({ 
  href, 
  children, 
  className, 
  onClick,
  prefetch = true // Activer le prefetch par défaut
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      prefetch={prefetch}
      className={cn(
        "transition-colors duration-75",
        className
      )}
    >
      {children}
    </Link>
  );
});

FastLink.displayName = 'FastLink';

export { FastLink };
