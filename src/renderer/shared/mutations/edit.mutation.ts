import { useMutation } from '@tanstack/react-query';
import { axios, MutationOptions } from '../lib';

export const useEditMutation = <TData = unknown, TPayload = Record<string, any>, TError = unknown>(
  key: string,
  idKey: string = 'id',
  options: MutationOptions<TData, TError, TPayload> = {},
) => {
  return useMutation<TData, TError, TPayload>({
    mutationKey: [`edit-${key}`],
    mutationFn: (payload: TPayload) => {
      const getId = (): string | undefined => {
        if (payload instanceof FormData) {
          return payload.get(idKey)?.toString();
        } else {
          return (payload as any)[idKey]?.toString();
        }
      };

      const id = getId();

      return axios.put<TData>(`/${key}/${id}`, payload);
    },
    ...options,
  });
};
