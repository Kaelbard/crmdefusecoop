<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6"
  >
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <div class="text-center">
        <!-- Ícone de bloqueio -->
        <div
          class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4"
        >
          <svg
            class="h-10 w-10 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>

        <p class="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página. Se você acredita que
          isto é um erro, entre em contato com o administrador do sistema.
        </p>

        <div class="space-y-3">
          <button
            @click="goBack"
            class="w-full inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              class="-ml-1 mr-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            Voltar
          </button>

          <NuxtLink
            to="/"
            class="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              class="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Ir para o Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

// Composables
const auth = useAuth();
const router = useRouter();

// Método para voltar para a página anterior
const goBack = () => {
  router.back();
};

// Verificar autenticação
onMounted(async () => {
  const isAuthenticated = await auth.checkAuth();

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    navigateTo("/login");
  }
});
</script>
