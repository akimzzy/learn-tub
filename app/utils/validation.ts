// Common validation utility functions

/**
 * Validates if a string is not empty after trimming whitespace
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validates YouTube URL format
 */
export const validateYouTubeUrl = (url: string): boolean => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
  return youtubeRegex.test(url);
};

/**
 * Extracts video ID from YouTube URL
 */
export const extractVideoId = (url: string): string => {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : "";
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates minimum length
 */
export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value.trim().length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  return null;
};

/**
 * Validates maximum length
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value.trim().length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters long`;
  }
  return null;
};

/**
 * Generic form validation function
 */
export const validateForm = (data: Record<string, string>, rules: Record<string, Array<(value: string) => string | null>>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = data[field];
    
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return errors;
};

/**
 * YouTube-specific validation with error message
 */
export const validateYouTubeUrlWithError = (url: string): string | null => {
  if (!url.trim()) {
    return "YouTube URL is required";
  }
  if (!validateYouTubeUrl(url)) {
    return "Please enter a valid YouTube URL";
  }
  return null;
};