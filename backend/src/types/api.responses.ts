import { 
  User, 
  Product, 
  Category, 
  Order, 
  Payment, 
  ApiError, 
  SuccessMessage, 
  PaginatedResponse 
} from './api.types.js';

// Authentication Responses
export interface LoginResponse {
  message: string;
  token: string;
  refreshToken?: string;
  user: User;
}

export interface RefreshResponse {
  message: string;
  token: string;
  refreshToken?: string;
}

// User Responses
export interface UserResponse {
  message: string;
  user: User;
}

export interface UsersListResponse {
  message: string;
  users: User[];
  meta?: any;
}

export interface UserCreatedResponse {
  message: string;
  user: User;
}

// Product Responses
export interface ProductResponse {
  message: string;
  product: Product;
}

export interface ProductsListResponse {
  message: string;
  products: Product[];
  meta?: any;
}

export interface ProductCreatedResponse {
  message: string;
  product: Product;
}

// Category Responses
export interface CategoryResponse {
  message: string;
  category: Category;
}

export interface CategoriesListResponse {
  message: string;
  categories: Category[];
  meta?: any;
}

export interface CategoryCreatedResponse {
  message: string;
  category: Category;
}

// Order Responses
export interface OrderResponse {
  message: string;
  order: Order;
}

export interface OrdersListResponse {
  message: string;
  orders: Order[];
  meta?: any;
}

export interface OrderCreatedResponse {
  message: string;
  order: Order;
}

// Payment Responses
export interface PaymentResponse {
  message: string;
  payment: Payment;
}

export interface PaymentProcessedResponse {
  message: string;
  payment: Payment;
  transactionId: string;
}

// Common Error Response Types
export interface BadRequestResponse {
  message: string;
  code: 'BAD_REQUEST';
  timestamp: string;
}

export interface UnauthorizedResponse {
  message: string;
  code: 'UNAUTHORIZED';
  timestamp: string;
}

export interface ForbiddenResponse {
  message: string;
  code: 'FORBIDDEN';
  timestamp: string;
}

export interface NotFoundResponse {
  message: string;
  code: 'NOT_FOUND';
  timestamp: string;
}

export interface ConflictResponse {
  message: string;
  code: 'CONFLICT';
  timestamp: string;
}

export interface InternalServerErrorResponse {
  message: string;
  code: 'INTERNAL_ERROR';
  timestamp: string;
}
