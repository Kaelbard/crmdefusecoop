<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex gap-4">
        <InputText
          v-model="searchTerm"
          placeholder="Buscar produtos..."
          class="w-64"
        />
        <Select
          v-model="filterCategory"
          :options="categoryOptions"
          placeholder="Categoria"
          class="w-40"
        />
      </div>
      <Button variant="primary" @click="$emit('new')">Novo Produto</Button>
    </div>

    <Table
      :headers="[
        { text: 'Nome', value: 'name' },
        { text: 'Categoria', value: 'category' },
        { text: 'Preço', value: 'price' },
        { text: 'Estoque', value: 'stock' },
        { text: 'Ações', value: 'actions' },
      ]"
      :items="filteredProducts"
    >
      <template #item.price="{ item }">
        {{
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.price)
        }}
      </template>

      <template #item.stock="{ item }">
        <span
          :class="{
            'px-2 py-1 rounded-full text-sm': true,
            'bg-green-100 text-green-800': item.stock > 10,
            'bg-yellow-100 text-yellow-800': item.stock <= 10 && item.stock > 0,
            'bg-red-100 text-red-800': item.stock === 0,
          }"
        >
          {{ item.stock }} unidades
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
import type { Product } from "~/types/product";
import InputText from "~/components/forms/InputText.vue";
import Select from "~/components/forms/Select.vue";
import Button from "~/components/ui/Button.vue";
import Table from "~/components/ui/Table.vue";
import type { CategoryOption } from "~/types/category";
const searchTerm = ref("");
const filterCategory = ref("");

const categoryOptions = [
  { label: "Todas", value: "" },
  { label: "Eletrônicos", value: "electronics" },
  { label: "Móveis", value: "furniture" },
  { label: "Roupas", value: "clothes" },
];

// Mock data - substituir por dados reais da API
const products = ref<Product[]>([
  {
    id: 1,
    name: "Smartphone XYZ",
    category: "electronics",
    price: 1999.99,
    stock: 15,
  },
  {
    id: 2,
    name: "Sofá 3 Lugares",
    category: "furniture",
    price: 2499.99,
    stock: 5,
  },
]);

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const matchesCategory =
      !filterCategory.value || product.category === filterCategory.value;
    return matchesSearch && matchesCategory;
  });
});

defineEmits(["new", "edit", "delete"]);
</script>
