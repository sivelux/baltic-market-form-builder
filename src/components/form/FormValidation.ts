
import { useState } from 'react';
import { FormData, FormErrors, validateEmail, validateNIP, validatePhone, validatePostalCode } from '@/utils/formUtils';

export const useFormValidation = (initialFormData: FormData) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Validate a single field
  const validateField = (name: string, value: any, showBoothDimensions: boolean): boolean => {
    let errorMessage = "";
    
    // Skip validation for boothDimensions if not shown
    if (name === 'boothDimensions' && !showBoothDimensions) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.boothDimensions;
        return newErrors;
      });
      return true;
    }
    
    // Skip validation for notes field as it's optional
    if (name === 'notes') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.notes;
        return newErrors;
      });
      return true;
    }
    
    // Required field validation for all other fields
    if (value === "" || value === false) {
      errorMessage = "To pole jest wymagane";
    }
    // Specific field validations
    else if (name === 'email' && !validateEmail(value)) {
      errorMessage = "Proszę podać poprawny adres email";
    }
    else if (name === 'nip' && !validateNIP(value)) {
      errorMessage = "NIP powinien składać się z 10 cyfr";
    }
    else if (name === 'phone' && !validatePhone(value)) {
      errorMessage = "Proszę podać poprawny numer telefonu";
    }
    else if (name === 'postalCode' && !validatePostalCode(value)) {
      errorMessage = "Proszę podać poprawny kod pocztowy (XX-XXX)";
    }
    
    // Update errors state
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return errorMessage === "";
  };

  // Validate all form fields
  const validateForm = (formData: FormData, showBoothDimensions: boolean): boolean => {
    const newErrors: FormErrors = {};
    let formIsValid = true;
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    
    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      allTouched[key] = true;
      
      // Skip validation for boothDimensions if not shown
      if (key === 'boothDimensions' && !showBoothDimensions) {
        return;
      }
      
      // Skip validation for notes field as it's optional
      if (key === 'notes') {
        return;
      }
      
      // Required field validation for all other fields
      if (value === "" || value === false) {
        newErrors[key] = "To pole jest wymagane";
        formIsValid = false;
      }
      // Specific field validations
      else if (key === 'email' && !validateEmail(value)) {
        newErrors[key] = "Proszę podać poprawny adres email";
        formIsValid = false;
      }
      else if (key === 'nip' && !validateNIP(value)) {
        newErrors[key] = "NIP powinien składać się z 10 cyfr";
        formIsValid = false;
      }
      else if (key === 'phone' && !validatePhone(value)) {
        newErrors[key] = "Proszę podać poprawny numer telefonu";
        formIsValid = false;
      }
      else if (key === 'postalCode' && !validatePostalCode(value)) {
        newErrors[key] = "Proszę podać poprawny kod pocztowy (XX-XXX)";
        formIsValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouchedFields(allTouched);
    
    return formIsValid;
  };

  return {
    errors,
    touchedFields,
    setErrors,
    setTouchedFields,
    validateField,
    validateForm
  };
};
