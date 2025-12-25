import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  isRefreshTokenCall?: boolean;
  disableAlert?: boolean;
}

interface ApiErrorResponse {
  message: string;
  status: number;
  data?: any;
}

export type CustomAxiosError = Omit<AxiosError<ApiErrorResponse>, 'config'> & {
  config: CustomAxiosRequestConfig;
};

export interface CustomAxiosInstance extends Omit<AxiosInstance, 'request'> {
  request<T = any>(config: CustomAxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<T>;
}

export type AxiosMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
