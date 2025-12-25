"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiEffectProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const ConfettiEffect = ({ isActive, onComplete }: ConfettiEffectProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    if (isActive) {
      const colors = ["#FF6B35", "#00D9FF", "#FFD23F", "#0A2540", "#22c55e"];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        duration: Math.random() * 2 + 2,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{
            y: particle.y,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [1, 1, 0],
            x: [
              particle.x,
              particle.x + (Math.random() - 0.5) * 100,
              particle.x + (Math.random() - 0.5) * 200,
            ],
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
            opacity: {
              times: [0, 0.8, 1],
            },
          }}
        />
      ))}
    </div>
  );
};

