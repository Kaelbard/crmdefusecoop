// composables/useAuth.ts
import type { User, AuthUser } from '~/types/user';

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null);
  const token = useState<string | null>('auth.token', () => null);
  const isAuthenticated = computed(() => !!user.value && !!token.value);
  const { post } = useApi();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await post<AuthUser>('/auth/login', credentials);
      
      if (response.success && response.data) {
        user.value = response.data.user;
        token.value = response.data.token;
        
        // Salvar no localStorage para persistência
        if (process.client) {
          localStorage.setItem('auth_token', response.data.token);
          localStorage.setItem('auth_user', JSON.stringify(response.data.user));
        }
        
        return response.data;
      }
      
      throw new Error(response.message || 'Erro no login');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token.value) {
        await post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      user.value = null;
      token.value = null;
      
      if (process.client) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
  };

  const checkAuth = async () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');
      
      if (savedToken && savedUser) {
        try {
          token.value = savedToken;
          user.value = JSON.parse(savedUser);
          
          // Verificar se o token ainda é válido
          const { get } = useApi();
          await get('/auth/me');
        } catch (error) {
          await logout();
        }
      }
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const { put } = useApi();
      const response = await put<User>('/auth/profile', profileData);
      
      if (response.success && response.data) {
        user.value = response.data;
        
        if (process.client) {
          localStorage.setItem('auth_user', JSON.stringify(response.data));
        }
        
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao atualizar perfil');
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    logout,
    checkAuth,
    updateProfile,
  };
};