import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';
import { ordersAPI } from '../../services/api';
import { getErrorMessage } from '../../utils/typeGuards';
import {
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
} from '../slices/ordersSlice';

interface CreateOrderPayload {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

function* createOrderSaga(action: PayloadAction<CreateOrderPayload>): SagaIterator {
  try {
    const response = yield call(ordersAPI.createOrder, action.payload);
    yield put(createOrderSuccess(response.data.order || null));
  } catch (error: unknown) {
    yield put(createOrderFailure(getErrorMessage(error, 'Failed to create order')));
  }
}

function* fetchOrdersSaga(): SagaIterator {
  try {
    const response = yield call(ordersAPI.getOrders);
    yield put(fetchOrdersSuccess(response.data.orders || []));
  } catch (error: unknown) {
    yield put(fetchOrdersFailure(getErrorMessage(error, 'Failed to fetch orders')));
  }
}

function* fetchOrderByIdSaga(action: PayloadAction<string>): SagaIterator {
  try {
    const response = yield call(ordersAPI.getOrder, action.payload);
    yield put(fetchOrderByIdSuccess(response.data.order || null));
  } catch (error: unknown) {
    yield put(fetchOrderByIdFailure(getErrorMessage(error, 'Failed to fetch order')));
  }
}

function* fetchAllOrdersSaga(action: PayloadAction<{ page?: number; limit?: number; status?: string }>): SagaIterator {
  try {
    const response = yield call(ordersAPI.getAllOrders, action.payload);
    yield put(fetchAllOrdersSuccess(response));
  } catch (error: unknown) {
    yield put(fetchAllOrdersFailure(getErrorMessage(error, 'Failed to fetch all orders')));
  }
}

function* updateOrderStatusSaga(action: PayloadAction<{ id: string; status: string }>): SagaIterator {
  try {
    const response = yield call(ordersAPI.updateOrderStatus, action.payload.id, action.payload.status);
    yield put(updateOrderStatusSuccess(response.order));
  } catch (error: unknown) {
    yield put(updateOrderStatusFailure(getErrorMessage(error, 'Failed to update order status')));
  }
}

export function* ordersSaga(): SagaIterator {
  yield takeLatest(createOrderRequest.type, createOrderSaga);
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersSaga);
  yield takeLatest(fetchOrderByIdRequest.type, fetchOrderByIdSaga);
  yield takeLatest(fetchAllOrdersRequest.type, fetchAllOrdersSaga);
  yield takeLatest(updateOrderStatusRequest.type, updateOrderStatusSaga);
}
