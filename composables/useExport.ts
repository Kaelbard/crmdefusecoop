// composables/useExport.ts
export const useExport = () => {
  const isExporting = ref(false);
  const { success, error } = useNotification();

  const exportToCSV = async (
    data: any[],
    filename: string,
    headers?: string[]
  ) => {
    if (!data.length) {
      error("Erro", "Nenhum dado disponível para exportação");
      return;
    }

    isExporting.value = true;

    try {
      const csvHeaders = headers || Object.keys(data[0]);
      const csvContent = [
        csvHeaders.join(","),
        ...data.map((row) =>
          csvHeaders
            .map((header) => {
              const value = row[header];
              return `"${String(value || "").replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        filename.endsWith(".csv") ? filename : `${filename}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      success(
        "Exportação Concluída",
        `Arquivo ${filename} foi baixado com sucesso`
      );
    } catch (err) {
      console.error("Export error:", err);
      error("Erro na Exportação", "Falha ao exportar dados");
    } finally {
      isExporting.value = false;
    }
  };

  const exportToExcel = async (
    data: any[],
    filename: string,
    sheetName = "Dados"
  ) => {
    if (!data.length) {
      error("Erro", "Nenhum dado disponível para exportação");
      return;
    }

    isExporting.value = true;

    try {
      // Para uma implementação completa, seria necessário uma biblioteca como xlsx
      // Por enquanto, vamos usar CSV como fallback
      await exportToCSV(data, filename.replace(".xlsx", ".csv"));
    } catch (err) {
      console.error("Excel export error:", err);
      error("Erro na Exportação", "Falha ao exportar para Excel");
    } finally {
      isExporting.value = false;
    }
  };

  const exportToPDF = async (data: any[], filename: string, title?: string) => {
    isExporting.value = true;

    try {
      // Para implementação completa, seria necessário uma biblioteca como jsPDF
      // Por enquanto, vamos simular a funcionalidade
      error(
        "Funcionalidade em Desenvolvimento",
        "Exportação para PDF será implementada em breve"
      );
    } catch (err) {
      console.error("PDF export error:", err);
      error("Erro na Exportação", "Falha ao exportar para PDF");
    } finally {
      isExporting.value = false;
    }
  };

  return {
    isExporting: readonly(isExporting),
    exportToCSV,
    exportToExcel,
    exportToPDF,
  };
};
