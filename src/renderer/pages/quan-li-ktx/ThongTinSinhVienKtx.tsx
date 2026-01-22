import { Stack, Chip, Grid } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { useEffect, useState, useMemo } from 'react';

import { ThongTinSvKtxFilter } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/ThongTinSinhVienFilter';
import { thongTinSvKtxColumns } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/configs/table.configs';
import { thongTinSvKtxSchema } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/validation';
import { ResidencyHistoryModal } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/CutruHistory';
import { ThongTinSvKtxFilterState } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/type';
const defaultValues = { maSinhVien: '', hoTen: '', maPhong: '' };

export default function ThongTinSinhVienKtx() {
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const handleStudentClick = (data: any) => {
    setSelectedStudent(data);
    setOpenHistoryModal(true);
  };

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
  });

  const columns = useMemo(() => thongTinSvKtxColumns(handleStudentClick), []);

  useEffect(() => {
    mergeParams({ TrangThai: 'DangO' });
  }, [mergeParams]);

  const handleApplyFilter = (filters: ThongTinSvKtxFilterState) => {
    const params: any = {};
    if (filters.maSinhVien || filters.hoTen || filters.maPhong) {
      const keyword = [filters.maSinhVien || '', filters.hoTen || '', filters.maPhong || '']
        .filter(Boolean)
        .join(' ');
      if (keyword) params.Keyword = keyword;
    }
    if (filters.maGiuong) {
      params.MaGiuong = filters.maGiuong;
    }
    if (filters.trangThai !== undefined) {
      params.TrangThai = filters.trangThai === 0 ? 'DangO' : 'DaRa';
    }
    mergeParams(params);
  };

  const handleResetFilter = () => {
    mergeParams({
      TrangThai: 'DangO',
      Keyword: null,
      MaGiuong: null,
    });
  };

  const rowsData = useMemo(() => (data as any)?.result || [], [data]);
  const totalCount = (data as any)?.totalCount || 0;

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={2}>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <ActionsToolbar
                selectedRowIds={selectedRows}
                onExport={(dataOption, columnOption) => {
                  exportPaginationToExcel<any>({
                    entity: 'ThongTinSinhVienKtx',
                    filteredData: rowsData,
                    columns: columns,
                    options: { dataOption, columnOption },
                    columnVisibilityModel,
                    fileName: 'Sinh_vien_dang_o_KTX',
                  });
                }}
              />
            </Grid>
            <Grid
              size={4}
              sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
            >
              <Chip label={`Đang ở: ${totalCount}`} color="success" variant="filled" />
            </Grid>
          </Grid>
        </Stack>

        <ThongTinSvKtxFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          getRowId={(row) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 160px)"
          {...tableConfig}
        />

        <ResidencyHistoryModal
          open={openHistoryModal}
          onClose={() => {
            setOpenHistoryModal(false);
            setSelectedStudent(null);
          }}
          studentData={selectedStudent}
        />
      </Stack>
    </FormProvider>
  );
}
