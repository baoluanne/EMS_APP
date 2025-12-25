import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { BacDaoTaoSelection } from '@renderer/components/selections';
import { DataGridTable } from '@renderer/components/Table';
import { useCrud, useFilter, useGridRowSelection } from '@renderer/shared/hooks';
import { useInsertMutation } from '@renderer/shared/mutations';
import { MonHoc, MonHocBacDaoTao } from '@renderer/shared/types';
import { IconPlus, IconTrashFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AddMonHocBacDaoTaoForm,
  addMonHocBacDaoTaoSchema,
  addMonHocBacDaoTaoTableColumns,
} from '../configs';
import { AddMonHocBacDaoTaoFilter } from '../types';
import { AddMonHocBacDaoTaoFilters } from './AddMonHocBacDaoTaoFilters';
import { FormDetailsModal } from '@renderer/components/modals';
import { MonHocForm } from '@renderer/features/danh-sach-mon-hoc/validation';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
  refetch: () => Promise<void>;
  selectedItem?: MonHocForm[];
  isAddMode?: boolean;
}

export const AddMonHocBacDaoTao: React.FC<Props> = ({
  onClose,
  refetch,
  selectedItem,
  isAddMode,
}) => {
  // Filter
  const { filter, setFilter } = useFilter<AddMonHocBacDaoTaoFilter>();

  // Tabel data
  const { data, isRefetching, handleRowSelectionModelChange, selectedRows } = useCrud<MonHoc>({
    entity: 'MonHoc',
  });
  const [filteredData, setFilteredData] = useState<MonHoc[]>([]);

  // Second table data
  const {
    selectedRows: selectedAddedRows,
    handleRowSelectionModelChange: handleAddedRowSelectionModelChange,
  } = useGridRowSelection();
  const [addedRows, setAddedRows] = useState<MonHocForm[]>(selectedItem ?? []);

  // Form
  const { mutateAsync } = useInsertMutation<MonHocBacDaoTao>('MonHocBacDaoTao/batch');
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(addMonHocBacDaoTaoSchema),
  });
  const onSubmit = async (data: AddMonHocBacDaoTaoForm) => {
    await mutateAsync({
      idMonHocs: addedRows.map((item) => item.id),
      ...data,
    });
    await refetch();
    onClose();
    if (!isAddMode) {
      toast.success('Cập nhật thành công');
    } else {
      toast.success('Thêm thành công');
    }
  };

  // Actions
  const handleAddRows = () => {
    setAddedRows((prev) => {
      const newRows = (data ?? []).filter((item) => item.id && selectedRows.ids.has(item.id));

      const merged = [...prev, ...newRows].filter(
        (row, index, self) => index === self.findIndex((r) => r.id === row.id),
      );

      return merged;
    });
  };

  const handleRemoveRows = () => {
    setAddedRows((prev) =>
      (prev ?? []).filter((item) => !item.id || !selectedAddedRows.ids.has(item.id)),
    );
  };

  useEffect(() => {
    let newData = (data ?? []).filter(
      (item) =>
        ((!item.idKhoa && !filter.idKhoaChuQuan) ||
          item.idKhoa?.includes(filter.idKhoaChuQuan ?? '')) &&
        ((!item.idLoaiMonHoc && !filter.idLoaiMonHoc) ||
          item.idLoaiMonHoc?.includes(filter.idLoaiMonHoc ?? '')) &&
        ((!item.tenMonHoc && !filter.monHoc) || item.tenMonHoc?.includes(filter.monHoc ?? '')) &&
        ((!item.maTuQuan && !filter.maTuQuan) || item.maTuQuan?.includes(filter.maTuQuan ?? '')) &&
        ((!item.idLoaiTiet && !filter.idLoaiTietHoc) ||
          item.idLoaiTiet?.includes(filter.idLoaiTietHoc ?? '')),
    );
    if (addedRows?.length) {
      const selectedIds = new Set(addedRows.map((s) => s.id));
      newData = newData.filter((item) => !selectedIds.has(item.id));
    }
    setFilteredData(newData);
  }, [data, filter, addedRows]);
  return (
    <FormDetailsModal
      title={isAddMode ? 'Thêm mới môn học bậc đào tạo' : 'Cập nhật môn học bậc đào tạo'}
      onClose={onClose}
      maxWidth="lg"
    >
      <Stack gap={3}>
        <AddMonHocBacDaoTaoFilters filter={filter} setFilter={setFilter} />

        <DataGridTable
          columns={addMonHocBacDaoTaoTableColumns}
          rows={filteredData}
          getRowId={(row) => row.id}
          loading={isRefetching}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
        />

        <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
          <Button
            type="button"
            variant="contained"
            color="success"
            startIcon={<IconPlus />}
            onClick={handleAddRows}
          >
            Thêm
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            startIcon={<IconTrashFilled />}
            onClick={handleRemoveRows}
          >
            Xóa
          </Button>
        </Stack>

        <Stack gap={2}>
          <Typography color="black" variant="h6">
            Danh sách môn học bậc đào tạo
          </Typography>
          <DataGridTable
            columns={addMonHocBacDaoTaoTableColumns}
            rows={addedRows}
            getRowId={(row) => row.id}
            loading={isRefetching}
            onRowSelectionModelChange={handleAddedRowSelectionModelChange}
            rowSelectionModel={selectedAddedRows}
          />
        </Stack>

        <Stack component="form" onSubmit={handleSubmit(onSubmit)} gap={3}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <BacDaoTaoSelection control={control} name="idBacDaoTao" labelWidth={135} required />
            </Grid>
            <Grid size={6}>
              <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
            </Grid>
          </Grid>

          <Stack direction="row" gap={2} justifyContent="end" alignItems="center">
            <Button onClick={onClose}>Hủy</Button>
            <Button type="submit" variant="contained" disabled={!addedRows?.length}>
              {isAddMode ? 'Thêm mới' : 'Cập nhật'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </FormDetailsModal>
  );
};
