import axios from 'axios';
import type { ApiResponse, LoginCredentials, RegisterData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    api.post<ApiResponse>('/auth/login', credentials),
  
  register: (data: RegisterData) =>
    api.post<ApiResponse>('/auth/register', data),
  
  getProfile: () =>
    api.get<ApiResponse>('/auth/profile'),
  
  updateProfile: (data: FormData) =>
    api.put<ApiResponse>('/auth/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Products API
export const productsAPI = {
  getAll: (params?: { category?: string; search?: string; page?: number; limit?: number }) =>
    api.get<ApiResponse>('/products', { params }),
  
  getById: (id: string) =>
    api.get<ApiResponse>(`/products/${id}`),
  
  create: (data: FormData) =>
    api.post<ApiResponse>('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  update: (id: string, data: FormData) =>
    api.put<ApiResponse>(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  delete: (id: string) =>
    api.delete<ApiResponse>(`/products/${id}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () =>
    api.get<ApiResponse>('/categories'),
  
  create: (data: { name: string }) =>
    api.post<ApiResponse>('/categories', data),
  
  update: (id: string, data: { name: string }) =>
    api.put<ApiResponse>(`/categories/${id}`, data),
  
  delete: (id: string) =>
    api.delete<ApiResponse>(`/categories/${id}`),
};

// Cart API
export const cartAPI = {
  getItems: () =>
    api.get<ApiResponse>('/cart'),
  
  addItem: (data: { productId: string; quantity: number }) =>
    api.post<ApiResponse>('/cart', data),
  
  updateItem: (id: string, data: { quantity: number }) =>
    api.put<ApiResponse>(`/cart/${id}`, data),
  
  removeItem: (id: string) =>
    api.delete<ApiResponse>(`/cart/${id}`),
  
  clear: () =>
    api.delete<ApiResponse>('/cart'),
};

// Payments API
export const paymentsAPI = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get<ApiResponse>('/payments', { params }),
  
  create: (data: { amount: number }) =>
    api.post<ApiResponse>('/payments', data),
  
  approve: (id: string) =>
    api.put<ApiResponse>(`/payments/${id}/approve`),
  
  reject: (id: string) =>
    api.put<ApiResponse>(`/payments/${id}/reject`),
  
  confirm: (id: string) =>
    api.put<ApiResponse>(`/payments/${id}/confirm`),
};

// Audit API
export const auditAPI = {
  getLogs: (params?: { page?: number; limit?: number; entity?: string; action?: string }) =>
    api.get<ApiResponse>('/audit', { params }),
};
