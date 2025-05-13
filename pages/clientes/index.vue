<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Clientes</h1>
      <Button variant="primary" @click="router.push('/clientes/novo')">
        Novo Cliente
      </Button>
    </div>

    <Card class="p-4">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CPF/CNPJ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Telefone
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
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
              v-for="cliente in clientes"
              :key="cliente.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ cliente.nome }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ cliente.documento }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ cliente.telefone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ cliente.email }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="router.push(`/clientes/${cliente.id}`)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Detalhes
                </button>
                <button
                  @click="excluirCliente(cliente.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Excluir
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
const clientes = ref([
  {
    id: 1,
    nome: "João Silva",
    documento: "123.456.789-00",
    telefone: "(11) 98765-4321",
    email: "joao@email.com",
  },
  // Adicionar mais clientes aqui
]);

const excluirCliente = async (id: number) => {
  if (confirm("Tem certeza que deseja excluir este cliente?")) {
    try {
      // TODO: Implementar lógica de exclusão
      console.log("Excluir cliente:", id);
      clientes.value = clientes.value.filter((cliente) => cliente.id !== id);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }
};
</script>
