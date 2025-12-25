import { Button, Grid, Stack } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  HinhThucThiSelection,
  HocKySelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  LoaiMonHocSelection,
  LopDanhNghiaSelection,
  MonHocSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { DataGridTable } from '@renderer/components/Table';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { CoSoTaoDao, Khoa } from '@renderer/shared/types';
import { FormProvider } from 'react-hook-form';
import { LoaiLopLHPSelection } from '../LoaiLopLHPSelection';
import { LoaiMonLTTHSelection } from '../LoaiMonLTTHSelection';
import { TrangThaiLopHocPhanSelection } from '../TrangThaiLopHocPhanSelection';
import {
  defaultThongTinTimKiemLopHocState,
  TimKiemLopHoc,
  TimKiemLopHocSchema,
} from './validations';

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
    entity: 'LopHocPhan',
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
    { field: 'maLopHocPhan', headerName: 'Mã lớp học phần', flex: 1 },
    { field: 'maHocPhan', headerName: 'Mã học phần', flex: 1 },
    {
      field: 'tenMonHoc',
      headerName: 'Tên môn học',
      flex: 1,
      valueGetter: (_, row: any) => row.monHoc?.tenMonHoc,
    },
    { field: 'lopDuKien', headerName: 'Lớp dự kiến', flex: 1 },
    { field: 'trangThaiLHP', headerName: 'Trạng thái LHP', flex: 1 },
    {
      field: 'khoaChuQuan',
      headerName: 'Khoa chủ quản',
      flex: 1,
      valueGetter: (value: Khoa) => value?.tenKhoa,
    },
    {
      field: 'coSo',
      headerName: 'Cơ sở',
      flex: 1,
      valueGetter: (value: CoSoTaoDao) => value?.tenCoSo,
    },
  ];

  return (
    <Stack spacing={1}>
      <FormProvider {...formMethods}>
        <FilterDrawerBottom onClear={handleClear} onApply={handleFilter} methods={formMethods}>
          <Grid container spacing={1}>
            <Grid size={4}>
              <ControlledTextField control={control} name="maLHP" label="Mã LHP" />
            </Grid>
            <Grid size={4}>
              <HocKySelection control={control} name="idDot" label="Đợt" />
            </Grid>
            <Grid size={4}>
              <KhoaSelection control={control} name="idKhoaChuQuan" label="Khoa chủ quản" />
            </Grid>
            <Grid size={4}>
              <CoSoSelection control={control} name="idCoSoDaoTao" />
            </Grid>
            <Grid size={4}>
              <KhoaHocSelection control={control} name="idKhoaHoc" />
            </Grid>
            <Grid size={4}>
              <BacDaoTaoSelection control={control} name="idBacDaoTao" />
            </Grid>
            <Grid size={4}>
              <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
            </Grid>
            <Grid size={4}>
              <NganhSelection control={control} name="idNganh" />
            </Grid>
            <Grid size={4}>
              <ChuyenNganhSelection control={control} name="idChuyenNganh" />
            </Grid>
            <Grid size={4}>
              <LopDanhNghiaSelection control={control} name="idLopDanhNghia" />
            </Grid>
            <Grid size={4}>
              <ControlledTextField control={control} name="lopBanDau" label="Lớp ban đầu" />
            </Grid>
            <Grid size={4}>
              <MonHocSelection control={control} name="idMonHoc" />
            </Grid>
            <Grid size={4}>
              <LoaiLopLHPSelection control={control} name="idLoaiLopHP" />
            </Grid>
            <Grid size={4}>
              <LoaiMonHocSelection control={control} name="idLoaiMonHoc" />
            </Grid>
            <Grid size={4}>
              <HinhThucThiSelection control={control} name="idHinhThucThi" />
            </Grid>
            <Grid size={4}>
              <LoaiMonLTTHSelection control={control} name="idLoaiMonLTTH" />
            </Grid>
            <Grid size={4}>
              <TrangThaiLopHocPhanSelection control={control} name="idTrangThaiLopHP" />
            </Grid>
            <Grid size={8}>
              <ControlledDateRangePicker
                control={control}
                startName="ngayHocCuoiTu"
                startLabel="Từ ngày học cuối"
                endName="ngayHocCuoiDen"
                endLabel="Đến ngày học cuối"
              />
            </Grid>
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
