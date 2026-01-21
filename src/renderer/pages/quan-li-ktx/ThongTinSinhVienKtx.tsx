import { Stack, Typography, Button, Box, Chip } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { PersonSearch, Group } from '@mui/icons-material';
import React, { useState } from 'react';

import { ThongTinSvKtxFilter } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/ThongTinSinhVienFilter';
import { thongTinSvKtxColumns } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/configs/table.configs';
import { thongTinSvKtxSchema } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/validation';
import { SearchLeftStudentDrawer } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/SearchLeftStudentDrawer';

const defaultValues = { maSinhVien: '', hoTen: '', maPhong: '' };

export default function ThongTinSinhVienKtx() {
  const [openHistory, setOpenHistory] = useState(false);

  const {
    formMethods,
    data,
    isRefetching,
    selectedRows,
    handleRowSelectionModelChange,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<any, any>({
    defaultValues,
    schema: thongTinSvKtxSchema,
    entity: 'CuTruKtx',
    // Mặc định lọc những người đang ở (Status 0 hoặc DangO tùy BE)
    initialParams: { TrangThai: 'DangO' },
  });

  const rowsData = React.useMemo(() => (data as any)?.result || [], [data]);
  const totalCount = (data as any)?.totalCount || 0;

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={2}>
        {/* Header Section */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Group color="primary" />
              <Typography variant="h5" fontWeight={800}>
                Tra cứu sinh viên nội trú
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Quản lý danh sách sinh viên hiện đang cư trú tại ký túc xá
            </Typography>
          </Box>
          <Chip
            label={`Đang ở: ${totalCount} sinh viên`}
            color="success"
            variant="filled"
            sx={{ fontWeight: 700 }}
          />
        </Stack>

        {/* Toolbar với nút mở Sidebar */}
        <ActionsToolbar
          selectedRowIds={selectedRows}
          extraActions={
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PersonSearch />}
              onClick={() => setOpenHistory(true)}
              sx={{ borderRadius: 2, fontWeight: 700 }}
            >
              Tìm kiếm sinh viên rời KTX
            </Button>
          }
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<any>({
              entity: 'ThongTinSinhVienKtx',
              filteredData: rowsData,
              columns: thongTinSvKtxColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Sinh_vien_dang_o_KTX',
            });
          }}
        />

        <ThongTinSvKtxFilter onApply={mergeParams} />

        <DataGridTable
          columns={thongTinSvKtxColumns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          getRowId={(row) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 160px)"
          {...tableConfig}
        />

        {/* Sidebar Tra cứu sinh viên cũ */}
        <SearchLeftStudentDrawer open={openHistory} onClose={() => setOpenHistory(false)} />
      </Stack>
    </FormProvider>
  );
}
