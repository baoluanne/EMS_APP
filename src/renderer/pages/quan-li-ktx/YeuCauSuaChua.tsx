import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { YeuCauSuaChuaForm } from '@renderer/features/ktx-management/yeu-cau-sua-chua/components/YeuCauSuaChuaForm';
import { YeuCauSuaChuaFilter } from '@renderer/features/ktx-management/yeu-cau-sua-chua/components/YeuCauSuaChuaFilter';
import { yeuCauSuaChuaColumns } from '@renderer/features/ktx-management/yeu-cau-sua-chua/configs/table.configs';
import { YeuCauSuaChuaFilterState } from '@renderer/features/ktx-management/yeu-cau-sua-chua/type';
import {
  YeuCauSuaChua,
  yeuCauSuaChuaSchema,
} from '@renderer/features/ktx-management/yeu-cau-sua-chua/validation';
import { useMemo, useState, useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';
import { FormProvider } from 'react-hook-form';
import { Stack } from '@mui/material';

const defaultValues: YeuCauSuaChua = {
  id: undefined,
  tieuDe: '',
  noiDung: '',
  sinhVienId: '',
  phongKtxId: '',
  taiSanKtxId: '',
  trangThai: 'MoiGui',
  ghiChuXuLy: '',
  ngayGui: '',
  ngayXuLy: '',
  ngayHoanThanh: '',
  maTaiSan: '',
  tenTaiSan: '',
  tinhTrangTaiSan: '',
  maPhong: '',
  tenToaNha: '',
  hoTenSinhVien: '',
  chiPhiPhatSinh: 0,
};

const convertDateToIsoDateTime = (dateString: string): string => {
  if (!dateString) return '';
  try {
    return dateString.includes('T')
      ? dateString
      : new Date(dateString + 'T00:00:00Z').toISOString();
  } catch {
    return '';
  }
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
    onSave: originalOnSave,
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

  const rowsData = useMemo(() => {
    const raw = data && 'data' in data && Array.isArray(data.data) ? data.data : [];
    if (!filters.tieuDe && !filters.trangThai && !filters.phongKtxId && !filters.sinhVienId)
      return raw;
    return raw.filter(
      (row: any) =>
        (!filters.tieuDe || row.tieuDe?.toLowerCase().includes(filters.tieuDe.toLowerCase())) &&
        (!filters.trangThai || row.trangThai === filters.trangThai) &&
        (!filters.phongKtxId || row.phongKtxId === filters.phongKtxId) &&
        (!filters.sinhVienId || row.sinhVienId === filters.sinhVienId),
    );
  }, [data, filters]);

  const onSave = useCallback(async () => {
    const formData = formMethods.getValues();
    formMethods.reset({
      ...formData,
      ngayGui: convertDateToIsoDateTime(formData.ngayGui || ''),
      ngayXuLy: convertDateToIsoDateTime(formData.ngayXuLy || ''),
      ngayHoanThanh: convertDateToIsoDateTime(formData.ngayHoanThanh || ''),
    });
    return originalOnSave();
  }, [formMethods, originalOnSave]);

  const handleRowClick = useCallback(
    (params: any) => {
      formMethods.reset({ ...defaultValues, ...params.row });
    },
    [formMethods],
  );

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
              fileName: 'Danh_sach_sua_chua',
            })
          }
        />
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Tạo yêu cầu mới' : 'Chỉnh sửa yêu cầu'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
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
        <YeuCauSuaChuaFilter onApply={setFilters} onReset={() => setFilters({})} />
        <DataGridTable
          columns={yeuCauSuaChuaColumns}
          rows={rowsData}
          loading={isRefetching}
          onRowClick={handleRowClick}
          getRowId={(row) => row.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
          checkboxSelection
        />
      </Stack>
    </FormProvider>
  );
};

export default YeuCauSuaChuaPage;
