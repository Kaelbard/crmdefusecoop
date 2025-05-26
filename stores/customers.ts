import { defineStore } from "pinia";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  zipCode: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  status: "active" | "inactive";
}

export const useCustomersStore = defineStore("customers", {
  state: () => ({
    customers: [
      {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        document: "123.456.789-00",
        zipCode: "01234-567",
        address: "Rua A, 123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        status: "active",
      },
      {
        id: 2,
        name: "Maria Santos",
        email: "maria@email.com",
        phone: "(11) 88888-8888",
        document: "987.654.321-00",
        zipCode: "89012-345",
        address: "Rua B, 456",
        neighborhood: "Vila Nova",
        city: "São Paulo",
        state: "SP",
        status: "active",
      },
    ] as Customer[],
  }),

  actions: {
    async fetchCustomers() {
      // TODO: Implementar chamada à API
      return this.customers;
    },

    async createCustomer(customer: Omit<Customer, "id">) {
      const newCustomer = {
        id: this.customers.length + 1,
        ...customer,
      };
      this.customers.push(newCustomer);
      return newCustomer;
    },

    async updateCustomer(customer: Customer) {
      const index = this.customers.findIndex((c) => c.id === customer.id);
      if (index !== -1) {
        this.customers[index] = customer;
        return customer;
      }
      throw new Error("Customer not found");
    },

    async deleteCustomer(id: number) {
      const index = this.customers.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.customers.splice(index, 1);
        return true;
      }
      throw new Error("Customer not found");
    },
  },
});
