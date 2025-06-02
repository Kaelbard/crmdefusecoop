// composables/usePagination.ts
import type { PaginationParams } from '~/types/common';

export const usePagination = (initialLimit = 10) => {
  const currentPage = ref(1);
  const limit = ref(initialLimit);
  const total = ref(0);

  const totalPages = computed(() => Math.ceil(total.value / limit.value));
  const hasNextPage = computed(() => currentPage.value < totalPages.value);
  const hasPrevPage = computed(() => currentPage.value > 1);
  const startItem = computed(() => (currentPage.value - 1) * limit.value + 1);
  const endItem = computed(() => Math.min(currentPage.value * limit.value, total.value));

  const params = computed<PaginationParams>(() => ({
    page: currentPage.value,
    limit: limit.value,
    total: total.value,
  }));

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (hasPrevPage.value) {
      currentPage.value--;
    }
  };

  const setTotal = (newTotal: number) => {
    total.value = newTotal;
    
    // Ajustar página atual se necessário
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value;
    }
  };

  const reset = () => {
    currentPage.value = 1;
    total.value = 0;
  };

  return {
    currentPage: readonly(currentPage),
    limit: readonly(limit),
    total: readonly(total),
    totalPages,
    hasNextPage,
    hasPrevPage,
    startItem,
    endItem,
    params,
    goToPage,
    nextPage,
    prevPage,
    setTotal,
    reset,
  };
};