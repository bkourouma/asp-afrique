import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook pour précharger les pages importantes au hover
 */
export const usePreloadPages = () => {
  const router = useRouter();

  useEffect(() => {
    // Précharger les pages importantes au chargement
    const importantPages = [
      '/formations',
      '/consulting', 
      '/a-propos',
      '/partenaires',
      '/videos',
      '/blog',
      '/contact'
    ];

    // Précharger les pages après un délai pour ne pas bloquer le chargement initial
    const timer = setTimeout(() => {
      importantPages.forEach(page => {
        router.prefetch(page);
      });
    }, 2000); // Précharger après 2 secondes

    return () => clearTimeout(timer);
  }, [router]);
};

/**
 * Hook pour précharger une page spécifique au hover
 */
export const usePreloadOnHover = (href: string) => {
  const router = useRouter();

  const handleMouseEnter = () => {
    router.prefetch(href);
  };

  return { handleMouseEnter };
};
