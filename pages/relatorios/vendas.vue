<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Relatório de Vendas</h1>
      <div class="flex space-x-3">
        <Button variant="secondary" @click="gerarPDF"> Exportar PDF </Button>
        <Button variant="primary" @click="atualizarDados"> Atualizar </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Total de Vendas</h3>
        <p class="text-3xl font-bold text-gray-900">
          {{ formatCurrency(totalVendas) }}
        </p>
        <p class="text-sm text-gray-500 mt-1">Últimos 30 dias</p>
      </Card>

      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Média por Venda</h3>
        <p class="text-3xl font-bold text-gray-900">
          {{ formatCurrency(mediaVendas) }}
        </p>
        <p class="text-sm text-gray-500 mt-1">Últimos 30 dias</p>
      </Card>

      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Total de Vendas</h3>
        <p class="text-3xl font-bold text-gray-900">{{ totalTransacoes }}</p>
        <p class="text-sm text-gray-500 mt-1">Últimos 30 dias</p>
      </Card>
    </div>

    <Card class="p-4">
      <h2 class="text-lg font-semibold mb-4">Vendas por Período</h2>
      <div class="h-80">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </Card>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Top Produtos</h2>
        <div class="space-y-4">
          <div
            v-for="produto in topProdutos"
            :key="produto.id"
            class="flex justify-between items-center"
          >
            <div>
              <p class="font-medium text-gray-900">{{ produto.nome }}</p>
              <p class="text-sm text-gray-500">
                {{ produto.quantidade }} unidades
              </p>
            </div>
            <p class="font-medium text-gray-900">
              {{ formatCurrency(produto.total) }}
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Top Clientes</h2>
        <div class="space-y-4">
          <div
            v-for="cliente in topClientes"
            :key="cliente.id"
            class="flex justify-between items-center"
          >
            <div>
              <p class="font-medium text-gray-900">{{ cliente.nome }}</p>
              <p class="text-sm text-gray-500">{{ cliente.compras }} compras</p>
            </div>
            <p class="font-medium text-gray-900">
              {{ formatCurrency(cliente.total) }}
            </p>
          </div>
        </div>
      </Card>
    </div>

    <Card class="p-4">
      <h2 class="text-lg font-semibold mb-4">Últimas Vendas</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cliente
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Itens
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="venda in ultimasVendas"
              :key="venda.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(venda.data) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ venda.cliente }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ venda.itens }} itens
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(venda.total) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="router.push(`/vendas/${venda.id}`)"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
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

// Mock data - substituir por dados reais da API
const totalVendas = ref(150000);
const mediaVendas = ref(1500);
const totalTransacoes = ref(100);

const chartData = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Vendas",
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const topProdutos = ref([
  { id: 1, nome: "Produto 1", quantidade: 50, total: 5000 },
  { id: 2, nome: "Produto 2", quantidade: 30, total: 3000 },
  { id: 3, nome: "Produto 3", quantidade: 20, total: 2000 },
]);

const topClientes = ref([
  { id: 1, nome: "João Silva", compras: 10, total: 15000 },
  { id: 2, nome: "Maria Santos", compras: 8, total: 12000 },
  { id: 3, nome: "Pedro Oliveira", compras: 5, total: 7500 },
]);

const ultimasVendas = ref([
  {
    id: 1,
    data: new Date(),
    cliente: "João Silva",
    itens: 5,
    total: 1500,
  },
]);

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const atualizarDados = async () => {
  try {
    // TODO: Implementar lógica de atualização
    console.log("Atualizando dados...");
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
  }
};

const gerarPDF = async () => {
  try {
    // TODO: Implementar lógica de geração de PDF
    console.log("Gerando PDF...");
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
  }
};
</script>
