"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Composant de préchargement global pour améliorer les performances
 * de navigation au premier clic
 */
export const GlobalPreloader = () => {
  const router = useRouter();

  useEffect(() => {
    // Précharger les pages importantes après le chargement initial
    const preloadPages = () => {
      const importantPages = [
        '/formations',
        '/consulting',
        '/a-propos',
        '/a-propos/mot-du-directeur',
        '/a-propos/notre-equipe',
        '/a-propos/agrements-autorisations',
        '/partenaires',
        '/videos',
        '/blog',
        '/contact'
      ];

      // Précharger avec un délai pour ne pas impacter le chargement initial
      setTimeout(() => {
        importantPages.forEach(page => {
          try {
            router.prefetch(page);
          } catch (error) {
            console.warn(`Failed to prefetch ${page}:`, error);
          }
        });
      }, 3000); // Précharger après 3 secondes
    };

    // Précharger au chargement de la page
    preloadPages();

    // Précharger également au focus de la fenêtre (retour d'onglet)
    const handleFocus = () => {
      setTimeout(preloadPages, 1000);
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [router]);

  return null; // Ce composant ne rend rien
};
