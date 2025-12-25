"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle, AlertCircle, Send } from "lucide-react";
import { useNewsletterSubmit } from "@/hooks/useNewsletterSubmit";
import { useToast } from "@/hooks/useToast";
import { useState, useEffect } from "react";

interface NewsletterSectionProps {
  className?: string;
}

export const NewsletterSection = ({ className = "" }: NewsletterSectionProps) => {
  const {
    email,
    error,
    isSubmitting,
    isSuccess,
    handleEmailChange,
    handleSubmit,
  } = useNewsletterSubmit();
  
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const [isFocused, setIsFocused] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleSubmit();
    if (result) {
      showSuccessToast("Inscription réussie ! Merci de votre intérêt.");
    } else if (error) {
      showErrorToast(error);
    }
  };

  return (
    <motion.div
      className={`bg-gradient-to-br from-primary via-[#1A3F5F] to-primary rounded-2xl p-8 md:p-12 relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent-1/20 via-transparent to-accent-2/20"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block mb-4"
        >
          <div className="w-16 h-16 bg-accent-1/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Mail className="w-8 h-8 text-accent-1" />
          </div>
        </motion.div>

        <motion.h3
          className="text-2xl md:text-3xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Restez informé
        </motion.h3>

        <motion.p
          className="text-white/90 mb-8 max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Recevez nos dernières actualités et offres de formation directement
          dans votre boîte mail.
        </motion.p>

        <form onSubmit={onSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Email Input */}
            <div className="flex-1 relative">
              <motion.input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                    : isFocused
                    ? "border-accent-1 focus:border-accent-1 focus:ring-4 focus:ring-accent-1/30"
                    : "border-transparent focus:border-accent-1"
                } ${isSuccess ? "border-green-500" : ""}`}
                disabled={isSubmitting || isSuccess}
              />

              {/* Glow effect on focus */}
              <motion.div
                className={`absolute inset-0 rounded-lg -z-10 blur-xl transition-opacity duration-300 ${
                  isFocused && !error
                    ? "opacity-100 bg-accent-1/30"
                    : "opacity-0"
                }`}
                animate={{
                  scale: isFocused ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: isFocused ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />

              {/* Success Icon */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Icon */}
              <AnimatePresence>
                {error && !isSuccess && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && !isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-1 text-red-500 text-xs"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || isSuccess || !email}
              className={`px-6 py-3 bg-accent-1 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                isSubmitting || isSuccess || !email
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#E55A2B] shadow-lg hover:shadow-xl"
              }`}
              whileHover={
                !isSubmitting && !isSuccess && email
                  ? { scale: 1.05, y: -2 }
                  : {}
              }
              whileTap={
                !isSubmitting && !isSuccess && email ? { scale: 0.95 } : {}
              }
              animate={
                isSuccess
                  ? {
                      scale: [1, 1.1, 1],
                    }
                  : {}
              }
              transition={{
                scale: { duration: 0.4 },
              }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Envoi...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Inscrit !</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>S'abonner</span>
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Success Confetti Effect */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-accent-1 rounded-full"
                  initial={{
                    x: "50%",
                    y: "50%",
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

