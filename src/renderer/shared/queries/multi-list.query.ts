import { QueryKey, QueryOptions, useQuery } from '@tanstack/react-query';
import { axios } from '../lib';

export const useMultiListQuery = <TData = unknown[][], TError = unknown>(
  endpoints: string[],
  options: QueryOptions<TData, TError> = {},
) => {
  return useQuery<TData, TError>({
    queryKey: [...endpoints, 'multi-list'] as QueryKey,
    queryFn: async (): Promise<TData> =>
      (await Promise.all(
        endpoints.map((endpoint) => axios.get(endpoint).then((res) => res)),
      )) as TData,
    ...options,
  });
};
