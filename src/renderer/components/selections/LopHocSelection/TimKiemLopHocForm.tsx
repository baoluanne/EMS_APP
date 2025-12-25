import { Button, Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { DataGridTable } from '@renderer/components/Table';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { defaultThongTinTimKiemLopHocState } from './types';
import { TimKiemLopHoc, TimKiemLopHocSchema } from './validations';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  currentId?: string;
  onClose: () => void;
  onSelected: (record: any) => void;
}

export const TimKiemLopHocForm = (props: Props) => {
  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    tableConfig,
    mergeParams,
  } = useCrudPaginationModal<any, TimKiemLopHocSchema>({
    defaultValues: {},
    schema: TimKiemLopHoc,
    entity: 'LopHoc',
  });
  const filterMethods = useForm<TimKiemLopHocSchema>({
    resolver: zodResolver(TimKiemLopHoc),
    defaultValues: {},
  });
  const { control } = formMethods;
  const handleClear = () => {
    formMethods.reset(defaultThongTinTimKiemLopHocState);
  };
  const handleFilter = () => {
    const params = formMethods.getValues();
    mergeParams(params);
  };
  const handleSelectLopHoc = (params: GridRenderCellParams) => {
    props.onSelected(params.row);
    props.onClose();
  };
  const columns: GridColDef[] = [
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
      width: 90,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isActive = params.row.id !== props.currentId;
        return (
          <Button disabled={!isActive} onClick={() => handleSelectLopHoc(params)}>
            Chọn
          </Button>
        );
      },
    },
    { field: 'maLop', headerName: 'Mã lớp học', width: 120 },
    { field: 'tenLop', headerName: 'Tên lớp học', width: 150 },
    { field: 'siSoHienTai', headerName: 'Sĩ số', width: 100 },
    { field: 'ghiChu', headerName: 'Ghi chú', width: 100 },
  ];

  return (
    <Stack spacing={1}>
      <FormProvider {...filterMethods}>
        <FilterDrawerBottom onClear={handleClear} onApply={handleFilter} methods={filterMethods}>
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
                  <ControlledTextField control={control} name="maLop" label="Mã lớp học" />
                </Grid>
                <Grid size={8}>
                  <ControlledTextField control={control} name="tenLop" label="Tên lớp học" />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </FilterDrawerBottom>
      </FormProvider>
      <DataGridTable
        columns={columns}
        rows={data?.result}
        checkboxSelection={false}
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
