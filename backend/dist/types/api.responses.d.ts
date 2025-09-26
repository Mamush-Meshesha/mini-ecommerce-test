import type { User, Product, Category, Order, PaymentRequest } from '@prisma/client';
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
export interface PaymentResponse {
    message: string;
    payments: PaymentRequest[];
}
export interface PaymentProcessedResponse {
    message: string;
    payments: PaymentRequest[];
    transactionId: string;
}
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
//# sourceMappingURL=api.responses.d.ts.map