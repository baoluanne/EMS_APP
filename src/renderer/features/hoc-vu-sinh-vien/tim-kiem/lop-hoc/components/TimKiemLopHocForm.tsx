import { Button, Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { DataGridTable } from '@renderer/components/Table';
import { GridColDef } from '@mui/x-data-grid';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { defaultThongTinTimKiemLopHocState, ThongTinTimKiemLopHocState } from '../types';
import { TimKiemLopHoc, TimKiemLopHocSchema } from '../validations';
import { FilterDrawerBottom } from '@renderer/components/modals';

const timKiemLopHocColumns: GridColDef[] = [
  {
    field: 'index',
    headerName: '*',
    width: 50,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
  {
    field: 'actions',
    headerName: '',
    width: 50,
    renderCell: (p) => {
      return <Button onClick={() => console.log(p)}>Chọn</Button>;
    },
  },
  { field: 'maLopHoc', headerName: 'Mã lớp học', width: 120 },
  { field: 'tenLopHoc', headerName: 'Tên lớp học', width: 150 },
  { field: 'siSo', headerName: 'Sĩ số', width: 100 },
  { field: 'ghiChu', headerName: 'Ghi chú', width: 100 },
];

export const TimKiemLopHocForm = () => {
  const { control } = useForm<ThongTinTimKiemLopHocState>({
    defaultValues: defaultThongTinTimKiemLopHocState,
  });
  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    tableConfig,
  } = useCrudPaginationModal<any, TimKiemLopHocSchema>({
    defaultValues: {},
    schema: TimKiemLopHoc,
    entity: 'LopHoc',
  });
  const handleClear = () => {
    formMethods.reset(defaultThongTinTimKiemLopHocState);
  };
  return (
    <Stack spacing={1}>
      <FilterDrawerBottom<ThongTinTimKiemLopHocState> onClear={handleClear}>
        <Grid size={12}>
          <Stack spacing={2}>
            <Grid container spacing={1}>
              <Grid size={4}>
                <CoSoSelection control={control} name="idCoSo" />
              </Grid>
              <Grid size={4}>
                <KhoaHocSelection control={control} name="idKhoaHoc" />
              </Grid>
              <Grid size={4}>
                <BacDaoTaoSelection control={control} name="idBacDaoTao" />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={4}>
                <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
              </Grid>
              <Grid size={4}>
                <NganhSelection control={control} name="idNganhHoc" />
              </Grid>
              <Grid size={4}>
                <ChuyenNganhSelection control={control} name="idChuyenNganh" />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={4}>
                <ControlledTextField
                  control={control}
                  name="maLopHoc"
                  label="Mã lớp học"
                  required
                />
              </Grid>
              <Grid size={8}>
                <ControlledTextField
                  control={control}
                  name="tenLopHoc"
                  label="Tên lớp học"
                  required
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </FilterDrawerBottom>
      <DataGridTable
        columns={timKiemLopHocColumns}
        rows={data?.result}
        checkboxSelection
        loading={isRefetching}
        onRowClick={(params) => formMethods.reset(params.row)}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height={'calc(100% - 85px)'}
        {...tableConfig}
      />
    </Stack>
  );
};
