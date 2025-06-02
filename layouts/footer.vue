<!-- components/layout/Footer.vue -->
<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Informações da empresa -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-900 tracking-wider uppercase"
          >
            Sistema de Gestão
          </h3>
          <p class="mt-2 text-sm text-gray-600">
            Solução completa para gestão empresarial, desenvolvida para pequenas
            e médias empresas.
          </p>
        </div>

        <!-- Links úteis -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-900 tracking-wider uppercase"
          >
            Links Úteis
          </h3>
          <ul class="mt-2 space-y-2">
            <li>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">
                Documentação
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">
                Suporte
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-gray-600 hover:text-gray-900">
                Política de Privacidade
              </a>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-900 tracking-wider uppercase"
          >
            Contato
          </h3>
          <ul class="mt-2 space-y-2">
            <li class="text-sm text-gray-600">
              <span class="font-medium">Email:</span> suporte@sistema.com
            </li>
            <li class="text-sm text-gray-600">
              <span class="font-medium">Telefone:</span> (11) 9999-9999
            </li>
            <li class="text-sm text-gray-600">
              <span class="font-medium">Versão:</span> {{ version }}
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <p class="text-sm text-gray-600">
          &copy; {{ currentYear }} Sistema de Gestão Empresarial. Todos os
          direitos reservados.
        </p>

        <div class="mt-4 md:mt-0 flex items-center space-x-4">
          <span class="text-xs text-gray-500">
            Última atualização: {{ lastUpdate }}
          </span>
          <div
            :class="{
              'bg-green-100 text-green-800': systemStatus === 'online',
              'bg-red-100 text-red-800': systemStatus === 'offline',
              'bg-yellow-100 text-yellow-800': systemStatus === 'maintenance',
            }"
            class="px-2 py-1 text-xs font-medium rounded-full"
          >
            {{ systemStatusText }}
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentYear = new Date().getFullYear();
const version = "1.0.0";
const lastUpdate = "26/05/2025";
const systemStatus = ref<"online" | "offline" | "maintenance">("online");

const systemStatusText = computed(() => {
  switch (systemStatus.value) {
    case "online":
      return "Sistema Online";
    case "offline":
      return "Sistema Offline";
    case "maintenance":
      return "Em Manutenção";
    default:
      return "Status Desconhecido";
  }
});
</script>
