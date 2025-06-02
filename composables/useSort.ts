export const useSort = <T>(
  items: Ref<T[]>,
  initialSortBy = "",
  initialSortOrder: "asc" | "desc" = "asc"
) => {
  const sortBy = ref(initialSortBy);
  const sortOrder = ref<"asc" | "desc">(initialSortOrder);

  const sortedItems = computed(() => {
    if (!sortBy.value) {
      return items.value;
    }

    return [...items.value].sort((a, b) => {
      const aValue = getNestedValue(a, sortBy.value);
      const bValue = getNestedValue(b, sortBy.value);

      let comparison = 0;

      // Tratamento especial para diferentes tipos
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue, "pt-BR");
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        // Fallback para comparação genérica
        if (aValue < bValue) { comparison = -1; }
        if (aValue > bValue) { comparison = 1; }
      }

      return sortOrder.value === "desc" ? comparison * -1 : comparison;
    });
  });

  const sort = (column: string) => {
    if (sortBy.value === column) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortBy.value = column;
      sortOrder.value = "asc";
    }
  };

  const setSortBy = (column: string) => {
    sortBy.value = column;
  };

  const setSortOrder = (order: "asc" | "desc") => {
    sortOrder.value = order;
  };

  const resetSort = () => {
    sortBy.value = "";
    sortOrder.value = "asc";
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((o, p) => o?.[p], obj);
  };

  return {
    sortBy: readonly(sortBy),
    sortOrder: readonly(sortOrder),
    sortedItems,
    sort,
    setSortBy,
    setSortOrder,
    resetSort,
  };
};
