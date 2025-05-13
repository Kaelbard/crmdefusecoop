<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Relatórios</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Relatório de Vendas -->
      <Card
        class="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        @click="router.push('/relatorios/vendas')"
      >
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600"
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
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Vendas</h3>
            <p class="text-sm text-gray-500">
              Análise detalhada de vendas e faturamento
            </p>
          </div>
        </div>
      </Card>

      <!-- Relatório de Clientes -->
      <Card
        class="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        @click="router.push('/relatorios/clientes')"
      >
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-green-100 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600"
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
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Clientes</h3>
            <p class="text-sm text-gray-500">
              Análise do perfil e comportamento dos clientes
            </p>
          </div>
        </div>
      </Card>

      <!-- Relatório de Estoque -->
      <Card
        class="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        @click="router.push('/relatorios/estoque')"
      >
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg
              class="w-6 h-6 text-purple-600"
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
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Estoque</h3>
            <p class="text-sm text-gray-500">
              Controle e análise de produtos em estoque
            </p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Resumo Geral -->
    <Card class="p-6">
      <h2 class="text-xl font-semibold mb-4">Resumo Geral</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 class="text-sm font-medium text-gray-500">Vendas do Mês</h4>
          <p class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(vendasMes) }}
          </p>
        </div>
        <div>
          <h4 class="text-sm font-medium text-gray-500">Novos Clientes</h4>
          <p class="text-2xl font-bold text-gray-900">{{ novosClientes }}</p>
        </div>
        <div>
          <h4 class="text-sm font-medium text-gray-500">Produtos em Estoque</h4>
          <p class="text-2xl font-bold text-gray-900">{{ totalProdutos }}</p>
        </div>
        <div>
          <h4 class="text-sm font-medium text-gray-500">Ticket Médio</h4>
          <p class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(ticketMedio) }}
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Card from "../../components/ui/Card.vue";

const router = useRouter();

// Dados mockados para exemplo
const vendasMes = ref(125000.0);
const novosClientes = ref(45);
const totalProdutos = ref(250);
const ticketMedio = ref(350.0);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
</script>
