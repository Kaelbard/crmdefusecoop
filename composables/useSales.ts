import { useNotification } from "~/composables/useNotification";
import {
  type Sale,
  type SaleFilter,
  type CreateSaleDTO,
  type UpdateSaleDTO,
  SaleStatus,
  PaymentMethod,
} from "~/types/sale";
import {
  type PaginatedResponse,
  LoadingStatus,
  formatters,
} from "~/types/common";

interface SalesState {
  sales: Sale[];
  currentSale: Sale | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filter: SaleFilter;
  loadingStatus: LoadingStatus;
  savingStatus: LoadingStatus;
  error: string | null;
}

/**
 * Composable para gerenciar vendas
 */
export function useSales() {
  // Para acessar a API
  const { $mockApi } = useNuxtApp();
  const notification = useNotification();

  // Estado
  const state = useState<SalesState>("sales", () => ({
    sales: [],
    currentSale: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    filter: {
      search: "",
      page: 1,
      limit: 10,
      sort: "date",
      order: "desc",
    },
    loadingStatus: LoadingStatus.IDLE,
    savingStatus: LoadingStatus.IDLE,
    error: null,
  }));

  // Computed properties
  const isLoading = computed(
    () => state.value.loadingStatus === LoadingStatus.PENDING
  );
  const isSaving = computed(
    () => state.value.savingStatus === LoadingStatus.PENDING
  );
  const hasError = computed(() => !!state.value.error);

  // Getters adicionais
  const getSalesByStatus = (status: SaleStatus) => {
    return state.value.sales.filter((sale) => sale.status === status);
  };

  const getRecentSales = computed(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return state.value.sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= thirtyDaysAgo;
    });
  });

  const getCurrentMonthSales = computed(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return state.value.sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= startOfMonth;
    });
  });

  const getTotalSales = computed(() => {
    return state.value.sales.reduce((total, sale) => {
      if (sale.status === SaleStatus.COMPLETED) {
        return total + sale.total;
      }
      return total;
    }, 0);
  });

  /**
   * Busca a lista de vendas com filtros
   */
  const fetchSales = async (
    filter?: Partial<SaleFilter>
  ): Promise<PaginatedResponse<Sale>> => {
    state.value.loadingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      // Mesclar filtro existente com o novo
      if (filter) {
        // Se os filtros mudarem (exceto paginação), voltar para a página 1
        if (
          Object.keys(filter).some((key) => key !== "page" && key !== "limit")
        ) {
          filter.page = 1;
        }

        state.value.filter = { ...state.value.filter, ...filter };
      }

      // Chamar a API com os filtros
      const response = await $mockApi.get("/sales", {
        params: state.value.filter,
      });

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao buscar vendas");
      }

      // Atualizar o estado
      state.value.sales = response.data.data;
      state.value.pagination = response.data.pagination;
      state.value.loadingStatus = LoadingStatus.FULFILLED;

      return response.data;
    } catch (error: any) {
      state.value.loadingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao buscar vendas";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Busca uma venda específica por ID
   */
  const fetchSale = async (id: string): Promise<Sale> => {
    state.value.loadingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.get(`/sales/${id}`);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao buscar venda");
      }

      // Atualizar o estado
      state.value.currentSale = response.data;
      state.value.loadingStatus = LoadingStatus.FULFILLED;

      return response.data;
    } catch (error: any) {
      state.value.loadingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao buscar venda";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Cria uma nova venda
   */
  const createSale = async (data: CreateSaleDTO): Promise<Sale> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.post("/sales", data);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao criar venda");
      }

      // Atualizar o estado
      state.value.currentSale = response.data;

      // Adicionar à lista de vendas se já estiver carregada
      if (state.value.sales.length > 0) {
        state.value.sales.unshift(response.data);
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Venda criada com sucesso!");

      return response.data;
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao criar venda";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Atualiza uma venda existente
   */
  const updateSale = async (id: string, data: UpdateSaleDTO): Promise<Sale> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.put(`/sales/${id}`, data);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao atualizar venda");
      }

      // Atualizar o estado
      state.value.currentSale = response.data;

      // Atualizar na lista de vendas se já estiver carregada
      const index = state.value.sales.findIndex((s) => s.id === id);
      if (index !== -1) {
        state.value.sales[index] = response.data;
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Venda atualizada com sucesso!");

      return response.data;
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao atualizar venda";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Cancela uma venda
   */
  const cancelSale = async (id: string): Promise<Sale> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.put(`/sales/${id}/cancel`, {});

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao cancelar venda");
      }

      // Atualizar o estado
      const updatedSale = response.data;

      // Atualizar na lista de vendas se já estiver carregada
      const index = state.value.sales.findIndex((s) => s.id === id);
      if (index !== -1) {
        state.value.sales[index] = updatedSale;
      }

      // Atualizar venda atual se for a mesma
      if (state.value.currentSale?.id === id) {
        state.value.currentSale = updatedSale;
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Venda cancelada com sucesso!");

      return updatedSale;
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao cancelar venda";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Remove uma venda
   */
  const deleteSale = async (id: string): Promise<void> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.delete(`/sales/${id}`);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao remover venda");
      }

      // Remover da lista de vendas
      state.value.sales = state.value.sales.filter((s) => s.id !== id);

      // Limpar venda atual se for a mesma
      if (state.value.currentSale?.id === id) {
        state.value.currentSale = null;
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Venda removida com sucesso!");
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao remover venda";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Limpa os filtros
   */
  const clearFilters = () => {
    state.value.filter = {
      search: "",
      page: 1,
      limit: 10,
      sort: "date",
      order: "desc",
    };
  };

  /**
   * Limpa a venda atual
   */
  const clearCurrentSale = () => {
    state.value.currentSale = null;
  };

  /**
   * Retorna opções de status de venda para seleção
   */
  const getSaleStatusOptions = () => {
    return [
      { value: SaleStatus.PENDING, label: "Pendente" },
      { value: SaleStatus.COMPLETED, label: "Concluída" },
      { value: SaleStatus.CANCELED, label: "Cancelada" },
    ];
  };

  /**
   * Retorna opções de métodos de pagamento para seleção
   */
  const getPaymentMethodOptions = () => {
    return [
      { value: PaymentMethod.CREDIT_CARD, label: "Cartão de Crédito" },
      { value: PaymentMethod.DEBIT_CARD, label: "Cartão de Débito" },
      { value: PaymentMethod.MONEY, label: "Dinheiro" },
      { value: PaymentMethod.BANK_TRANSFER, label: "Transferência Bancária" },
      { value: PaymentMethod.PIX, label: "Pix" },
      { value: PaymentMethod.BOLETO, label: "Boleto" },
    ];
  };

  return {
    // Estado
    sales: computed(() => state.value.sales),
    currentSale: computed(() => state.value.currentSale),
    pagination: computed(() => state.value.pagination),
    filter: computed(() => state.value.filter),
    error: computed(() => state.value.error),
    isLoading,
    isSaving,
    hasError,

    // Getters
    getSalesByStatus,
    recentSales: getRecentSales,
    currentMonthSales: getCurrentMonthSales,
    totalSales: getTotalSales,

    // Métodos
    fetchSales,
    fetchSale,
    createSale,
    updateSale,
    cancelSale,
    deleteSale,
    clearFilters,
    clearCurrentSale,
    getSaleStatusOptions,
    getPaymentMethodOptions,
  };
}
