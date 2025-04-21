<template>
  <div>
    <h2
      class="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900"
    >
      Recuperar Senha
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Insira seu e-mail e enviaremos instruções para redefinir sua senha.
    </p>

    <form class="mt-6 space-y-6" @submit.prevent="handleRecoverPassword">
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
        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span v-if="isLoading">Enviando...</span>
          <span v-else>Enviar Instruções</span>
        </button>
      </div>

      <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="text-sm text-red-700">
            {{ errorMessage }}
          </div>
        </div>
      </div>

      <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="text-sm text-green-700">
            {{ successMessage }}
          </div>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink
          to="/login"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          Voltar para o login
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

// Composables
import { useNotification } from "~/composables/useNotification";

// Estado do formulário
const email = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// Composable de notificação
const notification = useNotification();

// Função para lidar com a recuperação de senha
const handleRecoverPassword = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    // Aqui usaríamos a lógica real de recuperação de senha
    // Por enquanto, vamos simular:
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulação bem-sucedida
    successMessage.value =
      "E-mail enviado com sucesso! Verifique sua caixa de entrada para instruções de recuperação de senha.";
    notification.success("E-mail de recuperação enviado com sucesso!");

    // Limpar o formulário
    email.value = "";
  } catch (error) {
    // Tratar erros
    errorMessage.value =
      "Erro ao enviar e-mail de recuperação. Tente novamente.";
    notification.error("Erro ao enviar e-mail de recuperação.");
  } finally {
    isLoading.value = false;
  }
};
</script>
