"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  UseFormRegisterReturn,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { ContactFormData } from "@/hooks/useContactForm";

interface FormFieldProps {
  label: string;
  name: keyof ContactFormData;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  isTouched?: boolean;
  maxLength?: number;
  value?: string;
  required?: boolean;
}

export const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  isTouched,
  maxLength,
  value,
  required = false,
}: FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;
  const isValid = isTouched && !hasError && value && value.length > 0;
  const inputId = `${name}-input`;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    register.onBlur(e);
  };

  const InputComponent = type === "textarea" ? motion.textarea : motion.input;

  return (
    <motion.div
      className="relative mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Label avec animation float */}
        <motion.label
          htmlFor={inputId}
          className={`
            absolute left-4 transition-all duration-300 pointer-events-none z-10
            ${
              (value && value.length > 0) || isFocused
                ? "top-2 text-xs text-accent-1 font-semibold"
                : "top-4 text-base text-gray-500"
            }
          `}
          animate={{
            y: (value && value.length > 0) || isFocused ? -8 : 0,
            scale: (value && value.length > 0) || isFocused ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>

        {/* Input/Textarea */}
        <InputComponent
          id={inputId}
          type={type === "textarea" ? undefined : type}
          {...register}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={(value && value.length > 0) || isFocused ? placeholder : undefined}
          maxLength={maxLength}
          rows={type === "textarea" ? 5 : undefined}
          className={`
            w-full px-4 pt-6 pb-2 rounded-xl border-2 transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-opacity-20
            ${type === "textarea" ? "resize-none" : ""}
            ${
              hasError
                ? "border-red-500 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20"
                : isValid
                ? "border-green-500 bg-green-50/30 focus:border-green-500 focus:ring-green-500/20"
                : "border-gray-300 bg-white/50 backdrop-blur-sm focus:border-accent-1 focus:ring-accent-1/20"
            }
          `}
          whileFocus={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
          animate={{
            borderColor: hasError
              ? "#ef4444"
              : isValid
              ? "#22c55e"
              : isFocused
              ? "#FF6B35"
              : "#d1d5db",
            x: hasError && type !== "textarea" ? [0, -5, 5, -5, 5, 0] : 0,
          }}
          transition={{
            borderColor: { duration: 0.3 },
            x: { duration: 0.5 },
          }}
        />

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isFocused && !hasError ? 0.3 : 0,
          }}
          style={{
            background: "linear-gradient(90deg, transparent, #FF6B35, transparent)",
            filter: "blur(8px)",
          }}
        />

        {/* Success icon */}
        <AnimatePresence>
          {isValid && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute right-4 top-4"
            >
              <Check className="w-5 h-5 text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error icon */}
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute right-4 top-4"
            >
              <X className="w-5 h-5 text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character counter */}
        {maxLength && (
          <motion.div
            className="absolute bottom-2 right-4 text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: value && value.length > 0 ? 1 : 0 }}
          >
            {value?.length || 0}/{maxLength}
          </motion.div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {hasError && error?.message && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex items-center gap-2 text-red-600 text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error.message as string}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
