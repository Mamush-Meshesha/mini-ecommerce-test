import { call, put, takeEvery } from 'redux-saga/effects';
import { dashboardAPI } from '../../services/api';
import {
  fetchDashboardStatisticsRequest,
  fetchDashboardStatisticsSuccess,
  fetchDashboardStatisticsFailure,
} from '../slices/dashboardSlice';

function* fetchDashboardStatisticsSaga(): Generator<any, void, any> {
  try {
    const statistics = yield call(dashboardAPI.getStatistics);
    yield put(fetchDashboardStatisticsSuccess(statistics));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : (error as any)?.response?.data?.message || 'Failed to fetch dashboard statistics';
    yield put(fetchDashboardStatisticsFailure(errorMessage));
  }
}

export function* dashboardSaga() {
  yield takeEvery(fetchDashboardStatisticsRequest.type, fetchDashboardStatisticsSaga);
}
