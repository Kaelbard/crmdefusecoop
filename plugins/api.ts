import { defineNuxtPlugin } from "nuxt/app";

/**
 * Plugin para configuração da API do sistema
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Base URL da API (configurado no nuxt.config.ts)
  const baseURL =
    process.env.NODE_ENV === "production"
      ? config.public.apiBaseUrl || "https://api.gestaoplus.com.br"
      : "http://localhost:3001/api";

  // Função para obter o token JWT do localStorage
  const getToken = (): string | null => {
    if (process.client) {
      return localStorage.getItem("auth-token");
    }
    return null;
  };

  // Configuração personalizada para o useFetch do Nuxt
  const apiFetch = async (endpoint: string, options: any = {}) => {
    // Adicionar headers padrão
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    };

    // Adicionar token de autenticação se disponível
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Construir a URL completa
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${baseURL}${endpoint}`;

    // Usar o useFetch do Nuxt com nossa configuração
    return await useFetch(url, {
      ...options,
      headers,
      onRequest({ request, options }) {
        // Podemos fazer algo antes da request
        console.log(`[API] Requisição para: ${request}`);
      },
      onRequestError({ request, options, error }) {
        // Tratamento de erro na request
        console.error(`[API] Erro na requisição para: ${request}`, error);
      },
      onResponse({ request, response, options }) {
        // Podemos fazer algo com a resposta
        console.log(`[API] Resposta de: ${request}`, response.status);
      },
      onResponseError({ request, response, options }) {
        // Tratamento de erro na resposta
        console.error(`[API] Erro na resposta de: ${request}`, response.status);

        // Se o token estiver inválido (401), podemos fazer logout
        if (response.status === 401) {
          // Logout do usuário (em uma implementação real)
          // useAuthStore().logout();
        }
      },
    });
  };

  // Métodos para cada tipo de requisição HTTP
  const api = {
    get: (endpoint: string, options: any = {}) =>
      apiFetch(endpoint, { method: "GET", ...options }),

    post: (endpoint: string, body: any, options: any = {}) =>
      apiFetch(endpoint, { method: "POST", body, ...options }),

    put: (endpoint: string, body: any, options: any = {}) =>
      apiFetch(endpoint, { method: "PUT", body, ...options }),

    patch: (endpoint: string, body: any, options: any = {}) =>
      apiFetch(endpoint, { method: "PATCH", body, ...options }),

    delete: (endpoint: string, options: any = {}) =>
      apiFetch(endpoint, { method: "DELETE", ...options }),
  };

  return {
    provide: {
      api,
    },
  };
});
