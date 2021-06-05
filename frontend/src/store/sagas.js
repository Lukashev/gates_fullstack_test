import { call, put, takeEvery } from 'redux-saga/effects'
import { Api } from '../utils/api'
import { fetchMetricFailed, setMetricPeriod, fetchMetricSucceeded, FETCH_METRIC } from './actions'

function* fetchMetric(action) {
  try {
    const metricId = action.payload
    yield put(setMetricPeriod(metricId))
    const data = yield call(Api.fetchMetricById, metricId)
    yield put(fetchMetricSucceeded(data.result))
  } catch(e) {
    yield put(fetchMetricFailed(e.message))
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_METRIC, fetchMetric)
}

export default rootSaga