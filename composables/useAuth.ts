import { useAuthStore } from "~/store/auth";
import { type User } from "~/types/user";

interface UseAuthReturn {
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<User>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
  isAuthenticated: ComputedRef<boolean>;
  user: ComputedRef<User | null>;
  hasPermission: (permission: string) => boolean;
  isLoading: ComputedRef<boolean>;
}

/**
 * Composable para gerenciar autenticação do usuário
 */
export function useAuth(): UseAuthReturn {
  const authStore = useAuthStore();
  const router = useRouter();

  /**
   * Realiza login do usuário
   */
  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<User> => {
    try {
      const user = await authStore.login({ email, password, rememberMe });
      return user;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  /**
   * Realiza logout do usuário
   */
  const logout = async (): Promise<boolean> => {
    try {
      await authStore.logout();
      router.push("/login");
      return true;
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      return false;
    }
  };

  /**
   * Verifica se o usuário está autenticado
   */
  const checkAuth = async (): Promise<boolean> => {
    return await authStore.checkAuth();
  };

  /**
   * Verifica se o usuário tem uma determinada permissão
   */
  const hasPermission = (permission: string): boolean => {
    return authStore.hasPermission(permission);
  };

  // Propriedades computadas para acesso aos dados do store
  const isAuthenticated = computed(() => authStore.getIsAuthenticated);
  const user = computed(() => authStore.getUser);
  const isLoading = computed(() => authStore.loading);

  return {
    login,
    logout,
    checkAuth,
    isAuthenticated,
    user,
    hasPermission,
    isLoading,
  };
}
