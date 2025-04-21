<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>

    <!-- Seção de KPIs principais -->
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Cartão de Total de Vendas -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total de Vendas</p>
            <p class="text-2xl font-semibold text-gray-900">
              R$ {{ salesTotal }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-green-500 font-medium text-sm flex items-center">
              <svg
                class="h-4 w-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clip-rule="evenodd"
                />
              </svg>
              +15%
            </span>
            <span class="text-gray-500 text-sm ml-2"
              >em relação ao mês anterior</span
            >
          </div>
        </div>
      </div>

      <!-- Cartão de Novos Clientes -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Novos Clientes</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ newCustomers }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-green-500 font-medium text-sm flex items-center">
              <svg
                class="h-4 w-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clip-rule="evenodd"
                />
              </svg>
              +7%
            </span>
            <span class="text-gray-500 text-sm ml-2"
              >em relação ao mês anterior</span
            >
          </div>
        </div>
      </div>

      <!-- Cartão de Produtos em Estoque -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Produtos em Estoque</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ productsInStock }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-red-500 font-medium text-sm flex items-center">
              <svg
                class="h-4 w-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                  clip-rule="evenodd"
                />
              </svg>
              -3%
            </span>
            <span class="text-gray-500 text-sm ml-2"
              >em relação ao mês anterior</span
            >
          </div>
        </div>
      </div>

      <!-- Cartão de Serviços Realizados -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Serviços Realizados</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ completedServices }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-green-500 font-medium text-sm flex items-center">
              <svg
                class="h-4 w-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clip-rule="evenodd"
                />
              </svg>
              +12%
            </span>
            <span class="text-gray-500 text-sm ml-2"
              >em relação ao mês anterior</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Gráfico de Vendas -->
    <div class="mt-8 bg-white shadow rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium text-gray-900">Vendas por Período</h2>
        <div class="flex space-x-2">
          <button
            @click="setPeriod('daily')"
            class="px-3 py-1 text-sm rounded-md"
            :class="
              period === 'daily'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            "
          >
            Diário
          </button>
          <button
            @click="setPeriod('weekly')"
            class="px-3 py-1 text-sm rounded-md"
            :class="
              period === 'weekly'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            "
          >
            Semanal
          </button>
          <button
            @click="setPeriod('monthly')"
            class="px-3 py-1 text-sm rounded-md"
            :class="
              period === 'monthly'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            "
          >
            Mensal
          </button>
        </div>
      </div>

      <div class="h-80">
        <!-- Aqui entraremos o componente de gráfico (Chart.js) -->
        <SalesChart :chartData="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Divisão em duas colunas - Vendas Recentes e Produtos mais Vendidos -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Vendas Recentes -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Vendas Recentes</h2>
        <div class="overflow-x-auto">
          <RecentSales :sales="recentSales"/>
        </div>
        <div class="mt-4 text-right">
          <NuxtLink
            to="/vendas"
            class="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Ver todas as vendas →
          </NuxtLink>
        </div>
      </div>

      <!-- Produtos mais Vendidos -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">
          Produtos mais Vendidos
        </h2>
        <div class="overflow-x-auto">
          <ProductsTable :products="topProducts" />
        </div>
        <div class="mt-4 text-right">
          <NuxtLink
            to="/produtos"
            class="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Ver todos os produtos →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

// Importação dos componentes do dashboard
import SalesChart from "~/components/dashboard/SalesChart.vue";
import RecentSales from "~/components/dashboard/RecentSales.vue";
import ProductsTable from "~/components/dashboard/ProductsTable.vue";

// Definir middleware de autenticação para esta página
definePageMeta({
  middleware: ["auth"],
  meta: {
    requiredPermission: "dashboard:view",
  },
});

// Composables
const auth = useAuth();

// Estado do Dashboard
const period = ref("monthly"); // diário, semanal, mensal
const salesTotal = ref("25.300,00");
const newCustomers = ref(42);
const productsInStock = ref(187);
const completedServices = ref(56);

// Dados para o gráfico de vendas (simulados)
const chartData = ref({
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Vendas",
      data: [12000, 19000, 15000, 17000, 22000, 25000],
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 2,
      tension: 0.4,
    },
  ],
});

// Opções para o gráfico
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

// Vendas recentes (simuladas)
const recentSales = ref([
  {
    id: "1",
    date: "2025-04-20",
    customer: "João Silva",
    amount: "R$ 350,00",
    status: "Concluída",
  },
  {
    id: "2",
    date: "2025-04-19",
    customer: "Maria Oliveira",
    amount: "R$ 120,00",
    status: "Concluída",
  },
  {
    id: "3",
    date: "2025-04-18",
    customer: "Pedro Santos",
    amount: "R$ 780,00",
    status: "Concluída",
  },
  {
    id: "4",
    date: "2025-04-18",
    customer: "Ana Ferreira",
    amount: "R$ 450,00",
    status: "Pendente",
  },
  {
    id: "5",
    date: "2025-04-17",
    customer: "Carlos Mendes",
    amount: "R$ 230,00",
    status: "Concluída",
  },
]);

// Produtos mais vendidos (simulados)
const topProducts = ref([
  {
    id: "1",
    name: "Notebook XPS 15",
    price: "R$ 7.500,00",
    stock: 12,
    salesCount: 28,
  },
  {
    id: "2",
    name: "Monitor Ultrawide",
    price: "R$ 2.300,00",
    stock: 8,
    salesCount: 23,
  },
  {
    id: "3",
    name: "Mouse Wireless Pro",
    price: "R$ 180,00",
    stock: 45,
    salesCount: 42,
  },
  {
    id: "4",
    name: "Teclado Mecânico RGB",
    price: "R$ 350,00",
    stock: 17,
    salesCount: 37,
  },
  {
    id: "5",
    name: "Headset Gaming 7.1",
    price: "R$ 420,00",
    stock: 5,
    salesCount: 31,
  },
]);

// Método para mudar o período do gráfico
const setPeriod = (newPeriod: string) => {
  period.value = newPeriod;

  // Em um cenário real, aqui faríamos uma chamada à API para atualizar os dados do gráfico
  // Por enquanto, vamos simular mudanças nos dados
  if (newPeriod === "daily") {
    chartData.value.labels = [
      "15/04",
      "16/04",
      "17/04",
      "18/04",
      "19/04",
      "20/04",
      "21/04",
    ];
    chartData.value.datasets[0].data = [800, 1200, 950, 1100, 1300, 950, 1500];
  } else if (newPeriod === "weekly") {
    chartData.value.labels = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
    chartData.value.datasets[0].data = [4200, 5100, 6300, 7200];
  } else if (newPeriod === "monthly") {
    chartData.value.labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    chartData.value.datasets[0].data = [
      12000, 19000, 15000, 17000, 22000, 25000,
    ];
  }
};

// No mundo real, buscaríamos os dados do backend
onMounted(async () => {
  // Simulação de carregamento de dados
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Aqui faríamos chamadas para APIs como:
  // const salesResponse = await api.get('/dashboard/sales');
  // salesTotal.value = salesResponse.data.total;
  // e assim por diante...
});
</script>
