<!-- components/layout/Navbar.vue -->
<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div class="ml-4 flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">
              Sistema de Gestão
            </h1>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Notificações -->
          <button
            @click="showNotifications = !showNotifications"
            class="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              v-if="unreadNotifications > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ unreadNotifications }}
            </span>
          </button>

          <!-- Menu do usuário -->
          <div class="relative" ref="userMenuRef">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <img
                class="h-8 w-8 rounded-full"
                :src="user?.avatar || '/default-avatar.png'"
                :alt="user?.name"
              />
              <span class="text-sm font-medium">{{ user?.name }}</span>
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Perfil</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Configurações</a
              >
              <div class="border-t border-gray-100"></div>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import { useUiStore } from "~/stores/ui";

const authStore = useAuthStore();
const uiStore = useUiStore();
const { user } = storeToRefs(authStore);

const showUserMenu = ref(false);
const showNotifications = ref(false);
const unreadNotifications = ref(3); // Mock data
const userMenuRef = ref(null);

const toggleSidebar = () => {
  uiStore.toggleSidebar();
};

const logout = async () => {
  await authStore.logout();
  await navigateTo("/login");
};

const handleClickOutside = (event: MouseEvent) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>



