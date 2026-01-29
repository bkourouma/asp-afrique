"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    colors: "from-green-500 to-emerald-600",
    borderColor: "border-green-500/50",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
  },
  error: {
    icon: XCircle,
    colors: "from-red-500 to-rose-600",
    borderColor: "border-red-500/50",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
  warning: {
    icon: AlertCircle,
    colors: "from-yellow-500 to-amber-600",
    borderColor: "border-yellow-500/50",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
  },
  info: {
    icon: Info,
    colors: "from-blue-500 to-cyan-600",
    borderColor: "border-blue-500/50",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
  },
};

export function Toast({
  message,
  type = "info",
  duration = 5000,
  onClose,
  isVisible,
}: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-[9999] max-w-md"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div
            className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-4 shadow-2xl backdrop-blur-lg flex items-start gap-4 relative overflow-hidden`}
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${config.colors} opacity-5`} />

            {/* Icon with animation */}
            <motion.div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.colors} flex items-center justify-center flex-shrink-0`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.div>

            {/* Message */}
            <div className="flex-1 pt-1">
              <motion.p
                className={`${config.textColor} font-medium leading-relaxed`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message}
              </motion.p>
            </div>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className={`${config.textColor} hover:bg-black/5 p-1 rounded-lg transition-colors flex-shrink-0`}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Progress bar */}
            {duration > 0 && (
              <motion.div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${config.colors} rounded-full`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toast Container Component
export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div id="toast-container" className="fixed top-0 right-0 z-[9999] pointer-events-none">
        <div className="pointer-events-auto">{/* Toasts will be rendered here */}</div>
      </div>
    </>
  );
}

