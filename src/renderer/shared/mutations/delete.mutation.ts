import { useMutation } from '@tanstack/react-query';
import { axios, MutationOptions } from '../lib';

export const useDeleteMutation = <TData = unknown, TError = unknown>(
  key: string,
  options: MutationOptions<TData, TError, string> = {},
) => {
  return useMutation<TData, TError, string>({
    mutationKey: [`delete-${key}`],
    mutationFn: (id: string) => {
      return axios.delete(`/${key}/${id}`);
    },
    ...options,
  });
};
