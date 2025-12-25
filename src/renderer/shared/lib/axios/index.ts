import { env } from '@renderer/shared/configs';
import axiosLib from 'axios';
import { createBearerForToken, resetAuth, showErrorToast } from './axios.utils';
import { RefreshTokenResponse } from '@renderer/shared/types';
import { CustomAxiosInstance } from './axios.types';
import { useAuthStore } from '@renderer/shared/stores';

const axiosInstance: CustomAxiosInstance = axiosLib.create({
  baseURL: env.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refreshAccessToken = async (token: string): Promise<RefreshTokenResponse> => {
  const res = await axiosInstance.post(
    '/auth/refresh-token',
    {
      token,
    },
    {
      isRefreshTokenCall: true,
    },
  );
  return res;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.$state();
    if (accessToken) {
      config.headers['Authorization'] = createBearerForToken(accessToken);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Failed to refresh token
    if (error.config?.isRefreshTokenCall) {
      resetAuth();
      showErrorToast(error.response?.data?.message || 'Session Expired!');
      return Promise.reject(error);
    }

    // 401 - Unauthorized
    if (error.response?.status === 401) {
      try {
        // User store not initialized
        if (!useAuthStore.$state()) {
          showErrorToast(error);
          return Promise.reject(error);
        }

        // Try to refresh token
        const { refreshToken } = useAuthStore.$state();
        if (!refreshToken) {
          resetAuth();
          showErrorToast(error);
          return Promise.reject(error);
        }
        const { accessToken } = await refreshAccessToken(refreshToken);
        if (!accessToken) {
          resetAuth();
          showErrorToast(error);
          return Promise.reject(error);
        }

        // Set new token
        useAuthStore.$patch({ accessToken });

        // Retry request
        const originalRequestConfig = error.config;
        originalRequestConfig.headers['Authorization'] = createBearerForToken(accessToken);
        return axiosInstance.request(originalRequestConfig);
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      }
    }

    // Other erroes
    showErrorToast(error);
    return Promise.reject(error);
  },
);

export const axios = axiosInstance;
