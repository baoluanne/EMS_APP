import { type QueryKey, useQuery } from '@tanstack/react-query';
import { axios } from '../lib';
import { type QueryOptions } from '../lib/tanstack-query';
import { PaginationResponse } from '../types';

interface PaginationParams {
  page: number;
  pageSize: number;
  sort?: string;
  filter?: string;
  [key: string]: any;
}

export const usePaginationQuery = <TData = unknown, TError = unknown>(
  key: string,
  params: PaginationParams,
  options: QueryOptions<PaginationResponse<TData>, TError> = {},
) => {
  return useQuery<PaginationResponse<TData>, TError>({
    queryKey: [`${key}-pagination`, params] as QueryKey,
    queryFn: () =>
      axios.get<PaginationResponse<TData>>(`/${key}`, {
        params: {
          ...params,
          page: params.page + 1,
        },
      }),
    ...options,
  });
};
