import { useNotification } from "./useNotification";
import { useApi } from "./useApi";

/**
 * Opções para o composable de formulário
 */
interface UseFormOptions<T> {
  initialData: T;
  endpoint: string;
  redirectTo?: string;
  successMessage?: string;
  errorMessage?: string;
  transform?: (data: T) => any;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

/**
 * Composable para gerenciar formulários
 */
export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
) {
  const {
    initialData,
    endpoint,
    redirectTo,
    successMessage = "Operação realizada com sucesso!",
    errorMessage = "Erro ao processar a operação",
    transform,
    onSuccess,
    onError,
  } = options;

  // Composables
  const notification = useNotification();
  const api = useApi();
  const router = useRouter();

  // Estado do formulário
  const formData = ref<T>({ ...initialData });
  const isLoading = ref(false);
  const errors = ref<Record<string, string>>({});
  const isSubmitted = ref(false);

  /**
   * Reseta o formulário para os valores iniciais
   */
  const resetForm = () => {
    formData.value = { ...initialData };
    errors.value = {};
    isSubmitted.value = false;
  };

  /**
   * Define um valor no formulário
   */
  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    formData.value[field] = value;

    // Limpar erro do campo quando alterado
    if (errors.value[field as string]) {
      delete errors.value[field as string];
    }
  };

  /**
   * Verifica se o campo tem erro
   */
  const hasError = (field: keyof T): boolean => {
    return !!errors.value[field as string];
  };

  /**
   * Obtém a mensagem de erro do campo
   */
  const getError = (field: keyof T): string => {
    return errors.value[field as string] || "";
  };

  /**
   * Adiciona erros ao formulário
   */
  const setErrors = (fieldErrors: Record<string, string>) => {
    errors.value = { ...fieldErrors };
  };

  /**
   * Verifica se o formulário tem algum erro
   */
  const hasErrors = computed(() => Object.keys(errors.value).length > 0);

  /**
   * Salva o formulário (create/update)
   */
  const saveForm = async (isNew: boolean = true): Promise<boolean> => {
    isLoading.value = true;
    isSubmitted.value = true;
    errors.value = {};

    try {
      // Transformar dados se necessário
      const payload = transform ? transform(formData.value) : formData.value;

      // Determinar método HTTP com base em isNew
      const method = isNew ? api.post : api.put;
      const apiEndpoint = isNew ? endpoint : `${endpoint}/${formData.value.id}`;

      // Enviar dados
      const response = await method(apiEndpoint, payload);

      // Notificação de sucesso
      notification.success(successMessage);

      // Callback de sucesso
      if (onSuccess) {
        onSuccess(response);
      }

      // Redirecionamento se configurado
      if (redirectTo) {
        router.push(redirectTo);
      }

      return true;
    } catch (error: any) {
      console.error("Erro ao salvar formulário:", error);

      // Se o erro contém validações de campo, mapear para errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }

      // Notificação de erro
      notification.error(errorMessage);

      // Callback de erro
      if (onError) {
        onError(error);
      }

      return false;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Carrega dados existentes
   */
  const loadData = async (id: string) => {
    isLoading.value = true;

    try {
      const response = await api.get(`${endpoint}/${id}`);
      formData.value = response;
      return response;
    } catch (error) {
      notification.error("Erro ao carregar dados");
      console.error("Erro ao carregar dados:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    formData,
    isLoading,
    errors,
    isSubmitted,
    hasErrors,
    setValue,
    hasError,
    getError,
    setErrors,
    saveForm,
    resetForm,
    loadData,
  };
}
