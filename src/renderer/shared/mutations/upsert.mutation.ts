import { useMutation } from '@tanstack/react-query';
import { axios, MutationOptions } from '../lib';

export const useUpsertMutation = <
  TData = unknown,
  TPayload = Record<string, any>,
  TError = unknown,
>(
  key: string,
  idKey: string = 'id',
  options: MutationOptions<TData, TError, TPayload> = {},
) => {
  return useMutation<TData, TError, TPayload>({
    mutationKey: [`upsert-${key}`],
    mutationFn: async (payload: TPayload) => {
      const getId = (): string | undefined => {
        if (payload instanceof FormData) {
          return payload.get(idKey)?.toString();
        } else {
          return (payload as any)[idKey]?.toString();
        }
      };
      const id = getId();
      const isEdit = !!id;

      if (isEdit) {
        if (!id) {
          throw new Error(`Missing '${idKey}' for update operation.`);
        }

        return axios.put<TData>(`/${key}/${id}`, payload);
      } else {
        return axios.post<TData>(`/${key}`, payload);
      }
    },
    ...options,
  });
};
