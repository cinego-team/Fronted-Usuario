import axios from 'axios';
import { config } from './env';

export const axiosAPIUsuarios = axios.create({
  baseURL: config.APIUsuariosUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIUsuarios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }
  return config;
});

export const axiosAPIPeliculas = axios.create({
  baseURL: config.APIPeliculasUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIPeliculas.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }
  return config;
});

export const axiosAPIFunciones = axios.create({
  baseURL: config.APIFuncionesUrls.baseUrl, // http://localhost:3000
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIFunciones.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) config.headers.Authorization = token;
  if (refreshToken) config.headers['refresh-token'] = refreshToken;
  return config;
});

export const axiosAuthService = axios.create({
  baseURL: config.APIUsuariosUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuthService.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }
  return config;
});

export const axiosAPIVentas = axios.create({
  baseURL: config.APIVentasUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIVentas.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const captchaToken = localStorage.getItem('captcha_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }
  if (captchaToken) {
    config.headers['x-captcha-token'] = captchaToken;
  }
  return config;
});
export const axiosAPIPromociones = axios.create({
  baseURL: config.APIPromocionesUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIPromociones.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const captchaToken = localStorage.getItem('captcha_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }
  if (captchaToken) {
    config.headers['x-captcha-token'] = captchaToken;
  }
  return config;
});
