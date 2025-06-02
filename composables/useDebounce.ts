export const useDebounce = <T>(value: Ref<T>, delay = 300) => {
  const debouncedValue = ref<T>(value.value);

  const debounceTimeout = ref<NodeJS.Timeout>();

  watch(
    value,
    (newValue) => {
      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
      }

      debounceTimeout.value = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);
    },
    { immediate: true }
  );

  onUnmounted(() => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }
  });

  return debouncedValue;
};

// composables/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const storedValue = ref<T>(defaultValue);

  // Ler valor do localStorage
  const read = () => {
    if (process.client) {
      try {
        const item = localStorage.getItem(key);
        if (item !== null) {
          storedValue.value = JSON.parse(item);
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
      }
    }
  };

  // Escrever valor no localStorage
  const write = (value: T) => {
    if (process.client) {
      try {
        storedValue.value = value;
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  };

  // Remover valor do localStorage
  const remove = () => {
    if (process.client) {
      try {
        localStorage.removeItem(key);
        storedValue.value = defaultValue;
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    }
  };

  // Inicializar
  read();

  // Watch para sincronizar mudanças
  watch(
    storedValue,
    (newValue) => {
      write(newValue);
    },
    { deep: true }
  );

  return {
    value: storedValue,
    read,
    write,
    remove,
  };
};
