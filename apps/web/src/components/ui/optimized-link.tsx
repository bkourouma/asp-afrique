import React, { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface OptimizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const OptimizedLink = memo<OptimizedLinkProps>(({ 
  href, 
  children, 
  className, 
  onClick,
  variant = 'primary',
  size = 'md'
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary rounded-lg",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 rounded-lg",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 rounded-lg"
  };
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Link>
  );
});

OptimizedLink.displayName = 'OptimizedLink';

export { OptimizedLink };
