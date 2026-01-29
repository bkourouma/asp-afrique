"use client";

import { motion } from "framer-motion";

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-4 border-gray-200 border-t-[#FF6B35] rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-[#FF6B35] rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export function LoadingPulse() {
  return (
    <div className="flex items-center justify-center gap-3">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-12 bg-gradient-to-t from-[#FF6B35] to-[#E55A2B] rounded-full"
          animate={{
            scaleY: [1, 0.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#1A3F5F] to-[#0A2540] flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => {
          // Valeurs fixes pour éviter l'erreur d'hydratation
          const positions = [
            5, 15, 25, 35, 45, 55, 65, 75, 85, 95,
            10, 20, 30, 40, 50, 60, 70, 80, 90, 12,
            22, 32, 42, 52, 62, 72, 82, 92, 17, 27,
            37, 47, 57, 67, 77, 87, 97, 8, 18, 28,
            38, 48, 58, 68, 78, 88, 98, 13, 23, 33
          ];
          const durations = [3.5, 4, 4.5, 3.8, 4.2];
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${positions[i]}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: durations[i % durations.length],
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          );
        })}
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-3xl flex items-center justify-center shadow-2xl">
            <motion.div
              className="text-4xl font-bold text-white"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              A
            </motion.div>
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold mb-4"
          style={{ color: '#FF6B35' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ASPCI
        </motion.h2>

        <motion.p
          className="text-white/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Chargement en cours...
        </motion.p>

        <LoadingPulse />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="w-12 h-12 bg-gray-200 rounded-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        <div className="flex-1">
          <motion.div
            className="h-4 bg-gray-200 rounded-full mb-2"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.1,
            }}
          />
          <motion.div
            className="h-3 bg-gray-200 rounded-full w-2/3"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
        </div>
      </div>

      <motion.div
        className="h-20 bg-gray-200 rounded-lg mb-4"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.3,
        }}
      />

      <motion.div
        className="h-10 bg-gray-200 rounded-lg"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.4,
        }}
      />
    </div>
  );
}

