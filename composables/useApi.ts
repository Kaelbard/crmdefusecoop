import { useNotification } from "./useNotification";

/**
 * Composable para gerenciar chamadas de API com tratamento de erros e carregamento
 */
export function useApi<T = any>() {
  const { $api } = useNuxtApp();
  const notification = useNotification();

  // Estado de carregamento para controlar UI
  const loading = ref(false);

  // Estado de erro
  const error = ref<Error | null>(null);

  // Estado do resultado
  const data = ref<T | null>(null);

  /**
   * Executa uma chamada GET para a API
   * @param endpoint Endpoint da API
   * @param options Opções adicionais
   * @param showErrorNotification Se deve mostrar notificação de erro
   */
  const get = async (
    endpoint: string,
    options: any = {},
    showErrorNotification: boolean = true
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get(endpoint, options);
      data.value = response.data.value;
      return response.data.value;
    } catch (err: any) {
      error.value = err;
      if (showErrorNotification) {
        notification.error(
          `Erro ao buscar dados: ${err.message || "Erro desconhecido"}`
        );
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Executa uma chamada POST para a API
   * @param endpoint Endpoint da API
   * @param payload Dados a serem enviados
   * @param options Opções adicionais
   * @param showSuccessNotification Se deve mostrar notificação de sucesso
   * @param showErrorNotification Se deve mostrar notificação de erro
   */
  const post = async (
    endpoint: string,
    payload: any,
    options: any = {},
    showSuccessNotification: boolean = false,
    showErrorNotification: boolean = true
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.post(endpoint, payload, options);
      data.value = response.data.value;

      if (showSuccessNotification) {
        notification.success("Operação realizada com sucesso!");
      }

      return response.data.value;
    } catch (err: any) {
      error.value = err;
      if (showErrorNotification) {
        notification.error(
          `Erro ao enviar dados: ${err.message || "Erro desconhecido"}`
        );
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Executa uma chamada PUT para a API
   * @param endpoint Endpoint da API
   * @param payload Dados a serem enviados
   * @param options Opções adicionais
   * @param showSuccessNotification Se deve mostrar notificação de sucesso
   * @param showErrorNotification Se deve mostrar notificação de erro
   */
  const put = async (
    endpoint: string,
    payload: any,
    options: any = {},
    showSuccessNotification: boolean = false,
    showErrorNotification: boolean = true
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.put(endpoint, payload, options);
      data.value = response.data.value;

      if (showSuccessNotification) {
        notification.success("Alteração realizada com sucesso!");
      }

      return response.data.value;
    } catch (err: any) {
      error.value = err;
      if (showErrorNotification) {
        notification.error(
          `Erro ao atualizar dados: ${err.message || "Erro desconhecido"}`
        );
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Executa uma chamada DELETE para a API
   * @param endpoint Endpoint da API
   * @param options Opções adicionais
   * @param showSuccessNotification Se deve mostrar notificação de sucesso
   * @param showErrorNotification Se deve mostrar notificação de erro
   */
  const del = async (
    endpoint: string,
    options: any = {},
    showSuccessNotification: boolean = false,
    showErrorNotification: boolean = true
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.delete(endpoint, options);

      if (showSuccessNotification) {
        notification.success("Item removido com sucesso!");
      }

      return response.data.value;
    } catch (err: any) {
      error.value = err;
      if (showErrorNotification) {
        notification.error(
          `Erro ao remover item: ${err.message || "Erro desconhecido"}`
        );
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    get,
    post,
    put,
    del,
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
  };
}
