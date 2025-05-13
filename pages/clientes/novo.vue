<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Novo Cliente</h1>
      <Button variant="secondary" @click="router.push('/clientes')">
        Voltar
      </Button>
    </div>

    <form @submit.prevent="salvarCliente" class="space-y-6">
      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações Pessoais</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              v-model="cliente.nome"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              CPF/CNPJ
            </label>
            <input
              type="text"
              v-model="cliente.documento"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              v-model="cliente.telefone"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              v-model="cliente.email"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Endereço</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              CEP
            </label>
            <input
              type="text"
              v-model="cliente.endereco.cep"
              @blur="buscarCep"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Logradouro
            </label>
            <input
              type="text"
              v-model="cliente.endereco.logradouro"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Número
            </label>
            <input
              type="text"
              v-model="cliente.endereco.numero"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Complemento
            </label>
            <input
              type="text"
              v-model="cliente.endereco.complemento"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <input
              type="text"
              v-model="cliente.endereco.cidade"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              UF
            </label>
            <select
              v-model="cliente.endereco.uf"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Selecione</option>
              <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
            </select>
          </div>
        </div>
      </Card>

      <div class="flex justify-end space-x-4">
        <Button type="submit" variant="primary"> Salvar Cliente </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../../components/ui/Button.vue";
import Card from "../../components/ui/Card.vue";

const router = useRouter();

const ufs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const cliente = ref({
  nome: "",
  documento: "",
  telefone: "",
  email: "",
  endereco: {
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    cidade: "",
    uf: "",
  },
});

const buscarCep = async () => {
  if (cliente.value.endereco.cep.length === 8) {
    try {
      // TODO: Implementar busca de CEP
      console.log("Buscar CEP:", cliente.value.endereco.cep);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  }
};

const salvarCliente = async () => {
  try {
    // TODO: Implementar lógica de salvamento
    console.log("Cliente:", cliente.value);
    router.push("/clientes");
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
  }
};
</script>
