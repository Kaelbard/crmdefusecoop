<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex gap-4">
        <InputText
          v-model="searchTerm"
          placeholder="Buscar serviços..."
          class="w-64"
        />
        <Select
          v-model="filterType"
          :options="typeOptions"
          placeholder="Tipo"
          class="w-40"
        />
      </div>
      <Button variant="primary" @click="$emit('new')">Novo Serviço</Button>
    </div>

    <Table
      :headers="[
        { text: 'Nome', value: 'name' },
        { text: 'Tipo', value: 'type' },
        { text: 'Duração', value: 'duration' },
        { text: 'Preço', value: 'price' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions' },
      ]"
      :items="filteredServices"
    >
      <template #item.price="{ item }">
        {{
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.price)
        }}
      </template>

      <template #item.duration="{ item }">
        {{ item.duration }} minutos
      </template>

      <template #item.status="{ item }">
        <span
          :class="{
            'px-2 py-1 rounded-full text-sm': true,
            'bg-green-100 text-green-800': item.status === 'available',
            'bg-red-100 text-red-800': item.status === 'unavailable',
          }"
        >
          {{ item.status === "available" ? "Disponível" : "Indisponível" }}
        </span>
      </template>

      <template #item.actions="{ item }">
        <div class="flex gap-2">
          <Button variant="secondary" size="sm" @click="$emit('edit', item)">
            Editar
          </Button>
          <Button variant="danger" size="sm" @click="$emit('delete', item)">
            Excluir
          </Button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Service } from "~/types/service";
import InputText from "~/components/forms/InputText.vue";
import Select from "~/components/forms/Select.vue";
import Button from "~/components/ui/Button.vue";
import Table from "~/components/ui/Table.vue";
import type { CategoryOption } from "~/types/category";

const searchTerm = ref("");
const filterType = ref("");

const typeOptions = [
  { label: "Todos", value: "" },
  { label: "Consultoria", value: "consulting" },
  { label: "Manutenção", value: "maintenance" },
  { label: "Treinamento", value: "training" },
];

// Mock data - substituir por dados reais da API
const services = ref<Service[]>([
  {
    id: 1,
    name: "Consultoria Financeira",
    type: "consulting",
    duration: 60,
    price: 299.99,
    status: "available",
  },
  {
    id: 2,
    name: "Manutenção de Equipamentos",
    type: "maintenance",
    duration: 120,
    price: 499.99,
    status: "unavailable",
  },
]);

const filteredServices = computed(() => {
  return services.value.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const matchesType = !filterType.value || service.type === filterType.value;
    return matchesSearch && matchesType;
  });
});

defineEmits(["new", "edit", "delete"]);
</script>
