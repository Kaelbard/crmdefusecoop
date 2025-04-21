import { BaseEntity, Timestamps, PaginationParams } from "./common";

/**
 * Enum para tipo de produto
 */
export enum ProductType {
  PRODUCT = "produto",
  SERVICE = "servico",
}

/**
 * Interface para uma categoria de produto
 */
export interface ProductCategory extends BaseEntity, Partial<Timestamps> {
  name: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
}

/**
 * Interface para um produto
 */
export interface Product extends BaseEntity, Partial<Timestamps> {
  sku: string;
  name: string;
  description?: string;
  type: ProductType;
  categoryId?: string;
  category?: ProductCategory;
  price: number;
  costPrice?: number;
  stock?: number;
  minStock?: number;
  unit?: string;
  brand?: string;
  barcode?: string;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  images?: string[];
  isActive: boolean;
  attributes?: Record<string, string>;
}

/**
 * Interface para filtros de busca de produtos
 */
export interface ProductFilter extends PaginationParams {
  search?: string;
  type?: ProductType;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isActive?: boolean;
  brand?: string;
}

/**
 * Interface para criar um novo produto
 */
export interface CreateProductDTO {
  sku: string;
  name: string;
  description?: string;
  type: ProductType;
  categoryId?: string;
  price: number;
  costPrice?: number;
  stock?: number;
  minStock?: number;
  unit?: string;
  brand?: string;
  barcode?: string;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  images?: string[];
  isActive?: boolean;
  attributes?: Record<string, string>;
}

/**
 * Interface para atualizar um produto
 */
export interface UpdateProductDTO {
  sku?: string;
  name?: string;
  description?: string;
  type?: ProductType;
  categoryId?: string;
  price?: number;
  costPrice?: number;
  stock?: number;
  minStock?: number;
  unit?: string;
  brand?: string;
  barcode?: string;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  images?: string[];
  isActive?: boolean;
  attributes?: Record<string, string>;
}

/**
 * Interface para movimentação de estoque
 */
export interface StockMovement extends BaseEntity, Partial<Timestamps> {
  productId: string;
  product?: Product;
  quantity: number;
  type: "entrada" | "saida";
  reason: "compra" | "venda" | "ajuste" | "devolucao";
  notes?: string;
  documentNumber?: string;
  stockBefore: number;
  stockAfter: number;
}

/**
 * Funções utilitárias para produtos
 */
export const productHelpers = {
  /**
   * Verifica se um produto está com estoque abaixo do mínimo
   */
  isBelowMinStock(product: Product): boolean {
    if (product.type === ProductType.SERVICE) return false;
    if (product.minStock === undefined || product.stock === undefined)
      return false;

    return product.stock < product.minStock;
  },

  /**
   * Verifica se um produto está em estoque
   */
  isInStock(product: Product, quantity: number = 1): boolean {
    if (product.type === ProductType.SERVICE) return true;
    if (product.stock === undefined) return true;

    return product.stock >= quantity;
  },

  /**
   * Calcula a margem de lucro do produto
   */
  calculateProfitMargin(product: Product): number | null {
    if (!product.costPrice || product.costPrice <= 0) return null;

    const profit = product.price - product.costPrice;
    return (profit / product.costPrice) * 100;
  },

  /**
   * Calcula o valor do estoque
   */
  calculateStockValue(product: Product): number {
    if (product.type === ProductType.SERVICE || product.stock === undefined)
      return 0;

    return product.stock * product.price;
  },

  /**
   * Retorna o texto para o tipo de produto
   */
  getTypeText(type: ProductType): string {
    switch (type) {
      case ProductType.PRODUCT:
        return "Produto";
      case ProductType.SERVICE:
        return "Serviço";
      default:
        return type;
    }
  },

  /**
   * Formata o SKU para exibição
   */
  formatSku(sku: string): string {
    // Exemplo: converte "ABC123" para "ABC-123"
    return sku.replace(/([A-Za-z]+)(\d+)/, "$1-$2");
  },
};
