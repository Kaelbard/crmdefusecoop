export default defineNuxtRouteMiddleware((to, from) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }

  // Verificar se o usuário tem permissão de admin
  if (user.value?.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Acesso negado. Permissões de administrador necessárias.",
    });
  }
});
