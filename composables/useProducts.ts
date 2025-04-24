import { useNotification } from "~/composables/useNotification";
import {
  type Product,
  type ProductFilter,
  type CreateProductDTO,
  type UpdateProductDTO,
  ProductType,
} from "~/types/product";
import { type PaginatedResponse, LoadingStatus } from "~/types/common";

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filter: ProductFilter;
  loadingStatus: LoadingStatus;
  savingStatus: LoadingStatus;
  error: string | null;
}

/**
 * Composable para gerenciar produtos
 */
export function useProducts() {
  // Para acessar a API
  const { $mockApi } = useNuxtApp();
  const notification = useNotification();

  // Estado
  const state = useState<ProductsState>("products", () => ({
    products: [],
    currentProduct: null,
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

  // Getters adicionais
  const getProductsInStock = computed(() => {
    return state.value.products.filter(
      (p) =>
        p.type === ProductType.SERVICE || (p.stock !== undefined && p.stock > 0)
    );
  });

  const getProductsBelowMinStock = computed(() => {
    return state.value.products.filter(
      (p) =>
        p.type === ProductType.PRODUCT &&
        p.stock !== undefined &&
        p.minStock !== undefined &&
        p.stock < p.minStock
    );
  });

  /**
   * Busca a lista de produtos com filtros
   */
  const fetchProducts = async (
    filter?: Partial<ProductFilter>
  ): Promise<PaginatedResponse<Product>> => {
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
      const response = await $mockApi.get("/products", {
        params: state.value.filter,
      });

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao buscar produtos");
      }

      // Atualizar o estado
      state.value.products = response.data.data;
      state.value.pagination = response.data.pagination;
      state.value.loadingStatus = LoadingStatus.FULFILLED;

      return response.data;
    } catch (error: any) {
      state.value.loadingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao buscar produtos";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Busca um produto específico por ID
   */
  const fetchProduct = async (id: string): Promise<Product> => {
    state.value.loadingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.get(`/products/${id}`);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao buscar produto");
      }

      // Atualizar o estado
      state.value.currentProduct = response.data;
      state.value.loadingStatus = LoadingStatus.FULFILLED;

      return response.data;
    } catch (error: any) {
      state.value.loadingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao buscar produto";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Cria um novo produto
   */
  const createProduct = async (data: CreateProductDTO): Promise<Product> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.post("/products", data);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao criar produto");
      }

      // Atualizar o estado
      state.value.currentProduct = response.data;

      // Adicionar à lista de produtos se já estiver carregada
      if (state.value.products.length > 0) {
        state.value.products.unshift(response.data);
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Produto criado com sucesso!");

      return response.data;
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao criar produto";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Atualiza um produto existente
   */
  const updateProduct = async (
    id: string,
    data: UpdateProductDTO
  ): Promise<Product> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.put(`/products/${id}`, data);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao atualizar produto");
      }

      // Atualizar o estado
      state.value.currentProduct = response.data;

      // Atualizar na lista de produtos se já estiver carregada
      const index = state.value.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.value.products[index] = response.data;
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Produto atualizado com sucesso!");

      return response.data;
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao atualizar produto";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Remove um produto
   */
  const deleteProduct = async (id: string): Promise<void> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      const response = await $mockApi.delete(`/products/${id}`);

      // Verificar se houve erro
      if (response.status !== 200) {
        throw new Error(response.error || "Erro ao remover produto");
      }

      // Remover da lista de produtos
      state.value.products = state.value.products.filter((p) => p.id !== id);

      // Limpar produto atual se for o mesmo
      if (state.value.currentProduct?.id === id) {
        state.value.currentProduct = null;
      }

      state.value.savingStatus = LoadingStatus.FULFILLED;
      notification.success("Produto removido com sucesso!");
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao remover produto";
      notification.error(state.value.error);
      throw error;
    }
  };

  /**
   * Atualiza o estoque de um produto
   */
  const updateStock = async (
    id: string,
    quantity: number
  ): Promise<Product> => {
    state.value.savingStatus = LoadingStatus.PENDING;
    state.value.error = null;

    try {
      // Buscar o produto atual
      const product =
        state.value.products.find((p) => p.id === id) ||
        state.value.currentProduct;

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      if (product.type !== ProductType.PRODUCT) {
        throw new Error("Não é possível atualizar estoque de serviços");
      }

      const currentStock = product.stock || 0;
      const newStock = currentStock + quantity;

      if (newStock < 0) {
        throw new Error("Estoque não pode ser negativo");
      }

      // Atualizar o produto
      return await updateProduct(id, { stock: newStock });
    } catch (error: any) {
      state.value.savingStatus = LoadingStatus.REJECTED;
      state.value.error = error.message || "Erro ao atualizar estoque";
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
   * Limpa o produto atual
   */
  const clearCurrentProduct = () => {
    state.value.currentProduct = null;
  };

  /**
   * Retorna tipos de produto para seleção
   */
  const getProductTypeOptions = () => {
    return [
      { value: ProductType.PRODUCT, label: "Produto" },
      { value: ProductType.SERVICE, label: "Serviço" },
    ];
  };

  return {
    // Estado
    products: computed(() => state.value.products),
    currentProduct: computed(() => state.value.currentProduct),
    pagination: computed(() => state.value.pagination),
    filter: computed(() => state.value.filter),
    error: computed(() => state.value.error),
    isLoading,
    isSaving,
    hasError,

    // Getters
    productsInStock: getProductsInStock,
    productsBelowMinStock: getProductsBelowMinStock,

    // Métodos
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    clearFilters,
    clearCurrentProduct,
    getProductTypeOptions,
  };
}
