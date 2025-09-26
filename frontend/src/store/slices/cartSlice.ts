import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  total: number;
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
  total: 0,
  itemCount: 0,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Fetch Cart Items actions
    fetchCartItemsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCartItemsSuccess: (state, action: PayloadAction<CartItem[]>) => {
      state.isLoading = false;
      state.items = action.payload;
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.error = null;
    },
    fetchCartItemsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Add to Cart actions
    addToCartRequest: (state, _action: PayloadAction<{ productId: string; quantity: number }>) => {
      state.isLoading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action: PayloadAction<CartItem>) => {
      state.isLoading = false;
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.error = null;
    },
    addToCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Update Cart Item actions
    updateCartItemRequest: (state, _action: PayloadAction<{ id: string; quantity: number }>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateCartItemSuccess: (state, action: PayloadAction<CartItem>) => {
      state.isLoading = false;
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.error = null;
    },
    updateCartItemFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Remove from Cart actions
    removeFromCartRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    removeFromCartSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.error = null;
    },
    removeFromCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Clear Cart actions
    clearCartRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    clearCartSuccess: (state) => {
      state.isLoading = false;
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      state.error = null;
    },
    clearCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Other actions
    clearError: (state) => {
      state.error = null;
    },
    calculateTotals: (state) => {
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
});

export const {
  fetchCartItemsRequest,
  fetchCartItemsSuccess,
  fetchCartItemsFailure,
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
  updateCartItemFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,
  clearError,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
