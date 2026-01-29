import { useState } from "react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
});

export const useNewsletterSubmit = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (value: string): boolean => {
    try {
      emailSchema.parse({ email: value });
      setError(null);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error && value) {
      validateEmail(value);
    }
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!validateEmail(email)) {
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch("/api/newsletter/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // if (!response.ok) {
      //   throw new Error("Erreur lors de l'inscription");
      // }

      setIsSuccess(true);
      setEmail("");
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    error,
    isSubmitting,
    isSuccess,
    handleEmailChange,
    handleSubmit,
    validateEmail,
  };
};

