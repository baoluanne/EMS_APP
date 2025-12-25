import { QueryKey, useQuery } from '@tanstack/react-query';
import { axios } from '../lib';
import { QueryOptions } from '../lib/tanstack-query';

export const useGetQuery = <TData = unknown, TError = unknown>(
  key: string,
  id: string,
  options: QueryOptions<TData, TError> = {},
) => {
  return useQuery<TData, TError>({
    queryKey: [`${key}-get-${id}`] as QueryKey,
    queryFn: () => {
      return axios.get<TData>(`/${key}/${id}`);
    },
    enabled: !!id,
    ...options,
  });
};
