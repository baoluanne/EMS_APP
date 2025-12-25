import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type QueryOptions<TData, TError> = Omit<
  UseQueryOptions<TData, TError, TData>,
  'queryKey' | 'queryFn'
>;

export type MutationOptions<TData, TError, TPayload> = Omit<
  UseMutationOptions<TData, TError, TPayload>,
  'mutationKey' | 'mutationFn'
>;
