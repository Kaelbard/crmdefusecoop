import { defineStore } from "pinia";

interface Service {
  id: number;
  name: string;
  type: string;
  price: number;
  duration: number; // em minutos
  description: string;
  status: "active" | "inactive";
  professional: string;
  requirements: string[];
}

export const useServicesStore = defineStore("services", {
  state: () => ({
    services: [
      {
        id: 1,
        name: "Serviço 1",
        type: "Consultoria",
        price: 199.99,
        duration: 60,
        description: "Descrição detalhada do Serviço 1",
        status: "active",
        professional: "Ana Silva",
        requirements: ["Agendamento prévio", "Documentação necessária"],
      },
      {
        id: 2,
        name: "Serviço 2",
        type: "Manutenção",
        price: 299.99,
        duration: 120,
        description: "Descrição detalhada do Serviço 2",
        status: "active",
        professional: "Carlos Santos",
        requirements: ["Equipamento disponível", "Local adequado"],
      },
    ] as Service[],
  }),

  actions: {
    async fetchServices() {
      // TODO: Implementar chamada à API
      return this.services;
    },

    async createService(service: Omit<Service, "id">) {
      const newService = {
        id: this.services.length + 1,
        ...service,
      };
      this.services.push(newService);
      return newService;
    },

    async updateService(service: Service) {
      const index = this.services.findIndex((s) => s.id === service.id);
      if (index !== -1) {
        this.services[index] = service;
        return service;
      }
      throw new Error("Service not found");
    },

    async deleteService(id: number) {
      const index = this.services.findIndex((s) => s.id === id);
      if (index !== -1) {
        this.services.splice(index, 1);
        return true;
      }
      throw new Error("Service not found");
    },
  },
});
