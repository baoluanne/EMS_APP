import { useMutation } from '@tanstack/react-query';
import { axios, MutationOptions } from '../lib';

export const useInsertMutation = <
  TData = unknown,
  TPayload = Record<string, any>,
  TError = unknown,
>(
  key: string,
  options: MutationOptions<TData, TError, TPayload> = {},
) => {
  return useMutation<TData, TError, TPayload>({
    mutationKey: [`insert-${key}`],
    mutationFn: (payload: TPayload) => {
      return axios.post<TData>(`/${key}`, payload);
    },
    ...options,
  });
};
