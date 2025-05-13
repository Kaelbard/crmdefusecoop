<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Relatório de Clientes</h1>
      <div class="flex space-x-2">
        <Button variant="secondary" @click="exportData">
          Exportar Dados
        </Button>
        <Button variant="primary" @click="refreshData"> Atualizar </Button>
      </div>
    </div>

    <!-- Métricas de Clientes -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Total de Clientes</h3>
        <p class="text-3xl font-bold text-blue-600">{{ totalClientes }}</p>
      </Card>
      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Clientes Ativos</h3>
        <p class="text-3xl font-bold text-green-600">{{ clientesAtivos }}</p>
      </Card>
      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Ticket Médio</h3>
        <p class="text-3xl font-bold text-purple-600">
          {{ formatCurrency(ticketMedio) }}
        </p>
      </Card>
    </div>

    <!-- Gráfico de Evolução de Clientes -->
    <Card class="p-4">
      <h3 class="text-lg font-semibold mb-4">Evolução de Clientes</h3>
      <div class="h-80">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </Card>

    <!-- Tabela de Clientes -->
    <Card class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Lista de Clientes</h3>
        <div class="flex space-x-2">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Buscar cliente..."
            class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="header in tableHeaders"
                :key="header.value"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                @click="sortBy(header.value)"
              >
                {{ header.text }}
                <span v-if="sortColumn === header.value">
                  {{ sortDirection === "asc" ? "↑" : "↓" }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="cliente in filteredClientes" :key="cliente.id">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ cliente.nome }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ cliente.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ cliente.telefone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatDate(cliente.ultimaCompra) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatCurrency(cliente.totalCompras) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button
                  @click="router.push(`/clientes/${cliente.id}`)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Detalhes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useClientesStore } from "../../stores/clientes";
import Button from "../../components/ui/Button.vue";
import Card from "../../components/ui/Card.vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const router = useRouter();
const store = useClientesStore();

// Estado
const searchTerm = ref("");
const sortColumn = ref("nome");
const sortDirection = ref("asc");

// Dados mockados para exemplo
const totalClientes = ref(150);
const clientesAtivos = ref(120);
const ticketMedio = ref(1250.5);

const tableHeaders = [
  { text: "Nome", value: "nome" },
  { text: "Email", value: "email" },
  { text: "Telefone", value: "telefone" },
  { text: "Última Compra", value: "ultimaCompra" },
  { text: "Total em Compras", value: "totalCompras" },
  { text: "Ações", value: "actions" },
];

// Dados do gráfico
const chartData = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Novos Clientes",
      data: [30, 45, 60, 70, 85, 100],
      borderColor: "#3B82F6",
      tension: 0.1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

// Métodos
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

const sortBy = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
};

const refreshData = async () => {
  await store.fetchClientes();
};

const exportData = () => {
  // Implementar lógica de exportação
  console.log("Exportando dados...");
};

// Computed
const filteredClientes = computed(() => {
  let clientes = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(11) 99999-9999",
      ultimaCompra: "2024-01-15",
      totalCompras: 5000.0,
    },
    // Adicionar mais clientes mockados aqui
  ];

  if (searchTerm.value) {
    clientes = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  return clientes.sort((a, b) => {
    const modifier = sortDirection.value === "asc" ? 1 : -1;
    if (a[sortColumn.value] < b[sortColumn.value]) return -1 * modifier;
    if (a[sortColumn.value] > b[sortColumn.value]) return 1 * modifier;
    return 0;
  });
});
</script>
