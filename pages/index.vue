<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <Button variant="primary" @click="refreshDashboard">
        Atualizar Dados
      </Button>
    </div>

    <!-- Resumo de Métricas -->
    <MetricsSummary />

    <!-- Gráfico de Vendas -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <SalesChart />
      </div>
      <div class="lg:col-span-1">
        <RecentSales />
      </div>
    </div>

    <!-- Produtos Mais Vendidos -->
    <ProductsTable />
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from "../stores/dashboard";
import Button from "../components/ui/Button.vue";
import MetricsSummary from "../components/dashboard/MetricsSummary.vue";
import SalesChart from "../components/dashboard/SalesChart.vue";
import RecentSales from "../components/dashboard/RecentSales.vue";
import ProductsTable from "../components/dashboard/ProductsTable.vue";

const store = useDashboardStore();

const refreshDashboard = async () => {
  await store.refreshAll();
};
</script>
