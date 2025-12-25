import { useMutation } from '@tanstack/react-query';
import { axios, MutationOptions } from '../lib';

type Payload = { file: string }; // base64 string

export const useImportMutation = <TData = any, TError = any>(
  entity: string,
  options: MutationOptions<TData, TError, Payload> = {},
) => {
  const resolveUrl = (u: string) => {
    if (!u) return '/import';
    if (u.startsWith('http') || u.startsWith('/') || u.toLowerCase().includes('/import')) return u;
    return `/${u}/import`;
  };

  const url = resolveUrl(entity);

  return useMutation<TData, TError, Payload>({
    mutationKey: ['import', url],
    mutationFn: (payload: Payload) => axios.post<TData>(url, payload),
    ...options,
  });
};
