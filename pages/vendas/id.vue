<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Detalhes da Venda</h1>
      <div class="space-x-3">
        <Button variant="secondary" @click="router.push('/vendas')">
          Voltar
        </Button>
        <Button variant="primary" @click="imprimirVenda"> Imprimir </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações da Venda</h2>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Código:</span>
            <span class="font-medium">{{ venda.codigo }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Data:</span>
            <span class="font-medium">{{ formatDate(venda.data) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Status:</span>
            <span
              :class="{
                'px-2 py-1 text-xs font-medium rounded-full': true,
                'bg-green-100 text-green-800': venda.status === 'Concluída',
                'bg-yellow-100 text-yellow-800': venda.status === 'Pendente',
                'bg-red-100 text-red-800': venda.status === 'Cancelada',
              }"
            >
              {{ venda.status }}
            </span>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações do Cliente</h2>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Nome:</span>
            <span class="font-medium">{{ venda.cliente.nome }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">CPF/CNPJ:</span>
            <span class="font-medium">{{ venda.cliente.documento }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Telefone:</span>
            <span class="font-medium">{{ venda.cliente.telefone }}</span>
          </div>
        </div>
      </Card>
    </div>

    <Card class="p-4">
      <h2 class="text-lg font-semibold mb-4">Itens da Venda</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Produto
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantidade
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Valor Unitário
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in venda.itens"
              :key="item.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.produto }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.quantidade }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.valorUnitario) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.quantidade * item.valorUnitario) }}
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-gray-50">
            <tr>
              <td
                colspan="3"
                class="px-6 py-4 text-right text-sm font-medium text-gray-900"
              >
                Total:
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
              >
                {{ formatCurrency(venda.total) }}
              </td>
            </tr>
          </tfoot>
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
const venda = ref({
  id: 1,
  codigo: "V001",
  data: new Date(),
  status: "Concluída",
  cliente: {
    nome: "João Silva",
    documento: "123.456.789-00",
    telefone: "(11) 98765-4321",
  },
  itens: [
    {
      id: 1,
      produto: "Produto 1",
      quantidade: 2,
      valorUnitario: 750.0,
    },
  ],
  total: 1500.0,
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

const imprimirVenda = () => {
  // TODO: Implementar lógica de impressão
  console.log("Imprimir venda:", venda.value);
};
</script>
