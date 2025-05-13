import { defineStore } from "pinia";

interface Sale {
  id: number;
  customerName: string;
  date: string;
  total: number;
  items: number;
}

interface Product {
  id: number;
  name: string;
  salesCount: number;
  salesTrend: number;
  revenue: number;
  stock: number;
}

interface Metrics {
  totalSales: number;
  averageTicket: number;
  totalCustomers: number;
  salesGrowth: number;
}

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    metrics: {
      totalSales: 125000,
      averageTicket: 250,
      totalCustomers: 500,
      salesGrowth: 15.8,
    } as Metrics,

    recentSales: [
      {
        id: 1,
        customerName: "João Silva",
        date: "2024-01-15T10:30:00",
        total: 350.0,
        items: 3,
      },
      {
        id: 2,
        customerName: "Maria Santos",
        date: "2024-01-15T09:15:00",
        total: 520.0,
        items: 4,
      },
      {
        id: 3,
        customerName: "Pedro Oliveira",
        date: "2024-01-14T16:45:00",
        total: 180.0,
        items: 2,
      },
      {
        id: 4,
        customerName: "Ana Costa",
        date: "2024-01-14T14:20:00",
        total: 890.0,
        items: 6,
      },
      {
        id: 5,
        customerName: "Carlos Ferreira",
        date: "2024-01-14T11:00:00",
        total: 450.0,
        items: 3,
      },
    ] as Sale[],

    products: [
      {
        id: 1,
        name: "Produto A",
        salesCount: 120,
        salesTrend: 12.5,
        revenue: 12000.0,
        stock: 25,
      },
      {
        id: 2,
        name: "Produto B",
        salesCount: 98,
        salesTrend: -5.2,
        revenue: 9800.0,
        stock: 15,
      },
      {
        id: 3,
        name: "Produto C",
        salesCount: 76,
        salesTrend: 8.7,
        revenue: 7600.0,
        stock: 30,
      },
      {
        id: 4,
        name: "Produto D",
        salesCount: 65,
        salesTrend: 3.2,
        revenue: 6500.0,
        stock: 8,
      },
    ] as Product[],

    salesData: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      datasets: [
        {
          label: "Vendas",
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
        },
      ],
    },
  }),

  actions: {
    async refreshMetrics() {
      // Simulando uma atualização com dados aleatórios
      this.metrics.totalSales += Math.random() * 1000;
      this.metrics.averageTicket += Math.random() * 10;
      this.metrics.totalCustomers += Math.floor(Math.random() * 5);
      this.metrics.salesGrowth += Math.random() * 2 - 1;
    },

    async refreshRecentSales() {
      // Simulando uma nova venda
      const newSale: Sale = {
        id: this.recentSales.length + 1,
        customerName: "Novo Cliente",
        date: new Date().toISOString(),
        total: Math.random() * 1000,
        items: Math.floor(Math.random() * 5) + 1,
      };
      this.recentSales.unshift(newSale);
      if (this.recentSales.length > 5) {
        this.recentSales.pop();
      }
    },

    async refreshProducts() {
      // Atualizando dados dos produtos
      this.products.forEach((product) => {
        product.salesCount += Math.floor(Math.random() * 5);
        product.salesTrend += Math.random() * 4 - 2;
        product.revenue += Math.random() * 500;
        product.stock += Math.floor(Math.random() * 3) - 1;
      });
    },

    async refreshSalesChart() {
      // Atualizando dados do gráfico
      const lastValue =
        this.salesData.datasets[0].data[
          this.salesData.datasets[0].data.length - 1
        ];
      const newValue = lastValue + Math.random() * 5000 - 2500;
      this.salesData.datasets[0].data = [
        ...this.salesData.datasets[0].data.slice(1),
        newValue,
      ];
    },

    async refreshAll() {
      await Promise.all([
        this.refreshMetrics(),
        this.refreshRecentSales(),
        this.refreshProducts(),
        this.refreshSalesChart(),
      ]);
    },
  },
});
