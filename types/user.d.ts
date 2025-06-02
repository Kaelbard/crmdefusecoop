export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
}

export type AuthUser = {
  user: User;
  token: string;
  refreshToken: string;
}

// types/customer.ts
export interface Customer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  document: string;
  zipCode: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  status: 'active' | 'inactive';
  totalPurchases?: number;
  lastPurchase?: string;
}

// types/product.ts
export interface Product extends BaseEntity {
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  sku: string;
  barcode?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isActive: boolean;
  minStock?: number;
}

export interface ProductMovement extends BaseEntity {
  productId: number;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  userId: number;
}