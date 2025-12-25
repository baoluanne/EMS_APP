import { zodResolver } from '@hookform/resolvers/zod';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ZodType } from 'zod';
import { useCrud } from './use-crud';
import { useUpsertModal } from './use-upsert-modal';

interface Props<TEntity, TFieldValues extends FieldValues> {
  defaultValues: DefaultValues<TFieldValues> | undefined;
  schema: ZodType<TFieldValues, any, TFieldValues>;
  entity: string;
  beforeSubmit?: (values: TFieldValues) => TFieldValues | undefined;
  beforeEdit?: (values?: TEntity) => TEntity | undefined;
  handleAdd?: (values: TEntity) => Promise<unknown>;
  handleEdit?: (values: TEntity) => Promise<unknown>;
}

export const useCrudModal = <
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
}: Props<TEntity, TFieldValues>) => {
  const { handleOpenModal, isModalOpen, handleCloseModal } = useUpsertModal();
  const [isAddMode, setIsAddMode] = useState<boolean>(true);
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
  } = useCrud<TEntity>({
    entity,
    refetchCallback: () => {
      methods.reset(defaultValues);
    },
  });

  const onAdd = () => {
    methods.reset(defaultValues);
    setIsAddMode(true);
    handleOpenModal();
  };

  const onEdit = () => {
    if (selectedRows.ids.size != 1) {
      toast.warning('Vui lòng chọn 1 dữ liệu để sửa');
      return;
    }
    const row = data?.find((item) => item.id && selectedRows.ids.has(item.id));
    let payload = row;

    if (beforeEdit) {
      const res = beforeEdit(row);
      if (!res) {
        return;
      }
      payload = res;
    }

    methods.reset(payload as TFieldValues);
    setIsAddMode(false);
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
        onSubmit(payload as unknown as TEntity, isAddMode);
      }

      handleCloseModal();
      //TODO notfication to Snackbar
      if (isAddMode) {
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
    data,
    refetch,
    tableConfig: { columnVisibilityModel, onColumnVisibilityModelChange: handleColumnChange },
    columnVisibilityModel,
  };
};
