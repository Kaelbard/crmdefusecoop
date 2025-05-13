<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Relatório de Estoque</h1>
      <div class="flex space-x-2">
        <Button variant="secondary" @click="exportData">
          Exportar Dados
        </Button>
        <Button variant="primary" @click="refreshData"> Atualizar </Button>
      </div>
    </div>

    <!-- Métricas de Estoque -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Total de Produtos</h3>
        <p class="text-3xl font-bold text-blue-600">{{ totalProdutos }}</p>
      </Card>
      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Valor Total em Estoque</h3>
        <p class="text-3xl font-bold text-green-600">
          {{ formatCurrency(valorTotalEstoque) }}
        </p>
      </Card>
      <Card class="p-4">
        <h3 class="text-lg font-semibold mb-2">Produtos com Estoque Baixo</h3>
        <p class="text-3xl font-bold text-red-600">
          {{ produtosEstoqueBaixo }}
        </p>
      </Card>
    </div>

    <!-- Gráfico de Distribuição de Estoque -->
    <Card class="p-4">
      <h3 class="text-lg font-semibold mb-4">
        Distribuição de Estoque por Categoria
      </h3>
      <div class="h-80">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </Card>

    <!-- Tabela de Produtos -->
    <Card class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Lista de Produtos</h3>
        <div class="flex space-x-2">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Buscar produto..."
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
            <tr v-for="produto in filteredProdutos" :key="produto.id">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ produto.nome }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ produto.categoria }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ produto.quantidade }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatCurrency(produto.precoUnitario) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatCurrency(produto.valorTotal) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'px-2 py-1 rounded-full text-xs font-medium': true,
                    'bg-red-100 text-red-800':
                      produto.quantidade <= produto.estoqueMinimo,
                    'bg-green-100 text-green-800':
                      produto.quantidade > produto.estoqueMinimo,
                  }"
                >
                  {{
                    produto.quantidade <= produto.estoqueMinimo
                      ? "Baixo"
                      : "Normal"
                  }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button
                  @click="router.push(`/produtos/${produto.id}`)"
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
import { useEstoqueStore } from "../../stores/estoque";
import Button from "../../components/ui/Button.vue";
import Card from "../../components/ui/Card.vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const router = useRouter();
const store = useEstoqueStore();

// Estado
const searchTerm = ref("");
const sortColumn = ref("nome");
const sortDirection = ref("asc");

// Dados mockados para exemplo
const totalProdutos = ref(250);
const valorTotalEstoque = ref(75000.0);
const produtosEstoqueBaixo = ref(15);

const tableHeaders = [
  { text: "Nome", value: "nome" },
  { text: "Categoria", value: "categoria" },
  { text: "Quantidade", value: "quantidade" },
  { text: "Preço Unitário", value: "precoUnitario" },
  { text: "Valor Total", value: "valorTotal" },
  { text: "Status", value: "status" },
  { text: "Ações", value: "actions" },
];

// Dados do gráfico
const chartData = {
  labels: ["Eletrônicos", "Móveis", "Decoração", "Utensílios", "Outros"],
  datasets: [
    {
      data: [30, 25, 20, 15, 10],
      backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#6366F1", "#EC4899"],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "right" as const,
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

const sortBy = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
};

const refreshData = async () => {
  await store.fetchEstoque();
};

const exportData = () => {
  // Implementar lógica de exportação
  console.log("Exportando dados...");
};

// Computed
const filteredProdutos = computed(() => {
  let produtos = [
    {
      id: 1,
      nome: "Notebook Dell",
      categoria: "Eletrônicos",
      quantidade: 15,
      precoUnitario: 3500.0,
      valorTotal: 52500.0,
      estoqueMinimo: 20,
    },
    // Adicionar mais produtos mockados aqui
  ];

  if (searchTerm.value) {
    produtos = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  return produtos.sort((a, b) => {
    const modifier = sortDirection.value === "asc" ? 1 : -1;
    if (a[sortColumn.value] < b[sortColumn.value]) return -1 * modifier;
    if (a[sortColumn.value] > b[sortColumn.value]) return 1 * modifier;
    return 0;
  });
});
</script>
