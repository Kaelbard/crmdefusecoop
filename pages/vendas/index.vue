<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Vendas</h1>
      <NuxtLink to="/vendas/nova">
        <Button variant="primary">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          Nova Venda
        </Button>
      </NuxtLink>
    </div>

    <!-- Filtros e busca -->
    <Card class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <InputText
            v-model="filters.search"
            placeholder="Buscar por código, cliente..."
            @input="handleSearch"
          >
            <template #leftIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
          </InputText>
        </div>
        <div>
          <InputText
            type="date"
            v-model="filters.startDate"
            label="Data Inicial"
            @input="handleSearch"
          />
        </div>
        <div>
          <InputText
            type="date"
            v-model="filters.endDate"
            label="Data Final"
            @input="handleSearch"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Status</label
          >
          <select
            v-model="filters.status"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            @change="handleSearch"
          >
            <option value="">Todos</option>
            <option value="concluida">Concluída</option>
            <option value="pendente">Pendente</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Tabela de vendas -->
    <Card>
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <div v-else-if="sales.length === 0" class="text-center py-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4m8 4V8m0 12a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          Nenhuma venda encontrada
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Comece criando uma nova venda para sua empresa.
        </p>
        <div class="mt-6">
          <NuxtLink to="/vendas/nova">
            <Button variant="primary">
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              Nova Venda
            </Button>
          </NuxtLink>
        </div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Código
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cliente
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="sale in sales" :key="sale.id" class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ sale.code }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(sale.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ sale.customer.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ sale.customer.email }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(sale.total) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(sale.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ getStatusText(sale.status) }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <NuxtLink
                  :to="`/vendas/${sale.id}`"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Detalhes
                </NuxtLink>
                <button
                  @click="printSale(sale)"
                  class="text-gray-600 hover:text-gray-900 mr-3"
                >
                  Imprimir
                </button>
                <button
                  v-if="sale.status !== 'cancelada'"
                  @click="cancelSale(sale)"
                  class="text-red-600 hover:text-red-900"
                >
                  Cancelar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginação -->
      <div
        v-if="sales.length > 0"
        class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentPage > 1 ? currentPage-- : null"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            Anterior
          </button>
          <button
            @click="currentPage < totalPages ? currentPage++ : null"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            :class="{
              'opacity-50 cursor-not-allowed': currentPage === totalPages,
            }"
          >
            Próximo
          </button>
        </div>
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700">
              Mostrando
              <span class="font-medium">{{
                (currentPage - 1) * pageSize + 1
              }}</span>
              a
              <span class="font-medium">{{
                Math.min(currentPage * pageSize, totalItems)
              }}</span>
              de
              <span class="font-medium">{{ totalItems }}</span>
              resultados
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="currentPage > 1 ? currentPage-- : null"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                <span class="sr-only">Anterior</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div v-for="page in displayedPages" :key="page">
                <button
                  v-if="page !== '...'"
                  @click="currentPage = page"
                  :class="[
                    page === currentPage
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  ]"
                >
                  {{ page }}
                </button>
                <span
                  v-else
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              </div>
              <button
                @click="currentPage < totalPages ? currentPage++ : null"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{
                  'opacity-50 cursor-not-allowed': currentPage === totalPages,
                }"
              >
                <span class="sr-only">Próximo</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useSalesStore } from "~/store/sales";
import { Sale } from "~/types/sale";
import { formatters } from "~/types/common";
import { useNotification } from "~/composables/useNotification";

// Definir middleware de autenticação
definePageMeta({
  middleware: ["auth"],
  meta: {
    requiredPermission: "sales:view",
  },
});

// Composables e stores
const salesStore = useSalesStore();
const notification = useNotification();

