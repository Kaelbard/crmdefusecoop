<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Relatório de Vendas -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Relatório de Vendas
        </h3>
        <p class="text-gray-600 mb-4">
          Análise detalhada das vendas por período, incluindo total de vendas,
          média por venda e produtos mais vendidos.
        </p>
        <div class="space-y-3">
          <div class="flex gap-3">
            <Select
              v-model="salesPeriod"
              :options="periodOptions"
              placeholder="Período"
              class="w-full"
            />
          </div>
          <Button
            variant="primary"
            class="w-full"
            @click="$emit('generate', { type: 'sales', period: salesPeriod })"
          >
            Gerar Relatório
          </Button>
        </div>
      </div>

      <!-- Relatório de Clientes -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Relatório de Clientes
        </h3>
        <p class="text-gray-600 mb-4">
          Análise do perfil dos clientes, frequência de compras e valor médio
          gasto por cliente.
        </p>
        <div class="space-y-3">
          <div class="flex gap-3">
            <Select
              v-model="customerStatus"
              :options="statusOptions"
              placeholder="Status"
              class="w-full"
            />
          </div>
          <Button
            variant="primary"
            class="w-full"
            @click="
              $emit('generate', { type: 'customers', status: customerStatus })
            "
          >
            Gerar Relatório
          </Button>
        </div>
      </div>

      <!-- Relatório de Produtos -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Relatório de Produtos
        </h3>
        <p class="text-gray-600 mb-4">
          Análise do estoque, produtos mais vendidos e necessidade de reposição.
        </p>
        <div class="space-y-3">
          <div class="flex gap-3">
            <Select
              v-model="productCategory"
              :options="categoryOptions"
              placeholder="Categoria"
              class="w-full"
            />
          </div>
          <Button
            variant="primary"
            class="w-full"
            @click="
              $emit('generate', { type: 'products', category: productCategory })
            "
          >
            Gerar Relatório
          </Button>
        </div>
      </div>

      <!-- Relatório de Serviços -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Relatório de Serviços
        </h3>
        <p class="text-gray-600 mb-4">
          Análise dos serviços prestados, satisfação dos clientes e receita
          gerada.
        </p>
        <div class="space-y-3">
          <div class="flex gap-3">
            <Select
              v-model="serviceType"
              :options="typeOptions"
              placeholder="Tipo"
              class="w-full"
            />
          </div>
          <Button
            variant="primary"
            class="w-full"
            @click="
              $emit('generate', { type: 'services', serviceType: serviceType })
            "
          >
            Gerar Relatório
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from "~/components/forms/Select.vue";
import Button from "~/components/ui/Button.vue";
import type { ReportType } from "~/types/report";
// Define the types for the report generation parameters
interface ReportParams {
  type: ReportType;
  period?: string;
  status?: string;
  category?: string;
  serviceType?: string;
}
const salesPeriod = ref("");
const customerStatus = ref("");
const productCategory = ref("");
const serviceType = ref("");

const periodOptions = [
  { label: "Últimos 7 dias", value: "7days" },
  { label: "Últimos 30 dias", value: "30days" },
  { label: "Últimos 90 dias", value: "90days" },
  { label: "Este ano", value: "year" },
];

const statusOptions = [
  { label: "Todos os clientes", value: "all" },
  { label: "Clientes ativos", value: "active" },
  { label: "Clientes inativos", value: "inactive" },
];

const categoryOptions = [
  { label: "Todas as categorias", value: "all" },
  { label: "Eletrônicos", value: "electronics" },
  { label: "Móveis", value: "furniture" },
  { label: "Roupas", value: "clothes" },
];

const typeOptions = [
  { label: "Todos os tipos", value: "all" },
  { label: "Consultoria", value: "consulting" },
  { label: "Manutenção", value: "maintenance" },
  { label: "Treinamento", value: "training" },
];

defineEmits(["generate"]);
</script>
