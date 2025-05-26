import { defineStore } from "pinia";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  sku: string;
  barcode: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Produto 1",
        category: "Eletrônicos",
        price: 999.99,
        stock: 50,
        description: "Descrição detalhada do Produto 1",
        sku: "SKU001",
        barcode: "7891234567890",
        weight: 1.5,
        dimensions: {
          length: 30,
          width: 20,
          height: 10,
        },
      },
      {
        id: 2,
        name: "Produto 2",
        category: "Acessórios",
        price: 149.99,
        stock: 100,
        description: "Descrição detalhada do Produto 2",
        sku: "SKU002",
        barcode: "7891234567891",
        weight: 0.5,
        dimensions: {
          length: 15,
          width: 10,
          height: 5,
        },
      },
    ] as Product[],
  }),

  actions: {
    async fetchProducts() {
      // TODO: Implementar chamada à API
      return this.products;
    },

    async createProduct(product: Omit<Product, "id">) {
      const newProduct = {
        id: this.products.length + 1,
        ...product,
      };
      this.products.push(newProduct);
      return newProduct;
    },

    async updateProduct(product: Product) {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
        return product;
      }
      throw new Error("Product not found");
    },

    async deleteProduct(id: number) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
        return true;
      }
      throw new Error("Product not found");
    },
  },
});
