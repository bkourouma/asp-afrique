"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { useContactForm } from "@/hooks/useContactForm";
import { FormField } from "./FormField";
import { ConfettiEffect } from "./ConfettiEffect";
import { apiGet } from "@/lib/api-client";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

interface ConsultingService {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export const ContactForm = () => {
  const { form, isSubmitting, submitStatus, errorMessage, onSubmit, resetForm } =
    useContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = form;

  const formValues = watch();
  const [consultingServices, setConsultingServices] = useState<ConsultingService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const fetchConsultingServices = async () => {
      try {
        const data = await apiGet<ConsultingService[]>('/api/v1/consulting', { requireAuth: false });
        setConsultingServices(data.filter(service => service.isActive));
      } catch (error) {
        console.error('Error fetching consulting services:', error);
        setConsultingServices([]);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchConsultingServices();
  }, []);

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleResetSuccess = () => {
    setTimeout(() => {
      resetForm();
    }, 3000);
  };

  return (
    <>
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20"
      >
        <motion.div
          className="flex items-center gap-4 mb-8"
          variants={fieldVariants}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-accent-1 to-[#E55A2B] rounded-xl flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-primary">
            Envoyez-nous un message
          </h2>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl flex items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Rocket className="w-8 h-8 text-green-600" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-bold text-green-800 text-lg mb-1">
                  Message envoyé avec succès !
                </h3>
                <p className="text-green-700 text-sm">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {submitStatus === "error" && errorMessage && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 font-medium">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Consulting Service Select Field */}
          <motion.div variants={fieldVariants}>
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label
                htmlFor="consultingService-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Service de consulting
              </label>
              <div className="relative">
                <motion.select
                  id="consultingService-input"
                  {...register("consultingService")}
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-opacity-20
                    appearance-none bg-white/50 backdrop-blur-sm
                    ${
                      !formValues.consultingService || formValues.consultingService === ""
                        ? "text-gray-500"
                        : "text-gray-900"
                    }
                    ${
                      errors.consultingService
                        ? "border-red-500 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20"
                        : formValues.consultingService && formValues.consultingService.length > 0
                        ? "border-green-500 bg-green-50/30 focus:border-green-500 focus:ring-green-500/20"
                        : "border-gray-300 focus:border-accent-1 focus:ring-accent-1/20"
                    }
                  `}
                  whileFocus={{
                    scale: 1.01,
                    transition: { duration: 0.2 },
                  }}
                  disabled={loadingServices}
                >
                  <option value="" className="text-gray-500">Sélectionnez un service (optionnel)</option>
                  {consultingServices.map((service) => (
                    <option key={service.id} value={service.name} className="text-gray-900">
                      {service.name}
                    </option>
                  ))}
                </motion.select>

                {/* Dropdown arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Name Field */}
          <motion.div variants={fieldVariants}>
            <FormField
              label="Nom complet"
              name="name"
              type="text"
              placeholder="Votre nom complet"
              register={register("name")}
              error={errors.name}
              isTouched={!!touchedFields.name}
              value={formValues.name}
              required
            />
          </motion.div>

          {/* Email Field */}
          <motion.div variants={fieldVariants}>
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="votre.email@example.com"
              register={register("email")}
              error={errors.email}
              isTouched={!!touchedFields.email}
              value={formValues.email}
              required
            />
          </motion.div>

          {/* Phone Field */}
          <motion.div variants={fieldVariants}>
            <FormField
              label="Téléphone"
              name="phone"
              type="tel"
              placeholder="+225 XX XX XX XX XX"
              register={register("phone")}
              error={errors.phone}
              isTouched={!!touchedFields.phone}
              value={formValues.phone}
            />
          </motion.div>

          {/* Message Field */}
          <motion.div variants={fieldVariants}>
            <FormField
              label="Message"
              name="message"
              type="textarea"
              placeholder="Votre message..."
              register={register("message")}
              error={errors.message}
              isTouched={!!touchedFields.message}
              value={formValues.message}
              maxLength={1000}
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fieldVariants} className="pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting || submitStatus === "success"}
              className={`
                w-full py-4 px-6 rounded-xl font-semibold
                transition-all duration-300 flex items-center justify-center gap-3
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  submitStatus === "success"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "bg-gradient-to-r from-accent-1 to-[#E55A2B] text-white hover:from-[#E55A2B] hover:to-accent-1 shadow-lg hover:shadow-xl"
                }
              `}
              whileHover={
                !isSubmitting && submitStatus !== "success"
                  ? { scale: 1.02, y: -2 }
                  : {}
              }
              whileTap={
                !isSubmitting && submitStatus !== "success"
                  ? { scale: 0.98 }
                  : {}
              }
              animate={
                submitStatus === "error"
                  ? {
                      x: [0, -10, 10, -10, 10, 0],
                    }
                  : {}
              }
              transition={{
                x: { duration: 0.5 },
              }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Envoi en cours...</span>
                </>
              ) : submitStatus === "success" ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Message envoyé !</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Envoyer le message</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>

      {/* Confetti Effect */}
      <ConfettiEffect
        isActive={submitStatus === "success"}
        onComplete={handleResetSuccess}
      />
    </>
  );
};

