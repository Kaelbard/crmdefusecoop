export type SaleItem = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export type SaleService =  {
  id: number;
  serviceId: number;
  serviceName: string;
  price: number;
  discount: number;
  total: number;
}

export interface Sale extends BaseEntity {
  code: string;
  customerId: number;
  customerName: string;
  date: string;
  items: SaleItem[];
  services: SaleService[];
  subtotal: number;
  totalDiscounts: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
  paymentMethod?: 'cash' | 'card' | 'pix' | 'transfer';
}

export type SaleStatus = Sale['status'];
