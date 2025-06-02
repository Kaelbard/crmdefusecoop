import type { RequestOptions } from "~/types/api";
import type { ApiResponse } from "~/types/common";
export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiUrl || "http://localhost:3001/api";

  const request = async <T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    const {
      method = "GET",
      data,
      params,
      headers = {},
      timeout = 10000,
    } = options;

    try {
      if (!baseURL) {
        throw new Error("baseURL não pode ser undefined ou null");
      }
      const url = new URL(endpoint, String(baseURL));

      // Adicionar parâmetros de query
      if (params) {
        Object.keys(params).forEach((key) => {
          if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, String(params[key]));
          }
        });
      }

      const requestOptions: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal: AbortSignal.timeout(timeout),
      };

      if (data && ["POST", "PUT", "PATCH"].includes(method)) {
        requestOptions.body = JSON.stringify(data);
      }

      const response = await fetch(url.toString(), requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const get = <T>(endpoint: string, params?: Record<string, any>) =>
    request<T>(endpoint, { method: "GET", params });

  const post = <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: "POST", data });

  const put = <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: "PUT", data });

  const patch = <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: "PATCH", data });

  const del = <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" });

  return {
    request,
    get,
    post,
    put,
    patch,
    delete: del,
  };
};
