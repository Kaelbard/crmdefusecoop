
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, checkAuth } = useAuth();

  // Verificar autenticação no lado do cliente
  if (process.client) {
    checkAuth();
  }

  // Páginas que não requerem autenticação
  const publicPages = ["/login", "/register", "/forgot-password"];
  const isPublicPage = publicPages.includes(to.path);

  // Se não está autenticado e tentando acessar página protegida
  if (!isAuthenticated.value && !isPublicPage) {
    // Salvar a página de destino para redirecionamento após login
    const redirectTo = to.fullPath;

    return navigateTo({
      path: "/login",
      query: redirectTo !== "/" ? { redirect: redirectTo } : {},
    });
  }

  // Se está autenticado e tentando acessar página de login
  if (isAuthenticated.value && isPublicPage) {
    return navigateTo("/");
  }
});
