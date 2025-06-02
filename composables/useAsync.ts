// composables/useAsync.ts
export const useAsync = <T>(asyncFn: () => Promise<T>, immediate = true) => {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const execute = async () => {
    loading.value = true;
    error.value = null;

    try {
      const result = await asyncFn();
      data.value = result;
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    data.value = null;
    error.value = null;
    loading.value = false;
  };

  if (immediate) {
    execute();
  }

  return {
    data: readonly(data),
    error: readonly(error),
    loading: readonly(loading),
    execute,
    reset,
  };
};
