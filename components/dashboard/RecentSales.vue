<template>
  <Card class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Vendas Recentes</h3>
      <Button variant="secondary" size="sm" @click="refreshData">
        Atualizar
      </Button>
    </div>

    <div class="space-y-4">
      <div
        v-for="sale in recentSales"
        :key="sale.id"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div
              class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
            >
              <span class="text-blue-600 font-semibold">{{
                getInitials(sale.customerName)
              }}</span>
            </div>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">
              {{ sale.customerName }}
            </div>
            <div class="text-sm text-gray-500">{{ formatDate(sale.date) }}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-medium text-gray-900">
            {{ formatCurrency(sale.total) }}
          </div>
          <div class="text-sm text-gray-500">{{ sale.items }} itens</div>
        </div>
      </div>
    </div>

    <div class="mt-4 text-center">
      <Button variant="link" @click="viewAllSales">Ver todas as vendas</Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../../stores/dashboard";
import Card from "../ui/Card.vue";
import Button from "../ui/Button.vue";

const store = useDashboardStore();
const { recentSales } = storeToRefs(store);

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const refreshData = async () => {
  await store.refreshRecentSales();
};

const viewAllSales = () => {
  // Aqui virá a lógica para navegar para a página de todas as vendas
};
</script>
