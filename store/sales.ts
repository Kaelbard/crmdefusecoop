import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import {
  type Sale,
  type SaleFilter,
  type CreateSaleDTO,
  type UpdateSaleDTO,
  SaleStatus,
  saleHelpers,
} from "~/types/sale";
import { type LoadingStatus, type PaginatedResponse } from "~/types/common";

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

export const useSalesStore = defineStore("sales", {
  state: (): SalesState => ({
    sales: [],
    currentSale: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    filter: {
      page: 1,
      limit: 10,
      sort: "date",
      order: "desc",
    },
    loadingStatus: LoadingStatus.IDLE,
    savingStatus: LoadingStatus.IDLE,
    error: null,
  }),

  getters: {
    /**
     * Retorna status de carregando
     */
    isLoading: (state) => state.loadingStatus === LoadingStatus.PENDING,

    /**
     * Retorna status de salvando
     */
    isSaving: (state) => state.savingStatus === LoadingStatus.PENDING,

    /**
     * Retorna se tem erro
     */
    hasError: (state) => state.error !== null,

    /**
     * Retorna vendas filtradas por status
     */
    getSalesByStatus: (state) => (status: SaleStatus) => {
      return state.sales.filter((sale) => sale.status === status);
    },

    /**
     * Retorna vendas dos últimos 30 dias
     */
    getRecentSales: (state) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      return state.sales.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= thirtyDaysAgo;
      });
    },

    /**
     * Retorna vendas do mês atual
     */
    getCurrentMonthSales: (state) => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      return state.sales.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= startOfMonth;
      });
    },

    /**
     * Retorna total de vendas
     */
    getTotalSales: (state) => {
      return state.sales.reduce((total, sale) => {
        // Somente incluir vendas concluídas
        if (sale.status === SaleStatus.COMPLETED) {
          return total + sale.total;
        }
        return total;
      }, 0);
    },
  },

  actions: {
    /**
     * Busca vendas com filtros
     */
    async fetchSales(
      filter?: Partial<SaleFilter>
    ): Promise<PaginatedResponse<Sale>> {
      this.loadingStatus = LoadingStatus.PENDING;
      this.error = null;

      try {
        // Mesclar filtro existente com o novo
        this.filter = { ...this.filter, ...filter };

        // Ajustar página para 1 se outros filtros mudarem
        if (
          filter &&
          Object.keys(filter).some((key) => key !== "page" && key !== "limit")
        ) {
          this.filter.page = 1;
        }

        const api = useApi<PaginatedResponse<Sale>>();
        const response = await api.get("/sales", { params: this.filter });

        this.sales = response.data;
        this.pagination = response.pagination;

        this.loadingStatus = LoadingStatus.FULFILLED;
        return response;
      } catch (error: any) {
        this.loadingStatus = LoadingStatus.REJECTED;
        this.error = error.message || "Erro ao buscar vendas";
        throw error;
      }
    },

    /**
     * Busca uma venda específica por ID
     */
    async fetchSale(id: string): Promise<Sale> {
      this.loadingStatus = LoadingStatus.PENDING;
      this.error = null;

      try {
        const api = useApi<Sale>();
        const response = await api.get(`/sales/${id}`);

        this.currentSale = response;
        this.loadingStatus = LoadingStatus.FULFILLED;
        return response;
      } catch (error: any) {
        this.loadingStatus = LoadingStatus.REJECTED;
        this.error = error.message || "Erro ao buscar detalhes da venda";
        throw error;
      }
    },

    /**
     * Cria uma nova venda
     */
    async createSale(data: CreateSaleDTO): Promise<Sale> {
      this.savingStatus = LoadingStatus.PENDING;
      this.error = null;

      try {
        const api = useApi<Sale>();
        const response = await api.post("/sales", data);

        // Adicionar à lista de vendas se já estiver carregada
        if (this.sales.length > 0) {
          this.sales.unshift(response);
        }

        this.currentSale = response;
        this.savingStatus = LoadingStatus.FULFILLED;
        return response;
      } catch (error: any) {
        this.savingStatus = LoadingStatus.REJECTED;
        this.error = error.message || "Erro ao criar venda";
        throw error;
      }
    },

    /**
     * Atualiza uma venda existente
     */
    async updateSale(id: string, data: UpdateSaleDTO): Promise<Sale> {
      this.savingStatus = LoadingStatus.PENDING;
      this.error = null;

      try {
        const api = useApi<Sale>();
        const response = await api.put(`/sales/${id}`, data);

        // Atualizar na lista de vendas se já estiver carregada
        const index = this.sales.findIndex((sale) => sale.id === id);
        if (index !== -1) {
          this.sales[index] = response;
        }

        this.currentSale = response;
        this.savingStatus = LoadingStatus.FULFILLED;
        return response;
      } catch (error: any) {
        this.savingStatus = LoadingStatus.REJECTED;
        this.error = error.message || "Erro ao atualizar venda";
        throw error;
      }
    },

    /**
     * Cancela uma venda
     */
    async cancelSale(id: string): Promise<Sale> {
      this.savingStatus = LoadingStatus.PENDING;
      this.error = null;

      try {
        const api = useApi<Sale>();
        const response = await api.put(`/sales/${id}/cancel`, {});

        // Atualizar na lista de vendas se já estiver carregada
        const index = this.sales.findIndex((sale) => sale.id === id);
        if (index !== -1) {
          this.sales[index] = response;
        }

        if (this.currentSale?.id === id) {
          this.currentSale = response;
        }

        this.savingStatus = LoadingStatus.FULFILLED;
        return response;
      } catch (error: any) {
        this.savingStatus = LoadingStatus.REJECTED;
        this.error = error.message || "Erro ao cancelar venda";
        throw error;
      }
    },

    /**
     * Remover uma venda (apenas para admin)
     */
    async deleteSale(id: string): Promise<void> {
      this.savingStatus = LoadingStatus.PENDING;
      this.error = null;

      try {
        const api = useApi();
        await api.del(`/sales/${id}`);

        // Remover da lista de vendas se já estiver carregada
        this.sales = this.sales.filter((sale) => sale.id !== id);

        // Limpar venda atual se for a mesma
        if (this.currentSale?.id === id) {
          this.currentSale = null;
        }

        this.savingStatus = LoadingStatus.FULFILLED;
      } catch (error: any) {
        this.savingStatus = LoadingStatus.REJECTED;
        this.error = error.message || "Erro ao excluir venda";
        throw error;
      }
    },

    /**
     * Gera relatório de vendas
     */
    async generateReport(filter: SaleFilter): Promise<Blob> {
      this.loadingStatus = LoadingStatus.PENDING;
      this.error = null;

      try {
        const api = useApi<Blob>();
        const response = await api.get("/sales/report", {
          params: filter,
          responseType: "blob",
        });

        this.loadingStatus = LoadingStatus.FULFILLED;
        return response;
      } catch (error: any) {
        this.loadingStatus = LoadingStatus.REJECTED;
        this.error = error.message || "Erro ao gerar relatório";
        throw error;
      }
    },

    /**
     * Limpa os filtros de busca
     */
    clearFilters() {
      this.filter = {
        page: 1,
        limit: 10,
        sort: "date",
        order: "desc",
      };
    },

    /**
     * Limpa a venda atual
     */
    clearCurrentSale() {
      this.currentSale = null;
    },
  },
});
