// plugins/chart.ts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

export default defineNuxtPlugin(() => {
  // Registrar componentes do Chart.js
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  // Configuração padrão para todos os gráficos
  ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif';
  ChartJS.defaults.color = '#6B7280'; // text-gray-500
  
  // Configuração padrão para tooltips
  ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(17, 24, 39, 0.9)'; // bg-gray-900
  ChartJS.defaults.plugins.tooltip.titleColor = '#F9FAFB'; // text-gray-50
  ChartJS.defaults.plugins.tooltip.bodyColor = '#F3F4F6'; // text-gray-100
  ChartJS.defaults.plugins.tooltip.cornerRadius = 8;
  
  // Configuração padrão para legendas
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  ChartJS.defaults.plugins.legend.labels.padding = 20;

  // Formatadores de moeda e número para tooltips
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  // Disponibilizar formatadores globalmente
  return {
    provide: {
      chartFormatters: {
        currency: formatCurrency,
        number: formatNumber,
      }
    }
  };
});