import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
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
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string, role?: string) => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Products API
export const productsAPI = {
  getProducts: async (params?: { page?: number; limit?: number; categoryId?: string; search?: string }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData: FormData) => {
    const response = await api.post('/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  updateProduct: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};

// Categories API
export const categoriesAPI = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  createCategory: async (categoryData: { name: string; description?: string }) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
  
  updateCategory: async (id: string, categoryData: { name: string; description?: string }) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },
  
  deleteCategory: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
  
  addToCart: async (productId: string, quantity: number = 1) => {
    const response = await api.post('/cart/add', { productId, quantity });
    return response.data;
  },
  
  updateCartItem: async (itemId: string, quantity: number) => {
    const response = await api.put(`/cart/item/${itemId}`, { quantity });
    return response.data;
  },
  
  removeFromCart: async (itemId: string) => {
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data;
  },
  
  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  }
};

// Orders API
export const ordersAPI = {
  createOrder: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  getOrder: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Admin endpoints
  getAllOrders: async (params?: { page?: number; limit?: number; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    
    const response = await api.get(`/orders/admin/all?${queryParams.toString()}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string) => {
    const response = await api.put(`/orders/admin/${id}/status`, { status });
    return response.data;
  }
};

// Users API for super admin
export const usersAPI = {
  getAllUsers: async (params?: { page?: number; limit?: number; role?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.role) queryParams.append('role', params.role);
    
    const response = await api.get(`/users/admin/all?${queryParams.toString()}`);
    return response.data;
  },

  updateUserRole: async (id: string, role: string) => {
    const response = await api.put(`/users/admin/${id}/role`, { role });
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/admin/${id}`);
    return response.data;
  }
};

// Dashboard API
export const dashboardAPI = {
  getStatistics: async () => {
    try {
      // Try to get data from multiple endpoints with error handling
      const responses = await Promise.allSettled([
        api.get('/products?limit=1000'),
        api.get('/orders/admin/all?limit=1000'),
        api.get('/users/admin/all?limit=1000')
      ]);

      // Extract data with fallbacks
      const productsData = responses[0].status === 'fulfilled' ? responses[0].value.data : {};
      const ordersData = responses[1].status === 'fulfilled' ? responses[1].value.data : {};
      const usersData = responses[2].status === 'fulfilled' ? responses[2].value.data : {};

      // Handle different possible response structures
      const products = productsData.products || productsData.data || [];
      const orders = ordersData.orders || ordersData.data || [];
      const users = usersData.users || usersData.data || [];

      console.log('Dashboard API Debug:', { products, orders, users });

      // Calculate statistics
      const totalProducts = Array.isArray(products) ? products.length : 0;
      const totalOrders = Array.isArray(orders) ? orders.length : 0;
      const totalUsers = Array.isArray(users) ? users.length : 0;
      
      // Calculate total revenue from orders
      const totalRevenue = Array.isArray(orders) ? orders.reduce((sum: number, order) => {
        const orderTotal = parseFloat(order.total || order.amount || 0);
        return sum + orderTotal;
      }, 0) : 0;

      // Count orders by status
      const pendingOrders = Array.isArray(orders) ? 
        orders.filter((order) => order.status === 'PENDING').length : 0;
      
      // Count low stock products (less than 10 items)
      const lowStockProducts = Array.isArray(products) ? 
        products.filter((product) => (product.stock || 0) < 10).length : 0;

      // Get recent orders (last 5)
      const recentOrders = Array.isArray(orders) ? orders
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map((order) => ({
          id: order.id,
          customer: order.user?.name || 'Unknown',
          amount: parseFloat(order.total || order.amount || 0),
          status: (order.status || 'pending').toLowerCase(),
          createdAt: order.createdAt
        })) : [];

      // Calculate revenue growth (mock calculation - would need historical data)
      const revenueGrowth = 12.5;

      // Count new users today
      const today = new Date();
      const newUsersToday = Array.isArray(users) ? users.filter((user) => {
        if (!user.createdAt) return false;
        const userDate = new Date(user.createdAt);
        return userDate.toDateString() === today.toDateString();
      }).length : 0;

      const result = {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
        pendingOrders,
        lowStockProducts,
        newUsersToday,
        revenueGrowth,
        recentOrders
      };

      console.log('Dashboard Statistics:', result);
      return result;

    } catch (error) {
      console.error('Dashboard API Error:', error);
      // Return fallback data
      return {
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        lowStockProducts: 0,
        newUsersToday: 0,
        revenueGrowth: 0,
        recentOrders: []
      };
    }
  }
};

export default api;
