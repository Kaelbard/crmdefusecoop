<template>
  <nav class="bg-white shadow-sm">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo e título -->
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <!-- Logo poderia ser uma imagem real -->
            <div
              class="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold"
            >
              GP
            </div>
            <span class="ml-2 text-xl font-semibold text-gray-900"
              >Gestão Plus</span
            >
          </div>
        </div>

        <!-- Ícones e menu do usuário -->
        <div class="flex items-center">
          <!-- Notificações -->
          <button
            class="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <span class="sr-only">Ver notificações</span>
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m14 0h2m-2 0h-5m-4 0v-1a1 1 0 011-1h2a1 1 0 011 1v1m-4 0h4"
              />
            </svg>
          </button>

          <!-- Menu de perfil -->
          <div class="ml-3 relative">
            <div>
              <button
                @click="toggleProfileMenu"
                class="max-w-xs flex items-center text-sm rounded-full focus:outline-none"
              >
                <span class="sr-only">Abrir menu de usuário</span>
                <div
                  v-if="user?.avatar"
                  class="h-8 w-8 rounded-full overflow-hidden"
                >
                  <img
                    :src="user.avatar"
                    alt="Avatar do usuário"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <span class="text-gray-600 font-medium">{{
                    userInitials
                  }}</span>
                </div>
                <span class="ml-2 text-gray-700">{{
                  user?.name || "Usuário"
                }}</span>
                <svg
                  class="ml-1 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Menu dropdown -->
            <div
              v-if="showProfileMenu"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
            >
              <div class="py-1 bg-white rounded-md shadow-xs">
                <NuxtLink
                  to="/perfil"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Meu Perfil
                </NuxtLink>
                <NuxtLink
                  to="/configuracoes"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Configurações
                </NuxtLink>
                <button
                  @click="logout"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { type User } from "~/types/user";

// Composables
const auth = useAuth();

// Estado
const showProfileMenu = ref(false);
const user = computed(() => auth.user.value);

// Método para alternar a exibição do menu de perfil
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

// Computed para obter as iniciais do usuário para o avatar
const userInitials = computed(() => {
  if (!user.value?.name) return "U";

  const nameParts = user.value.name.split(" ");
  if (nameParts.length === 1) return nameParts[0].charAt(0);

  return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(
    0
  )}`;
});

// Método para fazer logout
const logout = async () => {
  await auth.logout();
};

// Fechar o menu quando clicar fora dele
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (showProfileMenu.value) {
      showProfileMenu.value = false;
    }
  };

  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});
</script>
