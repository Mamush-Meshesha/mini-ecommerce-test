import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { productsSaga } from './productsSaga';
import { cartSaga } from './cartSaga';
import { ordersSaga } from './ordersSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    productsSaga(),
    cartSaga(),
    ordersSaga(),
  ]);
}
