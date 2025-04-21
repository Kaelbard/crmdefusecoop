import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import {
  type Product,
  type ProductFilter,
  type CreateProductDTO,
  type UpdateProductDTO,
  type ProductCategory,
  type StockMovement,
  ProductType,
  productHelpers,
} from "~/types/product";
import { type LoadingStatus, type PaginatedResponse } from "~/types/common";

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  categories: ProductCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filter: ProductFilter;
  stockMovements: StockMovement[];
  loadingStatus: LoadingStatus;
  savingStatus: LoadingStatus;
  error: string | null;
}

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    currentProduct: null,
    categories: [],
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
    stockMovements: [],
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
     * Retorna produtos filtrados por tipo
     */
    getProductsByType: (state) => (type: ProductType) => {
      return state.products.filter((product) => product.type === type);
    },

    /**
     * Retorna apenas produtos físicos (não serviços)
     */
    getPhysicalProducts: (state) => {
      return state.products.filter(
        (product) => product.type === ProductType.PRODUCT
      );
    },

    /**
     * Retorna apenas serviços
     */
    getServices: (state) => {
      return state.products.filter(
        (product) => product.type === ProductType.SERVICE
      );
    },

    /**
     * Retorna produtos ativos
     */
    getActiveProducts: (state) => {
      return state.products.filter((product) => product.isActive);
    },

    /**
     * Retorna produtos para seleção em formulários
     */
    getProductsForSelect: (state) => {
      return state.products
        .filter((product) => product.isActive)
        .map((product) => ({
          value: product.id,
          label: product.name,
          group: product.type === ProductType.PRODUCT ? "Produtos" : "Serviços",
          data: product,
        }));
    },

    /**
     * Retorna produtos com estoque baixo
     */
    getLowStockProducts: (state) => {
      return state.products.filter((product) => {
        if (product.type !== ProductType.PRODUCT) return false;
        if (!product.minStock || product.stock === undefined) return false;
        return product.stock < product.minStock;
      });
    },

    /**
     * Retorna o valor total do estoque
     */
    getTotalStockValue: (state) => {
      return state.products.reduce((total, product) => {
        if (
          product.type !== ProductType.PRODUCT ||
          product.stock === undefined
        ) {
          return total;
        }
        return total + product.stock * product.price;
      }, 0);
    },

    /**
     * Retorna se um produto está disponível em estoque
     */
    isProductAvailable:
      (state) =>
      (productId: string, quantity: number = 1) => {
        const product = state.products.find((p) => p.id === productId);
        if (!product) return false;
        if (product.type === ProductType.SERVICE) return true;
        if (product.stock === undefined) return true;
        return product.stock >= quantity;
      },
  },

  actions: {
    /**
     * Busca produtos com filtros
     */
    async fetchProducts(
      filter?: Partial<ProductFilter>
    ): Promise<PaginatedResponse<Product>> {
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

        const api = useApi<PaginatedResponse<Product>>();
        const response = await api.get("/products", { params: this.filter });

        this.products = response.data;
        this.pagination = response.pagination;

        this.loadingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.loadingStatus = "rejected";
        this.error = error.message || "Erro ao buscar produtos";
        throw error;
      }
    },

    /**
     * Busca um produto específico por ID
     */
    async fetchProduct(id: string): Promise<Product> {
      this.loadingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Product>();
        const response = await api.get(`/products/${id}`);

        this.currentProduct = response;
        this.loadingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.loadingStatus = "rejected";
        this.error = error.message || "Erro ao buscar detalhes do produto";
        throw error;
      }
    },

    /**
     * Cria um novo produto
     */
    async createProduct(data: CreateProductDTO): Promise<Product> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Product>();
        const response = await api.post("/products", data);

        // Adicionar à lista de produtos se já estiver carregada
        if (this.products.length > 0) {
          this.products.unshift(response);
        }

        this.currentProduct = response;
        this.savingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao criar produto";
        throw error;
      }
    },

    /**
     * Atualiza um produto existente
     */
    async updateProduct(id: string, data: UpdateProductDTO): Promise<Product> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Product>();
        const response = await api.put(`/products/${id}`, data);

        // Atualizar na lista de produtos se já estiver carregada
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          this.products[index] = response;
        }

        this.currentProduct = response;
        this.savingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao atualizar produto";
        throw error;
      }
    },

    /**
     * Ativa/desativa um produto
     */
    async toggleProductStatus(id: string, isActive: boolean): Promise<Product> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Product>();
        const response = await api.patch(`/products/${id}/status`, {
          isActive,
        });

        // Atualizar na lista de produtos se já estiver carregada
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          this.products[index] = response;
        }

        if (this.currentProduct?.id === id) {
          this.currentProduct = response;
        }

        this.savingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao alterar status do produto";
        throw error;
      }
    },

    /**
     * Adiciona movimento de estoque (entrada/saída)
     */
    async addStockMovement(
      productId: string,
      quantity: number,
      type: "entrada" | "saida",
      reason: "compra" | "venda" | "ajuste" | "devolucao",
      notes?: string
    ): Promise<Product> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<Product>();
        const response = await api.post(`/products/${productId}/stock`, {
          quantity,
          type,
          reason,
          notes,
        });

        // Atualizar na lista de produtos se já estiver carregada
        const index = this.products.findIndex(
          (product) => product.id === productId
        );
        if (index !== -1) {
          this.products[index] = response;
        }

        if (this.currentProduct?.id === productId) {
          this.currentProduct = response;
        }

        this.savingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao atualizar estoque";
        throw error;
      }
    },

    /**
     * Busca movimentos de estoque de um produto
     */
    async fetchStockMovements(productId: string): Promise<StockMovement[]> {
      this.loadingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<StockMovement[]>();
        const response = await api.get(`/products/${productId}/stock`);

        this.stockMovements = response;
        this.loadingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.loadingStatus = "rejected";
        this.error = error.message || "Erro ao buscar movimentos de estoque";
        throw error;
      }
    },

    /**
     * Busca categorias de produtos
     */
    async fetchCategories(): Promise<ProductCategory[]> {
      this.loadingStatus = "pending";
      this.error = null;

      try {
        const api = useApi<ProductCategory[]>();
        const response = await api.get("/product-categories");

        this.categories = response;
        this.loadingStatus = "fulfilled";
        return response;
      } catch (error: any) {
        this.loadingStatus = "rejected";
        this.error = error.message || "Erro ao buscar categorias";
        throw error;
      }
    },

    /**
     * Verifica se um SKU já está em uso
     */
    async checkSkuExists(sku: string, excludeId?: string): Promise<boolean> {
      try {
        const api = useApi<{ exists: boolean }>();
        const response = await api.get("/products/check-sku", {
          params: { sku, excludeId },
        });

        return response.exists;
      } catch (error) {
        console.error("Erro ao verificar SKU:", error);
        return false;
      }
    },

    /**
     * Remover um produto (apenas para admin)
     */
    async deleteProduct(id: string): Promise<void> {
      this.savingStatus = "pending";
      this.error = null;

      try {
        const api = useApi();
        await api.del(`/products/${id}`);

        // Remover da lista de produtos se já estiver carregada
        this.products = this.products.filter((product) => product.id !== id);

        // Limpar produto atual se for o mesmo
        if (this.currentProduct?.id === id) {
          this.currentProduct = null;
        }

        this.savingStatus = "fulfilled";
      } catch (error: any) {
        this.savingStatus = "rejected";
        this.error = error.message || "Erro ao excluir produto";
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
        sort: "name",
        order: "asc",
        isActive: true,
      };
    },

    /**
     * Limpa o produto atual
     */
    clearCurrentProduct() {
      this.currentProduct = null;
    },
  },
});
