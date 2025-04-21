<template>
  <div>
    <Line :data="props.chartData" :options="mergedOptions" />
  </div>
</template>

<script setup lang="ts">
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
  type ChartOptions,
} from "chart.js";

// Registrar componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: (number | null)[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    tension: number;
  }[];
}

// Props para receber dados e opções
const props = defineProps({
  chartData: {
    type: Object as PropType<ChartData>,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

// Opções padrão para o gráfico
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
      ticks: {
        callback: function (value: number) {
          return "R$ " + value.toLocaleString("pt-BR");
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 20,
        fontColor: "#6B7280",
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          label += "R$ " + context.parsed.y.toLocaleString("pt-BR");
          return label;
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
} as ChartOptions<"line">;

// Mesclar opções padrão com opções personalizadas
const mergedOptions = computed(() => {
  return { ...defaultOptions, ...props.options };
});
</script>
