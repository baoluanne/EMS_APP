import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';
import { giuongKtxColumns } from '@renderer/features/ktx-management/giuong-ktx/configs/table.configs';
import { GiuongKtxForm } from '@renderer/features/ktx-management/giuong-ktx/components/GiuongKtxForm';
import {
  GiuongKtxFilter,
  GiuongKtxFilterState,
} from '@renderer/features/ktx-management/giuong-ktx/components/GiuongKtxFilter';
import {
  giuongKtxSchema,
  GiuongKtxSchema,
} from '@renderer/features/ktx-management/giuong-ktx/validation';

const defaultValues: GiuongKtxSchema = {
  id: undefined,
  maGiuong: '',
  phongKtxId: '',
  sinhVienId: null,
  trangThai: 0,
};

function GiuongKtxPage() {
  const [filters, setFilters] = useState<GiuongKtxFilterState>({});
  const location = useLocation();

  useEffect(() => {
    const state = location.state as any;
    if (state?.phongId) {
      setFilters({ phongId: state.phongId });
      console.log('>>> [GiuongKtxPage] Filtered by room:', state.maPhong, state.phongId);
    }
  }, [location]);

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    onSave,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    columnVisibilityModel,
  } = useCrudPaginationModal<GiuongKtxSchema, GiuongKtxSchema>({
    defaultValues,
    schema: giuongKtxSchema,
    entity: 'GiuongKtx',
  });

  const rawRowsData: GiuongKtxSchema[] = useMemo(() => {
    if (!data) return [];
    const results = (data as any).data || (data as any).result || [];
    return Array.isArray(results) ? results : [];
  }, [data]);

  const rowsData: GiuongKtxSchema[] = useMemo(() => {
    if (!filters.maGiuong && !filters.phongId && !filters.trangThai) {
      return rawRowsData;
    }

    return rawRowsData.filter((row: any) => {
      const matchMa =
        !filters.maGiuong || row.maGiuong?.toLowerCase().includes(filters.maGiuong.toLowerCase());
      const matchPhong = !filters.phongId || row.phongKtxId === filters.phongId;
      const matchTrangThai = !filters.trangThai || row.trangThai?.toString() === filters.trangThai;
      return matchMa && matchPhong && matchTrangThai;
    });
  }, [rawRowsData, filters]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<GiuongKtxSchema>({
              entity: 'giuong-ktx',
              filteredData: rowsData,
              columns: giuongKtxColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_giuong_ktx',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới giường' : 'Chỉnh sửa giường'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <GiuongKtxForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <GiuongKtxFilter onApply={setFilters} onReset={() => setFilters({})} />

        <DataGridTable
          columns={giuongKtxColumns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          getRowId={(row) => row.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
}

export default GiuongKtxPage;
