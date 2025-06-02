// composables/useForm.ts
export const useForm = <T extends Record<string, any>>(initialData: T) => {
  const formData = ref<T>({ ...initialData });
  const errors = ref<Partial<Record<keyof T, string>>>({});
  const isSubmitting = ref(false);
  const isDirty = ref(false);

  const setFieldValue = (field: keyof T, value: any) => {
    formData.value[field] = value;
    isDirty.value = true;
    
    // Limpar erro do campo quando o valor muda
    if (errors.value[field]) {
      delete errors.value[field];
    }
  };

  const setErrors = (newErrors: Partial<Record<keyof T, string>>) => {
    errors.value = newErrors;
  };

  const setFieldError = (field: keyof T, error: string) => {
    errors.value[field] = error;
  };

  const validate = (rules: Partial<Record<keyof T, (value: any) => string | null>>) => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    
    Object.keys(rules).forEach((field) => {
      const rule = rules[field as keyof T];
      if (rule) {
        const error = rule(formData.value[field as keyof T]);
        if (error) {
          newErrors[field as keyof T] = error;
        }
      }
    });

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    formData.value = { ...initialData };
    errors.value = {};
    isDirty.value = false;
    isSubmitting.value = false;
  };

  const submit = async (submitFn: (data: T) => Promise<void>) => {
    isSubmitting.value = true;
    try {
      await submitFn(formData.value);
      isDirty.value = false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    formData,
    errors: readonly(errors),
    isSubmitting: readonly(isSubmitting),
    isDirty: readonly(isDirty),
    setFieldValue,
    setErrors,
    setFieldError,
    validate,
    reset,
    submit,
  };
};