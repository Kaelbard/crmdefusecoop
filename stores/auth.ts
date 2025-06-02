// stores/auth.ts
import { defineStore } from "pinia";
import type { User } from "~/types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  loginAttempts: number;
  lastLoginAttempt: number | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoading: false,
    loginAttempts: 0,
    lastLoginAttempt: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,

    isAdmin: (state) => state.user?.role === "admin",

    isManager: (state) =>
      state.user?.role === "manager" || state.user?.role === "admin",

    canAccessReports: (state) =>
      state.user?.role === "admin" || state.user?.role === "manager",

    userInitials: (state) => {
      if (!state.user?.name) return "";
      return state.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    },

    isLocked: (state) => {
      if (state.loginAttempts < 3) return false;
      if (!state.lastLoginAttempt) return false;

      const lockDuration = 15 * 60 * 1000; // 15 minutos em ms
      return Date.now() - state.lastLoginAttempt < lockDuration;
    },

    lockTimeRemaining: (state) => {
      const lockDuration = 15 * 60 * 1000;
      const isLocked =
        state.loginAttempts >= 3 &&
        state.lastLoginAttempt !== null &&
        Date.now() - state.lastLoginAttempt < lockDuration;

      if (!isLocked) {
        return 0;
      }
      const elapsed = Date.now() - (state.lastLoginAttempt || 0);
      return Math.max(0, lockDuration - elapsed);
    },
  },

  actions: {
    async login(credentials: { email: string; password: string }) {
      if (this.isLocked) {
        throw new Error(
          `Conta bloqueada. Tente novamente em ${Math.ceil(
            this.lockTimeRemaining / 60000
          )} minutos.`
        );
      }

      this.isLoading = true;

      try {
        const { post } = useApi();
        const response = await post("/auth/login", credentials);

        if (
          response.success &&
          response.data &&
          "user" in (response.data as object) &&
          "token" in (response.data as object)
        ) {
          this.user = (response.data as { user: User; token: string }).user;
          this.token = (response.data as { user: User; token: string }).token;
          this.loginAttempts = 0;
          this.lastLoginAttempt = null;

          // Persistir no localStorage
          if (process.client) {
            const data = response.data as { user: User; token: string };
            localStorage.setItem("auth_token", data.token);
            localStorage.setItem(
              "auth_user",
              JSON.stringify(data.user)
            );
          }

          // Atualizar último login
          if (this.user) {
            this.user.lastLogin = new Date().toISOString();
          }

          return response.data;
        }

        throw new Error(response.message || "Credenciais inválidas");
      } catch (error) {
        this.loginAttempts++;
        this.lastLoginAttempt = Date.now();

        console.error("Login error:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.isLoading = true;

      try {
        if (this.token) {
          const { post } = useApi();
          await post("/auth/logout");
        }
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        this.clearAuth();
        this.isLoading = false;
      }
    },

    clearAuth() {
      this.user = null;
      this.token = null;

      if (process.client) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    },

    async checkAuth() {
      if (process.client) {
        const savedToken = localStorage.getItem("auth_token");
        const savedUser = localStorage.getItem("auth_user");

        if (savedToken && savedUser) {
          try {
            this.token = savedToken;
            this.user = JSON.parse(savedUser);

            // Verificar se o token ainda é válido
            const { get } = useApi();
            const response = await get("/auth/me");

            if (response.success && response.data) {
              this.user = response.data as User;
            } else {
              throw new Error("Token inválido");
            }
          } catch (error) {
            console.error("Auth check error:", error);
            this.clearAuth();
          }
        }
      }
    },

    async updateProfile(profileData: Partial<User>) {
      if (!this.user) throw new Error("Usuário não autenticado");

      this.isLoading = true;

      try {
        const { put } = useApi();
        const response = await put("/auth/profile", profileData);

        if (response.success && response.data) {
          this.user = response.data as User;

          if (process.client) {
            localStorage.setItem("auth_user", JSON.stringify(response.data));
          }

          return response.data;
        }

        throw new Error(response.message || "Erro ao atualizar perfil");
      } catch (error) {
        console.error("Update profile error:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async changePassword(passwordData: {
      currentPassword: string;
      newPassword: string;
    }) {
      if (!this.user) throw new Error("Usuário não autenticado");

      this.isLoading = true;

      try {
        const { post } = useApi();
        const response = await post("/auth/change-password", passwordData);

        if (!response.success) {
          throw new Error(response.message || "Erro ao alterar senha");
        }

        return response;
      } catch (error) {
        console.error("Change password error:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    resetLock() {
      this.loginAttempts = 0;
      this.lastLoginAttempt = null;
    },
  },
});
