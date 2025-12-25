import { QueryKey, useQuery } from '@tanstack/react-query';
import { axios } from '../lib';
import { QueryOptions } from '../lib/tanstack-query';

export const useListQuery = <TData = unknown, TError = unknown>(
  key: string,
  options: QueryOptions<TData, TError> = {},
) => {
  return useQuery<TData, TError>({
    queryKey: [`${key}-list`] as QueryKey,
    queryFn: () => axios.get<TData>(`/${key}`),
    ...options,
  });
};
