<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Data
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Cliente
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Valor
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Status
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Ações
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="sale in sales" :key="sale.id" class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ formatDate(sale.date) }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">
            {{ sale.customer }}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ sale.amount }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            :class="getStatusClass(sale.status)"
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
          >
            {{ sale.status }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <NuxtLink
            :to="`/vendas/${sale.id}`"
            class="text-blue-600 hover:text-blue-900 mr-3"
          >
            Detalhes
          </NuxtLink>
        </td>
      </tr>

      <!-- Se não houver vendas -->
      <tr v-if="sales.length === 0">
        <td
          colspan="5"
          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
        >
          Nenhuma venda recente encontrada.
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface Sale {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: string;
}

// Props para receber as vendas
const props = defineProps<{
  sales: Sale[];
}>();

// Função para formatar a data
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

// Função para obter a classe CSS com base no status
const getStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case "concluída":
      return "bg-green-100 text-green-800";
    case "pendente":
      return "bg-yellow-100 text-yellow-800";
    case "cancelada":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>
