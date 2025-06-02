<!-- components/domain/products/ProductCard.vue -->
<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
  >
    <!-- Imagem do produto (placeholder) -->
    <div class="h-48 bg-gray-200 flex items-center justify-center">
      <svg
        class="h-16 w-16 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    </div>

    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-medium text-gray-900 truncate">
            {{ product.name }}
          </h3>
          <p class="text-sm text-gray-500 truncate">{{ product.category }}</p>
          <p class="text-sm text-gray-500">SKU: {{ product.sku }}</p>
        </div>

        <!-- Status do estoque -->
        <div class="flex-shrink-0">
          <span
            :class="{
              'bg-green-100 text-green-800': product.stock > 10,
              'bg-yellow-100 text-yellow-800':
                product.stock <= 10 && product.stock > 0,
              'bg-red-100 text-red-800': product.stock === 0,
            }"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          >
            {{ product.stock }} unidades
          </span>
        </div>
      </div>

      <!-- Preço -->
      <div class="mb-4">
        <span class="text-2xl font-bold text-gray-900">
          {{ formatCurrency(product.price) }}
        </span>
      </div>

      <!-- Descrição -->
      <p
        v-if="product.description"
        class="text-sm text-gray-600 mb-4 line-clamp-2"
      >
        {{ product.description }}
      </p>

      <!-- Informações adicionais -->
      <div class="grid grid-cols-2 gap-4 text-sm mb-6">
        <div v-if="product.weight">
          <span class="text-gray-500">Peso:</span>
          <p class="font-medium text-gray-900">{{ product.weight }}kg</p>
        </div>
        <div v-if="product.barcode">
          <span class="text-gray-500">Código de Barras:</span>
          <p class="font-medium text-gray-900 truncate">
            {{ product.barcode }}
          </p>
        </div>
      </div>

      <!-- Ações -->
      <div class="flex justify-between space-x-3">
        <Button variant="secondary" size="sm" @click="$emit('edit', product)">
          Editar
        </Button>
        <Button variant="primary" size="sm" @click="$emit('view', product)">
          Ver Detalhes
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";
import Button from "~/components/ui/Button.vue";

interface Props {
  product: Product;
}

defineProps<Props>();
defineEmits(["edit", "view", "delete"]);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
</script>
