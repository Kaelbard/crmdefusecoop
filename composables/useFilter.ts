export const useFilter = <T>(
  items: Ref<T[]>,
  initialFilters: Record<string, any> = {}
) => {
  const filters = ref({ ...initialFilters });
  const activeFilters = ref<string[]>([]);

  const filteredItems = computed(() => {
    return items.value.filter((item) => {
      return Object.entries(filters.value).every(([key, value]) => {
        if (!value || value === "" || value === null || value === undefined) {
          return true;
        }

        const itemValue = getNestedValue(item, key);

        if (Array.isArray(value)) {
          return value.includes(itemValue);
        }

        if (typeof value === "string" && typeof itemValue === "string") {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }

        if (
          typeof value === "object" &&
          value.from !== undefined &&
          value.to !== undefined
        ) {
          // Range filter (para datas, números, etc.)
          const numericValue =
            typeof itemValue === "string"
              ? new Date(itemValue).getTime()
              : Number(itemValue);
          const fromValue =
            typeof value.from === "string"
              ? new Date(value.from).getTime()
              : Number(value.from);
          const toValue =
            typeof value.to === "string"
              ? new Date(value.to).getTime()
              : Number(value.to);

          return numericValue >= fromValue && numericValue <= toValue;
        }

        return itemValue === value;
      });
    });
  });

  const setFilter = (key: string, value: any) => {
    filters.value[key] = value;
    updateActiveFilters();
  };

  const removeFilter = (key: string) => {
    delete filters.value[key];
    updateActiveFilters();
  };

  const clearFilters = () => {
    filters.value = {};
    activeFilters.value = [];
  };

  const updateActiveFilters = () => {
    activeFilters.value = Object.entries(filters.value)
      .filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
      .map(([key]) => key);
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((o, p) => o?.[p], obj);
  };

  // Filtros predefinidos comuns
  const dateRangeFilter = (key: string, from: string, to: string) => {
    setFilter(key, { from, to });
  };

  const textFilter = (key: string, text: string) => {
    setFilter(key, text);
  };

  const selectFilter = (key: string, values: any[]) => {
    setFilter(key, values);
  };

  const booleanFilter = (key: string, value: boolean) => {
    setFilter(key, value);
  };

  return {
    filters: readonly(filters),
    activeFilters: readonly(activeFilters),
    filteredItems,
    setFilter,
    removeFilter,
    clearFilters,
    dateRangeFilter,
    textFilter,
    selectFilter,
    booleanFilter,
  };
};
