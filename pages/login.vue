<template>
  <div>
    <h2
      class="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900"
    >
      Acesse sua conta
    </h2>

    <form class="mt-6 space-y-6" @submit.prevent="handleLogin">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >E-mail</label
        >
        <div class="mt-1">
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Senha</label
        >
        <div class="mt-1">
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            placeholder="••••••"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            v-model="rememberMe"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"
            >Lembrar-me</label
          >
        </div>

        <div class="text-sm">
          <NuxtLink
            to="/recuperar-senha"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Esqueceu a senha?
          </NuxtLink>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span v-if="isLoading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </div>

      <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="text-sm text-red-700">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

// Composables
import { useAuth } from "~/composables/useAuth";
import { useNotification } from "~/composables/useNotification";

// Store
import { useAuthStore } from "~/store/auth";

// Estado do formulário
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

// Composables e store
const auth = useAuth();
const notification = useNotification();
const authStore = useAuthStore();

// Função para lidar com o login
const handleLogin = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Aqui usaríamos a lógica de autenticação real
    // Por enquanto, vamos simular:
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Chamar a action de login do store de autenticação
    // A implementação real usaria await authStore.login({ email: email.value, password: password.value, rememberMe: rememberMe.value });

    // Simulação bem-sucedida
    notification.success("Login realizado com sucesso!");
    navigateTo("/");
  } catch (error) {
    // Tratar erros
    errorMessage.value = "Credenciais inválidas. Tente novamente.";
    notification.error("Erro ao fazer login. Verifique suas credenciais.");
  } finally {
    isLoading.value = false;
  }
};
</script>
