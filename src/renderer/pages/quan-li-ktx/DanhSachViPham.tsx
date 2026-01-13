import { Stack, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { FormDetailsModal, DeleteConfirmationModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { env } from '@renderer/shared/configs/env.config';

import {
  viPhamNoiQuyKtxSchema,
  ViPhamNoiQuyKtx,
  ViPhamFilterState,
} from '@renderer/features/ktx-management/danh-sach-vi-pham/validation';
import { viPhamKtxColumns as columns } from '@renderer/features/ktx-management/danh-sach-vi-pham/table.configs';
import { ViPhamKtxFilter } from '@renderer/features/ktx-management/danh-sach-vi-pham/components/ViPhamKtxFilter';
import { ViPhamKtxForm } from '@renderer/features/ktx-management/danh-sach-vi-pham/components/ViPhamKtxForm';
import { TITLE_MODE } from '@renderer/shared/enums';

export default function ViPhamNoiQuyKtxPage() {
  const [filters, setFilters] = useState<ViPhamFilterState>({});

  const {
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
    refetch,
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

  const rawRowsData = useMemo((): ViPhamNoiQuyKtx[] => {
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

  const rowsData = useMemo(() => {
    if (!filters.searchTerm && !filters.noiDungViPham && !filters.tuNgay) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const searchTerm = filters.searchTerm?.toLowerCase() || '';
      const matchSearchTerm =
        !searchTerm ||
        row.maSinhVien?.toLowerCase().includes(searchTerm) ||
        row.hoTenSinhVien?.toLowerCase().includes(searchTerm);

      const matchNoiDung = !filters.noiDungViPham || row.noiDungViPham === filters.noiDungViPham;

      const matchTuNgay =
        !filters.tuNgay || new Date(row.ngayViPham).getTime() >= new Date(filters.tuNgay).getTime();

      return matchSearchTerm && matchNoiDung && matchTuNgay;
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: ViPhamFilterState) => {
    setFilters(filterValues);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters({});
  }, []);

  const onSubmit = async (formData: ViPhamNoiQuyKtx) => {
    try {
      const payload = {
        ...formData,
        ngayViPham: new Date(formData.ngayViPham).toISOString(),
      };

      const endpoint = `${env.API_ENDPOINT}/vi-pham-noiquy-ktx`;

      if (isAddMode) {
        await axios.post(`${endpoint}/create`, payload);
      } else {
        await axios.put(`${endpoint}/update`, payload);
      }

      refetch();
      handleCloseModal();
    } catch (error) {
      console.error('Lỗi lưu dữ liệu:', error);
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

        <ViPhamKtxFilter onApply={handleFilterApply} onReset={handleFilterReset} />

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
            onSave={formMethods.handleSubmit(onSubmit)}
            maxWidth="sm"
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
