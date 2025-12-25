import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import {
  danhSachSVLHPColumns,
  DanhSachSinhVienLopHocPhanSchema,
  DanhSachSinhVienLopHocPhanType,
  SinhVienLopHocPhanFilterType,
  SinhVienLopHocPhanFilterSchema,
} from '@renderer/features/hoc-vu-sinh-vien/danh-sach-sinh-vien-lop-hoc-phan';
import { Grid, Stack, Typography } from '@mui/material';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { DataGridTable } from '@renderer/components/Table';
import { DanhSachSinhVienLopHocPhanFilter } from '@renderer/features/hoc-vu-sinh-vien/danh-sach-sinh-vien-lop-hoc-phan/components/Filter';
import {
  defaultSinhVienLopHocPhanFilterState,
  SinhVienLopHocPhan,
} from '@renderer/features/hoc-vu-sinh-vien/danh-sach-sinh-vien-lop-hoc-phan/types';
import { DanhSachLopHocFilterState } from '@renderer/features/hoc-vu-sinh-vien/danh-sach-lop-hoc/types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

export default function DanhSachSinhVienLopHocPhan() {
  const [giangVienLHP, SetGiangVienLHP] = useState<string>();
  const [enabled, setEnabled] = useState<boolean>(false);
  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<SinhVienLopHocPhan, DanhSachSinhVienLopHocPhanType>({
    defaultValues: {},
    schema: DanhSachSinhVienLopHocPhanSchema,
    entity: 'SinhVienDangKiHocPhan',
    enabled: !!enabled,
  });
  const filterMethods = useForm<SinhVienLopHocPhanFilterType>({
    resolver: zodResolver(SinhVienLopHocPhanFilterSchema),
    defaultValues: defaultSinhVienLopHocPhanFilterState,
  });
  const handleSearchLHP = (values: SinhVienLopHocPhanFilterType) => {
    setEnabled(true);
    const hocPhi =
      values.hocPhiFilter != 'All' ? (values.hocPhiFilter === 'true' ? true : false) : null;
    mergeParams({ ...values, hocPhi });
  };

  return (
    <Stack
      className="w-full h-full p-2"
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        borderRadius: '0px',
      }}
    >
      <ActionsToolbar
        selectedRowIds={selectedRows}
        onExport={(dataOption, columnOption) => {
          exportPaginationToExcel<DanhSachLopHocFilterState>({
            entity: 'SinhVienDangKiHocPhan',
            filteredData: data?.result ?? [],
            columns: danhSachSVLHPColumns,
            options: { dataOption, columnOption },
            columnVisibilityModel,
            fileName: 'danh_sach_sinh_vien_lop_hoc_phan',
          });
        }}
      />
      <FormProvider {...filterMethods}>
        <DanhSachSinhVienLopHocPhanFilter
          onApply={handleSearchLHP}
          methods={filterMethods}
          setTenGiangVienLHP={SetGiangVienLHP}
        />
      </FormProvider>
      <Grid container spacing={1} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1, mt: 2 }}>
        <Grid size={12} container>
          <Grid size={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="primary"
              sx={{ whiteSpace: 'nowrap', ml: 0.5 }}
            >
              Danh sách sinh viên
            </Typography>
          </Grid>

          <Grid size={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="primary"
              sx={{ whiteSpace: 'nowrap', ml: 0.5 }}
            >
              Giảng viên: {giangVienLHP}
            </Typography>
          </Grid>
        </Grid>
        <DataGridTable
          columns={danhSachSVLHPColumns}
          rows={data?.result}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height={'calc(100% - 85px)'}
          {...tableConfig}
        />
      </Grid>
    </Stack>
  );
}
