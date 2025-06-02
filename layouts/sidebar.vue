<!-- components/layout/Sidebar.vue -->
<template>
  <aside
    :class="{
      'translate-x-0': sidebarOpen,
      '-translate-x-full': !sidebarOpen,
    }"
    class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 pt-16 lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out"
  >
    <div class="flex flex-col h-full">
      <nav class="flex-1 px-4 py-6 space-y-2">
        <!-- Dashboard -->
        <NuxtLink
          to="/"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          active-class="bg-blue-100 text-blue-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 5a2 2 0 012-2h2a2 2 0 012 2v6H8V5z"
            />
          </svg>
          Dashboard
        </NuxtLink>

        <!-- Clientes -->
        <NuxtLink
          to="/clientes"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          active-class="bg-blue-100 text-blue-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Clientes
        </NuxtLink>

        <!-- Produtos -->
        <NuxtLink
          to="/produtos"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          active-class="bg-blue-100 text-blue-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          Produtos
        </NuxtLink>

        <!-- Serviços -->
        <NuxtLink
          to="/servicos"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          active-class="bg-blue-100 text-blue-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
          Serviços
        </NuxtLink>

        <!-- Vendas -->
        <NuxtLink
          to="/vendas"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          active-class="bg-blue-100 text-blue-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Vendas
        </NuxtLink>

        <!-- Relatórios -->
        <div class="space-y-1">
          <button
            @click="reportsOpen = !reportsOpen"
            class="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Relatórios
            <svg
              :class="{ 'rotate-90': reportsOpen }"
              class="w-4 h-4 ml-auto transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div v-if="reportsOpen" class="pl-9 space-y-1">
            <NuxtLink
              to="/relatorios"
              class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              Visão Geral
            </NuxtLink>
            <NuxtLink
              to="/relatorios/vendas"
              class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              Vendas
            </NuxtLink>
            <NuxtLink
              to="/relatorios/clientes"
              class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              Clientes
            </NuxtLink>
            <NuxtLink
              to="/relatorios/estoque"
              class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              Estoque
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- Rodapé da sidebar -->
      <div class="p-4 border-t border-gray-200">
        <div class="text-xs text-gray-500 text-center">
          <p>Sistema de Gestão v1.0</p>
          <p>&copy; 2024 Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  </aside>

  <!-- Overlay para mobile -->
  <div
    v-if="sidebarOpen"
    @click="closeSidebar"
    class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUiStore } from "~/stores/ui";

const uiStore = useUiStore();
const { sidebarOpen } = storeToRefs(uiStore);

const reportsOpen = ref(false);

const closeSidebar = () => {
  uiStore.closeSidebar();
};
</script>
