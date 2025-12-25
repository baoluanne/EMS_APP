import { QueryKey, useQuery } from '@tanstack/react-query';
import { axios } from '../lib';
import { QueryOptions } from '../lib/tanstack-query';
import { PaginationResponse } from '../types';
import qs from 'qs';

interface PaginationParams {
  page: number;
  pageSize: number;
  sort?: string;
  filter?: string;
  [key: string]: any;
}

const mapParams = (params: Record<string, any>) => {
  return Object.keys(params).reduce(
    (acc, key) => {
      if (key === 'sortModel' && Array.isArray(params.sortModel) && params.sortModel.length > 0) {
        const { field, sort } = params.sortModel[0];
        acc.sortField = field;
        acc.isDesc = sort === 'desc';
      } else {
        acc[key] = params[key];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};

export const usePaginationQuery = <TData = unknown, TError = unknown>(
  key: string,
  endpoint: string,
  params: PaginationParams,
  options: QueryOptions<PaginationResponse<TData>, TError> = {},
) => {
  return useQuery<PaginationResponse<TData>, TError>({
    queryKey: [`${key}-${endpoint}`, params] as QueryKey,
    queryFn: () =>
      axios.get<PaginationResponse<TData>>(`/${key}/${endpoint}`, {
        params: mapParams({
          ...params,
          page: params.page + 1,
        }),
        paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'repeat' }),
      }),
    ...options,
  });
};
