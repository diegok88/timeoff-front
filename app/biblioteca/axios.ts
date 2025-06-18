import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.118.5.157:3000'
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);