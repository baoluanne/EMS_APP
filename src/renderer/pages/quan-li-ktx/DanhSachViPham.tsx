import { Stack, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { FormDetailsModal, DeleteConfirmationModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import axios from 'axios';
import React from 'react';

import {
  viPhamNoiQuyKtxSchema,
  ViPhamNoiQuyKtx,
  ViPhamFilterState,
} from '@renderer/features/ktx-management/danh-sach-vi-pham/validation';
import { viPhamKtxColumns as columns } from '@renderer/features/ktx-management/danh-sach-vi-pham/table.configs';
import { ViPhamKtxFilter } from '@renderer/features/ktx-management/danh-sach-vi-pham/components/ViPhamKtxFilter';
import { ViPhamKtxForm } from '@renderer/features/ktx-management/danh-sach-vi-pham/components/ViPhamKtxForm';
import { TITLE_MODE } from '@renderer/shared/enums';

const API_BASE_URL = 'http://localhost:5031/api/vi-pham-noiquy-ktx';

export default function ViPhamNoiQuyKtxPage() {
  const {
    refetch,
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    selectedRows,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    mergeParams,
  } = useCrudPaginationModal<ViPhamNoiQuyKtx, any>({
    defaultValues: {
      diemTru: 0,
      ngayViPham: new Date().toISOString().split('T')[0],
      hinhThucXuLy: 'Trừ điểm KTX',
      sinhVienId: '',
      noiDungViPham: '',
    },
    schema: viPhamNoiQuyKtxSchema,
    entity: 'vi-pham-noiquy-ktx',
  });
  const rowsData = React.useMemo((): ViPhamNoiQuyKtx[] => {
    const rawData = (data as any)?.data || (data as any)?.result || [];
    if (Array.isArray(rawData)) {
      return rawData.map((item: any) => ({
        id: item.id || item.Id,
        sinhVienId: item.sinhVienId || item.SinhVienId,
        maSinhVien: item.maSinhVien || item.MaSinhVien,
        hoTenSinhVien: item.hoTenSinhVien || item.HoTenSinhVien,
        noiDungViPham: item.noiDungViPham || item.NoiDungViPham,
        hinhThucXuLy: item.hinhThucXuLy || item.HinhThucXuLy,
        diemTru: item.diemTru || item.DiemTru,
        ngayViPham: item.ngayViPham || item.NgayViPham,
        tenToaNha: item.tenToaNha || item.TenToaNha,
        maPhong: item.maPhong || item.MaPhong,
      }));
    }
    return [];
  }, [data]);

  const handleApplyFilter = (filters: ViPhamFilterState) => {
    mergeParams({
      ...filters,
      page: 0,
    } as any);
  };

  const handleSave = async (formData: ViPhamNoiQuyKtx) => {
    try {
      const payload = {
        ...formData,
        ngayViPham: new Date(formData.ngayViPham).toISOString(),
      };
      isAddMode
        ? await axios.post(`${API_BASE_URL}/create`, payload)
        : await axios.put(`${API_BASE_URL}/update`, payload);
      refetch?.();
      handleCloseModal();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Lưu thất bại');
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          Quản lý Vi phạm Nội quy KTX
        </Typography>

        <ActionsToolbar
          selectedRowIds={selectedRows}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={() => setIsDeleteOpenModal(true)}
        />

        <ViPhamKtxFilter onApply={handleApplyFilter} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          loading={isRefetching}
          checkboxSelection
          getRowId={(row: any) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          {...tableConfig}
          height="calc(100% - 130px)"
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Ghi nhận vi phạm mới' : 'Cập nhật vi phạm'}
            onClose={handleCloseModal}
            onSave={formMethods.handleSubmit(handleSave)}
            maxWidth="md"
            titleMode={TITLE_MODE.COLORED}
          >
            <ViPhamKtxForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
      </Stack>
    </FormProvider>
  );
}
