<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Nome</label>
        <InputText v-model="form.name" placeholder="Nome completo" required />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <InputText
          v-model="form.email"
          type="email"
          placeholder="email@exemplo.com"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Telefone</label>
        <InputText
          v-model="form.phone"
          placeholder="(00) 00000-0000"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">CPF/CNPJ</label>
        <InputText
          v-model="form.document"
          placeholder="000.000.000-00"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">CEP</label>
        <InputText
          v-model="form.zipCode"
          placeholder="00000-000"
          @blur="searchAddress"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Endereço</label>
        <InputText v-model="form.address" placeholder="Rua, número" required />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Bairro</label>
        <InputText v-model="form.neighborhood" placeholder="Bairro" required />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Cidade</label>
        <InputText v-model="form.city" placeholder="Cidade" required />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Estado</label>
        <Select
          v-model="form.state"
          :options="stateOptions"
          placeholder="Selecione um estado"
          required
        />
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
import { ref, onMounted } from "vue";
import type { Customer } from "~/types/customer";
import Select from "~/components/forms/Select.vue";
import InputText from "~/components/forms/InputText.vue";
import Button from "~/components/ui/Button.vue";
import Table from "~/components/ui/Table.vue";
const props = defineProps<{
  customer?: Customer;
}>();

const emit = defineEmits(["submit", "cancel"]);

const isEditing = computed(() => !!props.customer);

const form = ref({
  name: "",
  email: "",
  phone: "",
  document: "",
  zipCode: "",
  address: "",
  neighborhood: "",
  city: "",
  state: "",
  status: "active",
});

const stateOptions = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
];

const statusOptions = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
];

const searchAddress = async () => {
  if (form.value.zipCode.length === 8) {
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${form.value.zipCode}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        form.value.address = data.logradouro;
        form.value.neighborhood = data.bairro;
        form.value.city = data.localidade;
        form.value.state = data.uf;
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  }
};

const handleSubmit = () => {
  emit("submit", form.value);
};

onMounted(() => {
  if (props.customer) {
    form.value = { ...props.customer };
  }
});
</script>