// Estado
const isLoading = ref(true);
const sales = ref<Sale[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const totalPages = ref(1);
const filters = ref({
  search: "",
  startDate: "",
  endDate: "",
  status: "",
});

// Computed
const displayedPages = computed(() => {
  const pages = [];
  const maxPages = 5;

  if (totalPages.value <= maxPages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Sempre mostrar a primeira página
    pages.push(1);

    // Calcular a faixa de páginas a exibir
    let startPage = Math.max(2, currentPage.value - 1);
    let endPage = Math.min(totalPages.value - 1, startPage + 2);

    // Ajustar se estiver muito próximo do final
    if (endPage - startPage < 2) {
      startPage = Math.max(2, endPage - 2);
    }

    // Adicionar elipses se necessário
    if (startPage > 2) {
      pages.push("...");
    }

    // Adicionar páginas intermediárias
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Adicionar elipses se necessário
    if (endPage < totalPages.value - 1) {
      pages.push("...");
    }

    // Sempre mostrar a última página
    pages.push(totalPages.value);
  }

  return pages;
});

// Métodos
const fetchSales = async () => {
  isLoading.value = true;
  try {
    // Em um cenário real, chamaria a API
    // const response = await salesStore.fetchSales({
    //   page: currentPage.value,
    //   limit: pageSize.value,
    //   ...filters.value
    // });

    // Mock de dados para desenvolvimento
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dados simulados
    const mockSales = [
      {
        id: "1",
        code: "VND-001",
        date: "2025-04-21",
        customer: { id: "1", name: "João Silva", email: "joao@email.com" },
        items: [
          {
            id: "1",
            product: { id: "1", name: "Notebook Dell XPS" },
            quantity: 1,
            price: 7500,
            total: 7500,
          },
        ],
        subtotal: 7500,
        discount: 0,
        total: 7500,
        status: "concluida",
        paymentMethod: "credit_card",
        createdAt: "2025-04-21T10:30:00",
        updatedAt: "2025-04-21T10:30:00",
      },
      {
        id: "2",
        code: "VND-002",
        date: "2025-04-20",
        customer: { id: "2", name: "Maria Oliveira", email: "maria@email.com" },
        items: [
          {
            id: "2",
            product: { id: "2", name: "Mouse Wireless" },
            quantity: 2,
            price: 120,
            total: 240,
          },
        ],
        subtotal: 240,
        discount: 10,
        total: 230,
        status: "concluida",
        paymentMethod: "money",
        createdAt: "2025-04-20T14:15:00",
        updatedAt: "2025-04-20T14:15:00",
      },
      {
        id: "3",
        code: "VND-003",
        date: "2025-04-19",
        customer: { id: "3", name: "Pedro Santos", email: "pedro@email.com" },
        items: [
          {
            id: "3",
            product: { id: "3", name: "Monitor Ultrawide" },
            quantity: 1,
            price: 2300,
            total: 2300,
          },
          {
            id: "4",
            product: { id: "4", name: "Teclado Mecânico" },
            quantity: 1,
            price: 350,
            total: 350,
          },
        ],
        subtotal: 2650,
        discount: 150,
        total: 2500,
        status: "pendente",
        paymentMethod: "bank_transfer",
        createdAt: "2025-04-19T09:45:00",
        updatedAt: "2025-04-19T09:45:00",
      },
      {
        id: "4",
        code: "VND-004",
        date: "2025-04-18",
        customer: { id: "4", name: "Ana Ferreira", email: "ana@email.com" },
        items: [
          {
            id: "5",
            product: { id: "5", name: "Headset Gamer" },
            quantity: 1,
            price: 420,
            total: 420,
          },
        ],
        subtotal: 420,
        discount: 0,
        total: 420,
        status: "cancelada",
        paymentMethod: "credit_card",
        createdAt: "2025-04-18T16:20:00",
        updatedAt: "2025-04-18T17:30:00",
      },
      {
        id: "5",
        code: "VND-005",
        date: "2025-04-17",
        customer: { id: "5", name: "Carlos Mendes", email: "carlos@email.com" },
        items: [
          {
            id: "6",
            product: { id: "6", name: "SSD 1TB" },
            quantity: 1,
            price: 580,
            total: 580,
          },
          {
            id: "7",
            product: { id: "7", name: "Memória RAM 16GB" },
            quantity: 2,
            price: 350,
            total: 700,
          },
        ],
        subtotal: 1280,
        discount: 80,
        total: 1200,
        status: "concluida",
        paymentMethod: "pix",
        createdAt: "2025-04-17T11:10:00",
        updatedAt: "2025-04-17T11:10:00",
      },
    ];

    // Filtrar dados de acordo com os filtros
    let filteredSales = [...mockSales];

    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase();
      filteredSales = filteredSales.filter(
        (sale) =>
          sale.code.toLowerCase().includes(searchLower) ||
          sale.customer.name.toLowerCase().includes(searchLower) ||
          sale.customer.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.value.startDate) {
      filteredSales = filteredSales.filter(
        (sale) => new Date(sale.date) >= new Date(filters.value.startDate)
      );
    }

    if (filters.value.endDate) {
      filteredSales = filteredSales.filter(
        (sale) => new Date(sale.date) <= new Date(filters.value.endDate)
      );
    }

    if (filters.value.status) {
      filteredSales = filteredSales.filter(
        (sale) => sale.status === filters.value.status
      );
    }

    totalItems.value = filteredSales.length;
    totalPages.value = Math.ceil(totalItems.value / pageSize.value);

    // Paginar os resultados
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    sales.value = filteredSales.slice(start, end);
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    notification.error("Erro ao carregar as vendas");
  } finally {
    isLoading.value = false;
  }
};

// Métodos de formatação e utilitários
const formatDate = (dateString: string): string => {
  return formatters.date(dateString);
};

const formatCurrency = (value: number): string => {
  return formatters.currency(value);
};

const getStatusClass = (status: string): string => {
  switch (status) {
    case "concluida":
      return "bg-green-100 text-green-800";
    case "pendente":
      return "bg-yellow-100 text-yellow-800";
    case "cancelada":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case "concluida":
      return "Concluída";
    case "pendente":
      return "Pendente";
    case "cancelada":
      return "Cancelada";
    default:
      return status;
  }
};

// Métodos de ação
const handleSearch = debounce(() => {
  currentPage.value = 1;
  fetchSales();
}, 300);

const printSale = (sale: Sale) => {
  notification.info(`Imprimindo venda ${sale.code}...`);
  // Em um cenário real, implementaria a lógica de impressão
};

const cancelSale = async (sale: Sale) => {
  try {
    if (confirm(`Tem certeza que deseja cancelar a venda ${sale.code}?`)) {
      // Em um cenário real, chamaria a API
      // await salesStore.cancelSale(sale.id);

      // Simulação
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Atualizar o status na lista
      const index = sales.value.findIndex((s) => s.id === sale.id);
      if (index !== -1) {
        sales.value[index].status = "cancelada";
      }

      notification.success(`Venda ${sale.code} cancelada com sucesso`);
    }
  } catch (error) {
    console.error("Erro ao cancelar venda:", error);
    notification.error("Erro ao cancelar a venda");
  }
};

// Watch para atualizar dados quando a página mudar
watch(currentPage, () => {
  fetchSales();
});

// Função de debounce para evitar muitas chamadas
function debounce(fn: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Carregar dados iniciais
onMounted(() => {
  fetchSales();
});
</script>
