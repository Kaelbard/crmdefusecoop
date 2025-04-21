#!/bin/bash

# Cores para melhor visualização
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Criando estrutura de pastas para o projeto de Gestão Empresarial...${NC}"

# Diretório raiz (ajuste conforme necessário)
# Remova esta parte se você já estiver dentro da pasta do projeto
# mkdir -p sistema-gestao
# cd sistema-gestao

# Criar estrutura básica do Nuxt
mkdir -p pages components composables store types assets layouts middleware plugins public

# Estrutura de páginas
echo -e "${GREEN}Criando estrutura de páginas...${NC}"
mkdir -p pages/produtos pages/clientes pages/vendas pages/servicos pages/relatorios
touch pages/index.vue pages/login.vue
touch pages/produtos/index.vue pages/produtos/novo.vue pages/produtos/[id].vue
touch pages/clientes/index.vue pages/clientes/novo.vue pages/clientes/[id].vue
touch pages/vendas/index.vue pages/vendas/nova.vue pages/vendas/[id].vue
touch pages/servicos/index.vue pages/servicos/novo.vue pages/servicos/[id].vue
touch pages/relatorios/index.vue pages/relatorios/vendas.vue pages/relatorios/estoque.vue pages/relatorios/clientes.vue

# Estrutura de componentes
echo -e "${GREEN}Criando estrutura de componentes...${NC}"
mkdir -p components/ui components/forms components/dashboard components/layout
mkdir -p components/domain/products components/domain/customers components/domain/sales components/domain/services

# Componentes UI
touch components/ui/Button.vue components/ui/Card.vue components/ui/Modal.vue components/ui/Table.vue

# Componentes de formulário
touch components/forms/InputText.vue components/forms/InputNumber.vue components/forms/Select.vue

# Componentes de dashboard
touch components/dashboard/SalesChart.vue components/dashboard/ProductsTable.vue components/dashboard/RecentSales.vue

# Componentes de layout
touch components/layout/Sidebar.vue components/layout/Navbar.vue components/layout/Footer.vue

# Componentes de domínio
touch components/domain/products/ProductCard.vue components/domain/products/ProductForm.vue
touch components/domain/customers/CustomerCard.vue components/domain/customers/CustomerForm.vue
touch components/domain/sales/SaleCard.vue components/domain/sales/SaleForm.vue
touch components/domain/services/ServiceCard.vue components/domain/services/ServiceForm.vue

# Estrutura de store (Pinia)
echo -e "${GREEN}Criando estrutura de store com Pinia...${NC}"
touch store/auth.ts store/products.ts store/customers.ts store/sales.ts store/services.ts store/ui.ts

# Estrutura de composables
echo -e "${GREEN}Criando estrutura de composables...${NC}"
touch composables/useAuth.ts composables/useApi.ts composables/useNotification.ts
touch composables/usePagination.ts composables/useForm.ts composables/useSort.ts
touch composables/useFilter.ts composables/useExport.ts

# Estrutura de types
echo -e "${GREEN}Criando estrutura de types...${NC}"
touch types/api.ts types/product.ts types/customer.ts types/sale.ts
touch types/service.ts types/user.ts types/ui.ts types/common.ts

# Layouts
echo -e "${GREEN}Criando layouts...${NC}"
touch layouts/default.vue layouts/auth.vue

# Middleware
echo -e "${GREEN}Criando middleware...${NC}"
touch middleware/auth.ts

# Plugins
echo -e "${GREEN}Criando plugins...${NC}"
touch plugins/api.ts plugins/chart.ts

# Assets
mkdir -p assets/images
touch assets/images/.gitkeep

# Public
touch public/favicon.ico

echo -e "${BLUE}Estrutura de pastas criada com sucesso!${NC}"
ls -la

echo -e "${GREEN}Próximos passos:${NC}"
echo "1. Configure o Nuxt 3 com TypeScript"
echo "2. Instale o Pinia: npm install pinia @pinia/nuxt"
echo "3. Configure o Pinia no arquivo nuxt.config.ts"