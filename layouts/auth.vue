<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">Gestão Plus</h2>
          <p class="mt-2 text-sm text-gray-600">
            Sistema integrado de gestão empresarial
          </p>
        </div>
        
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <!-- Slot para o conteúdo das páginas de autenticação -->
            <slot />
            
            <!-- Footer com informações de copyright -->
            <div class="mt-6 text-center text-xs text-gray-500">
              <p>&copy; {{ new Date().getFullYear() }} Defuse Coop. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Composables que podem ser úteis para o layout de autenticação
  import { useAuth } from '~/composables/useAuth'
  import { useNotification } from '~/composables/useNotification'
  
  // Usaremos os composables quando implementarmos a lógica de autenticação
  const auth = useAuth()
  const notification = useNotification()
  
  // Verificar se usuário já está autenticado
  onMounted(() => {
    // Aqui podemos adicionar lógica para redirecionar usuários já autenticados para o dashboard
    // Exemplo: if (auth.isAuthenticated) navigateTo('/')
  })
  </script>