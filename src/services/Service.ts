import axios, { AxiosError, AxiosInstance } from 'axios';
import { getToken, removeToken } from 'utils/Utils';

const NodeAPI: AxiosInstance = axios.create({
  timeout: 60000,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Expose-Headers': 'Access-Control-',
    'Access-Control-Allow-Headers':
      'Access-Control-, Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    'Access-Control-Allow-Origin': '*',
    Allow: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  },
});

NodeAPI.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = token;

  return config;
});

NodeAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (failure: AxiosError) => {
    if (
      failure &&
      (failure.response?.status === 500 || failure.response?.status === 401)
    ) {
      removeToken();
      window.location.href = '/';
    }
    return failure;
  }
);

export { NodeAPI };
