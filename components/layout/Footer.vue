<template>
  <footer class="bg-white py-4 border-t">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Logo e informações da empresa -->
        <div class="mb-4 md:mb-0">
          <div class="flex items-center">
            <div
              class="h-6 w-6 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs"
            >
              GP
            </div>
            <span class="ml-2 text-gray-700 font-medium">Gestão Plus</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">
            © {{ currentYear }} Defuse Coop. Todos os direitos reservados.
          </p>
        </div>

        <!-- Links úteis -->
        <div class="flex space-x-4">
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700"
            >Ajuda</a
          >
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700"
            >Termos de Uso</a
          >
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700"
            >Privacidade</a
          >
        </div>

        <!-- Versão do sistema -->
        <div class="mt-4 md:mt-0">
          <p class="text-xs text-gray-400">Versão {{ appVersion }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Computed para o ano atual
const currentYear = computed(() => new Date().getFullYear());

// Versão do aplicativo (poderia vir de uma configuração)
const appVersion = ref("1.0.0");
</script>
