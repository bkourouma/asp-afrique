import { useState, useEffect } from 'react';

/**
 * Hook pour calculer la progression du scroll
 * Retourne un nombre entre 0 et 1 représentant le pourcentage de scroll
 */
export const useScrollProgress = (): number => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    // Calcul initial
    calculateScrollProgress();

    // Écouter le scroll avec throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, []);

  return scrollProgress;
};

