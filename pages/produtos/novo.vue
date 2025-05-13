<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Novo Produto</h1>
      <Button variant="secondary" @click="router.push('/produtos')">
        Voltar
      </Button>
    </div>

    <form @submit.prevent="salvarProduto" class="space-y-6">
      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações do Produto</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              v-model="produto.nome"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Código
            </label>
            <input
              type="text"
              v-model="produto.codigo"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Preço
            </label>
            <input
              type="number"
              v-model.number="produto.preco"
              step="0.01"
              min="0"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Estoque Inicial
            </label>
            <input
              type="number"
              v-model.number="produto.estoque"
              min="0"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              v-model="produto.categoria"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option
                v-for="categoria in categorias"
                :key="categoria"
                :value="categoria"
              >
                {{ categoria }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Fornecedor
            </label>
            <select
              v-model="produto.fornecedor"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Selecione um fornecedor</option>
              <option
                v-for="fornecedor in fornecedores"
                :key="fornecedor"
                :value="fornecedor"
              >
                {{ fornecedor }}
              </option>
            </select>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações Adicionais</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              v-model="produto.descricao"
              rows="4"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="produto.ativo"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">
              Produto Ativo
            </label>
          </div>
        </div>
      </Card>

      <div class="flex justify-end space-x-4">
        <Button type="submit" variant="primary"> Salvar Produto </Button>
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

// Mock data - substituir por dados reais da API
const categorias = ["Categoria 1", "Categoria 2", "Categoria 3"];

const fornecedores = ["Fornecedor 1", "Fornecedor 2", "Fornecedor 3"];

const produto = ref({
  nome: "",
  codigo: "",
  preco: 0,
  estoque: 0,
  categoria: "",
  fornecedor: "",
  descricao: "",
  ativo: true,
});

const salvarProduto = async () => {
  try {
    // TODO: Implementar lógica de salvamento
    console.log("Produto:", produto.value);
    router.push("/produtos");
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
  }
};
</script>
