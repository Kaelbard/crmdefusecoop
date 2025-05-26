<template>
  <div class="flex flex-col items-center min-w-screen min-h-screen bg-gray-100">
    <div class="w-3/5 p-6 space-y-6">
      <!-- Menu de Navegação -->
      <nav class="bg-white shadow-sm rounded-lg p-4 mb-6">
        <div class="flex flex-wrap gap-3 justify-center md:justify-start">
          <Button variant="secondary" @click="activeModal = 'clientes'"
            >Clientes</Button
          >
          <Button variant="secondary" @click="activeModal = 'produtos'"
            >Produtos</Button
          >
          <Button variant="secondary" @click="activeModal = 'servicos'"
            >Serviços</Button
          >
          <Button variant="secondary" @click="activeModal = 'vendas'"
            >Vendas</Button
          >
          <Button variant="secondary" @click="activeModal = 'relatorios'"
            >Relatórios</Button
          >
        </div>
      </nav>

      <!-- Modais -->
      <Modal
        v-if="activeModal === 'clientes' && !showClientForm"
        :model-value="true"
        title="Clientes"
        @update:model-value="closeModal"
      >
        <ClientList
          :clients="customers"
          @new="showClientForm = true"
          @edit="editClient"
          @delete="handleDeleteClient"
        />
      </Modal>

      <Modal
        v-if="activeModal === 'clientes' && showClientForm"
        :model-value="true"
        :title="selectedClient ? 'Editar Cliente' : 'Novo Cliente'"
        @update:model-value="closeClientForm"
      >
        <ClientForm
          :client="selectedClient"
          @submit="handleSubmitClient"
          @cancel="closeClientForm"
        />
      </Modal>

      <Modal
        v-if="activeModal === 'produtos' && !showProductForm"
        :model-value="true"
        title="Produtos"
        @update:model-value="closeModal"
      >
        <ProductList
          :products="products"
          @new="showProductForm = true"
          @edit="editProduct"
          @delete="handleDeleteProduct"
        />
      </Modal>

      <Modal
        v-if="activeModal === 'produtos' && showProductForm"
        :model-value="true"
        :title="selectedProduct ? 'Editar Produto' : 'Novo Produto'"
        @update:model-value="closeProductForm"
      >
        <ProductForm
          :product="selectedProduct"
          @submit="handleSubmitProduct"
          @cancel="closeProductForm"
        />
      </Modal>

      <Modal
        v-if="activeModal === 'servicos' && !showServiceForm"
        :model-value="true"
        title="Serviços"
        @update:model-value="closeModal"
      >
        <ServiceList
          :services="services"
          @new="showServiceForm = true"
          @edit="editService"
          @delete="handleDeleteService"
        />
      </Modal>

      <Modal
        v-if="activeModal === 'servicos' && showServiceForm"
        :model-value="true"
        :title="selectedService ? 'Editar Serviço' : 'Novo Serviço'"
        @update:model-value="closeServiceForm"
      >
        <ServiceForm
          :service="selectedService"
          @submit="handleSubmitService"
          @cancel="closeServiceForm"
        />
      </Modal>

      <Modal
        v-if="activeModal === 'vendas' && !showSaleForm"
        :model-value="true"
        title="Vendas"
        @update:model-value="closeModal"
      >
        <SaleList
          :sales="sales"
          @new="showSaleForm = true"
          @view="viewSale"
          @complete="handleCompleteSale"
          @cancel="handleCancelSale"
        />
      </Modal>

      <Modal
        v-if="activeModal === 'vendas' && showSaleForm"
        :model-value="true"
        :title="selectedSale ? 'Visualizar Venda' : 'Nova Venda'"
        @update:model-value="closeSaleForm"
      >
        <SaleForm
          :sale="selectedSale"
          :customers="customers"
          :products="products"
          :services="services"
          @submit="handleSubmitSale"
          @cancel="closeSaleForm"
        />
      </Modal>

      <Modal
        :model-value="activeModal === 'relatorios'"
        title="Relatórios"
        @update:model-value="closeModal"
      >
        <ReportList
          :customers="customers"
          :products="products"
          :services="services"
          :sales="sales"
          @generate="handleGenerateReport"
        />
      </Modal>

      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button variant="primary" @click="refreshDashboard">
          Atualizar Dados
        </Button>
      </div>

      <!-- Resumo de Métricas -->
      <MetricsSummary />

      <!-- Gráfico de Vendas -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <SalesChart />
        </div>
        <div class="lg:col-span-1">
          <RecentSales />
        </div>
      </div>

      <!-- Produtos Mais Vendidos -->
      <ProductsTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../stores/dashboard";
