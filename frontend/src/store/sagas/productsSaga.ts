import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';
import { productsAPI, categoriesAPI } from '../../services/api';
import { getErrorMessage } from '../../utils/typeGuards';
import {
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
} from '../slices/productsSlice';

interface FetchProductsPayload {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

function* fetchProductsSaga(action: PayloadAction<FetchProductsPayload>): SagaIterator {
  try {
    const response = yield call(productsAPI.getProducts, action.payload);
    yield put(fetchProductsSuccess({
      products: response.products || [],
      pagination: response.pagination || { page: 1, limit: 12, total: 0, totalPages: 0 }
    }));
  } catch (error: unknown) {
    yield put(fetchProductsFailure(getErrorMessage(error, 'Failed to fetch products')));
  }
}

function* fetchProductByIdSaga(action: PayloadAction<string>): SagaIterator {
  try {
    const response = yield call(productsAPI.getProduct, action.payload);
    yield put(fetchProductByIdSuccess(response.product || null));
  } catch (error: unknown) {
    yield put(fetchProductByIdFailure(getErrorMessage(error, 'Failed to fetch product')));
  }
}

function* createProductSaga(action: PayloadAction<FormData>): SagaIterator {
  try {
    const response = yield call(productsAPI.createProduct, action.payload);
    yield put(createProductSuccess(response.product || null));
  } catch (error: unknown) {
    yield put(createProductFailure(getErrorMessage(error, 'Failed to create product')));
  }
}

function* updateProductSaga(action: PayloadAction<{ id: string; data: FormData }>): SagaIterator {
  try {
    const { id, data } = action.payload;
    const response = yield call(productsAPI.updateProduct, id, data);
    yield put(updateProductSuccess(response.product || null));
  } catch (error: unknown) {
    yield put(updateProductFailure(getErrorMessage(error, 'Failed to update product')));
  }
}

function* deleteProductSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(productsAPI.deleteProduct, action.payload);
    yield put(deleteProductSuccess(action.payload));
  } catch (error: unknown) {
    yield put(deleteProductFailure(getErrorMessage(error, 'Failed to delete product')));
  }
}

function* fetchCategoriesSaga(): SagaIterator {
  try {
    const response = yield call(categoriesAPI.getCategories);
    yield put(fetchCategoriesSuccess(response.categories || []));
  } catch (error: unknown) {
    yield put(fetchCategoriesFailure(getErrorMessage(error, 'Failed to fetch categories')));
  }
}

function* createCategorySaga(action: PayloadAction<{ name: string; description?: string }>): SagaIterator {
  try {
    const response = yield call(categoriesAPI.createCategory, action.payload);
    yield put(createCategorySuccess(response.category || null));
  } catch (error: unknown) {
    yield put(createCategoryFailure(getErrorMessage(error, 'Failed to create category')));
  }
}

function* updateCategorySaga(action: PayloadAction<{ id: string; data: { name: string; description?: string } }>): SagaIterator {
  try {
    const response = yield call(categoriesAPI.updateCategory, action.payload.id, action.payload.data);
    yield put(updateCategorySuccess(response.category || null));
  } catch (error: unknown) {
    yield put(updateCategoryFailure(getErrorMessage(error, 'Failed to update category')));
  }
}

function* deleteCategorySaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(categoriesAPI.deleteCategory, action.payload);
    yield put(deleteCategorySuccess(action.payload));
  } catch (error: unknown) {
    yield put(deleteCategoryFailure(getErrorMessage(error, 'Failed to delete category')));
  }
}

export function* productsSaga(): SagaIterator {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
  yield takeLatest(fetchProductByIdRequest.type, fetchProductByIdSaga);
  yield takeLatest(createProductRequest.type, createProductSaga);
  yield takeLatest(updateProductRequest.type, updateProductSaga);
  yield takeLatest(deleteProductRequest.type, deleteProductSaga);
  yield takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga);
  yield takeLatest(createCategoryRequest.type, createCategorySaga);
  yield takeLatest(updateCategoryRequest.type, updateCategorySaga);
  yield takeLatest(deleteCategoryRequest.type, deleteCategorySaga);
}
