import { useAuthStore } from "~/store/auth";

/**
 * Middleware para verificar se o usuário está autenticado
 *
 * Uso:
 * 1. Em uma única página:
 *    definePageMeta({ middleware: ['auth'] })
 *
 * 2. Para verificar uma permissão específica:
 *    definePageMeta({ middleware: ['auth'], meta: { requiredPermission: 'products:view' } })
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Acesso ao store de autenticação
  const authStore = useAuthStore();

  // Verifica se o usuário já está autenticado
  if (!authStore.isAuthenticated) {
    // Tentativa de verificar o token
    const isAuthenticated = await authStore.checkAuth();

    // Se não estiver autenticado, redireciona para o login
    if (!isAuthenticated) {
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  }

  // Verifica se a rota requer uma permissão específica
  const requiredPermission = to.meta.requiredPermission as string | undefined;

  if (requiredPermission && !authStore.hasPermission(requiredPermission)) {
    // Usuário não tem a permissão necessária
    console.warn(
      `Acesso negado: Permissão '${requiredPermission}' é necessária`
    );

    // Redireciona para a página inicial ou uma página de acesso negado
    return navigateTo("/acesso-negado");
  }

  // Usuário está autenticado e tem as permissões necessárias
  return;
});
