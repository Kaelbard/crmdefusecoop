/**
 * Tipos de notificação
 */
export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

/**
 * Interface para uma notificação
 */
export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  timeout?: number;
}

/**
 * Opções para criar uma notificação
 */
export interface NotificationOptions {
  title?: string;
  timeout?: number;
  onClose?: () => void;
}

/**
 * Composable para gerenciar notificações da aplicação
 */
export function useNotification() {
  // Em uma implementação real, poderíamos usar um plugin de notificações ou o store para gerenciar estado
  // Por enquanto, vamos implementar uma versão simples

  // Gera um ID único para a notificação
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  /**
   * Cria uma notificação de sucesso
   */
  const success = (message: string, options?: NotificationOptions) => {
    console.log("🟢 SUCCESS:", message);
    // Aqui você integraria com um sistema real de notificações
    // Por enquanto, apenas logamos no console

    return {
      id: generateId(),
      type: NotificationType.SUCCESS,
      message,
      title: options?.title || "Sucesso",
      timeout: options?.timeout || 3000,
    };
  };

  /**
   * Cria uma notificação de erro
   */
  const error = (message: string, options?: NotificationOptions) => {
    console.log("🔴 ERROR:", message);

    return {
      id: generateId(),
      type: NotificationType.ERROR,
      message,
      title: options?.title || "Erro",
      timeout: options?.timeout || 5000,
    };
  };

  /**
   * Cria uma notificação de aviso
   */
  const warning = (message: string, options?: NotificationOptions) => {
    console.log("🟠 WARNING:", message);

    return {
      id: generateId(),
      type: NotificationType.WARNING,
      message,
      title: options?.title || "Aviso",
      timeout: options?.timeout || 4000,
    };
  };

  /**
   * Cria uma notificação informativa
   */
  const info = (message: string, options?: NotificationOptions) => {
    console.log("🔵 INFO:", message);

    return {
      id: generateId(),
      type: NotificationType.INFO,
      message,
      title: options?.title || "Informação",
      timeout: options?.timeout || 3000,
    };
  };

  /**
   * Cria uma notificação personalizada
   */
  const notify = (
    type: NotificationType,
    message: string,
    options?: NotificationOptions
  ) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return success(message, options);
      case NotificationType.ERROR:
        return error(message, options);
      case NotificationType.WARNING:
        return warning(message, options);
      case NotificationType.INFO:
        return info(message, options);
      default:
        return info(message, options);
    }
  };

  return {
    success,
    error,
    warning,
    info,
    notify,
  };
}
