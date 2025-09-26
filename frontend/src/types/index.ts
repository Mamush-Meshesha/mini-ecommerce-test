export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  stock: number;
  categoryId?: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  orderItems?: OrderItem[];
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'PENDING' | 'APPROVED_BY_ADMIN' | 'REJECTED_BY_ADMIN' | 'CONFIRMED_BY_SUPER_ADMIN';
  createdAt: string;
  updatedAt: string;
  approvedByAdminId?: string;
  confirmedBySuperAdminId?: string;
  user: User;
  admin?: User;
  superAdmin?: User;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  roleAtTime: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  timestamp: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  user?: User;
  token?: string;
  product?: Product;
  products?: Product[];
  categories?: Category[];
  category?: Category;
  cartItems?: CartItem[];
  cartItem?: CartItem;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}
