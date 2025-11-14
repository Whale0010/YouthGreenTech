import { useCallback, useState } from 'react';
import { validateData } from '@/app/lib/validators';

/**
 * Hook for form state management
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Submit handler
 * @returns {Object} Form state and handlers
 */
export function useForm(initialValues, onSubmit) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const validateForm = useCallback((schema) => {
    const result = validateData(formData, schema);
    if (!result.success) {
      setErrors(result.errors);
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (e, schema) => {
    e.preventDefault();
    
    if (!validateForm(schema)) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }, [formData, validateForm, onSubmit]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    touched,
    setTouched,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
    validateForm,
  };
}
