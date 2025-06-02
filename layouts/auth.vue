<!-- layouts/auth.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Sistema de Gestão</h1>
          <p class="text-gray-600 mt-2">Faça login para continuar</p>
        </div>

        <slot />

        <div class="mt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 Sistema de Gestão Empresarial</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout simples para páginas de autenticação
</script>
