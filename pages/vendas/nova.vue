<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Nova Venda</h1>
      <div class="flex space-x-2">
        <Button variant="outline" @click="router.push('/vendas')">
          Cancelar
        </Button>
        <Button variant="primary" :disabled="isLoading" @click="saveSale">
          <template #icon v-if="isLoading">
            <svg
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </template>
          Salvar Venda
        </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <!-- Informações Gerais -->
      <Card>
        <template #header>
          <h2 class="text-lg font-medium text-gray-900">Informações Gerais</h2>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Data da Venda -->
          <div>
            <InputText
              v-model="sale.date"
              type="date"
              label="Data da Venda"
              required
              :error="errors.date"
            />
          </div>

          <!-- Seleção de Cliente -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Cliente <span class="text-red-500">*</span>
            </label>
            <div class="flex space-x-2">
              <select
                v-model="sale.customerId"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="" disabled>Selecione um cliente</option>
                <option
                  v-for="customer in customers"
                  :key="customer.id"
                  :value="customer.id"
                >
                  {{ customer.name }}
                </option>
              </select>
              <Button
                variant="secondary"
                size="sm"
                @click="showNewCustomerModal = true"
              >
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
              </Button>
            </div>
            <p v-if="errors.customerId" class="mt-1 text-sm text-red-600">
              {{ errors.customerId }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Itens da Venda -->
      <Card>
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">Itens da Venda</h2>
            <Button
              variant="primary"
              size="sm"
              @click="showAddItemModal = true"
              :disabled="!sale.customerId"
            >
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
              Adicionar Item
            </Button>
          </div>
        </template>

        <div v-if="errors.items" class="mb-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="text-sm text-red-700">
              {{ errors.items }}
            </div>
          </div>
        </div>

        <div v-if="sale.items.length === 0" class="text-center py-8">
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            Nenhum item adicionado
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Comece adicionando produtos ou serviços à venda.
          </p>
          <div class="mt-6">
            <Button
              variant="primary"
              @click="showAddItemModal = true"
              :disabled="!sale.customerId"
            >
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
              Adicionar Item
            </Button>
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
                  Produto/Serviço
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Preço
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantidade
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Desconto
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
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
              <tr
                v-for="(item, index) in sale.items"
                :key="index"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ item.product.name }}
                  </div>
                  <div v-if="item.notes" class="text-xs text-gray-500">
                    {{ item.notes }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatCurrency(item.price) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.quantity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.discount ? formatCurrency(item.discount) : "-" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(item.total) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    @click="editItem(index)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    @click="removeItem(index)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <!-- Resumo da Venda -->
      <Card>
        <template #header>
          <h2 class="text-lg font-medium text-gray-900">Resumo da Venda</h2>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Resumo de Valores -->
          <div>
            <div class="flex justify-between py-2 border-b border-gray-200">
              <span class="text-sm text-gray-500">Subtotal:</span>
              <span class="text-sm font-medium text-gray-900">{{
                formatCurrency(subtotal)
              }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-200">
              <span class="text-sm text-gray-500">Desconto:</span>
              <div class="flex items-center">
                <InputText
                  v-model="discountValue"
                  type="number"
                  min="0"
                  :max="subtotal"
                  class="w-24 text-right mr-2"
                  @input="updateDiscount"
                />
                <span class="text-sm font-medium text-gray-900">{{
                  formatCurrency(sale.discount)
                }}</span>
              </div>
            </div>
            <div class="flex justify-between py-2 font-medium">
              <span class="text-gray-900">Total:</span>
              <span class="text-lg text-blue-600">{{
                formatCurrency(total)
              }}</span>
            </div>
          </div>

          <!-- Forma de Pagamento e Observações -->
          <div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Forma de Pagamento <span class="text-red-500">*</span>
              </label>
              <select
                v-model="sale.paymentMethod"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="" disabled>
                  Selecione a forma de pagamento
                </option>
                <option value="credit_card">Cartão de Crédito</option>
                <option value="debit_card">Cartão de Débito</option>
                <option value="money">Dinheiro</option>
                <option value="bank_transfer">Transferência Bancária</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
              </select>
              <p v-if="errors.paymentMethod" class="mt-1 text-sm text-red-600">
                {{ errors.paymentMethod }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                v-model="sale.notes"
                rows="3"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Adicione observações sobre a venda..."
              ></textarea>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Modal para adicionar/editar item -->
    <Modal
      v-if="showAddItemModal"
      :title="editingItemIndex !== null ? 'Editar Item' : 'Adicionar Item'"
      @close="closeAddItemModal"
    >
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Produto/Serviço <span class="text-red-500">*</span>
          </label>
          <select
            v-model="currentItem.productId"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            @change="onProductChange"
            required
          >
            <option value="" disabled>Selecione um produto/serviço</option>
            <option
              v-for="product in products"
              :key="product.id"
              :value="product.id"
              :disabled="!isProductAvailable(product)"
            >
              {{ product.name }}
              {{ !isProductAvailable(product) ? "(Sem estoque)" : "" }}
            </option>
          </select>
          <p v-if="itemErrors.productId" class="mt-1 text-sm text-red-600">
            {{ itemErrors.productId }}
          </p>
        </div>

        <div>
          <InputText
            v-model.number="currentItem.price"
            type="number"
            label="Preço Unitário"
            min="0"
            step="0.01"
            required
            :error="itemErrors.price"
            @input="updateItemTotal"
          />
        </div>

        <div>
          <InputText
            v-model.number="currentItem.quantity"
            type="number"
            label="Quantidade"
            min="1"
            step="1"
            required
            :error="itemErrors.quantity"
            @input="updateItemTotal"
          />
        </div>

        <div>
          <InputText
            v-model.number="currentItem.discount"
            type="number"
            label="Desconto"
            min="0"
            :max="currentItem.price * currentItem.quantity"
            step="0.01"
            @input="updateItemTotal"
            :error="itemErrors.discount"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Total
          </label>
          <p class="text-lg font-medium text-blue-600">
            {{ formatCurrency(currentItem.total) }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Observações
          </label>
          <textarea
            v-model="currentItem.notes"
            rows="2"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Observações sobre o item..."
          ></textarea>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button variant="outline" @click="closeAddItemModal">
            Cancelar
          </Button>
          <Button variant="primary" @click="addOrUpdateItem">
            {{ editingItemIndex !== null ? "Atualizar" : "Adicionar" }}
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Modal para adicionar novo cliente -->
    <Modal
      v-if="showNewCustomerModal"
      title="Novo Cliente"
      @close="showNewCustomerModal = false"
    >
      <div class="grid grid-cols-1 gap-4">
        <div>
          <InputText
            v-model="newCustomer.name"
            label="Nome"
            required
            :error="customerErrors.name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Tipo <span class="text-red-500">*</span>
          </label>
          <select
            v-model="newCustomer.type"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="fisica">Pessoa Física</option>
            <option value="juridica">Pessoa Jurídica</option>
          </select>
          <p v-if="customerErrors.type" class="mt-1 text-sm text-red-600">
            {{ customerErrors.type }}
          </p>
        </div>

        <div>
          <InputText
            v-model="newCustomer.email"
            type="email"
            label="Email"
            :error="customerErrors.email"
          />
        </div>

        <div>
          <InputText
            v-model="newCustomer.phone"
            label="Telefone"
            :error="customerErrors.phone"
          />
        </div>

        <div>
          <InputText
            v-model="newCustomer.document"
            label="Documento (CPF/CNPJ)"
            :error="customerErrors.document"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button variant="outline" @click="showNewCustomerModal = false">
            Cancelar
          </Button>
          <Button
            variant="primary"
            @click="saveNewCustomer"
            :disabled="isCustomerLoading"
          >
            <template #icon v-if="isCustomerLoading">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </template>
            Salvar
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useSalesStore } from "~/store/sales";
import { useCustomersStore } from "~/store/customers";
import { useProductsStore } from "~/store/products";
import { useNotification } from "~/composables/useNotification";
import { formatters } from "~/types/common";
import {
  saleHelpers,
  SaleStatus,
  PaymentMethod,
  type CreateSaleDTO,
} from "~/types/sale";
import { CustomerType, type CreateCustomerDTO } from "~/types/customer";
import { productHelpers, ProductType } from "~/types/product";

// Definir middleware de autenticação
definePageMeta({
  middleware: ["auth"],
  meta: {
    requiredPermission: "sales:create",
  },
});

// Composables e stores
const salesStore = useSalesStore();
const customersStore = useCustomersStore();
const productsStore = useProductsStore();
const notification = useNotification();
const router = useRouter();

// Estado da venda
const sale = ref<CreateSaleDTO>({
  date: new Date().toISOString().split("T")[0], // Data atual no formato YYYY-MM-DD
  customerId: "",
  items: [],
  discount: 0,
  paymentMethod: "",
  notes: "",
});

// Estado dos itens
const currentItem = ref({
  productId: "",
  product: { id: "", name: "" },
  quantity: 1,
  price: 0,
  discount: 0,
  total: 0,
  notes: "",
});

// Estado do cliente
const newCustomer = ref<CreateCustomerDTO>({
  name: "",
  type: CustomerType.PHYSICAL,
  email: "",
  phone: "",
  document: "",
  isActive: true,
});

// Estado de carregamento
const isLoading = ref(false);
const isCustomerLoading = ref(false);

// Estado de modais
const showAddItemModal = ref(false);
const showNewCustomerModal = ref(false);

// Estado de edição
const editingItemIndex = ref<number | null>(null);

// Estado de erros
const errors = ref<Record<string, string>>({});
const itemErrors = ref<Record<string, string>>({});
const customerErrors = ref<Record<string, string>>({});

// Campo para desconto
const discountValue = ref<number>(0);

// Dados externos
const customers = ref([]);
const products = ref([]);

// Computed properties
const subtotal = computed(() => {
  return sale.value.items.reduce((sum, item) => sum + item.total, 0);
});

const total = computed(() => {
  return Math.max(0, subtotal.value - (sale.value.discount || 0));
});

// Métodos
const fetchCustomers = async () => {
  try {
    // Em um cenário real, chamaria a API
    // const response = await customersStore.fetchCustomers({ isActive: true });

    // Mock de dados para desenvolvimento
    customers.value = [
      {
        id: "1",
        name: "João Silva",
        email: "joao@email.com",
        type: CustomerType.PHYSICAL,
      },
      {
        id: "2",
        name: "Maria Oliveira",
        email: "maria@email.com",
        type: CustomerType.PHYSICAL,
      },
      {
        id: "3",
        name: "Empresa XYZ Ltda",
        email: "contato@xyz.com",
        type: CustomerType.LEGAL,
      },
      {
        id: "4",
        name: "Ana Ferreira",
        email: "ana@email.com",
        type: CustomerType.PHYSICAL,
      },
      {
        id: "5",
        name: "Tech Solutions S.A.",
        email: "contato@techsolutions.com",
        type: CustomerType.LEGAL,
      },
    ];
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    notification.error("Erro ao carregar a lista de clientes");
  }
};

const fetchProducts = async () => {
  try {
    // Em um cenário real, chamaria a API
    // const response = await productsStore.fetchProducts({ isActive: true });

    // Mock de dados para desenvolvimento
    products.value = [
      {
        id: "1",
        name: "Notebook Dell XPS",
        sku: "DELL001",
        price: 7500,
        stock: 5,
        type: ProductType.PRODUCT,
      },
      {
        id: "2",
        name: "Mouse Wireless",
        sku: "MOUSE001",
        price: 120,
        stock: 20,
        type: ProductType.PRODUCT,
      },
      {
        id: "3",
        name: "Monitor Ultrawide",
        sku: "MON001",
        price: 2300,
        stock: 8,
        type: ProductType.PRODUCT,
      },
      {
        id: "4",
        name: "Teclado Mecânico",
        sku: "TEC001",
        price: 350,
        stock: 15,
        type: ProductType.PRODUCT,
      },
      {
        id: "5",
        name: "Headset Gamer",
        sku: "HEAD001",
        price: 420,
        stock: 10,
        type: ProductType.PRODUCT,
      },
      {
        id: "6",
        name: "Configuração de Equipamento",
        sku: "SERV001",
        price: 150,
        type: ProductType.SERVICE,
      },
      {
        id: "7",
        name: "Manutenção Preventiva",
        sku: "SERV002",
        price: 250,
        type: ProductType.SERVICE,
      },
    ];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    notification.error("Erro ao carregar a lista de produtos");
  }
};

// Verificar disponibilidade do produto
const isProductAvailable = (product) => {
  if (product.type === ProductType.SERVICE) return true;

  // Verificar se o produto já está na venda e se ainda há estoque disponível
  if (editingItemIndex.value !== null) {
    // Se estamos editando um item, desconsiderar a sua própria quantidade
    const currentQty = sale.value.items[editingItemIndex.value].quantity;
    const otherItems = sale.value.items.filter(
      (_, index) => index !== editingItemIndex.value
    );
    const qtyInCart = otherItems.reduce((sum, item) => {
      if (item.productId === product.id) {
        return sum + item.quantity;
      }
      return sum;
    }, 0);

    return product.stock >= qtyInCart;
  } else {
    // Se estamos adicionando um item novo
    const qtyInCart = sale.value.items.reduce((sum, item) => {
      if (item.productId === product.id) {
        return sum + item.quantity;
      }
      return sum;
    }, 0);

    return product.stock >= qtyInCart;
  }
};

// Atualizar o total do item atual
const updateItemTotal = () => {
  const price = currentItem.value.price || 0;
  const quantity = currentItem.value.quantity || 0;
  const discount = currentItem.value.discount || 0;

  currentItem.value.total = saleHelpers.calculateItemTotal(
    quantity,
    price,
    discount
  );
};

// Atualizar o desconto da venda
const updateDiscount = () => {
  const discount = Number(discountValue.value) || 0;
  sale.value.discount = Math.min(discount, subtotal.value);
};

// Selecionar produto
const onProductChange = () => {
  const productId = currentItem.value.productId;
  if (!productId) return;

  const product = products.value.find((p) => p.id === productId);
  if (product) {
    currentItem.value.product = { id: product.id, name: product.name };
    currentItem.value.price = product.price;
    updateItemTotal();
  }
};

// Adicionar ou atualizar item
const addOrUpdateItem = () => {
  // Validar item
  itemErrors.value = {};

  if (!currentItem.value.productId) {
    itemErrors.value.productId = "Selecione um produto ou serviço";
    return;
  }

  if (!currentItem.value.quantity || currentItem.value.quantity <= 0) {
    itemErrors.value.quantity = "Quantidade deve ser maior que zero";
    return;
  }

  if (!currentItem.value.price || currentItem.value.price < 0) {
    itemErrors.value.price = "Preço não pode ser negativo";
    return;
  }

  const product = products.value.find(
    (p) => p.id === currentItem.value.productId
  );
  if (product && product.type === ProductType.PRODUCT) {
    // Verificar estoque disponível
    const isAvailable = isProductAvailable(product);
    if (!isAvailable) {
      itemErrors.value.productId = "Produto sem estoque suficiente";
      return;
    }
  }

  // Criar objeto do item
  const item = {
    productId: currentItem.value.productId,
    quantity: currentItem.value.quantity,
    price: currentItem.value.price,
    discount: currentItem.value.discount || 0,
    notes: currentItem.value.notes || "",
    product: currentItem.value.product,
    total: currentItem.value.total,
  };

  if (editingItemIndex.value !== null) {
    // Atualizar item existente
    sale.value.items[editingItemIndex.value] = item;
  } else {
    // Adicionar novo item
    sale.value.items.push(item);
  }

  // Fechar modal
  closeAddItemModal();

  // Mostrar notificação
  notification.success(
    `Item ${
      editingItemIndex.value !== null ? "atualizado" : "adicionado"
    } com sucesso!`
  );
};

// Editar item
const editItem = (index) => {
  const item = sale.value.items[index];

  // Preencher o formulário com os dados do item
  currentItem.value = {
    productId: item.productId,
    product: item.product,
    quantity: item.quantity,
    price: item.price,
    discount: item.discount || 0,
    total: item.total,
    notes: item.notes || "",
  };

  // Marcar índice para edição
  editingItemIndex.value = index;

  // Abrir modal
  showAddItemModal.value = true;
};

// Remover item
const removeItem = (index) => {
  if (confirm("Tem certeza que deseja remover este item?")) {
    sale.value.items.splice(index, 1);
    notification.success("Item removido com sucesso!");
  }
};

// Fechar modal de adicionar/editar item
const closeAddItemModal = () => {
  showAddItemModal.value = false;
  editingItemIndex.value = null;

  // Resetar formulário
  currentItem.value = {
    productId: "",
    product: { id: "", name: "" },
    quantity: 1,
    price: 0,
    discount: 0,
    total: 0,
    notes: "",
  };

  itemErrors.value = {};
};

// Validar venda
const validateSale = (): boolean => {
  errors.value = {};

  if (!sale.value.date) {
    errors.value.date = "Data da venda é obrigatória";
  }

  if (!sale.value.customerId) {
    errors.value.customerId = "Selecione um cliente";
  }

  if (sale.value.items.length === 0) {
    errors.value.items = "Adicione pelo menos um item à venda";
  }

  if (!sale.value.paymentMethod) {
    errors.value.paymentMethod = "Selecione uma forma de pagamento";
  }

  return Object.keys(errors.value).length === 0;
};

// Salvar venda
const saveSale = async () => {
  // Validar venda
  if (!validateSale()) {
    notification.error("Por favor, corrija os erros no formulário");
    return;
  }

  isLoading.value = true;

  try {
    // Em um cenário real, chamaria a API
    // const response = await salesStore.createSale(sale.value);

    // Simulação
    await new Promise((resolve) => setTimeout(resolve, 1000));

    notification.success("Venda registrada com sucesso!");

    // Redirecionar para a lista de vendas
    router.push("/vendas");
  } catch (error) {
    console.error("Erro ao salvar venda:", error);
    notification.error("Erro ao registrar a venda");
  } finally {
    isLoading.value = false;
  }
};

// Validar cliente
const validateCustomer = (): boolean => {
  customerErrors.value = {};

  if (!newCustomer.value.name) {
    customerErrors.value.name = "Nome é obrigatório";
  }

  if (!newCustomer.value.type) {
    customerErrors.value.type = "Tipo é obrigatório";
  }

  // Validar email se preenchido
  if (
    newCustomer.value.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCustomer.value.email)
  ) {
    customerErrors.value.email = "Email inválido";
  }

  // Validar documento se preenchido
  if (newCustomer.value.document && newCustomer.value.type) {
    // Usando o customerHelpers para validar documento
    // Esta parte depende da implementação real de customerHelpers
    // Por isso adicionamos uma verificação de segurança
    if (
      typeof customerHelpers !== "undefined" &&
      typeof customerHelpers.isValidDocument === "function"
    ) {
      const isValid = customerHelpers.isValidDocument(
        newCustomer.value.document,
        newCustomer.value.type
      );

      if (!isValid) {
        customerErrors.value.document =
          newCustomer.value.type === CustomerType.PHYSICAL
            ? "CPF inválido"
            : "CNPJ inválido";
      }
    }
  }

  return Object.keys(customerErrors.value).length === 0;
};

// Salvar novo cliente
const saveNewCustomer = async () => {
  // Validar cliente
  if (!validateCustomer()) {
    notification.error("Por favor, corrija os erros no formulário");
    return;
  }

  isCustomerLoading.value = true;

  try {
    // Em um cenário real, chamaria a API
    // const response = await customersStore.createCustomer(newCustomer.value);

    // Simulação
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Criar cliente mockado
    const newCustomerId = `new-${Date.now()}`;
    const mockCustomer = {
      id: newCustomerId,
      name: newCustomer.value.name,
      email: newCustomer.value.email,
      type: newCustomer.value.type,
    };

    // Adicionar à lista de clientes
    customers.value.push(mockCustomer);

    // Selecionar o novo cliente
    sale.value.customerId = newCustomerId;

    // Fechar modal
    showNewCustomerModal.value = false;

    // Mostrar notificação
    notification.success("Cliente cadastrado com sucesso!");

    // Resetar formulário
    newCustomer.value = {
      name: "",
      type: CustomerType.PHYSICAL,
      email: "",
      phone: "",
      document: "",
      isActive: true,
    };

    customerErrors.value = {};
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
    notification.error("Erro ao cadastrar cliente");
  } finally {
    isCustomerLoading.value = false;
  }
};

// Métodos de formatação
const formatCurrency = (value: number): string => {
  return formatters.currency(value);
};

// Carregar dados iniciais
onMounted(async () => {
  await Promise.all([fetchCustomers(), fetchProducts()]);
});
</script>
