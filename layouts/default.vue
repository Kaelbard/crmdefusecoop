<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barra de navegação superior -->
    <Navbar />

    <div class="flex">
      <!-- Sidebar (menu lateral) -->
      <Sidebar />

      <!-- Conteúdo principal -->
      <main class="flex-1 p-6">
        <!-- Slot para o conteúdo das páginas -->
        <slot />
      </main>
    </div>

    <!-- Rodapé -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

// Importação dos componentes de layout
import Navbar from "~/components/layout/Navbar.vue";
import Sidebar from "~/components/layout/Sidebar.vue";
import Footer from "~/components/layout/Footer.vue";

// Composables
const auth = useAuth();

// Verificar autenticação ao carregar o layout
onMounted(async () => {
  const isAuthenticated = await auth.checkAuth();

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    navigateTo("/login");
  }
});
</script>
