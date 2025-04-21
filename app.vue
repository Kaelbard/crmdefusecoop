<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Verificar a autenticação no carregamento inicial da aplicação
import { useAuthStore } from "~/store/auth";

// Quando o app iniciar, verificamos se existe um token salvo
onMounted(async () => {
  const authStore = useAuthStore();

  try {
    // Verificar se existe um token válido
    await authStore.checkAuth();
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
  }
});
</script>

<style>
html {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  @apply bg-gray-100;
  margin: 0;
  padding: 0;
}

#__nuxt {
  min-height: 100vh;
}
</style>
