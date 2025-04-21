import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import {
  type Customer,
  type CustomerFilter,
  type CreateCustomerDTO,
  type UpdateCustomerDTO,
  CustomerType,
  customerHelpers,
} from "~/types/customer";
import { type LoadingStatus, type PaginatedResponse } from "~/types/common";

interface CustomersState {
  customers: Customer[];
  currentCustomer: Customer | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filter: CustomerFilter;
  loadingStatus: LoadingStatus;
  savingStatus: LoadingStatus;
  error: string | null;
}

export const useCustomersStore = defineStore("customers", {
  state: (): CustomersState => ({
    customers: [],
    currentCustomer: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    filter: {
      page: 1,
      limit: 10,
      sort: "name",
      order: "asc",
      isActive: true,
    },
    loadingStatus: "idle",
    savingStatus: "idle",
    error: null,
  }),

  getters: {
    /**
     * Retorna status de carregando
     */
    isLoading: (state) => state.loadingStatus === "pending",

    /**
     * Retorna status de salvando
     */
    isSaving: (state) => state.savingStatus === "pending",

    /**
     * Retorna se tem erro
     */
    hasError: (state) => state.error !== null,

    /**
     * Retorna clientes filtrados por tipo
     */
    getCustomersByType: (state) => (type: CustomerType) => {
      return state.customers.filter((customer) => customer.type === type);
    },

    /**
     * Retorna clientes ativos
     */
    getActiveCustomers: (state) => {
      return state.customers.filter((customer) => customer.isActive);
    },

    /**
     * Retorna clientes para seleção em formulários
     */
    getCustomersForSelect: (state) => {
      return state.customers
        .filter((customer) => customer.isActive)
        .map((customer) => ({
          value: customer.id,
          label: customer.name,
          group:
            customer.type === CustomerType.PHYSICAL
              ? "Pessoa Física"
              : "Pessoa Jurídica",
        }));
    },
  },

  actions: {
    /**
     * Busca clientes com filtros
     */
    async fetchCustomers(
      filter?: Partial<CustomerFilter>
    ): Promise<PaginatedResponse<Customer>> {
      this.loadingStatus = "pending";
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

        const api = useApi<PaginatedResponse<Customer>>();
        const response = await api.get("/customers", { params: this.filter });

        this.customers = response.data;
        this.pagination = response.pagination;

        this.loadingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.loadingStatus = "rejected";
        this.error = error.message || "Erro ao buscar clientes";
        throw error;
      }
    },

    /**
     * Busca um cliente específico por ID
     */
    async fetchCustomer(id: string): Promise<Customer> {
      this.loadingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Customer>();
        const response = await api.get(`/customers/${id}`);

        this.currentCustomer = response;
        this.loadingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.loadingStatus = "rejected";
        this.error = error.message || "Erro ao buscar detalhes do cliente";
        throw error;
      }
    },

    /**
     * Cria um novo cliente
     */
    async createCustomer(data: CreateCustomerDTO): Promise<Customer> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Customer>();
        const response = await api.post("/customers", data);

        // Adicionar à lista de clientes se já estiver carregada
        if (this.customers.length > 0) {
          this.customers.unshift(response);
        }

        this.currentCustomer = response;
        this.savingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao criar cliente";
        throw error;
      }
    },

    /**
     * Atualiza um cliente existente
     */
    async updateCustomer(
      id: string,
      data: UpdateCustomerDTO
    ): Promise<Customer> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Customer>();
        const response = await api.put(`/customers/${id}`, data);

        // Atualizar na lista de clientes se já estiver carregada
        const index = this.customers.findIndex(
          (customer) => customer.id === id
        );
        if (index !== -1) {
          this.customers[index] = response;
        }

        this.currentCustomer = response;
        this.savingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao atualizar cliente";
        throw error;
      }
    },

    /**
     * Ativa/desativa um cliente
     */
    async toggleCustomerStatus(
      id: string,
      isActive: boolean
    ): Promise<Customer> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Customer>();
        const response = await api.patch(`/customers/${id}/status`, {
          isActive,
        });

        // Atualizar na lista de clientes se já estiver carregada
        const index = this.customers.findIndex(
          (customer) => customer.id === id
        );
        if (index !== -1) {
          this.customers[index] = response;
        }

        if (this.currentCustomer?.id === id) {
          this.currentCustomer = response;
        }

        this.savingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao alterar status do cliente";
        throw error;
      }
    },

    /**
     * Remover um cliente (apenas para admin)
     */
    async deleteCustomer(id: string): Promise<void> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi();
        await api.del(`/customers/${id}`);

        // Remover da lista de clientes se já estiver carregada
        this.customers = this.customers.filter(
          (customer) => customer.id !== id
        );

        // Limpar cliente atual se for o mesmo
        if (this.currentCustomer?.id === id) {
          this.currentCustomer = null;
        }

        this.savingStatus = "fulfilled";
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao excluir cliente";
        throw error;
      }
    },

    /**
     * Verifica se um documento (CPF/CNPJ) já está em uso
     */
    async checkDocumentExists(
      document: string,
      excludeId?: string
    ): Promise<boolean> {
      try {
        const api = useApi<{ exists: boolean }>();
        const response = await api.get("/customers/check-document", {
          params: { document, excludeId },
        });

        return response.exists;
      } catch (error) {
        console.error("Erro ao verificar documento:", error);
        return false;
      }
    },

    /**
     * Limpa os filtros de busca
     */
    clearFilters() {
      this.filter = {
        page: 1,
        limit: 10,
        sort: "name",
        order: "asc",
        isActive: true,
      };
    },

    /**
     * Limpa o cliente atual
     */
    clearCurrentCustomer() {
      this.currentCustomer = null;
    },
  },
});
