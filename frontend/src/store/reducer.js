import { tabItems } from "../utils/const"
import { CHANGE_PERIOD, FETCH_METRIC_FAILED, FETCH_METRIC_SUCCEEDED } from "./actions"

const initialState = {
  currentPeriod: tabItems[1].id,
  currentMetric: null,
  errorMsg: ''
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case FETCH_METRIC_SUCCEEDED:
      return {
        ...state,
        currentMetric: payload
      }
    case CHANGE_PERIOD:
      return {
        ...state,
        currentPeriod: payload 
      }
    case FETCH_METRIC_FAILED: {
      return {
        ...state,
        errorMsg: payload 
      }
    }
    default:
      return state
  }
}

export default reducer