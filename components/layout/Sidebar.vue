<template>
  <div
    :class="[
      'bg-gray-800 text-white w-64 min-h-screen',
      isCollapsed ? 'w-16' : 'w-64',
      'transition-all duration-300 ease-in-out',
    ]"
  >
    <!-- Botão para colapsar/expandir -->
    <div class="p-4 flex justify-end">
      <button
        @click="toggleSidebar"
        class="text-gray-400 hover:text-white focus:outline-none"
      >
        <svg
          v-if="isCollapsed"
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
        <svg
          v-else
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
    </div>

    <!-- Navegação -->
    <nav class="mt-2">
      <ul>
        <!-- Dashboard -->
        <li>
          <NuxtLink
            to="/"
            class="block py-2.5 px-4 rounded transition duration-200"
            :class="[isActive('/') ? 'bg-blue-600' : 'hover:bg-gray-700']"
          >
            <div class="flex items-center">
              <svg
                class="h-6 w-6"
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
              <span v-if="!isCollapsed" class="ml-3">Dashboard</span>
            </div>
          </NuxtLink>
        </li>

        <!-- Produtos -->
        <li>
          <NuxtLink
            to="/produtos"
            class="block py-2.5 px-4 rounded transition duration-200"
            :class="[
              isActive('/produtos') ? 'bg-blue-600' : 'hover:bg-gray-700',
            ]"
          >
            <div class="flex items-center">
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span v-if="!isCollapsed" class="ml-3">Produtos</span>
            </div>
          </NuxtLink>
        </li>

        <!-- Clientes -->
        <li>
          <NuxtLink
            to="/clientes"
            class="block py-2.5 px-4 rounded transition duration-200"
            :class="[
              isActive('/clientes') ? 'bg-blue-600' : 'hover:bg-gray-700',
            ]"
          >
            <div class="flex items-center">
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span v-if="!isCollapsed" class="ml-3">Clientes</span>
            </div>
          </NuxtLink>
        </li>

        <!-- Vendas -->
        <li>
          <NuxtLink
            to="/vendas"
            class="block py-2.5 px-4 rounded transition duration-200"
            :class="[isActive('/vendas') ? 'bg-blue-600' : 'hover:bg-gray-700']"
          >
            <div class="flex items-center">
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span v-if="!isCollapsed" class="ml-3">Vendas</span>
            </div>
          </NuxtLink>
        </li>

        <!-- Serviços -->
        <li>
          <NuxtLink
            to="/servicos"
            class="block py-2.5 px-4 rounded transition duration-200"
            :class="[
              isActive('/servicos') ? 'bg-blue-600' : 'hover:bg-gray-700',
            ]"
          >
            <div class="flex items-center">
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span v-if="!isCollapsed" class="ml-3">Serviços</span>
            </div>
          </NuxtLink>
        </li>

        <!-- Relatórios -->
        <li>
          <NuxtLink
            to="/relatorios"
            class="block py-2.5 px-4 rounded transition duration-200"
            :class="[
              isActive('/relatorios') ? 'bg-blue-600' : 'hover:bg-gray-700',
            ]"
          >
            <div class="flex items-center">
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span v-if="!isCollapsed" class="ml-3">Relatórios</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

// Estado
const isCollapsed = ref(false);
const route = useRoute();

// Composables
const auth = useAuth();

// Método para verificar se um item está ativo
const isActive = (path: string): boolean => {
  return route.path.startsWith(path) && (path !== "/" || route.path === "/");
};

// Método para alternar o estado da barra lateral
const toggleSidebar = (): void => {
  isCollapsed.value = !isCollapsed.value;
  // Poderíamos salvar essa preferência no localStorage
  localStorage.setItem("sidebar-collapsed", isCollapsed.value.toString());
};

// Carregar a preferência salva do usuário
onMounted(() => {
  const savedState = localStorage.getItem("sidebar-collapsed");
  if (savedState) {
    isCollapsed.value = savedState === "true";
  }
});
</script>
