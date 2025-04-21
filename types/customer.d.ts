import { BaseEntity, Timestamps, PaginationParams, Address } from "./common";

/**
 * Enum para tipo de cliente
 */
export enum CustomerType {
  PHYSICAL = "fisica",
  LEGAL = "juridica",
}

/**
 * Interface para um cliente
 */
export interface Customer extends BaseEntity, Partial<Timestamps> {
  name: string;
  type: CustomerType;
  email?: string;
  phone?: string;
  document?: string; // CPF ou CNPJ
  address?: Address;
  notes?: string;
  isActive: boolean;
}

/**
 * Interface para filtros de busca de clientes
 */
export interface CustomerFilter extends PaginationParams {
  search?: string;
  type?: CustomerType;
  isActive?: boolean;
}

/**
 * Interface para criar um novo cliente
 */
export interface CreateCustomerDTO {
  name: string;
  type: CustomerType;
  email?: string;
  phone?: string;
  document?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  notes?: string;
  isActive?: boolean;
}

/**
 * Interface para atualizar um cliente
 */
export interface UpdateCustomerDTO {
  name?: string;
  type?: CustomerType;
  email?: string;
  phone?: string;
  document?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  notes?: string;
  isActive?: boolean;
}

/**
 * Funções utilitárias para clientes
 */
export const customerHelpers = {
  /**
   * Formata um CPF
   */
  formatCPF(cpf: string): string {
    if (!cpf) return "";

    // Remover caracteres não numéricos
    const numbers = cpf.replace(/\D/g, "");

    if (numbers.length !== 11) return cpf;

    // Formatar: 123.456.789-01
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },

  /**
   * Formata um CNPJ
   */
  formatCNPJ(cnpj: string): string {
    if (!cnpj) return "";

    // Remover caracteres não numéricos
    const numbers = cnpj.replace(/\D/g, "");

    if (numbers.length !== 14) return cnpj;

    // Formatar: 12.345.678/0001-90
    return numbers.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  },

  /**
   * Formata um documento (CPF ou CNPJ)
   */
  formatDocument(document: string, type: CustomerType): string {
    if (type === CustomerType.PHYSICAL) {
      return this.formatCPF(document);
    } else {
      return this.formatCNPJ(document);
    }
  },

  /**
   * Verifica se um CPF é válido
   */
  isValidCPF(cpf: string): boolean {
    const numbers = cpf.replace(/\D/g, "");

    if (numbers.length !== 11) return false;

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(numbers)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = remainder >= 10 ? 0 : remainder;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = remainder >= 10 ? 0 : remainder;

    return (
      parseInt(numbers.charAt(9)) === digit1 &&
      parseInt(numbers.charAt(10)) === digit2
    );
  },

  /**
   * Verifica se um CNPJ é válido
   */
  isValidCNPJ(cnpj: string): boolean {
    const numbers = cnpj.replace(/\D/g, "");

    if (numbers.length !== 14) return false;

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(numbers)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(numbers.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;

    // Validação do segundo dígito verificador
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(numbers.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;

    return (
      parseInt(numbers.charAt(12)) === digit1 &&
      parseInt(numbers.charAt(13)) === digit2
    );
  },

  /**
   * Verifica se um documento é válido (CPF ou CNPJ)
   */
  isValidDocument(document: string, type: CustomerType): boolean {
    if (type === CustomerType.PHYSICAL) {
      return this.isValidCPF(document);
    } else {
      return this.isValidCNPJ(document);
    }
  },

  /**
   * Retorna o texto para o tipo de cliente
   */
  getTypeText(type: CustomerType): string {
    switch (type) {
      case CustomerType.PHYSICAL:
        return "Pessoa Física";
      case CustomerType.LEGAL:
        return "Pessoa Jurídica";
      default:
        return type;
    }
  },
};
