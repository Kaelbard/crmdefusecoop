import { defineNuxtPlugin } from "nuxt/app";
import {
  CustomerType,
  type Customer,
  type CreateCustomerDTO,
  type UpdateCustomerDTO,
} from "~/types/customer";
import {
  ProductType,
  type Product,
  type CreateProductDTO,
  type UpdateProductDTO,
} from "~/types/product";
import {
  SaleStatus,
  PaymentMethod,
  type Sale,
  type CreateSaleDTO,
  type UpdateSaleDTO,
} from "~/types/sale";
import { PaginatedResponse } from "~/types/common";

/**
 * Plugin para simular uma API durante o desenvolvimento
 */
export default defineNuxtPlugin((_nuxtApp) => {
  // --------------------------
  // MOCK DATA
  // --------------------------

  // Clientes
  let customers: Customer[] = [
    {
      id: "1",
      name: "João Silva",
      type: CustomerType.PHYSICAL,
      email: "joao@example.com",
      phone: "(11) 98765-4321",
      document: "123.456.789-00",
      isActive: true,
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-01-10"),
    },
    {
      id: "2",
      name: "Maria Oliveira",
      type: CustomerType.PHYSICAL,
      email: "maria@example.com",
      phone: "(11) 91234-5678",
      document: "987.654.321-00",
      isActive: true,
      createdAt: new Date("2025-02-15"),
      updatedAt: new Date("2025-02-15"),
    },
    {
      id: "3",
      name: "Tech Solutions Ltda",
      type: CustomerType.LEGAL,
      email: "contato@techsolutions.com",
      phone: "(11) 3456-7890",
      document: "12.345.678/0001-90",
      isActive: true,
      createdAt: new Date("2025-03-05"),
      updatedAt: new Date("2025-03-05"),
    },
    {
      id: "4",
      name: "Ana Ferreira",
      type: CustomerType.PHYSICAL,
      email: "ana@example.com",
      phone: "(11) 99876-5432",
      document: "111.222.333-44",
      isActive: true,
      createdAt: new Date("2025-03-20"),
      updatedAt: new Date("2025-03-20"),
    },
    {
      id: "5",
      name: "Inovação Digital S.A.",
      type: CustomerType.LEGAL,
      email: "contato@inovacaodigital.com",
      phone: "(11) 2345-6789",
      document: "98.765.432/0001-10",
      isActive: true,
      createdAt: new Date("2025-04-02"),
      updatedAt: new Date("2025-04-02"),
    },
  ];

  // Produtos
  let products: Product[] = [
    {
      id: "1",
      sku: "NOT001",
      name: "Notebook Dell XPS 13",
      description:
        "Notebook premium com processador Intel Core i7, 16GB RAM e 512GB SSD",
      type: ProductType.PRODUCT,
      price: 7599.99,
      costPrice: 6200,
      stock: 10,
      minStock: 3,
      unit: "un",
      brand: "Dell",
      isActive: true,
      createdAt: new Date("2025-01-05"),
      updatedAt: new Date("2025-01-05"),
    },
    {
      id: "2",
      sku: "MON001",
      name: 'Monitor Ultrawide 34"',
      description: "Monitor ultrawide de 34 polegadas com resolução 3440x1440",
      type: ProductType.PRODUCT,
      price: 2899.99,
      costPrice: 2200,
      stock: 8,
      minStock: 2,
      unit: "un",
      brand: "LG",
      isActive: true,
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-01-10"),
    },
    {
      id: "3",
      sku: "MOUSE001",
      name: "Mouse Sem Fio",
      description: "Mouse sem fio com sensor de alta precisão",
      type: ProductType.PRODUCT,
      price: 149.99,
      costPrice: 80,
      stock: 30,
      minStock: 10,
      unit: "un",
      brand: "Logitech",
      isActive: true,
      createdAt: new Date("2025-01-15"),
      updatedAt: new Date("2025-01-15"),
    },
    {
      id: "4",
      sku: "TEC001",
      name: "Teclado Mecânico",
      description: "Teclado mecânico RGB com switches Cherry MX Blue",
      type: ProductType.PRODUCT,
      price: 349.99,
      costPrice: 200,
      stock: 12,
      minStock: 5,
      unit: "un",
      brand: "HyperX",
      isActive: true,
      createdAt: new Date("2025-02-05"),
      updatedAt: new Date("2025-02-05"),
    },
    {
      id: "5",
      sku: "HEAD001",
      name: "Headset Gamer 7.1",
      description: "Headset gamer com som surround 7.1 e microfone removível",
      type: ProductType.PRODUCT,
      price: 399.99,
      costPrice: 240,
      stock: 15,
      minStock: 5,
      unit: "un",
      brand: "Razer",
      isActive: true,
      createdAt: new Date("2025-02-10"),
      updatedAt: new Date("2025-02-10"),
    },
    {
      id: "6",
      sku: "SERV001",
      name: "Instalação de Software",
      description: "Serviço de instalação e configuração de software",
      type: ProductType.SERVICE,
      price: 150,
      isActive: true,
      createdAt: new Date("2025-03-01"),
      updatedAt: new Date("2025-03-01"),
    },
    {
      id: "7",
      sku: "SERV002",
      name: "Manutenção Preventiva",
      description: "Serviço de manutenção preventiva para computadores",
      type: ProductType.SERVICE,
      price: 250,
      isActive: true,
      createdAt: new Date("2025-03-10"),
      updatedAt: new Date("2025-03-10"),
    },
  ];

  // Vendas
  let sales: Sale[] = [
    {
      id: "1",
      code: "VND-001",
      date: "2025-04-20",
      customer: customers[0],
      items: [
        {
          id: "1",
          product: { id: products[0].id, name: products[0].name },
          quantity: 1,
          price: products[0].price,
          total: products[0].price,
        },
      ],
      subtotal: products[0].price,
      discount: 0,
      total: products[0].price,
      status: SaleStatus.COMPLETED,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      createdAt: new Date("2025-04-20"),
      updatedAt: new Date("2025-04-20"),
    },
    {
      id: "2",
      code: "VND-002",
      date: "2025-04-19",
      customer: customers[1],
      items: [
        {
          id: "2",
          product: { id: products[2].id, name: products[2].name },
          quantity: 2,
          price: products[2].price,
          total: products[2].price * 2,
        },
      ],
      subtotal: products[2].price * 2,
      discount: 20,
      total: products[2].price * 2 - 20,
      status: SaleStatus.COMPLETED,
      paymentMethod: PaymentMethod.MONEY,
      createdAt: new Date("2025-04-19"),
      updatedAt: new Date("2025-04-19"),
    },
    {
      id: "3",
      code: "VND-003",
      date: "2025-04-18",
      customer: customers[2],
      items: [
        {
          id: "3",
          product: { id: products[1].id, name: products[1].name },
          quantity: 1,
          price: products[1].price,
          total: products[1].price,
        },
        {
          id: "4",
          product: { id: products[3].id, name: products[3].name },
          quantity: 1,
          price: products[3].price,
          total: products[3].price,
        },
      ],
      subtotal: products[1].price + products[3].price,
      discount: 150,
      total: products[1].price + products[3].price - 150,
      status: SaleStatus.PENDING,
      paymentMethod: PaymentMethod.BANK_TRANSFER,
      createdAt: new Date("2025-04-18"),
      updatedAt: new Date("2025-04-18"),
    },
    {
      id: "4",
      code: "VND-004",
      date: "2025-04-17",
      customer: customers[3],
      items: [
        {
          id: "5",
          product: { id: products[4].id, name: products[4].name },
          quantity: 1,
          price: products[4].price,
          total: products[4].price,
        },
      ],
      subtotal: products[4].price,
      discount: 0,
      total: products[4].price,
      status: SaleStatus.CANCELED,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      createdAt: new Date("2025-04-17"),
      updatedAt: new Date("2025-04-17"),
    },
    {
      id: "5",
      code: "VND-005",
      date: "2025-04-16",
      customer: customers[4],
      items: [
        {
          id: "6",
          product: { id: products[0].id, name: products[0].name },
          quantity: 2,
          price: products[0].price,
          total: products[0].price * 2,
        },
        {
          id: "7",
          product: { id: products[5].id, name: products[5].name },
          quantity: 1,
          price: products[5].price,
          total: products[5].price,
        },
      ],
      subtotal: products[0].price * 2 + products[5].price,
      discount: 500,
      total: products[0].price * 2 + products[5].price - 500,
      status: SaleStatus.COMPLETED,
      paymentMethod: PaymentMethod.PIX,
      createdAt: new Date("2025-04-16"),
      updatedAt: new Date("2025-04-16"),
    },
  ];

  // --------------------------
  // FUNÇÕES AUXILIARES
  // --------------------------

  // Função para simular delay de rede (adiciona realismo)
  const simulateNetworkDelay = () =>
    new Promise((resolve) => setTimeout(resolve, 300));

  // Função para paginação de resultados
  const paginate = <T>(
    items: T[],
    page: number = 1,
    limit: number = 10
  ): PaginatedResponse<T> => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = items.slice(startIndex, endIndex);

    return {
      data,
      pagination: {
        page,
        limit,
        total: items.length,
        totalPages: Math.ceil(items.length / limit),
      },
    };
  };

  // Função para filtrar com busca genérica
  const filterBySearch = <T extends { [key: string]: any }>(
    items: T[],
    search?: string,
    searchFields: string[] = ["name", "code", "email"]
  ): T[] => {
    if (!search) {
      return items;
    }

    const searchLower = search.toLowerCase();

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value === undefined || value === null) {
          return false;
        }
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  };

  // Função para gerar ID único
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // --------------------------
  // MOCK API
  // --------------------------
  const mockApi = {
    // Clientes
    async getCustomers(params: any = {}) {
      await simulateNetworkDelay();

      let filteredCustomers = [...customers];

      // Aplicar filtros
      if (params.search) {
        filteredCustomers = filterBySearch(filteredCustomers, params.search);
      }

      if (params.type) {
        filteredCustomers = filteredCustomers.filter(
          (c) => c.type === params.type
        );
      }

      if (params.isActive !== undefined) {
        filteredCustomers = filteredCustomers.filter(
          (c) => c.isActive === params.isActive
        );
      }

      // Ordenação
      if (params.sort) {
        const direction = params.order === "desc" ? -1 : 1;
        filteredCustomers.sort((a: any, b: any) => {
          if (a[params.sort] < b[params.sort]) {
            return -1 * direction;
          }
          if (a[params.sort] > b[params.sort]) {
            return 1 * direction;
          }
          return 0;
        });
      }

      // Paginação
      return paginate(
        filteredCustomers,
        params.page ? Number(params.page) : 1,
        params.limit ? Number(params.limit) : 10
      );
    },

    async getCustomer(id: string) {
      await simulateNetworkDelay();

      const customer = customers.find((c) => c.id === id);
      if (!customer) {
        throw new Error("Cliente não encontrado");
      }

      return customer;
    },

    async createCustomer(data: CreateCustomerDTO) {
      await simulateNetworkDelay();

      const newCustomer: Customer = {
        id: generateId(),
        ...data,
        isActive: data.isActive !== undefined ? data.isActive : true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      customers.unshift(newCustomer);

      return newCustomer;
    },

    async updateCustomer(id: string, data: UpdateCustomerDTO) {
      await simulateNetworkDelay();

      const index = customers.findIndex((c) => c.id === id);
      if (index === -1) {
        throw new Error("Cliente não encontrado");
      }

      const updatedCustomer = {
        ...customers[index],
        ...data,
        updatedAt: new Date(),
      };

      customers[index] = updatedCustomer;

      return updatedCustomer;
    },

    async deleteCustomer(id: string) {
      await simulateNetworkDelay();

      const index = customers.findIndex((c) => c.id === id);
      if (index === -1) {
        throw new Error("Cliente não encontrado");
      }

      customers.splice(index, 1);

      return { success: true };
    },

    // Produtos
    async getProducts(params: any = {}) {
      await simulateNetworkDelay();

      let filteredProducts = [...products];

      // Aplicar filtros
      if (params.search) {
        filteredProducts = filterBySearch(filteredProducts, params.search, [
          "name",
          "sku",
          "description",
          "brand",
        ]);
      }

      if (params.type) {
        filteredProducts = filteredProducts.filter(
          (p) => p.type === params.type
        );
      }

      if (params.categoryId) {
        filteredProducts = filteredProducts.filter(
          (p) => p.categoryId === params.categoryId
        );
      }

      if (params.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          (p) => p.price >= Number(params.minPrice)
        );
      }

      if (params.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          (p) => p.price <= Number(params.maxPrice)
        );
      }

      if (params.inStock) {
        filteredProducts = filteredProducts.filter(
          (p) =>
            p.type === ProductType.SERVICE ||
            (p.stock !== undefined && p.stock > 0)
        );
      }

      if (params.isActive !== undefined) {
        filteredProducts = filteredProducts.filter(
          (p) => p.isActive === params.isActive
        );
      }

      if (params.brand) {
        filteredProducts = filteredProducts.filter(
          (p) => p.brand === params.brand
        );
      }

      // Ordenação
      if (params.sort) {
        const direction = params.order === "desc" ? -1 : 1;
        filteredProducts.sort((a: any, b: any) => {
          if (a[params.sort] < b[params.sort]) {
            return -1 * direction;
          }
          if (a[params.sort] > b[params.sort]) {
            return 1 * direction;
          }
          return 0;
        });
      }

      // Paginação
      return paginate(
        filteredProducts,
        params.page ? Number(params.page) : 1,
        params.limit ? Number(params.limit) : 10
      );
    },

    async getProduct(id: string) {
      await simulateNetworkDelay();

      const product = products.find((p) => p.id === id);
      if (!product) {
        throw new Error("Produto não encontrado");
      }

      return product;
    },

    async createProduct(data: CreateProductDTO) {
      await simulateNetworkDelay();

      const newProduct: Product = {
        id: generateId(),
        ...data,
        isActive: data.isActive !== undefined ? data.isActive : true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      products.unshift(newProduct);

      return newProduct;
    },

    async updateProduct(id: string, data: UpdateProductDTO) {
      await simulateNetworkDelay();

      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error("Produto não encontrado");
      }

      const updatedProduct = {
        ...products[index],
        ...data,
        updatedAt: new Date(),
      };

      products[index] = updatedProduct;

      return updatedProduct;
    },

    async deleteProduct(id: string) {
      await simulateNetworkDelay();

      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error("Produto não encontrado");
      }

      products.splice(index, 1);

      return { success: true };
    },

    // Vendas
    async getSales(params: any = {}) {
      await simulateNetworkDelay();

      let filteredSales = [...sales];

      // Aplicar filtros
      if (params.search) {
        filteredSales = filterBySearch(filteredSales, params.search, ["code"]);
      }

      if (params.startDate) {
        filteredSales = filteredSales.filter(
          (s) => new Date(s.date) >= new Date(params.startDate)
        );
      }

      if (params.endDate) {
        filteredSales = filteredSales.filter(
          (s) => new Date(s.date) <= new Date(params.endDate)
        );
      }

      if (params.status) {
        filteredSales = filteredSales.filter((s) => s.status === params.status);
      }

      if (params.customerId) {
        filteredSales = filteredSales.filter(
          (s) => s.customer.id === params.customerId
        );
      }

      if (params.paymentMethod) {
        filteredSales = filteredSales.filter(
          (s) => s.paymentMethod === params.paymentMethod
        );
      }

      // Ordenação
      if (params.sort) {
        const direction = params.order === "desc" ? -1 : 1;
        filteredSales.sort((a: any, b: any) => {
          if (params.sort === "date") {
            return (
              direction *
              (new Date(a.date).getTime() - new Date(b.date).getTime())
            );
          }

          if (a[params.sort] < b[params.sort]) {
            return -1 * direction;
          }
          if (a[params.sort] > b[params.sort]) {
            return 1 * direction;
          }
          return 0;
        });
      } else {
        // Ordenação padrão por data mais recente
        filteredSales.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }

      // Paginação
      return paginate(
        filteredSales,
        params.page ? Number(params.page) : 1,
        params.limit ? Number(params.limit) : 10
      );
    },

    async getSale(id: string) {
      await simulateNetworkDelay();

      const sale = sales.find((s) => s.id === id);
      if (!sale) {
        throw new Error("Venda não encontrada");
      }

      return sale;
    },

    async createSale(data: CreateSaleDTO) {
      await simulateNetworkDelay();

      // Buscar cliente
      const customer = customers.find((c) => c.id === data.customerId);
      if (!customer) {
        throw new Error("Cliente não encontrado");
      }

      // Calcular subtotal
      let subtotal = 0;
      const items = data.items.map((item) => {
        // Buscar produto
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          throw new Error(`Produto com ID ${item.productId} não encontrado`);
        }

        // Verificar estoque
        if (
          product.type === ProductType.PRODUCT &&
          product.stock !== undefined
        ) {
          if (product.stock < item.quantity) {
            throw new Error(
              `Estoque insuficiente para o produto ${product.name}`
            );
          }

          // Atualizar estoque
          product.stock -= item.quantity;
          product.updatedAt = new Date();
        }

        const total = item.price * item.quantity - (item.discount || 0);
        subtotal += total;

        return {
          id: generateId(),
          product: { id: product.id, name: product.name },
          quantity: item.quantity,
          price: item.price,
          discount: item.discount || 0,
          notes: item.notes || "",
          total,
        };
      });

      // Calcular total
      const total = subtotal - (data.discount || 0);

      // Criar nova venda
      const newSale: Sale = {
        id: generateId(),
        code: `VND-${String(sales.length + 1).padStart(3, "0")}`,
        date: data.date,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
        },
        items,
        subtotal,
        discount: data.discount || 0,
        total,
        status: SaleStatus.COMPLETED,
        paymentMethod: data.paymentMethod,
        notes: data.notes || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      sales.unshift(newSale);

      return newSale;
    },

    async updateSale(id: string, data: UpdateSaleDTO) {
      await simulateNetworkDelay();

      const index = sales.findIndex((s) => s.id === id);
      if (index === -1) {
        throw new Error("Venda não encontrada");
      }

      const currentSale = sales[index];

      // Se mudar cliente
      let customer = currentSale.customer;
      if (data.customerId && data.customerId !== currentSale.customer.id) {
        const newCustomer = customers.find((c) => c.id === data.customerId);
        if (!newCustomer) {
          throw new Error("Cliente não encontrado");
        }
        customer = {
          id: newCustomer.id,
          name: newCustomer.name,
          email: newCustomer.email,
        };
      }

      // Se mudar itens
      let items = currentSale.items;
      let subtotal = currentSale.subtotal;

      if (data.items) {
        // Devolver estoque dos itens atuais
        currentSale.items.forEach((item) => {
          const product = products.find((p) => p.id === item.product.id);
          if (
            product &&
            product.type === ProductType.PRODUCT &&
            product.stock !== undefined
          ) {
            product.stock += item.quantity;
            product.updatedAt = new Date();
          }
        });

        // Processar novos itens
        subtotal = 0;
        items = data.items.map((item) => {
          // Buscar produto
          const product = products.find((p) => p.id === item.productId);
          if (!product) {
            throw new Error(`Produto com ID ${item.productId} não encontrado`);
          }

          // Verificar estoque
          if (
            product.type === ProductType.PRODUCT &&
            product.stock !== undefined
          ) {
            if (product.stock < item.quantity) {
              throw new Error(
                `Estoque insuficiente para o produto ${product.name}`
              );
            }

            // Atualizar estoque
            product.stock -= item.quantity;
            product.updatedAt = new Date();
          }

          const total = item.price * item.quantity - (item.discount || 0);
          subtotal += total;

          return {
            id: item.id || generateId(),
            product: { id: product.id, name: product.name },
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0,
            notes: item.notes || "",
            total,
          };
        });
      }

      // Calcular total
      const discount =
        data.discount !== undefined ? data.discount : currentSale.discount;
      const total = subtotal - discount;

      // Atualizar venda
      const updatedSale = {
        ...currentSale,
        date: data.date || currentSale.date,
        customer,
        items,
        subtotal,
        discount,
        total,
        status: data.status || currentSale.status,
        paymentMethod: data.paymentMethod || currentSale.paymentMethod,
        notes: data.notes !== undefined ? data.notes : currentSale.notes,
        updatedAt: new Date(),
      };

      sales[index] = updatedSale;

      return updatedSale;
    },

    async cancelSale(id: string) {
      await simulateNetworkDelay();

      const index = sales.findIndex((s) => s.id === id);
      if (index === -1) {
        throw new Error("Venda não encontrada");
      }

      const sale = sales[index];

      // Não pode cancelar se já estiver cancelada
      if (sale.status === SaleStatus.CANCELED) {
        throw new Error("Venda já cancelada");
      }

      // Devolver itens ao estoque
      sale.items.forEach((item) => {
        const product = products.find((p) => p.id === item.product.id);
        if (
          product &&
          product.type === ProductType.PRODUCT &&
          product.stock !== undefined
        ) {
          product.stock += item.quantity;
          product.updatedAt = new Date();
        }
      });

      // Atualizar status
      const updatedSale = {
        ...sale,
        status: SaleStatus.CANCELED,
        updatedAt: new Date(),
      };

      sales[index] = updatedSale;

      return updatedSale;
    },

    async deleteSale(id: string) {
      await simulateNetworkDelay();

      const index = sales.findIndex((s) => s.id === id);
      if (index === -1) {
        throw new Error("Venda não encontrada");
      }

      // Devolver itens ao estoque
      const sale = sales[index];
      sale.items.forEach((item) => {
        const product = products.find((p) => p.id === item.product.id);
        if (
          product &&
          product.type === ProductType.PRODUCT &&
          product.stock !== undefined
        ) {
          product.stock += item.quantity;
          product.updatedAt = new Date();
        }
      });

      sales.splice(index, 1);

      return { success: true };
    },
  };

  // --------------------------
  // API ROUTES
  // --------------------------
  const routes = {
    // Customers
    "GET /customers": mockApi.getCustomers,
    "GET /customers/:id": (params: any) => mockApi.getCustomer(params.id),
    "POST /customers": (body: any) => mockApi.createCustomer(body),
    "PUT /customers/:id": (params: any, body: any) =>
      mockApi.updateCustomer(params.id, body),
    "DELETE /customers/:id": (params: any) => mockApi.deleteCustomer(params.id),

    // Products
    "GET /products": mockApi.getProducts,
    "GET /products/:id": (params: any) => mockApi.getProduct(params.id),
    "POST /products": (body: any) => mockApi.createProduct(body),
    "PUT /products/:id": (params: any, body: any) =>
      mockApi.updateProduct(params.id, body),
    "DELETE /products/:id": (params: any) => mockApi.deleteProduct(params.id),

    // Sales
    "GET /sales": mockApi.getSales,
    "GET /sales/:id": (params: any) => mockApi.getSale(params.id),
    "POST /sales": (body: any) => mockApi.createSale(body),
    "PUT /sales/:id": (params: any, body: any) =>
      mockApi.updateSale(params.id, body),
    "PUT /sales/:id/cancel": (params: any) => mockApi.cancelSale(params.id),
    "DELETE /sales/:id": (params: any) => mockApi.deleteSale(params.id),
  };

  // --------------------------
  // INTERCEPTOR DE REQUISIÇÕES
  // --------------------------
  const interceptRequest = async (
    method: string,
    url: string,
    params: any = {},
    body: any = null
  ) => {
    console.log(`[MockAPI] ${method} ${url}`, { params, body });

    // Extrair a rota base e parâmetros da URL
    const urlParts = url.split("?");
    const path = urlParts[0];

    // Extrair IDs da URL (para rotas como /customers/:id)
    const pattern = /^\/([^/]+)(?:\/([^/]+)(?:\/([^/]+))?)?$/;
    const matches = path.match(pattern);

    if (!matches) {
      throw new Error(`Rota não encontrada: ${path}`);
    }

    const resource = matches[1]; // 'customers', 'products', 'sales'
    const id = matches[2]; // o ID, se presente
    const action = matches[3]; // uma ação, se presente (ex: 'cancel')

    // Construir a rota no formato esperado pelo router
    let route = `${method} /${resource}`;
    if (id) {
      if (action) {
        route = `${method} /${resource}/:id/${action}`;
      } else {
        route = `${method} /${resource}/:id`;
      }
    }

    // Buscar o handler para a rota
    const handler = routes[route as keyof typeof routes];
    if (!handler) {
      throw new Error(`Handler não encontrado para rota: ${route}`);
    }

    // Preparar parâmetros da rota
    const routeParams = id ? { id, ...params } : params;

    // Executar o handler
    try {
      const response = await handler(routeParams, body);
      return { data: response, status: 200 };
    } catch (error: any) {
      console.error(`[MockAPI] Erro:`, error);
      return {
        error: error.message || "Erro interno do servidor",
        status: 400,
      };
    }
  };

  // --------------------------
  // FUNÇÕES DE API EXPOSTAS
  // --------------------------
  const api = {
    get: (url: string, options: any = {}) =>
      interceptRequest("GET", url, options.params),

    post: (url: string, data: any, options: any = {}) =>
      interceptRequest("POST", url, options.params, data),

    put: (url: string, data: any, options: any = {}) =>
      interceptRequest("PUT", url, options.params, data),

    delete: (url: string, options: any = {}) =>
      interceptRequest("DELETE", url, options.params),

    // Funções diretas para acessar os dados (útil para desenvolvimento)
    getMockData: () => ({
      customers,
      products,
      sales,
    }),
  };

  return {
    provide: {
      mockApi: api,
    },
  };
});
