export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuth();
  const uiStore = useUiStore();

  // Verificar autenticação ao inicializar a aplicação
  if (process.client) {
    await checkAuth();

    // Inicializar tema
    uiStore.initTheme();
  }

  // Adicionar token de autenticação automaticamente
  $fetch.create({
    onRequest({ request, options }) {
      const { token } = useAuth();

      if (token.value) {
        options.headers.append("Authorization", `Bearer ${token.value}`);
      }
    },

    onRequestError({ request, options, error }) {
      console.error("Request Error:", error);
      uiStore.notifyError(
        "Erro de Requisição",
        "Falha ao conectar com o servidor"
      );
    },

    onResponseError({ request, response, options }) {
      const { logout } = useAuth();

      // Tratar erros de resposta
      if (response.status === 401) {
        // Token expirado ou inválido
        logout();
        uiStore.notifyError(
          "Sessão Expirada",
          "Faça login novamente para continuar"
        );
        navigateTo("/login");
      } else if (response.status === 403) {
        uiStore.notifyError(
          "Acesso Negado",
          "Você não tem permissão para realizar esta ação"
        );
      } else if (response.status === 422) {
        // Erros de validação
        const data = response._data;
        if (data?.errors) {
          Object.values(data.errors).forEach((error: any) => {
            uiStore.notifyWarning("Erro de Validação", error);
          });
        }
      } else if (response.status >= 500) {
        uiStore.notifyError(
          "Erro do Servidor",
          "Ocorreu um erro interno. Tente novamente em alguns minutos."
        );
      } else {
        const message = response._data?.message || "Erro desconhecido";
        uiStore.notifyError("Erro", message);
      }
    },
  });
});
