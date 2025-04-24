/**
 * Interface para paginação
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Address {
  street?: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}
/**
 * Interface para resposta paginada da API
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

/**
 * Interface para parâmetros de paginação
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

/**
 * Interface para filtros genéricos
 */
export interface Filters {
  search?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
}

/**
 * Enum para os status de carregamento
 */
export enum LoadingStatus {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

/**
 * Interface para estado com carregamento
 */
export interface LoadingState {
  status: LoadingStatus;
  error: string | null;
}

/**
 * Interface para ordenação
 */
export interface SortOption {
  field: string;
  direction: "asc" | "desc";
  label: string;
}

/**
 * Tipo para opções de seleção
 */
export type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
};

/**
 * Interface para datas de criação e atualização
 */
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface base para entidades com ID
 */
export interface BaseEntity {
  id: string;
}

/**
 * Enum para os tipos de notificação
 */
export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

/**
 * Enum para os métodos HTTP
 */
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

/**
 * Interface para endereço
 */
export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

/**
 * Interface para contato
 */
export interface Contact {
  name: string;
  email?: string;
  phone?: string;
  position?: string;
}

/**
 * Funções de formatação comuns
 */
export const formatters = {
  /**
   * Formata um valor para moeda (R$)
   */
  currency: (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  },

  /**
   * Formata uma data
   */
  date: (date: Date | string): string => {
    if (!date) return "";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    return dateObj.toLocaleDateString("pt-BR");
  },

  /**
   * Formata uma data e hora
   */
  dateTime: (date: Date | string): string => {
    if (!date) return "";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    return dateObj.toLocaleString("pt-BR");
  },

  /**
   * Formata um CPF
   */
  cpf: (value: string): string => {
    if (!value) return "";

    const numbers = value.replace(/\D/g, "");

    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },

  /**
   * Formata um CNPJ
   */
  cnpj: (value: string): string => {
    if (!value) return "";

    const numbers = value.replace(/\D/g, "");

    return numbers.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  },

  /**
   * Formata um telefone
   */
  phone: (value: string): string => {
    if (!value) return "";

    const numbers = value.replace(/\D/g, "");

    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  },

  /**
   * Formata um CEP
   */
  zipCode: (value: string): string => {
    if (!value) return "";

    const numbers = value.replace(/\D/g, "");

    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2");
  },
};
