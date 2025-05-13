<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <Card class="p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total de Vendas</p>
          <p class="text-2xl font-semibold text-gray-900">
            {{ formatCurrency(metrics.totalSales) }}
          </p>
        </div>
        <div class="p-3 bg-blue-100 rounded-full">
          <ShoppingCartIcon class="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <ArrowUpIcon
          v-if="metrics.salesGrowth >= 0"
          class="w-4 h-4 text-green-500"
        />
        <ArrowDownIcon v-else class="w-4 h-4 text-red-500" />
        <span
          :class="metrics.salesGrowth >= 0 ? 'text-green-500' : 'text-red-500'"
          class="text-sm ml-1"
        >
          {{ formatPercentage(metrics.salesGrowth) }}
        </span>
        <span class="text-sm text-gray-500 ml-2">vs. mês anterior</span>
      </div>
    </Card>

    <Card class="p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Ticket Médio</p>
          <p class="text-2xl font-semibold text-gray-900">
            {{ formatCurrency(metrics.averageTicket) }}
          </p>
        </div>
        <div class="p-3 bg-green-100 rounded-full">
          <CurrencyDollarIcon class="w-6 h-6 text-green-600" />
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <ArrowUpIcon class="w-4 h-4 text-green-500" />
        <span class="text-sm text-green-500 ml-1">8.2%</span>
        <span class="text-sm text-gray-500 ml-2">vs. mês anterior</span>
      </div>
    </Card>

    <Card class="p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total de Clientes</p>
          <p class="text-2xl font-semibold text-gray-900">
            {{ metrics.totalCustomers }}
          </p>
        </div>
        <div class="p-3 bg-purple-100 rounded-full">
          <UsersIcon class="w-6 h-6 text-purple-600" />
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <ArrowUpIcon class="w-4 h-4 text-green-500" />
        <span class="text-sm text-green-500 ml-1">12.5%</span>
        <span class="text-sm text-gray-500 ml-2">vs. mês anterior</span>
      </div>
    </Card>

    <Card class="p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Taxa de Conversão</p>
          <p class="text-2xl font-semibold text-gray-900">3.6%</p>
        </div>
        <div class="p-3 bg-yellow-100 rounded-full">
          <ChartBarIcon class="w-6 h-6 text-yellow-600" />
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <ArrowDownIcon class="w-4 h-4 text-red-500" />
        <span class="text-sm text-red-500 ml-1">2.3%</span>
        <span class="text-sm text-gray-500 ml-2">vs. mês anterior</span>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../../stores/dashboard";
import Card from "../ui/Card.vue";
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/vue/24/outline";

const store = useDashboardStore();
const { metrics } = storeToRefs(store);

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
</script>
