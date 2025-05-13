<template>
  <Card class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Produtos Mais Vendidos</h3>
      <Button variant="secondary" size="sm" @click="refreshData">
        Atualizar
      </Button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Produto
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Vendas
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Receita
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estoque
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
              <div class="flex items-center">
                <div class="text-sm font-medium text-gray-900">
                  {{ product.name }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ product.salesCount }} unidades
              </div>
              <div
                :class="[
                  'text-xs',
                  product.salesTrend > 0 ? 'text-green-600' : 'text-red-600',
                ]"
              >
                {{ formatTrend(product.salesTrend) }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ formatCurrency(product.revenue) }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm" :class="getStockStatusColor(product.stock)">
                {{ product.stock }} unidades
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../../stores/dashboard";
import Card from "../ui/Card.vue";
import Button from "../ui/Button.vue";

const store = useDashboardStore();
const { products } = storeToRefs(store);

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatTrend = (value: number): string => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}% vs. mês anterior`;
};

const getStockStatusColor = (stock: number): string => {
  if (stock <= 10) return "text-red-600";
  if (stock <= 20) return "text-yellow-600";
  return "text-green-600";
};

const refreshData = async () => {
  await store.refreshProducts();
};
</script>
