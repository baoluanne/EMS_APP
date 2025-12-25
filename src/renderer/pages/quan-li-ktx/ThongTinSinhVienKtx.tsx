import { Stack, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import React from 'react';

import { ThongTinSvKtxFilter } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/ThongTinSinhVienFilter';
import { thongTinSvKtxColumns as columns } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/configs/table.configs';
import {
  ThongTinSvKtx,
  thongTinSvKtxSchema,
} from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/validation';

const defaultValues: ThongTinSvKtx = {
  id: '',
  maSinhVien: '',
  hoTen: '',
  tenToaNha: '',
  maPhong: '',
  maGiuong: '',
};

export default function ThongTinSinhVienKtx() {
  const {
    formMethods,
    data,
    isRefetching,
    selectedRows,
    handleRowSelectionModelChange,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<ThongTinSvKtx, any>({
    defaultValues,
    schema: thongTinSvKtxSchema,
    entity: 'cu-tru-ktx',
  });
  const rowsData: ThongTinSvKtx[] = React.useMemo(() => {
    if (!data || !('data' in data) || !Array.isArray(data.data)) return [];

    return data.data.map((item: any) => ({
      ...item,
      id: item.id || item.sinhVienId,
    }));
  }, [data]);

  const totalCount = React.useMemo(() => {
    if (data && 'total' in data && typeof data.total === 'number') {
      return data.total;
    }
    return 0;
  }, [data]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            Thông tin sinh viên đang ở KTX
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Tổng cộng: {totalCount} sinh viên
          </Typography>
        </Stack>

        <ActionsToolbar
          selectedRowIds={selectedRows}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<ThongTinSvKtx>({
              entity: 'ThongTinSinhVienKtx',
              filteredData: rowsData,
              columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_sinh_vien_dang_o_KTX',
            });
          }}
        />

        <ThongTinSvKtxFilter onApply={mergeParams} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          getRowId={(row) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 120px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
}
