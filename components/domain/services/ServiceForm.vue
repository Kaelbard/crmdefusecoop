<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nome</label>
        <InputText v-model="form.name" placeholder="Nome do serviço" required />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Tipo</label>
        <Select
          v-model="form.type"
          :options="typeOptions"
          placeholder="Selecione um tipo"
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
        <label class="block text-sm font-medium text-gray-700"
          >Duração (minutos)</label
        >
        <InputNumber
          v-model="form.duration"
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
          placeholder="Descrição detalhada do serviço"
        ></textarea>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <Select
          v-model="form.status"
          :options="statusOptions"
          placeholder="Selecione um status"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700"
          >Profissional Responsável</label
        >
        <Select
          v-model="form.professional"
          :options="professionalOptions"
          placeholder="Selecione um profissional"
          required
        />
      </div>

      <div class="space-y-2 md:col-span-2">
        <label class="block text-sm font-medium text-gray-700"
          >Requisitos</label
        >
        <textarea
          v-model="form.requirements"
          rows="2"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Requisitos ou materiais necessários"
        ></textarea>
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
import type { Service } from "~/types/service";
import Select from "~/components/forms/Select.vue";
import InputText from "~/components/forms/InputText.vue";
import InputNumber from "~/components/forms/InputNumber.vue";
import Button from "~/components/ui/Button.vue";
import Table from "~/components/ui/Table.vue";

const props = defineProps<{
  service?: Service;
}>();

const emit = defineEmits(["submit", "cancel"]);

const isEditing = computed(() => !!props.service);

const form = ref({
  name: "",
  type: "",
  price: 0,
  duration: 0,
  description: "",
  status: "available",
  professional: "",
  requirements: "",
});

const typeOptions = [
  { label: "Consultoria", value: "consulting" },
  { label: "Manutenção", value: "maintenance" },
  { label: "Treinamento", value: "training" },
  { label: "Instalação", value: "installation" },
  { label: "Suporte", value: "support" },
  { label: "Desenvolvimento", value: "development" },
  { label: "Design", value: "design" },
  { label: "Outros", value: "others" },
];

const statusOptions = [
  { label: "Disponível", value: "available" },
  { label: "Indisponível", value: "unavailable" },
];

// Mock data - substituir por dados reais da API
const professionalOptions = [
  { label: "João Silva", value: "1" },
  { label: "Maria Santos", value: "2" },
  { label: "Pedro Oliveira", value: "3" },
  { label: "Ana Costa", value: "4" },
];

const handleSubmit = () => {
  emit("submit", form.value);
};

onMounted(() => {
  if (props.service) {
    form.value = { ...props.service };
  }
});
</script>
