export type ApiConfig = {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export type ApiError = {
  message: string;
  code?: string | number;
  status?: number;
  details?: any;
}

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
}