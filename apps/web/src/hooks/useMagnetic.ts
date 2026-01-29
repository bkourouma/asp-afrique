import { useRef, useEffect } from "react";

interface MagneticOptions {
  strength?: number;
  distance?: number;
}

/**
 * Hook pour créer un effet magnétique sur les éléments au hover
 * Utilise useRef pour accéder directement au DOM
 */
export const useMagnetic = <T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {}
) => {
  const ref = useRef<T>(null);
  const { strength = 0.3, distance = 50 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = (x / rect.width) * strength * distance;
      const moveY = (y / rect.height) * strength * distance;

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.style.transform = "translate(0, 0)";
    };
  }, [strength, distance]);

  return ref;
};

