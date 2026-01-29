import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useCallback } from "react";
import { apiPost } from "@/lib/api-client";

// Zod schema pour la validation
const contactFormSchema = z.object({
  consultingService: z.string().optional(),
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z
    .string()
    .email("Adresse email invalide")
    .min(1, "L'email est requis"),
  phone: z
    .string()
    .regex(
      /^(\+225)?[\s\d-]{8,}$/,
      "Numéro de téléphone invalide (format: +225 XX XX XX XX XX)"
    )
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface UseContactFormReturn {
  form: ReturnType<typeof useForm<ContactFormData>>;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  errorMessage: string | null;
  onSubmit: (data: ContactFormData) => Promise<void>;
  resetForm: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange", // Validation en temps réel
    defaultValues: {
      consultingService: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = useCallback(async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage(null);

    try {
      const result = await apiPost("/api/v1/contact", data);

      if (result?.success) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(result?.message || "Une erreur est survenue lors de l'envoi");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  const resetForm = useCallback(() => {
    form.reset();
    setSubmitStatus("idle");
    setErrorMessage(null);
  }, [form]);

  return {
    form,
    isSubmitting,
    submitStatus,
    errorMessage,
    onSubmit,
    resetForm,
  };
};

