// composables/useNotification.ts
import type { NotificationItem } from '~/types/ui';
import { useUiStore } from '~/stores/ui';

export const useNotification = () => {
  const uiStore = useUiStore();

  const notify = (notification: Omit<NotificationItem, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const fullNotification: NotificationItem = {
      id,
      duration: 5000,
      ...notification,
    };

    uiStore.addNotification(fullNotification);

    if (fullNotification.duration && fullNotification.duration > 0) {
      setTimeout(() => {
        uiStore.removeNotification(id);
      }, fullNotification.duration);
    }

    return id;
  };

  const success = (title: string, message: string, duration?: number) => {
    return notify({
      type: 'success',
      title,
      message,
      duration,
    });
  };

  const error = (title: string, message: string, duration?: number) => {
    return notify({
      type: 'error',
      title,
      message,
      duration: duration || 10000, // Erros ficam mais tempo
    });
  };

  const warning = (title: string, message: string, duration?: number) => {
    return notify({
      type: 'warning',
      title,
      message,
      duration,
    });
  };

  const info = (title: string, message: string, duration?: number) => {
    return notify({
      type: 'info',
      title,
      message,
      duration,
    });
  };

  const remove = (id: string) => {
    uiStore.removeNotification(id);
  };

  const clear = () => {
    uiStore.clearNotifications();
  };

  return {
    notify,
    success,
    error,
    warning,
    info,
    remove,
    clear,
  };
};
