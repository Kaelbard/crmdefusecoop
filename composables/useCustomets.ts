import { useNotification } from "~/composables/useNotification";
import {
  type Customer,
  type CustomerFilter,
  type CreateCustomerDTO,
  type UpdateCustomerDTO,
  CustomerType,
} from "~/types/customer";
import { type PaginatedResponse, LoadingStatus } from "~/types/common";

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

/**
 * Composable para gerenciar clientes
 */
export function useCustomers() {
  // Para acessar a API
  const { mockApi } = defineNuxtPlugin(() => ({
    provide: {
      mockApi: {
        get: async (url: string, options?: any) => {
          // Mock implementation for GET requests
          return { status: 200, data: { data: [], pagination: {} }, error: null };
        },
        post: async (url: string, data: any) => {
          // Mock implementation for POST requests
          return { status: 200, data: {}, error: null };
        },
        put: async (url: string, data: any) => {
          // Mock implementation for PUT requests
          return { status: 200, data: {}, error: null };
        },
        delete: async (url: string) => {
          // Mock implementation for DELETE requests
          return { status: 200, error: null };
        },
      },
    },
  }));
  const notification = useNotification();

  // Estado
  const state = useState<CustomersState>("customers", () => ({
    customers: [],
    currentCustomer: null,
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
      sort: "name",
      order: "asc",
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

  // Métodos

  /**
   * Busca a lista de clientes com filtros
   */
  const fetchCustomers = async (
    filter?: Partial<CustomerFilter>
  ): Promise<PaginatedResponse<Customer>> => {
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
      const response = await mockApi.get("/customers", {
        params: state.value.filter,
      });

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao buscar clientes");
      }

      // Atualizar o estado
      state.value.customers = response.data.data;
      state.value.pagination = response.data.pagination;
      state.value.loadingStatus = LoadingStatus.FULFILLED;

      return response.data;
    } catch (error: any) {
      state.value.loadingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao buscar clientes";
      notification.error(state.value.error || "Erro desconhecido");
      throw error;
    }
  };

  /**
   * Busca um cliente específico por ID
   */
  const fetchCustomer = async (id: string): Promise<Customer> => {
    state.value.loadingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.get(`/customers/${id}`);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao buscar cliente");
      }

      // Atualizar o estado
      state.value.currentCustomer = response.data;
      state.value.loadingStatus = LoadingStatus.FULFILLED;

      return response.data;
    } catch (error: any) {
      state.value.loadingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao buscar cliente";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Cria um novo cliente
   */
  const createCustomer = async (data: CreateCustomerDTO): Promise<Customer> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await mockApi.post("/customers", data);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao criar cliente");
      }

      // Atualizar o estado
      state.value.currentCustomer = response.data;

      // Adicionar à lista de clientes se já estiver carregada
      if (state.value.customers.length > 0) {
        state.value.customers.unshift(response.data);
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Cliente criado com sucesso!");

      return response.data;
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao criar cliente";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Atualiza um cliente existente
   */
  const updateCustomer = async (
    id: string,
    data: UpdateCustomerDTO
  ): Promise<Customer> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.put(`/customers/${id}`, data);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao atualizar cliente");
      }

      // Atualizar o estado
      state.value.currentCustomer = response.data;

      // Atualizar na lista de clientes se já estiver carregada
      const index = state.value.customers.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.value.customers[index] = response.data;
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Cliente atualizado com sucesso!");

      return response.data;
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao atualizar cliente";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Remove um cliente
   */
  const deleteCustomer = async (id: string): Promise<void> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.delete(`/customers/${id}`);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao remover cliente");
      }

      // Remover da lista de clientes
      state.value.customers = state.value.customers.filter((c) => c.id !== id);

      // Limpar cliente atual se for o mesmo
      if (state.value.currentCustomer?.id === id) {
        state.value.currentCustomer = null;
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Cliente removido com sucesso!");
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao remover cliente";
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
      sort: "name",
      order: "asc",
    };
  };

  /**
   * Limpa o cliente atual
   */
  const clearCurrentCustomer = () => {
    state.value.currentCustomer = null;
  };

  /**
   * Retorna tipos de cliente para seleção
   */
  const getCustomerTypeOptions = () => {
    return [
      { value: CustomerType.PHYSICAL, label: "Pessoa Física" },
      { value: CustomerType.LEGAL, label: "Pessoa Jurídica" },
    ];
  };

  return {
    // Estado
    customers: computed(() => state.value.customers),
    currentCustomer: computed(() => state.value.currentCustomer),
    pagination: computed(() => state.value.pagination),
    filter: computed(() => state.value.filter),
    error: computed(() => state.value.error),
    isLoading,
    isSaving,
    hasError,

    // Métodos
    fetchCustomers,
    fetchCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    clearFilters,
    clearCurrentCustomer,
    getCustomerTypeOptions,
  };
}
