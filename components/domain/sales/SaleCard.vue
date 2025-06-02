<!-- components/domain/sales/SaleCard.vue -->
<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-medium text-gray-900">Venda {{ sale.code }}</h3>
        <p class="text-sm text-gray-500">{{ sale.customerName }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(sale.date) }}</p>
      </div>

      <!-- Status -->
      <div class="flex-shrink-0">
        <span
          :class="{
            'bg-green-100 text-green-800': sale.status === 'completed',
            'bg-yellow-100 text-yellow-800': sale.status === 'pending',
            'bg-red-100 text-red-800': sale.status === 'cancelled',
          }"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
        >
          {{ getStatusText(sale.status) }}
        </span>
      </div>
    </div>

    <!-- Resumo da venda -->
    <div class="grid grid-cols-2 gap-4 text-sm mb-4">
      <div>
        <span class="text-gray-500">Itens:</span>
        <p class="font-medium text-gray-900">
          {{ sale.items.length }} produtos
        </p>
      </div>
      <div v-if="sale.services.length > 0">
        <span class="text-gray-500">Serviços:</span>
        <p class="font-medium text-gray-900">
          {{ sale.services.length }} serviços
        </p>
      </div>
      <div>
        <span class="text-gray-500">Subtotal:</span>
        <p class="font-medium text-gray-900">
          {{ formatCurrency(sale.subtotal) }}
        </p>
      </div>
      <div v-if="sale.totalDiscounts > 0">
        <span class="text-gray-500">Desconto:</span>
        <p class="font-medium text-gray-900">
          -{{ formatCurrency(sale.totalDiscounts) }}
        </p>
      </div>
    </div>

    <!-- Total -->
    <div class="border-t border-gray-200 pt-4 mb-6">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium text-gray-900">Total:</span>
        <span class="text-2xl font-bold text-gray-900">
          {{ formatCurrency(sale.total) }}
        </span>
      </div>
    </div>

    <!-- Ações -->
    <div class="flex justify-between space-x-3">
      <div class="flex space-x-2">
        <Button
          v-if="sale.status === 'pending'"
          variant="success"
          size="sm"
          @click="$emit('complete', sale)"
        >
          Concluir
        </Button>
        <Button
          v-if="sale.status === 'pending'"
          variant="danger"
          size="sm"
          @click="$emit('cancel', sale)"
        >
          Cancelar
        </Button>
      </div>
      <Button variant="primary" size="sm" @click="$emit('view', sale)">
        Ver Detalhes
      </Button>
    </div>

    <!-- Observações -->
    <div v-if="sale.notes" class="mt-4 pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-600">
        <span class="font-medium">Observações:</span> {{ sale.notes }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sale } from "~/types/sale";
import Button from "~/components/ui/Button.vue";

interface Props {
  sale: Sale;
}

defineProps<Props>();
defineEmits(["view", "complete", "cancel"]);

const getStatusText = (status: string) => {
  const statusMap = {
    completed: "Concluída",
    pending: "Pendente",
    cancelled: "Cancelada",
  };
  return statusMap[status] || status;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};
</script>
