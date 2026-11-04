//import 'server-only';

import axios from 'axios';
import { cookies } from 'next/headers';

const serverApi = axios.create({
  baseURL: process.env.LARAVEL_API_URL,

  timeout: 30000,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor
serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();

  const token = cookieStore.get('access_token')?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default serverApi;