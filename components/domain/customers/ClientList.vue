<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex gap-4">
        <InputText
          v-model="searchTerm"
          placeholder="Buscar clientes..."
          class="w-64"
        />
        <Select
          v-model="filterStatus"
          :options="statusOptions"
          placeholder="Status"
          class="w-40"
        />
      </div>
      <Button variant="primary" @click="$emit('new')">Novo Cliente</Button>
    </div>

    <Table
      :headers="[
        { text: 'Nome', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Telefone', value: 'phone' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions' },
      ]"
      :items="filteredClients"
    >
      <template #item.status="{ item }">
        <span
          :class="{
            'px-2 py-1 rounded-full text-sm': true,
            'bg-green-100 text-green-800': item.status === 'active',
            'bg-red-100 text-red-800': item.status === 'inactive',
          }"
        >
          {{ item.status === "active" ? "Ativo" : "Inativo" }}
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
import type { Customer } from "~/types/customer";
import InputText from "~/components/forms/InputText.vue";
import Select from "~/components/forms/Select.vue";
import Button from "~/components/ui/Button.vue";
import Table from "~/components/ui/Table.vue";
const searchTerm = ref("");
const filterStatus = ref("");

const statusOptions = [
  { label: "Todos", value: "" },
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
];

// Mock data - substituir por dados reais da API
const clients = ref<Customer[]>([
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    status: "active",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
    status: "inactive",
  },
]);

const filteredClients = computed(() => {
  return clients.value.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesStatus =
      !filterStatus.value || client.status === filterStatus.value;
    return matchesSearch && matchesStatus;
  });
});

defineEmits(["new", "edit", "delete"]);
</script>
