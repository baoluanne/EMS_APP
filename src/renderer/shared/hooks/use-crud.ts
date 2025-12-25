import { useGridRowSelection } from '@renderer/shared/hooks';
import {
  useCopyMutation,
  useDeleteMultipleMutation,
  useUpsertMutation,
} from '@renderer/shared/mutations';
import { useListQuery } from '@renderer/shared/queries';
import { useMemo } from 'react';
import { useRefreshHandler } from '@renderer/layout/utils/tab.context';

type UseCrudProps = {
  entity: string;
  refetchCallback?: () => void;
};

export const useCrud = <T>({ entity, refetchCallback = () => { } }: UseCrudProps) => {
  const { data, refetch: refetchList, isRefetching } = useListQuery<T[]>(entity);
  const refetch = useRefreshHandler(async () => {
    await refetchList();
    refetchCallback();
  });
  const { selectedRows, handleRowSelectionModelChange, rowIds, setSelectedRows } = useGridRowSelection();

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
    () => (data ?? []).find((row) => row['id'] === [...rowIds][rowIds.size - 1]),
    [data, rowIds],
  );

  return {
    data: listData,
    refetch,
    isRefetching,
    onSubmit,
    handleCopy,
    handleDelete,
    selectedRows,
    handleRowSelectionModelChange,
    rowIds,
    lastSelectedRow,
  };
};
