import type { User, Product, Category, CartItem } from '../types';

// Type guards for API responses
export const isUser = (value: unknown): value is User => {
  return typeof value === 'object' && value !== null && 'id' in value && 'email' in value;
};

export const isProduct = (value: unknown): value is Product => {
  return typeof value === 'object' && value !== null && 'id' in value && 'name' in value;
};

export const isCategory = (value: unknown): value is Category => {
  return typeof value === 'object' && value !== null && 'id' in value && 'name' in value;
};

export const isCartItem = (value: unknown): value is CartItem => {
  return typeof value === 'object' && value !== null && 'id' in value && 'quantity' in value;
};

// Error type guard
export const isErrorWithResponse = (error: unknown): error is { response: { data: { message: string } } } => {
  return typeof error === 'object' && 
         error !== null && 
         'response' in error && 
         typeof (error as any).response === 'object' &&
         (error as any).response !== null &&
         'data' in (error as any).response &&
         typeof (error as any).response.data === 'object' &&
         (error as any).response.data !== null &&
         'message' in (error as any).response.data;
};

// Safe error message extraction
export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (isErrorWithResponse(error)) {
    return error.response.data.message;
  }
  return fallback;
};
