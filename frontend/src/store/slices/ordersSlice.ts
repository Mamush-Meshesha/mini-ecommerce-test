import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '../../types';

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Create Order actions
    createOrderRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
      state.error = null;
    },
    createOrderFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Fetch Orders actions
    fetchOrdersRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.error = null;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Fetch Order by ID actions
    fetchOrderByIdRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrderByIdSuccess: (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    fetchOrderByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    // Admin Orders actions
    fetchAllOrdersRequest: (state, _action: PayloadAction<{ page?: number; limit?: number; status?: string } | undefined>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchAllOrdersSuccess: (state, action: PayloadAction<{ orders: Order[]; pagination: { total: number; page: number; limit: number } }>) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.error = null;
    },
    fetchAllOrdersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Update Order Status actions
    updateOrderStatusRequest: (state, _action: PayloadAction<{ id: string; status: string }>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateOrderStatusSuccess: (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      state.error = null;
    },
    updateOrderStatusFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderByIdRequest,
  fetchOrderByIdSuccess,
  fetchOrderByIdFailure,
  fetchAllOrdersRequest,
  fetchAllOrdersSuccess,
  fetchAllOrdersFailure,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
  clearError,
  clearCurrentOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
