// stores/ui.ts
import { defineStore } from 'pinia';
import type { NotificationItem } from '~/types/ui';

interface UiState {
  sidebarOpen: boolean;
  notifications: NotificationItem[];
  loading: boolean;
  modals: Record<string, boolean>;
  theme: 'light' | 'dark';
  breadcrumbs: Array<{ label: string; to?: string }>;
}

interface Breadcrumb {
    label: string;
    to?: string;
}

interface ModalState {
    [key: string]: boolean;
}

interface UiGetters {
    hasNotifications(state: UiState): boolean;
    unreadNotifications(state: UiState): number;
    isModalOpen(state: UiState): (modalId: string) => boolean;
    isDarkMode(state: UiState): boolean;
}

interface UiActions {
    toggleSidebar(): void;
    openSidebar(): void;
    closeSidebar(): void;
    addNotification(notification: NotificationItem): void;
    removeNotification(id: string): void;
    markNotificationAsRead(id: string): void;
    clearNotifications(): void;
    setLoading(loading: boolean): void;
    openModal(modalId: string): void;
    closeModal(modalId: string): void;
    toggleModal(modalId: string): void;
    setTheme(theme: 'light' | 'dark'): void;
    toggleTheme(): void;
    setBreadcrumbs(breadcrumbs: Breadcrumb[]): void;
    addBreadcrumb(breadcrumb: Breadcrumb): void;
    clearBreadcrumbs(): void;
    notifySuccess(title: string, message: string): void;
    notifyError(title: string, message: string): void;
    notifyWarning(title: string, message: string): void;
    notifyInfo(title: string, message: string): void;
    initTheme(): void;
}

export const useUiStore = defineStore<'ui', UiState, {}, UiActions>('ui', {
    state: (): UiState => ({
        sidebarOpen: false,
        notifications: [],
        loading: false,
        modals: {},
        theme: 'light',
        breadcrumbs: [],
    }),

    getters: {
        hasNotifications: (state): boolean => state.notifications.length > 0,
        
        unreadNotifications: (state): number => 
            state.notifications.filter((n: NotificationItem) => !n.read).length,
        
        isModalOpen: (state): (modalId: string) => boolean => 
            (modalId: string) => !!state.modals[modalId],
        
        isDarkMode: (state): boolean => state.theme === 'dark',
    },

    actions: {
        toggleSidebar(): void {
            this.sidebarOpen = !this.sidebarOpen;
        },

        openSidebar(): void {
            this.sidebarOpen = true;
        },

        closeSidebar(): void {
            this.sidebarOpen = false;
        },

        addNotification(notification: NotificationItem): void {
            this.notifications.unshift(notification);
            
            // Limitar a 10 notificações
            if (this.notifications.length > 10) {
                this.notifications = this.notifications.slice(0, 10);
            }
        },

        removeNotification(id: string): void {
            const index: number = this.notifications.findIndex((n: NotificationItem) => n.id === id);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        },

        markNotificationAsRead(id: string): void {
            const notification = this.notifications.find((n: NotificationItem) => n.id === id);
            if (notification) {
                notification.read = true;
            }
        },

        clearNotifications(): void {
            this.notifications = [];
        },

        setLoading(loading: boolean): void {
            this.loading = loading;
        },

        openModal(modalId: string): void {
            this.modals[modalId] = true;
        },

        closeModal(modalId: string): void {
            this.modals[modalId] = false;
        },

        toggleModal(modalId: string): void {
            this.modals[modalId] = !this.modals[modalId];
        },

        setTheme(theme: 'light' | 'dark'): void {
            this.theme = theme;
            
            if (process.client) {
                localStorage.setItem('theme', theme);
                document.documentElement.classList.toggle('dark', theme === 'dark');
            }
        },

        toggleTheme(): void {
            this.setTheme(this.theme === 'light' ? 'dark' : 'light');
        },

        setBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
            this.breadcrumbs = breadcrumbs;
        },

        addBreadcrumb(breadcrumb: Breadcrumb): void {
            this.breadcrumbs.push(breadcrumb);
        },

        clearBreadcrumbs(): void {
            this.breadcrumbs = [];
        },

        // Métodos auxiliares para notificações comuns
        notifySuccess(title: string, message: string): void {
            this.addNotification({
                id: Date.now().toString(),
                type: 'success',
                title,
                message,
                duration: 5000,
            });
        },

        notifyError(title: string, message: string): void {
            this.addNotification({
                id: Date.now().toString(),
                type: 'error',
                title,
                message,
                duration: 10000,
            });
        },

        notifyWarning(title: string, message: string): void {
            this.addNotification({
                id: Date.now().toString(),
                type: 'warning',
                title,
                message,
                duration: 7000,
            });
        },

        notifyInfo(title: string, message: string): void {
            this.addNotification({
                id: Date.now().toString(),
                type: 'info',
                title,
                message,
                duration: 5000,
            });
        },

        // Inicialização do tema
        initTheme(): void {
            if (process.client) {
                const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                this.setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
            }
        },
    },
});