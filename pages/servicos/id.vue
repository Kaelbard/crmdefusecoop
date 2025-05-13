<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Detalhes do Serviço</h1>
      <div class="space-x-3">
        <Button variant="secondary" @click="router.push('/servicos')">
          Voltar
        </Button>
        <Button variant="primary" @click="editarServico"> Editar </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações do Serviço</h2>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Nome:</span>
            <span class="font-medium">{{ servico.nome }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Código:</span>
            <span class="font-medium">{{ servico.codigo }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Preço:</span>
            <span class="font-medium">{{ formatCurrency(servico.preco) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Duração:</span>
            <span class="font-medium">{{ servico.duracao }} minutos</span>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações Adicionais</h2>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Categoria:</span>
            <span class="font-medium">{{ servico.categoria }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Responsável:</span>
            <span class="font-medium">{{ servico.responsavel }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Última Atualização:</span>
            <span class="font-medium">{{
              formatDate(servico.ultimaAtualizacao)
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Status:</span>
            <span
              :class="{
                'px-2 py-1 text-xs font-medium rounded-full': true,
                'bg-green-100 text-green-800': servico.ativo,
                'bg-red-100 text-red-800': !servico.ativo,
              }"
            >
              {{ servico.ativo ? "Ativo" : "Inativo" }}
            </span>
          </div>
        </div>
      </Card>
    </div>

    <Card class="p-4">
      <h2 class="text-lg font-semibold mb-4">Histórico de Atendimentos</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cliente
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Responsável
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Valor
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
              v-for="atendimento in servico.atendimentos"
              :key="atendimento.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(atendimento.data) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ atendimento.cliente }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ atendimento.responsavel }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(atendimento.valor) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="router.push(`/vendas/${atendimento.vendaId}`)"
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
const servico = ref({
  id: 1,
  nome: "Serviço 1",
  codigo: "S001",
  preco: 150.0,
  duracao: 60,
  categoria: "Categoria 1",
  responsavel: "João Silva",
  ultimaAtualizacao: new Date(),
  ativo: true,
  atendimentos: [
    {
      id: 1,
      vendaId: 1,
      data: new Date(),
      cliente: "Maria Santos",
      responsavel: "João Silva",
      valor: 150.0,
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

const editarServico = () => {
  // TODO: Implementar lógica de edição
  console.log("Editar serviço:", servico.value);
};
</script>
