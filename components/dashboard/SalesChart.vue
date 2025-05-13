<template>
  <Card class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Vendas por Período</h3>
      <div class="flex space-x-2">
        <Button variant="secondary" size="sm" @click="updateChartData">
          Atualizar
        </Button>
      </div>
    </div>

    <div class="h-80">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../../stores/dashboard";
import Card from "../ui/Card.vue";
import Button from "../ui/Button.vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const store = useDashboardStore();
const { salesData } = storeToRefs(store);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: (context: any) => {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number) => {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value);
        },
      },
    },
  },
};

const chartData = computed(() => salesData.value);

// Função para atualizar dados baseado no período selecionado
const updateChartData = async () => {
  await store.refreshSalesChart();
};
</script>
