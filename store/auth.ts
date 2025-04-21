import { defineStore } from "pinia";
import { type User } from "../types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  }),

  getters: {
    // Retorna se o usuário está autenticado
    getIsAuthenticated(): boolean {
      return this.isAuthenticated;
    },

    // Retorna o usuário atual
    getUser(): User | null {
      return this.user;
    },

    // Retorna o token JWT
    getToken(): string | null {
      return this.token;
    },

    // Verifica se o usuário tem uma determinada permissão
    hasPermission:
      (state) =>
      (permission: string): boolean => {
        if (!state.user || !state.user.permissions) {
          return false;
        }
        return state.user.permissions.includes(permission);
      },
  },

  actions: {
    // Ação para realizar login
    async login(payload: LoginPayload) {
      this.loading = true;
      try {
        // Em um cenário real, aqui faríamos a chamada à API
        // const response = await api.post('/auth/login', payload);

        // Simulação de resposta da API (em produção, isto viria do backend)
        const mockResponse = {
          user: {
            id: "1",
            name: "Usuário Teste",
            email: payload.email,
            permissions: ["dashboard:view", "products:view", "customers:view"],
            avatar: "",
          },
          token: "jwt-token-exemplo",
        };

        // Salvar dados na store
        this.user = mockResponse.user;
        this.token = mockResponse.token;
        this.isAuthenticated = true;

        // Salvar token no localStorage se rememberMe estiver marcado
        if (payload.rememberMe) {
          localStorage.setItem("auth-token", mockResponse.token);
        }

        return mockResponse.user;
      } catch (error) {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Ação para verificar token existente e carregar usuário
    async checkAuth() {
      // Verifica se já existe um token salvo
      const token = localStorage.getItem("auth-token");
      if (!token) {
        return false;
      }

      this.loading = true;
      try {
        // Em produção, validaríamos o token com o backend
        // const response = await api.get('/auth/me');

        // Simulação de resposta da API
        const mockUser = {
          id: "1",
          name: "Usuário Teste",
          email: "usuario@teste.com",
          permissions: ["dashboard:view", "products:view", "customers:view"],
          avatar: "",
        };

        this.user = mockUser;
        this.token = token;
        this.isAuthenticated = true;

        return true;
      } catch (error) {
        this.logout();
        return false;
      } finally {
        this.loading = false;
      }
    },

    // Ação para logout
    async logout() {
      // Em produção, poderíamos invalidar o token no backend
      // await api.post('/auth/logout');

      // Limpar dados da store
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // Remover token do localStorage
      localStorage.removeItem("auth-token");

      return true;
    },
  },
});
