/**
 * Interface que representa um usuário no sistema
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  permissions?: string[];
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Enum para os papéis de usuário no sistema
 */
export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  EMPLOYEE = "employee",
  READONLY = "readonly",
}

/**
 * Interface para filtros de busca de usuários
 */
export interface UserFilter {
  search?: string;
  role?: UserRole;
  active?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Permissões disponíveis no sistema
 */
export const USER_PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: "dashboard:view",

  // Produtos
  PRODUCTS_VIEW: "products:view",
  PRODUCTS_CREATE: "products:create",
  PRODUCTS_EDIT: "products:edit",
  PRODUCTS_DELETE: "products:delete",

  // Clientes
  CUSTOMERS_VIEW: "customers:view",
  CUSTOMERS_CREATE: "customers:create",
  CUSTOMERS_EDIT: "customers:edit",
  CUSTOMERS_DELETE: "customers:delete",

  // Vendas
  SALES_VIEW: "sales:view",
  SALES_CREATE: "sales:create",
  SALES_EDIT: "sales:edit",
  SALES_DELETE: "sales:delete",

  // Serviços
  SERVICES_VIEW: "services:view",
  SERVICES_CREATE: "services:create",
  SERVICES_EDIT: "services:edit",
  SERVICES_DELETE: "services:delete",

  // Relatórios
  REPORTS_VIEW: "reports:view",
  REPORTS_EXPORT: "reports:export",

  // Usuários
  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_EDIT: "users:edit",
  USERS_DELETE: "users:delete",
};

/**
 * Mapeamento de permissões por papel de usuário
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: Object.values(USER_PERMISSIONS),
  [UserRole.MANAGER]: [
    USER_PERMISSIONS.DASHBOARD_VIEW,
    USER_PERMISSIONS.PRODUCTS_VIEW,
    USER_PERMISSIONS.PRODUCTS_CREATE,
    USER_PERMISSIONS.PRODUCTS_EDIT,
    USER_PERMISSIONS.CUSTOMERS_VIEW,
    USER_PERMISSIONS.CUSTOMERS_CREATE,
    USER_PERMISSIONS.CUSTOMERS_EDIT,
    USER_PERMISSIONS.SALES_VIEW,
    USER_PERMISSIONS.SALES_CREATE,
    USER_PERMISSIONS.SALES_EDIT,
    USER_PERMISSIONS.SERVICES_VIEW,
    USER_PERMISSIONS.SERVICES_CREATE,
    USER_PERMISSIONS.SERVICES_EDIT,
    USER_PERMISSIONS.REPORTS_VIEW,
    USER_PERMISSIONS.REPORTS_EXPORT,
  ],
  [UserRole.EMPLOYEE]: [
    USER_PERMISSIONS.DASHBOARD_VIEW,
    USER_PERMISSIONS.PRODUCTS_VIEW,
    USER_PERMISSIONS.CUSTOMERS_VIEW,
    USER_PERMISSIONS.CUSTOMERS_CREATE,
    USER_PERMISSIONS.SALES_VIEW,
    USER_PERMISSIONS.SALES_CREATE,
    USER_PERMISSIONS.SERVICES_VIEW,
    USER_PERMISSIONS.SERVICES_CREATE,
  ],
  [UserRole.READONLY]: [
    USER_PERMISSIONS.DASHBOARD_VIEW,
    USER_PERMISSIONS.PRODUCTS_VIEW,
    USER_PERMISSIONS.CUSTOMERS_VIEW,
    USER_PERMISSIONS.SALES_VIEW,
    USER_PERMISSIONS.SERVICES_VIEW,
    USER_PERMISSIONS.REPORTS_VIEW,
  ],
};
