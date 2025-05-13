<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Produtos</h1>
      <Button variant="primary" @click="router.push('/produtos/novo')">
        Novo Produto
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
                Código
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Preço
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estoque
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
              v-for="produto in produtos"
              :key="produto.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ produto.nome }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ produto.codigo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(produto.preco) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'px-2 py-1 text-xs font-medium rounded-full': true,
                    'bg-green-100 text-green-800': produto.estoque > 10,
                    'bg-yellow-100 text-yellow-800':
                      produto.estoque <= 10 && produto.estoque > 0,
                    'bg-red-100 text-red-800': produto.estoque === 0,
                  }"
                >
                  {{ produto.estoque }} unidades
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="router.push(`/produtos/${produto.id}`)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Detalhes
                </button>
                <button
                  @click="excluirProduto(produto.id)"
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
const produtos = ref([
  {
    id: 1,
    nome: "Produto 1",
    codigo: "P001",
    preco: 100.0,
    estoque: 15,
  },
  // Adicionar mais produtos aqui
]);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const excluirProduto = async (id: number) => {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    try {
      // TODO: Implementar lógica de exclusão
      console.log("Excluir produto:", id);
      produtos.value = produtos.value.filter((produto) => produto.id !== id);
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  }
};
</script>
