export const FETCH_METRIC = 'FETCH_METRIC'
export const CHANGE_PERIOD = 'CHANGE_PERIOD'
export const FETCH_METRIC_SUCCEEDED = 'FETCH_METRIC_SUCCEEDED'
export const FETCH_METRIC_FAILED = 'FETCH_METRIC_FAILED'

export const fetchMetric = id => ({
  type: FETCH_METRIC,
  payload: id
})

export const setMetricPeriod = id => ({
  type: CHANGE_PERIOD,
  payload: id
})

export const fetchMetricFailed = msg => ({
  type: FETCH_METRIC_FAILED,
  payload: msg
})

export const fetchMetricSucceeded = currentMetric => ({
  type: FETCH_METRIC_SUCCEEDED,
  payload: currentMetric
})

