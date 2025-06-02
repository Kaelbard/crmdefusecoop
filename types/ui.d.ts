export type TableHeader = {
  text: string;
  value: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export type NotificationItem ={
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  read?: boolean;
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
}

export type NotificationAction = {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary';
}

export type ModalOptions ={
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  persistent?: boolean;
}