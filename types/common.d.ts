export type BaseEntity = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface SortParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
