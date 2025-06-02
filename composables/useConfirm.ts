// composables/useConfirm.ts
export const useConfirm = () => {
  const { openModal, closeModal } = useUiStore();

  const confirm = (
    title: string,
    message: string,
    options: {
      confirmText?: string;
      cancelText?: string;
      type?: "danger" | "warning" | "info";
    } = {}
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const {
        confirmText = "Confirmar",
        cancelText = "Cancelar",
        type = "info",
      } = options;

      // Para uma implementação completa, seria necessário um modal de confirmação
      // Por enquanto, usamos o confirm nativo do browser
      const result = window.confirm(`${title}\n\n${message}`);
      resolve(result);
    });
  };

  const confirmDelete = (itemName?: string): Promise<boolean> => {
    const message = itemName
      ? `Tem certeza que deseja excluir "${itemName}"?`
      : "Tem certeza que deseja excluir este item?";

    return confirm(
      "Confirmar Exclusão",
      `${message}\n\nEsta ação não pode ser desfeita.`,
      {
        confirmText: "Excluir",
        cancelText: "Cancelar",
        type: "danger",
      }
    );
  };

  return {
    confirm,
    confirmDelete,
  };
};
