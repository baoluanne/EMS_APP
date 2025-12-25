import { zodResolver } from '@hookform/resolvers/zod';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ZodType } from 'zod';
import { useUpsertModal } from './use-upsert-modal';
import { useCrudPagination } from './use-crud-pagination';

interface Props<TEntity, TFieldValues extends FieldValues> {
  defaultValues: DefaultValues<TFieldValues> | undefined;
  schema: ZodType<TFieldValues, any, TFieldValues>;
  entity: string;
  endpoint?: string;
  beforeSubmit?: (values: TFieldValues) => TFieldValues | undefined;
  beforeEdit?: (values?: TEntity) => TEntity | undefined;
  handleAdd?: (values: TEntity) => Promise<unknown>;
  handleEdit?: (values: TEntity) => Promise<unknown>;
  defaultState?: Record<string, any>;
  enabled?: boolean;
}

export const useCrudPaginationModal = <
  TEntity extends { id?: string | null },
  TFieldValues extends FieldValues,
>({
  defaultValues,
  schema,
  entity,
  beforeSubmit,
  beforeEdit,
  handleAdd,
  handleEdit,
  defaultState,
  endpoint,
  enabled,
}: Props<TEntity, TFieldValues>) => {
  const { handleOpenModal, isModalOpen, handleCloseModal } = useUpsertModal();
  const [isAddMode, setIsAddMode] = useState<boolean>(true);
  const [isCloneMode, setIsCloneMode] = useState<boolean>(false);
  const [isDeleteOpenModal, setIsDeleteOpenModal] = useState<boolean>(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});

  const methods = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    data,
    isRefetching,
    handleDelete,
    handleRowSelectionModelChange,
    selectedRows,
    onSubmit,
    refetch,
    generateTableConfig,
    mergeParams,
    resetSelectedRows,
  } = useCrudPagination<TEntity>({
    entity,
    endpoint,
    refetchCallback: () => {
      methods.reset(defaultValues);
    },
    defaultState,
    enabled,
  });

  const validateSingleRowSelection = (): boolean => {
    if (selectedRows.ids.size !== 1) {
      toast.warning('Vui lòng chọn 1 dữ liệu để sao chép');
      return false;
    }
    return true;
  };

  const getSelectedRow = (): TEntity | undefined => {
    return data?.result?.find((item) => item.id && selectedRows.ids.has(item.id));
  };

  const applyBeforeEditTransformation = (row: TEntity | undefined): TEntity | undefined => {
    if (!beforeEdit) return row;

    const transformedRow = beforeEdit(row);
    if (!transformedRow) return undefined;

    return transformedRow as TEntity;
  };

  const normalizeForeignKeysForClone = (input: any): Record<string, any> => {
    const result: Record<string, any> = {};

    Object.entries(input ?? {}).forEach(([key, value]) => {
      if (key.startsWith('id') && typeof value === 'string') {
        // Keep ID fields as is (like idKhoa)
        result[key] = value;
      } else if (
        value &&
        typeof value === 'object' &&
        !(value instanceof Date) &&
        !Array.isArray(value)
      ) {
        // Set object fields to null
        result[key] = null;
      } else {
        // Keep other fields as is
        result[key] = value;
      }
    });

    return result;
  };

  const removeIdFromClonedData = (clonedData: any): void => {
    if (clonedData?.id) {
      delete clonedData.id;
    }
  };

  const openModalForClone = (clonedData: any): void => {
    methods.reset(clonedData);
    setIsAddMode(true);
    setIsCloneMode(true);
    handleOpenModal();
  };

  const openModalForAdd = (): void => {
    methods.reset(defaultValues);
    setIsAddMode(true);
    setIsCloneMode(false);
    handleOpenModal();
  };

  const handleCloneFlow = (): void => {
    if (!validateSingleRowSelection()) return;

    const selectedRow = getSelectedRow();
    const transformedRow = applyBeforeEditTransformation(selectedRow);

    if (!transformedRow) return;

    const clonedData = normalizeForeignKeysForClone(transformedRow);
    removeIdFromClonedData(clonedData);
    openModalForClone(clonedData);
  };

  const onAdd = (options?: { isCloning?: boolean }) => {
    if (options?.isCloning) {
      handleCloneFlow();
      return;
    }

    openModalForAdd();
  };

  const onEdit = () => {
    if (selectedRows.ids.size != 1) {
      toast.warning('Vui lòng chọn 1 dữ liệu để sửa');
      return;
    }
    const row = data?.result?.find((item) => item.id && selectedRows.ids.has(item.id));
    let payload = row;

    if (beforeEdit) {
      const res = beforeEdit(row);
      if (!res) {
        return;
      }
      payload = res as any;
    }

    methods.reset(payload as any);
    setIsAddMode(false);
    setIsCloneMode(false);
    handleOpenModal();
  };

  const onSave = methods.handleSubmit(
    async (values) => {
      let payload = values;
      if (beforeSubmit) {
        const res = beforeSubmit(values);
        if (!res) {
          return;
        }
        payload = res;
      }

      if (handleAdd && isAddMode) {
        await handleAdd(payload as unknown as TEntity);
        refetch();
      } else if (handleEdit && !isAddMode) {
        await handleEdit(payload as unknown as TEntity);
        refetch();
      } else {
        await onSubmit(payload as unknown as TEntity, isAddMode);
      }

      handleCloseModal();
      //TODO notfication to Snackbar
      if (isCloneMode) {
        toast.success('Sao chép thành công');
      } else if (isAddMode) {
        toast.success('Thêm mới thành công');
      } else {
        toast.success('Cập nhật thành công');
      }
    },
    (error) => console.log('Error ', error),
  );

  const handleDeleteRecord = () => {
    handleDelete();
    setIsDeleteOpenModal(false);
    //TODO notfication to Snackbar
    toast.success('Xóa thành công');
  };

  const handleColumnChange = (model: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(model);
  };

  return {
    formMethods: methods,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    onSave,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    selectedRows,
    handleCloseModal,
    isAddMode,
    isCloneMode,
    data,
    refetch,
    tableConfig: {
      columnVisibilityModel,
      onColumnVisibilityModelChange: handleColumnChange,
      ...generateTableConfig(data?.totalCount, isRefetching),
    },
    columnVisibilityModel,
    generateTableConfig,
    mergeParams,
    resetSelectedRows,
  };
};
