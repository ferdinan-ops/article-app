import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

import ENV from './environment'

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: ENV.apiUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

const api: AxiosInstance = axios.create(axiosRequestConfig)

export default api
