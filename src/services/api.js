import axios from 'axios';
import authService from './auth';
import { API_BASE_URL } from '/src/config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const endpoints = {
    requestCode: "xabber_auth_jwt/xmpp_code_request/",
    confirmCode: "xabber_auth_jwt/xmpp_auth/",
};

api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api, endpoints };