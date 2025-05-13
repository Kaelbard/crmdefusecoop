<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Nova Venda</h1>
      <Button variant="secondary" @click="router.push('/vendas')">
        Voltar
      </Button>
    </div>

    <form @submit.prevent="salvarVenda" class="space-y-6">
      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Informações do Cliente</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>
            <select
              v-model="venda.clienteId"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Selecione um cliente</option>
              <option
                v-for="cliente in clientes"
                :key="cliente.id"
                :value="cliente.id"
              >
                {{ cliente.nome }}
              </option>
            </select>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <h2 class="text-lg font-semibold mb-4">Itens da Venda</h2>
        <div class="space-y-4">
          <div
            v-for="(item, index) in venda.itens"
            :key="index"
            class="grid grid-cols-12 gap-4"
          >
            <div class="col-span-5">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Produto
              </label>
              <select
                v-model="item.produtoId"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Selecione um produto</option>
                <option
                  v-for="produto in produtos"
                  :key="produto.id"
                  :value="produto.id"
                >
                  {{ produto.nome }} - {{ formatCurrency(produto.preco) }}
                </option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Quantidade
              </label>
              <input
                type="number"
                v-model.number="item.quantidade"
                min="1"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Valor Unit.
              </label>
              <input
                type="number"
                v-model.number="item.valorUnitario"
                step="0.01"
                min="0"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Subtotal
              </label>
              <div class="mt-1 block w-full py-2 text-sm text-gray-900">
                {{ formatCurrency(item.quantidade * item.valorUnitario) }}
              </div>
            </div>
            <div class="col-span-1 flex items-end justify-end">
              <button
                type="button"
                @click="removerItem(index)"
                class="text-red-600 hover:text-red-900"
              >
                Remover
              </button>
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <Button type="button" variant="secondary" @click="adicionarItem">
              Adicionar Item
            </Button>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Total da Venda</h2>
          <span class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(totalVenda) }}
          </span>
        </div>
      </Card>

      <div class="flex justify-end space-x-4">
        <Button type="submit" variant="primary"> Finalizar Venda </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Button from "../../components/ui/Button.vue";
import Card from "../../components/ui/Card.vue";

const router = useRouter();

// Mock data - substituir por dados reais da API
const clientes = ref([
  { id: 1, nome: "João Silva" },
  { id: 2, nome: "Maria Santos" },
]);

const produtos = ref([
  { id: 1, nome: "Produto 1", preco: 100.0 },
  { id: 2, nome: "Produto 2", preco: 200.0 },
]);

const venda = ref({
  clienteId: "",
  itens: [
    {
      produtoId: "",
      quantidade: 1,
      valorUnitario: 0,
    },
  ],
});

const totalVenda = computed(() => {
  return venda.value.itens.reduce((total, item) => {
    return total + item.quantidade * item.valorUnitario;
  }, 0);
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const adicionarItem = () => {
  venda.value.itens.push({
    produtoId: "",
    quantidade: 1,
    valorUnitario: 0,
  });
};

const removerItem = (index: number) => {
  venda.value.itens.splice(index, 1);
};

const salvarVenda = async () => {
  try {
    // TODO: Implementar lógica de salvamento
    console.log("Venda:", venda.value);
    router.push("/vendas");
  } catch (error) {
    console.error("Erro ao salvar venda:", error);
  }
};
</script>
