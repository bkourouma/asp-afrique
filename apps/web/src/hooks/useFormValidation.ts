import { useState, useEffect, useCallback } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  custom?: (value: string) => boolean;
}

interface FieldValidation {
  [key: string]: ValidationRules;
}

export function useFormValidation<T extends Record<string, any>>(
  values: T,
  validationRules: FieldValidation
) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = useCallback((fieldName: string, value: any): string => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      return 'Ce champ est requis';
    }

    // Email validation
    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Adresse email invalide';
      }
    }

    // Phone validation
    if (rules.phone && value) {
      const phoneRegex = /^(\+225)?[\s\d-]{8,}$/;
      if (!phoneRegex.test(value)) {
        return 'Numéro de téléphone invalide';
      }
    }

    // Min length validation
    if (rules.minLength && value && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} caractères requis`;
    }

    // Max length validation
    if (rules.maxLength && value && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} caractères autorisés`;
    }

    // Pattern validation
    if (rules.pattern && value && !rules.pattern.test(value)) {
      return 'Format invalide';
    }

    // Custom validation
    if (rules.custom && value && !rules.custom(value)) {
      return 'Validation échouée';
    }

    return '';
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let formIsValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  }, [validationRules, validateField, values]);

  useEffect(() => {
    // Only validate touched fields
    const newErrors: Record<string, string> = {};
    let formIsValid = true;

    Object.keys(touched).forEach((fieldName) => {
      if (touched[fieldName]) {
        const error = validateField(fieldName, values[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          formIsValid = false;
        }
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid && Object.keys(touched).length > 0);
  }, [values, touched]);

  const handleBlur = useCallback((fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const handleChange = useCallback((fieldName: string) => {
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [errors]);

  const resetForm = useCallback(() => {
    setErrors({});
    setTouched({});
    setIsValid(false);
  }, []);

  return {
    errors,
    touched,
    isValid,
    validateForm,
    handleBlur,
    handleChange,
    resetForm,
  };
}

