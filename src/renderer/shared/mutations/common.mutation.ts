import { useMutation as useTanstackMutation } from '@tanstack/react-query';
import { axios, MutationOptions } from '../lib';
import { AxiosRequestHeaders, AxiosHeaders } from 'axios';
import { AxiosMethod } from '../lib/axios/axios.types';

export const useMutation = <
  TData = unknown,
  TPayload = Record<string, any> | FormData | Blob | string,
  TError = unknown,
>(
  key: string,
  method: AxiosMethod = 'post',
  options: MutationOptions<TData, TError, TPayload> & {
    headers?: AxiosRequestHeaders;
    contentType?: string;
  } = {},
) => {
  return useTanstackMutation<TData, TError, TPayload>({
    mutationKey: [`mutation-${key}`],
    mutationFn: async (payload: TPayload) => {
      const headers = new AxiosHeaders(options.headers || {});

      // 🧠 Auto-detect Content-Type
      if (payload instanceof FormData) {
        headers.set('Content-Type', 'multipart/form-data');
      } else if (payload instanceof Blob) {
        headers.set(
          'Content-Type',
          options.contentType || payload.type || 'application/octet-stream',
        );
      } else if (options.contentType) {
        headers.set('Content-Type', options.contentType);
      } else if (typeof payload === 'string') {
        const isJsonLike = payload.trim().startsWith('{') || payload.trim().startsWith('[');
        headers.set('Content-Type', isJsonLike ? 'application/json' : 'text/plain');
      } else if (typeof payload === 'object' && payload !== null) {
        headers.set('Content-Type', 'application/json');
      } else if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'text/plain');
      }

      // 🧩 Gọi axios động theo method
      const lowerMethod = method.toLowerCase() as AxiosMethod;

      if (['get', 'delete'].includes(lowerMethod)) {
        // với GET, DELETE: payload là params
        return axios[lowerMethod]<TData>(`/${key}`, { params: payload, headers });
      } else {
        // với POST, PUT, PATCH: payload là body
        return axios[lowerMethod]<TData>(`/${key}`, payload, { headers });
      }
    },
    ...options,
  });
};
