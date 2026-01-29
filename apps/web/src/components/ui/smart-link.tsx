import React, { memo, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePreloadOnHover } from '@/hooks/usePreload';

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  prefetch?: boolean;
  preloadOnHover?: boolean;
}

const SmartLink = memo<SmartLinkProps>(({ 
  href, 
  children, 
  className, 
  onClick,
  prefetch = true,
  preloadOnHover = true
}) => {
  const { handleMouseEnter } = usePreloadOnHover(href);

  const handleClick = useCallback(() => {
    // Précharger la page au clic pour les navigations futures
    if (preloadOnHover) {
      handleMouseEnter();
    }
    onClick?.();
  }, [onClick, preloadOnHover, handleMouseEnter]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={preloadOnHover ? handleMouseEnter : undefined}
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

SmartLink.displayName = 'SmartLink';

export { SmartLink };
