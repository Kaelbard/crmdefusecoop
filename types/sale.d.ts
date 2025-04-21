import { BaseEntity, Timestamps, PaginationParams } from "./common";
import { Customer } from "./customer";
import { Product } from "./product";

/**
 * Enum para status de venda
 */
export enum SaleStatus {
  PENDING = "pendente",
  COMPLETED = "concluida",
  CANCELED = "cancelada",
}

/**
 * Enum para métodos de pagamento
 */
export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  MONEY = "money",
  BANK_TRANSFER = "bank_transfer",
  PIX = "pix",
  BOLETO = "boleto",
}

/**
 * Interface para um item de venda
 */
export interface SaleItem {
  id: string;
  product: Product | { id: string; name: string };
  quantity: number;
  price: number;
  total: number;
  discount?: number;
  notes?: string;
}

/**
 * Interface para uma venda
 */
export interface Sale extends BaseEntity, Partial<Timestamps> {
  code: string;
  date: string;
  customer: Customer | { id: string; name: string; email?: string };
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: SaleStatus | string;
  paymentMethod: PaymentMethod | string;
  notes?: string;
  seller?: { id: string; name: string };
}

/**
 * Interface para filtros de busca de vendas
 */
export interface SaleFilter extends PaginationParams {
  search?: string;
  startDate?: string;
  endDate?: string;
  status?: SaleStatus | string;
  customerId?: string;
  sellerId?: string;
  paymentMethod?: PaymentMethod | string;
}

/**
 * Interface para criar uma nova venda
 */
export interface CreateSaleDTO {
  date: string;
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    discount?: number;
    notes?: string;
  }[];
  discount?: number;
  paymentMethod: PaymentMethod | string;
  notes?: string;
  sellerId?: string;
}

/**
 * Interface para atualizar uma venda
 */
export interface UpdateSaleDTO {
  date?: string;
  customerId?: string;
  items?: {
    id?: string;
    productId: string;
    quantity: number;
    price: number;
    discount?: number;
    notes?: string;
  }[];
  discount?: number;
  paymentMethod?: PaymentMethod | string;
  notes?: string;
  sellerId?: string;
  status?: SaleStatus;
}

/**
 * Funções relacionadas a vendas
 */
export const saleHelpers = {
  /**
   * Calcula o subtotal da venda (soma de todos os itens)
   */
  calculateSubtotal(items: SaleItem[]): number {
    return items.reduce((sum, item) => sum + item.total, 0);
  },

  /**
   * Calcula o total da venda (subtotal - desconto)
   */
  calculateTotal(subtotal: number, discount: number): number {
    return Math.max(0, subtotal - discount);
  },

  /**
   * Calcula o total de um item (quantidade x preço)
   */
  calculateItemTotal(
    quantity: number,
    price: number,
    discount: number = 0
  ): number {
    return Math.max(0, quantity * price - discount);
  },

  /**
   * Retorna o texto para o método de pagamento
   */
  getPaymentMethodText(method: PaymentMethod | string): string {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return "Cartão de Crédito";
      case PaymentMethod.DEBIT_CARD:
        return "Cartão de Débito";
      case PaymentMethod.MONEY:
        return "Dinheiro";
      case PaymentMethod.BANK_TRANSFER:
        return "Transferência Bancária";
      case PaymentMethod.PIX:
        return "Pix";
      case PaymentMethod.BOLETO:
        return "Boleto";
      default:
        return method;
    }
  },

  /**
   * Retorna o texto para o status da venda
   */
  getStatusText(status: SaleStatus | string): string {
    switch (status) {
      case SaleStatus.PENDING:
        return "Pendente";
      case SaleStatus.COMPLETED:
        return "Concluída";
      case SaleStatus.CANCELED:
        return "Cancelada";
      default:
        return status;
    }
  },

  /**
   * Retorna a classe CSS para o status da venda
   */
  getStatusClass(status: SaleStatus | string): string {
    switch (status) {
      case SaleStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case SaleStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case SaleStatus.CANCELED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  },

  /**
   * Valida se uma venda pode ser cancelada
   */
  canCancel(sale: Sale): boolean {
    return sale.status !== SaleStatus.CANCELED;
  },

  /**
   * Verifica se uma venda foi concluída
   */
  isCompleted(sale: Sale): boolean {
    return sale.status === SaleStatus.COMPLETED;
  },

  /**
   * Valida se uma venda pode ser editada
   */
  canEdit(sale: Sale): boolean {
    return sale.status !== SaleStatus.CANCELED;
  },
};
