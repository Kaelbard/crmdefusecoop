<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Detalhes do Cliente</h1>
      <div class="space-x-3">
        <Button variant="secondary" @click="router.push('/clientes')">
          Voltar
        </Button>
        <Button variant="primary" @click="editarCliente"> Editar </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações Pessoais</h2>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Nome:</span>
            <span class="font-medium">{{ cliente.nome }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">CPF/CNPJ:</span>
            <span class="font-medium">{{ cliente.documento }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Telefone:</span>
            <span class="font-medium">{{ cliente.telefone }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Email:</span>
            <span class="font-medium">{{ cliente.email }}</span>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Endereço</h2>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">CEP:</span>
            <span class="font-medium">{{ cliente.endereco.cep }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Logradouro:</span>
            <span class="font-medium">{{ cliente.endereco.logradouro }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Número:</span>
            <span class="font-medium">{{ cliente.endereco.numero }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Complemento:</span>
            <span class="font-medium">{{ cliente.endereco.complemento }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Cidade/UF:</span>
            <span class="font-medium"
              >{{ cliente.endereco.cidade }}/{{ cliente.endereco.uf }}</span
            >
          </div>
        </div>
      </Card>
    </div>

    <Card class="p-4">
      <h2 class="text-lg font-semibold mb-4">Histórico de Compras</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Código
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="venda in cliente.compras"
              :key="venda.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ venda.codigo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(venda.data) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(venda.total) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'px-2 py-1 text-xs font-medium rounded-full': true,
                    'bg-green-100 text-green-800': venda.status === 'Concluída',
                    'bg-yellow-100 text-yellow-800':
                      venda.status === 'Pendente',
                    'bg-red-100 text-red-800': venda.status === 'Cancelada',
                  }"
                >
                  {{ venda.status }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="router.push(`/vendas/${venda.id}`)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Detalhes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../../components/ui/Button.vue";
import Card from "../../components/ui/Card.vue";

const router = useRouter();

// Mock data - substituir por dados reais da API
const cliente = ref({
  id: 1,
  nome: "João Silva",
  documento: "123.456.789-00",
  telefone: "(11) 98765-4321",
  email: "joao@email.com",
  endereco: {
    cep: "12345-678",
    logradouro: "Rua Exemplo",
    numero: "123",
    complemento: "Apto 45",
    cidade: "São Paulo",
    uf: "SP",
  },
  compras: [
    {
      id: 1,
      codigo: "V001",
      data: new Date(),
      total: 1500.0,
      status: "Concluída",
    },
  ],
});

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const editarCliente = () => {
  // TODO: Implementar lógica de edição
  console.log("Editar cliente:", cliente.value);
};
</script>
