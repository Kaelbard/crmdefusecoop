import { defineStore } from "pinia";

interface SaleItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  total: number;
}

interface SaleService {
  id: number;
  serviceId: number;
  price: number;
}

interface Sale {
  id: number;
  code: string;
  customerId: number;
  date: string;
  items: SaleItem[];
  services: SaleService[];
  subtotal: number;
  discount: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  notes: string;
}

export const useSalesStore = defineStore("sales", {
  state: () => ({
    sales: [
      {
        id: 1,
        code: "VDA-001",
        customerId: 1,
        date: "2024-02-20",
        items: [
          {
            id: 1,
            productId: 1,
            quantity: 2,
            price: 999.99,
            total: 1999.98,
          },
        ],
        services: [
          {
            id: 1,
            serviceId: 1,
            price: 199.99,
          },
        ],
        subtotal: 2199.97,
        discount: 100,
        total: 2099.97,
        status: "completed",
        notes: "Venda realizada com sucesso",
      },
      {
        id: 2,
        code: "VDA-002",
        customerId: 2,
        date: "2024-02-21",
        items: [
          {
            id: 2,
            productId: 2,
            quantity: 3,
            price: 149.99,
            total: 449.97,
          },
        ],
        services: [
          {
            id: 2,
            serviceId: 2,
            price: 299.99,
          },
        ],
        subtotal: 749.96,
        discount: 50,
        total: 699.96,
        status: "pending",
        notes: "Aguardando confirmação de pagamento",
      },
    ] as Sale[],
  }),

  actions: {
    async fetchSales() {
      // TODO: Implementar chamada à API
      return this.sales;
    },

    async createSale(sale: Omit<Sale, "id" | "code">) {
      const newSale = {
        id: this.sales.length + 1,
        code: `VDA-${String(this.sales.length + 1).padStart(3, "0")}`,
        ...sale,
      };
      this.sales.push(newSale);
      return newSale;
    },

    async updateSale(sale: Sale) {
      const index = this.sales.findIndex((s) => s.id === sale.id);
      if (index !== -1) {
        this.sales[index] = sale;
        return sale;
      }
      throw new Error("Sale not found");
    },

    async completeSale(id: number) {
      const sale = this.sales.find((s) => s.id === id);
      if (sale && sale.status === "pending") {
        sale.status = "completed";
        return sale;
      }
      throw new Error("Sale not found or already completed/cancelled");
    },

    async cancelSale(id: number) {
      const sale = this.sales.find((s) => s.id === id);
      if (sale && sale.status === "pending") {
        sale.status = "cancelled";
        return sale;
      }
      throw new Error("Sale not found or already completed/cancelled");
    },
  },
});
