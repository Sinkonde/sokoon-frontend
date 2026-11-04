'use client';

import axios from 'axios';
import { normalizeAxiosError } from './apiError';

const apiClient = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,

  withCredentials: true,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Global response interceptor
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    return Promise.reject(
      normalizeAxiosError(error)
    );
  }
);

export default apiClient;