import { useCustomersStore } from "../stores/customers";
import { useProductsStore } from "../stores/products";
import { useServicesStore } from "../stores/services";
import { useSalesStore } from "../stores/sales";

import Modal from "../components/ui/Modal.vue";
import Button from "../components/ui/Button.vue";
import MetricsSummary from "../components/dashboard/MetricsSummary.vue";
import SalesChart from "../components/dashboard/SalesChart.vue";
import RecentSales from "../components/dashboard/RecentSales.vue";
import ProductsTable from "../components/dashboard/ProductsTable.vue";

// Componentes de Lista
import ClientList from "../components/domain/customers/ClientList.vue";
import ProductList from "../components/domain/products/ProductList.vue";
import ServiceList from "../components/domain/services/ServiceList.vue";
import SaleList from "../components/domain/sales/SaleList.vue";
import ReportList from "../components/domain/reports/ReportList.vue";

// Componentes de Formulário
import ClientForm from "../components/domain/customers/ClientForm.vue";
import ProductForm from "../components/domain/products/ProductForm.vue";
import ServiceForm from "../components/domain/services/ServiceForm.vue";
import SaleForm from "../components/domain/sales/SaleForm.vue";

// Stores
const dashboardStore = useDashboardStore();
const customersStore = useCustomersStore();
const productsStore = useProductsStore();
const servicesStore = useServicesStore();
const salesStore = useSalesStore();

// Refs dos stores
const { customers } = storeToRefs(customersStore);
const { products } = storeToRefs(productsStore);
const { services } = storeToRefs(servicesStore);
const { sales } = storeToRefs(salesStore);

// Estados dos modais e formulários
const activeModal = ref<string | null>(null);
const showClientForm = ref(false);
const showProductForm = ref(false);
const showServiceForm = ref(false);
const showSaleForm = ref(false);

// Estados dos itens selecionados
const selectedClient = ref(null);
const selectedProduct = ref(null);
const selectedService = ref(null);
const selectedSale = ref(null);

// Métodos de fechamento de modal
const closeModal = () => {
  activeModal.value = null;
};

// Métodos de Cliente
const closeClientForm = () => {
  showClientForm.value = false;
  selectedClient.value = null;
};

const editClient = (client: any) => {
  selectedClient.value = client;
  showClientForm.value = true;
};

const handleSubmitClient = async (client: any) => {
  if (selectedClient.value) {
    await customersStore.updateCustomer(client);
  } else {
    await customersStore.createCustomer(client);
  }
  closeClientForm();
};

const handleDeleteClient = async (client: any) => {
  await customersStore.deleteCustomer(client.id);
};

// Métodos de Produto
const closeProductForm = () => {
  showProductForm.value = false;
  selectedProduct.value = null;
};

const editProduct = (product: any) => {
  selectedProduct.value = product;
  showProductForm.value = true;
};

const handleSubmitProduct = async (product: any) => {
  if (selectedProduct.value) {
    await productsStore.updateProduct(product);
  } else {
    await productsStore.createProduct(product);
  }
  closeProductForm();
};

const handleDeleteProduct = async (product: any) => {
  await productsStore.deleteProduct(product.id);
};

// Métodos de Serviço
const closeServiceForm = () => {
  showServiceForm.value = false;
  selectedService.value = null;
};

const editService = (service: any) => {
  selectedService.value = service;
  showServiceForm.value = true;
};

const handleSubmitService = async (service: any) => {
  if (selectedService.value) {
    await servicesStore.updateService(service);
  } else {
    await servicesStore.createService(service);
  }
  closeServiceForm();
};

const handleDeleteService = async (service: any) => {
  await servicesStore.deleteService(service.id);
};

// Métodos de Venda
const closeSaleForm = () => {
  showSaleForm.value = false;
  selectedSale.value = null;
};

const viewSale = (sale: any) => {
  selectedSale.value = sale;
  showSaleForm.value = true;
};

const handleSubmitSale = async (sale: any) => {
  if (selectedSale.value) {
    await salesStore.updateSale(sale);
  } else {
    await salesStore.createSale(sale);
  }
  closeSaleForm();
};

const handleCompleteSale = async (sale: any) => {
  await salesStore.completeSale(sale.id);
};

const handleCancelSale = async (sale: any) => {
  await salesStore.cancelSale(sale.id);
};

// Métodos de Relatório
const handleGenerateReport = async (filters: any) => {
  // Implementar lógica de geração de relatório com base nos filtros
  console.log("Gerar relatório", filters);
};

// Carregar dados iniciais
onMounted(async () => {
  await Promise.all([
    customersStore.fetchCustomers(),
    productsStore.fetchProducts(),
    servicesStore.fetchServices(),
    salesStore.fetchSales(),
  ]);
});
</script>
