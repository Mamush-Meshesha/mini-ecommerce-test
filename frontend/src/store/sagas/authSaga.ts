import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';
import { authAPI } from '../../utils/api';
import { getErrorMessage } from '../../utils/typeGuards';
import type { LoginCredentials, RegisterData } from '../../types';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from '../slices/authSlice';

function* loginSaga(action: PayloadAction<LoginCredentials>): SagaIterator {
  try {
    const response = yield call(authAPI.login, action.payload);
    const { user, token } = response.data;
    
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (token) localStorage.setItem('token', token);
    
    yield put(loginSuccess({ user: user || null, token: token || null }));
  } catch (error: unknown) {
    yield put(loginFailure(getErrorMessage(error, 'Login failed')));
  }
}

function* registerSaga(action: PayloadAction<RegisterData>): SagaIterator {
  try {
    const response = yield call(authAPI.register, action.payload);
    const { user, token } = response.data;
    
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (token) localStorage.setItem('token', token);
    
    yield put(registerSuccess({ user: user || null, token: token || null }));
  } catch (error: unknown) {
    yield put(registerFailure(getErrorMessage(error, 'Registration failed')));
  }
}

function* getProfileSaga(): SagaIterator {
  try {
    const response = yield call(authAPI.getProfile);
    yield put(getProfileSuccess(response.data.user || null));
  } catch (error: unknown) {
    yield put(getProfileFailure(getErrorMessage(error, 'Failed to get profile')));
  }
}

function* updateProfileSaga(action: PayloadAction<FormData>): SagaIterator {
  try {
    const response = yield call(authAPI.updateProfile, action.payload);
    const updatedUser = response.data.user;
    
    if (updatedUser) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    yield put(updateProfileSuccess(updatedUser || null));
  } catch (error: unknown) {
    yield put(updateProfileFailure(getErrorMessage(error, 'Failed to update profile')));
  }
}

export function* authSaga(): SagaIterator {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(getProfileRequest.type, getProfileSaga);
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}
