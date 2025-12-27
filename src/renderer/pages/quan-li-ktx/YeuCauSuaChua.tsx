import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { YeuCauSuaChuaForm } from '@renderer/features/ktx-management/yeu-cau-sua-chua/components/YeuCauSuaChuaForm';
import {
  YeuCauSuaChuaFilter,
  YeuCauSuaChuaFilterState,
} from '@renderer/features/ktx-management/yeu-cau-sua-chua/components/YeuCauSuaChuaFilter';
import { yeuCauSuaChuaColumns } from '@renderer/features/ktx-management/yeu-cau-sua-chua/configs/table.configs';
import {
  YeuCauSuaChua,
  yeuCauSuaChuaSchema,
} from '@renderer/features/ktx-management/yeu-cau-sua-chua/validation';
import { useMemo, useState, useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultValues = {
  id: undefined,
  tieuDe: '',
  noiDung: '',
  sinhVienId: '',
  phongKtxId: '',
  taiSanKtxId: '',
  trangThai: 'MoiGui' as const,
  ghiChuXuLy: null,
  ngayXuLy: null,
  maTaiSan: '',
  tenTaiSan: '',
  tinhTrangTaiSan: '',
  maPhong: '',
  tenToaNha: '',
  hoTenSinhVien: '',
  chiPhiPhatSinh: 0,
};

const YeuCauSuaChuaPage = () => {
  const [filters, setFilters] = useState<YeuCauSuaChuaFilterState>({});

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
  } = useCrudPaginationModal<YeuCauSuaChua, YeuCauSuaChua>({
    defaultValues,
    schema: yeuCauSuaChuaSchema,
    entity: 'yeu-cau-sua-chua',
  });

  const rawRowsData = useMemo(() => {
    if (!data) return [];
    return 'data' in data && Array.isArray(data.data) ? data.data : [];
  }, [data]);

  const rowsData = useMemo(() => {
    if (!filters.tieuDe && !filters.trangThai && !filters.phongKtxId && !filters.sinhVienId) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchTieuDe =
        !filters.tieuDe || row.tieuDe?.toLowerCase().includes(filters.tieuDe.toLowerCase());

      const matchTrangThai = !filters.trangThai || row.trangThai === filters.trangThai;

      const matchPhong = !filters.phongKtxId || row.phongKtxId === filters.phongKtxId;

      const matchSinhVien = !filters.sinhVienId || row.sinhVienId === filters.sinhVienId;

      return matchTieuDe && matchTrangThai && matchPhong && matchSinhVien;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: YeuCauSuaChuaFilterState) => {
    setFilters(filterValues);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters({});
  }, []);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) =>
            exportPaginationToExcel<YeuCauSuaChua>({
              entity: 'yeu-cau-sua-chua',
              filteredData: rowsData,
              columns: yeuCauSuaChuaColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_yeu_cau_sua_chua',
            })
          }
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Tạo yêu cầu sửa chữa mới' : 'Chỉnh sửa yêu cầu sửa chữa'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="md"
            titleMode={TITLE_MODE.COLORED}
          >
            <YeuCauSuaChuaForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <YeuCauSuaChuaFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <DataGridTable
          columns={yeuCauSuaChuaColumns}
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
};

export default YeuCauSuaChuaPage;
