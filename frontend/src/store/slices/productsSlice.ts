import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, Category } from '../../types';

interface ProductsState {
  products: Product[];
  categories: Category[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    category?: string;
    search?: string;
  };
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  filters: {},
};


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Fetch Products actions
    fetchProductsRequest: (state, _action: PayloadAction<{ page?: number; limit?: number; categoryId?: string; search?: string }>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<{ products: Product[]; pagination: { page: number; limit: number; total: number; totalPages: number } }>) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Fetch Product by ID actions
    fetchProductByIdRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
      state.error = null;
    },
    fetchProductByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Create Product actions
    createProductRequest: (state, _action: PayloadAction<FormData>) => {
      state.isLoading = true;
      state.error = null;
    },
    createProductSuccess: (state, action: PayloadAction<Product>) => {
      state.isLoading = false;
      state.products.unshift(action.payload);
      state.error = null;
    },
    createProductFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Update Product actions
    updateProductRequest: (state, _action: PayloadAction<{ id: string; data: FormData }>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action: PayloadAction<Product>) => {
      state.isLoading = false;
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.currentProduct?.id === action.payload.id) {
        state.currentProduct = action.payload;
      }
      state.error = null;
    },
    updateProductFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Delete Product actions
    deleteProductRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.products = state.products.filter(p => p.id !== action.payload);
      if (state.currentProduct?.id === action.payload) {
        state.currentProduct = null;
      }
      state.error = null;
    },
    deleteProductFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Fetch Categories actions
    fetchCategoriesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Create Category actions
    createCategoryRequest: (state, _action: PayloadAction<{ name: string; description: string }>) => {
      state.isLoading = true;
      state.error = null;
    },
    createCategorySuccess: (state, action: PayloadAction<Category>) => {
      state.isLoading = false;
      state.categories.push(action.payload);
      state.error = null;
    },
    createCategoryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Update Category actions
    updateCategoryRequest: (state, _action: PayloadAction<{ id: string; data: { name: string; description: string } }>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateCategorySuccess: (state, action: PayloadAction<Category>) => {
      state.isLoading = false;
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      state.error = null;
    },
    updateCategoryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Delete Category actions
    deleteCategoryRequest: (state, ) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteCategorySuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.categories = state.categories.filter(c => c.id !== action.payload);
      state.error = null;
    },
    deleteCategoryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<{ category?: string; search?: string }>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
  clearError,
  setFilters,
  clearCurrentProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
