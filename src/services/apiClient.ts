import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const isLiveBackendAvailable = !!BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('kisanflow_auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API Client request failed:', error?.message);
    return Promise.reject(error);
  }
);
