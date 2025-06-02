<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Cliente</label>
        <Select
          v-model="form.customerId"
          :options="customerOptions"
          placeholder="Selecione um cliente"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Data</label>
        <InputText
          v-model="form.date"
          type="date"
          :value="new Date().toISOString().split('T')[0]"
          required
        />
      </div>
    </div>

    <!-- Produtos -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">Produtos</h3>
        <Button type="button" variant="secondary" @click="addProduct">
          Adicionar Produto
        </Button>
      </div>

      <div
        v-for="(item, index) in form.items"
        :key="index"
        class="grid grid-cols-12 gap-3 items-end border-b border-gray-200 pb-4"
      >
        <div class="col-span-4">
          <label class="block text-sm font-medium text-gray-700">Produto</label>
          <Select
            v-model="item.productId"
            :options="productOptions"
            placeholder="Selecione um produto"
            @update:model-value="updateProductPrice(index)"
            required
          />
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700"
            >Quantidade</label
          >
          <InputNumber
            v-model="item.quantity"
            placeholder="0"
            :decimals="0"
            :min="1"
            @update:model-value="updateItemTotal(index)"
            required
          />
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700"
            >Preço Unit.</label
          >
          <InputNumber
            v-model="item.price"
            placeholder="0,00"
            prefix="R$"
            :decimals="2"
            @update:model-value="updateItemTotal(index)"
            required
          />
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700"
            >Desconto</label
          >
          <InputNumber
            v-model="item.discount"
            placeholder="0,00"
            prefix="R$"
            :decimals="2"
            @update:model-value="updateItemTotal(index)"
          />
        </div>

        <div class="col-span-1">
          <label class="block text-sm font-medium text-gray-700">Total</label>
          <p class="text-sm text-gray-900 py-2">
            {{ formatCurrency(item.total) }}
          </p>
        </div>

        <div class="col-span-1">
          <Button
            type="button"
            variant="danger"
            size="sm"
            class="w-full"
            @click="removeProduct(index)"
          >
            <span class="sr-only">Remover</span>
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>

    <!-- Serviços -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">Serviços</h3>
        <Button type="button" variant="secondary" @click="addService">
          Adicionar Serviço
        </Button>
      </div>

      <div
        v-for="(service, index) in form.services"
        :key="index"
        class="grid grid-cols-12 gap-3 items-end border-b border-gray-200 pb-4"
      >
        <div class="col-span-5">
          <label class="block text-sm font-medium text-gray-700">Serviço</label>
          <Select
            v-model="service.serviceId"
            :options="serviceOptions"
            placeholder="Selecione um serviço"
            @update:model-value="updateServicePrice(index)"
            required
          />
        </div>

        <div class="col-span-3">
          <label class="block text-sm font-medium text-gray-700">Preço</label>
          <InputNumber
            v-model="service.price"
            placeholder="0,00"
            prefix="R$"
            :decimals="2"
            @update:model-value="updateServiceTotal(index)"
            required
          />
        </div>

        <div class="col-span-3">
          <label class="block text-sm font-medium text-gray-700"
            >Desconto</label
          >
          <InputNumber
            v-model="service.discount"
            placeholder="0,00"
            prefix="R$"
            :decimals="2"
            @update:model-value="updateServiceTotal(index)"
          />
        </div>

        <div class="col-span-1">
          <Button
            type="button"
            variant="danger"
            size="sm"
            class="w-full"
            @click="removeService(index)"
          >
            <span class="sr-only">Remover</span>
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>

    <!-- Totais -->
    <div class="bg-gray-50 p-4 rounded-lg space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-gray-500">Subtotal:</span>
        <span class="text-gray-900">{{ formatCurrency(subtotal) }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-500">Descontos:</span>
        <span class="text-gray-900">-{{ formatCurrency(totalDiscounts) }}</span>
      </div>
      <div class="flex justify-between text-base font-medium">
        <span class="text-gray-900">Total:</span>
        <span class="text-gray-900">{{ formatCurrency(total) }}</span>
      </div>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Observações</label>
      <textarea
        v-model="form.notes"
        rows="3"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        placeholder="Observações adicionais"
      ></textarea>
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
import type { Sale } from "~/types/sale";
import Select from "~/components/forms/Select.vue";
import InputText from "~/components/forms/InputText.vue";
import InputNumber from "~/components/forms/InputNumber.vue";
import Button from "~/components/ui/Button.vue"; 
import Table from "~/components/ui/Table.vue";

const props = defineProps<{
  sale?: Sale;
}>();

const emit = defineEmits(["submit", "cancel"]);

const isEditing = computed(() => !!props.sale);

const form = ref({
  customerId: "",
  date: new Date().toISOString().split("T")[0],
  items: [] as any[],
  services: [] as any[],
  notes: "",
});

// Mock data - substituir por dados reais da API
const customerOptions = [
  { label: "João Silva", value: "1" },
  { label: "Maria Santos", value: "2" },
];

const productOptions = [
  { label: "Produto 1", value: "1", price: 99.99 },
  { label: "Produto 2", value: "2", price: 149.99 },
];

const serviceOptions = [
  { label: "Serviço 1", value: "1", price: 199.99 },
  { label: "Serviço 2", value: "2", price: 299.99 },
];

const addProduct = () => {
  form.value.items.push({
    productId: "",
    quantity: 1,
    price: 0,
    discount: 0,
    total: 0,
  });
};

const removeProduct = (index: number) => {
  form.value.items.splice(index, 1);
};

const addService = () => {
  form.value.services.push({
    serviceId: "",
    price: 0,
    discount: 0,
    total: 0,
  });
};

const removeService = (index: number) => {
  form.value.services.splice(index, 1);
};

const updateProductPrice = (index: number) => {
  const item = form.value.items[index];
  const product = productOptions.find((p) => p.value === item.productId);
  if (product) {
    item.price = product.price;
    updateItemTotal(index);
  }
};

const updateServicePrice = (index: number) => {
  const service = form.value.services[index];
  const serviceOption = serviceOptions.find(
    (s) => s.value === service.serviceId
  );
  if (serviceOption) {
    service.price = serviceOption.price;
    updateServiceTotal(index);
  }
};

const updateItemTotal = (index: number) => {
  const item = form.value.items[index];
  item.total = item.quantity * item.price - (item.discount || 0);
};

const updateServiceTotal = (index: number) => {
  const service = form.value.services[index];
  service.total = service.price - (service.discount || 0);
};

const subtotal = computed(() => {
  const itemsTotal = form.value.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const servicesTotal = form.value.services.reduce(
    (sum, service) => sum + service.price,
    0
  );
  return itemsTotal + servicesTotal;
});

const totalDiscounts = computed(() => {
  const itemDiscounts = form.value.items.reduce(
    (sum, item) => sum + (item.discount || 0),
    0
  );
  const serviceDiscounts = form.value.services.reduce(
    (sum, service) => sum + (service.discount || 0),
    0
  );
  return itemDiscounts + serviceDiscounts;
});

const total = computed(() => subtotal.value - totalDiscounts.value);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const handleSubmit = () => {
  emit("submit", {
    ...form.value,
    subtotal: subtotal.value,
    totalDiscounts: totalDiscounts.value,
    total: total.value,
  });
};

onMounted(() => {
  if (props.sale) {
    form.value = { ...props.sale };
  }
});
</script>
