<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nome</label>
        <InputText v-model="form.name" placeholder="Nome do produto" required />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Categoria</label>
        <Select
          v-model="form.category"
          :options="categoryOptions"
          placeholder="Selecione uma categoria"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Preço</label>
        <InputNumber
          v-model="form.price"
          placeholder="0,00"
          prefix="R$"
          :decimals="2"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Estoque</label>
        <InputNumber
          v-model="form.stock"
          placeholder="0"
          :decimals="0"
          required
        />
      </div>

      <div class="space-y-2 md:col-span-2">
        <label class="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Descrição detalhada do produto"
        ></textarea>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700"
          >Código SKU</label
        >
        <InputText v-model="form.sku" placeholder="SKU-000000" required />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700"
          >Código de Barras</label
        >
        <InputText v-model="form.barcode" placeholder="000000000000" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Peso (kg)</label>
        <InputNumber v-model="form.weight" placeholder="0,000" :decimals="3" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700"
          >Dimensões (cm)</label
        >
        <div class="grid grid-cols-3 gap-2">
          <InputNumber
            v-model="form.dimensions.length"
            placeholder="Comprimento"
            :decimals="1"
          />
          <InputNumber
            v-model="form.dimensions.width"
            placeholder="Largura"
            :decimals="1"
          />
          <InputNumber
            v-model="form.dimensions.height"
            placeholder="Altura"
            :decimals="1"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <Button type="button" variant="secondary" @click="$emit('cancel')">
        Cancelar
      </Button>
      <Button type="submit" variant="primary">
        {{ isEditing ? "Salvar" : "Criar" }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Product } from "~/types/product";
import InputText from "~/components/forms/InputText.vue";
import InputNumber from "~/components/forms/InputNumber.vue";
import Select from "~/components/forms/Select.vue";
import Button from "~/components/ui/Button.vue";
import type { CategoryOption } from "~/types/category";
const props = defineProps<{
  product?: Product;
}>();

const emit = defineEmits(["submit", "cancel"]);

const isEditing = computed(() => !!props.product);

const form = ref({
  name: "",
  category: "",
  price: 0,
  stock: 0,
  description: "",
  sku: "",
  barcode: "",
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
});

const categoryOptions = [
  { label: "Eletrônicos", value: "electronics" },
  { label: "Móveis", value: "furniture" },
  { label: "Roupas", value: "clothes" },
  { label: "Acessórios", value: "accessories" },
  { label: "Livros", value: "books" },
  { label: "Alimentos", value: "food" },
  { label: "Bebidas", value: "beverages" },
  { label: "Cosméticos", value: "cosmetics" },
  { label: "Esportes", value: "sports" },
  { label: "Outros", value: "others" },
];

const handleSubmit = () => {
  emit("submit", form.value);
};

onMounted(() => {
  if (props.product) {
    form.value = { ...props.product };
  }
});
</script>
