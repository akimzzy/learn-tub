"use client";

import { useState } from "react";

/**
 * Custom hook for managing form state and validation
 */
export const useForm = <T extends Record<string, string | number | boolean>>(
  initialValues: T,
  validationRules?: Record<keyof T, Array<(value: T[keyof T]) => string | null>>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  const setValue = (name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const setFieldTouched = (name: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  };

  const validateField = (name: keyof T): string | null => {
    if (!validationRules || !validationRules[name]) return null;
    
    const fieldRules = validationRules[name];
    const value = values[name];
    
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        return error;
      }
    }
    return null;
  };

  const validateForm = (): boolean => {
    if (!validationRules) return true;
    
    const newErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
    let isValid = true;
    
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field as keyof T);
      if (error) {
        newErrors[field as keyof T] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched({} as Record<keyof T, boolean>);
  };

  const handleChange = (name: keyof T) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(name, event.target.value as T[keyof T]);
  };

  const handleBlur = (name: keyof T) => () => {
    setFieldTouched(name, true);
    
    // Validate field on blur if validation rules exist
    if (validationRules && validationRules[name]) {
      const error = validateField(name);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    handleChange,
    handleBlur,
    setValues,
    setErrors,
  };
};