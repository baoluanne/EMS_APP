import { useMutation } from '@tanstack/react-query';
import { axios, MutationOptions } from '../lib';

export const useCopyMutation = <TData = unknown, TPayload = Record<string, any>, TError = unknown>(
  key: string,
  options: MutationOptions<TData, TError, TPayload> = {},
) => {
  return useMutation<TData, TError, TPayload>({
    mutationKey: [`copy-${key}`],
    mutationFn: (payload: TPayload) => {
      return axios.post<TData>(`/${key}/copy`, payload);
    },
    ...options,
  });
};
