import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const Api = {
  fetchMetricById: async(id) => {
    const response = await axios(`${API_URL}/v1/metrics/${id}`)
    return response.data
  }
}