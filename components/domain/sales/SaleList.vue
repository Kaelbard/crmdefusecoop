<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex gap-4">
        <InputText
          v-model="searchTerm"
          placeholder="Buscar vendas..."
          class="w-64"
        />
        <Select
          v-model="filterStatus"
          :options="statusOptions"
          placeholder="Status"
          class="w-40"
        />
      </div>
      <Button variant="primary" @click="$emit('new')">Nova Venda</Button>
    </div>

    <Table
      :headers="[
        { text: 'Código', value: 'code' },
        { text: 'Cliente', value: 'customer' },
        { text: 'Data', value: 'date' },
        { text: 'Total', value: 'total' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions' },
      ]"
      :items="filteredSales"
    >
      <template #item.date="{ item }">
        {{ new Date(item.date).toLocaleDateString("pt-BR") }}
      </template>

      <template #item.total="{ item }">
        {{
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.total)
        }}
      </template>

      <template #item.status="{ item }">
        <span
          :class="{
            'px-2 py-1 rounded-full text-sm': true,
            'bg-green-100 text-green-800': item.status === 'completed',
            'bg-yellow-100 text-yellow-800': item.status === 'pending',
            'bg-red-100 text-red-800': item.status === 'cancelled',
          }"
        >
          {{
            item.status === "completed"
              ? "Concluída"
              : item.status === "pending"
              ? "Pendente"
              : "Cancelada"
          }}
        </span>
      </template>

      <template #item.actions="{ item }">
        <div class="flex gap-2">
          <Button variant="secondary" size="sm" @click="$emit('view', item)">
            Visualizar
          </Button>
          <Button
            v-if="item.status === 'pending'"
            variant="success"
            size="sm"
            @click="$emit('complete', item)"
          >
            Concluir
          </Button>
          <Button
            v-if="item.status === 'pending'"
            variant="danger"
            size="sm"
            @click="$emit('cancel', item)"
          >
            Cancelar
          </Button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Sale } from "~/types/sale";
import InputText from "~/components/forms/InputText.vue";
import Select from "~/components/forms/Select.vue";
import Button from "~/components/ui/Button.vue";
import type { SaleStatus } from "~/types/sale";

const searchTerm = ref("");
const filterStatus = ref("");

const statusOptions = [
  { label: "Todos", value: "" },
  { label: "Concluída", value: "completed" },
  { label: "Pendente", value: "pending" },
  { label: "Cancelada", value: "cancelled" },
];

// Mock data - substituir por dados reais da API
const sales = ref<Sale[]>([
  {
    id: 1,
    code: "VDA-001",
    customer: "João Silva",
    date: "2024-02-20",
    total: 2499.99,
    status: "completed",
  },
  {
    id: 2,
    code: "VDA-002",
    customer: "Maria Santos",
    date: "2024-02-21",
    total: 1999.99,
    status: "pending",
  },
]);

const filteredSales = computed(() => {
  return sales.value.filter((sale) => {
    const matchesSearch =
      sale.code.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesStatus =
      !filterStatus.value || sale.status === filterStatus.value;
    return matchesSearch && matchesStatus;
  });
});

defineEmits(["new", "view", "complete", "cancel"]);
</script>
