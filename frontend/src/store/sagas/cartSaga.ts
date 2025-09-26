import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';
import { cartAPI } from '../../services/api';
import { getErrorMessage } from '../../utils/typeGuards';
import {
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
} from '../slices/cartSlice';

function* fetchCartItemsSaga(): SagaIterator {
  try {
    const response = yield call(cartAPI.getCart);
    yield put(fetchCartItemsSuccess(response.cartItems || response.data?.cartItems || []));
  } catch (error: unknown) {
    yield put(fetchCartItemsFailure(getErrorMessage(error, 'Failed to fetch cart items')));
  }
}

function* addToCartSaga(action: PayloadAction<{ productId: string; quantity: number }>): SagaIterator {
  try {
    const { productId, quantity } = action.payload;
    const response = yield call(cartAPI.addToCart, productId, quantity);
    yield put(addToCartSuccess(response.cartItem || null));
    
    // Fetch updated cart items after adding
    yield call(fetchCartItemsSaga);
  } catch (error: unknown) {
    yield put(addToCartFailure(getErrorMessage(error, 'Failed to add item to cart')));
  }
}

function* updateCartItemSaga(action: PayloadAction<{ id: string; quantity: number }>): SagaIterator {
  try {
    const { id, quantity } = action.payload;
    const response = yield call(cartAPI.updateCartItem, id, quantity);
    yield put(updateCartItemSuccess(response.data.cartItem || null));
  } catch (error: unknown) {
    yield put(updateCartItemFailure(getErrorMessage(error, 'Failed to update cart item')));
  }
}

function* removeFromCartSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(cartAPI.removeFromCart, action.payload);
    yield put(removeFromCartSuccess(action.payload));
  } catch (error: unknown) {
    yield put(removeFromCartFailure(getErrorMessage(error, 'Failed to remove item from cart')));
  }
}

function* clearCartSaga(): SagaIterator {
  try {
    yield call(cartAPI.clearCart);
    yield put(clearCartSuccess());
  } catch (error: unknown) {
    yield put(clearCartFailure(getErrorMessage(error, 'Failed to clear cart')));
  }
}

export function* cartSaga(): SagaIterator {
  yield takeLatest(fetchCartItemsRequest.type, fetchCartItemsSaga);
  yield takeLatest(addToCartRequest.type, addToCartSaga);
  yield takeLatest(updateCartItemRequest.type, updateCartItemSaga);
  yield takeLatest(removeFromCartRequest.type, removeFromCartSaga);
  yield takeLatest(clearCartRequest.type, clearCartSaga);
}
