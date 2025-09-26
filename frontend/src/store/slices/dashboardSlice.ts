import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DashboardStatistics {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  newUsersToday: number;
  revenueGrowth: number;
  recentOrders: Array<{
    id: string;
    customer: string;
    amount: number;
    status: string;
    createdAt: string;
  }>;
}

interface DashboardState {
  statistics: DashboardStatistics | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  statistics: null,
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStatisticsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDashboardStatisticsSuccess: (state, action: PayloadAction<DashboardStatistics>) => {
      state.isLoading = false;
      state.statistics = action.payload;
      state.error = null;
    },
    fetchDashboardStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardStatisticsRequest,
  fetchDashboardStatisticsSuccess,
  fetchDashboardStatisticsFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
