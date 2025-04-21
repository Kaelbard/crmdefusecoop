import { defineNuxtPlugin } from "nuxt/app";
import { Chart, registerables } from "chart.js";

/**
 * Plugin para configuração global do Chart.js
 */
export default defineNuxtPlugin(() => {
  // Registra todos os componentes necessários do Chart.js
  Chart.register(...registerables);

  // Configurações globais para todos os gráficos
  Chart.defaults.font.family = "Inter, system-ui, sans-serif";
  Chart.defaults.color = "#6B7280";
  Chart.defaults.borderColor = "#E5E7EB";
  Chart.defaults.plugins.tooltip.backgroundColor = "#1F2937";
  Chart.defaults.plugins.tooltip.bodyFont = {
    family: "Inter, system-ui, sans-serif",
    size: 13,
  };
  Chart.defaults.plugins.tooltip.titleFont = {
    family: "Inter, system-ui, sans-serif",
    size: 14,
    weight: "bold",
  };
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;

  // Configurações para gráficos de linha
  const lineChartOptions = {
    elements: {
      line: {
        tension: 0.4, // Curva suave nas linhas
        fill: false, // Não preencher área sob a linha
      },
      point: {
        radius: 4, // Tamanho dos pontos de dados
        hoverRadius: 6, // Tamanho dos pontos ao passar o mouse
      },
    },
  };

  // Para gráficos de barra, configurações devem seguir a estrutura correta
  const barChartOptions = {
    datasets: {
      bar: {
        barPercentage: 0.75,
        categoryPercentage: 0.8,
      },
    },
  };

  // Aplicar configurações globais
  // Usamos abordagem segura para TypeScript
  Object.assign(Chart.defaults, lineChartOptions);
  Object.assign(Chart.defaults, barChartOptions);

  // Função utilitária para formatar valores monetários
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Retorna utilitários e configurações para uso nos componentes
  return {
    provide: {
      chart: {
        formatCurrency,
      },
    },
  };
});
