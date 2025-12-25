import { useRefreshHandler } from '@renderer/layout/utils/tab.context';
import { useGridRowSelection } from '@renderer/shared/hooks';
import {
  useCopyMutation,
  useDeleteMultipleMutation,
  useUpsertMutation,
} from '@renderer/shared/mutations';
import { usePaginationQuery } from '@renderer/shared/queries';
import { useMemo } from 'react';
import { useTableParams } from './use-table-params';

type UseCrudProps = {
  entity: string;
  endpoint?: string;
  refetchCallback?: () => void;
  defaultState?: Record<string, any>;
  extraParams?: Record<string, any>;
  enabled?: boolean;
  enableOnParams?: (params: Record<string, any>) => boolean;
};

export const useCrudPagination = <T>({
  entity,
  endpoint = 'pagination',
  refetchCallback = () => {},
  defaultState,
  extraParams,
  enabled = true,
  enableOnParams,
}: UseCrudProps) => {
  const { params, generateTableConfig, mergeParams } = useTableParams(defaultState);

  const {
    isRefetching,
    data,
    refetch: refetchList,
  } = usePaginationQuery<T>(
    entity,
    endpoint,
    extraParams
      ? {
          ...params,
          ...extraParams,
        }
      : params,
    {
      enabled: enabled && (enableOnParams ? enableOnParams(params) : true),
    },
  );

  const refetch = useRefreshHandler(async () => {
    await refetchList();
    refetchCallback();
  });

  const allRowIds = useMemo(() => new Set((data?.result ?? []).map((r: any) => r.id)), [data]);
  const { selectedRows, handleRowSelectionModelChange, rowIds, setSelectedRows } =
    useGridRowSelection(allRowIds);

  const { mutateAsync } = useUpsertMutation(entity);
  const { mutate: deleteMultipleMutate } = useDeleteMultipleMutation(entity, {
    onSuccess: () => {
      // Clear selection after successful deletion
      setSelectedRows({ type: 'include', ids: new Set() });
      refetch();
    },
  });
  const { mutate: copyMutate } = useCopyMutation(entity, { onSuccess: refetch });

  const onSubmit = async (item: T & { id?: string | null }, isAdd: boolean) => {
    if (isAdd) delete item.id;

    await mutateAsync(item);
    await refetch();
  };

  const handleCopy = () => {
    if (rowIds.size > 0) copyMutate([...rowIds]);
  };

  const handleDelete = () => {
    if (rowIds.size > 0) deleteMultipleMutate([...rowIds]);
  };
  const listData = useMemo(() => data, [data]);

  const lastSelectedRow = useMemo(
    () => (data?.result ?? []).find((row) => row['id'] === [...rowIds][rowIds.size - 1]),
    [data, rowIds],
  );

  const resetSelectedRows = () => {
    setSelectedRows({ type: 'include', ids: new Set() });
  };

  return {
    data: Array.isArray(listData)
      ? listData
      : listData
        ? {
            ...listData,
            result: (listData?.result ?? []).map((item, index) => ({
              index: params.page * params.pageSize + index + 1,
              ...item,
            })),
          }
        : undefined,
    refetch,
    isRefetching,
    onSubmit,
    handleCopy,
    handleDelete,
    selectedRows,
    handleRowSelectionModelChange,
    rowIds,
    lastSelectedRow,
    generateTableConfig,
    mergeParams,
    resetSelectedRows,
    params,
  };
};
