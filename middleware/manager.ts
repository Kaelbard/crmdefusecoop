export default defineNuxtRouteMiddleware((to, from) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }

  // Verificar se o usuário tem permissão de manager ou admin
  const allowedRoles = ["admin", "manager"];
  if (!user.value || !allowedRoles.includes(user.value.role)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Acesso negado. Permissões de gerente necessárias.",
    });
  }
});
