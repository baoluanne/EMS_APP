import { QueryKey, useQuery as useTanstackQuery } from '@tanstack/react-query';
import { axios } from '../lib';
import { QueryOptions } from '../lib/tanstack-query';

export const useQuery = <TData = unknown, TError = unknown>(
  key: string,
  options: QueryOptions<TData, TError> = {},
) => {
  return useTanstackQuery<TData, TError>({
    queryKey: [`query-${key}`] as QueryKey,
    queryFn: () => {
      return axios.get<TData>(`/${key}`);
    },
    ...options,
  });
};
