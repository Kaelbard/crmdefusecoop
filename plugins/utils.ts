export default defineNuxtPlugin(() => {
  // Utilitários globais
  const formatters = {
    currency: (value: number) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },

    number: (value: number) => {
      return new Intl.NumberFormat("pt-BR").format(value);
    },

    percentage: (value: number, decimals = 1) => {
      return `${value.toFixed(decimals)}%`;
    },

    date: (value: string | Date) => {
      const date = typeof value === "string" ? new Date(value) : value;
      return new Intl.DateTimeFormat("pt-BR").format(date);
    },

    datetime: (value: string | Date) => {
      const date = typeof value === "string" ? new Date(value) : value;
      return new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    },

    fileSize: (bytes: number) => {
      const sizes = ["Bytes", "KB", "MB", "GB"];
      if (bytes === 0) return "0 Bytes";
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (
        Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
      );
    },
  };

  const validators = {
    email: (value: string) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value);
    },

    cpf: (value: string) => {
      const cpf = value.replace(/\D/g, "");
      if (cpf.length !== 11) return false;

      // Verificar se todos os dígitos são iguais
      if (/^(\d)\1{10}$/.test(cpf)) return false;

      // Validar dígitos verificadores
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let digit = 11 - (sum % 11);
      if (digit === 10 || digit === 11) digit = 0;
      if (digit !== parseInt(cpf.charAt(9))) return false;

      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      digit = 11 - (sum % 11);
      if (digit === 10 || digit === 11) digit = 0;
      return digit === parseInt(cpf.charAt(10));
    },

    cnpj: (value: string) => {
      const cnpj = value.replace(/\D/g, "");
      if (cnpj.length !== 14) return false;

      // Verificar se todos os dígitos são iguais
      if (/^(\d)\1{13}$/.test(cnpj)) return false;

      // Validar primeiro dígito verificador
      let sum = 0;
      let weight = 2;
      for (let i = 11; i >= 0; i--) {
        sum += parseInt(cnpj.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
      }
      let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (digit !== parseInt(cnpj.charAt(12))) return false;

      // Validar segundo dígito verificador
      sum = 0;
      weight = 2;
      for (let i = 12; i >= 0; i--) {
        sum += parseInt(cnpj.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
      }
      digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      return digit === parseInt(cnpj.charAt(13));
    },

    phone: (value: string) => {
      const phone = value.replace(/\D/g, "");
      return phone.length === 10 || phone.length === 11;
    },

    required: (value: any) => {
      if (typeof value === "string") return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined;
    },

    minLength: (value: string, min: number) => {
      return value.length >= min;
    },

    maxLength: (value: string, max: number) => {
      return value.length <= max;
    },

    numeric: (value: string) => {
      return /^\d+$/.test(value);
    },

    decimal: (value: string) => {
      return /^\d+(\.\d+)?$/.test(value);
    },
  };

  const helpers = {
    generateId: () => {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    debounce: <T extends (...args: any[]) => any>(
      func: T,
      wait: number
    ): ((...args: Parameters<T>) => void) => {
      let timeout: NodeJS.Timeout;
      return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },

    throttle: <T extends (...args: any[]) => any>(
      func: T,
      limit: number
    ): ((...args: Parameters<T>) => void) => {
      let inThrottle: boolean;
      return (...args: Parameters<T>) => {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },

    copyToClipboard: async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        const { notifySuccess } = useNotification();
        notifySuccess("Copiado!", "Texto copiado para a área de transferência");
        return true;
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        const { notifyError } = useNotification();
        notifyError("Erro", "Falha ao copiar texto");
        return false;
      }
    },

    downloadFile: (data: any, filename: string, type = "application/json") => {
      const blob = new Blob(
        [typeof data === "string" ? data : JSON.stringify(data, null, 2)],
        { type }
      );
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },

    exportToCSV: (data: any[], filename: string) => {
      if (!data.length) return;

      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers.map((header) => `"${row[header] || ""}"`).join(",")
        ),
      ].join("\n");

      helpers.downloadFile(
        csvContent,
        filename.endsWith(".csv") ? filename : `${filename}.csv`,
        "text/csv"
      );
    },
  };

  return {
    provide: {
      formatters,
      validators,
      helpers,
    },
  };
});
