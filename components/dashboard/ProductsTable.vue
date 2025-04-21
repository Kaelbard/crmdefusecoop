<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Produto
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Preço
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Estoque
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Vendas
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
      <tr
        v-for="product in products"
        :key="product.id"
        class="hover:bg-gray-50"
      >
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">
            {{ product.name }}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ product.price }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            :class="getStockClass(product.stock)"
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
          >
            {{ product.stock }} unidades
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ product.salesCount }} vendas
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <NuxtLink
            :to="`/produtos/${product.id}`"
            class="text-blue-600 hover:text-blue-900 mr-3"
          >
            Detalhes
          </NuxtLink>
        </td>
      </tr>

      <!-- Se não houver produtos -->
      <tr v-if="products.length === 0">
        <td
          colspan="5"
          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
        >
          Nenhum produto encontrado.
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
  salesCount: number;
}

// Props para receber os produtos
const props = defineProps<{
  products: Product[];
}>();

// Função para obter a classe CSS com base no estoque
const getStockClass = (stock: number): string => {
  if (stock <= 5) {
    return "bg-red-100 text-red-800";
  } else if (stock <= 15) {
    return "bg-yellow-100 text-yellow-800";
  } else {
    return "bg-green-100 text-green-800";
  }
};
</script>
