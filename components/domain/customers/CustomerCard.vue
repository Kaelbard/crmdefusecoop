<!-- components/domain/services/ServiceCard.vue -->
<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-medium text-gray-900 truncate">
          {{ service.name }}
        </h3>
        <p class="text-sm text-gray-500 capitalize">
          {{ getServiceTypeText(service.type) }}
        </p>
        <p v-if="service.professional" class="text-sm text-gray-500">
          Responsável: {{ service.professional }}
        </p>
      </div>

      <!-- Status -->
      <div class="flex-shrink-0">
        <span
          :class="{
            'bg-green-100 text-green-800': service.status === 'available',
            'bg-red-100 text-red-800': service.status === 'unavailable',
          }"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
        >
          {{ service.status === "available" ? "Disponível" : "Indisponível" }}
        </span>
      </div>
    </div>

    <!-- Preço e duração -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <span class="text-gray-500 text-sm">Preço:</span>
        <p class="text-xl font-bold text-gray-900">
          {{ formatCurrency(service.price) }}
        </p>
      </div>
      <div>
        <span class="text-gray-500 text-sm">Duração:</span>
        <p class="text-lg font-medium text-gray-900">
          {{ formatDuration(service.duration) }}
        </p>
      </div>
    </div>

    <!-- Descrição -->
    <div v-if="service.description" class="mb-4">
      <p class="text-sm text-gray-600 line-clamp-3">
        {{ service.description }}
      </p>
    </div>

    <!-- Requisitos -->
    <div
      v-if="service.requirements && service.requirements.length > 0"
      class="mb-6"
    >
      <h4 class="text-sm font-medium text-gray-700 mb-2">Requisitos:</h4>
      <ul class="text-sm text-gray-600 space-y-1">
        <li
          v-for="requirement in service.requirements"
          :key="requirement"
          class="flex items-start"
        >
          <svg
            class="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4"
            />
          </svg>
          {{ requirement }}
        </li>
      </ul>
    </div>

    <!-- Ações -->
    <div class="flex justify-between space-x-3">
      <Button variant="secondary" size="sm" @click="$emit('edit', service)">
        Editar
      </Button>
      <Button variant="primary" size="sm" @click="$emit('view', service)">
        Ver Detalhes
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from "~/types/service";
import Button from "~/components/ui/Button.vue";

interface Props {
  service: Service;
}

defineProps<Props>();
defineEmits(["edit", "view", "delete"]);

const getServiceTypeText = (type: string) => {
  const typeMap = {
    consulting: "Consultoria",
    maintenance: "Manutenção",
    training: "Treinamento",
    installation: "Instalação",
    support: "Suporte",
    development: "Desenvolvimento",
    design: "Design",
    others: "Outros",
  };
  return typeMap[type] || type;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}min`
    : `${hours}h`;
};
</script>
