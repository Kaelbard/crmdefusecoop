export interface Service extends BaseEntity {
  name: string;
  type: 'consulting' | 'maintenance' | 'training' | 'installation' | 'support' | 'development' | 'design' | 'others';
  price: number;
  duration: number; // em minutos
  description?: string;
  status: 'available' | 'unavailable';
  professional?: string;
  requirements?: string[];
}